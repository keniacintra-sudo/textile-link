import { ArrowLeft, Leaf, Bell, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  dashboardPath?: string;
}

const PageHeader = ({ title, showBack = true }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-background px-5" style={{ height: 56, display: 'flex', alignItems: 'center' }}>
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => navigate('/')} className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft size={22} className="text-foreground" />
            </button>
          )}
          <h1 className="text-screen-title">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/impacto')} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <Leaf size={20} className="text-primary" />
          </button>
          <button className="relative p-1.5 rounded-lg hover:bg-muted transition-colors">
            <Bell size={20} className="text-muted-foreground" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;