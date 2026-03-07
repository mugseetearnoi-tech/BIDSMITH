import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  Award,
  Filter,
  Brain,
  Zap,
} from "lucide-react";
import {
  MOCK_HEAD_TO_HEAD,
  MOCK_TACTIC_EFFECTIVENESS,
  MOCK_COMPETITOR_H2H,
  MOCK_WINLOSS_INSIGHTS,
} from "@/constants";

export default function WinLossAnalysis() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("all");

  const filteredCompetitions =
    selectedCompetitor === "all"
      ? MOCK_HEAD_TO_HEAD
      : MOCK_HEAD_TO_HEAD.filter((h2h) => h2h.competitorId === selectedCompetitor);

  const overallStats = {
    totalCompetitions: MOCK_HEAD_TO_HEAD.length,
    wins: MOCK_HEAD_TO_HEAD.filter((h) => h.outcome === "won").length,
    losses: MOCK_HEAD_TO_HEAD.filter((h) => h.outcome === "lost").length,
    winRate:
      (MOCK_HEAD_TO_HEAD.filter((h) => h.outcome === "won").length / MOCK_HEAD_TO_HEAD.length) * 100,
    totalValue: MOCK_HEAD_TO_HEAD.reduce((acc, h) => acc + h.contractValue, 0),
  };

  const tacticsChartData = MOCK_TACTIC_EFFECTIVENESS.map((t) => ({
    tactic: t.tactic,
    winRate: t.winRate,
    timesUsed: t.timesUsed,
    avgImprovement: t.avgScoreImprovement,
  }));

  const competitorColors: { [key: string]: string } = {
    comp_001: "#4ADE80",
    comp_002: "#60A5FA",
    comp_003: "#F472B6",
    comp_004: "#FBBF24",
    comp_005: "#A78BFA",
    comp_006: "#FB923C",
  };

  const getTrendIcon = (trend: "improving" | "declining" | "stable") => {
    if (trend === "improving") return <TrendingUp className="w-4 h-4 text-neon-green" />;
    if (trend === "declining") return <TrendingDown className="w-4 h-4 text-orange-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-blue-500" />;
  };

  const getInsightIcon = (category: string) => {
    if (category === "success_pattern") return CheckCircle2;
    if (category === "failure_pattern") return XCircle;
    if (category === "opportunity") return Lightbulb;
    return AlertCircle;
  };

  const getInsightColor = (category: string) => {
    if (category === "success_pattern") return { bg: "bg-neon-green/5", border: "border-neon-green/30", text: "text-neon-green" };
    if (category === "failure_pattern") return { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-500" };
    if (category === "opportunity") return { bg: "bg-blue-500/5", border: "border-blue-500/30", text: "text-blue-500" };
    return { bg: "bg-orange-500/5", border: "border-orange-500/30", text: "text-orange-500" };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Win/Loss</span> Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Head-to-head performance analysis with AI-powered insights on what works and what doesn't
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Filter className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
        </div>

        {/* Overall Performance Metrics */}
        <div className="grid md:grid-cols-5 gap-6">
          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Competitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{overallStats.totalCompetitions}</p>
                <Trophy className="w-8 h-8 text-neon-green/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 12 months</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Wins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-neon-green">{overallStats.wins}</p>
                <CheckCircle2 className="w-8 h-8 text-neon-green/50" />
              </div>
              <p className="text-xs text-neon-green mt-2">+{overallStats.wins} victories</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-orange-500/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Losses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-orange-500">{overallStats.losses}</p>
                <XCircle className="w-8 h-8 text-orange-500/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Learning opportunities</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-neon-green">{overallStats.winRate.toFixed(1)}%</p>
                <Award className="w-8 h-8 text-neon-green/50" />
              </div>
              <p className="text-xs text-neon-green mt-2">Above industry average</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">£{(overallStats.totalValue / 1000000).toFixed(1)}M</p>
                <Target className="w-8 h-8 text-blue-500/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Competed for</p>
            </CardContent>
          </Card>
        </div>

        {/* Head-to-Head by Competitor */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Head-to-Head Performance by Competitor</CardTitle>
            <CardDescription>Your win/loss record against each major competitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_COMPETITOR_H2H.map((h2h) => {
                const winPercentage = (h2h.wins / h2h.totalCompetitions) * 100;
                const lossPercentage = (h2h.losses / h2h.totalCompetitions) * 100;

                return (
                  <div
                    key={h2h.competitorId}
                    className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: competitorColors[h2h.competitorId] }}
                        />
                        <h3 className="font-bold text-lg">{h2h.competitorName}</h3>
                        <Badge
                          variant={h2h.winRate >= 50 ? "default" : "destructive"}
                          className={
                            h2h.winRate >= 50 ? "bg-neon-green text-background" : ""
                          }
                        >
                          {h2h.winRate.toFixed(0)}% win rate
                        </Badge>
                        {getTrendIcon(h2h.recentTrend)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setSelectedCompetitor(
                            selectedCompetitor === h2h.competitorId ? "all" : h2h.competitorId
                          )
                        }
                        className="text-neon-green hover:text-neon-glow"
                      >
                        View Details
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Competitions</p>
                        <p className="text-lg font-semibold">{h2h.totalCompetitions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Wins</p>
                        <p className="text-lg font-semibold text-neon-green">{h2h.wins}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Losses</p>
                        <p className="text-lg font-semibold text-orange-500">{h2h.losses}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Avg Margin</p>
                        <p
                          className={`text-lg font-semibold ${
                            h2h.avgMargin > 0 ? "text-neon-green" : "text-orange-500"
                          }`}
                        >
                          {h2h.avgMargin > 0 ? "+" : ""}
                          {h2h.avgMargin.toFixed(1)}pts
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                        <p className="text-lg font-semibold">£{(h2h.totalValue / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>

                    <div className="w-full h-4 bg-secondary rounded-full overflow-hidden flex">
                      <div
                        className="bg-neon-green h-full transition-all"
                        style={{ width: `${winPercentage}%` }}
                      />
                      <div
                        className="bg-orange-500 h-full transition-all"
                        style={{ width: `${lossPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tactics Effectiveness */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Tactics Effectiveness Analysis</CardTitle>
            <CardDescription>
              Win rates and scoring improvements by tactical approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={tacticsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="tactic" stroke="#9CA3AF" angle={-15} textAnchor="end" height={100} />
                <YAxis stroke="#9CA3AF" label={{ value: "Win Rate (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #4ADE80",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="winRate" name="Win Rate (%)">
                  {tacticsChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.winRate >= 75 ? "#4ADE80" : entry.winRate >= 50 ? "#60A5FA" : "#F97316"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {MOCK_TACTIC_EFFECTIVENESS.map((tactic) => (
                <div
                  key={tactic.tactic}
                  className={`p-4 rounded-lg border ${
                    tactic.winRate >= 75
                      ? "bg-neon-green/5 border-neon-green/30"
                      : tactic.winRate >= 50
                      ? "bg-blue-500/5 border-blue-500/30"
                      : "bg-orange-500/5 border-orange-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{tactic.tactic}</h3>
                    <Badge
                      variant={tactic.winRate >= 75 ? "default" : "secondary"}
                      className={tactic.winRate >= 75 ? "bg-neon-green text-background" : ""}
                    >
                      {tactic.winRate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Used</p>
                      <p className="font-semibold">{tactic.timesUsed}x</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">W/L</p>
                      <p className="font-semibold">
                        {tactic.wins}/{tactic.losses}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Impact</p>
                      <p
                        className={`font-semibold ${
                          tactic.avgScoreImprovement > 0 ? "text-neon-green" : "text-orange-500"
                        }`}
                      >
                        {tactic.avgScoreImprovement > 0 ? "+" : ""}
                        {tactic.avgScoreImprovement.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {tactic.bestAgainst.length > 0 && (
                      <p className="text-xs">
                        <span className="text-neon-green">✓ Best vs:</span>{" "}
                        {tactic.bestAgainst.join(", ")}
                      </p>
                    )}
                    {tactic.worstAgainst.length > 0 && (
                      <p className="text-xs">
                        <span className="text-orange-500">✗ Worst vs:</span>{" "}
                        {tactic.worstAgainst.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Insights */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Brain className="w-6 h-6 mr-2 text-neon-green" />
              AI-Powered Win/Loss Insights
            </CardTitle>
            <CardDescription>
              Machine learning analysis identifying success patterns, failure modes, and strategic opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_WINLOSS_INSIGHTS.map((insight) => {
                const Icon = getInsightIcon(insight.category);
                const colors = getInsightColor(insight.category);

                return (
                  <div
                    key={insight.id}
                    className={`p-5 rounded-lg border ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                        <h3 className="font-bold text-lg">{insight.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={insight.impact === "high" ? "default" : "secondary"}
                          className={insight.impact === "high" ? "bg-neon-green text-background" : ""}
                        >
                          {insight.impact} impact
                        </Badge>
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>

                    <p className="text-sm mb-3 leading-relaxed">{insight.insight}</p>

                    <div className="p-3 bg-background/50 rounded-lg mb-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        Supporting Data:
                      </p>
                      <p className="text-sm">{insight.supportingData}</p>
                    </div>

                    <div className={`p-3 rounded-lg border ${colors.border} bg-background/30`}>
                      <div className="flex items-start space-x-2">
                        <Zap className={`w-4 h-4 ${colors.text} mt-0.5`} />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Actionable Strategy:
                          </p>
                          <p className="text-sm font-semibold">{insight.actionable}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Competition History */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Detailed Competition History</CardTitle>
            <CardDescription>
              All head-to-head competitions with tactics, scores, and outcome analysis
              {selectedCompetitor !== "all" && " (filtered)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCompetitions.map((competition) => (
                <div
                  key={competition.id}
                  className={`p-5 rounded-lg border ${
                    competition.outcome === "won"
                      ? "bg-neon-green/5 border-neon-green/30"
                      : "bg-orange-500/5 border-orange-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-lg">{competition.contractTitle}</h3>
                        <Badge
                          variant={competition.outcome === "won" ? "default" : "destructive"}
                          className={
                            competition.outcome === "won" ? "bg-neon-green text-background" : ""
                          }
                        >
                          {competition.outcome === "won" ? "WON" : "LOST"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>• {competition.authority}</span>
                        <span>• {competition.sector}</span>
                        <span>• £{(competition.contractValue / 1000000).toFixed(1)}M</span>
                        <span>• {new Date(competition.bidDate).toLocaleDateString("en-GB")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Scores</p>
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Your Score</p>
                          <p className="text-2xl font-bold text-neon-green">
                            {competition.yourScore}
                          </p>
                        </div>
                        <div className="text-2xl text-muted-foreground">vs</div>
                        <div>
                          <p className="text-xs text-muted-foreground">{competition.competitorName}</p>
                          <p className="text-2xl font-bold text-orange-500">
                            {competition.competitorScore}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Margin</p>
                          <p
                            className={`text-xl font-bold ${
                              competition.yourScore > competition.competitorScore
                                ? "text-neon-green"
                                : "text-orange-500"
                            }`}
                          >
                            {competition.yourScore > competition.competitorScore ? "+" : ""}
                            {competition.yourScore - competition.competitorScore}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        Tactics Used
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {competition.tacticsUsed.map((tactic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tactic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {competition.outcome === "won" && competition.winningFactors && (
                    <div className="p-3 bg-neon-green/5 rounded-lg border border-neon-green/20">
                      <p className="text-xs font-semibold text-neon-green mb-2 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Why You Won:
                      </p>
                      <ul className="space-y-1">
                        {competition.winningFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <span className="text-neon-green mr-2">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {competition.outcome === "lost" && competition.losingFactors && (
                    <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                      <p className="text-xs font-semibold text-orange-500 mb-2 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        Why You Lost:
                      </p>
                      <ul className="space-y-1">
                        {competition.losingFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
