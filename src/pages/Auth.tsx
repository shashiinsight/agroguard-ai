import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Lock, User, AlertCircle, Mail, Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});

export default function Auth() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin/login";
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user, isAdmin, isLoading: authLoading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else if (isAdminRoute) {
        // User is logged in but not admin, show error
        setError("You don't have admin privileges. Please contact an administrator.");
      } else {
        navigate("/");
      }
    }
  }, [user, isAdmin, navigate, authLoading, isAdminRoute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
        }
      } else {
        const validation = signupSchema.safeParse({ email, password, fullName });
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            setError("This email is already registered. Please log in instead.");
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to PestInfo. You are now logged in.",
          });
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <Link to="/">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4 ${
                isAdminRoute 
                  ? "bg-amber-500 text-white" 
                  : "bg-primary text-primary-foreground"
              }`}>
                {isAdminRoute ? <Shield className="h-7 w-7" /> : <Leaf className="h-7 w-7" />}
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              {isAdminRoute 
                ? "Admin Login" 
                : isLogin 
                  ? "Welcome Back" 
                  : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isAdminRoute
                ? "Sign in with your admin credentials"
                : isLogin
                  ? "Sign in to access your account"
                  : "Sign up to get started with PestInfo"}
            </p>
          </div>

          {/* Admin Badge */}
          {isAdminRoute && (
            <div className="mb-6 flex items-center justify-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400 text-sm">
              <Shield className="h-4 w-4" />
              Admin access requires elevated privileges
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && !isAdminRoute && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                    required={!isLogin && !isAdminRoute}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && !isAdminRoute && (
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
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

            <Button 
              type="submit" 
              className={`w-full ${isAdminRoute ? "bg-amber-500 hover:bg-amber-600" : ""}`} 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>
          </form>

          {/* Toggle - only show for regular auth, not admin */}
          {!isAdminRoute && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-sm text-primary hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          )}

          {/* Switch between User/Admin login */}
          <div className="mt-4 pt-4 border-t border-border/50">
            {isAdminRoute ? (
              <Link 
                to="/auth" 
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                Sign in as regular user
              </Link>
            ) : (
              <Link 
                to="/admin/login" 
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Shield className="h-4 w-4" />
                Sign in as admin
              </Link>
            )}
          </div>

          {/* Back Link */}
          <div className="mt-4 text-center">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" />
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
