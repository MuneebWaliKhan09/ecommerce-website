const express = require("express")
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword } = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/auth")
const router = express.Router()

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/logoutUser').get(logoutUser)
router.route('/forgot/password').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/getUserDetails').get(isAuthenticated, getUserDetails)
router.route('/updateUserPassword').put(isAuthenticated, updateUserPassword)








module.exports = router;