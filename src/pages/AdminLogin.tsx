import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Lock, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication (replace with actual auth when Cloud is enabled)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@pestinfo.com" && password === "admin123") {
      localStorage.setItem("adminToken", "demo-token");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin@pestinfo.com / admin123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-leaf-pattern p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl border border-border/50 shadow-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4">
              <Leaf className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to manage the pesticide database
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pestinfo.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo credentials:</strong><br />
              Email: admin@pestinfo.com<br />
              Password: admin123
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary hover:underline">
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
