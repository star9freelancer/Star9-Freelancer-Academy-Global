import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, Users, Award, Settings, Menu, Bell, Search, Download, MessageSquare, ThumbsUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const courses = [
  { id: 1, title: "AI Tools for Freelancers", progress: 72, modules: 12, completed: 8, category: "AI & Automation" },
  { id: 2, title: "Scaling Your Freelance Business", progress: 45, modules: 10, completed: 4, category: "Business" },
  { id: 3, title: "Advanced Prompt Engineering", progress: 20, modules: 8, completed: 1, category: "AI & Automation" },
];

const communityPosts = [
  { user: "Amara K.", avatar: "AK", time: "2h ago", text: "Just landed my first $500 gig using the pitch template from Module 4! 🎉", likes: 24 },
  { user: "David O.", avatar: "DO", time: "4h ago", text: "Anyone else struggling with the Midjourney section? Would love a study group.", likes: 8 },
  { user: "Fatima Z.", avatar: "FZ", time: "6h ago", text: "Completed the AI Tools certification! The ChatGPT workflow section was 🔥", likes: 31 },
];

const certificates = [
  { title: "AI Tools Fundamentals", date: "Feb 2026", unlocked: true },
  { title: "Freelance Business Basics", date: "Jan 2026", unlocked: true },
  { title: "Advanced Prompt Engineering", date: "—", unlocked: false },
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
      <circle cx="44" cy="44" r={r} fill="none" strokeWidth="6" className="stroke-muted" />
      <circle
        cx="44" cy="44" r={r} fill="none" strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        className="stroke-primary transition-all duration-700"
        transform="rotate(-90 44 44)"
      />
      <text x="44" y="44" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-sm font-bold">
        {percent}%
      </text>
    </svg>
  );
};

const Academy = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 md:w-16"} transition-all duration-300 border-r bg-card shrink-0 overflow-hidden`}>
        <div className="p-4 border-b flex items-center gap-2">
          {sidebarOpen && <img src={logo} alt="Star9" className="h-8 w-auto" />}
        </div>
        <nav className="p-2 space-y-1">
          {sidebarLinks.map((l) => (
            <button
              key={l.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                l.active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <l.icon className="size-4 shrink-0" />
              {sidebarOpen && <span>{l.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
              <Menu className="size-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <Search className="size-4 text-muted-foreground" />
              <input type="text" placeholder="Search courses..." className="bg-transparent text-sm outline-none w-48" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-muted relative">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                EN
              </div>
              <span className="hidden md:inline text-sm font-medium">Esther N.</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Esther! 👋</h1>
            <p className="text-muted-foreground mt-1">Continue where you left off or explore new courses.</p>
          </div>

          {/* Active Courses */}
          <section>
            <h2 className="text-lg font-semibold mb-4">My Active Courses</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
                  <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded-md self-start mb-3">{c.category}</span>
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{c.completed} of {c.modules} modules completed</p>
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

          {/* Community Feed */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Community Feed</h2>
            <div className="space-y-3">
              {communityPosts.map((p, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 flex gap-3 hover:shadow-card transition-all">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {p.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{p.user}</span>
                      <span className="text-xs text-muted-foreground">{p.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ThumbsUp className="size-3" /> {p.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageSquare className="size-3" /> Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-lg font-semibold mb-4">My Certificates</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {certificates.map((cert, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-5 text-center transition-all ${
                    cert.unlocked ? "bg-card shadow-card" : "bg-muted/50 opacity-60"
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    cert.unlocked ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                  }`}>
                    <Award className="size-8" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{cert.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{cert.unlocked ? `Earned ${cert.date}` : "In Progress"}</p>
                  {cert.unlocked && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="!size-3" /> Download PDF
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Academy;
