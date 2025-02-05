const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { title, author, genre, publishedYear, copiesAvailable } = req.body;

        if (!title || !author || !genre || !publishedYear || copiesAvailable === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({
            title,
            author,
            genre,
            publishedYear,
            copiesAvailable,
        });

        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { title, author, genre, publishedYear, copiesAvailable } = req.body;
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        book.publishedYear = publishedYear || book.publishedYear;
        book.copiesAvailable = copiesAvailable !== undefined ? copiesAvailable : book.copiesAvailable;

        await book.save();
        res.json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        await book.remove();
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
