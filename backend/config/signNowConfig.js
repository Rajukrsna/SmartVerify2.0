require("dotenv").config();

module.exports = {
  SIGNNOW_API_URL: process.env.SIGNNOW_API_URL,
  BASIC_AUTH: process.env.SIGNNOW_BASIC_AUTH,
  USERNAME: process.env.SIGNNOW_USERNAME,
  PASSWORD: process.env.SIGNNOW_PASSWORD
};
