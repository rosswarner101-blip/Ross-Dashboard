import React from 'react';

const candidatesData = [
    { id: 101, name: 'John Doe', role: 'Senior Frontend Dev', source: 'LinkedIn', status: 'Interviewing' },
    { id: 102, name: 'Jane Roe', role: 'Product Manager', source: 'Referral', status: 'Offered' },
    { id: 103, name: 'Sam Green', role: 'UX Designer', source: 'Indeed', status: 'Screening' },
    { id: 104, name: 'Lisa White', role: 'Backend Engineer', source: 'Direct', status: 'Rejected' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Offered': return 'bg-green-100 text-green-800';
        case 'Interviewing': return 'bg-blue-100 text-blue-800';
        case 'Screening': return 'bg-yellow-100 text-yellow-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const Candidates = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Candidate Pool</h2>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search candidates..." className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" />
                    <button className="bg-enterprise-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-enterprise-700 transition">
                        Add Candidate
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Target Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {candidatesData.map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-enterprise-900">{candidate.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-700">{candidate.role}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-500">{candidate.source}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                                        {candidate.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-enterprise-600 hover:text-enterprise-900">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Candidates;
