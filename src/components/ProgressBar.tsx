interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  tone?: 'cyan' | 'green' | 'amber' | 'red';
}

export function ProgressBar({ value, max = 100, label, tone = 'cyan' }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="progress-block">
      {label ? (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{value}/{max}</strong>
        </div>
      ) : null}
      <div className="progress-track" aria-label={label ?? 'progress'}>
        <div className={`progress-fill tone-${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
