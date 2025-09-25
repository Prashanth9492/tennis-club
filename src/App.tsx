
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import TennisLoadingAnimation from "@/components/TennisLoadingAnimation";
import Index from "./pages/Index";
import TennisTournaments from "./pages/TennisTournaments"; // Tennis Tournaments page
import TennisPlayers from "./pages/Players"; // Tennis Players page
// import LiveScores from "./pages/LiveScores";
import TennisFixtures from "./pages/TennisFixtures"; // Tennis Match Fixtures
import Statistics from "./pages/Statistics"; // Tennis Statistics
import TennisRankings from "./pages/TennisRankings"; // Tennis Rankings page
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Highlights from "./pages/Highlights";
import HighlightsDashboard from "./pages/HighlightsDashboard";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import FirebaseLogin from "./pages/FirebaseLogin";
import TestAPI from "./pages/TestAPI";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useLoading();
  
  return (
    <>
      <TennisLoadingAnimation isLoading={isLoading} />
      <BrowserRouter>
        <Layout>
          <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/teams" element={<TennisTournaments />} />
              {/* <Route path="/tournaments" element={<TennisTournaments />} /> */}
              <Route path="/players" element={<TennisPlayers />} />
              <Route path="/live-scores" element={<TennisFixtures />} />
              <Route path="/fixtures" element={<TennisFixtures />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/rankings" element={<TennisRankings />} />
              <Route path="/highlights" element={<Highlights />} />
              <Route path="/highlights-admin" element={<HighlightsDashboard />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/test-api" element={<TestAPI />} />
              <Route path="/admindashboard" element={<Admin />} />
              <Route path="/firebase-login" element={<FirebaseLogin />} />
              <Route path="/auth" element={<AuthPage />} />

              <Route path="/admin" element={
                <ProtectedRoute adminOnly redirectTo="/auth">
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute redirectTo="/login">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </>
    );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
