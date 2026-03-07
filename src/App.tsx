import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import DocumentProcessor from "@/pages/DocumentProcessor";
import CompetitorIntelligence from "@/pages/CompetitorIntelligence";
import CompetitorSWOT from "@/pages/CompetitorSWOT";
import WinLossAnalysis from "@/pages/WinLossAnalysis";
import TeamPerformance from "@/pages/TeamPerformance";
import TeamCollaborationNetwork from "@/pages/TeamCollaborationNetwork";
import CollaborationTimeline from "@/pages/CollaborationTimeline";
import LiveCollaborationTracker from "@/pages/LiveCollaborationTracker";
import InteractionQualityAnalysis from "@/pages/InteractionQualityAnalysis";
import PricingPage from "@/pages/PricingPage";
import BillingPage from "@/pages/BillingPage";
import LoginPage from "@/pages/LoginPage";
import { isAuthenticated } from "@/lib/auth";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuth ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={() => setIsAuth(true)} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/document-processor"
            element={
              <ProtectedRoute>
                <DocumentProcessor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/competitor-intelligence"
            element={
              <ProtectedRoute>
                <CompetitorIntelligence />
              </ProtectedRoute>
            }
          />
          <Route
            path="/competitor-swot"
            element={
              <ProtectedRoute>
                <CompetitorSWOT />
              </ProtectedRoute>
            }
          />
          <Route
            path="/win-loss-analysis"
            element={
              <ProtectedRoute>
                <WinLossAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team-performance"
            element={
              <ProtectedRoute>
                <TeamPerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collaboration-network"
            element={
              <ProtectedRoute>
                <TeamCollaborationNetwork />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collaboration-timeline"
            element={
              <ProtectedRoute>
                <CollaborationTimeline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live-collaboration-tracker"
            element={
              <ProtectedRoute>
                <LiveCollaborationTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interaction-quality"
            element={
              <ProtectedRoute>
                <InteractionQualityAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <BillingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
