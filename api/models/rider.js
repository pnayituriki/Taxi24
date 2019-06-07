const mongoose = require('mongoose');

const riderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: Number, required: true }
});

module.exports = mongoose.model('Rider', riderSchema);