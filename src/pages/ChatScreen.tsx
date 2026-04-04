import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { chats, chatMessages, type ChatMessage } from '@/data/mockData';

const ChatScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const contact = chats.find((c) => c.id === id);
  const initialMessages: ChatMessage[] = id ? (chatMessages[id] ?? []) : [];

  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      text: trimmed,
      fromMe: true,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setText('');
    inputRef.current?.focus();

    setTimeout(() => {
      const replies = [
        'Entendido! Vou verificar e já retorno.',
        'Obrigado pela mensagem! 👍',
        'Perfeito, pode deixar.',
        'Certo! Qualquer dúvida é só falar.',
        'Combinado! Falo mais tarde.',
      ];
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        text: replies[Math.floor(Math.random() * replies.length)],
        fromMe: false,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-6 text-center">
        <p className="text-muted-foreground font-sans text-[15px]">Conversa não encontrada.</p>
        <button onClick={() => navigate(-1)} className="btn-primary mt-6">Voltar</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen sm:min-h-0 bg-background">

      {/* ── Header ── */}
      <div
        className="shrink-0 flex items-center gap-3 px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-1 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-[13px] text-white shrink-0"
          style={{ background: 'hsl(160 84% 39% / 0.3)' }}
        >
          {contact.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-sans font-bold text-[15px] text-white truncate">
            {contact.name}
          </p>
          <p className="font-sans text-[11px] text-white/60">
            Online agora
          </p>
        </div>

        <button className="p-2 rounded-xl hover:bg-white/10 transition-colors">
          <MoreVertical size={18} className="text-white/70" />
        </button>
      </div>

      {/* ── Mensagens ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.fromMe && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-sans text-[10px] font-bold text-white shrink-0"
                style={{ background: 'hsl(160 84% 39% / 0.3)' }}
              >
                {contact.avatar}
              </div>
            )}

            <div className={`max-w-[75%] ${msg.fromMe ? 'order-first' : ''}`}>
              <div
                className={`rounded-2xl px-3.5 py-2.5 font-sans text-[14px] leading-relaxed ${
                  msg.fromMe
                    ? 'bg-accent text-accent-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
              <p
                className={`font-sans text-[10px] text-muted-foreground mt-1 ${
                  msg.fromMe ? 'text-right' : 'text-left'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-t border-border bg-card">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          className="flex-1 h-11 rounded-2xl border border-border bg-background px-4 font-sans text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        <button
          onClick={handleSend}
          className="w-11 h-11 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center active:scale-95 transition-transform"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
