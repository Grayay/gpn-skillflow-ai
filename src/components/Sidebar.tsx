import { BrainCircuit, LockKeyhole, Server } from 'lucide-react';
import type { NavItem, PageId } from '../types';

interface SidebarProps {
  items: NavItem[];
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Sidebar({ items, activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <button className="brand" type="button" onClick={() => onNavigate('home')}>
        <span className="brand-mark">
          <BrainCircuit size={22} />
        </span>
        <span>
          <strong>GPN SkillFlow AI</strong>
          <small>Внутренняя AI-платформа</small>
        </span>
      </button>
      <nav className="nav-list" aria-label="Основная навигация">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={activePage === item.id ? 'is-active' : ''}
              type="button"
              onClick={() => onNavigate(item.id)}
              title={item.description}
            >
              <Icon size={18} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-status">
          <Server size={15} />
          <span>GPN Internal</span>
        </div>
        <strong><LockKeyhole size={14} /> On-prem secure</strong>
        <small>LLM, данные и аудит внутри корпоративного контура</small>
      </div>
    </aside>
  );
}
