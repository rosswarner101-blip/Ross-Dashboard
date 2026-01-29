import React from 'react';

const recruitersData = [
    { id: 1, name: 'Alice Smith', activePositions: 5, placements: 2, status: 'Active' },
    { id: 2, name: 'Bob Johnson', activePositions: 3, placements: 0, status: 'Away' },
    { id: 3, name: 'Charlie Davis', activePositions: 8, placements: 4, status: 'Active' },
    { id: 4, name: 'Diana Evans', activePositions: 4, placements: 1, status: 'Active' },
];

const Recruiters = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Recruiter Performance</h2>
                <button className="bg-enterprise-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-enterprise-700 transition">
                    + Add Recruiter
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recruiter Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Active Positions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Placements (Mo)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {recruitersData.map((recruiter) => (
                            <tr key={recruiter.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-enterprise-900">{recruiter.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-700">{recruiter.activePositions}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-700">{recruiter.placements}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${recruiter.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {recruiter.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-enterprise-600 hover:text-enterprise-900">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Recruiters;
