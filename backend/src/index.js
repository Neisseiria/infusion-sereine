// backend/src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js"; // On importe notre fonction de connexion

// Importer tous nos routeurs
import infusionsRouter from "./routes/infusions.routes.js";
import usersRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import orderRouter from "./routes/order.routes.js";

// Lancer la connexion à la base de données
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Configuration des Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Branchement des Routes
app.use('/api/infusions', infusionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/contact', contactRouter);
app.use('/api/orders', orderRouter);

// Démarrage du Serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur le port: ${port}`);
});