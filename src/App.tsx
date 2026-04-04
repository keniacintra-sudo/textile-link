import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import MarcaDashboard from "./pages/MarcaDashboard.tsx";
import FaccaoDashboard from "./pages/FaccaoDashboard.tsx";
import ArtesaoDashboard from "./pages/ArtesaoDashboard.tsx";
import ImpactReport from "./pages/ImpactReport.tsx";
import CriarPedido from "./pages/CriarPedido.tsx";
import DashboardPlaceholder from "./pages/DashboardPlaceholder.tsx";
import EscolherPerfil from "./pages/EscolherPerfil.tsx";
import Cadastro from "./pages/Cadastro.tsx";
import Login from "./pages/Login.tsx";
import AguardandoAprovacao from "./pages/AguardandoAprovacao.tsx";
import ChatScreen from "./pages/ChatScreen.tsx";
import DetalhesPedido from "./pages/DetalhesPedido.tsx";
import Chat from "./pages/Chat.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[hsl(210,40%,96%)] flex justify-center">
    <div className="w-full max-w-[460px] min-h-screen bg-background shadow-none sm:shadow-xl sm:rounded-2xl sm:my-4 sm:min-h-0 sm:h-[calc(100vh-2rem)] sm:overflow-y-auto scrollbar-hide relative flex flex-col">
      {children}
    </div>
  </div>
);

/** Redireciona para dashboard correto baseado no userType */
function dashboardPath(userType: string | null) {
  if (userType === 'faccao') return '/faccao';
  if (userType === 'artesao') return '/artesao';
  return '/marca';
}

/** Protege rotas que exigem login */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isApproved, hasSeenOnboarding, isLoading, isGuest } = useAuth();

  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-background"><span className="text-muted-foreground text-sm">Carregando...</span></div>;
  if (!hasSeenOnboarding) return <Navigate to="/" replace />;
  if (isGuest) return <>{children}</>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isApproved) return <Navigate to="/aguardando-aprovacao" replace />;

  return <>{children}</>;
};

/** Redireciona usuário logado para o dashboard */
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, userType, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-background"><span className="text-muted-foreground text-sm">Carregando...</span></div>;
  if (isLoggedIn) return <Navigate to={dashboardPath(userType)} replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isLoggedIn, userType } = useAuth();

  return (
    <Routes>
      {/* Rotas públicas / onboarding */}
      <Route path="/" element={
        isLoggedIn ? <Navigate to={dashboardPath(userType)} replace /> : <Index />
      } />
      <Route path="/escolher-perfil" element={<PublicOnlyRoute><EscolherPerfil /></PublicOnlyRoute>} />
      <Route path="/cadastro" element={<PublicOnlyRoute><Cadastro /></PublicOnlyRoute>} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/aguardando-aprovacao" element={<AguardandoAprovacao />} />

      {/* Rotas protegidas */}
      <Route path="/marca" element={<ProtectedRoute><MarcaDashboard /></ProtectedRoute>} />
      <Route path="/faccao" element={<ProtectedRoute><FaccaoDashboard /></ProtectedRoute>} />
      <Route path="/artesao" element={<ProtectedRoute><ArtesaoDashboard /></ProtectedRoute>} />
      <Route path="/impacto" element={<ProtectedRoute><ImpactReport /></ProtectedRoute>} />
      <Route path="/marca/novo-pedido" element={<ProtectedRoute><CriarPedido /></ProtectedRoute>} />
      <Route path="/marca/dashboard" element={<ProtectedRoute><DashboardPlaceholder /></ProtectedRoute>} />
      <Route path="/faccao/dashboard" element={<ProtectedRoute><DashboardPlaceholder /></ProtectedRoute>} />
      <Route path="/artesao/dashboard" element={<ProtectedRoute><DashboardPlaceholder /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/chat/:id" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
      <Route path="/pedido/:id" element={<ProtectedRoute><DetalhesPedido /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppShell>
            <AppRoutes />
          </AppShell>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
