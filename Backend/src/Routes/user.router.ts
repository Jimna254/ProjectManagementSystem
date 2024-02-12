import { Router } from "express";
import {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../Controllers/user.controller";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router();

//

userRouter.post("/", createUser); //crear un usuario nuevo en la BD
userRouter.get("/", verifyToken, getUsers);
userRouter.get("/:id", verifyToken, getOneUser);
userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;
