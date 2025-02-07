import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: "User Management", path: "/admin/dashboard/users" },
        { name: "Membership Management", path: "/admin/dashboard/memberships" },
        { name: "Book Management", path: "/admin/dashboard/books" },
        { name: "Add BookList", path: '/admin/dashboard/books/add' },
        { name: "Transactions", path: "/admin/dashboard/transactions" },
        { name: "Fine Payments", path: "/admin/dashboard/fines" },
        { name: "Reports", path: "/admin/dashboard/reports" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        navigate("/login");
                    }}
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

            {/* Render Sub-Routes Here */}
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;

