const nodemailer = require("nodemailer");
const logger = require("./logger");
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pms.sig.dev@gmail.com",
    pass: "webqpgvhkpgqkkyx",
  },
});

/** create reusable sendmail function 
@params {object} options - mail options (to, subject, text, html)
@params {function} callback - callback function to handle response
*/
const SENDMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    const logMessage = info.response + ' | from : ' + info.envelope.from +' | to : ' + info.envelope.to;
    logger.info(logMessage)
    callback(info);
  } catch (error) {
    //(error);
    logger.info(error)
  }
};

module.exports = SENDMAIL;