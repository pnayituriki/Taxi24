const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Driver', driverSchema);