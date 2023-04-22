const mongoose = require('mongoose');

const productVariantSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        attributes: {
            type: Map,
            of: String,
            default: {}
          },
        price: {
            type: Number,
            required: true,
        },
        inventoryStock: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        sku: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// productVariantSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'product',
//         select: '-productVariant'
//     });
//     next();
// });

productVariantSchema.virtual('addToCartCount', {
    ref: 'AddToCart',
    localField: '_id',
    foreignField: 'productVariant',
    count: true,
    match: {
        createdAt: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        },
    },
});


productVariantSchema.virtual('totalSales', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'orderItems',
    justOne: false,
    match: { status: 'completed' },
    options: { sort: { createdAt: -1 } },
    // Calculate the total sales of this product variant
    // by iterating over each order item and adding up the
    // price of the item if it matches this product variant
    get: function () {
      return this.orderItems.reduce((total, orderItem) => {
        if (orderItem.productVariant.equals(this._id)) {
          return total + orderItem.price;
        }
        return total;
      }, 0);
    },
  });
module.exports = mongoose.model('ProductVariant', productVariantSchema);
