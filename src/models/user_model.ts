import { Schema, model } from "mongoose";
import CustomMongooseError from "../error/custom_mongoose_error";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  _id?: string;
}

const userSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    this.password = await Bun.password.hash(this.password);
    next();
  } catch (error) {
    console.error(error);
    throw new CustomMongooseError("Internal server error");
  }
});

const userModel = model<UserInterface>("Users", userSchema);

export default userModel;
