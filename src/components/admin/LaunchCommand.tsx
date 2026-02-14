import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, CheckCircle, Shield } from "lucide-react";

const LaunchCommand = () => {
  const { data: leadCount = 0 } = useQuery({
    queryKey: ["lead_count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: invites = [] } = useQuery({
    queryKey: ["tv_invites_launch"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tv_invites")
        .select("*")
        .order("granted_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-mono-system text-xs text-muted-foreground">Architect Leads</p>
              <p className="font-serif-display text-3xl font-bold text-emerald-glow">{leadCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center shrink-0">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-mono-system text-xs text-muted-foreground">System Status</p>
              <p className="font-mono-system text-sm font-bold text-emerald-glow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-glow inline-block animate-pulse" />
                All Systems Operational
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-mono-system text-xs text-muted-foreground">Active Invites</p>
              <p className="font-serif-display text-3xl font-bold text-emerald-glow">{invites.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Log */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="font-serif-display text-xl">Proprietary Access Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono-system text-xs">Username</TableHead>
                <TableHead className="font-mono-system text-xs">Email</TableHead>
                <TableHead className="font-mono-system text-xs">Granted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((inv: any) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono-system text-xs text-emerald-glow">{inv.tv_username}</TableCell>
                  <TableCell className="font-mono-system text-xs">{inv.client_email || "—"}</TableCell>
                  <TableCell className="font-mono-system text-xs">{new Date(inv.granted_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {invites.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground font-mono-system text-xs py-8">
                    No access granted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchCommand;
