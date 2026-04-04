import mongoose from "mongoose";

const chatScehma = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
    }
  },
  { timeStamps: true }
)

const chatModel = mongoose.model("Chat", chatScehma);

export default chatModel