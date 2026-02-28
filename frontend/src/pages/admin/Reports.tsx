import GlassCard from "@/components/GlassCard";
import { Users, Briefcase, FileText, Flag, TrendingUp, BarChart3, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/adminApi";

export const Reports = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => adminApi.getStats(),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Platform Reports</h1>

      {isLoading ? (
        <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: stats.total_users, change: "+12%", icon: Users },
            { label: "Total Jobs", value: stats.total_jobs, change: "+8%", icon: Briefcase },
            { label: "Total Posts", value: stats.total_posts, change: "+15%", icon: FileText },
            { label: "Applications", value: stats.total_applications, change: "+5%", icon: Flag },
          ].map(s => (
            <GlassCard key={s.label}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></div>
                <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>{s.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </GlassCard>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> User Growth</h3>
          <div className="h-48 bg-secondary/30 rounded-lg flex items-end justify-around px-4 pb-4">
            {[40, 55, 45, 70, 65, 80, 75, 85, 90, 88, 95, 92].map((h, i) => (
              <div key={i} className="w-6 gradient-primary rounded-t-md" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2"><span>Jan</span><span>Jun</span><span>Dec</span></div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Job Categories</h3>
          <div className="space-y-4">
            {[
              { name: "IT & Development", pct: 85 },
              { name: "Design & Creative", pct: 70 },
              { name: "Marketing", pct: 55 },
              { name: "Engineering", pct: 45 },
              { name: "Finance", pct: 30 },
            ].map(cat => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1"><span className="text-foreground">{cat.name}</span><span className="text-muted-foreground">{cat.pct}%</span></div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-center p-4"><p className="text-muted-foreground text-sm">Activity feed currently not served by API.</p></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Reports;
