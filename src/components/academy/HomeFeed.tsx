import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, Cpu, Users, Database, ArrowRight, TrendingUp 
} from "lucide-react";

interface HomeFeedProps {
  setActiveTab: (tab: string) => void;
}

export const HomeFeed = ({ setActiveTab }: HomeFeedProps) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        // Fetch 3 most recent enrollments
        const { data: enrollments } = await supabase
          .from('user_enrollments')
          .select('enrolled_at, profiles(full_name), academy_courses(title)')
          .order('enrolled_at', { ascending: false })
          .limit(3);

        // Fetch 2 most recent certificates
        const { data: certificates } = await supabase
          .from('user_certificates')
          .select('created_at, profiles(full_name), academy_courses(title)')
          .order('created_at', { ascending: false })
          .limit(2);

        // Fetch 2 most recent jobs
        const { data: jobs } = await supabase
          .from('academy_jobs')
          .select('title, company, posted_at')
          .eq('is_active', true)
          .order('posted_at', { ascending: false })
          .limit(2);

        // Aggregate into unified feed pulses
        const pulses: any[] = [];
        
        enrollments?.forEach(e => pulses.push({
          text: `${(e.profiles as any)?.full_name || 'Personnel'} joined the ${ (e.academy_courses as any)?.title || 'Academy'} mastery track.`,
          date: new Date(e.enrolled_at),
          icon: Users,
          color: "text-blue-500"
        }));

        certificates?.forEach(c => pulses.push({
          text: `${(c.profiles as any)?.full_name || 'Personnel'} minted a mastery credential for ${ (c.academy_courses as any)?.title }.`,
          date: new Date(c.created_at),
          icon: Database,
          color: "text-emerald-500"
        }));

        jobs?.forEach(j => pulses.push({
          text: `New High-Speed Digital Opportunity: ${j.title} at ${j.company}.`,
          date: new Date(j.posted_at),
          icon: Cpu,
          color: "text-purple-500"
        }));

        setActivities(pulses.sort((a, b) => b.date - a.date).slice(0, 5));
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const formatDistanceToNow = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = { Y: 31536000, M: 2592000, D: 86400, H: 3600, MIN: 60 };
    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) return `${count}${unit} AGO`;
    }
    return "JUST NOW";
  };
  return (
    <div className="space-y-8 max-w-5xl animate-in fade-in duration-700">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass border-border/50 p-6 space-y-4 group">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Bell className="size-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Network News</h4>
            <h3 className="font-bold text-sm tracking-tight leading-snug">Welcome to the Star9 eHub community space.</h3>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">Connect with collaborators across the global node to transform your technical career track.</p>
        </Card>
        
        <Card className="md:col-span-2 relative overflow-hidden bg-zinc-900/50 border-white/5 p-8 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary border-primary/20 text-[9px] font-mono tracking-widest px-2.5">PRIORITY_ALPHA</Badge>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">System Notice</h4>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white">New Mastery Modules Available</h2>
              <p className="text-sm text-zinc-400 max-w-md leading-relaxed">Three new premium training tracks regarding AI Operational Infrastructure have been synchronized in the Program Catalog.</p>
            </div>
            <div className="flex gap-4 pt-2">
              <Button className="bg-white text-black hover:bg-white/90 font-mono text-[10px] uppercase tracking-[0.2em] py-5 px-8" onClick={() => setActiveTab('catalog')}>Explore Catalog</Button>
              <Button variant="outline" className="font-mono text-[10px] uppercase tracking-[0.2em] py-5 px-8 border-white/10 text-white hover:bg-white/5" onClick={() => setActiveTab('community')}>Join Community</Button>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Cpu className="size-56" />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">Recent Activity Feed</h3>
          <button onClick={() => setActiveTab("academy")} className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">View History</button>
        </div>
        <div className="grid gap-3">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />)
          ) : activities.length === 0 ? (
            <p className="text-xs text-muted-foreground opacity-60 text-center py-8 italic uppercase tracking-widest">Awaiting personnel activity scans...</p>
          ) : (
            activities.map((item, i) => (
              <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-default">
                <div className={`size-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <item.icon className="size-4" />
                </div>
                <span className="text-[13px] text-zinc-300 font-medium">{item.text}</span>
                <div className="ms-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">{formatDistanceToNow(item.date)}</span>
                  <ArrowRight className="size-3 text-zinc-500" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
