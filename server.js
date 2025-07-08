import express from "express";
import dotenv from "dotenv";
import bot from "./bot.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("✅ Bot en ligne !"));

bot.start(); // Lancement du bot Telegram

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
