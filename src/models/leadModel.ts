import mongoose, { Schema, Document } from "mongoose";

interface ILead extends Document {
  email: string;
  name: string;
  number: string;
  product: string;
}

const LeadSchema: Schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  product: { type: String, required: true },
});

const Lead = mongoose.model<ILead>("lead", LeadSchema);
export default Lead;
