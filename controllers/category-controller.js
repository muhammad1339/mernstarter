const HttpError = require("../model/http-error-model");
const CategoryModel = require('../model/category');

const createNewCategory = async (req, res, next) => {
    const {name, avatarPath} = req.body;
    const categoryFromBody = {name, avatarPath};
    console.log('posting a new category -> Started!');

    try {
        const categoryModel = new CategoryModel(categoryFromBody);
        await categoryModel.save();
        console.log('posting a new category > Done!');

    } catch (e) {
        res.status.json({
            code: res.status.code,
            message: res.status.message
        });
        return;
    }
    // if post request processed successfully reply with json response with success state
    res.status(201)
        .json({
            code: 201,
            message: "category Created Successfully",
            category: categoryFromBody.toObject({getters: true})
        });
}

const getCategoryById = async (req, res, next) => {
    const categoryID = req.params.category_id;
    let resultCategory;
    try {
        resultCategory = await CategoryModel.findById(categoryID);
    } catch (e) {
        return next(new HttpError('Something went wrong', 500));
    }
    // if category not found
    if (!resultCategory) {
        return next(new HttpError('Category with provided id not found', 404));
    }

    res.status(200)
        .json({message: "category found successfully", code: 200, category: resultCategory});
}


const getAllCategories = async (req, res, next) => {
    let resultCategories;
    try {
        resultCategories = await CategoryModel.find().exec();
    } catch (e) {
        return next(new HttpError('Something went wrong', 500));
    }
    // if category not found
    if (!resultCategories) {
        return next(new HttpError('Categories not found', 404));
    }

    res.status(200)
        .json({message: "category found successfully", code: 200, categories: resultCategories});
}


const updateCategoryById = async (req, res, next) => {
    const categoryId = req.category_id;
    const newCategoryName = req.body.name;
    let updatedCategory;
    try {
        updatedCategory = await CategoryModel.findOneAndUpdate({
            "id": categoryId
        }, {name: newCategoryName}).exec();
    } catch (e) {
        return next(new HttpError('Something went wrong', 500));
    }
    // if category not found
    if (!updatedCategory) {
        return next(new HttpError('Category with provided id not found', 404));
    }

    res.status(200)
        .json({
            message: "category updated successfully",
            code: 200,
            updatedCategory: updatedCategory.toObject({getters: true})
        });
}


const deleteCategoryById = async (req, res, next) => {
    const categoryId = req.category_id;
    let deletedCategory;
    try {
        deletedCategory = await CategoryModel.deleteOne({"id": categoryId});
    } catch (e) {
        return next(new HttpError('Something went wrong', 500));
    }
    // if category not found
    if (!deletedCategory) {
        return next(new HttpError('Category with provided id not found', 404));
    }

    res.status(200)
        .json({message: "category deleted successfully", code: 200, deletedCategory});
}


exports.createNewCategory = createNewCategory
exports.getCategoryById = getCategoryById
exports.getAllCategories = getAllCategories
exports.updateCategoryById = updateCategoryById
exports.deleteCategoryById = deleteCategoryById
