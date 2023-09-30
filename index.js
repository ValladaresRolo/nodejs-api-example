const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { readData, writeData } = require("./functions")
require('dotenv').config()



//MIDLEWARE

app.use(bodyParser.json())
app.get("/", (req, res) => {
    res.send("Welcome to my API with NodeJS")
})
//ejercicio de create y read
app.get("/dishes", (req, res) => {
    const data = readData()
    res.json(data.dishes)
})
app.post("/dishes", (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})
//ejercicio de create y read
app.get("/dogs", (req, res) => {
    const data = readData()
    res.json(data.dogs)
})

app.post("/dogs", (req, res) => {
    const data = readData()
    const dog = req.body
    const newDog = {
        id: data.dogs.length + 1,
        ...dog
    }
    data.dogs.push(newDog)
    writeData(data)
    res.json(newDog)
})
// ejemplo de update y delete
app.put("/dishes/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "plato actualizado pulento" })
})

app.delete("/dishes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const dishIndex = data.dishes.findIndex(dish => dish.id === id);
    data.dishes.splice(dishIndex, 1);
    writeData(data);
    res.json({ message: "Plato eliminado correctamente" });
});


// ejercicios update y delete
app.put("/dogs/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const dogIndex = data.dogs.findIndex(dog => dog.id === id)
    data.dogs[dogIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "perro actualizado pulento" })
})

app.delete("/dogs/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const dogIndex = data.dogs.findIndex(dog => dog.id === id);
    data.dogs.splice(dogIndex, 1);
    writeData(data);
    res.json({ message: "Perro eliminado correctamente" });
});




app.listen(process.env.PORT, () => {
    console.log(`El servidor está corriendo..${process.env.PORT.BACKEND_BASEURL}`)
})