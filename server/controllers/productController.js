const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")


exports.createProduct = asyncHandler(async (req, res) => {
    req.body.user = req.user._id
    const product = await Product.create(req.body)

    if (product) {

        return res.status(201).json({
            success: true,
            msg: "product created successfully",
            product
        })

    }
    else {
        return res.status(400).json({
            success: false,
            msg: "product creation failed !"
        })
    }
})




// AllProducts + search + pagination

exports.allProducts = asyncHandler(async (req, res) => {
    // Number of products to show per page
    const productsPerPage = 6;

    // Extract the requested page number from the URL's query parameters. Default to page 1 if not provided.
    const page = Number(req.query.pageNumber) || 1;

    // make empty object for filter 
    const filters = {};

    // filter by product name
    if (req.query.keyword) {
        filters.name = {
            $regex: req.query.keyword,
            $options: "i"
        };
    }

    // filter by category
    if (req.query.category) {
        filters.category = req.query.category;
    }

    // filter by min max price
    if (req.query.minPrice && req.query.maxPrice) {
        filters.price = {
            $gte: req.query.minPrice, // from like 200
            $lte: req.query.maxPrice // to like 300
        };
    }

    // Count the total number of products that match the filters
    const count = await Product.countDocuments(filters);

    // Fetch products based on the filters and pagination parameters
    const products = await Product.find(filters)
        .limit(productsPerPage)
        .skip(productsPerPage * (page - 1));

    return res.json({ products, page, pages: Math.ceil(count / productsPerPage), count });
});





// update PRODUCT  --- admin

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(400).json({
            success: false,
            msg: "product not found"
        })
    }
    else {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        return res.status(201).json({
            success: true,
            msg: "product updated successfully",
            updatedProduct
        })
    }


})



// delete product --admin

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(400).json({
            success: false,
            msg: "product not found"
        })
    }
    else {
        const delPr = await Product.findByIdAndDelete(req.params.id)

        if (delPr) {

            return res.status(201).json({
                success: true,
                msg: "product deleted successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "failed to delete product !"
            })
        
        }
    }



})



// get Product details 

exports.getProductDetails = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(400).json({
            success: false,
            msg: "product not found"
        })
    }
    else {
        return res.status(201).json({
            success: true,
            product
        })
    }
})



// create product reveiwe
exports.createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment} = req.body;
})