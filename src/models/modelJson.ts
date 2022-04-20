const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const features = new Schema({
    
    id: { type: Number, unique: true, required: true },
    type: { type: String, required: true },
    geometry: {
        type: { type: String, required: true },
        coordinates: { type: Array, required: true }
    },
    properties: {
        name: { type: String, required: true },
        postalCode: { type: String, required: true },
        tel: { type: String, required: true },
        location: { type: String, required: true }
    }
});

module.exports = mongoose.model('feature', features); 