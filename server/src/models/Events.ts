import mongoose, { Schema, Document, Model } from "mongoose";

interface IEvent extends Document {
  id: string;
  projectId: string;
  name: string;
  description: string;
  attributes: Record<string, any>;
  sendTickets: boolean;
  createCertificates: boolean;
  useAttendance: boolean;
  customForm: boolean;
}

const EventSchema = new Schema<IEvent>({
  id: { type: String, required: true, unique: true },
  projectId: { type: String, required: true, ref: "Project" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  attributes: { type: Schema.Types.Mixed },
  sendTickets: { type: Boolean, required: true },
  createCertificates: { type: Boolean, required: true },
  useAttendance: { type: Boolean, required: true },
  customForm: { type: Boolean, required: true },
});

const EventModel: Model<IEvent> = mongoose.model<IEvent>("Event", EventSchema);
