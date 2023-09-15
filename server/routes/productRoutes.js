const express = require("express")
const { isAuthenticated, AdminRoute } = require("../middleware/auth");

const { createProduct, allProducts, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview } = require("../controllers/productController");

const router = express.Router()


router.route('/allProducts').get(allProducts)
router.route('/getProductDetails/:id').get(getProductDetails)
router.route('/createReview').put(isAuthenticated, createProductReview)
router.route('/getProductReviews').get(getProductReviews)
router.route('/deleteProductReview').delete(isAuthenticated,deleteProductReview)



// admin routes
router.route('/admin/createProduct').post(isAuthenticated, AdminRoute("admin"), createProduct)
router.route('/admin/updateProduct/:id').put(isAuthenticated, AdminRoute("admin"), updateProduct)
router.route('/admin/deleteProduct/:id').delete(isAuthenticated, AdminRoute("admin"), deleteProduct)




module.exports = router;