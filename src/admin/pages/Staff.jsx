import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { UserCog, Plus, Shield, CheckCircle2, Lock } from 'lucide-react';

export const Staff = () => {
  const { staff, addStaffMember, isNewStaffModalOpen, setIsNewStaffModalOpen } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Doctor',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addStaffMember(form);
    setForm({ name: '', email: '', phone: '', role: 'Doctor' });
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="SECURITY & ACCESS CONTROL"
        title="Staff & RBAC Permissions"
        subtitle="Manage clinic staff access levels, super admin privileges, and modular permissions."
        actionBtn={
          <button
            onClick={() => setIsNewStaffModalOpen(true)}
            className="btn-gold-primary px-4 py-2.5 text-xs tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Staff Member</span>
          </button>
        }
      />

      {/* Staff Table */}
      <div className="luxury-table-container">
        <table className="w-full text-left luxury-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Staff Member</th>
              <th>Role</th>
              <th>Contact Phone</th>
              <th>Module Access Rights</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(staff || []).map((stf) => (
              <tr key={stf.id}>
                <td>
                  <span className="font-mono text-[11px] font-bold text-slate-900 bg-[#FAF8F5] px-2 py-1 rounded border border-[#E8E2D9]">
                    {stf.id}
                  </span>
                </td>
                <td>
                  <div className="font-semibold text-slate-900 text-xs">{stf.name}</div>
                  <div className="text-[10px] text-slate-400">{stf.email}</div>
                </td>
                <td>
                  <span className="font-bold text-xs text-gold uppercase">{stf.role}</span>
                </td>
                <td>
                  <div className="text-xs text-slate-700 font-mono">{stf.phone}</div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {stf.permissions && Object.entries(stf.permissions).map(([mod, access]) => (
                      <span
                        key={mod}
                        className={`px-2 py-0.5 rounded font-semibold capitalize ${
                          access === 'Manage'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : access === 'View'
                            ? 'bg-blue-50 text-blue-800 border border-blue-300'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {mod}: {access}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <Badge status={stf.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {isNewStaffModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E8E2D9] shadow-2xl overflow-hidden p-6 animate-modal-in space-y-4 text-xs">
            <h3 className="font-serif text-2xl font-bold text-obsidian">Register New Staff Member</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Vikramaditya Rao"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="doctor@drzoyaclinic.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Clinic Admin">Clinic Admin</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewStaffModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold-primary px-5 py-2 font-bold">
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
