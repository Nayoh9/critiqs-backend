// Models import 
const User = require("../Models/User")

const isAuthenticaded = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.status(404).json("Unauthorized")
        }

        const token = req.headers.authorization.replace("Bearer ", "")
        const userExistinDB = await User.findOne({ token: token })

        if (!userExistinDB) {
            return res.status(404).json("Unauthorized")
        } else {
            next()
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = isAuthenticaded