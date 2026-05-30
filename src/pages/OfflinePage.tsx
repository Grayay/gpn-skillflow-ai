import { useState } from 'react';
import { CloudOff, Download, FileCheck2, RefreshCw, TabletSmartphone, Wifi } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { cachedDocuments, offlineCourses } from '../data/platformData';

export function OfflinePage() {
  const [status, setStatus] = useState('Последняя синхронизация: сегодня, 07:40');
  const [downloads, setDownloads] = useState(offlineCourses.map((course) => course.title));

  const toggleDownload = (title: string) => {
    setDownloads((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  };

  return (
    <div className="page-grid">
      <section className="offline-status-grid span-12">
        <article className="sync-summary">
          <span className="eyebrow"><CloudOff size={14} /> Field mode</span>
          <h2>Offline-пакет для смены на объекте</h2>
          <p>Курсы, инструкции и чек-листы доступны на планшете. После смены SkillFlow синхронизирует прогресс, тесты и комментарии наставнику.</p>
          <div className="hero-actions">
            <button type="button" onClick={() => setStatus('Синхронизация завершена: только что')}>
              <RefreshCw size={17} /> Синхронизировать
            </button>
            <button type="button" className="ghost-button" onClick={() => setStatus('Режим offline включен для смены 12 часов')}>
              <TabletSmartphone size={17} /> Включить offline
            </button>
          </div>
        </article>
        <article className="sync-card">
          <Wifi size={22} />
          <span>Последний sync</span>
          <strong>{status}</strong>
        </article>
        <article className="sync-card">
          <Download size={22} />
          <span>Скачано</span>
          <strong>{downloads.length} курса</strong>
        </article>
        <article className="sync-card warning">
          <RefreshCw size={22} />
          <span>Очередь отправки</span>
          <strong>3 теста · 1 комментарий</strong>
        </article>
      </section>

      <section className="panel span-7">
        <div className="section-title">
          <span className="eyebrow"><Download size={14} /> Downloaded courses</span>
          <h3>Курсы на устройстве</h3>
        </div>
        <div className="offline-list">
          {offlineCourses.map((course) => (
            <article key={course.title}>
              <div>
                <strong>{course.title}</strong>
                <span>{downloads.includes(course.title) ? course.status : 'Не скачан'}</span>
              </div>
              <ProgressBar value={course.progress} tone={course.progress > 70 ? 'green' : 'amber'} />
              <button type="button" onClick={() => toggleDownload(course.title)}>
                {downloads.includes(course.title) ? 'Удалить' : 'Скачать'}
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="panel span-5">
        <div className="section-title">
          <span className="eyebrow"><FileCheck2 size={14} /> Cached documents</span>
          <h3>Кэшированные документы</h3>
        </div>
        <div className="doc-cache">
          {cachedDocuments.map((doc) => (
            <button key={doc} type="button" onClick={() => setStatus(`Открыт offline-документ: ${doc}`)}>
              <FileCheck2 size={17} />
              {doc}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
