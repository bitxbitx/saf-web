const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const { getUsers, getUser, createUser, updateUser, deleteUser, } = require('../controllers/user.controller')

router.route('/').get(protect, getUsers).post(protect, createUser)
router.route('/:id').get(protect, getUser).put(protect, updateUser).delete(protect, deleteUser)

module.exports = router