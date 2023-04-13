const mongoose = require('mongoose');

const ShopLocationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        longitude: {
            type: Number,
            required: [true, 'Please add a longitude value']
        },
        latitude: {
            type: Number,
            required: [true, 'Please add a latitude value']
        },
        address: {
            type: String,
            required: [true, 'Please add a address value']
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please add a phoneNumber value']
        },
        email: {
            type: String,
            required: [true, 'Please add a email value']
        },
        openingHours: {
            type: String,
            required: [true, 'Please add a openingHours value']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('ShopLocation', ShopLocationSchema)
