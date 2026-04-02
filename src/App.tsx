import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import MarcaDashboard from "./pages/MarcaDashboard.tsx";
import FaccaoDashboard from "./pages/FaccaoDashboard.tsx";
import ArtesaoDashboard from "./pages/ArtesaoDashboard.tsx";
import ImpactReport from "./pages/ImpactReport.tsx";
import CriarPedido from "./pages/CriarPedido.tsx";
import DashboardPlaceholder from "./pages/DashboardPlaceholder.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[hsl(210,40%,96%)] flex justify-center">
    <div className="w-full max-w-[460px] min-h-screen bg-background shadow-none sm:shadow-xl sm:rounded-2xl sm:my-4 sm:min-h-0 sm:max-h-[calc(100vh-2rem)] sm:overflow-y-auto scrollbar-hide relative">
      {children}
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marca" element={<MarcaDashboard />} />
            <Route path="/faccao" element={<FaccaoDashboard />} />
            <Route path="/artesao" element={<ArtesaoDashboard />} />
            <Route path="/impacto" element={<ImpactReport />} />
            <Route path="/marca/novo-pedido" element={<CriarPedido />} />
            <Route path="/marca/dashboard" element={<DashboardPlaceholder />} />
            <Route path="/faccao/dashboard" element={<DashboardPlaceholder />} />
            <Route path="/artesao/dashboard" element={<DashboardPlaceholder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
