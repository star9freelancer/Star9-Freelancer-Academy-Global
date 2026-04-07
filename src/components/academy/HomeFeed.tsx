import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, ArrowRight, TrendingUp, 
  Star, BookOpen, Clock, Briefcase, Calendar, Settings, Globe
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
          text: `${(p.profiles as any)?.full_name || 'A student'} enrolled in ${(p.academy_courses as any)?.title}`,
          date: new Date(p.enrolled_at),
        })) || [];

        setActivities(formattedPulses);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 md:space-y-10 max-w-full mx-auto pb-10 md:pb-20 px-0 lg:px-4 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-card border border-border overflow-hidden p-8 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-muted-foreground max-w-md">
              Continue where you left off, or explore something new.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{activeEnrolledCourses.length}</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">{profile?.merit_points || 0}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* My Courses */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">My Courses</h3>
              </div>
              <button 
                onClick={() => setActiveTab('academy')}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="size-3" />
              </button>
            </div>
            
            {activeEnrolledCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {activeEnrolledCourses.slice(0, 4).map((course, i) => {
                  const enrollment = enrollments.get(course.id);
                  const progress = enrollment?.progress || 0;
                  return (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative rounded-xl bg-card border border-border hover:border-primary/30 p-5 transition-all cursor-pointer overflow-hidden"
                      onClick={() => setActiveTab('academy')}
                    >
                      <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                        {course.image_url && <img src={course.image_url} className="w-full h-full object-cover" alt="" />}
                      </div>

                      <div className="relative z-10 space-y-4">
                        <div>
                          <Badge variant="secondary" className="text-[10px] mb-2">{course.category || 'Course'}</Badge>
                          <h4 className="font-semibold text-foreground line-clamp-2">{course.title}</h4>
                        </div>

                        <div className="space-y-2">
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{progress}% complete</span>
                            {progress >= 100 && <span className="text-green-500 font-medium">Completed</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-12 text-center space-y-4" onClick={() => setActiveTab('catalog')}>
                <BookOpen className="size-10 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-semibold text-foreground">No courses yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Browse our catalog to get started</p>
                </div>
                <Button onClick={() => setActiveTab('catalog')}>Browse Courses</Button>
              </div>
            )}
          </section>

          {/* Quick Links */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Profile & Settings", desc: "Update your personal information and preferences.", tab: "settings", icon: Settings, color: "text-primary" },
                { title: "Job Board", desc: "Browse remote jobs and freelance opportunities.", tab: "careers", icon: Briefcase, color: "text-secondary" },
                { title: "Community", desc: "Connect with fellow students and instructors.", tab: "community", icon: Users, color: "text-green-500" },
                { title: "Events", desc: "View upcoming workshops and webinars.", tab: "events", icon: Calendar, color: "text-amber-500" }
              ].map((item, i) => (
                <motion.button 
                  key={i} 
                  whileHover={{ y: -2 }}
                  className="group p-5 rounded-xl bg-card border border-border hover:border-border/80 transition-all text-left flex items-start gap-4"
                  onClick={() => setActiveTab(item.tab)}
                >
                  <div className={`p-2.5 rounded-lg bg-muted ${item.color}`}>
                    <item.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </motion.button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Recent Activity */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground text-sm">Recent Activity</h3>
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-3">
              {activities.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-foreground/80 text-xs leading-relaxed">{item.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{formatTime(item.date)}</p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && !loading && (
                <p className="text-xs text-muted-foreground text-center py-6">No recent activity</p>
              )}
              {loading && (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-3 bg-muted rounded animate-pulse" />)}
                </div>
              )}
            </div>
          </div>
          
          {/* Explore CTA */}
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 p-6 space-y-3 cursor-pointer hover:border-primary/40 transition-all" onClick={() => setActiveTab('catalog')}>
            <Globe className="size-8 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Explore Courses</h3>
            <p className="text-sm text-muted-foreground">Discover new skills and grow your career with our expert-led programs.</p>
            <Button size="sm" className="mt-2">Browse Catalog</Button>
          </div>
        </aside>
      </div>
    </div>
  );
};
