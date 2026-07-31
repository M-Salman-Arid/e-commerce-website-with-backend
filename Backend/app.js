
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/auth", authRoutes)
app.use("/api", userRoutes)

module.exports = app