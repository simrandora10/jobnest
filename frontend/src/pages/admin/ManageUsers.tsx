import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ban, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/adminApi";

export const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "seeker" | "employer">("all");
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => adminApi.getUsers(),
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => adminApi.deactivateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast({ title: "User Suspended", description: "The user has been deactivated." });
    }
  });

  const filtered = users.filter((u: any) =>
    (filter === "all" || u.role === filter) &&
    (u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users by email..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 p-1 glass rounded-xl w-fit">
          {(["all", "seeker", "employer"] as const).map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${filter === t ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length > 0 ? filtered.map((user: any) => {
          const name = user.email.split('@')[0];
          return (
            <GlassCard key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`border-0 ${user.role === "seeker" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{user.role}</Badge>
                <Badge className={`${user.is_active ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"} border-0`}>{user.is_active ? "Active" : "Inactive"}</Badge>
                <Button size="sm" variant="ghost" disabled={!user.is_active || deactivateMutation.isPending} onClick={() => deactivateMutation.mutate(user.id)}>
                  <Ban className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </GlassCard>
          );
        }) : (
          <p className="text-center text-muted-foreground py-8">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
