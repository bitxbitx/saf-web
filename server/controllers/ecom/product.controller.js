const asyncHandler = require('express-async-handler');
const Product = require('../../models/ecom/product.model');

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json({ product });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category');
    res.json({ products });
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    res.json({ product });
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json({ product });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Product removed' });
});

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };