const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category-controller');

// post new category
router.post('/', categoryController.createNewCategory);

// get all categories
router.get('/', categoryController.getAllCategories);

// get category by id
router.get('/:category_id', categoryController.getCategoryById);

// update category by id
router.patch('/:category_id', categoryController.updateCategoryById);

// delete category by id
router.delete('/:category_id', categoryController.deleteCategoryById);

module.exports = router;