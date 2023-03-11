const express = require('express');
const app = express();
const router = express.Router();

const {
  getCategories,
  createCategory,
} = require('../services/categoryService');

// app.get('/', getCategories);
//  app.post('/', createCategory);
router.route('/').get(getCategories).post(createCategory);

module.exports = router;
