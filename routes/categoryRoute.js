const express = require('express');
const app = express();
const router = express.Router();

const { getCategories } = require('../services/categoryService');

app.post('/', getCategories);

module.exports = router;
