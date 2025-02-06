import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FinePayment = () => {
    const { transactionId } = useParams();
    const [fineDetails, setFineDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchFineDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_FINE_DETAILS.replace(":transactionId", transactionId)}`
            );
            setFineDetails(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch fine details.");
        }
        setLoading(false);
    };

    const handlePayment = async () => {
        setError(null);
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_FINE_PAY.replace(":transactionId", transactionId)}`);
            alert("Fine paid successfully!");
            navigate("/transactions");
        } catch (err) {
            setError(err.response?.data?.message || "Fine payment failed.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold mb-4">Fine Payment</h2>
            <button onClick={fetchFineDetails} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Fetch Fine Details
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {fineDetails && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p><strong>Amount:</strong> ${fineDetails.amount}</p>
                    <p><strong>Due Date:</strong> {fineDetails.dueDate}</p>
                    <button onClick={handlePayment} className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Pay Fine
                    </button>
                </div>
            )}
        </div>
    );
};

export default FinePayment;
