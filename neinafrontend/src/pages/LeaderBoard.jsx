import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [history, setHistory] = useState({ data: [], type: "", title: "" });
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch users on component mount
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:7000/api/user/v1/get-users")
            .then((res) => setUsers(res.data.data || []))
            .catch((err) => toast.error("Error fetching users: " + err.message))
            .finally(() => setLoading(false));
    }, []);

    // Fetch history when selectedPeriod changes
    useEffect(() => {
        if (selectedPeriod) fetchHistoryForPeriod();
    }, [selectedPeriod]);

    const fetchHistoryForPeriod = useCallback(async () => {
        const endpoint =
            selectedPeriod === "daily"
                ? "your-daily-history"
                : selectedPeriod === "weekly"
                    ? "your-weekly-history"
                    : "your-monthly-history";

        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:7000/api/user/v1/${endpoint}`
            );
            setHistory({
                data: response.data.data,
                type: "period",
                title: `Users History - ${selectedPeriod}`,
            });
        } catch (error) {
            toast.error(`Failed to fetch ${selectedPeriod} history.`);
        } finally {
            setLoading(false);
        }
    }, [selectedPeriod]);

    const viewHistory = async (username) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:7000/api/user/v1/your-history",
                { username }
            );
            setHistory({
                data: response.data.data.formattedHistory,
                type: "user",
                title: `${username}'s History`,
            });
        } catch (error) {
            toast.error("Failed to fetch user history.");
        } finally {
            setLoading(false);
        }
    };

    const closeHistory = () => setHistory({ data: [], type: "", title: "" });

    const sortedUsers = useMemo(
        () => [...users].sort((a, b) => (b.Points || 0) - (a.Points || 0)),
        [users]
    );

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        toast.info(`Viewing ${period} history`);
    };

    return (
        <div className="relative w-screen md:w-[70vw]  flex items-center  bg-white p-2">
            {history.data.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            )}

            <div className="relative w-full shadow-xl  h-full  flex flex-col justify-start items-center gap-7  border-2 rounded-xl">
                <div className="w-full bg-blue-500 h-[70px] flex justify-between items-center px-5 rounded-xl">
                    <h1>Leaderboard</h1>
                </div>

                <div className="w-full flex justify-center items-center md:gap-24 gap-6 md:flex-row flex-col">
                    {["daily", "weekly", "monthly"].map((period) => (
                        <button
                            key={period}
                            className={`px-3 py-2 rounded-2xl hover:bg-orange-400 transform  hover:scale-105 transition-transform ${selectedPeriod === period ? "bg-orange-600" : "bg-gray-500"
                                }`}
                            onClick={() => handlePeriodChange(period)}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                <ul className="flex justify-around items-center gap-3 w-full mb-4">
                    {sortedUsers.slice(0, 3).map((u) => (
                        <li
                            key={u.username}
                            className="text-xl flex flex-col justify-center items-center gap-1"
                        >
                            <div className="flex items-center gap-2">{u.firstName}</div>
                            <div>{u.Points || 0} points</div>
                        </li>
                    ))}
                </ul>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="flex flex-col justify-around items-center gap-3 w-full overflow-auto">
                        {sortedUsers.map((u, idx) => (
                            <li
                                key={u.username}
                                className="cursor-pointer hover:bg-black/20 transition-transform flex justify-around items-center p-4 w-full"
                            >
                                <div className="flex flex-col justify-around items-start gap-2">
                                    <div className="flex justify-around items-center gap-2">
                                        <FaUser />
                                        <h1>{u.firstName}</h1>
                                    </div>
                                    <p>Rank:{idx + 1}</p>
                                </div>
                                <div>{u.Points || 0} points</div>
                                <button
                                    className="px-3 py-2 hover:scale-105 transition-transform bg-green-600 rounded-lg"
                                    onClick={() => viewHistory(u.username)}
                                >
                                    View History
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {history.data.length > 0 && (
                    <div className="fixed inset-0 flex items-center justify-center p-6 rounded-xl shadow-xl z-30">
                        <div className="relative flex flex-col  items-center min-w-[90%] md:min-w-[50%] h-[50vh] p-6 rounded-xl shadow-xl bg-white overflow-auto">
                            <div className="flex w-full justify-between items-center">
                                <h2 className="text-xl font-bold  text-red-600">{history.title}</h2>
                                <button
                                    className=" text-2xl"
                                    onClick={closeHistory}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            {history.data.length > 0 ? (
                                <ul className="flex flex-col justify-around w-full gap-2 mt-5">
                                    {history.data.map((data, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-around items-center gap-9 cursor-pointer hover:bg-black/20 transform transition-transform"
                                        >
                                            <span>{data.date || data._id}</span>{" "}
                                            <span>{data.totalPoints} Points</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No history available.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
