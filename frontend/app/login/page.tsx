'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Save token
      localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user)); // ← добавь эту строку
login(data.user);

// редирект зависит от роли
if (data.user?.role === 'admin') {
  router.push('/admin');
} else {
  router.push('/profile');
}
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-[#1A1A1C] border border-[#262626] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white placeholder-[#98989A] focus:outline-none focus:border-[#FFD700]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-white placeholder-[#98989A] focus:outline-none focus:border-[#FFD700]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-4 py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#d5b300] disabled:bg-gray-600 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-[#98989A] mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#FFD700] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
