const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const { login, register, getMe, forgotPassword, resetPassword, updateDetails, logout } = require('../controllers/auth.controller')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/me').get(protect, getMe)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resettoken').put(resetPassword)
router.route('/updatedetails').put(protect, updateDetails)
router.route('/logout').get(protect, logout)

module.exports = router