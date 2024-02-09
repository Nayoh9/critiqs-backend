const mongoose = require("mongoose")

const User = mongoose.model("User", {

    user: {
        username: {
            type: String,
            required: true,
        },
        avatar: Object
    },
    email: {
        type: String,
        required: true
    },

    hash: String,
    salt: String,
    token: String,
    entities_liked: Number,
    comments_posted: Number
})

module.exports = User