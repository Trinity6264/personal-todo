import { NextFunction, Request, Response } from "express";
import UserModel,{UserInterface} from "../models/user_model";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body as UserInterface;

    const user = new UserModel({ username, email, password });
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exist");
    }

    // if(password === null || password === undefined || password.length < 6) throw new Error("Password must be at least 6 characters");

    // user.password = Bun.hash(password).toString();
    
    await user.save();
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function  getAllUsers(req: Request, res: Response, next: NextFunction) {
  const password = await Bun.password.verify("963679895975984773", "Test6264")
  res.send("Get all users " + password);
}

export { createUser, getAllUsers };

