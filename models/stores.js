const mongoose = require("mongoose")

const address = mongoose.Schema({
    Adress: String,
    Phone: String,              //Or number(?)
    Instagram: String,
    Web: String,
    Maps: String                //Link to google maps(?

})

const stores = mongoose.Schema({
    Name: String,
    Address: [address],            //Could be the stringify of an array of objects containing the properties: address, phone number, instagram, calification of store
    Payment_Methods: [String],      //Array de strings
    Category: String
})


module.exports = mongoose.model("Stores", stores)

/* Califications and opinions(?) */
/* Populatity. Most popular stores for landing page(?) */