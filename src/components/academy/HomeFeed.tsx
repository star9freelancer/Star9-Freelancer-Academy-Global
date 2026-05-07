import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight as ArrowRightIcon, 
  BookOpen as BookOpenIcon, 
  Briefcase as BriefcaseIcon, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon, 
  Users as UsersIcon, 
  Globe as GlobeIcon,
  Lock as LockIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";


interface HomeFeedProps {
  setActiveTab: (tab: string) => void;
  courses: any[];
  enrollments: Map<string, any>;
  profile: any;
}

export const HomeFeed = ({ setActiveTab, courses, enrollments, profile }: HomeFeedProps) => {
  const activeEnrolledCourses = courses.filter(c => enrollments.has(c.id));

  return (
    <div className="space-y-6 md:space-y-10 w-full pb-10 md:pb-20 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-card border border-border overflow-hidden p-8 md:p-10">
        <div className="absolute hidden md:block top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
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
                <BookOpenIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">My Courses</h3>
              </div>
              <button 
                onClick={() => setActiveTab('academy')}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRightIcon className="size-3" />
              </button>
            </div>
            
            {activeEnrolledCourses.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-background to-background border border-primary/20 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="space-y-3 z-10">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] tracking-widest uppercase mb-1">
                      Pick up where you left off
                    </Badge>
                    <h4 className="text-2xl font-bold tracking-tight">
                      {activeEnrolledCourses[0].title}
                    </h4>
                    <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
                      You are enrolled in this program. Jump back in to continue building your skills and advancing your career.
                    </p>
                  </div>
                  
                  {(() => {
                    const isLocked = new Date() < new Date("2026-05-12T00:00:00");
                    return isLocked ? (
                      <Button
                        size="lg"
                        className="h-14 px-8 rounded-xl font-bold gap-2 shrink-0 z-10 bg-amber-500 hover:bg-amber-600 text-white shadow-xl"
                        onClick={() => toast.info("📅 Lessons begin Tuesday, 12th May", {
                          description: "Hang tight — your course unlocks on the 12th!",
                          duration: 5000,
                        })}
                      >
                        <LockIcon className="size-4" /> Unlocks May 12th
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="h-14 px-8 rounded-xl font-bold gap-2 shrink-0 z-10 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        asChild
                      >
                        <Link to={`/academy/course/${activeEnrolledCourses[0].id}`}>
                          Continue Learning <ArrowRightIcon className="size-4" />
                        </Link>
                      </Button>
                    );
                  })()}
                </div>
                
                <div className="flex items-center justify-between pt-2 px-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <BookOpenIcon className="size-4" /> {activeEnrolledCourses.length - 1} other active programs in your Vault.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('academy')} className="gap-2 rounded-lg">
                    Open Vault <ArrowRightIcon className="size-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-12 text-center space-y-4 cursor-pointer" onClick={() => setActiveTab('catalog')}>
                <BookOpenIcon className="size-10 text-muted-foreground mx-auto" />
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
                { title: "Profile & Settings", desc: "Update your personal information.", tab: "settings", icon: SettingsIcon, color: "text-primary" },
                { title: "Job Board", desc: "Browse remote jobs and opportunities.", tab: "careers", icon: BriefcaseIcon, color: "text-secondary" },
                { title: "Community", desc: "Connect with fellow students.", tab: "community", icon: UsersIcon, color: "text-green-500" },
                { title: "Events", desc: "Upcoming workshops and webinars.", tab: "events", icon: CalendarIcon, color: "text-amber-500" }
              ].map((item, i) => (
                <button 
                  key={i} 
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
                  <ArrowRightIcon className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Explore CTA */}
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 p-6 space-y-3 cursor-pointer hover:border-primary/40 transition-all" onClick={() => setActiveTab('catalog')}>
            <GlobeIcon className="size-8 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Explore Courses</h3>
            <p className="text-sm text-muted-foreground">Discover new skills and grow your career with our expert-led programs.</p>
            <Button size="sm" className="mt-2">Browse Catalog</Button>
          </div>

          {/* Stats */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Your Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-xl font-bold text-foreground">{profile?.current_streak || 0}</p>
                <p className="text-[11px] text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-xl font-bold text-foreground">{profile?.longest_streak || 0}</p>
                <p className="text-[11px] text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
