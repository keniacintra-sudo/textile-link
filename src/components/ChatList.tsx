import { useNavigate } from 'react-router-dom';
import { type ChatPreview } from '@/data/mockData';

interface ChatListProps {
  chats: ChatPreview[];
}

const ChatList = ({ chats }: ChatListProps) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      {chats.map((chat, i) => (
        <div
          key={chat.id}
          className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-sm animate-slide-up cursor-pointer active:scale-[0.98] transition-transform"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
        >
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
            {chat.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-sm truncate">{chat.name}</p>
              <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{chat.time}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
          </div>
          {chat.unread > 0 && (
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary-foreground">{chat.unread}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
