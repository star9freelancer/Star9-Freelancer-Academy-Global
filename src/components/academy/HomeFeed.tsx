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
    <div className="space-y-12 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. WELCOME & SYSTEM STATUS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[9px] tracking-widest px-2.5">ONLINE</Badge>
             <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global Network Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Dashboard</h1>
          <p className="text-zinc-500 font-medium">Welcome back, {profile?.full_name?.split(' ')[0] || 'Member'}. Your academy status is up to date.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
           <div className="px-6 py-2 border-r border-white/5">
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Active Courses</p>
              <p className="text-xl font-black text-white">{activeEnrolledCourses.length}</p>
           </div>
           <div className="px-6 py-2">
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Merit Points</p>
              <p className="text-xl font-black text-amber-500">{profile?.merit_points || 0}</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          
          {/* 2. ACTIVE LEARNING Short-cuts */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Your Learning Tracks</h3>
               <div className="h-px flex-1 bg-white/5 mx-6" />
            </div>
            
            {activeEnrolledCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {activeEnrolledCourses.slice(0, 4).map((course, i) => {
                  const enrollment = enrollments.get(course.id);
                  return (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-6 rounded-[2rem] glass-dark hover:bg-white/[0.04] transition-all flex items-center gap-6 relative overflow-hidden cursor-pointer border border-white/5 hover:border-primary/20"
                      onClick={() => setActiveTab('academy')}
                    >
                      <div className="size-16 rounded-2xl overflow-hidden shrink-0 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={course.image_url} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-sm uppercase tracking-tight truncate">{course.title}</h4>
                        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: `${enrollment?.progress || 0}%` }} />
                        </div>
                        <p className="text-[9px] font-mono text-primary font-bold">{enrollment?.progress || 0}% COMPLETE</p>
                      </div>
                      <ArrowRight className="size-4 text-zinc-700 group-hover:text-primary transition-colors" />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[2.5rem] border border-dashed border-white/10 bg-zinc-950/20 p-12 text-center space-y-4">
                 <BookOpen className="size-8 text-zinc-700 mx-auto" />
                 <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">No active learning tracks detected.</p>
                 <Button onClick={() => setActiveTab('catalog')} className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-xl font-mono text-[9px] uppercase tracking-widest">Browse Programs</Button>
              </div>
            )}
          </section>

          {/* 3. ACADEMY MISSION & ECOSYSTEM */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 font-bold">Academy Ecosystem</h3>
              <div className="h-px flex-1 bg-white/5 mx-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               {[
                 { title: "Verified Certificates", desc: "Gain industry-standard credentials upon course completion.", icon: ShieldCheck, color: "text-emerald-500" },
                 { title: "Global Community", desc: "Connect with skilled professionals across the global network.", icon: Users, color: "text-blue-500" },
                 { title: "Premium Training", desc: "Access high-tier instructional content for digital careers.", icon: Cpu, color: "text-purple-500" },
                 { title: "Career Engine", desc: "Unlock exclusive opportunities within our partner network.", icon: TrendingUp, color: "text-amber-500" }
               ].map((item, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ scale: 1.02 }}
                   className="p-8 rounded-[2rem] glass border border-white/5 space-y-4 hover:border-white/10 transition-all"
                 >
                    <div className={`p-3 rounded-xl bg-white/5 w-fit ${item.color}`}>
                       <item.icon className="size-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-bold tracking-tight text-white uppercase">{item.title}</h4>
                       <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </section>
        </div>

        {/* 4. ACTIVITY LOG (Pulse Stream) */}
        <aside className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 font-bold">Recent Updates</h3>
            <div className="size-2 bg-emerald-500 rounded-full animate-pulse ring-4 ring-emerald-500/20" />
          </div>
          
          <div className="rounded-[2.5rem] bg-zinc-950 border border-white/5 p-8 shadow-2xl relative overflow-hidden min-h-[500px]">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Globe className="size-40" />
             </div>
             
             <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                   <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Live Stream</p>
                   <p className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">SECURED</p>
                </div>
                
                <div className="space-y-6">
                  {activities.map((pulse, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                         <pulse.icon className="size-3" />
                      </div>
                      <div className="space-y-1 pr-4">
                         <p className="text-[10px] items-center gap-2 flex">
                            <span className="text-zinc-600 font-mono">[{formatTime(pulse.date)}]</span>
                            <span className="font-mono uppercase tracking-widest text-white/80">{pulse.text}</span>
                         </p>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && !loading && (
                    <p className="text-center text-zinc-700 font-mono text-[9px] uppercase tracking-widest py-10 italic">Awaiting network activity...</p>
                  )}
                  {loading && (
                    <div className="space-y-6">
                       {[1,2,3].map(i => <div key={i} className="h-8 w-full bg-white/5 rounded-lg animate-pulse" />)}
                    </div>
                  )}
                </div>
             </div>
          </div>
          
          <Card className="glass border-primary/20 bg-primary/5 p-8 rounded-[2.5rem] relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('catalog')}>
             <div className="relative z-10 space-y-4">
                <Sparkles className="size-8 text-primary" />
                <h3 className="text-xl font-bold tracking-tight uppercase">Expand Skills</h3>
                <p className="text-sm text-primary/60 leading-relaxed font-medium">Browse the full catalog and start a new learning track today.</p>
                <div className="pt-4 flex items-center text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary gap-2">
                   Open Catalog <ArrowRight className="size-3" />
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
          </Card>
        </aside>
      </div>
    </div>
  );
};
