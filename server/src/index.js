import express from "express";
import cors from "cors";
import { portfolioData } from "./data/portfolio.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/portfolio", (_request, response) => {
  response.json(portfolioData);
});

app.post("/api/contact", (request, response) => {
  const { name, email, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({
      message: "Please fill in your name, email, and message."
    });
  }

  console.log("New portfolio contact message:", {
    name,
    email,
    message,
    receivedAt: new Date().toISOString()
  });

  return response.json({
    message: "Thanks for reaching out. Your message has been received."
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
