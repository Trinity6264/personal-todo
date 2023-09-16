import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnection from "./helper/db_connection";
import userRouter from "./routers/users_router";

const app: Express = express();

const PORT = 8000;

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {  
  res.send("Hello world");
})

app.use(`/api/v1/users`, userRouter);

app.use("/", (req, res) => {
  res.send("ROute not found");
});

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
