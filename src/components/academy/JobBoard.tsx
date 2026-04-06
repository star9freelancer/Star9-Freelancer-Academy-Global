import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Briefcase, MapPin, DollarSign, Clock, ExternalLink, 
  Search, Filter, Globe, Sparkles, Building2, BadgeCheck,
  Cpu, TrendingUp, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function JobBoard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('academy_jobs')
      .select('*')
      .eq('is_active', true)
      .order('posted_at', { ascending: false });

    if (error) {
      toast.error("Failed to synchronize career ledger.");
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight uppercase leading-none">Career Engine</h2>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.3em]">Premium Personnel Opportunities</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search roles or companies..." 
            className="pl-10 bg-background/50 border-white/5 focus:border-primary/30 transition-all uppercase font-mono text-[10px] tracking-widest"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <Card className="glass border-dashed text-center p-12 opacity-80 col-span-full">
             <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
             <CardTitle className="mb-2 uppercase tracking-tighter">No Jobs Found</CardTitle>
             <CardDescription>Adjust your search filters to find available roles.</CardDescription>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} className="glass border-white/5 bg-card/40 hover:bg-card/60 transition-all duration-300 group relative flex flex-col overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardHeader className="pb-4">
                 <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Briefcase className="size-5" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                       <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-widest border-primary/20 text-primary bg-primary/5">
                          {job.type}
                       </Badge>
                       <div className="flex items-center gap-1.5 mt-1">
                          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Active</span>
                       </div>
                    </div>
                 </div>
                 <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{job.title}</h3>
                 <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">{job.company}</p>
              </CardHeader>
              
              <CardContent className="space-y-5 flex-1">
                 <div className="grid grid-cols-2 gap-3 pb-2 border-b border-white/5">
                    <div className="space-y-1">
                       <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">Location</p>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-300 uppercase truncate">
                          <Globe className="size-3 text-secondary" /> {job.location}
                       </div>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">Compensation</p>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase truncate">
                          <DollarSign className="size-3" /> {job.salary_range}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                   <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {job.description}
                   </p>
                   
                   <div className="flex flex-wrap gap-1.5">
                      {job.requirements?.slice(0, 3).map((req: string, i: number) => (
                         <span key={i} className="text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-zinc-400 font-bold">
                            {req}
                         </span>
                      ))}
                      <span className="text-[8px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 uppercase tracking-widest text-primary font-bold">
                         Level: Intermediate
                      </span>
                   </div>
                 </div>
              </CardContent>
              
              <CardFooter className="pt-4 border-t border-white/5">
                 <Button 
                    className="w-full font-mono text-xs uppercase tracking-widest gap-2 bg-zinc-900 hover:bg-primary text-white border border-white/10 hover:border-primary transition-all active:scale-95 group/btn py-6 rounded-xl"
                    onClick={() => window.open(job.application_url || '#', '_blank')}
                  >
                    View Role <ArrowUpRight className="size-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                 </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="p-8 rounded-3xl border border-secondary/20 bg-secondary/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="size-32" />
         </div>
         <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
               <Sparkles className="size-4 text-secondary" />
               <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold">Personal Career Advisory</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Expand your global personnel footprint.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
               As a Star9 practitioner, your verified credentials provide instant clearance for high-speed digital delivery roles across the network. Optimize your profile to increase your visibility to top-tier enterprise partners.
            </p>
            <Button variant="ghost" className="p-0 h-auto font-mono text-[10px] uppercase tracking-[0.3em] text-secondary hover:text-secondary-foreground hover:bg-transparent">
               Optimize Resume Track →
            </Button>
         </div>
      </div>
    </div>
  );
}
