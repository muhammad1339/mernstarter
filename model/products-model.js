const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category = require('./categories-model');
const store = require('./categories-model');

const modelName = 'Product';

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    shortDescription: {type: String, required: true},
    price: {type: Number, required: true},
    priceAfterDiscount: {type: Number, required: true},
    discount: {type: Number, required: true},
    discountType: {type: Number, required: true},
    avatarPath: {type: String, required: true},
    categoryId: {type: mongoose.Types.ObjectId, required: true, ref: category.modelName},
    storeId: {type: mongoose.Types.ObjectId, required: true, ref: store.modelName},
});

module.exports = mongoose.model(modelName, productSchema)