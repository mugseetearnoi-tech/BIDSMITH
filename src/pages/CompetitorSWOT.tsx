import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ZAxis,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Target,
  CheckCircle2,
  XCircle,
  Sparkles,
  Brain,
} from "lucide-react";
import { MOCK_COMPETITOR_SWOT, MOCK_AI_INSIGHTS, MOCK_STRATEGIC_RECOMMENDATIONS } from "@/constants";

export default function CompetitorSWOT() {
  const [selectedCompetitorId, setSelectedCompetitorId] = useState("comp_001");

  const selectedSWOT = MOCK_COMPETITOR_SWOT.find((s) => s.competitorId === selectedCompetitorId);
  const competitorInsights = MOCK_AI_INSIGHTS.filter((i) => i.competitorId === selectedCompetitorId);
  const competitorRecommendations = MOCK_STRATEGIC_RECOMMENDATIONS.filter(
    (r) => r.competitorId === selectedCompetitorId
  );

  const competitorColors: { [key: string]: string } = {
    comp_001: "#4ADE80",
    comp_002: "#60A5FA",
    comp_003: "#F472B6",
    comp_004: "#FBBF24",
    comp_005: "#A78BFA",
    comp_006: "#FB923C",
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-neon-green";
    if (score >= 65) return "text-blue-500";
    if (score >= 55) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 75) return { label: "Strong", variant: "default" as const };
    if (score >= 65) return { label: "Competitive", variant: "secondary" as const };
    if (score >= 55) return { label: "Moderate", variant: "outline" as const };
    return { label: "Vulnerable", variant: "destructive" as const };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">AI-Powered</span> SWOT Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Automated competitive analysis with strategic recommendations for winning against rivals
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Brain className="w-4 h-4 mr-2" />
            Generate New Insights
          </Button>
        </div>

        {/* Competitor Selector */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Select Competitor to Analyze</CardTitle>
            <CardDescription>Click a competitor to view detailed SWOT analysis and AI recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {MOCK_COMPETITOR_SWOT.map((swot) => {
                const scoreBadge = getScoreBadge(swot.overallScore);
                return (
                  <button
                    key={swot.competitorId}
                    onClick={() => setSelectedCompetitorId(swot.competitorId)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      selectedCompetitorId === swot.competitorId
                        ? "border-neon-green bg-neon-green/10 card-glow"
                        : "border-border/50 bg-secondary/30 hover:border-neon-green/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{swot.competitorName}</h3>
                      <Badge variant={scoreBadge.variant} className="ml-2">
                        {scoreBadge.label}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-3xl font-bold ${getScoreColor(swot.overallScore)}`}>
                        {swot.overallScore}
                      </span>
                      <span className="text-sm text-muted-foreground">/ 100</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Win Rate: {swot.marketPosition.y}% | Market Share: {swot.marketPosition.x}%
                    </p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Competitive Positioning Matrix */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Competitive Positioning Matrix</CardTitle>
            <CardDescription>
              Market share vs win rate analysis - bubble size represents overall competitive strength
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Market Share"
                  unit="%"
                  stroke="#9CA3AF"
                  label={{ value: "Market Share (%)", position: "bottom", offset: 0 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Win Rate"
                  unit="%"
                  stroke="#9CA3AF"
                  label={{ value: "Win Rate (%)", angle: -90, position: "insideLeft" }}
                />
                <ZAxis type="number" dataKey="z" range={[400, 1200]} name="Strength" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #4ADE80",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === "Strength") return [`${value}/100`, name];
                    return [`${value}%`, name];
                  }}
                />
                <Scatter
                  name="Competitors"
                  data={MOCK_COMPETITOR_SWOT.map((s) => ({
                    x: s.marketPosition.x,
                    y: s.marketPosition.y,
                    z: s.overallScore,
                    name: s.competitorName.split(" ")[0],
                  }))}
                >
                  {MOCK_COMPETITOR_SWOT.map((s) => (
                    <Cell
                      key={s.competitorId}
                      fill={competitorColors[s.competitorId]}
                      opacity={selectedCompetitorId === s.competitorId ? 1 : 0.4}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              {MOCK_COMPETITOR_SWOT.map((s) => (
                <div key={s.competitorId} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: competitorColors[s.competitorId] }}
                  />
                  <span className="text-xs text-muted-foreground">{s.competitorName.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedSWOT && (
          <>
            {/* SWOT Matrix */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-neon-green">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Strengths
                  </CardTitle>
                  <CardDescription>Competitive advantages and key capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedSWOT.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start space-x-3 p-3 bg-neon-green/5 rounded-lg border border-neon-green/20">
                        <TrendingUp className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card className="bg-card/50 border-border/50 hover:border-orange-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-orange-500">
                    <XCircle className="w-5 h-5 mr-2" />
                    Weaknesses
                  </CardTitle>
                  <CardDescription>Vulnerabilities and areas for exploitation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedSWOT.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start space-x-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                        <TrendingDown className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Opportunities */}
              <Card className="bg-card/50 border-border/50 hover:border-blue-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-blue-500">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Opportunities
                  </CardTitle>
                  <CardDescription>Market trends they can leverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedSWOT.opportunities.map((opportunity, idx) => (
                      <li key={idx} className="flex items-start space-x-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                        <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Threats */}
              <Card className="bg-card/50 border-border/50 hover:border-red-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-red-500">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Threats
                  </CardTitle>
                  <CardDescription>External risks and challenges they face</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedSWOT.threats.map((threat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* AI-Generated Insights */}
            {competitorInsights.length > 0 && (
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-neon-green" />
                    AI-Generated Insights
                  </CardTitle>
                  <CardDescription>
                    Machine learning analysis of historical data with confidence scoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competitorInsights.map((insight) => {
                      const categoryConfig = {
                        strength: { icon: CheckCircle2, color: "text-neon-green", bg: "bg-neon-green/5", border: "border-neon-green/30" },
                        weakness: { icon: XCircle, color: "text-orange-500", bg: "bg-orange-500/5", border: "border-orange-500/30" },
                        opportunity: { icon: Lightbulb, color: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/30" },
                        threat: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/5", border: "border-red-500/30" },
                      }[insight.category];
                      const Icon = categoryConfig.icon;

                      return (
                        <div
                          key={insight.id}
                          className={`p-4 rounded-lg border ${categoryConfig.bg} ${categoryConfig.border}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-5 h-5 ${categoryConfig.color}`} />
                              <Badge variant="outline" className="capitalize">
                                {insight.category}
                              </Badge>
                              <Badge
                                variant={insight.impact === "high" ? "default" : "secondary"}
                                className={insight.impact === "high" ? "bg-neon-green text-background" : ""}
                              >
                                {insight.impact} impact
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Confidence:</span>
                              <span className={`font-bold ${categoryConfig.color}`}>{insight.confidence}%</span>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed">{insight.insight}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Strategic Recommendations */}
            {competitorRecommendations.length > 0 && (
              <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Target className="w-6 h-6 mr-2 text-neon-green" />
                    Strategic Recommendations: How to Win Against {selectedSWOT.competitorName}
                  </CardTitle>
                  <CardDescription>
                    AI-powered tactical playbook with actionable strategies and expected outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {competitorRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-6 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-neon-green">{rec.title}</h3>
                              <Badge
                                variant={rec.priority === "high" ? "default" : "secondary"}
                                className={rec.priority === "high" ? "bg-neon-green text-background" : ""}
                              >
                                {rec.priority} priority
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{rec.description}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-neon-green" />
                            Recommended Tactics:
                          </h4>
                          <ul className="space-y-2">
                            {rec.tactics.map((tactic, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-sm">
                                <span className="text-neon-green font-bold mt-0.5">{idx + 1}.</span>
                                <span>{tactic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <div className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-neon-green mt-0.5" />
                            <div>
                              <span className="text-xs font-semibold text-muted-foreground">Expected Impact:</span>
                              <p className="text-sm text-neon-green font-semibold">{rec.expectedImpact}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
