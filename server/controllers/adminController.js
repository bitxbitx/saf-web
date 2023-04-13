const asyncHandler = require('express-async-handler')

const Admin = require('../models/adminModel')

// @desc    Get Admins
// @route   GET /api/admins
// @access  Private
const getAdmins = asyncHandler(async (req, res) => {
    const admins = await Admin.find()

    res.status(200).json(admins)
})

// @desc    Get Admin
// @route   GET /api/admins/:id
// @access  Private
const getAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin){
        res.status(400)
        throw new Error('Admin not found')
    }

    res.status(200).json(admin)
})

// @desc    Create Admin
// @route   POST /api/admins
// @access  Private
const setAdmin = asyncHandler(async (req, res) => {

    if (!req.body) {
        res.status(400)
        throw new Error('Admin not found')
    }

    const admin = await Admin.create({
        name: req.body.name,
        createdDate: new Date().getFullYear(),
        email: req.body.email,
        password: req.body.password,
    })

    res.status(200).json(admin)
})

// @desc    Update Admin
// @route   PUT /api/admins/:id
// @access  Private
const updateAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin){
        res.status(400)
        throw new Error('Admin not found')
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedAdmin)
})

// @desc    Delete Customers
// @route   DELETE /api/customers/:id
// @access  Private
const deleteAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin){
        res.status(400)
        throw new Error('Admin not found')
    }

    await admin.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAdmins,
    getAdmin,
    setAdmin,
    updateAdmin,
    deleteAdmin,
}
