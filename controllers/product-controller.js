const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../model/http-error-model");

const ProductModel = require("../model/product");
const StoreModel = require("../model/store");
const CategoryModel = require("../model/category");

const createNewProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs , check your data", 422));
  }
  // destruct request body
  const {
    name,
    description,
    shortDescription,
    price,
    priceAfterDiscount,
    discount,
    discountType,
    avatarPath,
    categoryId,
    storeId,
  } = req.body;
  let product;
  try {
    product = new ProductModel({
      name,
      description,
      shortDescription,
      price,
      priceAfterDiscount,
      discount,
      discountType,
      avatarPath,
      categoryId,
      storeId,
    });
    await product.save();
  } catch (error) {
    const e = new HttpError("unable to create a new product", 500);
    return next(e);
  }
  res.status(201).json({
    code: 201,
    message: "product created succcessfully",
    product,
  });
};

exports.createNewProduct = createNewProduct;
