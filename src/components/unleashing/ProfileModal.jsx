import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Shield, HeartPulse, Edit3, Check, Database, AlertCircle } from 'lucide-react';

const DEFAULT_PROFILE = {
  fullName: 'Ishan Maurya',
  abhaId: 'ABHA-9821-4402-9912',
  age: '24',
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  email: 'ishan.maurya@example.com',
  emergencyContact: 'Family Contact (+91 98765 00000)',
  allergies: 'No Known Drug Allergies (NKDA)',
  conditions: 'Hypertension (Controlled), Mild Asthmatic History',
  address: 'Sector 62, Noida, Uttar Pradesh',
};

export default function ProfileModal({ isOpen, onClose }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('medikiosk_patient_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('medikiosk_patient_profile', JSON.stringify(profile));
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleChange = (field, val) => {
    setProfile((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="ub-auth-modal-overlay" style={{ zIndex: 150 }}>
      <div
        className="ub-auth-card"
        style={{
          maxWidth: '36rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem 2.5rem 2rem',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          <X size={20} />
        </button>

        {/* Header with Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              background: '#87359f15',
              border: '2px solid #87359f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#87359f',
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}
          >
            {profile.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: '#111', lineHeight: 1 }}>
                {profile.fullName}
              </h3>
              <span className="ub-status-pill normal" style={{ background: '#35705b15', color: '#35705b' }}>
                Active Patient
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem' }}>
              ABHA ID: <strong style={{ color: '#111' }}>{profile.abhaId}</strong>
            </p>
          </div>
        </div>

        {/* Database notice banner */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.78rem',
            color: '#475569',
            marginBottom: '1.5rem',
          }}
        >
          <Database size={16} color="#87359f" />
          <span>Profile data is cached locally. Ready for database synchronization.</span>
        </div>

        {saveToast && (
          <div
            style={{
              background: '#e6f4ea',
              color: '#137333',
              padding: '0.65rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Check size={16} /> Changes saved successfully!
          </div>
        )}

        {/* Profile Info Form / Display */}
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', color: '#111', fontWeight: 600 }}>{profile.fullName}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Age & Gender
              </label>
              {isEditing ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={profile.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="Age"
                    style={{ width: '50%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                  />
                  <input
                    type="text"
                    value={profile.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    placeholder="Gender"
                    style={{ width: '50%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                  />
                </div>
              ) : (
                <p style={{ fontSize: '0.9rem', color: '#111', fontWeight: 600 }}>
                  {profile.age} yrs • {profile.gender}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Blood Group
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.bloodGroup}
                  onChange={(e) => handleChange('bloodGroup', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', color: '#c74332', fontWeight: 700 }}>{profile.bloodGroup}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', color: '#111' }}>{profile.phone}</p>
              )}
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Emergency Contact
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', color: '#111' }}>{profile.emergencyContact}</p>
              )}
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Known Allergies
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#b06000', fontWeight: 600 }}>{profile.allergies}</p>
              )}
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-sans-bold)', color: '#666', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Chronic Conditions / Medical Notes
              </label>
              {isEditing ? (
                <textarea
                  value={profile.conditions}
                  onChange={(e) => handleChange('conditions', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.85rem', minHeight: '4rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#444' }}>{profile.conditions}</p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="ub-see-chap-btn"
                  style={{ padding: '0.5rem 1.25rem' }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ub-see-chap-btn"
                  style={{ background: '#87359f', color: '#fff', borderColor: '#87359f', padding: '0.5rem 1.5rem' }}
                >
                  Save Profile
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ub-see-chap-btn"
                style={{ borderColor: '#87359f', color: '#87359f', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.5rem' }}
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={14} /> Edit Information
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
