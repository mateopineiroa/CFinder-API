const express = require("express")
const Stores = require("./models/Stores")       //Cambiar por el model determinado
const router = express.Router()

router.get("/stores", async (req, res) => {
    const stores = await Stores.find()
    res.send(stores)
})

router.post("/stores", () => {})

module.exports = router