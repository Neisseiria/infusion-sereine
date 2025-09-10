import mongoose from 'mongoose';
const tempUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
}, { timestamps: true });
const TempUser = mongoose.model('TempUser', tempUserSchema);
export default TempUser;