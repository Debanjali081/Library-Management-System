const express = require("express");
const Book = require("../models/Book");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// @route   GET /api/transactions/availability/:bookId
// @desc    Check book availability
// @access  Admin, User
router.get("/availability/:bookId", authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);

        if (!book) return res.status(404).json({ message: "Book not found" });

        const isAvailable = book.copiesAvailable > 0;
        res.json({ bookId: book._id, title: book.title, available: isAvailable });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// @route   POST /api/transactions/issue
// @desc    Issue a book
// @access  Admin, User
router.post("/issue", authMiddleware, async (req, res) => {
    try {
        const { userId, bookId, issueDate } = req.body;

        if (!userId || !bookId || !issueDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.copiesAvailable <= 0) {
            return res.status(400).json({ message: "Book is not available" });
        }

        const returnDate = new Date(issueDate);
        returnDate.setDate(returnDate.getDate() + 15); // Default return date: 15 days ahead

        const newTransaction = new Transaction({
            userId,
            bookId,
            issueDate,
            returnDate,
            status: "issued",
        });

        await newTransaction.save();

        // Reduce available copies
        book.copiesAvailable -= 1;
        await book.save();

        res.status(201).json({ message: "Book issued successfully", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// @route   PUT /api/transactions/return/:transactionId
// @desc    Return a book
// @access  Admin, User
router.put("/return/:transactionId", authMiddleware, async (req, res) => {
    try {
        const { returnDate, finePaid } = req.body;
        const transaction = await Transaction.findById(req.params.transactionId);

        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        if (transaction.status !== "issued") {
            return res.status(400).json({ message: "Book is not issued or already returned" });
        }

        const book = await Book.findById(transaction.bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const actualReturnDate = new Date(returnDate);
        const dueDate = new Date(transaction.returnDate);

        let fine = 0;
        if (actualReturnDate > dueDate) {
            const lateDays = Math.ceil((actualReturnDate - dueDate) / (1000 * 60 * 60 * 24));
            fine = lateDays * 5; // Example: ₹5 per late day
        }

        transaction.returnDate = actualReturnDate;
        transaction.fineAmount = fine;
        transaction.finePaid = finePaid || fine === 0;
        transaction.status = "returned";

        await transaction.save();

        // Increase available copies
        book.copiesAvailable += 1;
        await book.save();

        res.json({ message: "Book returned successfully", transaction, fine });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
