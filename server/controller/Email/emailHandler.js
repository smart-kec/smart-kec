const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../../config/config");
const oAuth2client = new google.auth.OAuth2(
  config.mailer.CLIENT_ID,
  config.mailer.CLIENT_SECRET,
  config.mailer.REDIRECT_URL
);
oAuth2client.setCredentials({ refresh_token: config.mailer.REFRESH_TOKEN });
module.exports = async (data) => {
  try {
    const accessToken = await oAuth2client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "smartkecinfo@gmail.com",
        clientId: config.mailer.CLIENT_ID,
        clientSecret: config.mailer.CLIENT_SECRET,
        refreshToken: config.mailer.REFRESH_TOKEN,
        accessToken: accessToken,
      },
      connectionTimeout: 5 * 60 * 1000,
    });
    const mailOptions = {
      from: "SMART KEC <smartkecinfo@gmail.com>",
      to: `${data.to}`,
      subject: `${data.subject}`,
      text: `${data.text}`,
      html: `${data.html}`,
    };
    const result = await transport.sendMail(mailOptions);
    result.status = "success";

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
