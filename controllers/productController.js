const Products = require('../models/productModel');


const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const createProduct = async (req, res) => {
    try {
        // If user has role = 1 -----> admin
        // Only admin can create, delete and update categories.
        const {product_id, title, price, description, content, images, category} = req.body;
        if(!images) {
            return res.status(400).json({msg: 'No image uploaded.'});
        }
        //Check if product already exists
        const product = await Products.findOne({product_id});
        if(product) {
            return res.status(400).json({msg: 'This product already exists.'});
        }
        const newProduct = new Products({product_id, title: title.toLowerCase(), price, description, content, images, category});

        await newProduct.save();
        res.json('Product created successfully.'); 
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.json({msg: 'Product deleted successfully.'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const {product_id, title, price, description, content, images, category} = req.body;
        const updatedProduct = await Products.findOneAndUpdate({_id: req.params.id}, {product_id, title, price, description, content, images, category});
        if(!updatedProduct) {
            return res.status(400).json({msg: 'Product that you want to update does not exist anymore.'});
        }
        res.json({msg: 'Product updated successfully.'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
};