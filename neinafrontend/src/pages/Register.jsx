import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({ firstName: '', email: '', password: '', lastName: '', username: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://neina-task-j61y.vercel.app/api/auth/v1/register`, formData);
            toast.success(res.data.message);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-lg"
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-lg"
            />
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-lg"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-lg"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-lg"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:scale-105 transition-transform transform">
                Register
            </button>
            <p>Already Registered ? <span className='text-blue-500 hover:underline transition-transform transform'><Link to="/login">Login</Link></span></p>

        </form>
    );
}
