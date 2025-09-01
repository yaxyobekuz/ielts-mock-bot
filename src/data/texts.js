const texts = {
  noVerificationCode: `Siz uchun hisobni tasdiqlash kodi mavjud emas.`,
  contactSaved: `<b>Telefon raqam qabul qilindi ✅</b>\nEndi esa bemalol botdan foydalanishingiz mumkin! 😊`,
  requestContact: `Iltimos botdan foydalanish uchun telefon raqamingizni quyidagi tugmani ezish orqali yuboring. 👇`,
  wrongContact: `<b>Noto'g'ri telefon raqam yuborildi ❌</b>\nIltimos telefon raqamingizni quyidagi tugmani ezish orqali yuboring. 👇`,
  greeting: `Assalomu alaykum hurmatli foydalanuvchi, botga xush kelibsiz!\nIltimos botdan foydalanish uchun telefon raqamingizni quyidagi tugmani ezish orqali yuboring. 👇`,
  verificationCodeSent: (code) =>
    `<b>Hisobingizni tasdiqlash kodingiz:</b> <code>${code}</code>\nUshbu kodni hech kimga bermang, Hatto IELTS admini so'rasa ham!`,
};

module.exports = texts;
