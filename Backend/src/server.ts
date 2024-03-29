import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import userRouter from "./Routes/user.router";
import auth_Router from "./Routes/auth.router";
import projectRouter from "./Routes/project.router";
const app = express();

app.use(cors());
app.use(json());
app.use("/users", userRouter);
app.use("/users", auth_Router);
app.use("/projects", projectRouter);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

const port: number | string = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
