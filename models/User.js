import mongoose from 'mongoose';
import Schema from 'mongoose';
const userSchema = new mongoose.Schema({
    fullName: String,
    passwor: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

export default User;