const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
    fromPlace: { type: 'String', required: true },
    toPlace: { type: 'String', required: true },
    dateTime: { type: 'Date', default: Date.now },
    status: { type: 'Boolean', default: true }
});

module.exports = mongoose.model('Trip', tripSchema);