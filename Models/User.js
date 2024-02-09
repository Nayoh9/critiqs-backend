const mongoose = require("mongoose")

const User = mongoose.model("User", {
    username: String,
    email: String,
    avatar: Object,
    hash: String,
    salt: String,
    token: String,
    entities_liked: Number,
    comments_posted: Number
})

module.exports = User