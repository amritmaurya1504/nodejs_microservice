// Load express
const express = require("express");
const app = express();

// database
const mongoose = require("mongoose");
const Book = require("./Book");
mongoose.connect('mongodb://root:secret@mongo:27017/books?authSource=admin');

// middlewares
app.use(express.json());

// PORT
const PORT = process.env.PORT || 2000;


app.get("/", (req, res) => {
    res.send("This is our books service main endpoint!");
})

app.post("/create", async (req, res) => {
    try {
        // console.log(req.body);
        const newBook = {
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages,
            publisher: req.body.publisher
        }
        // create new book
        const book = new Book(newBook);
        await book.save();

        res.status(201).json("New Book created!")
    } catch (error) {
        res.json({msg : "Not created!", error})
    }
})

app.get("/get",async (req,res) => {
    try {
        const getBooks = await Book.find();
        res.status(200).json(getBooks);
    } catch (error) {
        res.json(error);
    }
})

app.get("/get/:id",async (req,res) => {
    try {
        const getBooks = await Book.findById(req.params.id);
        res.status(200).json(getBooks);
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => {
    console.log(`Up and Running! --> This is our Books service on Port -> ${PORT}`);
})