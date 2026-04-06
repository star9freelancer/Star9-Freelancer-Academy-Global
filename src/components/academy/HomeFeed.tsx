import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cpu, Users, Database, ArrowRight, TrendingUp, 
  Sparkles, ShieldCheck, Globe, Zap, Network, BookOpen, Clock
} from "lucide-react";
import { motion } from "framer-motion";

interface HomeFeedProps {
  setActiveTab: (tab: string) => void;
  courses: any[];
  enrollments: Map<string, any>;
  profile: any;
}

export const HomeFeed = ({ setActiveTab, courses, enrollments, profile }: HomeFeedProps) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive "Active Tracks"
  const activeEnrolledCourses = courses.filter(c => enrollments.has(c.id));

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const { data: pulses } = await supabase
          .from('user_enrollments')
          .select(`
            enrolled_at, 
            profiles(full_name), 
            academy_courses(title)
          `)
          .order('enrolled_at', { ascending: false })
          .limit(8);

        const formattedPulses = pulses?.map(p => ({
          text: `${(p.profiles as any)?.full_name || 'User'} joined ${(p.academy_courses as any)?.title}`,
          date: new Date(p.enrolled_at),
          icon: Zap,
          color: "text-primary"
        })) || [];

        setActivities(formattedPulses);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* 1. INTELLIGENCE ARRAY (Header Redesign) */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/10 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="relative p-8 md:p-10 rounded-[3rem] bg-zinc-950/40 border border-white/5 backdrop-blur-3xl overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="size-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.5em]">SYSTEM_INITIALIZED</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              Intelligence <span className="text-zinc-700">Hub</span>
            </h1>
            <p className="text-zinc-500 font-medium max-w-md text-sm md:text-base leading-relaxed">
              Welcome back, <span className="text-white font-bold">{profile?.full_name?.split(' ')[0] || 'Member'}</span>. 
              The Star9 network is synchronized with your profile.
            </p>
          </div>

          {/* Status Metrics Array */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-8">
             <div className="space-y-1.5">
               <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 font-bold">Clearance</p>
               <div className="flex items-center gap-2">
                 <ShieldCheck className="size-4 text-emerald-500" />
                 <span className="text-lg font-black text-white uppercase tracking-tighter overflow-hidden truncate">LEVEL_09</span>
               </div>
             </div>
             <div className="space-y-1.5">
               <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 font-bold">Merit Core</p>
               <div className="flex items-center gap-2">
                 <Zap className="size-4 text-amber-500" />
                 <span className="text-lg font-black text-white tracking-tighter">{profile?.merit_points || 0} <span className="text-[10px] text-zinc-700 uppercase font-bold tracking-widest pl-1">MT</span></span>
               </div>
             </div>
             <div className="space-y-1.5 hidden sm:block">
               <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 font-bold">Latency</p>
               <div className="flex items-center gap-2 text-primary">
                 <Network className="size-4" />
                 <span className="text-lg font-black tracking-tighter italic">24MS</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Content Node */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* 2. OPERATIONAL MODULES (Learning Path) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between group cursor-pointer" onClick={() => setActiveTab('academy')}>
               <div className="flex items-center gap-4">
                 <div className="size-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
                   <BookOpen className="size-4 text-primary" />
                 </div>
                 <h3 className="text-[11px] font-mono uppercase tracking-[0.5em] text-white/90 font-black">Active Modules</h3>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 group-hover:text-primary transition-colors">
                  OVERVIEW <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
            
            {activeEnrolledCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {activeEnrolledCourses.slice(0, 4).map((course, i) => {
                  const enrollment = enrollments.get(course.id);
                  const progress = enrollment?.progress || 0;
                  return (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="group relative h-48 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 hover:border-primary/20 p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
                      onClick={() => setActiveTab('academy')}
                    >
                      {/* Subliminal course image background */}
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                         <img src={course.image_url} className="w-full h-full object-cover grayscale" />
                      </div>

                      <div className="relative z-10 space-y-2">
                        <Badge className="bg-primary/5 text-primary border-primary/20 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded-sm">MODULE_{i + 1}</Badge>
                        <h4 className="text-xl font-black tracking-tighter text-white uppercase leading-tight line-clamp-2">{course.title}</h4>
                      </div>

                      <div className="relative z-10 space-y-4">
                        <div className="flex gap-1">
                           {[...Array(10)].map((_, idx) => (
                             <div 
                               key={idx} 
                               className={`h-1.5 flex-1 rounded-sm transition-all duration-1000 ${idx < progress / 10 ? 'bg-primary shadow-[0_0_8px_#3b82f6]' : 'bg-white/5'}`}
                               style={{ transitionDelay: `${idx * 50}ms` }}
                             />
                           ))}
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono font-black uppercase tracking-[0.2em]">
                           <span className={progress >= 100 ? "text-emerald-500" : "text-zinc-600"}>{progress}% COMPLETE</span>
                           <span className="text-zinc-700 group-hover:text-primary transition-colors">ACCESS INTERFACE</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="group rounded-[3rem] border border-dashed border-white/5 bg-zinc-950/20 p-16 text-center space-y-6 transition-all hover:border-primary/20 hover:bg-zinc-900/20" onClick={() => setActiveTab('catalog')}>
                 <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                   <Globe className="size-8 text-zinc-700 group-hover:text-primary transition-colors" />
                 </div>
                 <div className="space-y-2">
                   <p className="text-zinc-400 font-black text-lg uppercase tracking-tight">No active modules found</p>
                   <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest">Connect to a neural pathway in the catalog</p>
                 </div>
                 <Button className="bg-primary text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full px-8 hover:px-10 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] border-0">Connect Now</Button>
              </div>
            )}
          </section>

          {/* 3. OPERATIONAL NODES (Ecosystem) */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="size-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                <Network className="size-4 text-secondary/80" />
              </div>
              <h3 className="text-[11px] font-mono uppercase tracking-[0.5em] text-white/90 font-black">Network Nodes</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               {[
                 { title: "Personnel Records", desc: "Manage your digital credentials and Star9 practitioners access key.", tab: "settings", icon: ShieldCheck, color: "text-primary" },
                 { title: "Career Ledger", desc: "Browse high-fidelity professional opportunities across the network.", tab: "careers", icon: TrendingUp, color: "text-secondary" },
                 { title: "Global Uplink", desc: "Connect with the certified Star9 expert community in real-time.", tab: "community", icon: Globe, color: "text-emerald-500" },
                 { title: "Node Events", desc: "Schedule participation in elite network workshops and seminars.", tab: "events", icon: Cpu, color: "text-amber-500" }
               ].map((node, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ y: -5 }}
                   className="group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all cursor-pointer relative overflow-hidden flex items-start gap-6"
                   onClick={() => setActiveTab(node.tab)}
                 >
                    <div className={`p-4 rounded-2xl bg-zinc-950 border border-white/10 ${node.color} group-hover:scale-110 transition-transform shadow-xl`}>
                       <node.icon className="size-6" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="font-black tracking-tighter text-white uppercase text-lg leading-tight">{node.title}</h4>
                       <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight">{node.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </section>
        </div>

        {/* Intelligence Aside */}
        <aside className="lg:col-span-4 space-y-12">
          
          {/* 4. THE PULSE (Activity Feed Redesign) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="size-2 bg-emerald-500 rounded-full animate-blink" />
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 font-black">The Pulse</h3>
               </div>
               <span className="text-[8px] font-mono text-zinc-800 uppercase font-bold tracking-[0.2em]">LIVE_FEED</span>
            </div>
            
            <div className="rounded-[3rem] bg-black border border-white/5 p-8 shadow-3xl relative overflow-hidden group min-h-[600px] flex flex-col">
               {/* Terminal Scanline Effect */}
               <div className="absolute inset-0 bg-scanline opacity-[0.02] pointer-events-none" />
               <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 group-hover:animate-scan pointer-events-none" />

               <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center justify-between border-b border-primary/20 pb-4 mb-6">
                     <p className="text-[9px] font-mono uppercase font-black text-primary tracking-widest flex items-center gap-2">
                        <Terminal className="size-3" /> NETWORK_PROTOCOL
                     </p>
                     <span className="text-[8px] font-mono text-primary/40">v4.0.2_SYNC</span>
                  </div>
                  
                  <div className="flex-1 space-y-6 overflow-hidden">
                    {activities.map((pulse, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-1 group/line"
                      >
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-zinc-700 font-bold">[{formatTime(pulse.date)}]</span>
                            <div className="size-1 rounded-full bg-primary/40 group-hover/line:bg-primary transition-colors" />
                            <p className="text-[9px] font-mono uppercase font-black tracking-widest text-zinc-400 group-hover/line:text-white transition-colors truncate">
                               {pulse.text}
                            </p>
                         </div>
                      </motion.div>
                    ))}
                    {activities.length === 0 && !loading && (
                      <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
                         <div className="size-1 bg-zinc-800 animate-bounce" />
                         <p className="text-zinc-700 font-mono text-[9px] uppercase tracking-[0.3em] italic">Awaiting secure uplink...</p>
                      </div>
                    )}
                    {loading && (
                      <div className="space-y-4">
                         {[...Array(12)].map((_, i) => <div key={i} className="h-2 w-full bg-primary/5 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />)}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                     <div className="flex justify-between items-center text-[7px] font-mono text-zinc-800 uppercase tracking-widest">
                        <span>Buffer Status: 100%</span>
                        <span>Encrypted: AES-256</span>
                     </div>
                     <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500/20 w-[84%] animate-shimmer" />
                     </div>
                  </div>
               </div>
            </div>
          </section>
          
          {/* Marketplace/CTA aside */}
          <section className="relative overflow-hidden p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 group cursor-pointer" onClick={() => setActiveTab('catalog')}>
             <div className="absolute -right-10 -bottom-10 size-48 bg-primary/20 blur-[100px] group-hover:bg-primary/40 transition-colors" />
             <div className="relative z-10 space-y-4">
                <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Sparkles className="size-6 text-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Neural<br/>Expansion</h3>
                <p className="text-xs text-primary/70 font-bold uppercase tracking-tight leading-relaxed">Unlock advanced intelligence tiers in the Star9 marketplace.</p>
                <div className="pt-2">
                   <div className="h-[2px] w-12 bg-primary group-hover:w-full transition-all duration-700" />
                </div>
             </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
