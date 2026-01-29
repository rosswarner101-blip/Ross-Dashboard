import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const TopBar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-20 relative">
            <div className="flex items-center gap-4">
                {user?.role === 'admin' && (
                    <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden text-slate-600">
                        <Menu size={24} />
                    </button>
                )}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-enterprise-600 rounded-md flex items-center justify-center text-white font-bold text-xl">R</div>
                    <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Ross Warner <span className="text-enterprise-600">HR Solutions</span></h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
                    <span className="text-xs text-slate-500 uppercase">{user?.role}</span>
                </div>
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200">
                    <User size={20} />
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Logout"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default TopBar;
