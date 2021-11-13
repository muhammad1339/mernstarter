const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelName = 'User';

const userSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatarPath: {type: String, required: true},
    address: {type: String, required: true},
}, {timestamps: {createdAt: 'createdAt'}});

module.exports = mongoose.model(modelName, userSchema);