const mongoose = require('mongoose')

const Entity = mongoose.model("Entity", {
    name: String,
    category: String,
    origin: String,
    entity_picture: Object,
    entity_comments: Array,
    number_of_like: Number
})



module.exports = Entity