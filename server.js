import express from "express";
import dotenv from "dotenv";
import bot from "./bot.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("✅ Bot en ligne !"));

// ✅ Lancement du bot avec options qui évitent le deleteWebhook (source de l’erreur)
bot.start({
  drop_pending_updates: true,
  allowed_updates: ["message", "chat_member"],
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
