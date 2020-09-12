const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'sorry First Name Is required'] },
    lastName: { type: String, required: [true, 'sorry Last Name Is required'] },
    email: { type: String, required: [true, 'sorry email Is required'] },
    password: { type: String, required: [true, 'sorry email Is required'] },
    date: { type: Date, default: Date.now }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;