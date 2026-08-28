import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const sections = [
    {
      title: 'OVERVIEW',
      links: [
        { name: 'Dashboard', path: '/' },
        { name: 'Dataset', path: '/dataset' },
        { name: 'Features', path: '/features' }
      ]
    },
    {
      title: 'MODELS',
      links: [
        { name: 'Classical', path: '/classical' },
        { name: 'Quantum', path: '/quantum' },
        { name: 'Hybrid', path: '/hybrid' },
        { name: 'Comparison', path: '/comparison' },
        { name: 'Circuit', path: '/circuit' }
      ]
    },
    {
      title: 'RESEARCH',
      links: [
        { name: 'Experiments', path: '/experiments' },
        { name: 'Performance', path: '/performance' }
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Q-PARKINSON</h2>
      </div>
      <div className="sidebar-nav">
        {sections.map(section => (
          <div key={section.title} className="sidebar-section">
            <h4 className="section-title">{section.title}</h4>
            {section.links.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <p>🧑‍🔬 Researcher Profile</p>
      </div>
    </div>
  );
};

export default Sidebar;
