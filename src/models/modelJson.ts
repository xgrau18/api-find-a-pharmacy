const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const features = new Schema({
    
    type:String,
    geometry:{
        type:String,
        coordinates:Array
    },
    properties:{
        name:String,
        postalCode:String,
        tel:String
    }
});

module.exports = mongoose.model('feature', features); 