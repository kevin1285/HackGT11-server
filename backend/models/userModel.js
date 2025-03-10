const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    allegerns: {
        type: [String],
        default: [],
    }
})

User = mongoose.model('User', userSchema);
module.exports = User;