import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, ArrowLeft } from "lucide-react";
import { PRICING_TIERS } from "@/constants";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background bg-matrix-pattern">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-glow rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-background" />
              </div>
              <span className="text-2xl font-bold text-gradient">BIDSMITH</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="hover:text-neon-green">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Choose Your <span className="text-gradient">Intelligence Tier</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Enterprise-grade bid intelligence for UK public sector teams. All plans include secure data handling and
              ISO 27001 compliance.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-secondary/50 rounded-lg p-1 border border-border/50">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-md transition-all ${
                  !isAnnual ? "bg-neon-green text-background font-semibold" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-md transition-all relative ${
                  isAnnual ? "bg-neon-green text-background font-semibold" : "text-muted-foreground"
                }`}
              >
                Annually
                <Badge className="absolute -top-2 -right-2 bg-neon-glow text-background text-xs">Save 17%</Badge>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <Card
                key={tier.id}
                className={`relative ${
                  tier.recommended
                    ? "bg-gradient-to-br from-card to-secondary border-neon-green/50 card-glow scale-105"
                    : "bg-card/50 border-border/50 hover:border-neon-green/30"
                } transition-all duration-300`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-neon-green text-background font-semibold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-sm mb-6">{tier.description}</CardDescription>

                  {tier.id !== "custom" ? (
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-neon-green">
                          £{isAnnual ? Math.round(tier.annualPrice / 12) : tier.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-sm text-muted-foreground mt-2">
                          £{tier.annualPrice} billed annually
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-neon-green mb-2">Custom</div>
                      <p className="text-sm text-muted-foreground">Contact for pricing</p>
                    </div>
                  )}

                  <Button
                    className={
                      tier.recommended
                        ? "w-full bg-neon-green hover:bg-neon-glow text-background font-semibold"
                        : "w-full border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10"
                    }
                    variant={tier.recommended ? "default" : "outline"}
                  >
                    {tier.id === "custom" ? "Contact Sales" : "Subscribe via Stripe"}
                  </Button>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-5 h-5 text-neon-green mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Section */}
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">Trusted by leading UK public sector suppliers</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-neon-green mr-2" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-neon-green mr-2" />
                GDPR Compliant
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-neon-green mr-2" />
                SOC 2 Type II
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-neon-green mr-2" />
                Cyber Essentials Plus
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
