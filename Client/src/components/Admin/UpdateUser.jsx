import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_USERS_PROFILE.replace(":id", id)}`);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                });
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user details.");
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.put(`${import.meta.env.VITE_USERS_UPDATE.replace(":id", id)}`, formData);
            alert("User updated successfully!");
            navigate("/admin/users");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update user.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Update User</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        name="role"
                        className="w-full px-3 py-2 border rounded"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Update User
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
