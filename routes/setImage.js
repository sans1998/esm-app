import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res, next) => {
  const {
    prompt,
    negative_prompt = null,
    num_images = null,
    image_size = {
      width: 768,
      height: 1024,
    },
    seed = null,
  } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await axios.post(
      "https://api.girlclone.com/api/genimages/A00011",
      {
        prompt: prompt,
        image_size: image_size,
        num_images: num_images,
        negative_prompt: negative_prompt,
        seed: seed,
        webhook_url: "https://your-callback-url.com",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GRILCLONE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ reply: response.data });
  } catch (error) {
    console.error("Error calling GirlClone API:", error);
    next(error);
  }
});

export default router;
