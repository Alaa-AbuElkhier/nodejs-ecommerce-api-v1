const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

const CategoryModel = require('../models/categoryModel');

//@desc   Get list of categories
//@route  GET /api/vi/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res) => {
  // const name = req.body.name;
  // console.log(name);
  // const newCategory = new CategoryModel({ name });
  // newCategory
  //   .save()
  //   .then((doc) => {
  //     res.json(doc);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });

  const categories = await CategoryModel.find({});
  res.status(200).json({ result: categories.length, data: categories });
});

//@desc   Create category
//@route  POST /api/vi/categories
//@access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
  //async await
  // try {
  //   const category = await CategoryModel.create({ name, slug: slugify(name) });
  //   res.status(201).json({ data: category });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // .then((category) => {
  //   res.status(201).json({ data: category });
  // })
  // .catch((err) => {
  //   res.status(400).send(err);
  // });
});
