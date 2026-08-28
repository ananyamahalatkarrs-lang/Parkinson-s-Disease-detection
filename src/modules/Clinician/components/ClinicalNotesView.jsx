import React, { useState } from 'react';
import { Plus, MessageSquare, Calendar, UserCheck } from 'lucide-react';

export const ClinicalNotesView = ({ patient }) => {
  const [notes, setNotes] = useState([
    {
      id: 'note_1',
      date: 'Aug 26, 2026',
      time: '10:45 AM',
      author: 'Dr. Aris Thorne',
      text: 'Patient exhibited mild tremor variance during physical examination. Advised routine follow-up in 2 weeks.'
    },
    {
      id: 'note_2',
      date: 'Jul 15, 2026',
      time: '02:15 PM',
      author: 'Dr. Aris Thorne',
      text: 'Longitudinal acoustic phonation test results reviewed. Motor tap frequency remains steady.'
    }
  ]);

  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: `note_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'Dr. Aris Thorne',
      text: newNoteText.trim()
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Add Clinical Note Form */}
      <div className="card-base" style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
          Add Clinical Note
        </h4>

        <form onSubmit={handleAddNote}>
          <textarea
            rows={3}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder={`Enter clinical observations or notes for ${patient?.name || 'Patient'}...`}
            className="input-field"
            style={{ marginBottom: '0.85rem' }}
          />

          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!newNoteText.trim()}
          >
            <Plus size={14} /> Add Timestamped Note
          </button>
        </form>
      </div>

      {/* Existing Notes Timeline */}
      <div className="card-base" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Patient Clinical Notes History
          </h4>
          <span className="font-mono" style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Total Notes: {notes.length}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notes.map((n) => (
            <div key={n.id} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>{n.author}</span>
                <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{n.date} at {n.time}</span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {n.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
