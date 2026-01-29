import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Lock, User } from 'lucide-react';

const MasterLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Direct Database Query for Authentication
            const { data, error } = await supabase
                .from('authorized_masters')
                .select('*')
                .eq('email', email)
                .eq('password', password) // Validating password directly against DB
                .single();

            if (error || !data) {
                throw new Error('Invalid credentials or unauthorized access.');
            }

            // Successful Login
            login({
                id: data.id,
                email: data.email,
                role: 'master',
                name: 'Master Admin' // We could store name in DB too, but defaulting for now
            });

            navigate('/team/dashboard');
        } catch (err) {
            console.error('Login Error:', err);
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
                <div className="bg-slate-800 p-8 text-center text-white">
                    <div className="mx-auto h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                        <Lock className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Master Access</h1>
                    <p className="text-slate-400">System Administration</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Master ID</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
                                    placeholder="admin@rosswarner.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Access Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MasterLogin;
