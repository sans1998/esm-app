import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/:taskid", async (req, res, next) => {
  const { taskid } = req.params; // 取得 taskid

  if (!taskid) {
    return res.status(400).json({ error: "Task ID is required" });
  }

  try {
    const response = await axios.get(
      `https://api.girlclone.com/api/genimages/task/${taskid}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GRILCLONE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ reply: response.data });
  } catch (error) {
    console.error("Error calling GirlCloneTask API:", error);
    next(error);
  }
});

export default router;
