const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelName = "Category";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    avatarPath: { type: String, required: false },
  },
  { timestamps: { createdAt: "createdAt" } },
  { __v: { type: Number, select: false } },
  { _id: { type: mongoose.Types.ObjectId, select: false } }
);

module.exports = mongoose.model(modelName, categorySchema);
