import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import UserDashBoard from "./components/Dashboard/UserDashboard";
import AdminDashBoard from "./components/Dashboard/AdminDashboard";
import AddBook from "./components/Books/AddBook";
import BookList from "./components/Books/BookList";
import UpdateBook from "./components/Books/UpdateBook";
import AddMembership from "./components/Membership/AddMembership";
import UpdateMembership from "./components/Membership/UpdateMembership";
import FinePayment from "./components/Transaction/FinePayment";
import IssueBook from "./components/Transaction/IssueBook";
import ReturnBook from "./components/Transaction/ReturnBook";
import AddUser from "./components/Admin/AddUser";
import UpdateUser from "./components/Admin/UpdateUser";
import Layout from "./components/Layout/Layout";

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    // Check authentication status on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");

        setAuthenticated(!!token); // Convert token to boolean
        setRole(userRole);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Authentication Routes */}
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />

                {/* Admin Protected Routes */}
                <Route 
                    path="/admin/dashboard" 
                    element={authenticated && role === "admin" ? <AdminDashBoard /> : <Navigate to="/login" />} 
                >
                    {/* User Management */}
                    <Route path="users" element={<AddUser />} />
                    <Route path="users/update/:id" element={<UpdateUser />} />

                    {/* Membership Management */}
                    <Route path="memberships" element={<AddMembership />} />
                    <Route path="memberships/update/:id" element={<UpdateMembership />} />

                    {/* Book Management */}
                    <Route path="books" element={<BookList />} />
                    <Route path="books/add" element={<AddBook />} />
                    <Route path="books/update/:id" element={<UpdateBook />} />

                    {/* Transactions */}
                    <Route path="transactions" element={<IssueBook />} />
                    <Route path="transactions/return/:transactionId" element={<ReturnBook />} />

                    {/* Fine Payments */}
                    <Route path="fines" element={<FinePayment />} />

                    {/* Reports */}
                    <Route path="reports" element={<ReturnBook />} />
                </Route>

                {/* User Protected Routes */}
                <Route 
                    path="user/dashboard" 
                    element={authenticated && role === "user" ? <UserDashBoard /> : <Navigate to="/login" />} 
                />

                {/* Redirect to Dashboard based on Role */}
                <Route 
                    index 
                    element={authenticated ? (role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />) : <Navigate to="/login" />} 
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};

export default App;










