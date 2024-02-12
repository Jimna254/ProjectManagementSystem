import joi from "joi";

export const registerUserSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  // role: joi.string().min(5).required(),
  areaofspecialization: joi.string().min(5).required(),
});
