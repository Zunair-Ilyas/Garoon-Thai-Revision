import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Check if user exists in allowed users table
    const { data: allowedUser, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();
    if (!allowedUser) {
      setError("You are not authorized to login.");
      setLoading(false);
      return;
    }
    // Proceed with authentication
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    const to =
      (location.state as { from?: { pathname?: string } } | null | undefined)
        ?.from?.pathname || "/dashboard";
    navigate(to, { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-end mb-4">
        <Button variant="secondary" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to website
          </Link>
        </Button>
      </div>
      <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-serif font-semibold mb-2 text-primary">
          Admin sign in
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in with your admin credentials to access the dashboard.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-border rounded bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-border rounded bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-6 text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
