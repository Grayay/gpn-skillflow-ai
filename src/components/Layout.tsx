import { useState } from 'react';
import type { ReactNode } from 'react';
import type { NavItem, PageId } from '../types';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  navItems: NavItem[];
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

export function Layout({ navItems, activePage, onNavigate, children }: LayoutProps) {
  const [demoMode, setDemoMode] = useState(true);
  const [syncLabel, setSyncLabel] = useState('Синхронизировано');

  const sync = () => {
    setSyncLabel(`Синхр. ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`);
  };

  return (
    <div className="app-shell">
      <Sidebar items={navItems} activePage={activePage} onNavigate={onNavigate} />
      <main className="main-shell">
        <Header
          activePage={activePage}
          demoMode={demoMode}
          syncLabel={syncLabel}
          onToggleDemo={() => setDemoMode((value) => !value)}
          onSync={sync}
        />
        {demoMode ? (
          <div className="demo-ribbon">
            <strong>Демо-контур:</strong> моковые данные, on-prem сценарий, роли сотрудника, руководителя и T&D эксперта.
          </div>
        ) : null}
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
