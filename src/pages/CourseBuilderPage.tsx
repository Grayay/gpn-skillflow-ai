import { useState } from 'react';
import { CheckCircle2, ClipboardCheck, Edit3, Loader2, Wand2 } from 'lucide-react';
import { generateCourseFromRegulation } from '../data/mockAi';
import { regulationDraft } from '../data/platformData';
import type { GeneratedCourse } from '../types';

export function CourseBuilderPage() {
  const [text, setText] = useState(regulationDraft);
  const [course, setCourse] = useState<GeneratedCourse | null>(null);
  const [loading, setLoading] = useState(false);
  const [approval, setApproval] = useState('Ожидает эксперта T&D');

  const generate = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setApproval('AI-черновик сформирован, нужна проверка');
    const result = await generateCourseFromRegulation(text);
    setCourse(result);
    setLoading(false);
  };

  return (
    <div className="course-layout">
      <section className="panel builder-panel">
        <div className="section-title">
          <span className="eyebrow"><Wand2 size={14} /> Course Builder</span>
          <h3>Входной документ</h3>
        </div>
        <div className="document-meta">
          <span>Регламент ИБ</span>
          <span>версия draft</span>
          <span>контур T&D</span>
        </div>
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
        <div className="builder-actions">
          <button type="button" onClick={() => void generate()}>
            {loading ? <Loader2 className="spin" size={18} /> : <Wand2 size={18} />}
            Сгенерировать курс
          </button>
          <button type="button" className="ghost-button" onClick={() => setText(regulationDraft)}>
            Вернуть пример
          </button>
        </div>
      </section>

      <section className="panel course-output">
        <div className="review-strip">
          <span className="approval-badge">
            <ClipboardCheck size={17} />
            Human approval required
          </span>
          <span className="status-badge warning">{approval}</span>
        </div>
        {course ? (
          <>
            <h2>{course.title}</h2>
            <div className="output-section">
              <h3>Редактируемые модули</h3>
              {course.modules.map((module, index) => (
                <div className="module-row editable" key={module}>
                  <span className="module-index">{index + 1}</span>
                  <span>{module}</span>
                  <Edit3 size={15} />
                </div>
              ))}
            </div>
            <div className="output-section">
              <h3>Тестовые вопросы</h3>
              <ol>
                {course.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </div>
            <div className="practical-task">
              <strong>Практическое задание</strong>
              <p>{course.practicalTask}</p>
            </div>
            <div className="builder-actions">
              <button type="button" onClick={() => setApproval('Утверждено экспертом T&D')}>
                <CheckCircle2 size={17} /> Утвердить
              </button>
              <button type="button" className="ghost-button" onClick={() => setApproval('Отправлено на доработку автору курса')}>
                На доработку
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <Wand2 size={34} />
            <p>Нажмите «Сгенерировать курс», чтобы получить структуру, вопросы и практическое задание.</p>
          </div>
        )}
      </section>
    </div>
  );
}
