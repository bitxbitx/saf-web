const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO : Add required messages
const promoCodeSchema = Schema(
    {
        code: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['Percentage', 'Fixed']
        },
        category: [{
            type: Schema.Types.ObjectId,
            ref: "ProductCategory"
        }],
        maxNumebrOfUses: {
            type: Number,
            required: true,
        },
        numberOfUses: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("PromoCode", promoCodeSchema)