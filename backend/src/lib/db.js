// backend/src/lib/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Connexion à MongoDB réussie !");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB:", err.message);
    // On quitte le processus avec une erreur si la connexion échoue
    process.exit(1);
  }
};

export default connectDB;