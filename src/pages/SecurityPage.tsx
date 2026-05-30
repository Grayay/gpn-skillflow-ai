import { useState } from 'react';
import { Database, EyeOff, FileWarning, LockKeyhole, ScrollText, ShieldCheck, UserCheck } from 'lucide-react';
import { auditLog, securityControls } from '../data/platformData';

export function SecurityPage() {
  const [filter, setFilter] = useState<'all' | 'blocked'>('all');
  const [note, setNote] = useState('Контроль включен: все действия AI-агентов пишутся в audit log.');
  const rows = filter === 'blocked' ? auditLog.filter((entry) => entry.result === 'Заблокировано') : auditLog;

  return (
    <div className="page-grid">
      <section className="security-grid span-12">
        {securityControls.map((control, index) => {
          const icons = [Database, LockKeyhole, ShieldCheck, ScrollText, EyeOff, FileWarning, UserCheck];
          const Icon = icons[index] ?? ShieldCheck;
          return (
            <button key={control} type="button" onClick={() => setNote(`Выбран контроль: ${control}`)}>
              <Icon size={21} />
              <span>{control}</span>
              <small>включено</small>
            </button>
          );
        })}
      </section>

      <section className="panel audit-panel span-12">
        <div className="section-title">
          <span className="eyebrow"><ShieldCheck size={14} /> Audit log</span>
          <h3>События безопасности AI-платформы</h3>
        </div>
        <div className="audit-actions">
          <button type="button" className={filter === 'all' ? 'is-selected' : ''} onClick={() => setFilter('all')}>Все события</button>
          <button type="button" className={filter === 'blocked' ? 'is-selected' : ''} onClick={() => setFilter('blocked')}>Только блокировки</button>
          <button type="button" className="ghost-button" onClick={() => setNote('Отчет по AI governance сформирован для ИБ и T&D.')}>
            Сформировать отчет
          </button>
        </div>
        <div className="security-note">{note}</div>
        <div className="audit-table">
          <div className="audit-row audit-head">
            <span>Время</span>
            <span>Актор</span>
            <span>Действие</span>
            <span>Объект</span>
            <span>Результат</span>
          </div>
          {rows.map((entry) => (
            <div className="audit-row" key={`${entry.time}-${entry.action}`}>
              <span>{entry.time}</span>
              <span>{entry.actor}</span>
              <span>{entry.action}</span>
              <span>{entry.object}</span>
              <strong className={entry.result === 'Заблокировано' ? 'blocked' : ''}>{entry.result}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
