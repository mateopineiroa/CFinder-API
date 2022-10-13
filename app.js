const express = require("express")
const mongoose = require("mongoose")
const port = 3000
const routes = require("./routes")

mongoose
    // .connect("mongodb://localhost:27017/cryptoDB", {useNewUrlParser: true})
    .connect("mongodb+srv://mateopineiro:099389720@clustermat.klwat7q.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        const app = express()

        app.use(express.json())

        app.use(express.urlencoded({
            extended: true
          }))

        app.use("/Stores", routes)

        app.listen(port, () => {
            console.log(`The api is running on port ${port}`)
        })
    })