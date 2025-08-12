import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // Login
        const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        setLoggedIn(true);
  navigate('/');
      } else {
        // Register (with role selection)
        await axios.post('http://localhost:5001/api/auth/register', { username, password, role });
        setIsLogin(true);
        setError('Registration successful! Please log in.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || (isLogin ? 'Login failed' : 'Registration failed'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loggedIn ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-6">Welcome, {username}!</h2>
          <button
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              setLoggedIn(false);
              setUsername('');
              setPassword('');
              setIsLogin(true);
              navigate('/auth');
            }}
          >
            Logout
          </button>
        </div>
      ) : (
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
          {error && <div className={`mb-4 ${error.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{error}</div>}
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label className="block mb-1">Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {isLogin ? 'Login' : 'Register'}
          </button>
          <div className="mt-4 text-center space-y-2">
            <button
              type="button"
              className="text-blue-600 hover:underline block"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
            >
              {isLogin ? 'No account? Register' : 'Already have an account? Login'}
            </button>
            <a href="/" className="text-gray-600 hover:underline block">Go to Home</a>
            <a href="/admin" className="text-gray-600 hover:underline block">Go to Admin Dashboard</a>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
