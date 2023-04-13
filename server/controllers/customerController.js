const asyncHandler = require('express-async-handler')

const Customer = require('../models/customerModel')

// @desc    Get Customers
// @route   GET /api/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find()

    res.status(200).json(customers)
})

// @desc    Get Customer
// @route   GET /api/customers/:id
// @access  Private
const getCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer){
        res.status(400)
        throw new Error('Customer not found')
    }

    res.status(200).json(customer)
})

// @desc    Create Customer
// @route   POST /api/customers
// @access  Private
const setCustomer = asyncHandler(async (req, res) => {

    if (!req.body) {
        res.status(400)
        throw new Error('Customer not found')
    }

    const customer = await Customer.create({
        name: req.body.name,
        dob: new Date(req.body.dob),
        age: new Date().getFullYear() - new Date(req.body.dob).getFullYear(),
        joinedDate: new Date().getFullYear(),
        ethnicity: req.body.ethnicity,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
    })

    res.status(200).json(customer)
})

// @desc    Update Customers
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer){
        res.status(400)
        throw new Error('Customer not found')
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedCustomer)
})

// @desc    Delete Customers
// @route   DELETE /api/customers/:id
// @access  Private
const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer){
        res.status(400)
        throw new Error('Customer not found')
    }

    await customer.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getCustomers,
    getCustomer,
    setCustomer,
    updateCustomer,
    deleteCustomer,
}
