import mongoose, { Schema, Document, Model } from "mongoose";

interface ICertificateGroup extends Document {
  id: string;
  eventId: string;
  name: string;
  templateId: string;
  additionalAttributes: Record<string, any>;
}

const CertificateGroupSchema = new Schema<ICertificateGroup>({
  id: { type: String, required: true, unique: true },
  eventId: { type: String, required: true, ref: "Event" },
  name: { type: String, required: true },
  templateId: { type: String, required: true, ref: "CertificateTemplate" },
  additionalAttributes: { type: Schema.Types.Mixed },
});

export const CertificateGroupModel: Model<ICertificateGroup> =
  mongoose.model<ICertificateGroup>("CertificateGroup", CertificateGroupSchema);
