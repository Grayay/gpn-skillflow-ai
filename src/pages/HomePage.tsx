import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ProgressBar } from '../components/ProgressBar';
import {
  quickAgents,
  recommendedActions,
  skillGaps,
  userProfile,
} from '../data/platformData';
import type { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [plannedActions, setPlannedActions] = useState<string[]>([]);

  const addAction = (title: string) => {
    setPlannedActions((current) => (current.includes(title) ? current : [...current, title]));
  };

  return (
    <div className="page-grid home-dashboard">
      <section className="next-step-card span-7">
        <div className="section-title compact">
          <span className="eyebrow"><Target size={14} /> Следующий лучший шаг</span>
          <span className="status-badge info">приоритет недели</span>
        </div>
        <h2>Защитить ADR по сервису рекомендаций и закрыть SLO-практику</h2>
        <p>
          AI сопоставил грейд-матрицу, текущие курсы и задачи в спринте. Это даст максимум
          подтверждаемых баллов до ближайшего ревью.
        </p>
        <div className="next-step-actions">
          <button type="button" onClick={() => onNavigate('career')}>
            Открыть план <ArrowRight size={17} />
          </button>
          <button type="button" className="ghost-button" onClick={() => onNavigate('knowledge')}>
            <Search size={17} /> Найти источники
          </button>
        </div>
      </section>

      <section className="grade-card span-5">
        <div className="grade-header">
          <span>{userProfile.role}</span>
          <strong>{userProfile.targetRole}</strong>
        </div>
        <ProgressBar value={userProfile.points} max={userProfile.targetPoints} label="Баллы грейда" />
        <div className="grade-meta">
          <span>{userProfile.points}/{userProfile.targetPoints}</span>
          <span>ревью {userProfile.nextReview}</span>
          <span>{userProfile.mentor}</span>
        </div>
      </section>

      <section className="metric-grid span-12">
        <MetricCard
          icon={Target}
          title="До Senior"
          value="26 баллов"
          detail="реалистично закрыть за 30 дней"
          tone="cyan"
        />
        <MetricCard
          icon={GraduationCap}
          title="Обучение"
          value="2 курса"
          detail="ожидают практическую работу"
          tone="green"
        />
        <MetricCard
          icon={CalendarCheck}
          title="Наставник"
          value="Мария В."
          detail="окно для встречи на этой неделе"
          tone="amber"
        />
        <MetricCard
          icon={TrendingUp}
          title="Динамика"
          value="+11%"
          detail="к прошлому месяцу в LMS"
          tone="violet"
        />
      </section>

      <section className="panel span-7">
        <div className="section-title">
          <span className="eyebrow"><ClipboardList size={14} /> Skill gaps</span>
          <h3>Разрывы до целевого грейда</h3>
        </div>
        <div className="skill-list dense">
          {skillGaps.map((gap) => (
            <article key={gap.name} className={`skill-card status-${gap.status}`}>
              <div>
                <strong>{gap.name}</strong>
                <p>{gap.action}</p>
              </div>
              <ProgressBar
                value={gap.current}
                max={gap.target}
                label={`${gap.current}/${gap.target}`}
                tone={gap.status === 'critical' ? 'red' : gap.status === 'warning' ? 'amber' : 'green'}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="panel span-5">
        <div className="section-title">
          <span className="eyebrow"><CheckCircle2 size={14} /> План действий</span>
          <h3>Рекомендации AI</h3>
        </div>
        <div className="action-list">
          {recommendedActions.map((action) => (
            <article key={action.title} className="action-card">
              <div>
                <strong>{action.title}</strong>
                <p>{action.detail}</p>
                <span>{action.tag} · {action.due}</span>
              </div>
              <button type="button" onClick={() => addAction(action.title)}>
                {plannedActions.includes(action.title) ? 'В плане' : 'Добавить'}
              </button>
            </article>
          ))}
        </div>
        <div className="plan-counter">
          Добавлено в ИПР: <strong>{plannedActions.length}</strong>
        </div>
      </section>

      <section className="panel span-12">
        <div className="section-title">
          <span className="eyebrow"><Bot size={14} /> AI-агенты</span>
          <h3>Быстрые рабочие сценарии</h3>
        </div>
        <div className="agent-shortcuts">
          {quickAgents.map((agent) => (
            <button key={agent.title} type="button" onClick={() => onNavigate(agent.page)}>
              <span>{agent.metric}</span>
              <strong>{agent.title}</strong>
              <small>{agent.detail}</small>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
