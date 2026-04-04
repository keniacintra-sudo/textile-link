import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChatList from '@/components/ChatList';

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-xl hover:bg-muted active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Mensagens</h1>
      </div>

      <div className="flex-1 px-4 pb-4">
        <ChatList />
      </div>
    </div>
  );
};

export default Chat;
