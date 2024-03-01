import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { User } from "../Interfaces/userInterface";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const dbhelper = new Connection();
// create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const { name, email, role, password, areaofspecialization }: User =
      req.body;

    console.log(req.body);

    const hashed_pwd = await bcrypt.hash(password, 5); // Use the saltRounds variable

    const pool = await mssql.connect(sqlConfig);
    const result = (
      await pool
        .request()
        .input("user_id", mssql.VarChar, id)
        .input("name", mssql.VarChar, name)
        .input("email", mssql.VarChar, email)
        .input("role", mssql.VarChar, role)
        .input("AreaOfSpecialization", mssql.VarChar, areaofspecialization)
        .input("Password", mssql.VarChar, hashed_pwd)
        .execute("registerUser")
    ).rowsAffected;

    console.log(result);
    return res.status(201).json({
      message: `${name} Account was created succesfully.`,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    let users = (await dbhelper.execute("getUsers")).recordset;
    if (users) {
      return res.json({ users });
    } else {
      return res.status(200).json({
        message: "No Users",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving users" });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("User ID:", id);
    let user = (await dbhelper.execute("getOneUser", { user_id: id }))
      .recordset;

    return res.json({ user });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { name, email, role, password, areaofspecialization }: User =
      req.body;
    console.log("User ID:", id);
    const hashed_pwd = await bcrypt.hash(password, 5);
    let result = await dbhelper.execute("updateUser", {
      user_id: id,
      name,
      email,
      role,
      password: hashed_pwd,
      areaofspecialization,
    });
    return res.json({ result, message: "User updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res.status(400).json({ message: "There was an issue updatinguser" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("User ID:", id);
    let user = (await dbhelper.execute("deleteUser", { user_id: id }))
      .recordset;

    return res.json({ user });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting user" });
  }
};
