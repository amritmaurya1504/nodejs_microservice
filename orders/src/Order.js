const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    customerId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true, 
        ref : "Customer"
    },
    bookId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : "Book"
    },
    dop : {
        type : Date,
        required : true
    },
    dod : {
        type : Date,
        required : true
    }
}, {timestamps : true})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;