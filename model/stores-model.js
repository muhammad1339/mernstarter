const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./users-model')

const modelName = 'Store';

const storeSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false},
    address: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
    creator: {type: mongoose.Types.ObjectId, required: false, ref: user.modelName}
});

module.exports = mongoose.model(modelName, storeSchema);