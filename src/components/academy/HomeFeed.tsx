import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, Cpu, Users, Database, ArrowRight, TrendingUp, 
  Sparkles, ShieldCheck, Globe, Zap, Network, BookOpen, Clock, Play
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
          .limit(6);

        const formattedPulses = pulses?.map(p => ({
          text: `${(p.profiles as any)?.full_name || 'Personnel'} linked to ${(p.academy_courses as any)?.title}`,
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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* 1. WELCOME & SYSTEM STATUS */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[9px] tracking-widest px-2.5">LOGGED_IN</Badge>
             <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Version 4.0.9</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Home</h1>
          <p className="text-zinc-500 font-medium">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}. Your dashboard is ready.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
           <div className="px-4 py-2 border-r border-white/5">
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">My Courses</p>
              <p className="text-xl font-black text-white">{activeEnrolledCourses.length}</p>
           </div>
           <div className="px-4 py-2">
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Points</p>
              <p className="text-xl font-black text-amber-500">{profile?.merit_points || 0}</p>
           </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          
          {/* 2. ACTIVE LEARNING Short-cuts */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-mono uppercase tracking-[0.4em] text-primary font-bold">Your Courses</h3>
               <div className="h-px flex-1 bg-white/5 mx-6" />
            </div>
            
            {activeEnrolledCourses.length > 0 ? (
              <div className="grid gap-4">
                {activeEnrolledCourses.slice(0, 2).map((course, i) => {
                  const enrollment = enrollments.get(course.id);
                  return (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-6 rounded-[2rem] glass hover:bg-white/[0.04] transition-all flex items-center gap-6 relative overflow-hidden"
                    >
                      <div className="size-16 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                        <img src={course.image_url} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-lg">{course.title}</h4>
                        <div className="flex items-center gap-3">
                           <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${enrollment?.progress}%` }} />
                           </div>
                           <span className="text-[10px] font-mono text-zinc-500">{enrollment?.progress}%</span>
                        </div>
                      </div>
                      <Button onClick={() => setActiveTab('academy')} className="rounded-xl font-mono text-[9px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                         Continue <ArrowRight className="ml-2 size-3" />
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <Card className="rounded-[2.5rem] border-dashed border-white/10 bg-transparent p-12 text-center">
                 <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">You haven't started any courses yet.</p>
                 <Button onClick={() => setActiveTab('catalog')} className="mt-4 bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">Pick a Course</Button>
              </Card>
            )}
          </section>

          {/* 3. ACADEMY MISSION & ECOSYSTEM */}
          <section className="space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-[0.4em] text-zinc-500 font-bold">About Star9 Academy</h3>
            <div className="grid md:grid-cols-2 gap-6">
               {[
                 { title: "Official Certificates", desc: "Every course you complete is recorded with a verified certificate.", icon: ShieldCheck, color: "text-emerald-500" },
                 { title: "Social Networking", desc: "Connect with other members and experts in our community space.", icon: Network, color: "text-blue-500" },
                 { title: "Expert Courses", desc: "Learn technical skills designed for modern digital careers.", icon: Cpu, color: "text-purple-500" },
                 { title: "Career Growth", desc: "Get priority access to job opportunities in the Star9 network.", icon: TrendingUp, color: "text-amber-500" }
               ].map((item, i) => (
                 <Card key={i} className="p-6 glass border-white/5 hover:border-white/10 transition-all rounded-3xl space-y-3">
                    <item.icon className={`size-6 ${item.color}`} />
                    <h4 className="font-bold tracking-tight">{item.title}</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed">{item.desc}</p>
                 </Card>
               ))}
            </div>
          </section>
        </div>

        {/* 4. ACTIVITY TERMINAL LOG */}
        <aside className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-[0.4em] text-zinc-500 font-bold">Recent Updates</h3>
            <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          
          <div className="rounded-3xl bg-zinc-950/80 border border-white/5 p-6 font-mono text-[11px] space-y-4 shadow-2xl backdrop-blur-3xl min-h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none opacity-20" />
            <div className="absolute inset-0 bg-[length:100%_2px] bg-[linear-gradient(to_bottom,transparent_0.5px,rgba(255,255,255,0.02)_0.5px)] pointer-events-none" />
            
            <div className="space-y-4">
              <p className="text-zinc-600/[0.4]">// RECENT ACTIVITY...</p>
              {activities.map((pulse, i) => (
                <div key={i} className="flex gap-4 group">
                  <span className="text-zinc-700 select-none">[{formatTime(pulse.date)}]</span>
                  <p className="text-zinc-400 group-hover:text-primary transition-colors leading-relaxed">
                     {pulse.text.replace('Personnel', 'User')}
                  </p>
                </div>
              ))}
              <div className="flex gap-2 items-center text-primary">
                 <span className="animate-pulse">_</span>
                 <p className="text-zinc-800 italic uppercase spacing-widest">Awaiting user activity...</p>
              </div>
            </div>
          </div>
          
          <Card className="glass border-primary/20 bg-primary/5 p-8 rounded-[2.5rem] relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('catalog')}>
             <div className="relative z-10 space-y-4">
                <Sparkles className="size-8 text-primary animate-float" />
                <h3 className="text-xl font-bold tracking-tight">Explore More Courses</h3>
                <p className="text-xs text-primary/60 leading-relaxed font-medium capitalize">Find new learning opportunities in the academy catalog.</p>
                <div className="pt-2 flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-primary gap-2">
                   Open Catalog <ArrowRight className="size-3" />
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl" />
          </Card>
        </aside>
      </div>
    </div>
  );
};
