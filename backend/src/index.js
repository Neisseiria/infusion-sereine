// backend/src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import reviewRoutes from "./routes/review.routes.js";


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
// CORS avec gestion multi-origines et credentials
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin non autorisée par CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Gérer explicitement les préflight OPTIONS pour toutes les routes
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Branchement des Routes
app.use('/api/infusions', infusionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/contact', contactRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRoutes);

// Démarrage du Serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur le port: ${port}`);
});