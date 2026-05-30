import { useState } from 'react';
import { Bell, CalendarClock, DatabaseZap, RefreshCw, ShieldCheck, UserRound } from 'lucide-react';
import type { PageId } from '../types';
import { pageTitles, userProfile } from '../data/platformData';

interface HeaderProps {
  activePage: PageId;
  demoMode: boolean;
  syncLabel: string;
  onToggleDemo: () => void;
  onSync: () => void;
}

const roleOptions = ['Сотрудник', 'Руководитель', 'T&D эксперт'];

export function Header({ activePage, demoMode, syncLabel, onToggleDemo, onSync }: HeaderProps) {
  const copy = pageTitles[activePage];
  const [role, setRole] = useState(roleOptions[0]);

  return (
    <header className="topbar">
      <div className="topbar-title">
        <div className="topbar-meta">
          <span><DatabaseZap size={14} /> ИТ-кластер</span>
          <span><ShieldCheck size={14} /> On-prem LLM</span>
          <span><CalendarClock size={14} /> ревью: {userProfile.nextReview}</span>
        </div>
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </div>
      <div className="topbar-actions">
        <label className="role-switcher">
          <span>Роль</span>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            {roleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button type="button" className={demoMode ? 'toggle is-on' : 'toggle'} onClick={onToggleDemo}>
          <Bell size={16} />
          {demoMode ? 'Демо включено' : 'Демо режим'}
        </button>
        <button type="button" className="icon-text-button" onClick={onSync}>
          <RefreshCw size={16} />
          {syncLabel}
        </button>
        <div className="profile-chip">
          <span className="avatar small">
            <UserRound size={16} />
          </span>
          <span>
            <strong>{userProfile.name}</strong>
            <small>{userProfile.role}</small>
          </span>
        </div>
      </div>
    </header>
  );
}
