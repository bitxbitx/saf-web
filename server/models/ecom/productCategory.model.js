const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productCategorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name for this catergory"]
        },
        descriptione: {
            type: String,
            required: [true, "Please add a description for this catergory"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("ProductCategory", productCategorySchema)