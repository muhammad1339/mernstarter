const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./user");

const modelName = "Store";

const storeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    avatarPath: { type: String, required: false },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: user.modelName,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model(modelName, storeSchema);
