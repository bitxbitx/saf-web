const express = require('express')
const router = express.Router()
const {getCustomers, getCustomer, setCustomer, updateCustomer, deleteCustomer} = require('../controllers/customerController')

router.route('/').get(getCustomers).post(setCustomer)
router.route('/:id').get(getCustomer).delete(deleteCustomer).put(updateCustomer)

module.exports = router