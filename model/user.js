const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelName = 'User';

const userSchema = new Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
});

module.exports = mongoose.model(modelName, userSchema);