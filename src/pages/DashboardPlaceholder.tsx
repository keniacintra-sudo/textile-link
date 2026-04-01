import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/marca/dashboard': 'Dashboard da Marca',
  '/faccao/dashboard': 'Dashboard da Facção',
  '/artesao/dashboard': 'Dashboard do Artesão',
};

const DashboardPlaceholder = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = titles[pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background px-5" style={{ height: 56, display: 'flex', alignItems: 'center' }}>
        <div className="flex items-center gap-3 max-w-md mx-auto w-full">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-screen-title">{title}</h1>
        </div>
      </header>
      <main className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <p className="text-muted-foreground font-sans text-sm">Dashboard em construção</p>
      </main>
    </div>
  );
};

export default DashboardPlaceholder;
