const express = require('express');
const app = express();
const router = express.Router();

const {
  getCategories,
  createCategory,
  getCategory,
} = require('../services/categoryService');

// app.get('/', getCategories);
//  app.post('/', createCategory);
router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory);

module.exports = router;
