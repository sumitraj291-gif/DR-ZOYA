import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { MOCK_DOCTORS, MOCK_SERVICES } from '../../data/mockData';

export const NewAppointmentModal = () => {
  const { isNewAppointmentModalOpen, setIsNewAppointmentModalOpen, addAppointment } = useApp();

  const [form, setForm] = useState({
    patientName: '',
    phone: '',
    email: '',
    service: MOCK_SERVICES[0].name,
    doctor: MOCK_DOCTORS[0].name,
    date: '2026-09-17',
    time: '10:00 AM',
    status: 'Confirmed',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientName || !form.phone) return;
    addAppointment(form);
    setForm({
      patientName: '',
      phone: '',
      email: '',
      service: MOCK_SERVICES[0].name,
      doctor: MOCK_DOCTORS[0].name,
      date: '2026-09-17',
      time: '10:00 AM',
      status: 'Confirmed',
      notes: '',
    });
  };

  return (
    <Modal
      isOpen={isNewAppointmentModalOpen}
      onClose={() => setIsNewAppointmentModalOpen(false)}
      title="Book New Appointment"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Patient Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Shalini Rao"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            className="w-full p-2.5 border rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
            <input
              type="text"
              required
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2.5 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="patient@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2.5 border rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Service / Procedure</label>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full p-2.5 border rounded-xl bg-white"
            >
              {MOCK_SERVICES.map((srv) => (
                <option key={srv.id} value={srv.name}>
                  {srv.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Assigned Specialist</label>
            <select
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              className="w-full p-2.5 border rounded-xl bg-white"
            >
              {MOCK_DOCTORS.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Appointment Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2.5 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Time Slot</label>
            <input
              type="text"
              placeholder="10:00 AM"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full p-2.5 border rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">Clinical / Preparation Notes</label>
          <textarea
            rows={3}
            placeholder="Special instructions or patient expectations..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full p-2.5 border rounded-xl"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-[#F1ECE5]">
          <button
            type="button"
            onClick={() => setIsNewAppointmentModalOpen(false)}
            className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
          >
            Cancel
          </button>
          <button type="submit" className="btn-gold-primary px-6 py-2 font-bold">
            Confirm Booking
          </button>
        </div>
      </form>
    </Modal>
  );
};
