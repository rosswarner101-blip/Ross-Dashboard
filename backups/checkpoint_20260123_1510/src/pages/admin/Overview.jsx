import React from 'react';
import { Users, UserCheck, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: '$245k', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Recruiters', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Open Positions', value: '48', icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Placement Rate', value: '24%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
];

const Overview = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
                <p className="text-slate-500">Welcome back to the admin portal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for chart/graph */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-64 flex items-center justify-center text-slate-400">
                Performance Chart Placeholder
            </div>
        </div>
    );
};

export default Overview;
