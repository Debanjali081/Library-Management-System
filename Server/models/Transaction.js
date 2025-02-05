const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    fineAmount: {
        type: Number,
        default: 0,
    },
    finePaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["issued", "returned"],
        default: "issued",
    },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
