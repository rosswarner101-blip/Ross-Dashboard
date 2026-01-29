import React from 'react';

const bdData = [
    { id: 1, company: 'TechCorp Inc.', contact: 'Mike Director', status: 'Negotiation', value: '$50k' },
    { id: 2, company: 'HealthPlus', contact: 'Sarah HR', status: 'Lead', value: '$30k' },
    { id: 3, company: 'FinanceFlow', contact: 'John CFO', status: 'Closed', value: '$120k' },
];

const BusinessDevelopment = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Business Development Tracker</h2>
                <button className="bg-enterprise-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-enterprise-700 transition">
                    + New Lead
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Kanban-like cards or just a grid */}
                {bdData.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">{item.company}</h3>
                                <p className="text-sm text-slate-500">{item.contact}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${item.status === 'Closed' ? 'bg-green-100 text-green-800' :
                                    item.status === 'Negotiation' ? 'bg-blue-100 text-blue-800' :
                                        'bg-slate-100 text-slate-800'
                                }`}>
                                {item.status}
                            </span>
                        </div>
                        <div className="border-t border-slate-100 pt-4 mt-auto">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Est. Value</span>
                                <span className="text-lg font-bold text-enterprise-700">{item.value}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessDevelopment;
