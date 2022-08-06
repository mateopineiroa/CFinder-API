const express = require("express")
const Stores = require("./models/Stores")       //Cambiar por el model determinado
const router = express.Router()

/* Gets all stores */
router.get("/stores", async (req, res) => {
    const stores = await Stores.find()
    res.send(stores)
})

/* Add store */
router.post("/stores", async (req, res) => {
    const store = new Stores({
        Name: req.body.Name,
        Address: req.body.Address,          //Client sends address object array
        Payment_Methods: req.body.Payment_Methods,
        Category: req.body.Category
    })
    await store.save()
    res.send(store)
})


/* Get store by id and name. */
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
router.get("/stores/name/:name", async (req, res) => {                           /* No me deja poner el buscador por id y por name. Hago otro path */
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

router.patch("/stores/patch/id/:id", async (req, res) => {
	try {
		const store = await Stores.findOne({ _id: req.params.id })

        /* console.log(req.body)
        store.Payment_Methods = req.body.Payment_Methods */
		if (req.body.Name) {
			store.Name = req.body.Name
		}

		if (req.body.Address) {
			//store.Address = req.body.Address
            req.body.Address.forEach(element => {
                if (!store.Adress.includes(element)) {
                    store.Address.push(element)
                }
            });
		}
        
       
       
        if (req.body.Payment_Methods) {
            //store.Payment_Methods = req.body.Payment_Methods
            req.body.Payment_Methods.forEach( (element) => {
                if (!store.Payment_Methods.includes(element)) {
                    store.Payment_Methods.push(element)
                    console.log(`Agregué ${element} a la store`)
                }
            });
         }
        if (req.body.Category) {
            store.Category = req.body.Category
        }

		await store.save()
		res.send(store)
	} catch {
		res.status(404)
        console.log(req.params)
		res.send({ error: "Store doesn't exist!" })
	}
})


router.patch("/stores/patch/name/:name", async (req, res) => {
	try {
		const store = await Stores.findOne({ Name: req.params.name })

        /* console.log(req.body)
        store.Payment_Methods = req.body.Payment_Methods */
		if (req.body.Name) {
			store.Name = req.body.Name
		}

		if (req.body.Address) {
            req.body.Address.forEach(element => {
                if (!store.Adress.includes(element)) {
                    store.Payment_Methods.push(element)
                    console.log(`Agregué ${element} a la store`)
                }
            });
		}
        
       
       
        if (req.body.Payment_Methods) {
           //store.Payment_Methods = req.body.Payment_Methods
           req.body.Payment_Methods.forEach( (element) => {
               if (!store.Payment_Methods.includes(element)) {
                    store.Payment_Methods.push(element)
                    console.log(`La store ya tiene ${element}`)
                }     
           });
        }
        if (req.body.Category) {
            store.Category = req.body.Category
        }

		await store.save()
		res.send(store)
	} catch {
		res.status(404)
        console.log(req.params)
		res.send({ error: "Couldnt find that store :/" })
	}
})

router.delete("/stores/delete/:id", async (req, res) => {
    try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Couldnt find that store :/" })
	}
})




module.exports = router