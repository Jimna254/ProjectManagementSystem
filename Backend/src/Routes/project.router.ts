import { Router } from "express";
import {
  createProject,
  getProjects,
  getOneProject,
  updateProject,
  deleteProject,
  assignUser,
} from "../Controllers/project.controller";

import { verifyToken } from "../Middlewares/verifyToken";

const projectRouter = Router();

//

projectRouter.post("/", verifyToken, createProject); //crear un usuario nuevo en la BD
projectRouter.get("/", verifyToken, getProjects);
projectRouter.get("/:id", verifyToken, getOneProject);
projectRouter.put("/update/:id", verifyToken, updateProject);
projectRouter.put("/assignuser/:id", verifyToken, assignUser);
projectRouter.delete("/delete/:id", verifyToken, deleteProject);

export default projectRouter;
