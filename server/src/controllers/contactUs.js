import { logInfo, logError } from "../util/logging.js";
import nodemailer from "nodemailer";

export const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.google.com", //replace with your email provider
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // verify connection configuration
    transporter.verify(function (error) {
      if (error) {
        logInfo(error);
      } else {
        logInfo("Server is ready to take our messages");
      }
    });

    if (!name) {
      throw new Error("BAD REQUEST: Please fill in your name.");
    } else if (!email) {
      throw new Error("BAD REQUEST: Please fill in your Email.");
    } else if (!subject) {
      throw new Error("BAD REQUEST: Please fill in your message's subject.");
    } else if (!message) {
      throw new Error("BAD REQUEST: Please fill in your message.");
    } else {
      const mail = {
        from: email,
        to: process.env.EMAIL,
        subject: `SUBJECT: ${subject} SENDER: ${email}`,
        text: message,
        replyTo: email,
      };

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          throw err;
        } else {
          logInfo(data);
          res.status(200).json({
            success: true,
          });
        }
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
