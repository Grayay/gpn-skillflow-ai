import { FileText, ShieldCheck } from 'lucide-react';
import type { SourceDoc } from '../types';

interface SourceCardProps {
  source: SourceDoc;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function SourceCard({ source, selected, onSelect }: SourceCardProps) {
  return (
    <button
      className={`source-card ${selected ? 'is-selected' : ''}`}
      type="button"
      onClick={() => onSelect?.(source.id)}
    >
      <span className="source-icon">
        <FileText size={18} />
      </span>
      <span className="source-copy">
        <strong>{source.title}</strong>
        <small>{source.owner} · обновлено {source.updated}</small>
        <span>{source.excerpt}</span>
      </span>
      <span className="confidence">
        <ShieldCheck size={14} />
        {source.confidence}%
      </span>
    </button>
  );
}
