import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://neina-task-j61y.vercel.app/api/auth/v1/login', credentials);
      const userData = response.data;
      login(userData); 
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  useEffect(()=>{
    const fetch = async () => {
    const res = await axios.get('https://neina-task-j61y.vercel.app/api/auth')
    console.log(res)}
    fetch()
  })

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 border-2 rounded-lg"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        className="w-full p-2 border-2 rounded-lg "
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:scale-105 transition-transform transform">
        Login
      </button>

      <p>New User ? <span className='text-blue-500 hover:underline transition-transform transform'><Link to="/register">Register</Link></span></p>
      
    </form>

    
  );
}
