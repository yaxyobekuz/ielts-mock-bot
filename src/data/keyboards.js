const keyboards = {
  requestContact: {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [{ text: "Telefon raqamimni yuborish ☎️", request_contact: true }],
      ],
    },
  },
  none: { reply_markup: { remove_keyboard: true } },
};

module.exports = keyboards;
