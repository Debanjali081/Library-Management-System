import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: "View Books", path: "/user/books" },
        { name: "My Transactions", path: "/user/transactions" },
        { name: "Pay Fine", path: "/user/fines" },
        { name: "Membership Details", path: "/user/membership" },
        { name: "Reports", path: "/user/reports" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <header className="bg-green-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-semibold">User Dashboard</h1>
                <button 
                    onClick={() => navigate("/logout")}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium"
                >
                    Logout
                </button>
            </header>

            {/* Dashboard Grid */}
            <div className="flex-grow p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition cursor-pointer"
                            onClick={() => navigate(item.path)}
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
