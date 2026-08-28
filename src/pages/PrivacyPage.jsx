export default function PrivacyPage() {
  return (
    <div style={{ padding: '32px', maxWidth: 800, margin: '0 auto' }} className="animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000000', margin: 0, marginBottom: 8 }}>Your Data, Your Privacy</h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Q-Health is designed with privacy and patient safety as core principles.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { icon: '🔒', title: 'Secure Processing', desc: 'Patient information is transmitted securely. Data is processed locally within the research prototype environment.' },
          { icon: '📦', title: 'Minimal Data', desc: 'We collect only the information necessary for the assessment — biomedical voice features and basic demographic context.' },
          { icon: '🔍', title: 'Transparent AI', desc: 'The features influencing the model output are explained clearly in every assessment result.' },
          { icon: '🏥', title: 'Medical Safety', desc: 'Q-Health is a research prototype. It is not a diagnostic device. Results must not replace professional medical evaluation.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="glass-card" style={{ padding: 22 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#000000', marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000000', marginBottom: 14 }}>Data Usage</h3>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Voice/biomedical features are used solely for generating the risk assessment.',
            'No data is shared with third parties in this research prototype.',
            'Assessment history is stored locally for your reference.',
            'You may request deletion of your data at any time.',
          ].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
              <span style={{ color: '#38bdf8', flexShrink: 0 }}>→</span>{t}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '16px 20px', background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.12)', borderRadius: 12, fontSize: 13, color: '#475569', lineHeight: 1.8 }}>
        <strong style={{ color: '#64748b' }}>Medical Disclaimer:</strong> Q-Health is an AI-based research prototype intended for preliminary risk assessment and educational/research purposes. It is not a medical diagnostic device and should not be used as a substitute for evaluation by a qualified healthcare professional.
      </div>
    </div>
  );
}
