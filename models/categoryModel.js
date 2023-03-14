const mongoose = require('mongoose');
//1.create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'], //if the name will repeated will send code 11000
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    //for reset names which contain spaces an uppercase
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
//2.create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
