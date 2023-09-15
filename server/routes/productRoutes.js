const express = require("express")
const { isAuthenticated, AdminRoute } = require("../middleware/auth");

const { createProduct, allProducts, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router()


router.route('/allProducts').get(isAuthenticated, allProducts)
router.route('/getProductDetails/:id').get(isAuthenticated, getProductDetails)



// admin routes
router.route('/admin/createProduct').post(isAuthenticated, AdminRoute("admin"), createProduct)
router.route('/admin/updateProduct/:id').put(isAuthenticated, AdminRoute("admin"), updateProduct)
router.route('/admin/deleteProduct/:id').delete(isAuthenticated, AdminRoute("admin"), deleteProduct)




module.exports = router;