const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/:transactionId", authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.transactionId);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.status !== "returned") {
            return res.status(400).json({ message: "Book has not been returned yet" });
        }

        res.json({
            transactionId: transaction._id,
            fineAmount: transaction.fineAmount,
            finePaid: transaction.finePaid,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/pay/:transactionId", authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.transactionId);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.fineAmount === 0) {
            return res.status(400).json({ message: "No fine to be paid" });
        }

        if (transaction.finePaid) {
            return res.status(400).json({ message: "Fine is already paid" });
        }

        transaction.finePaid = true;
        await transaction.save();

        res.json({ message: "Fine paid successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
