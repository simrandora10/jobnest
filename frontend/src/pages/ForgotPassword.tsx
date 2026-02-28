import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import { authApi } from "@/lib/api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="relative z-10 w-full max-w-md">
        <GlassCard className="glow-sm text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
          
          {success ? (
            <div className="mb-6">
              <p className="text-sm text-green-500 mb-6">Reset link sent to your email!</p>
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors mb-4" 
                  required
                />
                <Button disabled={loading} type="submit" className="w-full gradient-primary text-primary-foreground border-0 h-12 text-sm font-semibold hover:opacity-90 mb-4">
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
