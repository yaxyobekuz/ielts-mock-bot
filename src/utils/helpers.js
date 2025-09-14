const extractNumbers = (text = "") => {
  return text?.replace(/\D/g, "");
};

module.exports = { extractNumbers };
