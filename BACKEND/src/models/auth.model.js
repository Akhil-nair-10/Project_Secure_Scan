const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email: { type: String, unique: true },
    password: String,
    scanHistory: [
        {
            filename: String,
            verdict: String,
            scannedAt: { type: Date, default: Date.now }
        }
    ]
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;