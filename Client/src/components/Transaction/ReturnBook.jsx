import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReturnBook = () => {
    const { transactionId } = useParams();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleReturn = async () => {
        setError(null);
        try {
            await axios.put(`${import.meta.env.VITE_TRANSACTION_RETURN.replace(":transactionId", transactionId)}`);
            alert("Book returned successfully!");
            navigate("/transactions");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to return book.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold mb-4">Return Book</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button onClick={handleReturn} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Confirm Return
            </button>
        </div>
    );
};

export default ReturnBook;
