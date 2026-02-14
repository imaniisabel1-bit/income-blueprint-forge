import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import FloatingMiniPlayer from "./components/FloatingMiniPlayer";

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Systems = lazy(() => import("./pages/Systems"));
const Lab = lazy(() => import("./pages/Lab"));
const Podcast = lazy(() => import("./pages/Podcast"));
const About = lazy(() => import("./pages/About"));
const KitDetail = lazy(() => import("./pages/KitDetail"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TradingDashboard = lazy(() => import("./pages/TradingDashboard"));
const VelocityReport = lazy(() => import("./pages/VelocityReport"));
const IPCopyright = lazy(() => import("./pages/IPCopyright"));
const EarningsDisclaimer = lazy(() => import("./pages/EarningsDisclaimer"));
const AdminPortal = lazy(() => import("./pages/AdminPortal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/admin-portal" element={<AdminPortal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <FloatingMiniPlayer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
