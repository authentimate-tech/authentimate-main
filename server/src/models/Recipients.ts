import mongoose, { Schema, Document, Model } from "mongoose";

interface IRecipient extends Document {
  id: string;
  email: string;
  name: string;
  refreshToken: string;
}

const RecipientSchema = new Schema<IRecipient>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  refreshToken: { type: String },
});

export const RecipientModel: Model<IRecipient> = mongoose.model<IRecipient>(
  "Recipient",
  RecipientSchema
);
