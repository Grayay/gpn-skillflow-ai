import { BrainCircuit, CheckCircle2, Route, Target, Trophy } from 'lucide-react';
import { AgentChat } from '../components/AgentChat';
import { ProgressBar } from '../components/ProgressBar';
import { askCareerCoach } from '../data/mockAi';
import { careerPrompts, skillGaps, userProfile } from '../data/platformData';

export function CareerCoachPage() {
  return (
    <div className="page-grid">
      <section className="coach-layout span-12">
        <aside className="context-stack">
          <article className="context-card primary">
            <span className="eyebrow"><Trophy size={14} /> Текущий профиль</span>
            <h3>{userProfile.role}</h3>
            <p>{userProfile.unit}</p>
          </article>
          <article className="context-card">
            <span><Target size={15} /> Цель</span>
            <strong>{userProfile.targetRole}</strong>
            <small>контрольная точка {userProfile.nextReview}</small>
          </article>
          <article className="context-card">
            <span><Route size={15} /> Баллы</span>
            <ProgressBar value={userProfile.points} max={userProfile.targetPoints} label="Прогресс" />
            <small>нужно добрать 26 баллов</small>
          </article>
          <article className="context-card">
            <span><BrainCircuit size={15} /> Недостающие навыки</span>
            <div className="mini-gap-list">
              {skillGaps.map((gap) => (
                <span key={gap.name}>{gap.name}</span>
              ))}
            </div>
          </article>
          <article className="context-card">
            <span><CheckCircle2 size={15} /> Источники контекста</span>
            <strong>6 систем</strong>
            <small>LMS, грейд-матрица, Jira, ревью, Wiki, наставник</small>
          </article>
        </aside>
        <AgentChat
          title={`Карьерный маршрут для ${userProfile.name}`}
          intro="Привет. Я вижу цель Middle Backend Developer -> Senior. Могу объяснить недостающие компетенции, собрать 30-дневный план и предложить практические задачи с наставником."
          prompts={careerPrompts}
          ask={askCareerCoach}
        />
      </section>
    </div>
  );
}
