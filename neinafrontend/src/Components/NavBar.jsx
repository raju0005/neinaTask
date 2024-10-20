// src/components/NavBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdHome, MdPerson } from 'react-icons/md';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => setShowDetails((prev) => !prev);

    return (
        <div className="h-[10vh]">
            <nav className="bg-blue-500 px-6 py-4 text-white flex justify-between items-center">
                <h1 className="text-xl font-bold">Leaderboard App</h1>

                {user && (
                    <div className="flex items-center gap-4">
                        <button
                            className="flex gap-2 items-center transition-transform transform hover:scale-105"
                            onClick={() => navigate('/home')}
                        >
                            <MdHome className="text-2xl" />
                            
                        </button>

                        <div className="relative flex items-center">
                            <MdPerson
                                className="text-3xl cursor-pointer"
                                onClick={toggleDetails}
                            />
                           
                            {showDetails && (
                                <div className="flex flex-col justify-around items-start gap-2 absolute w-[250px] top-8 right-0 mt-2 p-5 bg-white text-black rounded-lg shadow-lg z-10">
                                    <p><strong>Name:</strong> {user.data.firstName}</p>
                                    <p><strong>Email:</strong> {user.data.email}</p>
                                    <p><strong>Points:</strong> {user.data.Points}</p>
                                    <button
                                        onClick={logout}
                                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
