const express = require('express')
const router = express.Router()
const { protect } = require('../../middleware/auth.middleware')
const { getProductCategories, getProductCategory, createProductCategory, updateProductCategory, deleteProductCategory, } = require('../../controllers/ecom/productCategory.controller')

router.route('/').get(protect, getProductCategories).post(protect, createProductCategory)
router.route('/:id').get(protect, getProductCategory).put(protect, updateProductCategory).delete(protect, deleteProductCategory)

module.exports = router