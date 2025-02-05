const express = require("express");
const Membership = require("../models/Membership");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();


router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { userId, type, startDate, endDate } = req.body;

        if (!userId || !type || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMembership = new Membership({
            userId,
            type,
            startDate,
            endDate,
        });

        await newMembership.save();
        res.status(201).json({ message: "Membership added successfully", membership: newMembership });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { type, endDate } = req.body;
        const membership = await Membership.findById(req.params.id);

        if (!membership) return res.status(404).json({ message: "Membership not found" });

        membership.type = type || membership.type;
        membership.endDate = endDate || membership.endDate;

        await membership.save();
        res.json({ message: "Membership updated successfully", membership });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);

        if (!membership) return res.status(404).json({ message: "Membership not found" });

        // Allow access only if admin or the user is fetching their own membership
        if (req.user.role !== "admin" && req.user.id !== membership.userId.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(membership);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
