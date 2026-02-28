import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Loader2, Power } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/adminApi";

export const ManageJobs = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['adminJobs'],
    queryFn: () => adminApi.getJobs(),
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => adminApi.deactivateJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] });
      toast({ title: "Job Removed", description: "The job has been archived." });
    }
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => adminApi.toggleJobStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] });
      toast({ title: "Job Status Updated", description: "The job's visibility has been toggled." });
    },
    onError: () => {
      toast({ title: "Update Failed", description: "Could not toggle the job status.", variant: "destructive" });
    }
  });

  const filtered = jobs.filter((j: any) =>
    j.title.toLowerCase().includes(search.toLowerCase()) || (j.company_name && j.company_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Manage Jobs</h1>
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search jobs..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length > 0 ? filtered.map((job: any) => (
          <GlassCard key={job.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div>
                <p className="font-semibold text-foreground">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.company_name || 'Unknown Company'} · {job.location} · {job.job_type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-0">{job.status}</Badge>
              <div className="flex items-center gap-2" title={job.status === "open" ? "Disable Job" : "Enable Job"}>
                  <Switch 
                    checked={job.status === "open"} 
                    disabled={job.status === "archived" || toggleMutation.isPending} 
                    onCheckedChange={() => toggleMutation.mutate(job.id)} 
                  />
              </div>
              <Button size="sm" variant="ghost" disabled={job.status === "archived" || deactivateMutation.isPending} onClick={() => deactivateMutation.mutate(job.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </GlassCard>
        )) : (
          <p className="text-center text-muted-foreground py-8">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
