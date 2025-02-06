import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IssueBook = () => {
    const [formData, setFormData] = useState({
        bookId: "",
        userId: "",
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
            await axios.post(`${import.meta.env.VITE_TRANSACTION_ISSUE}`, formData);
            alert("Book issued successfully!");
            navigate("/transactions");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to issue book.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Issue Book</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                
                <div className="mb-4">
                    <label className="block text-gray-700">Book ID</label>
                    <input
                        type="text"
                        name="bookId"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.bookId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">User ID</label>
                    <input
                        type="text"
                        name="userId"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Issue Book
                </button>
            </form>
        </div>
    );
};

export default IssueBook;
