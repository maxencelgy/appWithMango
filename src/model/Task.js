import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The task title is required"],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be greater than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "The task description is required"],
      trim: true,
      maxlength: [200, "description cannot be greater than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema);
