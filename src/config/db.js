const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Mango Baza ulandi! ✅🥭🗿");
  } catch (err) {
    console.error("MongoDB ulanmadi ❌🥭🗿", err);
    process.exit(1);
  }
};

module.exports = connectDB;
