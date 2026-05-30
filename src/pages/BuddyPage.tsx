import { useState } from 'react';
import { CheckCircle2, Circle, Handshake, KeyRound, UserCheck } from 'lucide-react';
import { AgentChat } from '../components/AgentChat';
import { askBuddy } from '../data/mockAi';
import { accessChecklist, buddyPrompts, onboardingPlan } from '../data/platformData';

export function BuddyPage() {
  const [checklist, setChecklist] = useState(accessChecklist);

  const toggleItem = (label: string) => {
    setChecklist((current) =>
      current.map((item) => (item.label === label ? { ...item, done: !item.done } : item)),
    );
  };

  return (
    <div className="page-grid">
      <section className="onboarding-timeline span-12">
        {onboardingPlan.map((phase, index) => (
          <article className="timeline-card" key={phase.period}>
            <span className="timeline-index">{index + 1}</span>
            <div>
              <small>{phase.period}</small>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}><CheckCircle2 size={14} /> {item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="panel span-7">
        <div className="section-title">
          <span className="eyebrow"><KeyRound size={14} /> Access checklist</span>
          <h3>Доступы стажера</h3>
        </div>
        <div className="check-list">
          {checklist.map((item) => (
            <button key={item.label} type="button" onClick={() => toggleItem(item.label)}>
              {item.done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
              <span>{item.label}</span>
              <strong>{item.done ? 'готово' : 'открыть заявку'}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="mentor-card span-5">
        <span className="eyebrow"><Handshake size={14} /> Наставник</span>
        <div className="mentor-row">
          <div className="mentor-avatar">
            <UserCheck size={30} />
          </div>
          <div>
            <h3>Ирина Ким</h3>
            <p>Tech Lead платформы API</p>
          </div>
        </div>
        <p>Помогает с первой задачей, правилами code review и маршрутом доступов.</p>
        <button type="button" onClick={() => toggleItem('Dev stand')}>
          Подготовить встречу
        </button>
      </section>

      <div className="span-12">
        <AgentChat
          title="AI Buddy отвечает новичку"
          intro="Я собрал твой план онбординга, вижу статус доступов и могу подсказать, что делать до первой задачи."
          prompts={buddyPrompts}
          ask={askBuddy}
        />
      </div>
    </div>
  );
}
