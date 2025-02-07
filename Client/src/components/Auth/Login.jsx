import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post(`${import.meta.env.VITE_USERS_LOGIN}`, formData);

            console.log("Response Data:", res.data); // Debugging

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.user.role);

                console.log("Token & Role Saved:", localStorage.getItem("token"), localStorage.getItem("role"));

                // Using setTimeout to ensure localStorage is updated before navigating
                setTimeout(() => {
                    if (res.data.user.role === "admin") {
                        navigate("/admin/dashboard", { replace: true });
                    } else {
                        navigate("/user/dashboard", { replace: true });
                    }
                }, 100);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;




