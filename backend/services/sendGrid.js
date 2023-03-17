const config = require("../config/vars.js");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (payload) => {
  const msg = {
    to: payload.to, // Change to your recipient
    from: payload.from, // Change to your verified sender
    subject: payload.subject,
    text: payload.text,
  };
  console.log(config.sendGridApiKey);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log(error.response.body);
    });
};
module.exports = sendEmail;
