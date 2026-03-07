import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
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
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  TrendingDown,
  Users,
  Video,
  FileEdit,
  Zap,
  Radio,
  Target,
  Brain,
  Sparkles,
} from "lucide-react";
import {
  MOCK_ACTIVE_BID_TRACKING,
  MOCK_TEAM_INTERACTIONS,
  MOCK_COMMUNICATION_METRICS,
  MOCK_CHEMISTRY_UPDATES,
  MOCK_EMERGING_PARTNERSHIPS,
  MOCK_DEVIATION_ALERTS,
  MOCK_LIVE_ACTIVITY,
} from "@/constants/liveTracking";

export default function LiveCollaborationTracker() {
  const [selectedBidId, setSelectedBidId] = useState("bid_001");
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedBid = MOCK_ACTIVE_BID_TRACKING.find((b) => b.bidId === selectedBidId);
  const bidInteractions = MOCK_TEAM_INTERACTIONS.filter((i) => i.bidId === selectedBidId);
  const bidMetrics = MOCK_COMMUNICATION_METRICS.filter((m) => m.bidId === selectedBidId);
  const bidChemistryUpdates = MOCK_CHEMISTRY_UPDATES.filter((c) => c.bidId === selectedBidId);
  const bidEmergingPartnerships = MOCK_EMERGING_PARTNERSHIPS.filter((e) => e.bidId === selectedBidId);
  const bidAlerts = MOCK_DEVIATION_ALERTS.filter((a) => a.bidId === selectedBidId && !a.acknowledged);
  const bidActivity = MOCK_LIVE_ACTIVITY.filter((a) => a.bidId === selectedBidId);

  const interactionTypeConfig = {
    email: { icon: Mail, color: "text-blue-500", label: "Email" },
    meeting: { icon: Video, color: "text-purple-500", label: "Meeting" },
    document_collab: { icon: FileEdit, color: "text-neon-green", label: "Document" },
    slack: { icon: MessageSquare, color: "text-yellow-500", label: "Slack" },
    call: { icon: Phone, color: "text-pink-500", label: "Call" },
  };

  const severityConfig = {
    critical: { bg: "bg-red-500/5", border: "border-red-500/30", text: "text-red-500", badge: "bg-red-500" },
    high: { bg: "bg-orange-500/5", border: "border-orange-500/30", text: "text-orange-500", badge: "bg-orange-500" },
    medium: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-500", badge: "bg-yellow-500" },
    low: { bg: "bg-blue-500/5", border: "border-blue-500/30", text: "text-blue-500", badge: "bg-blue-500" },
  };

  const totalAlerts = MOCK_DEVIATION_ALERTS.filter((a) => !a.acknowledged).length;
  const criticalAlerts = MOCK_DEVIATION_ALERTS.filter((a) => a.severity === "critical" && !a.acknowledged).length;

  // Create interaction heatmap data
  const interactionHeatmap = bidMetrics.map((m) => ({
    name: m.memberName.split(" ")[0],
    emails: m.emailsSent + m.emailsReceived,
    meetings: m.meetingHours * 4,
    documents: m.documentEdits,
    total: m.totalInteractions,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header with Live Indicator */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold">
                <span className="text-gradient">Live Collaboration</span> Tracker
              </h1>
              <div className="flex items-center space-x-2 px-3 py-1 bg-neon-green/10 border border-neon-green/30 rounded-full animate-pulse">
                <Radio className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">LIVE</span>
                <span className="text-xs text-muted-foreground">
                  {liveTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Real-time monitoring of team interactions, chemistry evolution, and configuration deviations
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Bell className="w-4 h-4 mr-2" />
            Configure Alerts ({totalAlerts})
          </Button>
        </div>

        {/* Alert Banner */}
        {criticalAlerts > 0 && (
          <Card className="bg-red-500/5 border-red-500/30 card-glow">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-red-500 mb-1">
                    {criticalAlerts} Critical Alert{criticalAlerts > 1 ? "s" : ""} Require Immediate Attention
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Team configurations deviate from optimal recommendations. Review alerts below.
                  </p>
                </div>
                <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics Dashboard */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">{MOCK_ACTIVE_BID_TRACKING.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Being tracked</p>
                </div>
                <Activity className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Chemistry Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">
                    {(MOCK_ACTIVE_BID_TRACKING.reduce((acc, b) => acc + b.currentChemistry, 0) / MOCK_ACTIVE_BID_TRACKING.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-neon-green mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.4% this week
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-orange-500/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-orange-500">{totalAlerts}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {criticalAlerts} critical
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Emerging Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neon-green">{MOCK_EMERGING_PARTNERSHIPS.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Detected</p>
                </div>
                <Users className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bid Selector */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Select Active Bid to Monitor</CardTitle>
            <CardDescription>Click a bid to view real-time collaboration metrics and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {MOCK_ACTIVE_BID_TRACKING.map((bid) => {
                const alerts = MOCK_DEVIATION_ALERTS.filter((a) => a.bidId === bid.bidId && !a.acknowledged);
                const isSelected = selectedBidId === bid.bidId;
                
                return (
                  <button
                    key={bid.bidId}
                    onClick={() => setSelectedBidId(bid.bidId)}
                    className={`p-5 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      isSelected
                        ? "border-neon-green bg-neon-green/10 card-glow"
                        : "border-border/50 bg-secondary/30 hover:border-neon-green/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{bid.bidTitle}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{bid.authority}</p>
                      </div>
                      {alerts.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {alerts.length} alert{alerts.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <p className="text-muted-foreground">Chemistry</p>
                        <p className="font-semibold text-neon-green">{bid.currentChemistry}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Config Match</p>
                        <p className={`font-semibold ${bid.configurationMatch >= 90 ? "text-neon-green" : "text-orange-500"}`}>
                          {bid.configurationMatch}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{bid.daysRemaining} days remaining</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedBid && (
          <>
            {/* Team Configuration Analysis */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Target className="w-6 h-6 mr-2 text-neon-green" />
                  Team Configuration Analysis - {selectedBid.bidTitle}
                </CardTitle>
                <CardDescription>
                  Current team vs optimal recommendation for {selectedBid.competitorName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Team */}
                  <div className="p-5 bg-secondary/30 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Current Team</h3>
                      <Badge
                        variant={selectedBid.configurationMatch >= 90 ? "default" : "destructive"}
                        className={selectedBid.configurationMatch >= 90 ? "bg-neon-green text-background" : ""}
                      >
                        {selectedBid.configurationMatch}% match
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                        <p className="font-semibold">{selectedBid.currentTeam.projectManager}</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Technical Lead</p>
                        <p className="font-semibold">{selectedBid.currentTeam.technicalLead}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        selectedBid.currentTeam.bidWriter !== selectedBid.optimalTeam.bidWriter
                          ? "bg-orange-500/5 border border-orange-500/30"
                          : "bg-background/50"
                      }`}>
                        <p className="text-xs text-muted-foreground mb-1">Bid Writer</p>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{selectedBid.currentTeam.bidWriter}</p>
                          {selectedBid.currentTeam.bidWriter !== selectedBid.optimalTeam.bidWriter && (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                      {selectedBid.currentTeam.pricingSpecialist && (
                        <div className="p-3 bg-background/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Pricing Specialist</p>
                          <p className="font-semibold">{selectedBid.currentTeam.pricingSpecialist}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 p-3 bg-neon-green/5 rounded-lg border border-neon-green/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-muted-foreground">Current Chemistry:</span>
                        <span className="text-lg font-bold text-neon-green">{selectedBid.currentChemistry}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Optimal Team */}
                  <div className="p-5 bg-neon-green/5 rounded-lg border border-neon-green/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-neon-green">Optimal Team</h3>
                      <Brain className="w-5 h-5 text-neon-green" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                        <p className="font-semibold">{selectedBid.optimalTeam.projectManager}</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Technical Lead</p>
                        <p className="font-semibold">{selectedBid.optimalTeam.technicalLead}</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Bid Writer</p>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{selectedBid.optimalTeam.bidWriter}</p>
                          {selectedBid.currentTeam.bidWriter !== selectedBid.optimalTeam.bidWriter && (
                            <CheckCircle2 className="w-4 h-4 text-neon-green" />
                          )}
                        </div>
                      </div>
                      {selectedBid.optimalTeam.pricingSpecialist && (
                        <div className="p-3 bg-background/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Pricing Specialist</p>
                          <p className="font-semibold">{selectedBid.optimalTeam.pricingSpecialist}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-muted-foreground">Predicted Chemistry:</span>
                        <span className="text-lg font-bold text-neon-green">{selectedBid.predictedChemistry}%</span>
                      </div>
                      <p className="text-xs text-neon-green mt-2">
                        +{(selectedBid.predictedChemistry - selectedBid.currentChemistry).toFixed(1)}% improvement potential
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deviation Alerts */}
            {bidAlerts.length > 0 && (
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-orange-500" />
                    Configuration Deviation Alerts ({bidAlerts.length})
                  </CardTitle>
                  <CardDescription>
                    Real-time alerts when team configurations deviate from optimal recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bidAlerts.map((alert) => {
                      const config = severityConfig[alert.severity];
                      
                      return (
                        <div
                          key={alert.id}
                          className={`p-5 rounded-lg border ${config.bg} ${config.border}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <AlertTriangle className={`w-5 h-5 ${config.text}`} />
                                <h3 className="font-bold text-lg">{alert.title}</h3>
                                <Badge className={`${config.badge} text-white`}>
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm mb-3">{alert.description}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-background/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                              <p className="font-semibold">{alert.currentValue}</p>
                            </div>
                            <div className="p-3 bg-neon-green/5 rounded-lg border border-neon-green/20">
                              <p className="text-xs text-neon-green mb-1">Expected Value</p>
                              <p className="font-semibold text-neon-green">{alert.expectedValue}</p>
                            </div>
                          </div>

                          <div className={`p-3 rounded-lg border ${config.border} bg-background/30`}>
                            <div className="flex items-start space-x-2">
                              <Zap className={`w-4 h-4 ${config.text} mt-0.5`} />
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">
                                  Recommended Action:
                                </p>
                                <p className="text-sm font-semibold">{alert.recommendation}</p>
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

            {/* Communication Metrics & Interaction Heatmap */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Team Communication Metrics</CardTitle>
                  <CardDescription>Real-time interaction frequency by team member</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={interactionHeatmap}>
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
                      <Bar dataKey="emails" fill="#60A5FA" name="Emails" stackId="a" />
                      <Bar dataKey="meetings" fill="#A78BFA" name="Meetings" stackId="a" />
                      <Bar dataKey="documents" fill="#4ADE80" name="Documents" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="mt-6 space-y-3">
                    {bidMetrics.map((metric) => (
                      <div
                        key={metric.memberId}
                        className="p-3 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{metric.memberName}</span>
                          <Badge variant="outline">{metric.totalInteractions} total</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3 text-blue-500" />
                            <span>{metric.emailsSent + metric.emailsReceived}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="w-3 h-3 text-purple-500" />
                            <span>{metric.meetingHours}h</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileEdit className="w-3 h-3 text-neon-green" />
                            <span>{metric.documentEdits}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chemistry Evolution */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Chemistry Score Updates</CardTitle>
                  <CardDescription>Automatic updates based on communication patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bidChemistryUpdates.map((update) => (
                      <div
                        key={update.id}
                        className={`p-4 rounded-lg border ${
                          update.impact === "positive"
                            ? "bg-neon-green/5 border-neon-green/30"
                            : update.impact === "negative"
                            ? "bg-orange-500/5 border-orange-500/30"
                            : "bg-blue-500/5 border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">
                              {update.member1Name.split(" ")[0]} + {update.member2Name.split(" ")[0]}
                            </span>
                            {update.impact === "positive" ? (
                              <TrendingUp className="w-4 h-4 text-neon-green" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground line-through">
                              {update.previousChemistry}
                            </span>
                            <span
                              className={`font-bold ${
                                update.impact === "positive" ? "text-neon-green" : "text-orange-500"
                              }`}
                            >
                              {update.currentChemistry}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{update.changeReason}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emerging Partnerships */}
            {bidEmergingPartnerships.length > 0 && (
              <Card className="bg-card/50 border-border/50 border-neon-green/30 card-glow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-neon-green" />
                    Emerging Partnerships Detected
                  </CardTitle>
                  <CardDescription>
                    AI-identified new team pairings with strong collaboration patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bidEmergingPartnerships.map((partnership) => (
                      <div
                        key={partnership.id}
                        className="p-5 bg-neon-green/5 rounded-lg border border-neon-green/30"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-bold text-lg">
                                {partnership.member1Name} ({partnership.role1}) +{" "}
                                {partnership.member2Name} ({partnership.role2})
                              </h3>
                              <Badge className="bg-neon-green text-background">
                                {partnership.emergingChemistry}% chemistry
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {partnership.collaborationPattern}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Interactions</p>
                            <p className="text-xl font-bold text-neon-green">
                              {partnership.interactionCount}
                            </p>
                          </div>
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                            <p className="text-xl font-bold">{partnership.confidence}%</p>
                          </div>
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Detected</p>
                            <p className="text-sm font-semibold">
                              {new Date(partnership.detectedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Live Activity Feed */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-neon-green" />
                  Live Activity Feed
                </CardTitle>
                <CardDescription>
                  Real-time stream of team interactions and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bidActivity.slice(0, 12).map((activity) => {
                    const Icon =
                      activity.activityType === "interaction"
                        ? Users
                        : activity.activityType === "chemistry_change"
                        ? Sparkles
                        : activity.activityType === "deviation"
                        ? AlertTriangle
                        : CheckCircle2;
                    
                    const impactColor =
                      activity.impact === "positive"
                        ? "text-neon-green"
                        : activity.impact === "negative"
                        ? "text-orange-500"
                        : "text-blue-500";

                    return (
                      <div
                        key={activity.id}
                        className="p-3 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all"
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-5 h-5 ${impactColor} mt-0.5`} />
                          <div className="flex-1">
                            <p className="text-sm mb-1">{activity.description}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(activity.timestamp).toLocaleString()}</span>
                              <span>•</span>
                              <span>{activity.participants.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Team Interactions */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Recent Team Interactions (Last 24h)</CardTitle>
                <CardDescription>
                  Detailed log of emails, meetings, calls, and collaborative sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bidInteractions.slice(0, 10).map((interaction) => {
                    const config = interactionTypeConfig[interaction.interactionType];
                    const Icon = config.icon;

                    return (
                      <div
                        key={interaction.id}
                        className="p-3 bg-secondary/30 rounded-lg border border-border/50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-4 h-4 ${config.color}`} />
                            <Badge variant="outline" className="text-xs">
                              {config.label}
                            </Badge>
                            <Badge
                              variant={
                                interaction.intensity === "high"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                interaction.intensity === "high"
                                  ? "bg-neon-green text-background"
                                  : ""
                              }
                            >
                              {interaction.intensity}
                            </Badge>
                          </div>
                          {interaction.duration && (
                            <span className="text-xs text-muted-foreground">
                              {interaction.duration} min
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 text-sm mb-1">
                          <span className="font-semibold">
                            {interaction.member1Name.split(" ")[0]}
                          </span>
                          <span className="text-muted-foreground">↔</span>
                          <span className="font-semibold">
                            {interaction.member2Name.split(" ")[0]}
                          </span>
                        </div>

                        {interaction.topic && (
                          <p className="text-xs text-muted-foreground mb-1">
                            {interaction.topic}
                          </p>
                        )}

                        <p className="text-xs text-muted-foreground">
                          {new Date(interaction.timestamp).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
