import jwt from "jsonwebtoken";

interface jwtPayloadInterface {
  accessToken: string;
  refreshToken: string;
}

// This function is just a placeholder for your actual logic for generating a new access token

const generateNewAccessToken = (userId: string): jwtPayloadInterface => {
  const accessToken = jwt.sign(
    { userId: userId },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { userId: userId },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "30days",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export default generateNewAccessToken;
