import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, Users, Award, Settings, Menu, Bell, Search, Download, ThumbsUp, MessageSquare, ArrowRight, Play, Clock, TrendingUp, Lock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";

const courses = [
  { id: 1, title: "AI Tools for Freelancers", progress: 72, modules: 12, completed: 8, category: "Artificial Intelligence", nextLesson: "Automating Client Onboarding" },
  { id: 2, title: "Scaling Your Freelance Business", progress: 45, modules: 10, completed: 4, category: "Freelancing", nextLesson: "Enterprise Pricing" },
  { id: 3, title: "Advanced Prompt Engineering", progress: 20, modules: 8, completed: 1, category: "Artificial Intelligence", nextLesson: "Context Optimization" },
];

const communityPosts = [
  { user: "Amara K.", avatar: "AK", time: "2h ago", text: "Secured a new client contract using the AI negotiation framework from Module 4.", likes: 24 },
  { user: "David O.", avatar: "DO", time: "4h ago", text: "Looking for study partners to discuss the latest workflow automation methodologies.", likes: 8 },
  { user: "Fatima Z.", avatar: "FZ", time: "6h ago", text: "Successfully completed the AI for Freelancers certification.", likes: 31 },
];

const certificates = [
  { title: "AI Tools Fundamentals", date: "Feb 2026", unlocked: true },
  { title: "Freelance Business Operations", date: "Jan 2026", unlocked: true },
  { title: "Advanced Prompting", date: "Not yet earned", unlocked: false },
];

const sidebarLinks = [
  { icon: Home, label: "Home", active: true },
  { icon: BookOpen, label: "My Courses", active: false },
  { icon: Users, label: "Community", active: false },
  { icon: Award, label: "Certificates", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const ProgressCircle = ({ percent }: { percent: number }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="88" height="88" className="shrink-0">
      <defs>
        <linearGradient id={`grad-${percent}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r={r} fill="none" strokeWidth="6" className="stroke-muted" />
      <circle
        cx="44" cy="44" r={r} fill="none" strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        stroke={`url(#grad-${percent})`}
        className="transition-all duration-700"
        transform="rotate(-90 44 44)"
      />
      <text x="44" y="44" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-sm font-bold">
        {percent}%
      </text>
    </svg>
  );
};

const Academy = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:w-16 md:translate-x-0"} absolute md:relative z-50 h-full flex flex-col transition-all duration-300 border-r bg-card shrink-0 overflow-hidden`}>
        <div className="h-20 px-6 border-b flex items-center shrink-0 w-full">
          {sidebarOpen && (
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Star9" className="h-[56px] w-auto object-contain" />
            </Link>
          )}
        </div>
        <nav className="p-2 space-y-1">
          {sidebarLinks.map((l) => {
            const tabId = l.label.toLowerCase().replace(" ", "-");
            return (
              <button
                key={l.label}
                onClick={() => setActiveTab(tabId)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors border-l-2 ${
                  activeTab === tabId ? "bg-accent/50 text-foreground font-medium border-secondary" : "border-transparent text-muted-foreground hover:bg-muted"
                }`}
              >
                <l.icon className={`size-4 shrink-0 ${activeTab === tabId ? "text-primary" : ""}`} />
                {sidebarOpen && <span>{l.label}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="mt-auto p-4 space-y-4">
            <Link to="/global" className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-sm text-xs font-mono font-bold tracking-widest uppercase bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors border shadow-md">
              <span>SWITCH TO GLOBAL</span>
            </Link>

            <div className="p-4 rounded-sm bg-accent/30 border">
              <p className="text-xs font-mono font-semibold mb-1 flex items-center justify-between uppercase">Weekly Streak <Flame className="size-3 text-secondary" /></p>
              <p className="text-xs text-muted-foreground font-mono">5 consecutive days.</p>
              <div className="flex gap-1 mt-3">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={d+i} className={`w-6 h-6 rounded-sm font-mono text-[10px] flex items-center justify-center font-bold ${i < 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{d}</div>
                ))}
              </div>
            </div>
            
            <Link to="/" className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase text-muted-foreground hover:bg-muted transition-colors border border-border">
              <ArrowRight className="size-4 shrink-0 rotate-180" />
              <span>EXIT DASHBOARD</span>
            </Link>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-20 border-b bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
              <Menu className="size-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <Search className="size-4 text-muted-foreground" />
              <input type="text" placeholder="Search courses..." className="bg-transparent text-sm outline-none w-48" />
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="p-2 rounded-lg hover:bg-muted relative">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                EN
              </div>
              <span className="hidden sm:inline text-sm font-medium">Esther N.</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 w-full">
          {activeTab === "home" && (
            <>
              {/* Welcome + Stats */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Esther.</h1>
                  <p className="text-muted-foreground mt-1">Review your progress or explore new modules.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent border">
                    <TrendingUp className="size-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Hours This Week</p>
                      <p className="text-sm font-bold">12.5h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent border">
                    <Award className="size-4 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Certificates</p>
                      <p className="text-sm font-bold">2 Earned</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Learning Banner */}
              <div className="relative overflow-hidden rounded-2xl border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                    <Play className="size-5 text-primary ml-1" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-1">01 Continue Learning</p>
                    <p className="font-bold text-xl uppercase tracking-tight">AI Tools for Freelancers</p>
                    <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground flex items-center gap-2 mt-2">
                      <Clock className="size-3.5" /> Next: Automating Client Onboarding
                    </p>
                  </div>
                </div>
                <Button className="gap-2 shrink-0 md:w-auto w-full font-mono text-xs font-bold tracking-widest uppercase rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground relative z-10 shadow-lg shadow-primary/20" size="default">
                  Resume <ArrowRight className="!size-4" />
                </Button>
              </div>

              {/* Active Courses */}
              <section>
                <div className="flex items-center justify-between mb-4">
                   <h2 className="text-lg font-semibold">My Active Courses</h2>
                   <Button variant="ghost" size="sm" onClick={() => setActiveTab("my-courses")} className="text-primary">View All</Button>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {courses.map((c) => (
                    <div key={c.id} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
                      <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded-md self-start mb-3">{c.category}</span>
                      <h3 className="font-semibold mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{c.completed} of {c.modules} modules completed</p>
                      <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                        <Clock className="size-3" /> Next: {c.nextLesson}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <ProgressCircle percent={c.progress} />
                        <Button size="sm" className="gap-1">
                          Resume <ArrowRight className="!size-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "my-courses" && (
            <div className="text-center py-20 flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <BookOpen className="size-16 text-muted" />
              <h2 className="text-2xl font-semibold text-foreground">My Courses Library</h2>
              <p className="max-w-md">Your full course catalog will appear here in the final version. You currently have 3 active courses and 12 completed courses.</p>
              <Button onClick={() => setActiveTab("home")} variant="outline">Back to Dashboard</Button>
            </div>
          )}

          {activeTab === "community" && (
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Community Feed</h2>
                <Button className="gap-2"><MessageSquare className="size-4" /> New Post</Button>
              </div>
              <div className="space-y-4 max-w-3xl">
                {communityPosts.map((p, i) => (
                  <div key={i} className="rounded-xl border bg-card p-5 flex gap-4 hover:shadow-card transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                      {p.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-semibold">{p.user}</span>
                        <span className="text-xs text-muted-foreground">{p.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                      <div className="flex items-center gap-5 mt-3 text-xs text-muted-foreground font-medium">
                        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                          <ThumbsUp className="size-3.5" /> {p.likes} Likes
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                          <MessageSquare className="size-3.5" /> Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "certificates" && (
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">My Certificates</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-6 text-center transition-all ${
                      cert.unlocked ? "bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1" : "bg-muted/50 opacity-60"
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      cert.unlocked ? "bg-secondary/10" : "bg-muted"
                    }`}>
                      {cert.unlocked ? <Award className="size-8 text-secondary" /> : <Lock className="size-8 text-muted-foreground" />}
                    </div>
                    <h3 className="font-semibold text-base mb-2">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{cert.unlocked ? `Earned ${cert.date}` : `Available: ${cert.date}`}</p>
                    {cert.unlocked && (
                      <Button size="sm" variant="outline" className="gap-2 w-full">
                        <Download className="!size-4" /> Download PDF
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "settings" && (
            <div className="text-center py-20 flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <Settings className="size-16 text-muted" />
              <h2 className="text-2xl font-semibold text-foreground">Account Settings</h2>
              <p className="max-w-md">Edit your profile, manage notifications, and update your subscription preferences.</p>
              <Button onClick={() => setActiveTab("home")} variant="outline">Back to Dashboard</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Academy;
