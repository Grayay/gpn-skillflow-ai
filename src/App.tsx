import { useState } from 'react';
import {
  Bot,
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  Home,
  Search,
  ShieldCheck,
  UsersRound,
  Wand2,
  WifiOff,
} from 'lucide-react';
import { Layout } from './components/Layout';
import { AgentStudioPage } from './pages/AgentStudioPage';
import { BuddyPage } from './pages/BuddyPage';
import { CareerCoachPage } from './pages/CareerCoachPage';
import { CourseBuilderPage } from './pages/CourseBuilderPage';
import { HomePage } from './pages/HomePage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ManagerPage } from './pages/ManagerPage';
import { OfflinePage } from './pages/OfflinePage';
import { SecurityPage } from './pages/SecurityPage';
import type { NavItem, PageId } from './types';

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', description: 'Личный рабочий центр', icon: Home },
  { id: 'career', label: 'Карьера', description: 'Грейд и план развития', icon: GraduationCap },
  { id: 'buddy', label: 'Онбординг', description: '30/60/90 и доступы', icon: Bot },
  { id: 'knowledge', label: 'Знания', description: 'Поиск по документам', icon: Search },
  { id: 'manager', label: 'Руководителю', description: 'Команда и риски ИПР', icon: UsersRound },
  { id: 'course', label: 'Курсы', description: 'Генерация из регламентов', icon: Wand2 },
  { id: 'studio', label: 'Agent Studio', description: 'Каталог AI-агентов', icon: BookOpenCheck },
  { id: 'offline', label: 'Offline', description: 'Смена без связи', icon: WifiOff },
  { id: 'security', label: 'Безопасность', description: 'Trust center и аудит', icon: ShieldCheck },
];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');

  const page = {
    home: <HomePage onNavigate={setActivePage} />,
    career: <CareerCoachPage />,
    buddy: <BuddyPage />,
    knowledge: <KnowledgePage />,
    manager: <ManagerPage />,
    course: <CourseBuilderPage />,
    studio: <AgentStudioPage />,
    offline: <OfflinePage />,
    security: <SecurityPage />,
  }[activePage];

  return (
    <Layout navItems={navItems} activePage={activePage} onNavigate={setActivePage}>
      {page}
    </Layout>
  );
}
