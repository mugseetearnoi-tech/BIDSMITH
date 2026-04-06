import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import { TrendingUp, Target, Award, Clock, Plus, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { useBids } from "@/hooks/useData";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type BidForm = {
  title: string;
  authority: string;
  deadline: string;
  value: string;
  win_probability: string;
  compliance_score: string;
  status: "active" | "submitted" | "won" | "lost";
};

const EMPTY_BID_FORM: BidForm = {
  title: "",
  authority: "",
  deadline: "",
  value: "",
  win_probability: "",
  compliance_score: "",
  status: "active",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { bids, loading, addBid } = useBids();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<BidForm>(EMPTY_BID_FORM);
  const [saving, setSaving] = useState(false);

  const handleAddBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.authority.trim() || !form.deadline) {
      toast.error("Title, authority, and deadline are required");
      return;
    }
    setSaving(true);
    const err = await addBid({
      title: form.title.trim(),
      authority: form.authority.trim(),
      deadline: new Date(form.deadline).toISOString(),
      value: Number(form.value) || 0,
      win_probability: Math.min(100, Math.max(0, Number(form.win_probability) || 0)),
      compliance_score: Math.min(100, Math.max(0, Number(form.compliance_score) || 0)),
      status: form.status,
    });
    setSaving(false);
    if (err) {
      toast.error(err.message);
    } else {
      toast.success("Bid added successfully");
      setForm(EMPTY_BID_FORM);
      setDialogOpen(false);
    }
  };

  const activeBids = bids.filter((b) => b.status === "active");
  const wonBids = bids.filter((b) => b.status === "won");
  const avgWinProb = activeBids.length
    ? Math.round(activeBids.reduce((acc, b) => acc + b.win_probability, 0) / activeBids.length)
    : 0;
  const avgCompliance = activeBids.length
    ? Math.round(activeBids.reduce((acc, b) => acc + b.compliance_score, 0) / activeBids.length)
    : 0;
  const totalValue = activeBids.reduce((acc, b) => acc + b.value, 0);

  const nextDeadline = activeBids
    .slice()
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="text-gradient">{user?.username}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {activeBids.length} active bid{activeBids.length !== 1 ? "s" : ""} in pipeline
              {totalValue > 0 && ` • £${(totalValue / 1_000_000).toFixed(1)}M total value`}
            </p>
          </div>
          <Button
            onClick={() => { setForm(EMPTY_BID_FORM); setDialogOpen(true); }}
            className="bg-neon-green hover:bg-neon-glow text-background font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Bid
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-neon-green" />
                Active Bids
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-neon-green">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : activeBids.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {totalValue > 0
                  ? `Pipeline value: £${(totalValue / 1_000_000).toFixed(1)}M`
                  : "Add bids to track pipeline value"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-neon-green" />
                Avg Win Probability
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-neon-green">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : `${avgWinProb}%`}
              </CardTitle>
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
              <CardTitle className="text-4xl font-bold text-neon-green">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : `${avgCompliance}%`}
              </CardTitle>
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
                {loading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : nextDeadline ? (
                  new Date(nextDeadline.deadline).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })
                ) : (
                  "—"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground truncate">
                {nextDeadline?.title ?? "No active bids"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bids pipeline OR empty state */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Active Bid Pipeline</CardTitle>
            <CardDescription>AI-powered intelligence on your live opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-neon-green" />
              </div>
            ) : activeBids.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                <h3 className="text-xl font-semibold text-muted-foreground">No active bids yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Add your first bid manually or upload a tender document to start tracking compliance scores and win probabilities.
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <Button
                    onClick={() => { setForm(EMPTY_BID_FORM); setDialogOpen(true); }}
                    className="bg-neon-green hover:bg-neon-glow text-background font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bid Manually
                  </Button>
                  <Link to="/document-processor">
                    <Button variant="outline" className="border-neon-green/30 hover:border-neon-green">
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
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
                          {bid.value > 0 && (
                            <Badge variant="outline" className="border-neon-green/30 text-neon-green">
                              £{(bid.value / 1_000_000).toFixed(1)}M
                            </Badge>
                          )}
                          <Badge variant="outline">
                            Deadline: {new Date(bid.deadline).toLocaleDateString("en-GB")}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              bid.status === "active"
                                ? "border-blue-500/30 text-blue-500"
                                : bid.status === "won"
                                ? "border-neon-green/30 text-neon-green"
                                : "border-orange-500/30 text-orange-500"
                            }
                          >
                            {bid.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-6 lg:gap-8">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Win Probability</p>
                          <div
                            className={`text-2xl font-bold ${
                              bid.win_probability >= 80
                                ? "text-neon-green"
                                : bid.win_probability >= 60
                                ? "text-yellow-500"
                                : "text-orange-500"
                            }`}
                          >
                            {bid.win_probability}%
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Compliance</p>
                          <div
                            className={`text-2xl font-bold ${
                              bid.compliance_score >= 90
                                ? "text-neon-green"
                                : bid.compliance_score >= 80
                                ? "text-yellow-500"
                                : "text-orange-500"
                            }`}
                          >
                            {bid.compliance_score}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Won bids summary */}
        {wonBids.length > 0 && (
          <Card className="bg-neon-green/5 border-neon-green/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-neon-green" />
                Won Bids — {wonBids.length} contract{wonBids.length !== 1 ? "s" : ""}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wonBids.slice(0, 3).map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-3 bg-neon-green/5 rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">{bid.title}</p>
                      <p className="text-xs text-muted-foreground">{bid.authority}</p>
                    </div>
                    {bid.value > 0 && (
                      <Badge className="bg-neon-green text-background">
                        £{(bid.value / 1_000_000).toFixed(1)}M
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* ── Add Bid Dialog ──────────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border/50 max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Bid</DialogTitle>
            <DialogDescription>
              Manually enter bid details to track in your pipeline.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddBid}>
            <div className="space-y-4 py-2">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="bid-title">Bid Title *</Label>
                <Input
                  id="bid-title"
                  placeholder="e.g. NHS Digital Transformation Programme"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                  required
                />
              </div>

              {/* Authority */}
              <div className="space-y-2">
                <Label htmlFor="bid-authority">Contracting Authority *</Label>
                <Input
                  id="bid-authority"
                  placeholder="e.g. NHS England"
                  value={form.authority}
                  onChange={(e) => setForm({ ...form, authority: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                  required
                />
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="bid-deadline">Submission Deadline *</Label>
                <Input
                  id="bid-deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                  required
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm({ ...form, status: v as BidForm["status"] })}
                >
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-neon-green">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <Label htmlFor="bid-value">Contract Value (£)</Label>
                <Input
                  id="bid-value"
                  type="number"
                  min="0"
                  placeholder="e.g. 5000000"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                />
                <p className="text-xs text-muted-foreground">Enter full value in pounds (e.g. 5000000 for £5M)</p>
              </div>

              {/* Win Probability + Compliance Score */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bid-win-prob">Win Probability (%)</Label>
                  <Input
                    id="bid-win-prob"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0–100"
                    value={form.win_probability}
                    onChange={(e) => setForm({ ...form, win_probability: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-neon-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bid-compliance">Compliance Score (%)</Label>
                  <Input
                    id="bid-compliance"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0–100"
                    value={form.compliance_score}
                    onChange={(e) => setForm({ ...form, compliance_score: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-neon-green"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-border/50 hover:border-neon-green/30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-neon-green hover:bg-neon-glow text-background font-semibold"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add Bid
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
