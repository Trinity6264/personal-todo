import { NextFunction, Request, Response } from "express";
import AsyncWrapper from "../helper/async_wrapper";
import UserModel, { UserInterface } from "../models/user_model";
import BadRequest from "../error/bad_request";
import verifyPassword from "../helper/verify_password";
import { StatusCodes } from "http-status-codes";

interface CustomResponse {
  status: boolean;
  msg: string;
}

interface LoginResponseI extends CustomResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const createUserAccount = AsyncWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body as UserInterface;

  const user = new UserModel({ username, email, password });
  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    throw new BadRequest("User already exist");
  }

  await user.save();

  return res.status(StatusCodes.CREATED).json({
    status: true,
    msg: "User account created successfully",
    data: {},
  });
});

const loginUser = AsyncWrapper(
  async (req: Request, res: Response): Promise<Response<LoginResponseI>> => {
    const { email, password } = req.body as UserInterface;
    const isUserExist = await UserModel.findOne({ email });

    if (!isUserExist) {
      throw new BadRequest("User does not exist");
    }

    const isPasswordValid = await verifyPassword(
      password,
      isUserExist.password
    );

    if (!isPasswordValid) {
      throw new BadRequest("Invalid user password");
    }

    return res.status(StatusCodes.ACCEPTED).json({
      status: true,
      msg: "User logged in successfully",
      data: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    });
  }
);

export { createUserAccount, loginUser };
