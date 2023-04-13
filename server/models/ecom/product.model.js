const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        description: {
            type: String,
            required: [true, 'Please add a name value']
        },
        price: {
            type: Number, 
            required: [true, 'Please add a price value']
        },
        stock: {
            type: Number, 
            required: [true, 'Please add a stock value']
        },
        image:{
            type: String
        },
        category: {
            type: String,
        }
            
    }, 
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Product', productSchema)
