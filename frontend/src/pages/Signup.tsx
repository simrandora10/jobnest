import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [role, setRole] = useState<"seeker" | "employer">("seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ email, password, role });
      navigate("/verify-email");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="relative z-10 w-full max-w-md sm:max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">JN</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Job<span className="text-primary">Nest</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose how you'd like to use JobNest</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { key: "seeker" as const, icon: User, label: "Job Seeker", desc: "Find your dream job" },
            { key: "employer" as const, icon: Building2, label: "Employer", desc: "Hire top talent" },
          ].map((r) => (
            <motion.button
              key={r.key}
              onClick={() => setRole(r.key)}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                role === r.key
                  ? "border-primary bg-primary/5 glow-sm"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <r.icon className={`w-6 h-6 mb-2 ${role === r.key ? "text-primary" : "text-muted-foreground"}`} />
              <p className="font-semibold text-foreground text-sm">{r.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
            </motion.button>
          ))}
        </div>

        <GlassCard className="glow-sm sm:p-8">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" 
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" 
                  required
                />
              </div>
            </div>
            <Button disabled={loading} type="submit" className="w-full gradient-primary text-primary-foreground border-0 h-12 text-sm font-semibold hover:opacity-90 mt-2">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Signup;
