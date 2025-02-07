import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Library System</Link>
          <div>
            <Link to="/login" className="px-4">Login</Link>
            <Link to="/register" className="px-4">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />  {/* Renders the current route */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 Library Management System. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;

