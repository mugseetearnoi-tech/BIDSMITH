import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Mail, Lock, KeyRound, ArrowRight, UserPlus } from "lucide-react";
import { authService, mapSupabaseUser, AuthUser } from "@/lib/auth";
import { toast } from "sonner";

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

type Mode = "login" | "register_email" | "register_otp" | "register_password";

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ─── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authService.signInWithPassword(email, password);
      onLogin(mapSupabaseUser(user));
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  // ─── Register: send OTP ──────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.sendOtp(email);
      toast.success("Verification code sent to " + email);
      setMode("register_otp");
    } catch (err: any) {
      toast.error(err.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  // ─── Register: verify OTP → set password ────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      toast.error("Enter the 4-digit code from your email");
      return;
    }
    setMode("register_password");
  };

  // ─── Register: complete account ──────────────────────────────────────────────
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const user = await authService.verifyOtpAndSetPassword(email, otp, password);
      onLogin(mapSupabaseUser(user));
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-matrix-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-glow rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-background" />
            </div>
            <span className="text-3xl font-bold text-gradient">BIDSMITH</span>
          </Link>
        </div>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          {/* Login form */}
          {mode === "login" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>Sign in to your bid intelligence dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-neon-green"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-neon-green"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-neon-green hover:bg-neon-glow text-background font-semibold"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-sm text-muted-foreground">
                    New to BIDSMITH?{" "}
                    <button
                      onClick={() => setMode("register_email")}
                      className="text-neon-green hover:text-neon-glow font-semibold"
                    >
                      Create an account
                    </button>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <Link to="/pricing" className="text-neon-green hover:text-neon-glow">
                      View pricing plans
                    </Link>
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {/* Register: email step */}
          {mode === "register_email" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>Enter your email to receive a verification code</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Work Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="your.email@company.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-neon-green"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-neon-green hover:bg-neon-glow text-background font-semibold"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    Send Verification Code
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setMode("login")}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Back to sign in
                  </button>
                </div>
              </CardContent>
            </>
          )}

          {/* Register: OTP step */}
          {mode === "register_otp" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Verify Email</CardTitle>
                <CardDescription>
                  Enter the 4-digit code sent to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 4-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="pl-10 bg-background/50 border-border/50 focus:border-neon-green text-center tracking-[0.5em] text-xl font-bold"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-neon-green hover:bg-neon-glow text-background font-semibold"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Verify Code
                  </Button>
                </form>
                <div className="mt-4 text-center space-y-2">
                  <button
                    onClick={handleSendOtp as unknown as React.MouseEventHandler}
                    className="text-sm text-neon-green hover:text-neon-glow"
                  >
                    Resend code
                  </button>
                  <br />
                  <button
                    onClick={() => setMode("register_email")}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Change email
                  </button>
                </div>
              </CardContent>
            </>
          )}

          {/* Register: set password */}
          {mode === "register_password" && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Set Password</CardTitle>
                <CardDescription>Create a secure password for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompleteRegistration} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-neon-green"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-neon-green hover:bg-neon-glow text-background font-semibold"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <UserPlus className="w-4 h-4 mr-2" />
                    )}
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
