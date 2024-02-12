import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const sqlConfig = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "@Stockholm01",
  database: process.env.DB_NAME || "ZuriPMS",
  server: process.env.DB_SERVER || "DESKTOP-KDHQCIN",
  SECRET: "IUTR87GMHX", // Secret for JWT Token

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // true for linux users
    trustServerCertificate: true,
  },
};

let connect = async () => {
  let pool = await mssql.connect(sqlConfig);

  if (pool.connected) {
    console.log("connected");

    // let query = `
    // CREATE TABLE Users(
    //      user_id VARCHAR(100) NOT NULL,
    //      name VARCHAR(100) NOT NULL,
    //      email VARCHAR(255) NOT NULL
    //      role VARCHAR(20),
    //      Password VARCHAR(200) NOT NULL,
    //      AreaOfSpecialization VARCHAR(200) NOT NULL
    //  )`;

    // let result = (await (await pool.connect()).query(query)).rowsAffected;

    // console.log(result);
  } else {
    console.log("not connected");
  }
};

connect();
