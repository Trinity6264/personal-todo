import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnection from "./helper/db_connection";
import userRouter from "./routers/users_router";
import { routeNotFound } from "./middleware/route_not_found";
import errorHandler from "./middleware/error_handler";

const app: Express = express();

const PORT = 8000;

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/v1/users`, userRouter);

app.use(routeNotFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await dbConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

startServer();
