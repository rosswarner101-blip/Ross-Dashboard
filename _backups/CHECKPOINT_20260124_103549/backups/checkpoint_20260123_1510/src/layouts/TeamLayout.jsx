import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';

const TeamLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <TopBar />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default TeamLayout;
