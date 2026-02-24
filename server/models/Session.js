const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "New Session",
      trim: true,
    },

    mode: {
      type: String,
      enum: ["coding", "study", "interview", "writer"],
      default: "coding",
    },

    lastMessage: {
      type: String,
    },

    messages: [messageSchema],
  },
  { timestamps: true }
);

/*
Auto Welcome Message (only when session is new)
*/
sessionSchema.pre("validate", function () {
  if (this.isNew && this.messages.length === 0) {
    const welcomeMessage = `👋 **Welcome to DevFlow Coding Assistant!**

I can:
• Debug your errors
• Write optimized code
• Explain algorithms
• Architect backend systems

What are you building today? 🚀`;

    this.messages.push({
      role: "assistant",   
      content: welcomeMessage,
    });
  }
});

/*
 Trim messages + update lastMessage
*/
sessionSchema.pre("save", function () {
  const MAX_MESSAGES = 20;

  if (this.messages.length > MAX_MESSAGES) {
    this.messages = this.messages.slice(-MAX_MESSAGES);
  }

  if (this.messages.length > 0) {
    this.lastMessage =
      this.messages[this.messages.length - 1].content.slice(0, 60);
  }
});

module.exports = mongoose.model("Session", sessionSchema);