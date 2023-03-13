const express = require('express');
const { param, validationResult } = require('express-validator');
const app = express();
const router = express.Router();

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
  .get(
    //1-rules
    param('id').isMongoId().withMessage('Invalid category id'),

    //2-middleware =>catch errors from rules if exist
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    },
    getCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
