const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const store = require("./store");

const Schema = mongoose.Schema;

const modelName = 'User';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    avatarPath: { type: String, required: true },
    address: { type: String, required: true },
    ownedStores : [{type : mongoose.Types.ObjectId ,required: true , ref : 'Store'}]
  },
  { timestamps: { createdAt: "createdAt" } }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model(modelName, userSchema);
