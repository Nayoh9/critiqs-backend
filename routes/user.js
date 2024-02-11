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

const convertToBase64 = require('../utils/convertToBase64')

// Model import 
const User = require("../Models/User");

// Utils import 
const containsSpaces = require('../utils/containsSpaces')

// Route to create a new user 
router.post("/user/create", fileUpload(), async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username) {
            throw new Error("No username received")
        }

        const userExistinDB = await User.findOne({ "user.username": username })
        const emailExistinDB = await User.findOne({ email: email })

        if (userExistinDB) {
            return res.status(403).json("Username already in use")
        }

        if (emailExistinDB) {
            return res.status(403).json("Email already in use")
        }

        if (!password) {
            throw new Error("No password received")
        }

        containsSpaces(username, password, email)

        const token = uid(16)
        const salt = uid(16)
        const hash = sha256(password + salt).toString(Base64)

        let result = "none"

        if (req.files) {
            const pictureToUpload = req.files.avatar
            result = await cloudinary.uploader.upload(convertToBase64(pictureToUpload), { folder: "critiqs/users_avatars" })
        }

        const user = new User({
            user: {
                username: username,
                avatar: result,
            },
            email: email,
            hash: hash,
            salt: salt,
            token: token,
            entities_liked: 0,
            comments_posted: 0
        })

        await user.save()

        res.status(200).json("User created successfully")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Route to login a user 
router.get("/user/login", async (req, res) => {
    try {
        const { email, password, username } = req.body

        if (!password || !username && !email) {
            throw new Error("Wrong email/username or password")
        }

        containsSpaces(password, email ? email : "", username ? username : "")

        const userExistinDB = await User.findOne({ $or: [{ email: email }, { "user.username": username }] })

        if (!userExistinDB) {
            return res.status(404).json("Wrong email or password")
        }

        const userSalt = userExistinDB.salt
        const hash2 = sha256(password + userSalt).toString(Base64)

        if (hash2 !== userExistinDB.hash) {
            return res.status(404).json("Wrong email or password")
        }

        res.status(200).json("User connected, " + userExistinDB.token)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
