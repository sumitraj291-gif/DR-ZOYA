import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Search,
  Plus,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Clock,
  Eye,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const Patients = () => {
  const { patients, setSelectedPatient, updatePatient, deletePatient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);

  // New patient form local state
  const [newPatientForm, setNewPatientForm] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Female',
    notes: '',
  });

  const filteredPatients = (patients || []).filter((p) => {
    return (
      (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.id && p.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.phone && p.phone.includes(searchTerm)) ||
      (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleCreatePatient = (e) => {
    e.preventDefault();
    if (!newPatientForm.name || !newPatientForm.phone) return;
    // convert to patient format
    const newPat = {
      id: `PAT-${Math.floor(8000 + Math.random() * 1000)}`,
      name: newPatientForm.name,
      phone: newPatientForm.phone,
      email: newPatientForm.email,
      dob: newPatientForm.dob || '1995-01-01',
      gender: newPatientForm.gender || 'Female',
      lastVisit: new Date().toISOString().split('T')[0],
      totalAppointments: 1,
      totalSpent: 0,
      status: 'Active',
      leadHistory: 'Direct Clinic Entry',
      notes: newPatientForm.notes,
      appointments: [],
      treatments: [],
      payments: []
    };
    if (updatePatient) updatePatient(newPat.id, newPat);
    setNewPatientForm({ name: '', phone: '', email: '', dob: '', gender: 'Female', notes: '' });
    setIsAddPatientModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="CLINIC MANAGEMENT"
        title="Patients Records"
        subtitle="Searchable healthcare CRM repository containing medical history, appointments, and treatment notes."
        actionBtn={
          <button
            onClick={() => setIsAddPatientModalOpen(true)}
            className="btn-gold-primary px-4 py-2.5 text-xs tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Patient Record</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Patient Name, PAT ID, Phone, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Table */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          title="No patient records found"
          description="There are no patient files matching your search query."
          actionText="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="luxury-table-container">
          <table className="w-full text-left luxury-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Full Name</th>
                <th>Contact Info</th>
                <th>Last Visit</th>
                <th>Appointments</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="font-mono text-[11px] font-bold text-slate-900 bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D9]">
                      {p.id}
                    </span>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-900 text-xs">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.gender} • {p.dob || 'DOB N/A'}</div>
                  </td>
                  <td>
                    <div className="text-xs font-semibold text-slate-800">{p.phone}</div>
                    <div className="text-[10px] text-slate-400">{p.email}</div>
                  </td>
                  <td>
                    <div className="text-xs font-semibold text-slate-700">{p.lastVisit}</div>
                  </td>
                  <td>
                    <span className="text-xs font-bold text-obsidian px-2.5 py-1 bg-[#FAF8F5] rounded-full border border-[#E8E2D9]">
                      {p.totalAppointments || 1} visits
                    </span>
                  </td>
                  <td>
                    <Badge status={p.status} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setSelectedPatient(p)}
                      className="btn-secondary-dark px-3 py-1.5 text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      <span>View CRM Profile</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Patient Modal */}
      {isAddPatientModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E8E2D9] shadow-2xl overflow-hidden p-6 animate-modal-in space-y-4">
            <h3 className="font-serif text-2xl font-bold text-obsidian">New Patient File</h3>
            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shalini Rao"
                  value={newPatientForm.name}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98000 00000"
                    value={newPatientForm.phone}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newPatientForm.email}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, email: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newPatientForm.dob}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, dob: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Gender</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, gender: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Initial Clinical Notes</label>
                <textarea
                  rows={3}
                  placeholder="Patient medical history, shade preferences, or treatment notes..."
                  value={newPatientForm.notes}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, notes: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPatientModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold-primary px-5 py-2 font-bold">
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
