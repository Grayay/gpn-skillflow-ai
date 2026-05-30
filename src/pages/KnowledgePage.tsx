import { FormEvent, useState } from 'react';
import { FileSearch, Loader2, Search, ShieldCheck } from 'lucide-react';
import { SourceCard } from '../components/SourceCard';
import { askKnowledgeAgent } from '../data/mockAi';
import { quickKnowledgeQueries, sourceDocs } from '../data/platformData';

export function KnowledgePage() {
  const [query, setQuery] = useState('Как оформить доступ к dev stand?');
  const [answer, setAnswer] = useState('Введите запрос или выберите быстрый сценарий, чтобы Knowledge Agent собрал ответ с источниками.');
  const [selectedSource, setSelectedSource] = useState(sourceDocs[0].id);
  const [loading, setLoading] = useState(false);

  const runSearch = async (nextQuery = query) => {
    const cleanQuery = nextQuery.trim();
    if (!cleanQuery || loading) return;
    setQuery(cleanQuery);
    setLoading(true);
    const response = await askKnowledgeAgent(cleanQuery);
    setAnswer(response);
    setLoading(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void runSearch();
  };

  const selected = sourceDocs.find((doc) => doc.id === selectedSource) ?? sourceDocs[0];

  return (
    <div className="page-grid">
      <section className="search-panel span-12">
        <form className="search-box" onSubmit={onSubmit}>
          <Search size={20} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по документам, регламентам и wiki" />
          <button type="submit">Спросить</button>
        </form>
        <div className="quick-row">
          {quickKnowledgeQueries.map((item) => (
            <button key={item} type="button" onClick={() => void runSearch(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="knowledge-layout span-12">
        <div className="answer-card">
          <div className="section-title compact">
            <span className="eyebrow"><ShieldCheck size={14} /> Grounded answer</span>
            <span className="status-badge success">RAG verified</span>
          </div>
          <h2>Ответ Knowledge Agent</h2>
          {loading ? (
            <p className="loading-line"><Loader2 className="spin" size={18} /> Ищу по индексам и проверяю свежесть документов...</p>
          ) : (
            <p>{answer}</p>
          )}
          <div className="citation-strip">
            <FileSearch size={18} />
            <div>
              <strong>Основной источник: {selected.title}</strong>
              <span>{selected.owner} · уверенность {selected.confidence}% · обновлено {selected.updated}</span>
            </div>
          </div>
          <div className="answer-tags">
            <span>гибридный поиск</span>
            <span>цитирование</span>
            <span>freshness check</span>
          </div>
        </div>
        <div className="source-list">
          {sourceDocs.map((doc) => (
            <SourceCard
              key={doc.id}
              source={doc}
              selected={selectedSource === doc.id}
              onSelect={setSelectedSource}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
