const mongoose = require("mongoose");

const customerModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true 
    },
    address : {
        type : String,
        required : true
    }
}, {timestamps : true})


const Customer = mongoose.model("Customer", customerModel);

module.exports = Customer;
