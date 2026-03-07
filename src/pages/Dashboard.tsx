import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Award, Clock } from "lucide-react";
import { MOCK_BIDS } from "@/constants";
import { getCurrentUser } from "@/lib/auth";

export default function Dashboard() {
  const user = getCurrentUser();
  const activeBids = MOCK_BIDS.filter((bid) => bid.status === "active");
  const avgWinProb = Math.round(
    activeBids.reduce((acc, bid) => acc + bid.winProbability, 0) / activeBids.length
  );
  const avgCompliance = Math.round(
    activeBids.reduce((acc, bid) => acc + bid.complianceScore, 0) / activeBids.length
  );
  const totalValue = activeBids.reduce((acc, bid) => acc + bid.value, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {user?.company} • {activeBids.length} active bids in pipeline
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-neon-green" />
                Active Bids
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-neon-green">{activeBids.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Total pipeline value: £{(totalValue / 1000000).toFixed(1)}M
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-neon-green" />
                Avg Win Probability
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-neon-green">{avgWinProb}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={avgWinProb} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-neon-green" />
                Avg Compliance Score
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-neon-green">{avgCompliance}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={avgCompliance} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-neon-green" />
                Next Deadline
              </CardDescription>
              <CardTitle className="text-2xl font-bold">
                {new Date(activeBids[0]?.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{activeBids[0]?.title}</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Bids Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Active Bid Pipeline</CardTitle>
            <CardDescription>Real-time AI-powered intelligence on your opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeBids.map((bid) => (
                <div
                  key={bid.id}
                  className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all duration-300 hover:card-glow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{bid.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{bid.authority}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-neon-green/30 text-neon-green">
                          £{(bid.value / 1000000).toFixed(1)}M
                        </Badge>
                        <Badge variant="outline">
                          Deadline: {new Date(bid.deadline).toLocaleDateString("en-GB")}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-6 lg:gap-8">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Win Probability</p>
                        <div
                          className={`text-2xl font-bold ${
                            bid.winProbability >= 80
                              ? "text-neon-green"
                              : bid.winProbability >= 60
                              ? "text-yellow-500"
                              : "text-orange-500"
                          }`}
                        >
                          {bid.winProbability}%
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Compliance</p>
                        <div
                          className={`text-2xl font-bold ${
                            bid.complianceScore >= 90
                              ? "text-neon-green"
                              : bid.complianceScore >= 80
                              ? "text-yellow-500"
                              : "text-orange-500"
                          }`}
                        >
                          {bid.complianceScore}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
