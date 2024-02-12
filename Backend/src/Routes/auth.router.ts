import { Router } from "express";
import {
  loginUser,
  resetPassword,
  checkdetails,
} from "../Controllers/auth.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const auth_Router = Router();
auth_Router.post("/checkdetails", verifyToken, checkdetails);
auth_Router.post("/login", loginUser); //crear un usuario nuevo en la BD
auth_Router.put("/reset", resetPassword);

export default auth_Router;
