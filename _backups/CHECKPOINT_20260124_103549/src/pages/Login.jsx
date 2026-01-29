import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('admin');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(role);
        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/team/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-enterprise-900 p-8 text-center text-white">
                    <div className="mx-auto h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                        <Lock className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Ross Warner</h1>
                    <p className="text-enterprise-200">HR Solutions Portal</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Select Role</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'admin'
                                            ? 'border-enterprise-600 bg-enterprise-50 text-enterprise-700'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                        }`}
                                >
                                    <span className="font-semibold">Admin</span>
                                    <span className="text-xs mt-1">Full Access</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('team')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'team'
                                            ? 'border-enterprise-600 bg-enterprise-50 text-enterprise-700'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                        }`}
                                >
                                    <span className="font-semibold">Team</span>
                                    <span className="text-xs mt-1">Restricted View</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value="demo@rosswarner.com"
                                    readOnly
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-slate-500 bg-slate-50 focus:ring-enterprise-500 focus:border-enterprise-500 sm:text-sm"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    value="password"
                                    readOnly
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-slate-500 bg-slate-50 focus:ring-enterprise-500 focus:border-enterprise-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-enterprise-600 hover:bg-enterprise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enterprise-500 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-500">Secure Enterprise Access System</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
