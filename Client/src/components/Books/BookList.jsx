import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BOOKS_GET_ALL);
                setBooks(response.data);
            } catch (err) {
                setError("Failed to load books");
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Book List</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Author</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id} className="border-t">
                                <td className="py-3 px-4">{book.title}</td>
                                <td className="py-3 px-4">{book.author}</td>
                                <td className="py-3 px-4">{book.category}</td>
                                <td className="py-3 px-4">{book.isbn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
