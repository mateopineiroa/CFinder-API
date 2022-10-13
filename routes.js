const express = require("express")
const Stores = require("./models/Stores")       //Cambiar por el model determinado
const router = express.Router()

/* Fix address name. "adress" */

/* Gets all stores */
router.get("/stores", async (req, res) => {
    const stores = await Stores.find()
    res.send(stores)
})

/* app.get("/", (req, res) => {
  res.send("Express on Vercel");
}); */

/* Add store */
router.post("/stores", async (req, res) => {
    const store = new Stores({
        Name: req.body.Name,
        Address: req.body.Address,          //Client sends address object array. 
        Payment_Methods: req.body.Payment_Methods,
        Category: req.body.Category,
        Ratings: []
    })
    console.log("Store added succesfully:", store)
    await store.save()
    res.send(store)
})



/* Add new address */
router.post("/stores-form/address/:name", async (req, res) => {            /* Pass name input to this form-address-component separately */
    try {
        //console.log("req.body es:", req.body)
        const store = await Stores.findOne({Name: req.params.name})        //get by name
        //console.log("El store.Address es:",store.Address)
        console.log("El req.body.Address es:", req.body.Address)
        if (req.body.Address) {
            store.Address.push(req.body)

            /* req.body.forEach((element) => {
                if (!store.Address.includes( element )) {    //Si no hay una address exactamente igual, la agrega.
                    
                    const address = {
                        Address: element.Address,
                        Phone: element.Phone,
                        Instagram: element.Instagram,
                        Web: element.Web,
                        Maps: element.Maps
                    }
                }
            }) */
        }
        
        console.log(req.params)
        res.send(store)
    } catch {
        res.status(404)
        console.log(req.params)
        res.send({error: "There is no store with that name, sorry"})
    }
        
    //console.log("Store added succesfully:", store)
    console.log(req.body)
    //await store.save()
    res.end()
})


/* Update address */            //patch req.body empty??
router.patch("/stores/patch/address/update/:name", async (req, res) => {
    try {
        const store = await Stores.findOne({ Name: req.params.name })
        console.log("El req.body es", req.body)
        if (req.body.Address) {
            store.Address.forEach( (element) => {
                if (element.Address == req.body.address) {
                    element.Phone = req.body.Phone
                    element.Instagram = req.body.Instagram
                    element.Web = req.body.Web
                    element.Maps = req.body.Maps
                }
            })
        }
         

        await store.save()
        res.send(store)
    } catch {
        res.status(404)
        console.log(req.params)
        res.send({ error: "Store doesn't exist!" })
    }
})


router.patch("/addRating/:id", async (req, res) => {
    try {
        const store = await Stores.findOne({ _id: req.params.id })
        store.Ratings = ["dsds"]
        await store.save()
        res.send(store)
    } catch {
        res.status(404)
        res.send({ error: "Bro le pifiaste en algo" })
    }
})

/* Rate a store by id */
router.patch("/stores/patch/rate/:id", async (req, res) => {
    try {
        const store = await Stores.findOne({ _id: req.params.id })
        //console.log("El store.Adress es", store.Address)
        if (req.body.rating) {
            store.Address.forEach( (element) => {
                if (element.Adress == req.body.name) {
                    console.log("Alguien dijo que esto es una poronga",element)
                    element.Ratings.push(req.body.rating)
                }
                })
        }

        await store.save()
        res.send(store)
    } catch {
        res.status(404)
        /* console.log(req.params)
        console.log(req.body) */
        res.send({ error: "Store doesn't exist!" })
    }
})

/* Get store by id. */
router.get("/stores/id/:id", async (req, res) => {
    try {
        const store = await Stores.findOne({_id: req.params.id})        //get by id
        console.log(req.params)
        res.send(store)
    } catch {
        console.log(req.params)
        res.status(404)
        res.send({error: "There is no store with that id, sorry"})
    }
})

/* Get store by name */
router.get("/stores/name/:name", async (req, res) => {
    try {
        const store = await Stores.findOne({Name: req.params.name})        //get by name
        console.log(req.params)
        res.send(store)
    } catch {
        res.status(404)
        console.log(req.params)
        res.send({error: "There is no store with that name, sorry"})
    }
})

/* Update store and pay methods by id */
router.patch("/stores/patch/id/:id", async (req, res) => {              //get store by name or id?
	try {
		const store = await Stores.findOne({ _id: req.params.id })
        console.log("El req.body es",req.body)

		if (req.body.Address) {
			//store.Address = req.body.Address
            req.body.Address.forEach(element => {
                if (!store.Adress.includes(element)) {
                    store.Address.push(element)
                    console.log(`Agregué ${element} a las direcciones de ${store}`)
                }
            });
		}
        if (req.body.Payment_Methods) {
            //store.Payment_Methods = req.body.Payment_Methods
            req.body.Payment_Methods.forEach( (element) => {
                if (!store.Payment_Methods.includes(element)) {
                    store.Payment_Methods.push(element)
                    console.log(`Agregué ${element} a las formas de pago de ${store}`)
                }
            });
        }

		await store.save()
		res.send(store)
	} catch {
		res.status(404)
		res.send({ error: "Store doesn't exist!" })
	}
})



router.delete("/stores/delete/:id", async (req, res) => {
    try {
		await Stores.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
        console.log(req.params.id)
        res.status(404)
		res.send({ error: "Couldnt find that store :/" })
	}
})

/* Delete address */




module.exports = router