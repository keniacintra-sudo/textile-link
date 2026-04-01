import { ArrowLeft, Leaf, Bell, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  dashboardPath?: string;
}

const PageHeader = ({ title, showBack = true, dashboardPath }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-5"
      style={{ height: 60, display: 'flex', alignItems: 'center', borderBottom: '1px solid hsl(var(--border))' }}
    >
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate('/')}
              className="p-2 -ml-2 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
          )}
          <h1 className="text-screen-title">{title}</h1>
        </div>
        <div className="flex items-center gap-1">
          {dashboardPath && (
            <button
              onClick={() => navigate(dashboardPath)}
              className="p-2.5 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150"
            >
              <BarChart3 size={20} className="text-muted-foreground" />
            </button>
          )}
          <button
            onClick={() => navigate('/impacto')}
            className="p-2.5 rounded-xl hover:bg-primary/10 active:scale-95 transition-all duration-150"
          >
            <Leaf size={20} className="text-primary" />
          </button>
          <button className="relative p-2.5 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150">
            <Bell size={20} className="text-muted-foreground" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
