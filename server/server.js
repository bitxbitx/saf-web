const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error.middleware');
const connectDB = require('./config/db')

const port = process.env.PORT || 8000

connectDB()

const app = express()

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(errorHandler)

// Common Routes
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

// Social Routes
app.use('/api/shares', require('./routes/social/share.routes'))
app.use('/api/likes', require('./routes/social/like.routes'))
app.use('/api/comments', require('./routes/social/comment.routes'))
app.use('/api/posts', require('./routes/social/post.routes'))

// Ecommerce Routes
app.use('/api/add-to-cart', require('./routes/ecom/addToCart.routes'))
app.use('/api/orders', require('./routes/ecom/order.routes'))
app.use('/api/products', require('./routes/ecom/product.routes'))
app.use('/api/product-category', require('./routes/ecom/productCategory.routes'))
app.use('/api/promoCodes', require('./routes/ecom/promoCode.routes'))
app.use('/api/shop-location', require('./routes/ecom/shopLocation.routes'))
app.use('/api/wishlist', require('./routes/ecom/wishlist.routes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
