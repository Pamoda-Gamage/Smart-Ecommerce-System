import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/auth/login', {
        email,
        password
      });
      const { token } = response.data;

      // Save the token in local storage
      localStorage.setItem('token', token);

      // Navigate to the ProductManageConsole page
      navigate('/productconsole');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Admin Login</h2>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
