// Packages import
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_LOCAL);

// Routes import 
const entitiesRoutes = require("./routes/entities.js")
app.use(entitiesRoutes)

const userRoutes = require("./routes/user.js")
app.use(userRoutes)


if (process.env.PORT) {
    app.listen(process.env.PORT, () => {
        console.log("Server started");
    });
} else {
    app.listen(3000, () => {
        console.log("Server started 3000");
    });
}

app.all('*', (req, res) => {
    res.status(404).json('This route does not exist')
})



