const express = require("express");
const app = express();
const cors = require("cors");

// database
const mongoose = require("mongoose");
const Customer = require("./Customer");
mongoose.connect('mongodb://root:secret@mongo:27017/customer?authSource=admin');

// middlewares
app.use(express.json());
app.use(cors());

// PORT
const PORT = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("This is our Customer service main endpoint!");
})

app.post("/create", async (req,res) => {
    try {
        const newCustomer = {
            name : req.body.name,
            age : req.body.age,
            address : req.body.address
        }

        const customer = new Customer(newCustomer);
        await customer.save();

        res.status(201).json("Customer Created!");
    } catch (error) {
        res.json(error);
    }
})

app.get("/get",async (req,res) => {
    try {
        const getCustomer = await Customer.find();
        res.status(200).json(getCustomer);
    } catch (error) {
        res.json(error);
    }
})

app.get("/get/:id",async (req,res) => {
    try {
        const getCustomer = await Customer.findById(req.params.id);
        res.status(200).json(getCustomer);
    } catch (error) {
        res.json(error);
    }
})


app.listen(PORT, () => {
    console.log(`Up and Running! --> This is our Customer service on Port -> ${PORT}`);
})