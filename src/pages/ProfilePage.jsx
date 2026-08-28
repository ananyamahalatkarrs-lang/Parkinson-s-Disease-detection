import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { patient, setPatient, results } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: patient.name, age: patient.age, gender: patient.gender, patientId: patient.patientId });

  const save = () => {
    setPatient(p => ({ ...p, ...form }));
    setEditing(false);
  };

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }} className="animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0, marginBottom: 28 }}>My Profile</h1>

      <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: 'white' }}>
              {patient.name?.[0] || 'P'}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#000000' }}>{patient.name}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{patient.patientId}</div>
            </div>
          </div>
          {!editing && <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => setEditing(true)}>Edit Profile</button>}
        </div>

        {editing ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Name', 'name', 'text'], ['Age', 'age', 'number'], ['Patient ID', 'patientId', 'text']].map(([label, key, type]) => (
              <div key={key} style={{ gridColumn: key === 'name' ? '1/-1' : 'auto' }}>
                <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>{label.toUpperCase()}</label>
                <input className="input-field" type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: 6 }}>GENDER</label>
              <select className="select-field" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
              </select>
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn-primary" onClick={save}>Save Changes</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Name', patient.name], ['Age', patient.age], ['Gender', patient.gender], ['Patient ID', patient.patientId], ['Assessments Completed', results.length], ['Last Assessment', results[0]?.date || '—']].map(([label, val]) => (
              <div key={label} style={{ padding: '14px 16px', background: 'rgba(56,189,248,0.04)', borderRadius: 10, border: '1px solid rgba(56,189,248,0.08)' }}>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>{val}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
