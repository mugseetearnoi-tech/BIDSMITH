import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileCheck, ShieldCheck, Zap, TrendingUp, Lock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background bg-matrix-pattern">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-glow rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-background" />
              </div>
              <span className="text-2xl font-bold text-gradient">BIDSMITH</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/pricing">
                <Button variant="ghost" className="hover:text-neon-green transition-colors">
                  Pricing
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 transition-all">
                  Login
                </Button>
              </Link>
              <Button className="bg-neon-green hover:bg-neon-glow text-background font-semibold">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBg} alt="AI Technology" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full">
              <span className="text-neon-green text-sm font-semibold">AI-Powered Bid Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The UK Public Sector
              <span className="block text-gradient glow-text">Bid Intelligence OS</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Predictive win scoring, automated PPN 06/20 compliance verification, and zero-hallucination document intelligence for serious bidders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-neon-green hover:bg-neon-glow text-background font-semibold text-lg px-8 py-6 card-glow">
                Request Demo
              </Button>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 text-lg px-8 py-6">
                  Login to Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Intelligence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for UK public sector procurement teams who demand precision, compliance, and competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card/50 border-border/50 hover:border-neon-green/50 transition-all duration-300 hover:card-glow group">
              <CardHeader>
                <div className="w-14 h-14 bg-neon-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                  <Brain className="w-8 h-8 text-neon-green" />
                </div>
                <CardTitle className="text-2xl">Predictive Scoring</CardTitle>
                <CardDescription className="text-base">
                  AI-powered win probability analysis trained on 10,000+ UK public sector contracts with 92% accuracy rate.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:border-neon-green/50 transition-all duration-300 hover:card-glow group">
              <CardHeader>
                <div className="w-14 h-14 bg-neon-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                  <FileCheck className="w-8 h-8 text-neon-green" />
                </div>
                <CardTitle className="text-2xl">Doccute PDF Pipeline</CardTitle>
                <CardDescription className="text-base">
                  Intelligent document chunking and extraction with zero hallucination guarantees. Process 500-page tenders in seconds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:border-neon-green/50 transition-all duration-300 hover:card-glow group">
              <CardHeader>
                <div className="w-14 h-14 bg-neon-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-neon-green" />
                </div>
                <CardTitle className="text-2xl">PPN 06/20 Compliance</CardTitle>
                <CardDescription className="text-base">
                  Automated verification against UK procurement policy notes. Never miss a compliance requirement again.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-neon-green" />
              </div>
              <div className="text-4xl font-bold text-neon-green mb-2">£2.4Bn+</div>
              <p className="text-muted-foreground">Contract Value Processed</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="w-12 h-12 text-neon-green" />
              </div>
              <div className="text-4xl font-bold text-neon-green mb-2">ISO 27001</div>
              <p className="text-muted-foreground">Enterprise Security Certified</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Brain className="w-12 h-12 text-neon-green" />
              </div>
              <div className="text-4xl font-bold text-neon-green mb-2">92%</div>
              <p className="text-muted-foreground">Win Prediction Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-card to-secondary border-neon-green/30 card-glow">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Bid Process?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join leading UK public sector suppliers using BIDSMITH to win more contracts with less effort.
              </p>
              <Button size="lg" className="bg-neon-green hover:bg-neon-glow text-background font-semibold text-lg px-10 py-6">
                Request Enterprise Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-glow rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-gradient">BIDSMITH</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 BIDSMITH. UK Public Sector Bid Intelligence OS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
