const Category = require('../models/categoryModel');


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const createCategory = async (req, res) => {
    try {
        // If user has role = 1 -----> admin
        // Only admin can create, delete and update categories.
        const {name} = req.body;
        const category = await Category.findOne({name});
        if(category) {
            return res.status(400).json({msg: 'This category already exists.'});
        }
        const newCategory = new Category({name});

        await newCategory.save();
        res.json('Category created successfully.');
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({msg: 'Category deleted successfully.'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const updateCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, {name});
        if(!updatedCategory) {
        return res.status(400).json({msg: 'Category that you want to update does not exist anymore.'});

        }
        res.json({msg: 'Category updated successfully.'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
};