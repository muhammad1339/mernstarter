const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelName = 'Category';

const categorySchema = new Schema({
    name: {type: String, required: true},
    avatarPath: {type: String, required: false},
}, {timestamps: {createdAt: 'createdAt'}});

module.exports = mongoose.model(modelName, categorySchema);