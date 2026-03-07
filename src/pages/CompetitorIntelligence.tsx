import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Target,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Building2,
  DollarSign,
  Award,
  Filter,
} from "lucide-react";
import {
  MOCK_COMPETITORS,
  MOCK_COMPETITOR_TRENDS,
  MOCK_PRICING_STRATEGIES,
  MOCK_TENDER_PATTERNS,
} from "@/constants";

export default function CompetitorIntelligence() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([
    "Capita PLC",
    "Fujitsu UK",
    "CGI IT UK",
    "BAE Systems",
  ]);

  const toggleCompetitor = (name: string) => {
    setSelectedCompetitors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const competitorColors: { [key: string]: string } = {
    "Capita PLC": "#4ADE80",
    "Fujitsu UK": "#60A5FA",
    "CGI IT UK": "#F472B6",
    "BAE Systems": "#FBBF24",
    "Sopra Steria": "#A78BFA",
    "Atos UK": "#FB923C",
  };

  const filteredTrends = MOCK_COMPETITOR_TRENDS.filter((trend) =>
    selectedCompetitors.includes(trend.competitor)
  );

  const topCompetitor = MOCK_COMPETITORS.reduce((prev, current) =>
    prev.winRate > current.winRate ? prev : current
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Competitor Intelligence</h1>
            <p className="text-muted-foreground text-lg">
              Track win rates, pricing strategies, and tender patterns across major UK public sector suppliers
            </p>
          </div>
          <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
            <Filter className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Market Leader</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{topCompetitor.name.split(" ")[0]}</p>
                  <p className="text-sm text-neon-green flex items-center mt-1">
                    <Award className="w-4 h-4 mr-1" />
                    {topCompetitor.winRate}% win rate
                  </p>
                </div>
                <Target className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tracked Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {MOCK_COMPETITORS.reduce((acc, comp) => acc + comp.totalBids, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Last 12 months</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Bid Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    £
                    {(
                      MOCK_COMPETITORS.reduce((acc, comp) => acc + comp.averageBidValue, 0) /
                      MOCK_COMPETITORS.length /
                      1000000
                    ).toFixed(1)}
                    M
                  </p>
                  <p className="text-sm text-neon-green flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% vs last year
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-neon-green/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-neon-green/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Competitors Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{MOCK_COMPETITORS.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Active monitoring</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-pink-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Filter */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Select Competitors to Compare</CardTitle>
            <CardDescription>Click to toggle competitors in the charts below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {MOCK_COMPETITORS.map((comp) => (
                <Button
                  key={comp.id}
                  variant={selectedCompetitors.includes(comp.name) ? "default" : "outline"}
                  onClick={() => toggleCompetitor(comp.name)}
                  className={
                    selectedCompetitors.includes(comp.name)
                      ? "bg-neon-green hover:bg-neon-glow text-background font-semibold"
                      : "border-border/50 hover:border-neon-green/50"
                  }
                >
                  {comp.name}
                  {selectedCompetitors.includes(comp.name) && (
                    <Badge className="ml-2 bg-background/20">{comp.winRate}%</Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Win Rate Trends Chart */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Historical Win Rate Trends</CardTitle>
            <CardDescription>6-month win rate performance comparison (Aug 2025 - Feb 2026)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" label={{ value: "Win Rate (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #4ADE80",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                {selectedCompetitors.map((comp) => (
                  <Line
                    key={comp}
                    type="monotone"
                    dataKey="winRate"
                    data={filteredTrends.filter((t) => t.competitor === comp)}
                    name={comp}
                    stroke={competitorColors[comp]}
                    strokeWidth={3}
                    dot={{ fill: competitorColors[comp], r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pricing Strategies */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Typical Pricing Strategies</CardTitle>
              <CardDescription>Average discount rates and profit margins by competitor</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={MOCK_PRICING_STRATEGIES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="competitor" stroke="#9CA3AF" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #4ADE80",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="avgDiscount" fill="#F472B6" name="Avg Discount (%)" />
                  <Bar dataKey="typicalMargin" fill="#4ADE80" name="Typical Margin (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sector Performance Radar */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Sector Success Rates</CardTitle>
              <CardDescription>Performance comparison across key public sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={MOCK_TENDER_PATTERNS.slice(0, 6)}>
                  <PolarGrid stroke="#4ADE80" opacity={0.2} />
                  <PolarAngleAxis dataKey="sector" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #4ADE80",
                      borderRadius: "8px",
                    }}
                  />
                  <Radar
                    name="Success Rate"
                    dataKey="successRate"
                    stroke="#4ADE80"
                    fill="#4ADE80"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Comparison Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Detailed Competitor Analysis</CardTitle>
            <CardDescription>Comprehensive performance metrics and market positioning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Competitor</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Size</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Total Bids</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Win Rate</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Avg Value</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Market Share
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Specialty</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_COMPETITORS.map((comp, idx) => (
                    <tr
                      key={comp.id}
                      className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: competitorColors[comp.name] || "#4ADE80" }}
                          />
                          <span className="font-semibold">{comp.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant="outline"
                          className={
                            comp.size === "Major"
                              ? "border-neon-green/30 text-neon-green"
                              : "border-blue-500/30 text-blue-500"
                          }
                        >
                          {comp.size}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{comp.totalBids}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-neon-green">{comp.winRate}%</span>
                          {comp.winRate > 65 ? (
                            <TrendingUp className="w-4 h-4 text-neon-green" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        £{(comp.averageBidValue / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-green"
                              style={{ width: `${(comp.marketShare / 20) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{comp.marketShare}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {comp.specialty.slice(0, 2).map((spec, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {comp.specialty.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{comp.specialty.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tender Pattern Analysis */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Tender Pattern Analysis</CardTitle>
            <CardDescription>Frequency and success rates by sector and competitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {MOCK_TENDER_PATTERNS.slice(0, 12).map((pattern, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm">{pattern.competitor}</p>
                      <p className="text-xs text-muted-foreground">{pattern.sector}</p>
                    </div>
                    <Badge className="bg-neon-green/10 text-neon-green border-neon-green/30">
                      {pattern.successRate}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-semibold">{pattern.frequency} bids</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Value</p>
                      <p className="font-semibold">£{(pattern.avgValue / 1000000).toFixed(1)}M</p>
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
