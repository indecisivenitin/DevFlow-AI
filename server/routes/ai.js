const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Groq = require("groq-sdk");
const Session = require("../models/Session");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/stream", authMiddleware, async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        success: false,
        message: "Message and sessionId required",
      });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    /* ---------------- Save User Message ---------------- */

    session.messages.push({
      role: "user",
      content: message,
    });

    let newTitle = null;

    if (session.title === "New Session") {
      const cleanTitle = message
        .replace(/\n/g, " ")
        .trim()
        .split(" ")
        .slice(0, 6)
        .join(" ");

      newTitle =
        cleanTitle.length > 50
          ? cleanTitle.slice(0, 50) + "..."
          : cleanTitle;

      session.title = newTitle;
    }

    await session.save();

    /* ---------------- Prepare Messages for Groq ---------------- */

    const cleanMessages = session.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    /* ---------------- Streaming Headers ---------------- */

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();

    if (newTitle) {
      res.write(`__TITLE__:${newTitle}\n`);
    }

    let fullResponse = "";

    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are DevFlow AI, a powerful developer productivity assistant.",
        },
        ...cleanMessages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(content);
      }
    }

    res.end();

    /* ---------------- Save Assistant Message ---------------- */

    if (fullResponse.trim()) {
      session.messages.push({
        role: "assistant",
        content: fullResponse,
      });

      await session.save();
    }

  } catch (error) {
    console.error("Groq Stream Error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "AI streaming failed",
      });
    } else {
      res.end();
    }
  }
});

module.exports = router;