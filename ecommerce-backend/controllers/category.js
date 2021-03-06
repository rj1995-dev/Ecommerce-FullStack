const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Create category by Admin
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

//find category by id
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category is does not found"
      });
    }
    req.category = category;
    next();
  });
};

//Read the category by Admin
exports.read = (req, res) => {
  return res.json(req.category);
};

//Update Category by Admin
exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

//Delete Category by Admin
exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Category deleted"
    });
  });
};

//Listing the categories
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status.json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
