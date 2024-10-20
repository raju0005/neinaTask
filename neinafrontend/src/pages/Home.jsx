import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://neina-task-server.vercel.app/api/user/v1/get-users');
                if (Array.isArray(res.data)) {
                    setUsers(res.data);
                } else if (Array.isArray(res.data?.data)) {
                    setUsers(res.data.data);
                } else {
                    toast.error('Expected an array but got:', res.data);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Error fetching users';
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const claimPoints = async (username) => {
        try {
            const response = await axios.patch('https://neina-task-server.vercel.app/api/user/v1/claim-points', { username });
            const { message, data } = response.data;
            toast.success(`${message} for ${username}`);

            setUsers(prevUsers => {
                const updatedUsers = prevUsers.map(u =>
                    u.username === username ? { ...u, Points: data?.Points || u.Points } : u
                );
                return updatedUsers;
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error claiming points';
            toast.error(errorMessage);
        }
    };

    const totalPoints = users.reduce((total, user) => total + (user.Points || 0), 0);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative w-screen md:w-[70vw] flex items-center bg-white p-2">
            <div className="py-4 shadow-xl w-full flex flex-col justify-around items-center gap-4 rounded-xl">
                <div className='w-full bg-blue-500 h-[70px] flex justify-between items-center px-5 rounded-xl'>
                    <h1>Total Points: {totalPoints}</h1>
                    <button className='flex justify-center items-center gap-2 hover:scale-105 transition-transform transform' onClick={() => navigate('/leaderboard')}><span><MdLeaderboard /></span>LeaderBoard</button>
                </div>

                <ul className='flex flex-col justify-around items-center gap-3 w-full overflow-auto'>
                    {users.map((u) => (
                        <li
                            key={u._id}
                            className="cursor-pointer hover:bg-black/20 transform transition-transform flex justify-around items-center p-4 w-full"
                        >
                            <div className='flex justify-around items-center gap-2'><span><FaUser /></span>{u.firstName}</div>
                            <div>{u.Points || 0} points</div>
                            <button className='px-3 py-2 hover:scale-105 transition-transform transform bg-green-600 rounded-lg' onClick={() => claimPoints(u.username)}> Claim Points</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
