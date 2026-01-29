import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, UserPlus, Briefcase, LayoutDashboard, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const links = [
        { to: '/admin/recruiters', label: 'Recruiter Performance', icon: Users },
        { to: '/admin/candidates', label: 'Candidate Pool', icon: UserPlus },
        { to: '/admin/bd', label: 'Business Development', icon: Briefcase },
        { to: '/admin/clients', label: 'Client Status', icon: Building2 },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 transition-transform duration-300 ease-in-out flex flex-col pt-16 lg:pt-0",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-6 border-b border-slate-800 hidden lg:block">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Admin Console</h2>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink
                        to="/admin/dashboard"
                        end
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isActive
                                ? "bg-enterprise-600 text-white shadow-lg shadow-enterprise-900/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                    >
                        <LayoutDashboard size={20} />
                        Overview
                    </NavLink>

                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase">Management</p>
                    </div>

                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-enterprise-600 text-white shadow-lg shadow-enterprise-900/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800 rounded-lg p-4">
                        <p className="text-xs text-slate-400">System Status</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-green-400">Online</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
