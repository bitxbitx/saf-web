const express = require('express')
const router = express.Router()
const { protect } = require('../../middleware/auth.middleware')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, } = require('../../controllers/ecom/product.controller')

router.route('/').get(protect, getProducts).post(protect, createProduct)
router.route('/:id').get(protect, getProduct).put(protect, updateProduct).delete(protect, deleteProduct)

module.exports = router