const express = require('express');
const { param, validationResult } = require('express-validator');
const app = express();
const router = express.Router();

const {
  getCategoryValidator,
} = require('../utils/validators/categoryValidator');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

// app.get('/', getCategories);
//  app.post('/', createCategory);
router.route('/').get(getCategories).post(createCategory);
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
