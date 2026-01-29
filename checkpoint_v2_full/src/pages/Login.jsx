import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

// This component now acts as a Role Selector
const Login = () => {
    const navigate = useNavigate();

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
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">Select Login Type</label>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => navigate('/login/master')}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-enterprise-500 hover:shadow-md transition-all text-slate-600 hover:text-enterprise-700"
                                >
                                    <div className="p-2 rounded-full bg-slate-100 text-slate-500">
                                        <Lock size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium">Master Login</div>
                                        <div className="text-xs opacity-70">Full System Access</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/login/manager')}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-slate-600 hover:text-blue-700"
                                >
                                    <div className="p-2 rounded-full bg-slate-100 text-slate-500">
                                        <User size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium">Manager Login</div>
                                        <div className="text-xs opacity-70">Team Oversight</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/login/recruiter')}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-enterprise-500 hover:shadow-md transition-all text-slate-600 hover:text-enterprise-700"
                                >
                                    <div className="p-2 rounded-full bg-slate-100 text-slate-500">
                                        <User size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium">Recruiter / BD Login</div>
                                        <div className="text-xs opacity-70">Daily Operations</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-500">Secure Enterprise Access System</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
