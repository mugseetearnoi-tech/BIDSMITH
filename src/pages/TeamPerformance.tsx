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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Users,
  Award,
  TrendingUp,
  Target,
  Brain,
  Star,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Zap,
} from "lucide-react";
import {
  MOCK_TEAM_MEMBERS,
  MOCK_TEAM_COMPOSITIONS,
  MOCK_HEAD_TO_HEAD,
  MOCK_TEAM_PERFORMANCE_BY_COMPETITOR,
  MOCK_OPTIMAL_TEAM_RECOMMENDATIONS,
  MOCK_TEAM_PERFORMANCE_TRENDS,
} from "@/constants";

export default function TeamPerformance() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("tm_001");

  const selectedMember = MOCK_TEAM_MEMBERS.find((m) => m.id === selectedMemberId);
  const memberPerformance = MOCK_TEAM_PERFORMANCE_BY_COMPETITOR.filter(
    (p) => p.teamMemberId === selectedMemberId
  );

  const topPerformer = MOCK_TEAM_MEMBERS.reduce((prev, current) =>
    prev.winRate > current.winRate ? prev : current
  );

  const roleColors: { [key: string]: string } = {
    "Project Manager": "#4ADE80",
    "Technical Lead": "#60A5FA",
    "Bid Writer": "#F472B6",
    "Subject Matter Expert": "#FBBF24",
    "Pricing Specialist": "#A78BFA",
  };

  // Calculate team composition success rates
  const teamCompositionStats = MOCK_TEAM_COMPOSITIONS.map((comp) => {
    const competition = MOCK_HEAD_TO_HEAD.find((h) => h.id === comp.competitionId);
    return {
      ...comp,
      outcome: competition?.outcome,
      competitorName: competition?.competitorName,
      score: competition?.yourScore,
    };
  });

  const winningTeamPattern = {
    pm: "Sarah Mitchell",
    tl: "James Chen",
    bw: "David Armstrong",
    wins: teamCompositionStats.filter(
      (t) =>
        t.projectManager === "Sarah Mitchell" &&
        t.technicalLead === "James Chen" &&
        t.bidWriter === "David Armstrong" &&
        t.outcome === "won"
    ).length,
    total: teamCompositionStats.filter(
      (t) =>
        t.projectManager === "Sarah Mitchell" &&
        t.technicalLead === "James Chen" &&
        t.bidWriter === "David Armstrong"
    ).length,
  };

  const memberTrends = MOCK_TEAM_PERFORMANCE_TRENDS.filter(
    (t) => t.teamMemberId === selectedMemberId
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Team Performance</span> Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Identify high-performing teams and optimal structures for winning against specific competitors
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Brain className="w-4 h-4 mr-2" />
            Generate Team Recommendations
          </Button>
        </div>

        {/* Key Team Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{topPerformer.name.split(" ")[0]}</p>
                  <p className="text-sm text-neon-green flex items-center mt-1">
                    <Trophy className="w-4 h-4 mr-1" />
                    {topPerformer.winRate}% win rate
                  </p>
                </div>
                <Star className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{MOCK_TEAM_MEMBERS.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Active contributors</p>
                </div>
                <Users className="w-8 h-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Winning Team Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-neon-green">
                    {winningTeamPattern.wins}/{winningTeamPattern.total}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">SM + JC + DA</p>
                </div>
                <Award className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Team Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {(
                      MOCK_TEAM_COMPOSITIONS.reduce((acc, t) => acc + t.teamSize, 0) /
                      MOCK_TEAM_COMPOSITIONS.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">People per bid</p>
                </div>
                <Target className="w-8 h-8 text-pink-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Team Member Performance */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Individual Team Member Performance</CardTitle>
            <CardDescription>
              Select a team member to view detailed performance metrics and competitor matchups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {MOCK_TEAM_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                    selectedMemberId === member.id
                      ? "border-neon-green bg-neon-green/10 card-glow"
                      : "border-border/50 bg-secondary/30 hover:border-neon-green/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm">{member.name}</h3>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: roleColors[member.role] }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-2xl font-bold ${
                        member.winRate >= 85
                          ? "text-neon-green"
                          : member.winRate >= 70
                          ? "text-blue-500"
                          : "text-orange-500"
                      }`}
                    >
                      {member.winRate.toFixed(0)}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({member.wins}-{member.losses})
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {selectedMember && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Member Details */}
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

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                        <p className="text-2xl font-bold text-neon-green">
                          {selectedMember.winRate.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Bids</p>
                        <p className="text-2xl font-bold">{selectedMember.totalBids}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Avg Score Impact</p>
                        <p className="text-2xl font-bold text-neon-green">
                          +{selectedMember.avgScoreContribution}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Experience</p>
                        <p className="text-2xl font-bold">{selectedMember.yearsExperience}yrs</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((exp, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Performance Trend */}
                  <div className="p-6 bg-secondary/30 rounded-lg border border-border/50">
                    <h4 className="font-semibold mb-4">Performance Trend</h4>
                    {memberTrends.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={memberTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                          <XAxis dataKey="month" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1a1a1a",
                              border: "1px solid #4ADE80",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="winRate"
                            stroke="#4ADE80"
                            strokeWidth={3}
                            dot={{ fill: "#4ADE80", r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        No trend data available
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance by Competitor */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">Performance by Competitor Matchup</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {memberPerformance.map((perf, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border ${
                          perf.winRate === 100
                            ? "bg-neon-green/5 border-neon-green/30"
                            : perf.winRate >= 50
                            ? "bg-blue-500/5 border-blue-500/30"
                            : "bg-orange-500/5 border-orange-500/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-sm">{perf.competitorName}</h5>
                          <Badge
                            variant={perf.winRate === 100 ? "default" : "secondary"}
                            className={perf.winRate === 100 ? "bg-neon-green text-background" : ""}
                          >
                            {perf.winRate.toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Bids</p>
                            <p className="font-semibold">{perf.appearances}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">W-L</p>
                            <p className="font-semibold">
                              {perf.wins}-{perf.losses}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Avg Impact</p>
                            <p
                              className={`font-semibold ${
                                perf.avgScoreContribution >= 8
                                  ? "text-neon-green"
                                  : "text-muted-foreground"
                              }`}
                            >
                              +{perf.avgScoreContribution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Composition Analysis */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Team Composition Success Analysis</CardTitle>
            <CardDescription>
              Historical performance by team structure and member combinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamCompositionStats.map((team, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-lg border ${
                    team.outcome === "won"
                      ? "bg-neon-green/5 border-neon-green/30"
                      : "bg-orange-500/5 border-orange-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold">
                          {
                            MOCK_HEAD_TO_HEAD.find((h) => h.id === team.competitionId)
                              ?.contractTitle
                          }
                        </h4>
                        <Badge
                          variant={team.outcome === "won" ? "default" : "destructive"}
                          className={team.outcome === "won" ? "bg-neon-green text-background" : ""}
                        >
                          {team.outcome === "won" ? "WON" : "LOST"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        vs {team.competitorName} • Score: {team.score}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Team Size</p>
                      <p className="text-2xl font-bold">{team.teamSize}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                      <p className="font-semibold text-sm">{team.projectManager}</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Technical Lead</p>
                      <p className="font-semibold text-sm">{team.technicalLead}</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Bid Writer</p>
                      <p className="font-semibold text-sm">{team.bidWriter}</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">SMEs</p>
                      <p className="font-semibold text-sm">
                        {team.subjectMatterExperts.length > 0
                          ? team.subjectMatterExperts.join(", ")
                          : "None"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optimal Team Recommendations */}
        <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Zap className="w-6 h-6 mr-2 text-neon-green" />
              AI-Powered Optimal Team Recommendations
            </CardTitle>
            <CardDescription>
              Data-driven team structures optimized for winning against specific competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_OPTIMAL_TEAM_RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.competitorId}
                  className="p-6 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">vs {rec.competitorName}</h3>
                        <Badge className="bg-neon-green text-background">
                          {rec.expectedWinRate}% expected win rate
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {rec.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-neon-green/5 rounded-lg border border-neon-green/20">
                      <p className="text-xs font-semibold text-neon-green mb-1 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Project Manager
                      </p>
                      <p className="font-bold">{rec.recommendedPM}</p>
                    </div>
                    <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <p className="text-xs font-semibold text-blue-500 mb-1 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Technical Lead
                      </p>
                      <p className="font-bold">{rec.recommendedTL}</p>
                    </div>
                    <div className="p-4 bg-pink-500/5 rounded-lg border border-pink-500/20">
                      <p className="text-xs font-semibold text-pink-500 mb-1 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Bid Writer
                      </p>
                      <p className="font-bold">{rec.recommendedBW}</p>
                    </div>
                    <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                      <p className="text-xs font-semibold text-yellow-500 mb-1 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        SMEs
                      </p>
                      <p className="font-bold text-sm">
                        {rec.recommendedSMEs.length > 0 ? rec.recommendedSMEs.join(", ") : "None"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-background/50 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-neon-green" />
                      Strategic Reasoning:
                    </p>
                    <ul className="space-y-2">
                      {rec.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className="text-neon-green mr-2 mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {rec.expectedWinRate < 50 && (
                    <div className="mt-4 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20 flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <p className="text-sm text-orange-500">
                        <strong>Warning:</strong> Low expected win rate. Consider partnership approach
                        or focus on alternative opportunities.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Performance Comparison */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Performance by Role</CardTitle>
            <CardDescription>Win rates and contribution scores across different team roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={MOCK_TEAM_MEMBERS.map((m) => ({
                  name: m.name.split(" ")[0],
                  winRate: m.winRate,
                  contribution: m.avgScoreContribution,
                  role: m.role,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #4ADE80",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="winRate" name="Win Rate (%)" fill="#4ADE80" />
                <Bar dataKey="contribution" name="Avg Score Contribution" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
