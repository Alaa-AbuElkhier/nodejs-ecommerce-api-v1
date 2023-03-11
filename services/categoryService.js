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
  //create pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; // if we in page number 2---> (2-1)*5 =5 --->then we will skip 5 documents and show the next 5

  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
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
