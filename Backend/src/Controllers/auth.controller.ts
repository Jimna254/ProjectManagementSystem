import { Request, Response } from "express";
import bcrypt from "bcrypt";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { loginUserSchema } from "../Validators/auth.validator";
import { sqlConfig } from "../Config/sql.config";

import { ExtendedUserRequest } from "../Middlewares/verifyToken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let { error } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }
    const pool = await mssql.connect(sqlConfig);

    let result = await pool
      .request()
      .input("email", email)
      .input("Password", password)
      .execute("loginUser");
    let user = result.recordset[0];

    console.log(user);

    if (!user) {
      // If no user is found
      return res.status(404).json({ error: "User not found" });
    }

    // If user is found
    const correct_pwd = await bcrypt.compare(password, user.Password);
    if (!correct_pwd) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const loginCredentials = {
      id: user.user_id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(loginCredentials, sqlConfig.SECRET, {
      expiresIn: "86400s",
    });

    return res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkdetails = async (req: ExtendedUserRequest, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const pool = await mssql.connect(sqlConfig);

    let hashedPwd = await bcrypt.hash(password, 5);

    let result = (
      await pool
        .request()
        .input("email", email)
        .input("Password", hashedPwd)
        .execute("resetPassword")
    ).rowsAffected;

    if (result[0] < 1) {
      return res.json({
        message: "User not found",
      });
    } else {
      return res.json({
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return res.sendStatus(501).json({
      error: error,
    });
  }
};
