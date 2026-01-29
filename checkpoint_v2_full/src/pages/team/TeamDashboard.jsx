import React, { useState } from 'react';
import { Plus, Search, User, Building2, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { parseResume } from '../../utils/resumeParser';
import { supabase } from '../../lib/supabase';

// Mock Data
// const initialCandidates = []; // Removed dummy data

// const initialClients = []; // Removed dummy data

const CandidateDetailsModal = ({ candidate, onClose }) => {
    if (!candidate) return null;

    const SectionHeader = ({ title }) => (
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3 mt-4 first:mt-0">
            {title}
        </h4>
    );

    const DetailItem = ({ label, value }) => (
        <div className="mb-2">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-sm font-medium text-slate-900 break-words">{value || 'N/A'}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-enterprise-100 text-enterprise-600 rounded-full flex items-center justify-center font-bold text-2xl">
                            {candidate.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">{candidate.name}</h2>
                            <p className="text-sm text-slate-500">{candidate.appliedDesignation || candidate.role} • {candidate.currentLocation || 'No Location'}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition">
                        <span className="text-2xl leading-none">&times;</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 overflow-y-auto">

                    {/* 1. Personal Details */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <SectionHeader title="Personal Details" />
                        <DetailItem label="Full Name" value={candidate.name} />
                        <DetailItem label="Applied Designation" value={candidate.appliedDesignation} />
                        <DetailItem label="Age" value={candidate.age} />
                    </div>

                    {/* 2. Experience Details */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <SectionHeader title="Experience Details" />
                        <DetailItem label="Total Experience" value={`${candidate.totalExperience} Years`} />
                        <DetailItem label="Relevant Experience" value={`${candidate.relevantExperience} Years`} />
                    </div>

                    {/* 3. Organization & Tenure */}
                    <div className="bg-slate-50 p-4 rounded-lg md:col-span-2 lg:col-span-1">
                        <SectionHeader title="Organization & Tenure" />
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-enterprise-600 mb-1">Current Employment</p>
                            <DetailItem label="Organization" value={candidate.currentOrg} />
                            <DetailItem label="Designation" value={candidate.currentDesignation} />
                            <DetailItem label="Duration" value={candidate.duration} />
                            <DetailItem label="Reason for Leaving" value={candidate.reasonForLeaving} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 mb-1">Previous Employment</p>
                            <DetailItem label="Immediate Previous Org" value={candidate.prevOrg} />
                            <DetailItem label="Designation" value={candidate.prevDesignation} />
                            <DetailItem label="Duration" value={candidate.prevDuration} />
                        </div>
                    </div>

                    {/* 4. Qualification */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <SectionHeader title="Qualification" />
                        <DetailItem label="Masters / PG / Prof. Cert" value={candidate.qualification} />
                        <DetailItem label="Graduation" value={candidate.graduation} />
                    </div>

                    {/* 5. Team Structure */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <SectionHeader title="Team Structure" />
                        <DetailItem label="Reporting To" value={candidate.reportingTo} />
                        <DetailItem label="Direct Reportees" value={candidate.directReportees} />
                    </div>

                    {/* 6. Family & Location */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <SectionHeader title="Family & Location" />
                        <DetailItem label="Marital Status" value={candidate.maritalStatus} />
                        <DetailItem label="Current Location" value={candidate.currentLocation} />
                    </div>

                    {/* 7. Salary Details */}
                    <div className="bg-slate-50 p-4 rounded-lg md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="col-span-3"><SectionHeader title="Salary Details" /></div>
                        <DetailItem label="Current Salary" value={candidate.currentSalary} />
                        <DetailItem label="Expected Salary" value={candidate.expectedSalary} />
                        <DetailItem label="Notice Period" value={candidate.noticePeriod} />
                    </div>

                    {/* 8. Other Details */}
                    <div className="bg-slate-50 p-4 rounded-lg md:col-span-2 lg:col-span-3">
                        <SectionHeader title="Other Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailItem label="Medical/Health Issues" value={candidate.medicalIssues} />
                            <div>
                                <DetailItem label="Relocation Permission" value={candidate.relocation ? 'Yes' : 'No'} />
                                <DetailItem label="Passport Validity" value={candidate.passport} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 bg-white border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 z-10">
                    <button onClick={onClose} className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Close
                    </button>
                    <button className="px-5 py-2.5 bg-enterprise-600 rounded-lg text-sm font-medium text-white hover:bg-enterprise-700 transition-colors shadow-lg shadow-enterprise-600/20">
                        Edit Full Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

const TeamDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('addData');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    // State for candidates list
    const [candidates, setCandidates] = useState([]);
    // State for clients list
    const [clients, setClients] = useState([]);
    const [pendingClients, setPendingClients] = useState([]);

    const CANDIDATE_STAGES = [
        'Sourced',
        'Internal Shortlist',
        'Client Shortlist 1',
        'Client Shortlist 2',
        'Offer Stage'
    ];

    const getNextStage = (currentStatus) => {
        const currentIndex = CANDIDATE_STAGES.indexOf(currentStatus);
        if (currentIndex === -1) {
            // If current status is not in the list (e.g. 'Pending Review'), start with the first stage
            return CANDIDATE_STAGES[0];
        }
        if (currentIndex < CANDIDATE_STAGES.length - 1) {
            return CANDIDATE_STAGES[currentIndex + 1];
        }
        return null; // No next stage
    };

    // State for client assignment modal
    const [showClientModal, setShowClientModal] = useState(false);
    const [candidateForAssignment, setCandidateForAssignment] = useState(null);

    // State for approval modal
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [candidateForApproval, setCandidateForApproval] = useState(null);

    // State for Client Shortlist 1 modal
    const [showClientShortlistModal, setShowClientShortlistModal] = useState(false);
    const [candidateForClientShortlist, setCandidateForClientShortlist] = useState(null);

    const ClientSelectionModal = ({ isOpen, onClose, onConfirm }) => {
        const [selectedClientId, setSelectedClientId] = useState('');

        if (!isOpen) return null;

        const handleConfirm = () => {
            if (!selectedClientId) {
                alert('Please select a client');
                return;
            }
            const client = clients.find(c => c.id.toString() === selectedClientId);
            onConfirm(client.company_name);
            setSelectedClientId('');
        };

        return (
            <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Select Client</h3>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Assign to Client</label>
                        <select
                            value={selectedClientId}
                            onChange={(e) => setSelectedClientId(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500"
                        >
                            <option value="">-- Select Client --</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.company_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Cancel
                        </button>
                        <button onClick={handleConfirm} className="px-4 py-2 bg-enterprise-600 text-white rounded-lg text-sm font-medium hover:bg-enterprise-700">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ApprovalModal = ({ isOpen, onClose, onConfirm, title = "Internal Shortlist Approval" }) => {
        const [action, setAction] = useState('Approve');
        const [comments, setComments] = useState('');

        if (!isOpen) return null;

        const handleConfirm = () => {
            onConfirm(action, comments);
            // Reset state
            setAction('Approve');
            setComments('');
        };

        return (
            <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>

                    <div className="mb-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Decision</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="approvalAction"
                                        value="Approve"
                                        checked={action === 'Approve'}
                                        onChange={(e) => setAction(e.target.value)}
                                        className="text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm text-slate-700">Approve</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="approvalAction"
                                        value="Reject"
                                        checked={action === 'Reject'}
                                        onChange={(e) => setAction(e.target.value)}
                                        className="text-red-600 focus:ring-red-500"
                                    />
                                    <span className="text-sm text-slate-700">Reject</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Comments</label>
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                rows="3"
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500"
                                placeholder="Add your comments here..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Cancel
                        </button>
                        <button onClick={handleConfirm} className="px-4 py-2 bg-enterprise-600 text-white rounded-lg text-sm font-medium hover:bg-enterprise-700">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const updateLocalFeedback = (id, value) => {
        setPendingClients(pendingClients.map(c =>
            c.id === id ? { ...c, feedback_report: value } : c
        ));
    };

    const saveFeedback = async (id, value) => {
        try {
            const { error } = await supabase
                .from('Pending_Clients')
                .update({ feedback_report: value })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error saving feedback:', error);
        }
    };

    const handlePromoteClient = async (client) => {
        if (!confirm(`Are you sure you want to promote ${client.company_name} to Active Clients?`)) return;

        try {
            // 1. Insert into Active_Clients
            const { data: newActiveClientData, error: insertError } = await supabase
                .from('Active_Clients')
                .insert([{
                    company_name: client.company_name,
                    location: client.location,
                    contact_number: client.contact_number,
                    email: client.email,
                    requirement: client.requirement,
                    vacant_positions: client.vacant_positions,
                    status: 'Active'
                }])
                .select();

            if (insertError) throw insertError;

            // 2. Delete from Pending_Clients
            const { error: deleteError } = await supabase
                .from('Pending_Clients')
                .delete()
                .eq('id', client.id);

            if (deleteError) {
                console.error('Error removing from Pending_Clients:', deleteError);
                // Note: We might want to handle this case (transaction would be better but separate calls for now)
            }

            // 3. Update Local State
            setClients([newActiveClientData[0], ...clients]);
            setPendingClients(pendingClients.filter(c => c.id !== client.id));

            alert(`${client.company_name} promoted to Active Clients!`);

        } catch (error) {
            console.error('Error promoting client:', error);
            alert(`Failed to promote client: ${error.message}`);
        }
    };

    const handleStatusUpdate = async (candidateId, currentStatus) => {
        const nextStage = getNextStage(currentStatus);
        if (!nextStage) return;

        // If moving to 'Sourced', show client selection modal
        if (nextStage === 'Sourced') {
            setCandidateForAssignment(candidateId);
            setShowClientModal(true);
            return;
        }

        // If moving to 'Internal Shortlist', show approval modal
        if (nextStage === 'Internal Shortlist') {
            setCandidateForApproval(candidateId);
            setShowApprovalModal(true);
            return;
        }

        // If moving to 'Client Shortlist 1', show client shortlist modal
        if (nextStage === 'Client Shortlist 1') {
            setCandidateForClientShortlist(candidateId);
            setShowClientShortlistModal(true);
            return;
        }

        // If moving to 'Offer Stage', handle vacancy decrement
        if (nextStage === 'Offer Stage') {
            await handleOfferStageUpdate(candidateId);
            return;
        }

        // Standard status update for other stages
        await updateCandidateStatus(candidateId, nextStage);
    };

    const handleClientAssignment = async (clientName) => {
        if (!candidateForAssignment) return;

        try {
            const { error } = await supabase
                .from('candidates')
                .update({
                    status: 'Sourced',
                    assigned_client: clientName
                })
                .eq('id', candidateForAssignment);

            if (error) throw error;

            setCandidates(candidates.map(c =>
                c.id === candidateForAssignment
                    ? { ...c, status: 'Sourced', assignedClient: clientName }
                    : c
            ));

            setShowClientModal(false);
            setCandidateForAssignment(null);
        } catch (error) {
            console.error('Error assigning client:', error);
            alert(`Failed to assign client: ${error.message}`);
        }
    };

    const handleApprovalSubmit = async (action, comments) => {
        if (!candidateForApproval) return;

        const nextStatus = action === 'Approve' ? 'Internal Shortlist' : 'Rejected';

        try {
            const { error } = await supabase
                .from('candidates')
                .update({
                    status: nextStatus,
                    comments: comments
                })
                .eq('id', candidateForApproval);

            if (error) throw error;

            setCandidates(candidates.map(c =>
                c.id === candidateForApproval
                    ? { ...c, status: nextStatus, comments: comments }
                    : c
            ));

            setShowApprovalModal(false);
            setCandidateForApproval(null);
        } catch (error) {
            console.error('Error updating approval:', error);
            alert(`Failed to update approval: ${error.message}`);
        }
    };

    const handleClientShortlistSubmit = async (action, comments) => {
        if (!candidateForClientShortlist) return;

        const nextStatus = action === 'Approve' ? 'Client Shortlist 1' : 'Rejected by Client';

        try {
            const { error } = await supabase
                .from('candidates')
                .update({
                    status: nextStatus,
                    client_status: comments
                })
                .eq('id', candidateForClientShortlist);

            if (error) throw error;

            setCandidates(candidates.map(c =>
                c.id === candidateForClientShortlist
                    ? { ...c, status: nextStatus, comments: comments }
                    : c
            ));

            setShowClientShortlistModal(false);
            setCandidateForClientShortlist(null);
        } catch (error) {
            console.error('Error updating client shortlist:', error);
            alert(`Failed to update client shortlist: ${error.message}`);
        }
    };

    const handleOfferStageUpdate = async (candidateId) => {
        const candidate = candidates.find(c => c.id === candidateId);
        if (!candidate || !candidate.assignedClient) {
            alert('Cannot move to Offer Stage: No client assigned to this candidate.');
            return;
        }

        const client = clients.find(c => c.company_name === candidate.assignedClient);
        if (!client) {
            alert('Cannot move to Offer Stage: Assigned client not found in client list.');
            return;
        }

        // Optimistically calculate new vacant positions (ensure it doesn't go below 0)
        const currentVacancies = client.vacant_positions || 0;
        const newVacancies = Math.max(0, currentVacancies - 1);

        try {
            // Update Candidate Status
            const { error: candidateError } = await supabase
                .from('candidates')
                .update({ status: 'Offer Stage' })
                .eq('id', candidateId);

            if (candidateError) throw candidateError;

            // Update Client Vacancies
            const { error: clientError } = await supabase
                .from('Active_Clients')
                .update({ vacant_positions: newVacancies })
                .eq('id', client.id);

            if (clientError) {
                console.error('Error updating client vacancies:', clientError);
                // Note: Candidate status was already updated. In a real app we might want to roll back,
                // but for now we'll just alert.
            }

            // Update Local State for candidates
            setCandidates(candidates.map(c =>
                c.id === candidateId ? { ...c, status: 'Offer Stage' } : c
            ));

            // Update Local State for clients
            setClients(clients.map(c =>
                c.id === client.id ? { ...c, vacant_positions: newVacancies } : c
            ));

        } catch (error) {
            console.error('Error moving to Offer Stage:', error);
            alert(`Failed to move to Offer Stage: ${error.message}`);
        }
    };

    const updateCandidateStatus = async (candidateId, nextStage) => {
        try {
            const { error } = await supabase
                .from('candidates')
                .update({ status: nextStage })
                .eq('id', candidateId);

            if (error) throw error;

            // Update local state
            setCandidates(candidates.map(c =>
                c.id === candidateId ? { ...c, status: nextStage } : c
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert(`Failed to update status: ${error.message}`);
        }
    };

    // Fetch initial data on mount
    React.useEffect(() => {
        const fetchData = async () => {
            // Fetch Candidates
            const { data: candidatesData, error: candidatesError } = await supabase
                .from('candidates')
                .select('*')
                .order('created_at', { ascending: false });

            if (candidatesError) {
                console.error('Error fetching candidates:', candidatesError);
            } else {
                const formattedCandidates = candidatesData.map(c => ({
                    id: c.id,
                    name: c.name,
                    role: c.role || c.applied_designation,
                    appliedDesignation: c.applied_designation,
                    status: c.status || 'Pending Review',
                    assignedClient: c.assigned_client, // Map assigned_client
                    comments: c.client_status || c.comments, // Map client_status or fallback to comments
                    age: c.age,
                    totalExperience: c.total_experience,
                    relevantExperience: c.relevant_experience,
                    currentOrg: c.current_org,
                    currentDesignation: c.current_designation,
                    duration: c.duration,
                    reasonForLeaving: c.reason_for_leaving,
                    prevOrg: c.prev_org,
                    prevDesignation: c.prev_designation,
                    prevDuration: c.prev_duration,
                    qualification: c.qualification,
                    graduation: c.graduation,
                    reportingTo: c.reporting_to,
                    directReportees: c.direct_reportees,
                    maritalStatus: c.marital_status,
                    currentLocation: c.current_location,
                    currentSalary: c.current_salary,
                    expectedSalary: c.expected_salary,
                    noticePeriod: c.notice_period,
                    medicalIssues: c.medical_issues,
                    relocation: c.relocation,
                    passport: c.passport
                }));
                setCandidates(formattedCandidates);
            }

            // Fetch Clients
            const { data: clientsData, error: clientsError } = await supabase
                .from('Active_Clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (clientsError) {
                console.error('Error fetching clients:', clientsError);
            } else {
                setClients(clientsData);
            }

            // Fetch Pending Clients
            const { data: pendingClientsData, error: pendingClientsError } = await supabase
                .from('Pending_Clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (pendingClientsError) {
                console.error('Error fetching pending clients:', pendingClientsError);
            } else {
                setPendingClients(pendingClientsData);
            }
        };

        fetchData();
    }, []);

    // State for form data
    const initialFormState = {
        name: '',
        appliedDesignation: '',
        age: '',
        totalExperience: '',
        relevantExperience: '',
        currentOrg: '',
        currentDesignation: '',
        duration: '',
        reasonForLeaving: '',
        prevOrg: '',
        prevDesignation: '',
        prevDuration: '',
        qualification: '',
        graduation: '',
        reportingTo: '',
        directReportees: '',
        maritalStatus: 'Single',
        currentLocation: '',
        currentSalary: '',
        expectedSalary: '',
        noticePeriod: '',
        medicalIssues: '',
        relocation: false,
        passport: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsAnalyzing(true);
        try {
            const parsedData = await parseResume(file);
            setFormData(prev => ({
                ...prev,
                ...parsedData,
                // Ensure specific fields are correctly typed/mapped if needed
                age: parsedData.age ? String(parsedData.age) : '',
                totalExperience: parsedData.totalExperience ? String(parsedData.totalExperience) : '',
                relevantExperience: parsedData.relevantExperience ? String(parsedData.relevantExperience) : '',
                relocation: parsedData.relocation === true
            }));
            alert('Resume analyzed successfully! Please review the auto-filled details.');
        } catch (error) {
            console.error('Analysis failed:', error);
            alert(`Resume analysis failed: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
            // Reset file input
            e.target.value = '';
        }
    };

    // State for client form data
    const initialClientFormState = {
        companyName: '',
        location: '',
        contactNumber: '',
        email: '',
        requirement: '',
        vacantPositions: '',
        status: 'Active'
    };
    const [clientFormData, setClientFormData] = useState(initialClientFormState);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleClientInputChange = (e) => {
        const { name, value } = e.target;
        setClientFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.age) {
            alert("Please fill in the required fields (Name, Age)");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('candidates')
                .insert([
                    {
                        name: formData.name,
                        applied_designation: formData.appliedDesignation,
                        age: parseInt(formData.age),
                        total_experience: parseFloat(formData.totalExperience),
                        relevant_experience: parseFloat(formData.relevantExperience),
                        current_org: formData.currentOrg,
                        current_designation: formData.currentDesignation,
                        duration: formData.duration,
                        reason_for_leaving: formData.reasonForLeaving,
                        prev_org: formData.prevOrg,
                        prev_designation: formData.prevDesignation,
                        prev_duration: formData.prevDuration,
                        qualification: formData.qualification,
                        graduation: formData.graduation,
                        reporting_to: formData.reportingTo,
                        direct_reportees: parseInt(formData.directReportees) || 0,
                        marital_status: formData.maritalStatus,
                        current_location: formData.currentLocation,
                        current_salary: formData.currentSalary,
                        expected_salary: formData.expectedSalary,
                        notice_period: formData.noticePeriod,
                        medical_issues: formData.medicalIssues,
                        relocation: formData.relocation,
                        passport: formData.passport,
                        status: 'Pending Review',
                        role: formData.appliedDesignation || 'N/A'
                    }
                ])
                .select();

            if (error) throw error;

            if (data) {
                // Update local state with returned data
                const newCandidate = {
                    id: data[0].id,
                    ...formData,
                    role: formData.appliedDesignation || 'N/A',
                    status: 'Pending Review'
                };
                setCandidates([newCandidate, ...candidates]);
                setFormData(initialFormState);
                setActiveTab('status');
                alert('Candidate profile submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting candidate:', error);
            alert(`Failed to submit candidate: ${error.message}`);
        }
    };

    const handleClientSubmit = async (e) => {
        e.preventDefault();

        if (!clientFormData.companyName || !clientFormData.contactNumber) {
            alert("Please fill in required fields (Company Name, Contact Number)");
            return;
        }

        const table = clientFormData.status === 'Pending' ? 'Pending_Clients' : 'Active_Clients';

        try {
            const { data, error } = await supabase
                .from(table)
                .insert([
                    {
                        company_name: clientFormData.companyName,
                        location: clientFormData.location,
                        contact_number: clientFormData.contactNumber,
                        email: clientFormData.email,
                        requirement: clientFormData.requirement,
                        vacant_positions: clientFormData.vacantPositions ? parseInt(clientFormData.vacantPositions) : null,
                        status: clientFormData.status
                    }
                ])
                .select();

            if (error) throw error;

            if (data) {
                // Update local state with returned data
                const newClient = data[0];
                if (clientFormData.status === 'Pending') {
                    setPendingClients([newClient, ...pendingClients]);
                } else {
                    setClients([newClient, ...clients]);
                }

                setClientFormData(initialClientFormState);
                setActiveTab('status');
                alert('Client added successfully!');
            }
        } catch (error) {
            console.error('Error adding client:', error);
            alert(`Failed to add client: ${error.message}`);
        }
    };

    const ClientDetailsModal = ({ client, onClose }) => {
        if (!client) return null;

        const DetailItem = ({ label, value }) => (
            <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{label}</p>
                <p className="text-sm font-medium text-slate-900 break-words bg-slate-50 p-3 rounded-lg border border-slate-100">{value || 'N/A'}</p>
            </div>
        );

        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{client.company_name}</h3>
                                <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {client.status || 'Active'}
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200 transition">
                            <span className="text-2xl leading-none">&times;</span>
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto">
                        <DetailItem label="Location" value={client.location} />
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Contact Number" value={client.contact_number} />
                            <DetailItem label="Email" value={client.email} />
                        </div>
                        <DetailItem label="Vacant Positions" value={client.vacant_positions} />
                        <DetailItem label="Requirement" value={client.requirement} />
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <CandidateDetailsModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
            <ClientDetailsModal client={selectedClient} onClose={() => setSelectedClient(null)} />
            <ClientSelectionModal
                isOpen={showClientModal}
                onClose={() => {
                    setShowClientModal(false);
                    setCandidateForAssignment(null);
                }}
                onConfirm={handleClientAssignment}
            />
            <ApprovalModal
                isOpen={showApprovalModal}
                onClose={() => {
                    setShowApprovalModal(false);
                    setCandidateForApproval(null);
                }}
                onConfirm={handleApprovalSubmit}
            />
            <ApprovalModal
                isOpen={showClientShortlistModal}
                onClose={() => {
                    setShowClientShortlistModal(false);
                    setCandidateForClientShortlist(null);
                }}
                onConfirm={handleClientShortlistSubmit}
                title="Client Shortlist 1 Approval"
                targetStage="Client Shortlist 1"
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Team Workspace</h2>

                {/* Tab Switcher */}
                <div className="bg-white p-1 rounded-lg border border-slate-200 flex shadow-sm">
                    <button
                        onClick={() => setActiveTab('addData')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'addData'
                            ? 'bg-enterprise-100 text-enterprise-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Add Data
                    </button>
                    <button
                        onClick={() => setActiveTab('status')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'status'
                            ? 'bg-enterprise-100 text-enterprise-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Status Tracker
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'addData' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Component 1: Add Candidate */}
                        <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1 min-w-0">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">For Recruiter</h3>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                        <User size={20} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Add Candidate</h3>
                                </div>



                                {/* Resume Upload Section */}
                                <div className="mb-6 p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center hover:border-enterprise-300 transition-colors">
                                    <div className="h-10 w-10 bg-enterprise-50 text-enterprise-600 rounded-full flex items-center justify-center mb-2">
                                        {isAnalyzing ? <Loader2 className="animate-spin h-5 w-5" /> : <Upload className="h-5 w-5" />}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-800 mb-1">
                                        {isAnalyzing ? 'Analyzing Resume...' : 'Auto-fill from Resume'}
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-3 max-w-[200px]">
                                        Upload PDF/Docx/Image to extract details using Groq AI
                                    </p>
                                    <label className={`px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition-all flex items-center gap-2 ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <Upload size={14} />
                                        <span>{isAnalyzing ? 'Processing...' : 'Upload CV'}</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.docx,.doc,image/*"
                                            onChange={handleFileUpload}
                                            disabled={isAnalyzing}
                                        />
                                    </label>
                                </div>

                                <form className="space-y-6 flex-1" onSubmit={handleSubmit}>
                                    {/* Personal Details */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Personal Details</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Name of Candidate <span className="text-red-500">*</span></label>
                                                <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Applied Designation</label>
                                                <input name="appliedDesignation" value={formData.appliedDesignation} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Age <span className="text-red-500">*</span></label>
                                                <input name="age" value={formData.age} onChange={handleInputChange} type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience Details */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Experience Details</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Total Experience (Yrs) <span className="text-red-500">*</span></label>
                                                <input name="totalExperience" value={formData.totalExperience} onChange={handleInputChange} type="number" step="0.1" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Relevant Experience (Yrs) <span className="text-red-500">*</span></label>
                                                <input name="relevantExperience" value={formData.relevantExperience} onChange={handleInputChange} type="number" step="0.1" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Organization & Tenure */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Organization & Tenure</h4>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">Current Organization <span className="text-red-500">*</span></label>
                                                    <input name="currentOrg" value={formData.currentOrg} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">Current Designation <span className="text-red-500">*</span></label>
                                                    <input name="currentDesignation" value={formData.currentDesignation} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">Duration <span className="text-red-500">*</span></label>
                                                    <input name="duration" value={formData.duration} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">Reason for Leaving <span className="text-red-500">*</span></label>
                                                    <input name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                                </div>
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                <p className="text-xs font-semibold text-slate-500 mb-2">Previous Employment</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Immediate Previous Org</label>
                                                        <input name="prevOrg" value={formData.prevOrg} onChange={handleInputChange} type="text" className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Designation</label>
                                                        <input name="prevDesignation" value={formData.prevDesignation} onChange={handleInputChange} type="text" className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Duration</label>
                                                        <input name="prevDuration" value={formData.prevDuration} onChange={handleInputChange} type="text" className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Qualification */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Qualification</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Masters / PG / Professional Cert <span className="text-red-500">*</span></label>
                                                <input name="qualification" value={formData.qualification} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Graduation <span className="text-red-500">*</span></label>
                                                <input name="graduation" value={formData.graduation} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Present Team Structure */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Team Structure</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Reporting To <span className="text-red-500">*</span></label>
                                                <input name="reportingTo" value={formData.reportingTo} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Direct Reportees <span className="text-red-500">*</span></label>
                                                <input name="directReportees" value={formData.directReportees} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Family & Location */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Family & Location</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Marital Status <span className="text-red-500">*</span></label>
                                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500">
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Current Location <span className="text-red-500">*</span></label>
                                                <input name="currentLocation" value={formData.currentLocation} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Salary Details */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Salary Details</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Current Salary <span className="text-red-500">*</span></label>
                                                <input name="currentSalary" value={formData.currentSalary} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Expected Salary <span className="text-red-500">*</span></label>
                                                <input name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Notice Period <span className="text-red-500">*</span></label>
                                                <input name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other Details */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-t border-slate-100 pt-4">Other Details</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Any Medical/Health Related Issues <span className="text-red-500">*</span></label>
                                                <textarea name="medicalIssues" value={formData.medicalIssues} onChange={handleInputChange} rows="2" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required></textarea>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <input name="relocation" checked={formData.relocation} onChange={handleInputChange} type="checkbox" id="relocation" className="mt-1" />
                                                <label htmlFor="relocation" className="text-xs text-slate-700">Do you have your Family's Permission for Relocating? (International) <span className="text-red-500">*</span></label>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-700 mb-1">Valid Passport (Validity) (International) <span className="text-red-500">*</span></label>
                                                <input name="passport" value={formData.passport} onChange={handleInputChange} type="text" placeholder="Yes/No, Valid until..." className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-4 border-t border-slate-200">
                                        <button className="w-full bg-enterprise-600 text-white rounded-lg py-3 text-sm font-bold hover:bg-enterprise-700 transition flex items-center justify-center gap-2 shadow-lg shadow-enterprise-600/20">
                                            <Plus size={18} /> Submit Candidate Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Component 2: Add Client */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">For Business Developer</h3>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                    <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                                        <Building2 size={20} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Add Client</h3>
                                </div>

                                <form className="space-y-4 flex-1" onSubmit={handleClientSubmit}>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                        <input name="companyName" value={clientFormData.companyName} onChange={handleClientInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" placeholder="e.g. Tech Solutions Inc" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                        <input name="location" value={clientFormData.location} onChange={handleClientInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" placeholder="e.g. New York, NY" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                                        <input name="contactNumber" value={clientFormData.contactNumber} onChange={handleClientInputChange} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" placeholder="e.g. +1 555-0123" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <input name="email" value={clientFormData.email} onChange={handleClientInputChange} type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" placeholder="e.g. contact@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Vacant Positions</label>
                                        <input name="vacantPositions" value={clientFormData.vacantPositions} onChange={handleClientInputChange} type="number" min="0" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" placeholder="e.g. 5" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                        <select name="status" value={clientFormData.status} onChange={handleClientInputChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500">
                                            <option value="Active">Active</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Requirement</label>
                                        <textarea name="requirement" value={clientFormData.requirement} onChange={handleClientInputChange} rows="3" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-500" placeholder="Describe the requirements..."></textarea>
                                    </div>

                                    <div className="pt-4 mt-auto">
                                        <button className="w-full bg-purple-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
                                            <Plus size={18} /> Add Client
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Component 1: Candidate Status */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <User size={18} className="text-slate-500" /> Candidate Status
                                </h3>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="Search..." className="pl-9 pr-3 py-1 text-xs border border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-enterprise-500" />
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Comments</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status Management</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {candidates.map((c) => (
                                        <tr key={c.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{c.role}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === 'Rejected' || c.status === 'Rejected by Client'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {c.assignedClient || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {c.comments || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {getNextStage(c.status) && (
                                                    (() => {
                                                        const nextStage = getNextStage(c.status);
                                                        const isRecruiterRestricted = user?.role === 'recruiter' && !['Sourced', 'Internal Shortlist'].includes(nextStage);
                                                        const isManagerRestricted = user?.role === 'manager' && !['Sourced', 'Internal Shortlist', 'Client Shortlist 1', 'Client Shortlist 2'].includes(nextStage);

                                                        if (!isRecruiterRestricted && !isManagerRestricted) {
                                                            return (
                                                                <button
                                                                    onClick={() => handleStatusUpdate(c.id, c.status)}
                                                                    className="bg-enterprise-50 text-enterprise-700 hover:bg-enterprise-100 border border-enterprise-200 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                                >
                                                                    Move to {nextStage}
                                                                </button>
                                                            );
                                                        } else {
                                                            return (
                                                                <span className="text-xs text-slate-500 font-medium">
                                                                    Approved in {c.status}
                                                                </span>
                                                            );
                                                        }
                                                    })()
                                                )}
                                                {!getNextStage(c.status) && (
                                                    <span className="text-xs text-slate-400 font-medium">Completed</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <button
                                                    onClick={() => setSelectedCandidate(c)}
                                                    className="text-enterprise-600 hover:text-enterprise-800 font-medium text-xs border border-enterprise-200 hover:bg-enterprise-50 px-3 py-1 rounded transition-colors"
                                                >
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Component 2: Client Status */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <Building2 size={18} className="text-slate-500" /> Active Clients
                                </h3>
                            </div>
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Vacant Positions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {clients.map((c) => (
                                        <tr key={c.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.company_name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{c.contact_number}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{c.vacant_positions || 0}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {c.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <button
                                                    onClick={() => setSelectedClient(c)}
                                                    className="text-purple-600 hover:text-purple-800 font-medium text-xs border border-purple-200 hover:bg-purple-50 px-3 py-1 rounded transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Component 3: Pending Clients */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <Building2 size={18} className="text-slate-500" /> Pending Clients
                                </h3>
                            </div>
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Vacant Positions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Feedback Report</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {pendingClients.map((c) => (
                                        <tr key={c.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.company_name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{c.contact_number}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{c.vacant_positions || 0}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <input
                                                    type="text"
                                                    value={c.feedback_report || ''}
                                                    onChange={(e) => updateLocalFeedback(c.id, e.target.value)}
                                                    onBlur={() => saveFeedback(c.id, c.feedback_report)}
                                                    placeholder="Add feedback..."
                                                    className="w-full min-w-[150px] border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-enterprise-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                                    {c.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handlePromoteClient(c)}
                                                    className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                >
                                                    Promote to Active
                                                </button>
                                                <button
                                                    onClick={() => setSelectedClient(c)}
                                                    className="text-purple-600 hover:text-purple-800 font-medium text-xs border border-purple-200 hover:bg-purple-50 px-3 py-1 rounded transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default TeamDashboard;
