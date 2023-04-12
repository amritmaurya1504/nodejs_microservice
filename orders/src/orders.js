const express = require("express");
const app = express();
const axios = require("axios");

// database
const mongoose = require("mongoose");
const Order = require("./Order");
mongoose.connect('mongodb://root:secret@mongo:27017/order?authSource=admin');

// middlewares
app.use(express.json());

// PORT
const PORT = process.env.PORT || 4000;

app.get("/", (req,res) => {
    res.send("This is our Orders service main endpoint!");
})

app.post("/create", async (req,res) => {
    try {
        const newOrder = {
            customerId : req.body.customerId,
            bookId : req.body.bookId,
            dop : req.body.dop,
            dod : req.body.dod
        }

        const order = new Order(newOrder);
        await order.save();
        res.status(201).json("Order Created");
    } catch (error) {
        res.json(error);
    }
})
app.get("/get",async (req,res) => {
    try {
        const getOrder = await Order.find();
        res.status(200).json(getOrder);
    } catch (error) {
        res.json(error);
    }
})

app.get("/get/:id",async (req,res) => {
    try {
        const getOrder = await Order.findById(req.params.id);
        if(getOrder){
            const custId = getOrder.customerId.toString();
            const bId = getOrder.bookId.toString();
            const customerDatat = await axios.get(`http://localhost:3000/get/${custId}`);
            console.log(customerDatat)
            const bookData = await axios.get(`http://localhost:2000/get/${bId}`);
            console.log(bookData)
            const orderDetails = {
                name : customerDatat.name,
                bookName : bookData.name
            }

            res.json(orderDetails);
        }
        // res.json(getOrder)
    } catch (error) {
        res.json(error);
    }
})



app.listen(PORT, () => {
    console.log(`Up and Running! --> This is our Orders service on Port -> ${PORT}`);
})