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
const convertToBase64 = require('../utils/convertToBase64')
const isAuthenticaded = require('../middlewares/isAuthenticated')



// Models import 
const Entity = require("../Models/Entity");
const User = require("../Models/User")

// Route to create a new entity
router.post("/entity/create", isAuthenticaded, fileUpload(), async (req, res) => {
    try {
        if (!req.files) {
            throw new Error('Please upload an image')
        }

        const { name, category, origin } = req.body

        const pictureToUpload = req.files.entity_picture

        let result = await cloudinary.uploader.upload(convertToBase64(pictureToUpload), {
            folder: "critiqs/entities_images"
        })

        const token = req.headers.authorization.replace("Bearer ", "")
        const user = await User.findOne({ token: token })


        const entity = new Entity({
            name: name,
            category: category,
            origin: origin,
            entity_picture: result,
            created_by: user,
            entity_comments: [],
            number_of_like: 0,
        })

        await entity.save()

        res.status(200).json("New entity created")


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router