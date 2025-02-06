import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        isbn: "",
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BOOKS_GET_BY_ID.replace(":id", id));
                setFormData(response.data);
            } catch (err) {
                console.error("Failed to fetch book details");
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(import.meta.env.VITE_BOOKS_UPDATE.replace(":id", id), formData);
            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Failed to update book");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Update Book</h2>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-4" required />
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-4" required />
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-4" required />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;
