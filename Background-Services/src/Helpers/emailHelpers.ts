import nodemailer from "nodemailer";

import { mail_configs } from "../Interfaces/mailconfig";



function createTransporter(config: mail_configs) {
  const transporter = nodemailer.createTransport(config);

  return transporter;
}

let configurations: mail_configs = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: "devjameskw@gmail.com",
    pass: "xomngbeawzfqqiil",
  },
};

export const sendMail = async (messageOption: any) => {
  const transporter = await createTransporter(configurations);

  await transporter.verify();

  await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};
