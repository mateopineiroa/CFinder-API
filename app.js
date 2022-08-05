const express = require("express")
const mongoose = require("mongoose")
const port = 3000
const routes = require("./routes")

mongoose
    .connect("mongodb://localhost:27017/cryptoDB", {useNewUrlParser: true})
    .then(() => {
        const app = express()

        app.use(express.json())

        app.use("/Stores", routes)

        app.listen(port, () => {
            console.log(`The api is running on port ${port}`)
        })
    })