const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        email: {
            type: String,
            required: [true, 'Please add a email value'],
            unique: true,
        },
        username: {
            type: String,
            required: [true, 'Please add a username value'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password value']
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'customer'],
            default: 'user'
        },
        dob: Date,
        ethnicity: String,
        phoneNumber: {
            type: String,
            required: [true, 'Please add a phoneNumber value'],
            unique: true,
        },
        address: String,
        image: {
            type: String,
        },
        points: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)        

// Encrypts Password (Bcrypt)
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(12)
            const hash = await bcrypt.hash(this.password, salt)
            this.password = hash
        }
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

userSchema.virtual('cart', {
    ref: 'AddToCart',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
})

userSchema.virtual('wishList', {
    ref: 'Wishlist',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
})

userSchema.virtual('age').get(function () {
    const today = new Date()
    const birthDate = new Date(this.dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
})

userSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'cart',
        select: '-user',
    }).populate({
        path: 'wishList',
        select: '-user',
    })
    next()
})


module.exports = mongoose.model('Admin', userSchema)