import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Trophy,
  AlertCircle,
  Users,
  Sparkles,
  Target,
  Clock,
  Zap,
  RefreshCw,
  Award,
  CheckCircle2,
  XCircle,
  Shuffle,
} from "lucide-react";
import {
  MOCK_COLLABORATION_TIMELINE,
  MOCK_CRITICAL_MOMENTS,
  MOCK_FUTURE_FORECASTS,
  MOCK_TEAM_MEMBERS,
} from "@/constants";

export default function CollaborationTimeline() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);

  const eventTypeConfig = {
    team_formation: { icon: Users, color: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/30", label: "Team Formation" },
    chemistry_change: { icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/5", border: "border-purple-500/30", label: "Chemistry Change" },
    project_win: { icon: Trophy, color: "text-neon-green", bg: "bg-neon-green/5", border: "border-neon-green/30", label: "Project Win" },
    project_loss: { icon: XCircle, color: "text-orange-500", bg: "bg-orange-500/5", border: "border-orange-500/30", label: "Project Loss" },
    role_change: { icon: RefreshCw, color: "text-yellow-500", bg: "bg-yellow-500/5", border: "border-yellow-500/30", label: "Role Change" },
    new_hire: { icon: UserPlus, color: "text-pink-500", bg: "bg-pink-500/5", border: "border-pink-500/30", label: "New Hire" },
    achievement: { icon: Award, color: "text-neon-green", bg: "bg-neon-green/5", border: "border-neon-green/30", label: "Achievement" },
  };

  const momentTypeConfig = {
    new_hire: { icon: UserPlus, color: "text-pink-500" },
    role_change: { icon: RefreshCw, color: "text-yellow-500" },
    major_win: { icon: Trophy, color: "text-neon-green" },
    major_loss: { icon: AlertCircle, color: "text-orange-500" },
    team_restructure: { icon: Shuffle, color: "text-purple-500" },
    partnership_formed: { icon: Users, color: "text-blue-500" },
  };

  const filteredEvents = selectedFilter === "all" 
    ? MOCK_COLLABORATION_TIMELINE 
    : MOCK_COLLABORATION_TIMELINE.filter(e => e.eventType === selectedFilter);

  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Create chemistry timeline data
  const chemistryTimeline = MOCK_COLLABORATION_TIMELINE
    .filter(e => e.chemistryScore)
    .map(e => ({
      date: new Date(e.date).toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
      chemistry: e.chemistryScore,
      event: e.title,
    }));

  const selectedMomentData = selectedMoment 
    ? MOCK_CRITICAL_MOMENTS.find(m => m.id === selectedMoment)
    : null;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Collaboration Timeline</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Track team evolution, chemistry changes, critical moments, and forecast future collaboration opportunities
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Calendar className="w-4 h-4 mr-2" />
            Export Timeline Report
          </Button>
        </div>

        {/* Chemistry Evolution Chart */}
        <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
          <CardHeader>
            <CardTitle className="text-2xl">Team Chemistry Evolution Over Time</CardTitle>
            <CardDescription>
              Tracking chemistry score changes across projects and critical team events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chemistryTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #4ADE80",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === "chemistry") return [`${value}`, "Chemistry Score"];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="chemistry"
                  stroke="#4ADE80"
                  strokeWidth={3}
                  dot={{ fill: "#4ADE80", r: 6 }}
                  name="Chemistry Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Type Filter */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Filter Timeline Events</CardTitle>
            <CardDescription>Select event type to focus on specific aspects of team evolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className={selectedFilter === "all" ? "bg-neon-green hover:bg-neon-glow text-background" : ""}
              >
                All Events ({MOCK_COLLABORATION_TIMELINE.length})
              </Button>
              {Object.entries(eventTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                const count = MOCK_COLLABORATION_TIMELINE.filter(e => e.eventType === type).length;
                return (
                  <Button
                    key={type}
                    variant={selectedFilter === type ? "default" : "outline"}
                    onClick={() => setSelectedFilter(type)}
                    className={selectedFilter === type ? "bg-neon-green hover:bg-neon-glow text-background" : ""}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${config.color}`} />
                    {config.label} ({count})
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Events */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Clock className="w-6 h-6 mr-2 text-neon-green" />
              Historical Timeline - {sortedEvents.length} Events
            </CardTitle>
            <CardDescription>
              Chronological view of team collaborations, wins, losses, and key moments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/50" />

              <div className="space-y-6">
                {sortedEvents.map((event, idx) => {
                  const config = eventTypeConfig[event.eventType];
                  const Icon = config.icon;
                  const isPositive = event.impact === "positive";
                  const isNegative = event.impact === "negative";

                  return (
                    <div key={event.id} className="relative pl-16">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-3 w-6 h-6 rounded-full border-4 ${
                          isPositive
                            ? "bg-neon-green border-neon-green/30"
                            : isNegative
                            ? "bg-orange-500 border-orange-500/30"
                            : "bg-blue-500 border-blue-500/30"
                        } flex items-center justify-center`}
                      >
                        {isPositive && <TrendingUp className="w-3 h-3 text-background" />}
                        {isNegative && <TrendingDown className="w-3 h-3 text-background" />}
                      </div>

                      <div
                        className={`p-5 rounded-lg border ${config.bg} ${config.border} hover:border-neon-green/50 transition-all`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Icon className={`w-5 h-5 ${config.color}`} />
                              <h3 className="font-bold text-lg">{event.title}</h3>
                              <Badge variant="outline" className="capitalize">
                                {config.label}
                              </Badge>
                              {event.chemistryScore && (
                                <Badge className="bg-neon-green/10 text-neon-green border-neon-green/30">
                                  Chemistry: {event.chemistryScore}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {new Date(event.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-sm leading-relaxed mb-3">{event.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-semibold text-muted-foreground">Team:</span>
                          {event.participants.map((participant, pIdx) => (
                            <Badge key={pIdx} variant="secondary" className="text-xs">
                              {participant}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Moments */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Zap className="w-6 h-6 mr-2 text-neon-green" />
              Critical Moments - Turning Points in Team Evolution
            </CardTitle>
            <CardDescription>
              Major events that significantly shifted team dynamics, performance, and strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_CRITICAL_MOMENTS.map((moment) => {
                const config = momentTypeConfig[moment.momentType];
                const Icon = config.icon;
                const isSelected = selectedMoment === moment.id;

                return (
                  <div
                    key={moment.id}
                    onClick={() => setSelectedMoment(isSelected ? null : moment.id)}
                    className={`p-5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-neon-green/5 border-neon-green/30 card-glow"
                        : "bg-secondary/30 border-border/50 hover:border-neon-green/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className={`w-6 h-6 ${config.color}`} />
                        <Badge
                          variant={moment.impact === "high" ? "default" : "secondary"}
                          className={moment.impact === "high" ? "bg-neon-green text-background" : ""}
                        >
                          {moment.impact} impact
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(moment.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                      </p>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{moment.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{moment.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Before</p>
                        <p className="text-sm font-semibold">
                          Win: {moment.beforeMetrics.winRate}% | Chem: {moment.beforeMetrics.chemistry}
                        </p>
                      </div>
                      <div className="p-3 bg-neon-green/5 rounded-lg border border-neon-green/20">
                        <p className="text-xs text-neon-green mb-1">After</p>
                        <p className="text-sm font-semibold text-neon-green">
                          Win: {moment.afterMetrics.winRate}% | Chem: {moment.afterMetrics.chemistry}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Consequences:</p>
                        <ul className="space-y-1">
                          {moment.consequences.map((consequence, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <CheckCircle2 className="w-4 h-4 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
                              <span>{consequence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Future Forecasts */}
        <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Target className="w-6 h-6 mr-2 text-neon-green" />
              Future Collaboration Forecasts
            </CardTitle>
            <CardDescription>
              AI-predicted partnership opportunities based on historical patterns, chemistry analysis, and team dynamics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_FUTURE_FORECASTS.map((forecast) => (
                <div
                  key={forecast.id}
                  className="p-6 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">
                          {forecast.partnership.member1} + {forecast.partnership.member2}
                        </h3>
                        <Badge className="bg-neon-green/10 text-neon-green border-neon-green/30">
                          {forecast.projectedChemistry}% projected chemistry
                        </Badge>
                        <Badge variant="outline">{forecast.confidence}% confidence</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {forecast.partnership.role1} + {forecast.partnership.role2}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Recommended Start</p>
                      <p className="text-sm font-semibold text-neon-green">
                        {new Date(forecast.recommendedStartDate).toLocaleDateString("en-GB", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-background/50 rounded-lg mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">AI Reasoning:</p>
                    <ul className="space-y-2">
                      {forecast.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className="text-neon-green mr-2 mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-neon-green/5 rounded-lg border border-neon-green/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-neon-green" />
                        <p className="text-xs font-semibold text-neon-green">Expected Impact</p>
                      </div>
                      <p className="text-sm">{forecast.expectedImpact}</p>
                    </div>
                    <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <p className="text-xs font-semibold text-blue-500">Optimal Sectors</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {forecast.optimalSectors.map((sector, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {forecast.riskFactors.length > 0 && (
                    <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <p className="text-xs font-semibold text-orange-500">Risk Factors</p>
                      </div>
                      <ul className="space-y-1">
                        {forecast.riskFactors.map((risk, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span>{risk}</span>
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
