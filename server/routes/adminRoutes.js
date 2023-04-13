const express = require('express')
const router = express.Router()
const {getAdmins, getAdmin, setAdmin, updateAdmin, deleteAdmin,} = require('../controllers/adminController')

router.route('/').get(getAdmins).post(setAdmin)
router.route('/:id').get(getAdmin).delete(deleteAdmin).put(updateAdmin)

module.exports = router