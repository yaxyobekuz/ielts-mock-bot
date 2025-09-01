require("dotenv").config();
const connectDB = require("./src/config/db");

(async () => {
  await connectDB();
  require("./src/app");
})();
