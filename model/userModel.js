const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
        minlength: [6],
        select: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    friendRequests: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ]
})

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel }