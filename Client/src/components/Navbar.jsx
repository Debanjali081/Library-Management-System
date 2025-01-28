import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Library Management</h1>
        <div className="flex space-x-4">
          <NavLink to="/admin" className="hover:underline">
            Admin Dashboard
          </NavLink>
          <NavLink to="/user" className="hover:underline">
            User Dashboard
          </NavLink>
          <NavLink to="/books" className="hover:underline">
            Books
          </NavLink>
          <NavLink to="/memberships" className="hover:underline">
            Memberships
          </NavLink>
          <NavLink to="/transactions" className="hover:underline">
            Transactions
          </NavLink>
          <NavLink to="/reports" className="hover:underline">
            Reports
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
