import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  id: string;
  userId: string;
  name: string;
  description: string;
}

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const ProjectModel: Model<IProject> = mongoose.model<IProject>(
  "Project",
  ProjectSchema
);
