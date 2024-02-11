const mongoose = require('mongoose')

const Entity = mongoose.model("Entity", {
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    entity_picture: {
        type: Object,
        required: true
    },
    entity_comments: Array,
    number_of_like: Number,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})



module.exports = Entity