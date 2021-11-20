const HttpError = require("../model/http-error-model");
const CategoryModel = require("../model/category");

const createNewCategory = async (req, res, next) => {
  const { name, avatarPath } = req.body;
  const categoryFromBody = { name, avatarPath };
  console.log("posting a new category -> Started!");

  try {
    const categoryModel = new CategoryModel(categoryFromBody);
    await categoryModel.save();
    console.log("posting a new category > Done!");
  } catch (e) {
    res.status.json({
      code: res.status.code,
      message: res.status.message,
    });
    return;
  }
  // if post request processed successfully reply with json response with success state
  res.status(201).json({
    code: 201,
    message: "category Created Successfully",
    category: categoryFromBody,
  });
};

const getCategoryById = async (req, res, next) => {
  const categoryID = req.params.category_id;
  let resultCategory;
  try {
    resultCategory = await CategoryModel.findById(categoryID);
  } catch (e) {
    return next(new HttpError("Something went wrong", 500));
  }
  // if category not found
  if (!resultCategory) {
    return next(new HttpError("Category with provided id not found", 404));
  }

  res.status(200).json({
    message: "category found successfully",
    code: 200,
    category: resultCategory,
  });
};

const getAllCategories = async (req, res, next) => {
  let resultCategories;
  try {
      // select for eleminate property on result ex. __v
    resultCategories = await CategoryModel.find().select("-__v");
  } catch (e) {
    return next(new HttpError("Something went wrong", 500));
  }
  // if category not found
  if (!resultCategories) {
    return next(new HttpError("Categories not found", 404));
  }

  res.status(200).json({
    message: "category found successfully",
    code: 200,
    categories: resultCategories.map((cat) => cat.toObject({ getters: true })).reverse(),
  });
};

const updateCategoryById = async (req, res, next) => {
  if (!req.body || (!req.body.name && !req.body.avatarPath)) {
    // 204 No Content
    return next(new HttpError("nothing to update", 210));
  }
  const categoryId = req.params.category_id;
  const newName = req.body.name;
  const newAvatarPath = req.body.avatarPath;
  let category;
  try {
    category = await CategoryModel.findById(categoryId);
  } catch (e) {
    return next(new HttpError("Something went wrong", 500));
  }
  // if category not found
  if (!category) {
    return next(new HttpError("Category with provided id not found", 404));
  }

  let updatedCat;
  try {
    console.log("<<<<<<<<<<<<<<<<<- PATCH ->>>>>>>>>>>>>>>>>");
    //console.log(req.body);
    if (newName && newName.length > 0) category.name = newName;
    if (newAvatarPath && newAvatarPath.length > 0)
      category.avatarPath = newAvatarPath;
    updatedCat = await category.save();
    // console.log(updatedCat.toJSON())
  } catch (e) {
    return next(
      new HttpError("something went wrong, could not update the category", 500)
    );
  }
  res.status(200).json({
    message: "category updated successfully",
    code: 200,
    category: category.toObject({ getters: true }),
  });
};

const deleteCategoryById = async (req, res, next) => {
  const categoryId = req.params.category_id;
  let category;
  try {
    category = await CategoryModel.findById(categoryId);
  } catch (e) {
    return next(new HttpError("Something went wrong", 500));
  }
  // if category not found
  if (!category) {
    return next(new HttpError("Category with provided id not found", 404));
  }

  try {
    await category.remove();
  } catch (e) {
    return next(
      new HttpError("something went wrong, could not update the category", 500)
    );
  }
  res.status(200).json({
    message: "category deleted successfully",
    code: 200,
  });
};

exports.createNewCategory = createNewCategory;
exports.getCategoryById = getCategoryById;
exports.getAllCategories = getAllCategories;
exports.updateCategoryById = updateCategoryById;
exports.deleteCategoryById = deleteCategoryById;
