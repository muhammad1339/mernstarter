const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelName = "Product";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    priceAfterDiscount: { type: Number, required: false, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    discountType: { type: Number, required: false, default: 0 },
    avatarPath: { type: String, required: true },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    storeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Store",
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model(modelName, productSchema);
