import { Router } from "express";
import {
  createProject,
  getProjects,
  getOneProject,
  updateProject,
  deleteProject,
  assignUser,
  markComplete,
} from "../Controllers/project.controller";

import { verifyToken } from "../Middlewares/verifyToken";

const projectRouter = Router();

//

projectRouter.post("/", verifyToken, createProject); //crear un usuario nuevo en la BD
projectRouter.get("/", verifyToken, getProjects);
projectRouter.get("/:id", verifyToken, getOneProject);
projectRouter.put("/update/:id", verifyToken, updateProject);
projectRouter.put("/assignuser/:project_id", verifyToken, assignUser);
projectRouter.delete("/delete/:id", verifyToken, deleteProject);
projectRouter.put("/markascomplete/:id", verifyToken, markComplete);

export default projectRouter;
