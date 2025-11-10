import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICard extends Document {
  board_id: Types.ObjectId;
  title: string;
  description: string;
  status: "To do" | "In progress" | "Done";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema = new Schema<ICard>(
  {
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["To do", "In progress", "Done"],
      default: "To do",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICard>("Card", CardSchema);
