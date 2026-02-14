import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Systems from "./pages/Systems";
import Lab from "./pages/Lab";
import Podcast from "./pages/Podcast";
import About from "./pages/About";
import KitDetail from "./pages/KitDetail";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TradingDashboard from "./pages/TradingDashboard";
import VelocityReport from "./pages/VelocityReport";
import IPCopyright from "./pages/IPCopyright";
import EarningsDisclaimer from "./pages/EarningsDisclaimer";
import NotFound from "./pages/NotFound";
import FloatingMiniPlayer from "./components/FloatingMiniPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/about" element={<About />} />
          <Route path="/kits/:id" element={<KitDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/trading-dashboard" element={<TradingDashboard />} />
          <Route path="/velocity-report" element={<VelocityReport />} />
          <Route path="/ip-copyright" element={<IPCopyright />} />
          <Route path="/earnings-disclaimer" element={<EarningsDisclaimer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingMiniPlayer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
