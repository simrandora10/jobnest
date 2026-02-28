import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/adminApi";

export const Moderation = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed" | "dismissed">("all");
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['adminReports'],
    queryFn: () => adminApi.getReports(),
  });

  const reviewMutation = useMutation({
    mutationFn: (id: string) => adminApi.reviewReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminReports'] });
      toast({ title: "Report Reviewed" });
    }
  });

  const dismissMutation = useMutation({
    mutationFn: (id: string) => adminApi.dismissReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminReports'] });
      toast({ title: "Report Dismissed" });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => adminApi.deletePost(id),
    onSuccess: () => {
      toast({ title: "Content Hidden", description: "The content was deleted successfully." });
    }
  });

  const filtered = filter === "all" ? reports : reports.filter((r: any) => r.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Moderation Panel</h1>

      <div className="flex gap-1 p-1 glass rounded-xl w-fit">
        {(["all", "pending", "reviewed", "dismissed"] as const).map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${filter === t ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length > 0 ? filtered.map((report: any) => (
          <GlassCard key={report.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.status === "pending" ? "bg-yellow-500/10" : report.status === "reviewed" ? "bg-blue-500/10" : "bg-green-500/10"}`}>
                  {report.status === "pending" ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> : report.status === "reviewed" ? <Eye className="w-5 h-5 text-blue-500" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{report.reason}</p>
                  <p className="text-xs text-muted-foreground">Reported by {report.reporter_id.slice(0, 8)}... · {new Date(report.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-secondary/50 border-0 text-xs">{report.target_type}</Badge>
                <Badge className={`border-0 text-xs ${report.status === "pending" ? "bg-yellow-500/10 text-yellow-500" : report.status === "reviewed" ? "bg-blue-500/10 text-blue-500" : "bg-green-500/10 text-green-500"}`}>
                  {report.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">Target ID: <span className="text-foreground font-mono">{report.target_id.slice(0, 12)}...</span></p>
              {report.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-xs h-7" disabled={dismissMutation.isPending} onClick={() => dismissMutation.mutate(report.id)}>Dismiss</Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 text-blue-500" disabled={reviewMutation.isPending} onClick={() => reviewMutation.mutate(report.id)}>Mark Reviewed</Button>
                  {report.target_type === "post" && (
                     <Button size="sm" variant="ghost" className="text-xs h-7 text-yellow-500" disabled={deletePostMutation.isPending} onClick={() => deletePostMutation.mutate(report.target_id)}>Delete Content</Button>
                  )}
                </div>
              )}
            </div>
          </GlassCard>
        )) : (
          <p className="text-center text-muted-foreground py-8">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default Moderation;
