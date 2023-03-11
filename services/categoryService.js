const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

const CategoryModel = require('../models/categoryModel');
exports.getCategories = (req, res) => {
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
};

//@desc   Create Category
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
