import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication required. Please log in.");
                    return;
                }

                const response = await axios.get(import.meta.env.VITE_BOOKS_GET_ALL, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("API Response:", response); // Log the entire response

                if (Array.isArray(response.data)) {
                    setBooks(response.data);
                } else {
                    setError("Invalid data format received from server.");
                    setBooks([]); // Ensure books is always an array
                }
            } catch (err) {
                setError("Failed to fetch books.");
                setBooks([]); // Prevent `map` errors
            }
        };

        fetchBooks(); // Call the function to fetch books
    }, []);

    return (
        <div className="p-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 min-h-screen">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Book List</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-100 to-blue-100 text-gray-800">
                            <th className="px-4 py-3 text-left font-semibold">Title</th>
                            <th className="px-4 py-3 text-left font-semibold">Author</th>
                            <th className="px-4 py-3 text-left font-semibold">Genre</th>
                            <th className="px-4 py-3 text-left font-semibold">Published Year</th>
                            <th className="px-4 py-3 text-left font-semibold">Available Copies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(books) && books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book._id} className="border-b hover:bg-gradient-to-r hover:from-indigo-100 hover:to-teal-100 transition-all duration-300 ease-in-out">
                                    <td className="px-4 py-3 text-gray-700">{book.title}</td>
                                    <td className="px-4 py-3 text-gray-700">{book.author}</td>
                                    <td className="px-4 py-3 text-gray-700">{book.genre}</td>
                                    <td className="px-4 py-3 text-gray-700">{book.publishedYear}</td>
                                    <td className="px-4 py-3 text-gray-700">{book.copiesAvailable}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-3 text-center text-gray-600">
                                    No books available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;




