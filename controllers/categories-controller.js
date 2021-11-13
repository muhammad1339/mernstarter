const HttpError = require("../model/http-error-model");
const CategoryModel = require('../model/categories-model');

const createNewCategory = async (req, res, next) => {
    const {name, avatarPath} = req.body;
    const categoryFromBody = {name, avatarPath};

    try {
        const categoryModel = new CategoryModel(categoryFromBody);
        await categoryModel.save();
    } catch (e) {
        res.status.json({
            code: res.status.code,
            message: res.status.message
        });
        return;
    }
}

exports.createNewCategory = createNewCategory
