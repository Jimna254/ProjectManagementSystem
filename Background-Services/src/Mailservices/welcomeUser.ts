import mssql from "mssql";

import { sqlConfig } from "../Config/sqlConfig";
import ejs from "ejs";
import { sendMail } from "../Helpers/emailHelpers";

export const welcomeUser = async () => {
  const pool = await mssql.connect(sqlConfig);

  const users = (
    await pool
      .request()
      .query("SELECT * FROM Users WHERE isWelcomed = 0 and isdeleted = 0")
  ).recordset;

  console.log(users);

  for (let user of users) {
    ejs.renderFile(
      "Templates/WelcomeUser.ejs",
      {name: user.name },
      async (error, data) => {
        let mailOptions = {
          from: "devjameskw@gmail.com",
          to: user.email,
          subject: "Welcome to ZURIPMS",
          html: data,
        };

        try {
          await sendMail(mailOptions);

          await pool
            .request()
            .query(
              "UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0 AND isDeleted = 0"
            );

          console.log("Emails sent to new users");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};
