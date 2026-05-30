import { AlertTriangle, CheckCircle2, UserRound } from 'lucide-react';
import type { TeamMember } from '../types';
import { ProgressBar } from './ProgressBar';

interface EmployeeCardProps {
  member: TeamMember;
  onAction: (name: string) => void;
}

const riskLabel = {
  low: 'низкий',
  medium: 'средний',
  high: 'высокий',
};

export function EmployeeCard({ member, onAction }: EmployeeCardProps) {
  const tone = member.risk === 'high' ? 'red' : member.risk === 'medium' ? 'amber' : 'green';

  return (
    <article className="employee-card">
      <div className="employee-main">
        <div className="avatar">
          <UserRound size={18} />
        </div>
        <div>
          <strong>{member.name}</strong>
          <span>{member.role} · {member.grade}</span>
        </div>
      </div>
      <div className="employee-progress">
        <ProgressBar value={member.progress} label="ИПР" tone={tone} />
      </div>
      <div className="gap-list">
        {member.gaps.map((gap) => (
          <span key={gap}>{gap}</span>
        ))}
      </div>
      <div className={`risk-pill risk-${member.risk}`}>
        {member.risk === 'high' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
        {riskLabel[member.risk]}
      </div>
      <div className="employee-actions">
        <small>{member.deadline}</small>
        <button type="button" className="icon-text-button" onClick={() => onAction(member.name)}>
          План 1:1
        </button>
      </div>
    </article>
  );
}
