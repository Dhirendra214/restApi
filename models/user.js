import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{
        title : { type: String , required: true, unique: true},
        dueDate : { type: String , required: true },
        attachements : { type: String, required: true }
    }]
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');
