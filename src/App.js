import React, { useState } from 'react';
import { Users, UserCheck, Wallet, GraduationCap, Plus, Trash2, Search, Calendar, IndianRupee, ChevronRight, X } from 'lucide-react';

const initialStudents = [
  { id: 1, name: 'Arun Kumar', cls: '10-A', roll: 1, parent: 'Murugan', phone: '9876543210', fees: 15000, paid: 15000 },
  { id: 2, name: 'Priya S', cls: '10-A', roll: 2, parent: 'Selvam', phone: '9876543211', fees: 15000, paid: 10000 },
  { id: 3, name: 'Karthik R', cls: '9-B', roll: 5, parent: 'Ravi', phone: '9876543212', fees: 12000, paid: 12000 },
  { id: 4, name: 'Divya M', cls: '9-B', roll: 6, parent: 'Manikandan', phone: '9876543213', fees: 12000, paid: 6000 },
  { id: 5, name: 'Vignesh T', cls: '8-C', roll: 10, parent: 'Thangaraj', phone: '9876543214', fees: 10000, paid: 10000 },
];

const initialStaff = [
  { id: 1, name: 'Mrs. Latha', role: 'Class Teacher - 10A', phone: '9444411111', subject: 'Mathematics' },
  { id: 2, name: 'Mr. Suresh', role: 'Class Teacher - 9B', phone: '9444411112', subject: 'Science' },
  { id: 3, name: 'Mrs. Geetha', role: 'Class Teacher - 8C', phone: '9444411113', subject: 'English' },
  { id: 4, name: 'Mr. Bala', role: 'PT Master', phone: '9444411114', subject: 'Physical Education' },
];

const classes = ['8-C', '9-B', '10-A'];

function App() {
  const [tab, setTab] = useState('dashboard');
  const [students, setStudents] = useState(initialStudents);
  const [staff, setStaff] = useState(initialStaff);
  const [attendance, setAttendance] = useState({});
  const [attDate, setAttDate] = useState(new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState('');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', cls: '8-C', roll: '', parent: '', phone: '', fees: '' });
  const [newStaff, setNewStaff] = useState({ name: '', role: '', phone: '', subject: '' });
  const [feePayment, setFeePayment] = useState({});

  const totalFees = students.reduce((s, x) => s + x.fees, 0);
  const totalPaid = students.reduce((s, x) => s + x.paid, 0);
  const totalDue = totalFees - totalPaid;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.cls.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAttendance = (studentId) => {
    const key = `${attDate}_${studentId}`;
    setAttendance(prev => ({
      ...prev,
      [key]: prev[key] === 'present' ? 'absent' : prev[key] === 'absent' ? undefined : 'present'
    }));
  };

  const addStudent = () => {
    if (!newStudent.name || !newStudent.roll) return;
    setStudents([...students, {
      id: Date.now(),
      name: newStudent.name,
      cls: newStudent.cls,
      roll: Number(newStudent.roll),
      parent: newStudent.parent,
      phone: newStudent.phone,
      fees: Number(newStudent.fees) || 0,
      paid: 0
    }]);
    setNewStudent({ name: '', cls: '8-C', roll: '', parent: '', phone: '', fees: '' });
    setShowAddStudent(false);
  };

  const addStaff = () => {
    if (!newStaff.name) return;
    setStaff([...staff, { id: Date.now(), ...newStaff }]);
    setNewStaff({ name: '', role: '', phone: '', subject: '' });
    setShowAddStaff(false);
  };

  const removeStudent = (id) => setStudents(students.filter(s => s.id !== id));
  const removeStaff = (id) => setStaff(staff.filter(s => s.id !== id));

  const recordPayment = (id) => {
    const amt = Number(feePayment[id]);
    if (!amt || amt <= 0) return;
    setStudents(students.map(s => s.id === id ? { ...s, paid: Math.min(s.fees, s.paid + amt) } : s));
    setFeePayment({ ...feePayment, [id]: '' });
  };

  const NavBtn = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full ${
        tab === id ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-emerald-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 p-4 flex flex-col gap-1">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">SFS</div>
            <div>
              <div className="font-semibold text-slate-800 text-sm leading-tight">SFS School</div>
              <div className="text-xs text-slate-400">Alanagayam</div>
            </div>
          </div>
        </div>
        <NavBtn id="dashboard" icon={GraduationCap} label="Dashboard" />
        <NavBtn id="students" icon={Users} label="Students" />
        <NavBtn id="attendance" icon={UserCheck} label="Attendance" />
        <NavBtn id="fees" icon={Wallet} label="Fees" />
        <NavBtn id="staff" icon={Users} label="Staff" />
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        {tab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Dashboard</h1>
            <p className="text-slate-500 text-sm mb-6">Overview of SFS School, Alanagayam</p>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <Users className="text-emerald-600 mb-2" size={20} />
                <div className="text-2xl font-semibold text-slate-800">{students.length}</div>
                <div className="text-xs text-slate-500">Total Students</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <Users className="text-blue-600 mb-2" size={20} />
                <div className="text-2xl font-semibold text-slate-800">{staff.length}</div>
                <div className="text-xs text-slate-500">Staff Members</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <IndianRupee className="text-amber-600 mb-2" size={20} />
                <div className="text-2xl font-semibold text-slate-800">₹{totalPaid.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Fees Collected</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <IndianRupee className="text-red-500 mb-2" size={20} />
                <div className="text-2xl font-semibold text-slate-800">₹{totalDue.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Fees Due</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Class-wise Strength</h2>
              <div className="space-y-2">
                {classes.map(c => {
                  const count = students.filter(s => s.cls === c).length;
                  return (
                    <div key={c} className="flex items-center gap-3">
                      <div className="w-16 text-sm text-slate-600">{c}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(count / students.length) * 100}%` }} />
                      </div>
                      <div className="w-8 text-sm text-slate-500 text-right">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'students' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-slate-800">Students</h1>
              <button onClick={() => setShowAddStudent(true)} className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                <Plus size={16} /> Add Student
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or class..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-left">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Class</th>
                    <th className="px-4 py-2.5 font-medium">Roll</th>
                    <th className="px-4 py-2.5 font-medium">Parent</th>
                    <th className="px-4 py-2.5 font-medium">Phone</th>
                    <th className="px-4 py-2.5 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(s => (
                    <tr key={s.id} className="border-t border-slate-100">
                      <td className="px-4 py-2.5 font-medium text-slate-700">{s.name}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.cls}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.roll}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.parent}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.phone}</td>
                      <td className="px-4 py-2.5 text-right">
                        <button onClick={() => removeStudent(s.id)} className="text-slate-400 hover:text-red-500">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-400">No students found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {showAddStudent && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-5 w-96 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800">Add Student</h3>
                    <button onClick={() => setShowAddStudent(false)}><X size={18} className="text-slate-400" /></button>
                  </div>
                  <div className="space-y-2.5">
                    <input placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <select value={newStudent.cls} onChange={e => setNewStudent({...newStudent, cls: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                      {classes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input placeholder="Roll No" type="number" value={newStudent.roll} onChange={e => setNewStudent({...newStudent, roll: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <input placeholder="Parent Name" value={newStudent.parent} onChange={e => setNewStudent({...newStudent, parent: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <input placeholder="Phone" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <input placeholder="Total Fees (₹)" type="number" value={newStudent.fees} onChange={e => setNewStudent({...newStudent, fees: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <button onClick={addStudent} className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Add Student</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'attendance' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-slate-800">Attendance</h1>
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
                <Calendar size={16} className="text-slate-400" />
                <input type="date" value={attDate} onChange={e => setAttDate(e.target.value)} className="text-sm focus:outline-none" />
              </div>
            </div>
            {classes.map(c => (
              <div key={c} className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
                <h2 className="text-sm font-semibold text-slate-700 mb-3">Class {c}</h2>
                <div className="space-y-2">
                  {students.filter(s => s.cls === c).map(s => {
                    const status = attendance[`${attDate}_${s.id}`];
                    return (
                      <div key={s.id} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                        <div className="text-sm text-slate-700">{s.roll}. {s.name}</div>
                        <button
                          onClick={() => toggleAttendance(s.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                            status === 'absent' ? 'bg-red-100 text-red-600' :
                            'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {status === 'present' ? 'Present' : status === 'absent' ? 'Absent' : 'Not marked'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'fees' && (
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-4">Fees</h1>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500 mb-1">Total Fees</div>
                <div className="text-xl font-semibold text-slate-800">₹{totalFees.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500 mb-1">Collected</div>
                <div className="text-xl font-semibold text-emerald-600">₹{totalPaid.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500 mb-1">Due</div>
                <div className="text-xl font-semibold text-red-500">₹{totalDue.toLocaleString()}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-left">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Class</th>
                    <th className="px-4 py-2.5 font-medium">Total</th>
                    <th className="px-4 py-2.5 font-medium">Paid</th>
                    <th className="px-4 py-2.5 font-medium">Due</th>
                    <th className="px-4 py-2.5 font-medium">Record Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => {
                    const due = s.fees - s.paid;
                    return (
                      <tr key={s.id} className="border-t border-slate-100">
                        <td className="px-4 py-2.5 font-medium text-slate-700">{s.name}</td>
                        <td className="px-4 py-2.5 text-slate-600">{s.cls}</td>
                        <td className="px-4 py-2.5 text-slate-600">₹{s.fees.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-emerald-600">₹{s.paid.toLocaleString()}</td>
                        <td className="px-4 py-2.5">
                          {due > 0 ? <span className="text-red-500">₹{due.toLocaleString()}</span> : <span className="text-emerald-600">Paid</span>}
                        </td>
                        <td className="px-4 py-2.5">
                          {due > 0 ? (
                            <div className="flex gap-1.5">
                              <input
                                type="number"
                                placeholder="Amount"
                                value={feePayment[s.id] || ''}
                                onChange={e => setFeePayment({...feePayment, [s.id]: e.target.value})}
                                className="w-24 px-2 py-1 border border-slate-200 rounded text-xs"
                              />
                              <button onClick={() => recordPayment(s.id)} className="bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-emerald-700">Pay</button>
                            </div>
                          ) : <span className="text-slate-300 text-xs">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'staff' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-slate-800">Staff</h1>
              <button onClick={() => setShowAddStaff(true)} className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                <Plus size={16} /> Add Staff
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {staff.map(s => (
                <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start justify-between">
                  <div>
                    <div className="font-medium text-slate-800">{s.name}</div>
                    <div className="text-sm text-slate-500">{s.role}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.subject} · {s.phone}</div>
                  </div>
                  <button onClick={() => removeStaff(s.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {showAddStaff && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-5 w-96 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800">Add Staff</h3>
                    <button onClick={() => setShowAddStaff(false)}><X size={18} className="text-slate-400" /></button>
                  </div>
                  <div className="space-y-2.5">
                    <input placeholder="Name" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <input placeholder="Role" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <input placeholder="Subject" value={newStaff.subject} onChange={e => setNewStaff({...newStaff, subject: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    <input placeholder="Phone" value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <button onClick={addStaff} className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Add Staff</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
