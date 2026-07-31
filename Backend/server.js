
const express = require("express")
const dotenv = require("dotenv").config()
const app = require("./app")
const {connectDB} = require("./config/db")

connectDB();

const PORT  = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})