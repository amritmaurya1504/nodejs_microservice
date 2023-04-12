const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

// database
const mongoose = require("mongoose");
const Order = require("./Order");
mongoose.connect('mongodb://root:secret@mongo:27017/order?authSource=admin');

// middlewares
app.use(express.json());
app.use(cors());

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
            // sending request via REST to customer services
            const customerData = await axios.get(`http://customers:3000/get/${custId}`);
            // sending request via REST to books services
            const bookData = await axios.get(`http://books:2000/get/${bId}`);
            const orderDetails = {
                name : customerData.data.name,
                bookName : bookData.data.name,
                orderDate : getOrder.dop,
                deliveryDate : getOrder.dod
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