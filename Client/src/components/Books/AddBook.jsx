import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        isbn: "",
        publishedYear: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post(import.meta.env.VITE_BOOKS_ADD, formData);
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add book");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Add Book
                </h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Published Year</label>
                    <input
                        type="number"
                        name="publishedYear"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.publishedYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
