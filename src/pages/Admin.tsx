import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  Users, Menu, Bell, Search, ArrowRight, CheckCircle2, 
  XCircle, CreditCard, Database, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo_transparent.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [activeTab, setActiveTab] = useState("users");
  const [user, setUser] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        // Normally: if (session.user.role !== 'admin') navigate('/academy');
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

  const adminLinks = [
    { id: "users", icon: Users, label: "User Management" },
    { id: "intake", icon: Database, label: "Opportunity Intake" },
    { id: "financials", icon: CreditCard, label: "Financials" },
  ];

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
        <div className="h-20 px-6 border-b flex items-center shrink-0 w-full bg-accent/30">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Star9" className="h-[24px] w-auto object-contain" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-primary">ADMIN</span>
            </Link>
          )}
        </div>
        <nav className="p-2 space-y-1">
          {adminLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveTab(l.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors border-l-2 ${
                activeTab === l.id ? "bg-accent/50 text-foreground font-medium border-primary" : "border-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <l.icon className={`size-4 shrink-0 ${activeTab === l.id ? "text-primary" : ""}`} />
              {sidebarOpen && <span>{l.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="mt-auto p-4 space-y-4">
            <Link to="/academy" className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors border border-secondary/20">
              <Briefcase className="size-4 shrink-0" />
              <span>STUDENT VIEW</span>
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase text-muted-foreground hover:bg-muted transition-colors border border-border">
              <ArrowRight className="size-4 shrink-0 rotate-180" />
              <span>LOG OUT</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b bg-card flex items-center justify-between px-4 md:px-6 shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
              <Menu className="size-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary font-bold tracking-widest">SECURE ADMIN</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="p-2 rounded-lg hover:bg-muted relative">
              <Bell className="size-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              <div className="w-8 h-8 rounded-full border border-border shrink-0 bg-primary flex items-center justify-center text-primary-foreground font-bold uppercase">
                {user?.email?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 w-full bg-background relative">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          {activeTab === "users" && (
            <div className="space-y-6 max-w-5xl relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Network Verification</h1>
                <p className="text-muted-foreground">Approve or reject user profile document submissions.</p>
              </div>

              <div className="rounded-xl border bg-card overflow-hidden glass shadow-card">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs font-mono uppercase text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Documents</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">A</div>
                          <div>
                            <p className="font-medium">Amara K.</p>
                            <p className="text-xs text-muted-foreground font-mono">amara@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Badge variant="outline">Freelancer</Badge></td>
                      <td className="px-6 py-4 text-primary text-xs underline cursor-pointer">View_Passport.pdf</td>
                      <td className="px-6 py-4"><Badge className="bg-orange-500/20 text-orange-500">Pending</Badge></td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="ghost" className="text-green-500 hover:text-green-600 hover:bg-green-500/10"><CheckCircle2 className="w-5 h-5"/></Button>
                          <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10"><XCircle className="w-5 h-5"/></Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">D</div>
                          <div>
                            <p className="font-medium">David O.</p>
                            <p className="text-xs text-muted-foreground font-mono flex items-center">david@example.com <VerificationBadge status="verified" /></p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Badge variant="outline">Student</Badge></td>
                      <td className="px-6 py-4 text-primary text-xs underline cursor-pointer">ID_Card.png</td>
                      <td className="px-6 py-4"><Badge className="bg-blue-500/20 text-blue-500">Verified</Badge></td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline" className="font-mono text-xs border-red-500/50 text-red-500 hover:bg-red-500/10">Revoke</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "intake" && (
            <div className="space-y-6 max-w-5xl relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Opportunity Intake</h1>
                <p className="text-muted-foreground">Review external Google Form submissions and publish to Global Board.</p>
              </div>

              <Card className="glass border-border/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-secondary/20 text-secondary mb-2">Work Abroad - Pending</Badge>
                      <CardTitle>Software Engineer in Berlin</CardTitle>
                      <CardDescription>Submitted by TechCorp EU • 2 hours ago</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm bg-background/50 p-6 rounded-md mx-6 border">
                  <div><strong className="text-muted-foreground">Description:</strong> We are looking for 3 mid-level engineers willing to relocate to Germany. Visa sponsorship provided.</div>
                  <div><strong className="text-muted-foreground">External Link:</strong> <a className="text-primary underline" href="#">https://forms.gle/xyz</a></div>
                </CardContent>
                <CardFooter className="mt-4 gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-widest text-xs">Publish to Global Board</Button>
                  <Button variant="outline" className="text-red-500 hover:text-red-600 font-mono uppercase tracking-widest text-xs border-red-500/20">Reject Spam</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "financials" && (
            <div className="space-y-6 max-w-5xl relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Financials & Invoicing</h1>
                <p className="text-muted-foreground">Track, generate and view user invoices.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                 <Card className="glass"><CardContent className="p-6"><p className="text-muted-foreground text-sm font-mono uppercase mb-1">Total Revenue</p><h2 className="text-3xl font-bold">$14,250</h2></CardContent></Card>
                 <Card className="glass"><CardContent className="p-6"><p className="text-muted-foreground text-sm font-mono uppercase mb-1">Pending Invoices</p><h2 className="text-3xl font-bold">12</h2></CardContent></Card>
                 <Card className="glass border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors"><CardContent className="p-6 flex items-center justify-between h-full"><span className="font-mono text-sm tracking-widest uppercase font-bold text-primary">Generate<br/>Invoice</span> <CreditCard className="w-8 h-8 text-primary/50" /></CardContent></Card>
              </div>

              <div className="rounded-xl border bg-card overflow-hidden glass">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs font-mono uppercase text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Invoice ID</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-xs">INV-2026-001</td>
                      <td className="px-6 py-4">Amara K.</td>
                      <td className="px-6 py-4 font-mono font-bold">$299.00</td>
                      <td className="px-6 py-4"><Badge className="bg-green-500/20 text-green-500">Paid</Badge></td>
                      <td className="px-6 py-4 text-right text-muted-foreground font-mono text-xs">Oct 24, 2026</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-xs">INV-2026-002</td>
                      <td className="px-6 py-4">David O.</td>
                      <td className="px-6 py-4 font-mono font-bold">$450.00</td>
                      <td className="px-6 py-4"><Badge className="bg-orange-500/20 text-orange-500">Pending</Badge></td>
                      <td className="px-6 py-4 text-right text-muted-foreground font-mono text-xs">Oct 26, 2026</td>
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

export default Admin;
