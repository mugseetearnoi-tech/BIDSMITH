import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Network,
  Users2,
  AlertTriangle,
  TrendingUp,
  Zap,
  Link2,
  CheckCircle2,
  XCircle,
  Award,
  Brain,
  Target,
} from "lucide-react";
import {
  MOCK_TEAM_COLLABORATIONS,
  MOCK_COLLABORATION_PATTERNS,
  MOCK_NETWORK_METRICS,
  MOCK_OPTIMAL_CHEMISTRY,
  MOCK_TEAM_MEMBERS,
} from "@/constants";

export default function TeamCollaborationNetwork() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("tm_001");

  const selectedMember = MOCK_TEAM_MEMBERS.find((m) => m.id === selectedMemberId);
  const memberCollaborations = MOCK_TEAM_COLLABORATIONS.filter(
    (c) => c.memberId1 === selectedMemberId || c.memberId2 === selectedMemberId
  );
  const memberMetrics = MOCK_NETWORK_METRICS.find((m) => m.memberId === selectedMemberId);

  const roleColors: { [key: string]: string } = {
    "Project Manager": "#4ADE80",
    "Technical Lead": "#60A5FA",
    "Bid Writer": "#F472B6",
    "Subject Matter Expert": "#FBBF24",
    "Pricing Specialist": "#A78BFA",
  };

  const getChemistryColor = (chemistry: string) => {
    if (chemistry === "excellent") return { bg: "bg-neon-green/5", border: "border-neon-green/30", text: "text-neon-green" };
    if (chemistry === "good") return { bg: "bg-blue-500/5", border: "border-blue-500/30", text: "text-blue-500" };
    if (chemistry === "neutral") return { bg: "bg-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-500" };
    return { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-500" };
  };

  const getIsolationStatus = (score: number) => {
    if (score < 10) return { label: "Well Connected", color: "text-neon-green", icon: CheckCircle2 };
    if (score < 20) return { label: "Normal", color: "text-blue-500", icon: CheckCircle2 };
    if (score < 50) return { label: "Needs Integration", color: "text-orange-500", icon: AlertTriangle };
    return { label: "Isolated", color: "text-red-500", icon: XCircle };
  };

  // Create network visualization data
  const networkNodes = MOCK_NETWORK_METRICS.map((m) => ({
    x: m.centralityScore,
    y: m.collaborationQuality,
    z: m.totalConnections * 100,
    name: m.memberName.split(" ")[0],
    memberId: m.memberId,
    role: m.role,
    isolation: m.isolationScore,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Team Collaboration</span> Network
            </h1>
            <p className="text-muted-foreground text-lg">
              Graph analysis of team chemistry, collaboration patterns, and optimal pairings for competitive success
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Network className="w-4 h-4 mr-2" />
            Export Network Analysis
          </Button>
        </div>

        {/* Network Overview Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Strong Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">
                    {MOCK_NETWORK_METRICS.reduce((acc, m) => acc + m.strongConnections, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">100% win rate pairs</p>
                </div>
                <Link2 className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Collaboration Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{MOCK_COLLABORATION_PATTERNS.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Identified patterns</p>
                </div>
                <Users2 className="w-8 h-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-orange-500/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Isolated Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-orange-500">
                    {MOCK_NETWORK_METRICS.filter((m) => m.isolationScore > 20).length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Need integration</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Collaboration Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">
                    {(
                      MOCK_NETWORK_METRICS.reduce((acc, m) => acc + m.collaborationQuality, 0) /
                      MOCK_NETWORK_METRICS.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
                </div>
                <Award className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Visualization */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Team Collaboration Network Graph</CardTitle>
            <CardDescription>
              Centrality (x-axis) vs Collaboration Quality (y-axis) - Bubble size represents connection count
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={450}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Network Centrality"
                  stroke="#9CA3AF"
                  label={{ value: "Network Centrality Score", position: "bottom", offset: 0 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Collaboration Quality"
                  stroke="#9CA3AF"
                  label={{ value: "Collaboration Quality", angle: -90, position: "insideLeft" }}
                  domain={[75, 95]}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #4ADE80",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === "Connections") return [value, name];
                    return [`${value}`, name];
                  }}
                />
                <Scatter
                  name="Team Members"
                  data={networkNodes}
                  onClick={(data) => setSelectedMemberId(data.memberId)}
                >
                  {networkNodes.map((node) => (
                    <Cell
                      key={node.memberId}
                      fill={roleColors[node.role] || "#4ADE80"}
                      opacity={selectedMemberId === node.memberId ? 1 : 0.6}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_NETWORK_METRICS.map((m) => {
                const status = getIsolationStatus(m.isolationScore);
                const StatusIcon = status.icon;
                return (
                  <button
                    key={m.memberId}
                    onClick={() => setSelectedMemberId(m.memberId)}
                    className={`p-3 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      selectedMemberId === m.memberId
                        ? "border-neon-green bg-neon-green/10 card-glow"
                        : "border-border/50 bg-secondary/30 hover:border-neon-green/30"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: roleColors[m.role] }}
                      />
                      <h4 className="font-bold text-sm">{m.memberName.split(" ")[0]}</h4>
                      <StatusIcon className={`w-3 h-3 ${status.color}`} />
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="text-muted-foreground">Centrality: {m.centralityScore}</p>
                      <p className="text-muted-foreground">Connections: {m.totalConnections}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Member Details & Collaborations */}
        {selectedMember && memberMetrics && (
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">
                {selectedMember.name} - Collaboration Analysis
              </CardTitle>
              <CardDescription>
                Network metrics, connection quality, and partnership effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Member Network Metrics */}
                <div className="p-6 bg-secondary/30 rounded-lg border border-neon-green/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: roleColors[selectedMember.role] + "20" }}
                    >
                      {selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Connections</p>
                      <p className="text-2xl font-bold">{memberMetrics.totalConnections}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Strong Connections</p>
                      <p className="text-2xl font-bold text-neon-green">
                        {memberMetrics.strongConnections}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Centrality Score</p>
                      <p
                        className={`text-2xl font-bold ${
                          memberMetrics.centralityScore >= 80
                            ? "text-neon-green"
                            : memberMetrics.centralityScore >= 60
                            ? "text-blue-500"
                            : "text-orange-500"
                        }`}
                      >
                        {memberMetrics.centralityScore}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Isolation Score</p>
                      <p
                        className={`text-2xl font-bold ${
                          memberMetrics.isolationScore < 10
                            ? "text-neon-green"
                            : memberMetrics.isolationScore < 20
                            ? "text-blue-500"
                            : memberMetrics.isolationScore < 50
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {memberMetrics.isolationScore}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Collaboration Quality:
                      </span>
                      <span className="text-lg font-bold text-neon-green">
                        {memberMetrics.collaborationQuality}%
                      </span>
                    </div>
                  </div>

                  {memberMetrics.isolationScore > 20 && (
                    <div className="mt-4 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <p className="text-sm text-orange-500">
                        <strong>Integration Needed:</strong> Consider pairing with high-centrality
                        team members to improve network connectivity.
                      </p>
                    </div>
                  )}
                </div>

                {/* Collaboration Quality Breakdown */}
                <div className="p-6 bg-secondary/30 rounded-lg border border-border/50">
                  <h4 className="font-semibold text-lg mb-4">Collaboration Partnerships</h4>
                  <div className="space-y-3">
                    {memberCollaborations.map((collab, idx) => {
                      const partner =
                        collab.memberId1 === selectedMemberId
                          ? { name: collab.memberName2, role: collab.role2 }
                          : { name: collab.memberName1, role: collab.role1 };
                      const colors = getChemistryColor(collab.chemistry);

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${colors.bg} ${colors.border}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="font-semibold text-sm">{partner.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {partner.role}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground capitalize">
                                {collab.chemistry} chemistry
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${colors.text}`}>
                                {collab.winRate.toFixed(0)}%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {collab.wins}-{collab.losses}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">Collaborations</p>
                              <p className="font-semibold">{collab.collaborations}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Avg Score</p>
                              <p className="font-semibold text-neon-green">
                                {collab.avgCombinedScore}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Collaboration Patterns */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">
              Winning Collaboration Patterns
            </CardTitle>
            <CardDescription>
              Identified team pairings that correlate with wins and high-scoring outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_COLLABORATION_PATTERNS.map((pattern) => {
                const impactColors = {
                  high: { bg: "bg-neon-green/5", border: "border-neon-green/30", text: "text-neon-green" },
                  medium: { bg: "bg-blue-500/5", border: "border-blue-500/30", text: "text-blue-500" },
                  low: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-500" },
                };
                const colors = pattern.winRate === 0 
                  ? { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-500" }
                  : impactColors[pattern.impact];

                return (
                  <div
                    key={pattern.id}
                    className={`p-5 rounded-lg border ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold">{pattern.pattern}</h3>
                          <Badge
                            variant={pattern.winRate >= 80 ? "default" : pattern.winRate >= 50 ? "secondary" : "destructive"}
                            className={
                              pattern.winRate >= 80 ? "bg-neon-green text-background" : ""
                            }
                          >
                            {pattern.winRate.toFixed(0)}% win rate
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {pattern.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">{pattern.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Frequency</p>
                        <p className="text-xl font-bold">{pattern.frequency}</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                        <p className={`text-xl font-bold ${colors.text}`}>
                          {pattern.winRate.toFixed(0)}%
                        </p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Avg Margin</p>
                        <p
                          className={`text-xl font-bold ${
                            pattern.avgMargin > 0 ? "text-neon-green" : "text-red-500"
                          }`}
                        >
                          {pattern.avgMargin > 0 ? "+" : ""}
                          {pattern.avgMargin.toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        Example Wins:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pattern.examples.map((example, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {pattern.winRate === 0 && (
                      <div className="mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/20 flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <p className="text-sm text-red-500">
                          <strong>Critical Issue:</strong> This pattern shows 0% win rate across all
                          competitions. Immediate coaching or team restructuring recommended.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Optimal Chemistry by Competitor */}
        <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Zap className="w-6 h-6 mr-2 text-neon-green" />
              AI-Powered Optimal Team Chemistry
            </CardTitle>
            <CardDescription>
              Recommended team pairings optimized for winning against specific competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_OPTIMAL_CHEMISTRY.map((chemistry) => (
                <div
                  key={chemistry.competitorId}
                  className="p-6 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">vs {chemistry.competitorName}</h3>
                        <Badge className="bg-neon-green text-background">
                          {chemistry.expectedSynergy}% expected synergy
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {chemistry.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {chemistry.recommendedPairs.map((pair, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-neon-green/5 rounded-lg border border-neon-green/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-neon-green" />
                            <span className="font-bold">
                              {pair.member1} ({pair.role1}) + {pair.member2} ({pair.role2})
                            </span>
                          </div>
                          <Target className="w-4 h-4 text-neon-green" />
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{pair.synergy}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-background/50 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-neon-green" />
                      Strategic Chemistry Reasoning:
                    </p>
                    <ul className="space-y-2">
                      {chemistry.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className="text-neon-green mr-2 mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {chemistry.expectedSynergy < 50 && (
                    <div className="mt-4 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <p className="text-sm text-orange-500">
                        <strong>Warning:</strong> Low expected synergy. Consider partnership approach
                        or alternative opportunities instead of direct competition.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Network Health Summary */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Team Network Health Summary</CardTitle>
            <CardDescription>
              Overall collaboration effectiveness and integration recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-neon-green/5 rounded-lg border border-neon-green/30">
                <TrendingUp className="w-8 h-8 text-neon-green mb-3" />
                <h4 className="font-semibold mb-2">Strengths</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">•</span>
                    <span>
                      {MOCK_NETWORK_METRICS.filter((m) => m.strongConnections >= 3).length} team
                      members with 3+ strong connections
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">•</span>
                    <span>
                      {
                        MOCK_COLLABORATION_PATTERNS.filter(
                          (p) => p.winRate === 100 && p.frequency >= 3
                        ).length
                      }{" "}
                      proven winning patterns (100% win rate)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">•</span>
                    <span>
                      Average collaboration quality of{" "}
                      {(
                        MOCK_NETWORK_METRICS.reduce((acc, m) => acc + m.collaborationQuality, 0) /
                        MOCK_NETWORK_METRICS.length
                      ).toFixed(1)}
                      %
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-orange-500/5 rounded-lg border border-orange-500/30">
                <AlertTriangle className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                <ul className="space-y-2 text-sm">
                  {MOCK_NETWORK_METRICS.filter((m) => m.isolationScore > 20).map((m) => (
                    <li key={m.memberId} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>
                        {m.memberName} needs better integration (isolation score: {m.isolationScore}
                        )
                      </span>
                    </li>
                  ))}
                  {MOCK_COLLABORATION_PATTERNS.filter((p) => p.winRate === 0).map((p) => (
                    <li key={p.id} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>{p.pattern} shows 0% win rate - urgent attention needed</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-blue-500/5 rounded-lg border border-blue-500/30">
                <Brain className="w-8 h-8 text-blue-500 mb-3" />
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Pair isolated members with high-centrality team members for knowledge transfer
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Leverage {MOCK_COLLABORATION_PATTERNS.filter((p) => p.winRate === 100).length}{" "}
                      perfect-chemistry patterns in upcoming bids
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Provide coaching for low-performing pairings or consider role reassignment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
