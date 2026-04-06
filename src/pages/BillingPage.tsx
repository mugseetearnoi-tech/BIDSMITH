import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { PRICING_TIERS } from "@/constants";
import { useInvoices } from "@/hooks/useData";
import { useAuth } from "@/contexts/AuthContext";

export default function BillingPage() {
  const { user } = useAuth();
  const { invoices, loading } = useInvoices();

  // Default to enterprise plan for display purposes
  const currentPlan = PRICING_TIERS.find((tier) => tier.id === "enterprise") ?? PRICING_TIERS[1];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground text-lg">Manage your plan, payment methods, and invoices</p>
        </div>

        {/* Current Plan */}
        <Card className="bg-gradient-to-br from-card to-secondary/30 border-neon-green/30 card-glow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Current Plan: {currentPlan?.name}</CardTitle>
                <CardDescription className="text-base">{currentPlan?.description}</CardDescription>
              </div>
              <Badge className="bg-neon-green text-background font-semibold">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Monthly Cost</p>
                <p className="text-3xl font-bold text-neon-green">
                  £{currentPlan?.monthlyPrice.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
                <p className="text-2xl font-semibold">Monthly</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Account</p>
                <p className="text-lg font-semibold flex items-center truncate">
                  <CreditCard className="w-5 h-5 mr-2 text-neon-green flex-shrink-0" />
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
                Upgrade Plan
              </Button>
              <Button variant="outline" className="border-neon-green/30 hover:border-neon-green">
                Switch to Annual (Save 17%)
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Payment Method</CardTitle>
            <CardDescription>Manage your payment methods for subscription billing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">No payment method on file</p>
                  <p className="text-sm text-muted-foreground">Add a card to enable billing</p>
                </div>
              </div>
              <Button variant="outline" className="border-neon-green/30 hover:border-neon-green">
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Your Plan Includes</CardTitle>
            <CardDescription>All features available in your {currentPlan?.name} subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {currentPlan?.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Recent Invoices</CardTitle>
            <CardDescription>Download your billing statements and payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-neon-green" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground">No invoices yet</p>
                <p className="text-sm text-muted-foreground">
                  Invoices will appear here once your subscription is active
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-neon-green" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Invoice #{invoice.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.invoice_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">£{invoice.amount.toLocaleString()}</p>
                        <Badge
                          variant="outline"
                          className={
                            invoice.status === "paid"
                              ? "border-neon-green/30 text-neon-green"
                              : invoice.status === "failed"
                              ? "border-red-500/30 text-red-500"
                              : "border-orange-500/30 text-orange-500"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      {invoice.download_url && (
                        <a href={invoice.download_url} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="ghost" className="hover:text-neon-green">
                            <Download className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
