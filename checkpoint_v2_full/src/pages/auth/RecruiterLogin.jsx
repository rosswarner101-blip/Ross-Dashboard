import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Briefcase } from 'lucide-react';

const RecruiterLogin = () => {
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
                .from('authorized_recruiters')
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
                role: 'recruiter',
                name: 'Recruiter'
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
        <div className="min-h-screen flex items-center justify-center bg-enterprise-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-enterprise-100">
                <div className="bg-enterprise-600 p-8 text-center text-white">
                    <div className="mx-auto h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                        <Briefcase className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Recruiter Login</h1>
                    <p className="text-enterprise-100">Daily Operations</p>
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-enterprise-500 focus:border-enterprise-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-enterprise-500 focus:border-enterprise-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-enterprise-600 hover:bg-enterprise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enterprise-500 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Logging In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecruiterLogin;
