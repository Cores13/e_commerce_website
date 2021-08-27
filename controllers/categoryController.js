const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    // If user has role = 1 -----> admin
    // Only admin can create, delete and update categories.
    const { name } = req.body;
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: "Ova kategorija vec postoji." });
    }
    const newCategory = new Category({ name });

    await newCategory.save();
    res.json({ msg: "Kategorija uspjesno kreirana." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const products = await Products.findOne({ category: req.params.id });
    if (products) {
      return res
        .status(400)
        .json({
          msg: "Izbrisite sve proizvode iz ove kategorije kako bi mogli izbrisati kategoriju.",
        });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Kategorija uspjesno izbrisana." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { name }
    );
    if (!updatedCategory) {
      return res.status(400).json({
        msg: "Kategorija koju zelite urediti vise ne postoji.",
      });
    }
    res.json({ msg: "Kategorija uspjesno izmjenjena." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
