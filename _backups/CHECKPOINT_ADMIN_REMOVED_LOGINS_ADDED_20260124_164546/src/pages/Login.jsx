import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Login = () => {
    const [selectedRole, setSelectedRole] = useState('recruiter');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(selectedRole);
        navigate('/team/dashboard');
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
                            <label className="block text-sm font-medium text-slate-700 mb-3">Select Login Type</label>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('master')}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedRole === 'master'
                                        ? 'border-enterprise-600 bg-enterprise-50 text-enterprise-700 font-medium'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${selectedRole === 'master' ? 'bg-enterprise-200 text-enterprise-700' : 'bg-slate-100 text-slate-500'}`}>
                                        <Lock size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm">Master Login</div>
                                        <div className="text-xs opacity-70">Full System Access</div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('manager')}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedRole === 'manager'
                                        ? 'border-enterprise-600 bg-enterprise-50 text-enterprise-700 font-medium'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${selectedRole === 'manager' ? 'bg-enterprise-200 text-enterprise-700' : 'bg-slate-100 text-slate-500'}`}>
                                        <User size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm">Manager Login</div>
                                        <div className="text-xs opacity-70">Team Management</div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('recruiter')}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedRole === 'recruiter'
                                        ? 'border-enterprise-600 bg-enterprise-50 text-enterprise-700 font-medium'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${selectedRole === 'recruiter' ? 'bg-enterprise-200 text-enterprise-700' : 'bg-slate-100 text-slate-500'}`}>
                                        <User size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm">Recruiter / BD Login</div>
                                        <div className="text-xs opacity-70">Daily Operations</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-enterprise-600 hover:bg-enterprise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enterprise-500 transition-colors"
                        >
                            Sign In as {selectedRole === 'master' ? 'Master' : selectedRole === 'manager' ? 'Manager' : 'Recruiter'}
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
