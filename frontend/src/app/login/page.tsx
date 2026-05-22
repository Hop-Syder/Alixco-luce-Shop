'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', phone);
      formData.append('password', password);
      
      const response = await api.post('/auth/login/access-token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      const { access_token } = response.data;
      
      // Need to fetch user details (for now we mock or we need a /users/me endpoint)
      login(access_token, {
        id: 'temp',
        phone: phone,
        email: null,
        full_name: 'Utilisateur',
        role: 'customer'
      });
      
      router.push('/dashboard');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail || 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <div className="py-20 min-h-[calc(100vh-16rem)] flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="max-w-md w-full bg-black border border-zinc-800 rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Bienvenue</h2>
          <p className="text-zinc-400 mt-2 text-sm">Connectez-vous à votre espace exclusif.</p>
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Numéro de téléphone</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
          >
            Se connecter
          </button>
        </form>
        
        <p className="text-center text-sm text-zinc-400">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-medium text-amber-500 hover:text-amber-400">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

