const mongoose = require("mongoose")

const stores = mongoose.Schema({
    Name: String,
    Address: String,            //Will be the stringify of an array of objects containing the properties: address, phone number, instagram, calification of store
    Payment_Methods: String,
    Category: String,
})


module.exports = mongoose.model("Stores", stores)

/* Califications and opinions model(?) */