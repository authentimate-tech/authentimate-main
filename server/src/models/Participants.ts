import mongoose, { Schema, Document, Model } from "mongoose";

interface IParticipant extends Document {
  id: string;
  eventId: string;
  name: string;
  email: string;
  attributeValues: Record<string, any>;
  attended: boolean;
}

const ParticipantSchema = new Schema<IParticipant>({
  id: { type: String, required: true, unique: true },
  eventId: { type: String, required: true, ref: "Event" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  attributeValues: { type: Schema.Types.Mixed },
  attended: { type: Boolean, required: true },
});

export const ParticipantModel: Model<IParticipant> = mongoose.model<IParticipant>(
  "Participant",
  ParticipantSchema
);
