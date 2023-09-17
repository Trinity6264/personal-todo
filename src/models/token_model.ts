import { Schema, model } from "mongoose";

interface TokenI {
  token: string;
  userId: string;
}

const tokenSchema = new Schema<TokenI>(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tokenModel = model<TokenI>("Token", tokenSchema);

export default tokenModel;
