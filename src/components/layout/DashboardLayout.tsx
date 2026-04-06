import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Settings, LogOut, Zap, Menu, X, CreditCard, Target, Brain, TrendingUp, Users, Network, Clock, Radio, Gauge } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Document Processor", path: "/document-processor", icon: FileText },
    { name: "Competitor Intelligence", path: "/competitor-intelligence", icon: Target },
    { name: "SWOT Analysis", path: "/competitor-swot", icon: Brain },
    { name: "Win/Loss Analysis", path: "/win-loss-analysis", icon: TrendingUp },
    { name: "Team Performance", path: "/team-performance", icon: Users },
    { name: "Collaboration Network", path: "/collaboration-network", icon: Network },
    { name: "Collaboration Timeline", path: "/collaboration-timeline", icon: Clock },
    { name: "Live Tracker", path: "/live-collaboration-tracker", icon: Radio },
    { name: "Interaction Quality", path: "/interaction-quality", icon: Gauge },
    { name: "Billing", path: "/billing", icon: CreditCard },
  ];

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background bg-matrix-pattern">
      {/* Top Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/90">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-glow rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-bold text-gradient hidden sm:inline">BIDSMITH</span>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card/50 border-r border-border/50 backdrop-blur-sm transition-transform duration-300 mt-[57px] lg:mt-0`}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                        : "hover:bg-secondary/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
            <Link to="/billing">
              <Button variant="outline" className="w-full border-neon-green/30 hover:border-neon-green">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-57px)]">{children}</main>
      </div>
    </div>
  );
}
