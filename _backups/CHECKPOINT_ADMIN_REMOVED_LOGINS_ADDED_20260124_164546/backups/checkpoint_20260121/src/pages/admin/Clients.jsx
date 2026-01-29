import React, { useState } from 'react';

const initialClients = [
    { id: 1, name: 'TechGlobal Solutions', industry: 'IT Services', contact: 'Sarah Connor', email: 'sarah@techglobal.com', status: 'Active' },
    { id: 2, name: 'MediCare Systems', industry: 'Healthcare', contact: 'James Blunt', email: 'j.blunt@medicare.com', status: 'Active' },
    { id: 3, name: 'FinTrust Bank', industry: 'Finance', contact: 'Robert Rich', email: 'robert@fintrust.com', status: 'Inactive' },
    { id: 4, name: 'EduLearn Inc', industry: 'Education', contact: 'Mary Jane', email: 'mary@edulearn.com', status: 'Pending' },
];

const Clients = () => {
    const [clients] = useState(initialClients);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Client Management</h2>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search clients..." className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" />
                    <button className="bg-enterprise-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-enterprise-700 transition">
                        + Add Client
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Industry</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Person</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-enterprise-900">{client.name}</div>
                                    <div className="text-xs text-slate-500">{client.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-700">{client.industry}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-700">{client.contact}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'
                                        }`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-enterprise-600 hover:text-enterprise-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clients;
