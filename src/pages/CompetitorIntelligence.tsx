import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  BarChart,
  Bar,
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
  Award,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Users,
  X,
} from "lucide-react";
import { useCompetitors } from "@/hooks/useData";
import { Tables } from "@/lib/supabase";
import { toast } from "sonner";

type Competitor = Tables["competitors"];

type CompetitorForm = {
  name: string;
  size: "SME" | "Large" | "Major";
  specialty: string;
  total_bids: string;
  wins: string;
  losses: string;
  average_bid_value: string;
  market_share: string;
};

const EMPTY_FORM: CompetitorForm = {
  name: "",
  size: "Large",
  specialty: "",
  total_bids: "",
  wins: "",
  losses: "",
  average_bid_value: "",
  market_share: "",
};

const COMPETITOR_COLORS = [
  "#4ADE80", "#60A5FA", "#F472B6", "#FBBF24", "#A78BFA", "#FB923C",
  "#34D399", "#38BDF8", "#E879F9", "#FCD34D",
];

export default function CompetitorIntelligence() {
  const { competitors, loading, addCompetitor, updateCompetitor, deleteCompetitor } = useCompetitors();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Competitor | null>(null);
  const [form, setForm] = useState<CompetitorForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const colorFor = (idx: number) => COMPETITOR_COLORS[idx % COMPETITOR_COLORS.length];

  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (comp: Competitor) => {
    setEditTarget(comp);
    setForm({
      name: comp.name,
      size: comp.size,
      specialty: comp.specialty.join(", "),
      total_bids: String(comp.total_bids),
      wins: String(comp.wins),
      losses: String(comp.losses),
      average_bid_value: String(comp.average_bid_value),
      market_share: String(comp.market_share),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Competitor name is required");
      return;
    }
    setSaving(true);

    const wins = Number(form.wins) || 0;
    const losses = Number(form.losses) || 0;
    const totalBids = Number(form.total_bids) || wins + losses;
    const winRate = totalBids > 0 ? Math.round((wins / totalBids) * 100) : 0;

    const payload = {
      name: form.name.trim(),
      size: form.size,
      specialty: form.specialty
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      total_bids: totalBids,
      wins,
      losses,
      win_rate: winRate,
      average_bid_value: Number(form.average_bid_value) || 0,
      market_share: Number(form.market_share) || 0,
    };

    let err;
    if (editTarget) {
      err = await updateCompetitor(editTarget.id, payload);
    } else {
      err = await addCompetitor(payload);
    }

    setSaving(false);
    if (err) {
      toast.error(err.message);
    } else {
      toast.success(editTarget ? "Competitor updated" : "Competitor added");
      setDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const err = await deleteCompetitor(deleteId);
    setDeleteId(null);
    if (err) toast.error(err.message);
    else toast.success("Competitor removed");
  };

  // ─── Derived stats ───────────────────────────────────────────────────────────

  const topCompetitor = competitors.length
    ? competitors.reduce((a, b) => (a.win_rate > b.win_rate ? a : b))
    : null;

  const totalTrackedBids = competitors.reduce((acc, c) => acc + c.total_bids, 0);

  const avgBidValue = competitors.length
    ? competitors.reduce((acc, c) => acc + c.average_bid_value, 0) / competitors.length
    : 0;

  // Chart data
  const barData = competitors.map((c) => ({
    name: c.name.split(" ")[0],
    "Win Rate (%)": c.win_rate,
    "Market Share (%)": c.market_share,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Competitor Intelligence</h1>
            <p className="text-muted-foreground text-lg">
              Track win rates, pricing strategies, and market positioning
            </p>
          </div>
          <Button
            onClick={openAdd}
            className="bg-neon-green hover:bg-neon-glow text-background font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Competitor
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Market Leader</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
                  ) : topCompetitor ? (
                    <>
                      <p className="text-2xl font-bold">{topCompetitor.name.split(" ")[0]}</p>
                      <p className="text-sm text-neon-green flex items-center mt-1">
                        <Award className="w-4 h-4 mr-1" />
                        {topCompetitor.win_rate}% win rate
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No data yet</p>
                  )}
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
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold">{totalTrackedBids}</p>
                      <p className="text-sm text-muted-foreground mt-1">Across all competitors</p>
                    </>
                  )}
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
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold">
                        {avgBidValue > 0 ? `£${(avgBidValue / 1_000_000).toFixed(1)}M` : "—"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Average across tracked</p>
                    </>
                  )}
                </div>
                <TrendingUp className="w-8 h-8 text-neon-green/50" />
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
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold">{competitors.length}</p>
                      <p className="text-sm text-muted-foreground mt-1">Active monitoring</p>
                    </>
                  )}
                </div>
                <ArrowUpRight className="w-8 h-8 text-pink-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Win Rate & Market Share Chart */}
        {competitors.length > 0 && (
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Win Rate vs Market Share</CardTitle>
              <CardDescription>Comparative performance across all tracked competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData}>
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
                  <Bar dataKey="Win Rate (%)" fill="#4ADE80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Market Share (%)" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Competitor Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Competitor Profiles</CardTitle>
                <CardDescription>Click edit to update any competitor's data</CardDescription>
              </div>
              <Button
                onClick={openAdd}
                variant="outline"
                size="sm"
                className="border-neon-green/30 hover:border-neon-green"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-neon-green" />
              </div>
            ) : competitors.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Users className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                <h3 className="text-xl font-semibold text-muted-foreground">No competitors tracked yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Add your first competitor to start building your intelligence database and track win rates, market share, and bid patterns.
                </p>
                <Button
                  onClick={openAdd}
                  className="bg-neon-green hover:bg-neon-glow text-background font-semibold mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Competitor
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Competitor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Size</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Bids</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Win Rate</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Avg Value</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Market Share</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Specialty</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp, idx) => (
                      <tr
                        key={comp.id}
                        className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: colorFor(idx) }}
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
                                : comp.size === "Large"
                                ? "border-blue-500/30 text-blue-500"
                                : "border-orange-500/30 text-orange-500"
                            }
                          >
                            {comp.size}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{comp.total_bids}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-neon-green">{comp.win_rate}%</span>
                            {comp.win_rate > 65 ? (
                              <TrendingUp className="w-4 h-4 text-neon-green" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {comp.average_bid_value > 0
                            ? `£${(comp.average_bid_value / 1_000_000).toFixed(1)}M`
                            : "—"}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-neon-green"
                                style={{ width: `${Math.min(comp.market_share * 5, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{comp.market_share}%</span>
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
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => openEdit(comp)}
                              className="w-8 h-8 hover:text-neon-green hover:bg-neon-green/10"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setDeleteId(comp.id)}
                              className="w-8 h-8 hover:text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Add / Edit Dialog ─────────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border/50 max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? "Edit Competitor" : "Add Competitor"}</DialogTitle>
            <DialogDescription>
              {editTarget
                ? "Update the competitor's profile data."
                : "Add a new competitor to your intelligence database."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="comp-name">Competitor Name *</Label>
              <Input
                id="comp-name"
                placeholder="e.g. Capita PLC"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-neon-green"
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label>Organisation Size</Label>
              <Select
                value={form.size}
                onValueChange={(v) => setForm({ ...form, size: v as "SME" | "Large" | "Major" })}
              >
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-neon-green">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  <SelectItem value="SME">SME</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specialty */}
            <div className="space-y-2">
              <Label htmlFor="comp-specialty">Specialties</Label>
              <Input
                id="comp-specialty"
                placeholder="e.g. IT Services, Digital Transformation, Cloud"
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-neon-green"
              />
              <p className="text-xs text-muted-foreground">Separate multiple specialties with commas</p>
            </div>

            {/* Wins / Losses */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="comp-wins">Wins</Label>
                <Input
                  id="comp-wins"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.wins}
                  onChange={(e) => setForm({ ...form, wins: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comp-losses">Losses</Label>
                <Input
                  id="comp-losses"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.losses}
                  onChange={(e) => setForm({ ...form, losses: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">
              Win rate is calculated automatically from wins ÷ (wins + losses)
            </p>

            {/* Avg Bid Value */}
            <div className="space-y-2">
              <Label htmlFor="comp-value">Average Bid Value (£)</Label>
              <Input
                id="comp-value"
                type="number"
                min="0"
                placeholder="e.g. 5000000"
                value={form.average_bid_value}
                onChange={(e) => setForm({ ...form, average_bid_value: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-neon-green"
              />
              <p className="text-xs text-muted-foreground">Enter the full value in pounds (e.g. 5000000 for £5M)</p>
            </div>

            {/* Market Share */}
            <div className="space-y-2">
              <Label htmlFor="comp-share">Market Share (%)</Label>
              <Input
                id="comp-share"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="e.g. 12.5"
                value={form.market_share}
                onChange={(e) => setForm({ ...form, market_share: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-neon-green"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border/50 hover:border-neon-green/30"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-neon-green hover:bg-neon-glow text-background font-semibold"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : editTarget ? (
                <Pencil className="w-4 h-4 mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {editTarget ? "Save Changes" : "Add Competitor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ───────────────────────────────────────────────── */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Competitor?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this competitor and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/50 hover:border-neon-green/30">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
