// Bot
const bot = require("./config/bot");

// Data
const texts = require("./data/texts");
const keyboards = require("./data/keyboards");

// Hooks
const useMessage = require("./hooks/useMessage");

// Utils
const { extractNumbers } = require("./utils/helpers");

// Models
const User = require("./models/User");
const TgUser = require("./models/TgUser");
const VerificationCode = require("./models/VerificationCode");

const checkAndSendVerificationCode = async (phone, reply) => {
  // Get latest verification code by phone
  const verificationCode = await VerificationCode.findOne({
    phone,
    isSent: false,
  }).sort({
    createdAt: -1,
  });

  if (!verificationCode) {
    return await reply(texts.noVerificationCode, keyboards.none);
  }

  // Send verification code
  await reply(
    texts.verificationCodeSent(verificationCode.code),
    keyboards.none
  );

  verificationCode.isSent = true;
  await verificationCode.save();
};

const saveUserChatId = async (phone, chatId) => {
  const user = await User.findOne({ phone });
  if (!user) return;

  user.chatId = chatId;
  return await user.save();
};

bot.on("text", async ({ chat: { id: chatId }, text }) => {
  const { reply } = useMessage(chatId, text);
  const user = await TgUser.findOne({ chatId });

  // Create new tg user if not exists
  if (!user) {
    await TgUser.create({ chatId });
    return await reply(texts.greeting, keyboards.requestContact);
  }

  // Ask contact if phone not saved
  if (!user.phone) {
    return await reply(texts.requestContact, keyboards.requestContact);
  }

  // Get latest verification code by phone
  const verificationCode = await VerificationCode.findOne({
    phone: user.phone,
  }).sort({ createdAt: -1 });

  if (!verificationCode) {
    return await reply(texts.noVerificationCode, keyboards.none);
  }

  // Save user chatId to db
  await saveUserChatId(user.phone, chatId);

  // Send verification code
  await checkAndSendVerificationCode(user.phone, reply);
});

bot.on(
  "contact",
  async ({
    chat: { id: chatId },
    contact: { user_id: userId, phone_number },
  }) => {
    const user = await TgUser.findOne({ chatId });
    if (user.phone) return;

    const { reply } = useMessage(chatId);
    const phone = Number(extractNumbers(phone_number));

    // Check user contact
    if (userId !== chatId) {
      return await reply(texts.wrongContact, keyboards.requestContact);
    }

    // Save user phone to db
    user.phone = phone;
    await user.save();
    await reply(texts.contactSaved, keyboards.none);

    // Save user chatId to db
    await saveUserChatId(phone, chatId);

    // Send verification code
    await checkAndSendVerificationCode(phone, reply);
  }
);
