const dotenv=require('dotenv');

let parsed = dotenv.config().parsed;
const config = {
  port: parsed.PORT,
  sendGridApiKey: parsed.SENDGRID_API_KEY,
};

exports.config;
