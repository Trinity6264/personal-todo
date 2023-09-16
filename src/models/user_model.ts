import { Schema, model } from "mongoose";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>(
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

UserSchema.pre("save", function (next) {  
  if (this.isModified("password")) {
    this.password = Bun.hash(this.password).toString();
  }
  next(Error("Password must be at least hgjgjgjg"));
});


const userModel = model<UserInterface>("Users", UserSchema);

export default userModel;
