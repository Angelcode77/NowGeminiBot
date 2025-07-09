import { Bot } from "grammy";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// ✅ Init du bot Telegram
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
console.log("✅ Bot Token :", process.env.TELEGRAM_BOT_TOKEN);

// ✅ Init Gemini avec le bon modèle (v1beta)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

// 📩 Commande /start
bot.command("start", (ctx) => ctx.reply("Bienvenue 👋 Je suis ton bot Gemini !"));

// 🤖 Réponse AI pour chaque message texte
bot.on("message:text", async (ctx) => {
  const prompt = ctx.message.text;
  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
    const text = result.response.text();
    await ctx.reply(text);
  } catch (err) {
    console.error("❌ Erreur Gemini :", err);
    await ctx.reply("❌ Oups, une erreur s'est produite.");
  }
});

export default bot;
