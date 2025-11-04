import express from "express";
import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";

const app = express();
app.use(cors());
app.use(express.json());

// ⚙️ Configure ton bot
const DISCORD_TOKEN = "TON_TOKEN_ICI";
const CHANNEL_ID = "816721610269786142"; // clic droit sur le salon → "Copier l'identifiant" (activer le mode développeur Discord)

// Initialise le client Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// 🔔 Endpoint appelé par ton site
app.post("/message", async (req, res) => {
  const { message } = req.body;
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send(message);
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur Discord :", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("🌐 Serveur en ligne"));
client.login(DISCORD_TOKEN);

