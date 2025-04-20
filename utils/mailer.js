const mailer = require("nodemailer");
// const randtoken = require("rand-token");
// const jwt = require("jsonwebtoken");

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const myemail = mailer.createTransport({
  service: process.env.service,
  host: process.env.host,

  port: 465,

  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const Sendmail = async (to, subject, html, many = false) => {
  try {
    const mailoption = {
      from: `${process.env.Company} <${process.env.email}>`,
      [many ? "bcc" : "to"]: to, //bcc for bulk; to for single
      //   ...{ bcc: to },
      subject: subject,
      html: html,
    };
    await myemail.sendMail(mailoption);
    return { sent: true };
  } catch (error) {
    console.log("Mail sending error:", error.message);
    return { error: error.message };
  }
};

// utils/emailTemplate.js

const emailTemplate = (Body) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; background-color: #ffffff;">

      <!-- Header -->
      <div style="background-color: #4CAF50; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      <img src="https://yourdomain.com/image/logo.jpg" alt="Henstock Logo" style="width: 80px; height: auto; margin-bottom: 10px;" />  
      <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Henstock </h1>
        <p style="margin: 5px 0 0; color: #e0ffe0; font-size: 14px;">Sustainable Farming. Quality Produce.</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333333; font-size: 15px; line-height: 1.6;">
        ${Body}
      </div>

      <!-- Footer -->
      <div style="background-color: #f7f7f7; padding: 20px; border-top: 1px solid #dddddd; text-align: center; font-size: 13px; color: #777;">
        <p style="margin: 0 0 8px;"><strong>Henstock</strong> – Promoting sustainable farming and distribution of fresh farm produce across Nigeria and beyond.</p>
        <p style="margin: 8px 0;">Follow us on:
          <a href="https://www.instagram.com/henstockfoods__ltd/profilecard/?igsh=MWt5NXBtM3J4cnhlbA==" style="color: #4CAF50; text-decoration: none;">Instagram</a> |
          <a href="https://www.linkedin.com/company/henstock-foods-limited/" style="color: #4CAF50; text-decoration: none;">LinkedIn</a> |
          <a href="https://twitter.com/henstock" style="color: #4CAF50; text-decoration: none;">Twitter</a>
        </p>
        <p style="margin-top: 10px;">&copy; ${new Date().getFullYear()} Henstock. All rights reserved.</p>
      </div>

    </div>
  `;
  };

module.exports = {
  Sendmail,
  emailTemplate
};
