import mongoose, { Schema, Document, Model } from "mongoose";


interface ICertification extends Document {
  id: string;
  certificateGroupId: string;
  participantId: string;
  recipientId: string;
  additionalAttributesValues: Record<string, any>;
  credentialId: string;
  status: string;
  mailed: boolean;
}

const CertificationSchema = new Schema<ICertification>({
  id: { type: String, required: true, unique: true },
  certificateGroupId: { type: String, required: true, ref: "CertificateGroup" },
  participantId: { type: String, required: true, ref: "Participant" },
  recipientId: { type: String, required: true, ref: "Recipient" },
  additionalAttributesValues: { type: Schema.Types.Mixed },
  credentialId: { type: String, required: true },
  status: { type: String, required: true },
  mailed: { type: Boolean, required: true },
});

export const CertificationModel: Model<ICertification> = mongoose.model<ICertification>(
  "Certificate",
  CertificationSchema
);
