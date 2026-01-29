import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
                <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 relative w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
