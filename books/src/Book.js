const mongoose = require("mongoose");

const bookModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true 
    },
    pages : {
        type : Number,
        required : true
    },
    publisher : {
        type : String,
        required : true
    }
}, {timestamp : true})


const Book = mongoose.model("Book", bookModel);

module.exports = Book;
