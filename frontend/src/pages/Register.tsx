import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Register the user
      const registerPayload = {
        full_name: fullName,
        phone: phone,
        password: password,
        role: 'customer'
      };
      
      const registerRes = await api.post('/auth/register', registerPayload);
      const user = registerRes.data;

      // 2. Automatically login to get the access token
      const formData = new FormData();
      formData.append('username', phone);
      formData.append('password', password);
      
      const loginRes = await api.post('/auth/login/access-token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      const { access_token } = loginRes.data;
      
      login(access_token, user);
      
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-black border border-zinc-800 rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Créer un compte</h2>
          <p className="text-zinc-400 mt-2 text-sm">Rejoignez l'univers Alixco Luxe.</p>
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Nom Complet</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" 
              required
            />
          </div>
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
            S'inscrire
          </button>
        </form>
        
        <p className="text-center text-sm text-zinc-400">
          Déjà un compte ?{' '}
          <Link to="/login" className="font-medium text-amber-500 hover:text-amber-400">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
