import type { LucideIcon } from 'lucide-react';

export type PageId =
  | 'home'
  | 'career'
  | 'buddy'
  | 'knowledge'
  | 'manager'
  | 'course'
  | 'studio'
  | 'offline'
  | 'security';

export type ChatRole = 'user' | 'agent';

export interface NavItem {
  id: PageId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export interface SkillGap {
  name: string;
  current: number;
  target: number;
  status: 'critical' | 'warning' | 'stable';
  action: string;
}

export interface RecommendedAction {
  title: string;
  detail: string;
  tag: string;
  due: string;
}

export interface SourceDoc {
  id: string;
  title: string;
  owner: string;
  updated: string;
  excerpt: string;
  confidence: number;
}

export interface TeamMember {
  name: string;
  role: string;
  grade: string;
  progress: number;
  deadline: string;
  gaps: string[];
  risk: 'low' | 'medium' | 'high';
  reserve: boolean;
}

export interface GeneratedCourse {
  title: string;
  modules: string[];
  questions: string[];
  practicalTask: string;
}

export interface AgentTemplate {
  id: string;
  title: string;
  domain: string;
  description: string;
  tools: string[];
  guardrails: string[];
}

export interface AuditEntry {
  time: string;
  actor: string;
  action: string;
  object: string;
  result: 'Разрешено' | 'Заблокировано' | 'Требует проверки';
}
