import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { login } from "@/lib/auth";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      onLogin();
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background bg-matrix-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-glow rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-background" />
            </div>
            <span className="text-3xl font-bold text-gradient">BIDSMITH</span>
          </Link>
        </div>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Login to access your bid intelligence dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-neon-green"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-neon-green hover:bg-neon-glow text-background font-semibold"
              >
                Login to Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo credentials: any email + any password</p>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/pricing" className="text-neon-green hover:text-neon-glow font-semibold">
                  View Pricing
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
