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
        else {
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
    const { productId, comment, rating } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };


    const product = await Product.findById(productId);


    if (!product) {
        return next(new errorHandler("Product not found", 404));
    }

    const existingReviwed = product.reveiws.findIndex(
        r => r.user.toString() === req.user._id.toString() // user id in reveiwes array if equals to the userid of loged in so 
    )

    if (existingReviwed !== -1) {
        product.reveiws[existingReviwed].comment = comment;
        product.reveiws[existingReviwed].rating = rating;

    }
    else {
        product.reveiws.push(review)
        product.numOfReviews = product.reveiws.length;
    }

    let avg = 0;
    product.reveiws.forEach(r => (avg += r.rating));
    product.ratings = avg / product.reveiws.length;


    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "reveiwe added successfully 🤩"
    });
})





// get all reveiwes of single product


exports.getProductReviews = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new errorHandler("Product not found", 404));
    }

    return res.status(200).json({
        success: true,
        reviews: product.reveiws
    });

})




// delete product revivewe

exports.deleteProductReview = asyncHandler(async (req, res, next) => {

    const { productId, id } = req.query;

    const product = await Product.findById(productId);

    if (!product) {
        return next(new errorHandler("Product not found", 404));
    }

    const reviewToDelete = product.reveiws.find((r) => r._id.toString() === id);

    if (!reviewToDelete) {
        return next(new errorHandler("Review not found", 404));
    }

    if (reviewToDelete.user.toString() !== req.user._id.toString()) {
        return next(new errorHandler("You are not authorized to delete this review", 403));
    }

    // Remove the review if user matched
    const rev = product.reveiws = product.reveiws.filter((r) => r._id.toString() !== id);

    // Calculate the new average rating and update the product's properties

    let avg = 0;
    if (rev.length > 0) {
        rev.forEach((rev) => {
            avg += rev.rating;
        });
        avg /= rev.length;
    }

    const numOfReviews = rev.length;

    const updatedReveiweAfterDelete = await Product.findByIdAndUpdate(req.query.productId, { rev, ratings: avg, numOfReviews }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        msg: "reveiwe deleted successfully  ㅤ"
    });

})