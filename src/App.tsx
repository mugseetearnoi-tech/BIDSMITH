import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-neon-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Loading BIDSMITH...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user, login } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
