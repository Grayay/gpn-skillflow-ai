import { useState } from 'react';
import { Bot, CheckCircle2, Database, KeyRound, PlayCircle, Settings2, ShieldCheck } from 'lucide-react';
import { agentTemplates } from '../data/platformData';

const dataSources = ['LMS', 'HR profile', 'Wiki', 'Grade matrix'];
const permissions = ['read:user_profile', 'read:learning', 'write:draft_task'];

export function AgentStudioPage() {
  const [selectedId, setSelectedId] = useState(agentTemplates[0].id);
  const [status, setStatus] = useState('Шаблон открыт для настройки.');
  const selected = agentTemplates.find((template) => template.id === selectedId) ?? agentTemplates[0];

  return (
    <div className="studio-layout">
      <section className="catalog-panel">
        <div className="section-title">
          <span className="eyebrow"><Bot size={14} /> Agent catalog</span>
          <h3>Шаблоны для внутренних сценариев</h3>
        </div>
        <div className="template-grid">
          {agentTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              className={selected.id === template.id ? 'template-card is-selected' : 'template-card'}
              onClick={() => {
                setSelectedId(template.id);
                setStatus(`Открыт шаблон: ${template.title}`);
              }}
            >
              <Bot size={21} />
              <span>{template.domain}</span>
              <strong>{template.title}</strong>
              <small>{template.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="panel config-card">
        <div className="section-title">
          <span className="eyebrow"><Settings2 size={14} /> No-code config</span>
          <h3>{selected.title}</h3>
        </div>
        <p>{selected.description}</p>

        <div className="config-section">
          <h4><Database size={16} /> Источники данных</h4>
          <div className="pill-row">
            {dataSources.map((source) => (
              <span key={source} className="config-pill">{source}</span>
            ))}
          </div>
        </div>

        <div className="config-columns">
          <div className="config-section">
            <h4><PlayCircle size={16} /> Действия агента</h4>
            {selected.tools.map((tool) => (
              <span key={tool} className="config-pill">{tool}</span>
            ))}
          </div>
          <div className="config-section">
            <h4><KeyRound size={16} /> Права</h4>
            {permissions.map((permission) => (
              <span key={permission} className="config-pill neutral">{permission}</span>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h4><ShieldCheck size={16} /> Guardrails</h4>
          {selected.guardrails.map((guardrail) => (
            <span key={guardrail} className="config-pill guardrail">{guardrail}</span>
          ))}
        </div>

        <div className="studio-actions">
          <button type="button" onClick={() => setStatus(`${selected.title}: подключены источники и роли доступа.`)}>
            Подключить источники
          </button>
          <button type="button" className="ghost-button" onClick={() => setStatus(`${selected.title}: шаблон сохранен как черновик.`)}>
            Сохранить черновик
          </button>
        </div>
        <div className="manager-note">
          <CheckCircle2 size={16} />
          {status}
        </div>
      </section>
    </div>
  );
}
