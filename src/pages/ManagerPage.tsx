import { useState } from 'react';
import { AlertTriangle, BriefcaseBusiness, CheckCircle2, UsersRound } from 'lucide-react';
import { EmployeeCard } from '../components/EmployeeCard';
import { MetricCard } from '../components/MetricCard';
import { managerRecommendations, teamMembers } from '../data/platformData';

export function ManagerPage() {
  const [managerNote, setManagerNote] = useState('Выберите сотрудника или рекомендацию, чтобы сформировать действие руководителя.');

  const reserveCount = teamMembers.filter((member) => member.reserve).length;
  const highRiskCount = teamMembers.filter((member) => member.risk === 'high').length;
  const mediumRiskCount = teamMembers.filter((member) => member.risk === 'medium').length;

  return (
    <div className="page-grid">
      <section className="metric-grid span-12">
        <MetricCard icon={UsersRound} title="Команда" value={`${teamMembers.length}`} detail="активных ИПР" />
        <MetricCard icon={BriefcaseBusiness} title="Карьерный резерв" value={`${reserveCount}`} detail="готовы к росту" tone="green" />
        <MetricCard icon={AlertTriangle} title="Высокий риск" value={`${highRiskCount}`} detail="требует внимания" tone="red" />
        <MetricCard icon={CheckCircle2} title="Средний прогресс" value="63%" detail="по команде" tone="amber" />
      </section>

      <section className="manager-workspace span-12">
        <div className="panel team-panel">
          <div className="section-title">
            <span className="eyebrow"><UsersRound size={14} /> Team dashboard</span>
            <h3>Сотрудники, дедлайны и сигналы риска</h3>
          </div>
          <div className="employee-table">
            <div className="employee-card employee-head">
              <span>Сотрудник</span>
              <span>ИПР</span>
              <span>Разрывы</span>
              <span>Риск</span>
              <span>Дедлайн / действие</span>
            </div>
            {teamMembers.map((member) => (
              <EmployeeCard
                key={member.name}
                member={member}
                onAction={(name) => setManagerNote(`AI подготовил план 1:1 для ${name}: обсудить блокеры, подтвердить цель, выбрать практическую задачу и дату контрольной точки.`)}
              />
            ))}
          </div>
        </div>

        <aside className="manager-side">
          <section className="panel compact-panel">
            <div className="section-title">
              <span className="eyebrow"><AlertTriangle size={14} /> Risk mix</span>
              <h3>Распределение рисков</h3>
            </div>
            <div className="risk-bars">
              <div><span>Высокий</span><strong>{highRiskCount}</strong></div>
              <div><span>Средний</span><strong>{mediumRiskCount}</strong></div>
              <div><span>Низкий</span><strong>{teamMembers.length - highRiskCount - mediumRiskCount}</strong></div>
            </div>
          </section>

          <section className="panel compact-panel">
            <div className="section-title">
              <span className="eyebrow"><BriefcaseBusiness size={14} /> Резерв</span>
              <h3>Кандидаты к росту</h3>
            </div>
            <div className="reserve-list">
              {teamMembers.filter((member) => member.reserve).map((member) => (
                <button
                  type="button"
                  key={member.name}
                  onClick={() => setManagerNote(`${member.name}: рекомендовано дать stretch-задачу и публичную защиту результата на демо команды.`)}
                >
                  <strong>{member.name}</strong>
                  <span>{member.grade} · прогресс {member.progress}%</span>
                </button>
              ))}
            </div>
          </section>

          <section className="panel recommendation-panel compact-panel">
            <div className="section-title">
              <span className="eyebrow"><CheckCircle2 size={14} /> Next actions</span>
              <h3>Рекомендации</h3>
            </div>
            {managerRecommendations.map((item) => (
              <button key={item} type="button" onClick={() => setManagerNote(item)}>
                {item}
              </button>
            ))}
            <div className="manager-note">{managerNote}</div>
          </section>
        </aside>
      </section>
    </div>
  );
}
