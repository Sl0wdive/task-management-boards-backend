import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBoard>("Board", BoardSchema);
