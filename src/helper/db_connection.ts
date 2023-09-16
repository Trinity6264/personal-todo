import mongoose, { MongooseError } from "mongoose";

const dbConnection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    conn.connection.on("connected", () => {
        
        console.log(`Database open to ${conn.connection.host}`);
    });
    conn.connection.on("error", (err: MongooseError) => {
      console.log("====================================");
      console.log(`MongoDB connection error: ${err.message}`);
      console.log("====================================");
    });
};

export default  dbConnection;
