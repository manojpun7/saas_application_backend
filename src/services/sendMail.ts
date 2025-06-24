import nodemailer from "nodemailer";

interface MailInformation {
  to: string;
  subject: string;
  text: string;
}

const sendMail = async (mailInformation: MailInformation) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL, //sender email
      pass: process.env.NODEMAILER_APP_PASSWORD, // this is the password of the app password from the sender email
    },
  });

  const mailFormatObject = {
    from: "saas mern class <punmanoj2060@gmail.com>",
    to: mailInformation.to,
    subject: mailInformation.subject,
    text: mailInformation.text,
  };

  try{
    await transporter.sendMail(mailFormatObject)
  }catch(error){
    console.log(error)
  }
};

export default sendMail;
