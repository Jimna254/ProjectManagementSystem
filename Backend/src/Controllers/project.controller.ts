import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Project } from "../Interfaces/projectInterface";

const dbhelper = new Connection();
// create a user
export const createProject = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Project:", id);
    const { projectname, description, createdate, enddate }: Project = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);
    const result = (
      await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .input("projectname", mssql.VarChar, projectname)
        .input("description", mssql.VarChar, description)
        .input("createdate", mssql.VarChar, createdate)
        .input("enddate", mssql.VarChar, enddate)
        .execute("createProject")
    ).rowsAffected;

    console.log(result);
    return res.status(201).json({
      message: `${projectname} Project created succesfully.`,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//get all users
export const getProjects = async (req: Request, res: Response) => {
  try {
    let projects = await dbhelper.execute("getProjects");
    if (projects) {
      return res.json({ projects });
    } else {
      return res.status(200).json({
        message: "No Projects Found",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving Projects" });
  }
};

export const getOneProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Project:", id);
    let project = await dbhelper.execute("getOneProject", { project_id: id });
    console.log(project);
    return res.json({ project });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { projectname, description, createdate, enddate }: Project = req.body;
    console.log("proj ID:", id);
    let result = await dbhelper.execute("updateProject", {
      project_id: id,
    });
    return res.json({ result, message: "Project updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue updatingproject" });
  }
};

export const assignUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { user_id }: Project = req.body;
    console.log("proj ID:", id);
    let result = await dbhelper.execute("assignUser", {
      project_id: id,
      user_id: user_id,
    });
    return res.json({ result, message: "Project assigned successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue assigningProject" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Proj ID:", id);
    let project = await dbhelper.execute("deleteProject", { project_id: id });

    return res.json({ project });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting Project" });
  }
};
