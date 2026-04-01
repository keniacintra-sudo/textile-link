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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marca" element={<MarcaDashboard />} />
          <Route path="/faccao" element={<FaccaoDashboard />} />
          <Route path="/artesao" element={<ArtesaoDashboard />} />
          <Route path="/impacto" element={<ImpactReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
