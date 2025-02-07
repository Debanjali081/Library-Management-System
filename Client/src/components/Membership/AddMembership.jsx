import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMembership = () => {
    const [formData, setFormData] = useState({
        email: "",
        duration: "6 months", // Default selected option
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token"); // Retrieve token
        if (!token) {
            setError("Access denied. No token provided.");
            return;
        }

        try {
            // Step 1: Fetch userId based on email
            const userResponse = await axios.get(`${import.meta.env.VITE_USER_FETCH}?email=${formData.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token in headers
                },
            });

            const userId = userResponse.data?.user?._id; // Ensure we have the userId
            if (!userId) {
                setError("User not found. Please register the user first.");
                return;
            }

            // Step 2: Compute startDate (today) and endDate based on duration
            const startDate = new Date();
            let endDate = new Date(startDate);
            if (formData.duration === "6 months") endDate.setMonth(endDate.getMonth() + 6);
            else if (formData.duration === "1 year") endDate.setFullYear(endDate.getFullYear() + 1);
            else if (formData.duration === "2 years") endDate.setFullYear(endDate.getFullYear() + 2);

            // Step 3: Send request with required fields
            await axios.post(
                `${import.meta.env.VITE_MEMBERSHIP_ADD}`,
                {
                    userId,
                    type: formData.duration,
                    startDate,
                    endDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/memberships");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add membership.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Add Membership</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700">User Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Membership Duration</label>
                    <select
                        name="duration"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.duration}
                        onChange={handleChange}
                    >
                        <option value="6 months">6 Months</option>
                        <option value="1 year">1 Year</option>
                        <option value="2 years">2 Years</option>
                    </select>
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Add Membership
                </button>
            </form>
        </div>
    );
};

export default AddMembership;

