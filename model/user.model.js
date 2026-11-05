const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
    username : { 
        type: String,
        required: true,
        unique: true,
        trim: true 
    },
    email : {
        type: String,
        required: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone : { 
        type: String,
        trim: true
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer','admin'],
        default: 'customer'
    },
    isApproved: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true    
})

module.exports = mongoose.model('User', userSchema);