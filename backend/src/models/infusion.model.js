// backend/models/infusion.model.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const infusionSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  bienfaits: { type: String, required: true },
  prix: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

const Infusion = mongoose.model('Infusion', infusionSchema);
export default Infusion;