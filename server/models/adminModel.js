const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        createdDate: {
            type: String, 
            required: [true, 'Please add a join date value']
        },
        email: {
            type: String, 
            required: [true, 'Please add a email value']
        },
        password: {
            type: String, 
            required: [true, 'Please add a password value']
        },
        rolesAndResponsibilities: {
            type: Schema.Types.ObjectId, 
            ref: "Roles and Responsibility", 
        },
    },
    {
        timestamps: true,
    }
)

// Encrypts Password (Bcrypt)
adminSchema.pre("save", async function (next){
    if (this.isModified("password")){
        const hash = await bcrypt.hash(this.password, 8)
        this.password = hash
    }
    next()
})


module.exports = mongoose.model('Admin', adminSchema)