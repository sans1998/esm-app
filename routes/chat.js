import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { message } = req.body;
  console.log("message: ", message);
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // 根據需求選擇模型
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 假設 OpenRouter API 回傳的結構與 ChatGPT 類似
    res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    next(error);
  }
});

export default router;
