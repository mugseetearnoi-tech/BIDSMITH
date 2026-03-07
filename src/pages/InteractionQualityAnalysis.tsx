
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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Gauge,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Brain,
  Target,
  Clock,
  Smile,
  Frown,
  Meh,
  Lightbulb,
  Award,
  Zap,
} from "lucide-react";
import {
  MOCK_INTERACTION_QUALITY_METRICS,
  MOCK_SENTIMENT_ANALYSIS,
  MOCK_WEIGHTED_CHEMISTRY_SCORES,
  MOCK_COACHING_RECOMMENDATIONS,
  MOCK_QUALITY_INDICATORS,
  MOCK_TEAM_MEMBERS,
} from "@/constants";

export default function InteractionQualityAnalysis() {
  const [selectedMemberId, setSelectedMemberId] = useState("tm_001");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const selectedMember = MOCK_TEAM_MEMBERS.find((m) => m.id === selectedMemberId);
  const memberQualityMetrics = MOCK_INTERACTION_QUALITY_METRICS.filter(
    (m) => m.memberId1 === selectedMemberId || m.memberId2 === selectedMemberId
  );
  const memberWeightedScores = MOCK_WEIGHTED_CHEMISTRY_SCORES.filter(
    (s) => s.memberId1 === selectedMemberId || s.memberId2 === selectedMemberId
  );
  const memberCoaching = MOCK_COACHING_RECOMMENDATIONS.filter(
    (c) => c.targetMemberId === selectedMemberId || c.partnerMemberId === selectedMemberId
  );
  const memberSentiment = MOCK_SENTIMENT_ANALYSIS.filter(
    (s) => s.memberId1 === selectedMemberId || s.memberId2 === selectedMemberId
  );

  const toneConfig = {
    enthusiastic: { icon: Smile, color: "text-neon-green", bg: "bg-neon-green/5" },
    collaborative: { icon: Smile, color: "text-green-500", bg: "bg-green-500/5" },
    professional: { icon: Meh, color: "text-blue-500", bg: "bg-blue-500/5" },
    supportive: { icon: Smile, color: "text-purple-500", bg: "bg-purple-500/5" },
    frustrated: { icon: Frown, color: "text-orange-500", bg: "bg-orange-500/5" },
    defensive: { icon: Frown, color: "text-red-500", bg: "bg-red-500/5" },
  };

  const priorityConfig = {
    critical: { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-500", badge: "bg-red-500" },
    high: { bg: "bg-orange-500/5", border: "border-orange-500/30", text: "text-orange-500", badge: "bg-orange-500" },
    medium: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-500", badge: "bg-yellow-500" },
    low: { bg: "bg-blue-500/5", border: "border-blue-500/30", text: "text-blue-500", badge: "bg-blue-500" },
  };

  const statusConfig = {
    exceeds: { color: "text-neon-green", icon: CheckCircle2 },
    meets: { color: "text-blue-500", icon: CheckCircle2 },
    below: { color: "text-orange-500", icon: AlertCircle },
    critical: { color: "text-red-500", icon: AlertCircle },
  };

  // Calculate quality vs frequency comparison
  const qualityVsFrequency = memberWeightedScores.map((score) => ({
    name: score.memberId2 === selectedMemberId ? score.memberName1 : score.memberName2,
    frequency: score.frequencyBasedScore,
    quality: score.qualityWeightedScore,
    delta: score.scoreDelta,
  }));

  // Calculate average metrics
  const avgQualityScore =
    memberQualityMetrics.reduce((acc, m) => acc + m.qualityScore, 0) /
    (memberQualityMetrics.length || 1);
  const avgSentimentScore =
    memberQualityMetrics.reduce((acc, m) => acc + m.sentimentScore, 0) /
    (memberQualityMetrics.length || 1);
  const avgResolutionSpeed =
    memberQualityMetrics.reduce((acc, m) => acc + m.avgResolutionSpeed, 0) /
    (memberQualityMetrics.length || 1);

  const filteredIndicators =
    selectedCategory === "all"
      ? MOCK_QUALITY_INDICATORS
      : MOCK_QUALITY_INDICATORS.filter((i) => i.category === selectedCategory);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "meeting_effectiveness", label: "Meeting Effectiveness" },
    { value: "email_quality", label: "Email Quality" },
    { value: "document_collaboration", label: "Document Collaboration" },
    { value: "responsiveness", label: "Responsiveness" },
    { value: "problem_solving", label: "Problem Solving" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Interaction Quality</span> Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Sentiment analysis, weighted chemistry scores, and personalized coaching for collaboration excellence
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Gauge className="w-4 h-4 mr-2" />
            Export Quality Report
          </Button>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">
                    {(
                      MOCK_INTERACTION_QUALITY_METRICS.reduce((acc, m) => acc + m.qualityScore, 0) /
                      MOCK_INTERACTION_QUALITY_METRICS.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
                </div>
                <Gauge className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Quality &gt; Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">
                    {
                      MOCK_WEIGHTED_CHEMISTRY_SCORES.filter((s) => s.scoreDelta > 0).length
                    }
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Partnerships improved</p>
                </div>
                <TrendingUp className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-orange-500/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Coaching Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-orange-500">
                    {
                      MOCK_COACHING_RECOMMENDATIONS.filter(
                        (r) => r.priority === "critical" || r.priority === "high"
                      ).length
                    }
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">High/Critical priority</p>
                </div>
                <Brain className="w-8 h-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Positive Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">
                    {(
                      (MOCK_SENTIMENT_ANALYSIS.filter((s) => s.sentimentType === "positive")
                        .length /
                        MOCK_SENTIMENT_ANALYSIS.length) *
                      100
                    ).toFixed(0)}
                    %
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Of interactions</p>
                </div>
                <Smile className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Member Selector */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Select Team Member for Quality Analysis</CardTitle>
            <CardDescription>
              View detailed quality metrics, sentiment analysis, and coaching recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {MOCK_TEAM_MEMBERS.map((member) => {
                const memberMetrics = MOCK_INTERACTION_QUALITY_METRICS.filter(
                  (m) => m.memberId1 === member.id || m.memberId2 === member.id
                );
                const avgQuality =
                  memberMetrics.reduce((acc, m) => acc + m.qualityScore, 0) /
                  (memberMetrics.length || 1);
                const isSelected = selectedMemberId === member.id;

                return (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMemberId(member.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      isSelected
                        ? "border-neon-green bg-neon-green/10 card-glow"
                        : "border-border/50 bg-secondary/30 hover:border-neon-green/30"
                    }`}
                  >
                    <h3 className="font-bold text-sm mb-1">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Quality:</span>
                      <span
                        className={`font-bold text-sm ${
                          avgQuality >= 90
                            ? "text-neon-green"
                            : avgQuality >= 75
                            ? "text-blue-500"
                            : avgQuality >= 60
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {avgQuality.toFixed(0)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedMember && (
          <>
            {/* Quality vs Frequency Comparison */}
            <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Target className="w-6 h-6 mr-2 text-neon-green" />
                  Quality vs Frequency Analysis - {selectedMember.name}
                </CardTitle>
                <CardDescription>
                  Comparing frequency-based chemistry scores with quality-weighted scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={qualityVsFrequency}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #4ADE80",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="frequency" fill="#60A5FA" name="Frequency-Based Score" />
                    <Bar dataKey="quality" fill="#4ADE80" name="Quality-Weighted Score" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-neon-green/5 rounded-lg border border-neon-green/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-neon-green" />
                      <p className="text-xs font-semibold text-neon-green">Quality Boost</p>
                    </div>
                    <p className="text-2xl font-bold text-neon-green">
                      {memberWeightedScores.filter((s) => s.scoreDelta > 0).length}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Partnerships improved by quality</p>
                  </div>

                  <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-orange-500" />
                      <p className="text-xs font-semibold text-orange-500">Quality Gap</p>
                    </div>
                    <p className="text-2xl font-bold text-orange-500">
                      {memberWeightedScores.filter((s) => s.scoreDelta < 0).length}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Partnerships hurt by low quality</p>
                  </div>

                  <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <p className="text-xs font-semibold text-blue-500">Exceptional Tier</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">
                      {memberWeightedScores.filter((s) => s.qualityTier === "exceptional").length}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Top quality partnerships</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Member Quality Metrics */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {selectedMember.name} - Partnership Quality Metrics
                </CardTitle>
                <CardDescription>
                  Detailed quality assessment for each collaboration partnership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberQualityMetrics.map((metric, idx) => {
                    const partner =
                      metric.memberId1 === selectedMemberId
                        ? { id: metric.memberId2, name: metric.memberName2 }
                        : { id: metric.memberId1, name: metric.memberName1 };
                    
                    const toneColor =
                      metric.communicationTone === "constructive"
                        ? "text-neon-green"
                        : metric.communicationTone === "professional"
                        ? "text-blue-500"
                        : metric.communicationTone === "neutral"
                        ? "text-yellow-500"
                        : "text-red-500";

                    return (
                      <div
                        key={idx}
                        className="p-5 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">Partnership with {partner.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="capitalize">
                                {metric.communicationTone}
                              </Badge>
                              <Badge className="bg-neon-green/10 text-neon-green border-neon-green/30">
                                Quality: {metric.qualityScore}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Collaboration Efficiency</p>
                            <p className="text-2xl font-bold text-neon-green">{metric.collaborationEfficiency}%</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Sentiment Score</p>
                            <p className="text-xl font-bold">{metric.sentimentScore}</p>
                          </div>
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Effectiveness</p>
                            <p className="text-xl font-bold">{metric.effectivenessRating}</p>
                          </div>
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Resolution Speed</p>
                            <p className="text-xl font-bold">{metric.avgResolutionSpeed.toFixed(1)} days</p>
                          </div>
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">High Quality %</p>
                            <p className="text-xl font-bold text-neon-green">
                              {((metric.highQualityInteractions / (metric.highQualityInteractions + metric.lowQualityInteractions)) * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-neon-green" />
                  Sentiment Analysis - Recent Interactions
                </CardTitle>
                <CardDescription>
                  AI-powered sentiment and tone analysis of team communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberSentiment.slice(0, 6).map((sentiment) => {
                    const config = toneConfig[sentiment.tone];
                    const Icon = config.icon;
                    const partner =
                      sentiment.memberId1 === selectedMemberId
                        ? sentiment.memberName2
                        : sentiment.memberName1;

                    return (
                      <div
                        key={sentiment.id}
                        className={`p-5 rounded-lg border ${config.bg} border-border/50`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <Icon className={`w-5 h-5 ${config.color}`} />
                            <h3 className="font-bold">
                              {sentiment.interactionType.replace("_", " ")} with {partner}
                            </h3>
                            <Badge variant="outline" className="capitalize">
                              {sentiment.tone}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(sentiment.timestamp).toLocaleDateString()}
                          </p>
                        </div>

                        <p className="text-sm mb-3">{sentiment.context}</p>

                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="p-2 bg-neon-green/5 rounded border border-neon-green/20">
                            <p className="text-xs text-muted-foreground">Positive</p>
                            <p className="text-lg font-bold text-neon-green">
                              {(sentiment.positiveScore * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                            <p className="text-xs text-muted-foreground">Neutral</p>
                            <p className="text-lg font-bold text-blue-500">
                              {(sentiment.neutralScore * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div className="p-2 bg-orange-500/5 rounded border border-orange-500/20">
                            <p className="text-xs text-muted-foreground">Negative</p>
                            <p className="text-lg font-bold text-orange-500">
                              {(sentiment.negativeScore * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-background/50 rounded-lg">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">
                            Key Phrases:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {sentiment.keyPhrases.map((phrase, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                "{phrase}"
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Coaching Recommendations */}
            {memberCoaching.length > 0 && (
              <Card className="bg-card/50 border-border/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-orange-500" />
                    Personalized Coaching Recommendations
                  </CardTitle>
                  <CardDescription>
                    AI-powered improvement strategies based on quality metrics and sentiment analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {memberCoaching.map((coaching) => {
                      const config = priorityConfig[coaching.priority];

                      return (
                        <div
                          key={coaching.id}
                          className={`p-6 rounded-lg border ${config.bg} ${config.border}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-bold text-lg">{coaching.recommendation}</h3>
                                <Badge className={`${config.badge} text-white`}>
                                  {coaching.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 capitalize">
                                Issue: {coaching.issueCategory.replace("_", " ")}
                              </p>
                              {coaching.partnerMemberName && (
                                <p className="text-sm">
                                  Partnership with: <strong>{coaching.partnerMemberName}</strong>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className={`p-4 rounded-lg border ${config.border} bg-background/30 mb-4`}>
                            <div className="flex items-start space-x-2">
                              <Sparkles className={`w-4 h-4 ${config.text} mt-0.5`} />
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">
                                  Expected Impact:
                                </p>
                                <p className="text-sm font-semibold">{coaching.expectedImpact}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-2">
                                Action Items:
                              </p>
                              <ul className="space-y-2">
                                {coaching.actionItems.map((item, idx) => (
                                  <li key={idx} className="flex items-start text-sm">
                                    <CheckCircle2 className={`w-4 h-4 ${config.text} mr-2 mt-0.5 flex-shrink-0`} />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                              <div className="p-3 bg-background/50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <p className="text-xs font-semibold text-muted-foreground">Timeframe</p>
                                </div>
                                <p className="text-sm font-semibold">{coaching.timeframe}</p>
                              </div>
                              <div className="p-3 bg-background/50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Target className="w-4 h-4 text-muted-foreground" />
                                  <p className="text-xs font-semibold text-muted-foreground">
                                    Success Metrics
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {coaching.successMetrics.map((metric, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {metric}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Quality Indicators */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Team Quality Benchmarks</CardTitle>
            <CardDescription>
              Key performance indicators across communication and collaboration categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={
                      selectedCategory === cat.value
                        ? "bg-neon-green hover:bg-neon-glow text-background"
                        : ""
                    }
                    size="sm"
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredIndicators.map((indicator, idx) => {
                const config = statusConfig[indicator.status];
                const StatusIcon = config.icon;
                const isAboveBenchmark = indicator.score >= indicator.benchmark;

                return (
                  <div
                    key={idx}
                    className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{indicator.metric}</h3>
                          <StatusIcon className={`w-4 h-4 ${config.color}`} />
                          <Badge variant="outline" className="capitalize">
                            {indicator.status}
                          </Badge>
                          <Badge
                            variant={
                              indicator.trend === "improving"
                                ? "default"
                                : indicator.trend === "declining"
                                ? "destructive"
                                : "secondary"
                            }
                            className={
                              indicator.trend === "improving"
                                ? "bg-neon-green/10 text-neon-green border-neon-green/30"
                                : ""
                            }
                          >
                            {indicator.trend}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-6 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Current Score</p>
                            <p className={`text-2xl font-bold ${config.color}`}>
                              {indicator.score}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Benchmark</p>
                            <p className="text-2xl font-bold text-blue-500">{indicator.benchmark}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Gap</p>
                            <p
                              className={`text-2xl font-bold ${
                                isAboveBenchmark ? "text-neon-green" : "text-orange-500"
                              }`}
                            >
                              {isAboveBenchmark ? "+" : ""}
                              {indicator.score - indicator.benchmark}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        {indicator.trend === "improving" ? (
                          <TrendingUp className="w-6 h-6 text-neon-green" />
                        ) : indicator.trend === "declining" ? (
                          <TrendingDown className="w-6 h-6 text-orange-500" />
                        ) : (
                          <Zap className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 bg-background/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isAboveBenchmark ? "bg-neon-green" : "bg-orange-500"
                        }`}
                        style={{ width: `${(indicator.score / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
