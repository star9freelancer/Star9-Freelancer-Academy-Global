import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  Home, BookOpen, Users, Award, Settings, Menu, Bell, Search, 
  ArrowRight, Download, Play, Clock, TrendingUp, Sparkles, 
  CheckCircle2, XCircle, FileText, Globe, Link as LinkIcon, 
  CreditCard, UploadCloud, BadgeCheck, Briefcase, Cpu, Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/assets/logo_transparent.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Verification Badge Component
const VerificationBadge = ({ status }: { status: "verified" | "pending" | "rejected" | string }) => {
  if (status !== 'verified') return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BadgeCheck className="w-5 h-5 text-blue-500 inline-block ml-1 fill-blue-500/20" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Verified Profile</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// AI Tool Showcase Component
const AIToolShowcase = ({ tools }: { tools: string[] }) => {
  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <p className="text-xs font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2">
        <Cpu className="w-3 h-3 text-secondary" /> Empowered by AI Tools
      </p>
      <div className="flex flex-wrap gap-2">
        {tools.map(tool => (
          <TooltipProvider key={tool}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-accent/50 border border-border/50 hover:border-secondary/50 cursor-pointer transition-colors">
                  <Sparkles className="w-3 h-3 text-secondary" />
                  <span className="text-[10px] font-mono font-bold tracking-wider">{tool}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Master {tool} in this module</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

const Academy = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<any>(null);
  
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "pending">("verified");

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const studentLinks = [
    { id: "profile", icon: Users, label: "My Profile" },
    { id: "academy", icon: BookOpen, label: "My Academy" },
    { id: "certificates", icon: Award, label: "My Certificates" },
    { id: "applications", icon: Briefcase, label: "My Applications" },
  ];

  const sidebarLinks = studentLinks;

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
              <img src={logo} alt="Star9" className="h-[48px] w-auto object-contain" />
            </Link>
          )}
        </div>
        <nav className="p-2 space-y-1">
          {sidebarLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveTab(l.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors border-l-2 ${
                activeTab === l.id ? "bg-accent/50 text-foreground font-medium border-secondary" : "border-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <l.icon className={`size-4 shrink-0 ${activeTab === l.id ? "text-primary" : ""}`} />
              {sidebarOpen && <span>{l.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="mt-auto p-4 space-y-4">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase text-muted-foreground hover:bg-muted transition-colors border border-border">
              <ArrowRight className="size-4 shrink-0 rotate-180" />
              <span>LOG OUT</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-20 border-b bg-card flex items-center justify-between px-4 md:px-6 shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
              <Menu className="size-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <Search className="size-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-48" />
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="p-2 rounded-lg hover:bg-muted relative">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              <div className="w-8 h-8 rounded-full border border-border shrink-0 bg-primary/20 flex items-center justify-center text-primary font-bold uppercase">
                {user?.email?.charAt(0) || "U"}
              </div>
              <span className="hidden sm:inline text-sm font-medium flex items-center">
                {user?.email?.split('@')[0] || "User"}
                <VerificationBadge status={verificationStatus} />
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 w-full bg-background relative">
          {/* Subtle glow effect */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          {/* ----- USER / STUDENT VIEWS ----- */}
          {activeTab === "profile" && (
            <div className="space-y-6 max-w-4xl relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">Manage your verifiable documents, social links, and financials.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-mono text-sm tracking-widest uppercase">Identity & Documents</CardTitle>
                    <CardDescription>Upload your resume and certificates.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Resume_2026.pdf</p>
                          <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-dashed hover:bg-accent/50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <UploadCloud className="w-5 h-5" />
                        <span className="text-sm">Click to upload new document</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-mono text-sm tracking-widest uppercase">Social Presence</CardTitle>
                    <CardDescription>Link your portfolios and network.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs">LinkedIn URL</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-9 bg-background/50" defaultValue="https://linkedin.com/in/username" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Portfolio / Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-9 bg-background/50" defaultValue="https://myportfolio.dev" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 glass shadow-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-mono text-sm tracking-widest uppercase">Payment Accounts</CardTitle>
                    <CardDescription>Securely add your payout methods for Star9 Freelancer roles.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-xl bg-background flex flex-col items-center justify-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">M</div>
                      <p className="font-bold text-sm">M-Pesa</p>
                      <Badge variant="outline" className="text-[10px]">Connected</Badge>
                    </div>
                    <div className="p-4 border rounded-xl bg-background flex flex-col items-center justify-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">P</div>
                      <p className="font-bold text-sm">PayPal</p>
                      <Badge variant="secondary" className="text-[10px] bg-muted">Not linked</Badge>
                    </div>
                    <div className="p-4 border rounded-xl bg-background flex flex-col items-center justify-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CreditCard className="w-5 h-5"/></div>
                      <p className="font-bold text-sm">Wise Transfer</p>
                      <Badge variant="secondary" className="text-[10px] bg-muted">Not linked</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "academy" && (
            <div className="space-y-6 relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Academy</h1>
                <p className="text-muted-foreground">Continue learning and mastering your craft.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Course 1: AI Tools */}
                <Card className="glass border-border/50 shadow-card hover:shadow-card-hover transition-all flex flex-col">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-primary/20 text-primary hover:bg-primary/30">AI for Freelancers</Badge>
                    <CardTitle>Supercharged Workflows</CardTitle>
                    <CardDescription>Master generative AI to 10x your output.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1 font-mono uppercase"><span>Progress</span><span>75%</span></div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary w-[75%]" />
                      </div>
                    </div>
                    {/* The specialized AI Tools Showcase */}
                    <div className="mt-auto">
                      <AIToolShowcase tools={["ChatGPT Plus", "Midjourney", "Perplexity", "Cursor"]} />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button className="w-full font-mono uppercase text-xs tracking-widest gap-2">Resume Module <Play className="w-3 h-3" /></Button>
                  </CardFooter>
                </Card>

                {/* Course 2 */}
                <Card className="glass border-border/50 shadow-card hover:shadow-card-hover transition-all flex flex-col">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-secondary/20 text-secondary hover:bg-secondary/30">Freelancing</Badge>
                    <CardTitle>Scaling Your Agency</CardTitle>
                    <CardDescription>From individual contractor to business owner.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1 font-mono uppercase"><span>Progress</span><span>40%</span></div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[40%]" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full font-mono uppercase text-xs tracking-widest gap-2">Resume Module <Play className="w-3 h-3" /></Button>
                  </CardFooter>
                </Card>

                {/* Course 3: Completed */}
                <Card className="glass border-border/50 shadow-card flex flex-col opacity-80 filter saturate-50">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500/20 text-green-500">Corporate Training</Badge>
                    <CardTitle>Enterprise Security</CardTitle>
                    <CardDescription>Remote data compliance protocols.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1 font-mono text-green-500 uppercase"><span>Completed</span><span>100%</span></div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-full" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 gap-2">
                    <Button variant="outline" className="flex-1 font-mono uppercase text-xs tracking-widest border-green-500/30 text-green-500 hover:bg-green-500/10">Review</Button>
                    <Button className="flex-1 font-mono uppercase text-xs tracking-widest bg-green-500 hover:bg-green-600 text-white gap-2" onClick={() => setActiveTab("certificates")}><Award className="w-3 h-3" /> Claim</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
                  <p className="text-muted-foreground">View and download your earned immutable credentials.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg border border-border">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="font-mono text-sm tracking-widest uppercase font-bold text-foreground">Earned: 1</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass overflow-hidden group shadow-card hover:shadow-card-hover transition-all">
                  {/* Decorative Certificate Background Pattern */}
                  <div className="h-32 bg-gradient-to-r from-green-500/20 to-primary/20 relative flex items-center justify-center p-6 border-b border-border/50">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                    <Award className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-500 z-10" />
                  </div>
                  <CardHeader className="text-center pt-6">
                    <Badge className="mx-auto mb-2 bg-green-500/10 text-green-500">Verified Credential</Badge>
                    <CardTitle className="text-2xl font-serif">Enterprise Security</CardTitle>
                    <CardDescription className="font-mono mt-2 text-xs">Issued on October 1st, 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">Certifies successfully completing all remote data compliance protocol examinations on the Star9 Network.</p>
                    <div className="mt-6 p-3 bg-background/50 rounded flex justify-between items-center text-xs font-mono">
                      <span className="text-muted-foreground">ID: ST9-8472-CERT</span>
                      <a href="#" className="text-primary hover:underline">Verify</a>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 pt-4 flex gap-3">
                    <Button className="flex-1 font-mono uppercase tracking-widest text-xs gap-2" variant="outline"><Globe className="w-4 h-4"/> Add to LinkedIn</Button>
                    <Button className="flex-1 font-mono uppercase tracking-widest text-xs gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 border"><Download className="w-4 h-4"/> Download PDF</Button>
                  </CardFooter>
                </Card>

                {/* Placeholder for future certs */}
                <Card className="glass border-dashed shadow-none flex flex-col items-center justify-center text-center p-12 opacity-50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-secondary/5 group-hover:to-secondary/10 transition-colors pointer-events-none" />
                  <Award className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-mono uppercase tracking-widest font-bold mb-2">Awaiting Credential</h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">Complete additional courses in My Academy to unlock more certificates.</p>
                  <Button variant="outline" className="mt-6 font-mono text-xs uppercase tracking-widest bg-background/50" onClick={() => setActiveTab("academy")}>View Academy</Button>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-6 max-w-5xl relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
                <p className="text-muted-foreground">Track roles and study programs from the Global network.</p>
              </div>

              <div className="rounded-xl border bg-card overflow-hidden glass">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs font-mono uppercase text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Opportunity</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Date Applied</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">Senior UI Designer @ TechNova</td>
                      <td className="px-6 py-4"><Badge variant="outline">Remote Work</Badge></td>
                      <td className="px-6 py-4 font-mono text-muted-foreground">Oct 24, 2026</td>
                      <td className="px-6 py-4"><Badge className="bg-blue-500/20 text-blue-500">In Review</Badge></td>
                      <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">View</Button></td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">BSc Computer Science @ UCT</td>
                      <td className="px-6 py-4"><Badge variant="outline">Study Abroad</Badge></td>
                      <td className="px-6 py-4 font-mono text-muted-foreground">Oct 20, 2026</td>
                      <td className="px-6 py-4"><Badge className="bg-secondary/20 text-secondary">Accepted</Badge></td>
                      <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">View</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Academy;
