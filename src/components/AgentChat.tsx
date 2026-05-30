import { FormEvent, useMemo, useState } from 'react';
import { Bot, Loader2, Send, Sparkles, UserRound } from 'lucide-react';
import type { ChatMessage, ChatRole } from '../types';

interface AgentChatProps {
  title: string;
  intro: string;
  prompts: string[];
  ask: (prompt: string) => Promise<string>;
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}

function renderMessage(text: string, role: ChatRole) {
  if (role === 'user') {
    return <p>{text}</p>;
  }

  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const bullets = lines.filter((line) => line.startsWith('- '));
  const paragraphs = lines.filter((line) => !line.startsWith('- '));

  if (!bullets.length) {
    return <p>{text}</p>;
  }

  return (
    <div className="message-bubble">
      {paragraphs.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <ul>
        {bullets.map((line) => (
          <li key={line}>{line.replace(/^- /, '')}</li>
        ))}
      </ul>
    </div>
  );
}

export function AgentChat({ title, intro, prompts, ask }: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'intro', role: 'agent', text: intro },
  ]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);

  const lastPrompt = useMemo(() => {
    const lastUser = [...messages].reverse().find((message) => message.role === 'user');
    return lastUser?.text ?? 'готов к диалогу';
  }, [messages]);

  const sendPrompt = async (prompt: string) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || loading) return;

    setDraft('');
    setMessages((current) => [
      ...current,
      { id: makeId('user'), role: 'user', text: cleanPrompt },
    ]);
    setLoading(true);
    const response = await ask(cleanPrompt);
    setMessages((current) => [
      ...current,
      { id: makeId('agent'), role: 'agent', text: response },
    ]);
    setLoading(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendPrompt(draft);
  };

  return (
    <section className="chat-shell">
      <div className="chat-header">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> AI-агент</span>
          <h2>{title}</h2>
        </div>
        <span className="chat-status">Контекст: {lastPrompt}</span>
      </div>
      <div className="prompt-row">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => void sendPrompt(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
      <div className="messages" aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <span className="message-icon">
              {message.role === 'agent' ? <Bot size={17} /> : <UserRound size={17} />}
            </span>
            {renderMessage(message.text, message.role)}
          </div>
        ))}
        {loading ? (
          <div className="message agent is-loading">
            <span className="message-icon">
              <Loader2 size={17} className="spin" />
            </span>
            <p>Анализирую профиль, матрицу компетенций и последние активности...</p>
          </div>
        ) : null}
      </div>
      <form className="chat-input" onSubmit={onSubmit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Задайте вопрос агенту"
        />
        <button type="submit" aria-label="Отправить вопрос">
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
