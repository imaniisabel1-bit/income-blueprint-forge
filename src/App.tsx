import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import FloatingMiniPlayer from "./components/FloatingMiniPlayer";

const lazyRetry = (importFn: () => Promise<any>) =>
  lazy(() =>
    importFn().catch(() => {
      // Stale chunk after rebuild — reload once
      if (!sessionStorage.getItem("chunk_retry")) {
        sessionStorage.setItem("chunk_retry", "1");
        window.location.reload();
      }
      sessionStorage.removeItem("chunk_retry");
      return importFn();
    })
  );

const Index = lazyRetry(() => import("./pages/Index"));
const Auth = lazyRetry(() => import("./pages/Auth"));
const Dashboard = lazyRetry(() => import("./pages/Dashboard"));
const Systems = lazyRetry(() => import("./pages/Systems"));
const Lab = lazyRetry(() => import("./pages/Lab"));
const Podcast = lazyRetry(() => import("./pages/Podcast"));
const About = lazyRetry(() => import("./pages/About"));
const KitDetail = lazyRetry(() => import("./pages/KitDetail"));
const TermsOfService = lazyRetry(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazyRetry(() => import("./pages/PrivacyPolicy"));
const TradingDashboard = lazyRetry(() => import("./pages/TradingDashboard"));
const VelocityReport = lazyRetry(() => import("./pages/VelocityReport"));
const IPCopyright = lazyRetry(() => import("./pages/IPCopyright"));
const EarningsDisclaimer = lazyRetry(() => import("./pages/EarningsDisclaimer"));
const AdminPortal = lazyRetry(() => import("./pages/AdminPortal"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));

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
