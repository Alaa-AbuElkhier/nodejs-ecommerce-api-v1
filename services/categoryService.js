const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

const Category = require('../models/categoryModel');
const CategoryModel = require('../models/categoryModel');

//@desc   Get list of categories
//@route  GET /api/vi/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res) => {
  // const name = req.body.name;
  // console.log(name);
  // const newCategory = new Category({ name });
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

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});

//@desc   Create category
//@route  POST /api/vi/categories
//@access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
  //async await
  // try {
  //   const category = await Category.create({ name, slug: slugify(name) });
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

//@desc   Get specific category by id
//@route  GET /api/vi/categories/:id
//@access Public
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

//@desc   Update specific category by id
//@route  PUT /api/vi/categories/:id
//@access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) }, //the var and the category name is the same  in the naming so we can summary this {name:name} to this {name}
    { new: true } //for return updated category
  );
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

//@desc   Delete specific category by id
//@route  DELETE /api/vi/categories/:id
//@access Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findOneAndDelete(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(204).json({ msg: 'category is deleted' });
});
