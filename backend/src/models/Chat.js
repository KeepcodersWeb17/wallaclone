import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    advert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advert",
      required: true,
      index: true,
    },
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
        },
      ],
      validate: {
        validator: function (v) {
          v.length === 2 && v[0].toString() !== v[1].toString();
        },
        message: (props) =>
          `Chat must have exactly 2 members, but got ${props.value.length} or the same user twice`,
      },
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
