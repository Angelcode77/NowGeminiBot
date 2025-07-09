import { Bot } from "grammy";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// ✅ Vérifie que le token est bien chargé
console.log("✅ Bot Token : ", process.env.TELEGRAM_BOT_TOKEN);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Correction ici : nom complet du modèle requis
const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

bot.command("start", (ctx) => ctx.reply("Bienvenue 👋 Je suis ton bot Gemini !"));

bot.on("message:text", async (ctx) => {
  const prompt = ctx.message.text;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    await ctx.reply(text);
  } catch (err) {
    console.error("❌ Erreur Gemini :", err);
    await ctx.reply("❌ Oups, une erreur s'est produite.");
  }
});

export default bot;
