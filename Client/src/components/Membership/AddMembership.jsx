import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMembership = () => {
    const [formData, setFormData] = useState({
        name: "",
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

        try {
            await axios.post(`${import.meta.env.VITE_MEMBERSHIP_ADD}`, formData);
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
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
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
