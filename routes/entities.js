// Packages import 
const express = require("express")
const router = express.Router()
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Utils import 
const convertToBase64 = require('../utils/functions')


// Models import 
const Entity = require("../Models/Entity");

// Route to create a new entity
router.post("/entity/create", fileUpload(), async (req, res) => {
    try {
        const pictureToUpload = req.files.entity_picture

        const result = await cloudinary.uploader.upload(convertToBase64(pictureToUpload), { folder: "critiqs" })
        console.log(result);

        const { name, category, origin } = req.body

        const entity = new Entity({
            name: name,
            category: category,
            origin: origin,
            entity_picture: result,
            entity_comments: [],
            number_of_like: 0
        })

        await entity.save()

        res.status(200).json("New entity created")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router