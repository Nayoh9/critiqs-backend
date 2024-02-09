// Packages import 
const express = require('express')
const router = express.Router()
const fileUpload = require("express-fileupload")
const uid = require('uid2');
const sha256 = require('crypto-js/sha256')
const Base64 = require("crypto-js/enc-base64")

const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const convertToBase64 = require("../utils/functions")

// Model import 
const User = require("../Models/User")


// Route to create a new user 

router.post("/user/create", fileUpload(), async (req, res) => {
    try {
        const { username, email, password } = req.body

        const salt = uid(16)
        const hash = password + salt

        console.log(salt)

        const user = new User({
            username: username,
            email: email,
            entities_liked: 0,
            comments_posted: 0
        })

        // await user.save()

        res.status(200).json("User created successfully")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
