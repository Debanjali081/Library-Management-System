import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import UserDashBoard from './components/Dashboard/UserDashboard'
import AdminDashBoard from './components/Dashboard/AdminDashboard'
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


const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Book Management Routes */}
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/update/:id" element={<UpdateBook />} />
        <Route path="/memberships/add" element={<AddMembership />} />
        <Route path="/memberships/update/:id" element={<UpdateMembership />} />
        <Route path="/transactions/fine/:transactionId" element={<FinePayment />} />
        <Route path="/transactions/issue" element={<IssueBook />} />
        <Route path="/transactions/return/:transactionId" element={<ReturnBook />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/update/:id" element={<UpdateUser />} />
        <Route path="/user/dashboard" element={<UserDashBoard/>} />
        <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
      </Routes>
    </div>
  );
};

export default App;




