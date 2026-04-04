import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  Users, Menu, Bell, Search, ArrowRight, CheckCircle2, 
  XCircle, CreditCard, Database, Briefcase, Flame, Award, 
  Trash2, ShieldCheck, Mail, Plus, Filter, LayoutGrid, BookOpen,
  Globe, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo_transparent.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Verification Badge Component
const VerificationBadge = ({ status }: { status: "verified" | "pending" | "rejected" | string }) => {
  if (status !== 'verified') return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-4 h-4 bg-blue-500 rounded-full inline-flex items-center justify-center ml-1 text-[8px] text-white">✓</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Verified Profile</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  
  // New Management State
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loadingOpportunities, setLoadingOpportunities] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalOpportunities: 0,
    pendingVerifications: 0
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        fetchAllData();
      }
    });
  }, []);

  const fetchAllData = async () => {
    setLoadingStudents(true);
    setLoadingCourses(true);
    setLoadingOpportunities(true);
    setLoadingInvoices(true);

    try {
      // 1. Fetch Users
      const { data: userData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (userData) setStudents(userData);

      // 2. Fetch Courses
      const { data: courseData } = await supabase.from('academy_courses').select('*').order('created_at', { ascending: false });
      if (courseData) setCourses(courseData);

      // 3. Fetch Opportunities
      const { data: oppData } = await supabase.from('global_opportunities').select('*').order('created_at', { ascending: false });
      if (oppData) setOpportunities(oppData);

      // 4. Fetch Invoices
      const { data: invData } = await supabase.from('invoices').select('*').order('created_at', { ascending: false });
      if (invData) setInvoices(invData);

      // 5. Calculate Stats
      setStats({
        totalUsers: userData?.length || 0,
        totalCourses: courseData?.length || 0,
        totalOpportunities: oppData?.length || 0,
        pendingVerifications: userData?.filter(u => u.verification_status === 'pending').length || 0
      });
    } finally {
      setLoadingStudents(false);
      setLoadingCourses(false);
      setLoadingOpportunities(false);
      setLoadingInvoices(false);
    }
  };

  const setVerification = async (studentId: string, status: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ verification_status: status })
      .eq('id', studentId);
    
    if (!error) {
      toast.success(`Access updated to ${status}`);
      fetchAllData();
    }
  };

  const updateRole = async (studentId: string, role: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', studentId);
    
    if (!error) {
      toast.success(`Role updated to ${role}`);
      fetchAllData();
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    const { error } = await supabase.from('academy_courses').delete().eq('id', id);
    if (!error) {
      toast.success("Course purged from network");
      fetchAllData();
    }
  };

  const handleDeleteOpportunity = async (id: string) => {
    if (!confirm("Are you sure you want to remove this opportunity?")) return;
    const { error } = await supabase.from('global_opportunities').delete().eq('id', id);
    if (!error) {
      toast.success("Opportunity de-listed");
      fetchAllData();
    }
  };

  const handleCreateCourse = async () => {
    const title = prompt("Enter Course Title:");
    if (!title) return;
    const { error } = await supabase.from('academy_courses').insert([{ 
      title, 
      category: 'Freelancing', 
      status: 'draft' 
    }]);
    if (!error) {
      toast.success("New Academy Module Uploaded");
      fetchAllData();
    }
  };

  const handleCreateOpportunity = async () => {
    const employer = prompt("Enter Employer Name:");
    if (!employer) return;
    const { error } = await supabase.from('global_opportunities').insert([{ 
      employer_name: employer, 
      opportunity_category: 'Remote Work', 
      application_link: 'https://',
      status: 'open' 
    }]);
    if (!error) {
      toast.success("New Opportunity Ingested");
      fetchAllData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const adminLinks = [
    { id: "dashboard", icon: LayoutGrid, label: "Command Center" },
    { id: "users", icon: Users, label: "User Access" },
    { id: "courses", icon: BookOpen, label: "Academy HQ" },
    { id: "intake", icon: Database, label: "Global Jobs" },
    { id: "financials", icon: CreditCard, label: "Fiscal Ledger" },
  ];

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden font-sans">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:w-20 md:translate-x-0"} absolute md:relative z-50 h-full flex flex-col transition-all duration-500 border-r bg-card/60 backdrop-blur-xl shrink-0 overflow-hidden`}>
        <div className="h-24 px-6 flex items-center justify-center shrink-0 w-full bg-accent/20 border-b border-primary/10">
          {sidebarOpen ? (
            <Link to="/" className="flex flex-col items-center gap-1 group">
              <img src={logo} alt="Star9" className="h-[28px] w-auto object-contain brightness-110" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-black text-primary/80 group-hover:text-primary transition-colors">Infrastructure Admin</span>
            </Link>
          ) : (
            <ShieldCheck className="size-6 text-primary animate-pulse" />
          )}
        </div>
        <nav className="p-3 space-y-2">
          {adminLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveTab(l.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all border ${
                activeTab === l.id 
                  ? "bg-primary text-primary-foreground font-bold border-primary shadow-lg shadow-primary/20" 
                  : "border-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <l.icon className={`size-4 shrink-0 ${activeTab === l.id ? "text-white" : ""}`} />
              {sidebarOpen && <span>{l.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="mt-auto p-4 space-y-4">
            <Link to="/academy" className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-[10px] font-mono tracking-widest uppercase bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all border border-secondary/20">
              <Briefcase className="size-4 shrink-0" />
              <span>TERMINAL VIEW</span>
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:bg-muted transition-colors border border-border">
              <ArrowRight className="size-4 shrink-0 rotate-180" />
              <span>LOG OUT</span>
            </button>
          </div>
        )}
      </aside>

      {/* Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-24 border-b bg-card/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10 relative">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 rounded-xl hover:bg-muted transition-all border border-transparent hover:border-border">
              <Menu className="size-5" />
            </button>
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
              <Search className="size-4 text-zinc-500" />
              <input type="text" placeholder="Global CID Search..." className="bg-transparent text-xs font-mono outline-none w-64 uppercase tracking-widest" />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
               <Flame className="size-4 text-secondary fill-secondary" />
               <span className="text-xs font-mono font-bold text-secondary">ACTIVE PROTOCOLS</span>
             </div>
             <button className="p-2.5 rounded-xl hover:bg-muted relative transition-all">
               <Bell className="size-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-ping" />
             </button>
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-sm uppercase shadow-lg shadow-primary/20">
               {user?.email?.charAt(0) || "A"}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 w-full bg-background relative overflow-x-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          {activeTab === "users" && (
            <div className="space-y-8 max-w-6xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 py-0.5 font-mono text-[10px] tracking-widest uppercase">Admin Terminal</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter uppercase leading-none">Network Authentication</h1>
                  <p className="text-muted-foreground mt-2 font-medium">Verify credentials and manage student study streaks across the Star9 Network.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="font-mono text-[10px] uppercase tracking-widest" onClick={fetchStudents}>Resync Students</Button>
                  <Button className="font-mono text-[10px] uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground">Generate Report</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass border-border/50 bg-gradient-to-br from-card to-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Total Personnel</CardTitle>
                    <h3 className="text-4xl font-bold">{students.length}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-green-500 font-mono">
                      <ArrowRight className="size-3 rotate-[-45deg]" /> +12% from last cycle
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass border-border/50 bg-gradient-to-br from-card to-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Highest Network Streak</CardTitle>
                    <h3 className="text-4xl font-bold text-secondary">42 Days</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase">
                      <Award className="size-3" /> Record held by user_8472
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass border-border/50 bg-gradient-to-br from-card to-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Pending Verifications</CardTitle>
                    <h3 className="text-4xl font-bold text-orange-500">{students.filter(s => s.verification_status === 'pending').length}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono uppercase underline cursor-pointer hover:text-orange-500 transition-colors">
                      Begin Auth Protocol
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-2xl border bg-card/30 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden glass">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-900/80 border-b border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      <tr>
                        <th className="px-6 py-5">Personnel ID</th>
                        <th className="px-6 py-5">Role</th>
                        <th className="px-6 py-5">Study Streak</th>
                        <th className="px-6 py-5">Auth Status</th>
                        <th className="px-6 py-5 text-right">Command</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {loadingStudents ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center animate-pulse font-mono text-xs uppercase tracking-widest">Scanning Network...</td></tr>
                      ) : students.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No personnel detected in the local network.</td></tr>
                      ) : students.map((std) => (
                        <tr key={std.id} className="hover:bg-zinc-800/20 transition-all duration-300 group">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-accent border border-border/50 flex items-center justify-center font-black group-hover:border-primary/50 transition-colors">
                                {std.email?.charAt(0).toUpperCase()}
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{std.full_name || std.email?.split('@')[0]}</p>
                                <div className="flex items-center gap-2">
                                  <Mail className="size-3 text-muted-foreground" />
                                  <p className="text-[10px] text-muted-foreground font-mono">{std.email}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <Badge variant="outline" className="border-secondary/20 bg-secondary/5 text-secondary uppercase font-mono text-[9px] tracking-widest">{std.role}</Badge>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <Flame className="size-4 text-secondary fill-secondary" />
                                <span className="text-sm font-black font-mono">{std.current_streak || 0}</span>
                              </div>
                              <div className="h-4 w-px bg-border hidden sm:block" />
                              <span className="text-[10px] text-muted-foreground font-mono hidden sm:block">MAX: {std.longest_streak || 0}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {std.verification_status === 'verified' ? (
                              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 rounded-full py-0.5 font-mono text-[10px] tracking-widest flex items-center w-fit gap-1"><ShieldCheck className="size-3" /> VERIFIED</Badge>
                            ) : std.verification_status === 'pending' ? (
                              <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 rounded-full py-0.5 font-mono text-[10px] tracking-widest w-fit">PENDING AUTH</Badge>
                            ) : (
                              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 rounded-full py-0.5 font-mono text-[10px] tracking-widest w-fit">RESTRICTED</Badge>
                            )}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {std.verification_status !== 'verified' ? (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="icon" variant="ghost" className="rounded-full text-green-500 hover:bg-green-500/10 border border-transparent hover:border-green-500/20" onClick={() => setVerification(std.id, 'verified')}>
                                        <CheckCircle2 className="size-5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Authorize Access</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ) : (
                                <Button variant="ghost" size="sm" className="text-[9px] font-mono tracking-widest uppercase hover:text-red-500 transition-colors" onClick={() => setVerification(std.id, 'pending')}>Revoke Auth</Button>
                              )}
                              <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10">
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "intake" && (
            <div className="space-y-6 max-w-5xl mx-auto relative z-10 py-12 text-center border-2 border-dashed rounded-3xl border-primary/20 bg-primary/5">
              <Database className="size-16 text-primary/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tighter">Opportunity Ingestion Subsystem</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Connecting to external decentralized submission nodes. Check back once synchronization is complete.</p>
              <Button className="mt-8 font-mono text-xs uppercase tracking-widest">Force Re-sync</Button>
            </div>
          )}

          {activeTab === "financials" && (
            <div className="space-y-8 max-w-6xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-end justify-between">
                 <div>
                   <Badge className="mb-2 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 py-0.5 font-mono text-[10px] tracking-widest uppercase">Fiscal Intelligence</Badge>
                   <h1 className="text-4xl font-bold tracking-tighter uppercase leading-none">Global Ledger</h1>
                   <p className="text-muted-foreground mt-2 font-medium">Monitoring revenue streams and network-wide billing cycles.</p>
                 </div>
                 <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] uppercase tracking-[0.2em] px-8 py-6 rounded-2xl shadow-xl shadow-emerald-500/20">Generate Fiscal Report</Button>
               </div>

               <div className="grid md:grid-cols-4 gap-6">
                 <Card className="glass border-border/50 p-8 h-48 flex flex-col justify-between">
                   <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Total Managed</p>
                   <h2 className="text-5xl font-black tracking-tighter">${invoices.reduce((acc, inv) => acc + (inv.amount || 0), 0).toLocaleString()}</h2>
                   <div className="text-[10px] font-mono text-green-500 uppercase">Live Network Revenue</div>
                 </Card>
                 <Card className="glass border-border/50 p-8 h-48 flex flex-col justify-between">
                   <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Pending Payouts</p>
                   <h2 className="text-5xl font-black tracking-tighter">{invoices.filter(i => i.status === 'pending').length}</h2>
                   <div className="text-[10px] font-mono text-secondary uppercase tracking-[0.2em]">Action Required</div>
                 </Card>
                 <Card className="glass border-primary/20 bg-primary/10 p-8 h-48 flex flex-col justify-center items-center gap-4 group cursor-pointer" onClick={() => toast.info("Invoice Generator Offline", { description: "Use external billing protocol for current cycle." })}>
                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform">
                     <Plus className="size-6" />
                   </div>
                   <p className="font-mono text-xs font-black uppercase tracking-widest text-primary">New Invoice</p>
                 </Card>
                 <Card className="glass border-border/50 p-8 h-48 flex flex-col justify-between opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                   <Activity className="size-6 text-zinc-500" />
                   <h4 className="font-mono text-[10px] uppercase tracking-widest">Audit Logs</h4>
                   <p className="text-[9px] text-muted-foreground uppercase leading-tight">Encryption Key Required for access.</p>
                 </Card>
               </div>

               <div className="rounded-2xl border bg-card/30 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden glass">
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                     <thead className="bg-zinc-900/80 border-b border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                       <tr>
                         <th className="px-6 py-5">Transaction ID</th>
                         <th className="px-6 py-5">Entity</th>
                         <th className="px-6 py-5">Amount</th>
                         <th className="px-6 py-5">Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-border/20">
                       {loadingInvoices ? (
                         <tr><td colSpan={4} className="px-6 py-12 text-center animate-pulse font-mono text-xs uppercase tracking-widest">Accessing Ledger...</td></tr>
                       ) : invoices.length === 0 ? (
                         <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No recent transactions detected.</td></tr>
                       ) : invoices.map((inv) => (
                         <tr key={inv.id} className="hover:bg-zinc-800/20 transition-all duration-300">
                           <td className="px-6 py-5 font-mono text-[10px] uppercase">{inv.id.substring(0, 8)}</td>
                           <td className="px-6 py-5 font-bold uppercase tracking-tight">Personnel_UID_{inv.user_id.substring(0,4)}</td>
                           <td className="px-6 py-5 font-black text-emerald-500">${inv.amount}</td>
                           <td className="px-6 py-5">
                              <Badge className={`px-2 py-0.5 font-mono text-[9px] rounded-full uppercase tracking-widest ${inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>{inv.status}</Badge>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
