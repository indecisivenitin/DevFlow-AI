const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/stream", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Set streaming headers
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");

    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // stable working model
      messages: [
        {
          role: "system",
          content:
            "You are DevFlow AI, a powerful developer productivity assistant.",
        },
        { role: "user", content: message },
      ],
      stream: true,
    });

    // Stream chunks to frontend
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(content);
      }
    }

    res.end();
  } catch (error) {
    console.error("Groq Stream Error:", error);

    // If headers already sent (stream started), just end safely
    if (res.headersSent) {
      return res.end();
    }

    return res.status(500).json({
      success: false,
      message: "AI streaming failed",
    });
  }
});

module.exports = router;