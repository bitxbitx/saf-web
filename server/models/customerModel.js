const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const customerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        dob: {
            type: Date, 
            required: [true, 'Please add a dob value']
        },
        age: {
            type: Number,
            required: [true, 'Please add a age value']
        },
        joinedDate: {
            type: String, 
            required: [true, 'Please add a join date value']
        },
        ethnicity: {
            type: String, 
            required: [true, 'Please add a ethnicity value']
        },
        email: {
            type: String, 
            required: [true, 'Please add a email value']
        },
        phoneNumber: {
            type: String, 
            required: [true, 'Please add a phoneNumber value']
        },
        password: {
            type: String, 
            required: [true, 'Please add a password value']
        },
        wishList: {
            type: Schema.Types.ObjectId, 
            ref: "Wishlist", 
        },
        orders: {
            type: Schema.Types.ObjectId, 
            ref: "Orders", 
        },
        points: {
            type: Number, 
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

// Encrypts Password (Bcrypt)
customerSchema.pre("save", async function (next){
    if (this.isModified("password")){
        const hash = await bcrypt.hash(this.password, 8)
        this.password = hash
    }
    next()
})

module.exports = mongoose.model('Customer', customerSchema)