const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value'],
        },
        description: String,
        image: {
            type: String,
        },
        productCategory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductCategory',
        }],
        attributes: [String],
        productDetails : [String],
    },
    {
        timestamps: true,
    }
);

productSchema.virtual('totalInventoryStock', {
    ref: 'ProductVariant',
    localField: '_id',
    foreignField: 'product',
    pipeline: [
        {
            $group: {
                _id: '$product',
                totalInventoryStock: {
                    $sum: '$inventoryStock',
                },
            },
        },
    ],
    justOne: true,
});


productSchema.virtual('addToCartCount', {
    ref: 'AddToCart',
    localField: '_id',
    foreignField: 'product',
    count: true,
    match: {
        createdAt: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        },
    },
});

productSchema.virtual('productVariant', {
    ref: 'ProductVariant',
    localField: '_id',
    foreignField: 'product',
});


productSchema.virtual('wishlistCount', {
    ref: 'Wishlist',
    localField: '_id',
    foreignField: 'product',
    count: true,
    match: {
        createdAt: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        },
    },
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'productVariant',
    })

    next();
});

module.exports = mongoose.model('Product', productSchema);
