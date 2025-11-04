import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors()); // autoriser ton frontend GitHub Pages
app.use(express.json());

app.post("/enregistrer-tenue", (req, res) => {
  const { date, images, pourDemain } = req.body;
  const filename = pourDemain ? "tenue_demain.json" : "tenue_aujourdhui.json";
  const data = { [date]: { cherie: images } };

  fs.writeFile(`./${filename}`, JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Erreur écriture fichier" });
    res.json({ message: "Tenue enregistrée ✅" });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
