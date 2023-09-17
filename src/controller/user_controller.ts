import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import BadRequest from "../error/bad_request";
import AsyncWrapper from "../helper/async_wrapper";
import verifyPassword from "../helper/verify_password";
import tokenModel from "../models/token_model";
import UserModel, { UserInterface } from "../models/user_model";

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
    const isUserExist: UserInterface | null = await UserModel.findOne({
      email,
    });

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

    // Assuming you have the necessary logic to generate a new access token
    if (!isUserExist._id) throw new BadRequest("User does not exist");

    console.log("====================================");
    console.log(isUserExist._id);
    console.log("====================================");

    // const { accessToken, refreshToken } = generateNewAccessToken(
    //   isUserExist._id
    // );
    const secretKey = "yoursecretkeyskakdkakhkhdkhkhahkh%&5583863863616381";

    const payload = {
      userId: 123,
      username: "exampleUser",
    };

    const accessToken = jwt.sign(payload, secretKey);
    const refreshToken = jwt.sign(payload, secretKey);

    // await tokenModel.findOneAndDelete({ userId: isUserExist._id });
    const token = new tokenModel({
      userId: isUserExist._id,
      refreshToken: refreshToken,
    });
   await token.save();

    return res.status(StatusCodes.OK).json({
      status: true,
      msg: "User logged in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  }
);

export { createUserAccount, loginUser };
