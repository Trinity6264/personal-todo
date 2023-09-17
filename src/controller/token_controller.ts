import { Request, Response, NextFunction } from "express";
import AsyncWrapper from "../helper/async_wrapper";
import BadRequest from "../error/bad_request";
import tokenModel from "../models/token_model";
import NotFound from "../error/not_found";
import jwt from "jsonwebtoken";
import UnAuthorized from "../error/unauthorized";

interface DecodedTokenInterface {
  id: string;
  iat: number;
  exp: number;
}

interface RefreshTokenI {
  status: boolean;
  msg: string;
  data: {
    readonly accessToken: string;
    readonly refreshToken: string;
  };
}

const refreshToken = AsyncWrapper(
  async (req: Request, res: Response): Promise<Response<RefreshTokenI>> => {
    const token: string = req.body.token as string;

    if (!token) {
      throw new BadRequest("Refresh token is required");
    }

    const tokenData = await tokenModel.findOne({ token });

    if (!tokenData) {
      throw new NotFound("Refresh token was not found");
    }

    const isTokenValid = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );

    if (!isTokenValid) {
      throw new UnAuthorized("Invalid refresh token");
    }

    const userId = jwt.decode(token);

    console.log(userId);

    // Assuming you have the necessary logic to generate a new access token
    //   const newAccessToken = generateNewAccessToken(userId); // Replace with your actual logic for generating an access token

    const accessToken = jwt.sign(
      "newAccessToken",
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      "newAccessToken",
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "30days",
      }
    );

    return res.status(200).json({
      status: true,
      msg: "Token refresh successfully",
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  }
);

export default refreshToken;
