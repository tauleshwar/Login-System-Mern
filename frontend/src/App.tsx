import './App.css'
import { useProfile } from './hooks/useProfile'
import { useEffect } from 'react';

function App() {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  const {
    profile,
    isLoading,
    isError,
    error,
  } = useProfile();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="home flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="home flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="home flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome back!</h1>
        <p className="text-gray-600 mt-2">Logged in as <strong>{profile?.email}</strong></p>
        <button onClick={() => handleLogout()} className=' m-2 bg-red-400 rounded-md p-2 text-white cursor-pointer'>Logout</button>
      </div>
    </div>
  );
}

export default App;
