import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import {
  Users as UsersIcon, 
  Search as SearchIcon, 
  ArrowRight as ArrowRightIcon, 
  CheckCircle2 as CheckCircle2Icon,
  XCircle as XCircleIcon, 
  CreditCard as CreditCardIcon, 
  Briefcase as BriefcaseIcon,
  Trash2 as Trash2Icon, 
  ShieldCheck as ShieldCheckIcon, 
  Mail as MailIcon, 
  Plus as PlusIcon, 
  BookOpen as BookOpenIcon,
  Play as PlayIcon, 
  LayoutGrid as LayoutGridIcon, 
  MessageSquare as MessageSquareIcon, 
  Eye as EyeIcon, 
  EyeOff as EyeOffIcon, 
  LogOut as LogOutIcon,
  FileText as FileTextIcon, 
  Download as DownloadIcon, 
  UserCheck as UserCheckIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo_transparent.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet";

const VerificationBadge = ({ status }: { status: string }) => {
  if (status !== 'verified') return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-4 h-4 bg-blue-500 rounded-full inline-flex items-center justify-center ml-1 text-[8px] text-white">&#10003;</div>
        </TooltipTrigger>
        <TooltipContent><p>Verified Profile</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Admin = () => {
  const { user: authUser, isAdmin, loading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loadingOpportunities, setLoadingOpportunities] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [newLesson, setNewLesson] = useState<any>({ title: "", type: "video", url: "", content: "" });
  const [userSearch, setUserSearch] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0, totalCourses: 0, totalOpportunities: 0,
    pendingVerifications: 0, unreadMessages: 0, totalRevenue: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && authUser) {
      fetchAllData();
    }
  }, [authLoading, authUser]);

  const fetchAllData = async () => {
    setLoadingStudents(true); setLoadingCourses(true);
    setLoadingOpportunities(true); setLoadingInvoices(true);
    setLoadingMessages(true);

    try {
      const [usersRes, coursesRes, jobsRes, invRes, msgRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('academy_courses').select('*').order('created_at', { ascending: false }),
        supabase.from('academy_jobs').select('*').order('posted_at', { ascending: false }),
        supabase.from('invoices').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(50),
      ]);

      const userData = usersRes.data || [];
      const courseData = coursesRes.data || [];
      const jobData = jobsRes.data || [];
      const invData = invRes.data || [];
      const msgData = msgRes.data || [];

      setStudents(userData);
      setCourses(courseData);
      setOpportunities(jobData);
      setInvoices(invData);
      setContactMessages(msgData);

      setStats({
        totalUsers: userData.length,
        totalCourses: courseData.length,
        totalOpportunities: jobData.length,
        pendingVerifications: userData.filter(u => u.verification_status === 'pending').length,
        unreadMessages: msgData.filter((m: any) => !m.is_read).length,
        totalRevenue: invData.reduce((acc: number, inv: any) => acc + (inv.amount || 0), 0),
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoadingStudents(false); setLoadingCourses(false);
      setLoadingOpportunities(false); setLoadingInvoices(false);
      setLoadingMessages(false);
    }
  };

  const setVerification = async (studentId: string, status: string) => {
    const { error } = await supabase.from('profiles').update({ verification_status: status }).eq('id', studentId);
    if (!error) { toast.success(`Status updated to ${status}`); fetchAllData(); }
    else toast.error("Failed to update", { description: error.message });
  };

  const updateRole = async (studentId: string, role: string) => {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', studentId);
    if (!error) { toast.success(`Role updated to ${role}`); fetchAllData(); }
    else toast.error("Failed to update", { description: error.message });
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    const { error } = await supabase.from('academy_courses').delete().eq('id', id);
    if (!error) { toast.success("Course deleted"); fetchAllData(); }
  };

  const handleDeleteOpportunity = async (id: string) => {
    if (!confirm("Remove this opportunity?")) return;
    const { error } = await supabase.from('academy_jobs').delete().eq('id', id);
    if (!error) { toast.success("Opportunity removed"); fetchAllData(); }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure? This will permanently remove the user and all their associated data across the global infrastructure.")) return;
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (!error) {
      toast.success("User purged successfully");
      fetchAllData();
    } else {
      toast.error("Cleanup failed", { description: error.message });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) { 
      toast.success("Message removed");
      setContactMessages(prev => prev.filter(m => m.id !== id));
      fetchAllData();
    }
  };

  const handleSaveCourse = async () => {
    if (!editingCourse.title) return toast.error("Course title required");
    setLoadingCourses(true);
    const { data: upsertData, error } = await supabase
      .from('academy_courses')
      .upsert({ ...editingCourse, updated_at: new Date().toISOString() })
      .select('id, title').single();

    if (!error && upsertData) {
      const { data: existingGroup } = await supabase.from('chat_groups').select('id').eq('course_id', upsertData.id).single();
      if (!existingGroup) {
        await supabase.from('chat_groups').insert({ name: upsertData.title, type: 'course', course_id: upsertData.id });
      }
      toast.success("Course saved successfully");
      setEditingCourse(null); fetchAllData();
    } else {
      toast.error("Failed to save", { description: error?.message });
    }
    setLoadingCourses(false);
  };

  const addLesson = () => {
    if (!newLesson.title) return;
    const lessons = [...(editingCourse.lessons || []), { ...newLesson, id: crypto.randomUUID() }];
    setEditingCourse({ ...editingCourse, lessons });
    setNewLesson({ title: "", type: "video", url: "", content: "" });
  };

  const removeLesson = (id: string) => {
    const lessons = (editingCourse.lessons || []).filter((l: any) => l.id !== id);
    setEditingCourse({ ...editingCourse, lessons });
  };

  const handleCreateOpportunity = async () => {
    const title = prompt("Enter Job Title:");
    if (!title) return;
    const company = prompt("Enter Company Name:");
    if (!company) return;
    const { error } = await supabase.from('academy_jobs').insert([{ title, company, type: 'Remote Work', application_url: 'https://', is_active: true }]);
    if (!error) { toast.success("Opportunity added"); fetchAllData(); }
  };

  const markMessageRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('contact_messages').update({ is_read: !currentStatus }).eq('id', id);
    if (!error) {
      setContactMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m));
      setStats(s => ({ ...s, unreadMessages: s.unreadMessages + (currentStatus ? 1 : -1) }));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const filteredStudents = students.filter(s =>
    userSearch === "" ||
    s.full_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    s.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const adminLinks = [
    { id: "dashboard", icon: LayoutGridIcon, label: "Dashboard" },
    { id: "users", icon: UsersIcon, label: "Users" },
    { id: "verifications", icon: UserCheckIcon, label: "Verify" },
    { id: "courses", icon: BookOpenIcon, label: "Courses" },
    { id: "intake", icon: BriefcaseIcon, label: "Jobs" },
    { id: "messages", icon: MessageSquareIcon, label: "Messages" },
    { id: "financials", icon: CreditCardIcon, label: "Finances" },
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white pb-32 md:pb-0">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute hidden md:block top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute hidden md:block bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation - hidden on mobile */}
      <div className="hidden md:flex fixed top-0 inset-x-0 z-50 justify-center p-4 md:p-6 transition-all duration-500 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-lg max-w-full overflow-x-auto no-scrollbar pointer-events-auto"
        >
          {/* Logo */}
          <Link to="/" className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
            <img src={logo} alt="Star9" className="h-7 w-auto" />
          </Link>

          <div className="h-6 w-px bg-border mx-1 shrink-0" />

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border focus-within:border-primary/40 transition-all group w-48 shrink-0">
            <SearchIcon className="size-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search admin..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="hidden lg:block h-6 w-px bg-border mx-1 shrink-0" />

          {/* Navigation Links */}
          <div className="flex items-center gap-1 shrink-0">
            {adminLinks.map((l) => {
              const isActive = activeTab === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveTab(l.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="admin-pill-bg"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full" 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <l.icon className="size-4 shrink-0" />
                    <span className="font-medium whitespace-nowrap">{l.label}</span>
                    {l.id === "messages" && stats.unreadMessages > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-destructive text-[10px] text-destructive-foreground">
                        {stats.unreadMessages}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="h-6 w-px bg-border mx-1 shrink-0" />
          
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/academy" title="Back to Academy" className="w-9 h-9 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
              <ArrowRightIcon className="size-4 rotate-180" />
            </Link>
            <button onClick={handleLogout} title="Log Out" className="w-9 h-9 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all">
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Bottom Dock */}
      <div className="md:hidden fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="flex items-center justify-between gap-1 p-2 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-2xl overflow-x-auto no-scrollbar pointer-events-auto max-w-full">
          {adminLinks.map((l) => {
            const isActive = activeTab === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setActiveTab(l.id)}
                className={`relative p-3 rounded-full flex-shrink-0 transition-all ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="admin-dock-bg"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-center">
                  <l.icon className="size-5" />
                  {l.id === "messages" && stats.unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
          <div className="w-px h-8 bg-border mx-1 flex-shrink-0" />
          <Link to="/academy" className="p-3 rounded-full text-muted-foreground flex-shrink-0">
            <ArrowRightIcon className="size-5 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-6 md:pt-28 pb-20 md:pb-12 min-h-screen flex flex-col w-full">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 animate-in fade-in duration-500">

          {activeTab === "dashboard" && (
            <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Overview of your Star9 platform.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Total Members", value: stats.totalUsers, icon: UsersIcon, color: "text-blue-400", gradient: "from-blue-500/10 to-transparent", click: () => setActiveTab("users") },
                  { label: "Active Courses", value: stats.totalCourses, icon: BookOpenIcon, color: "text-emerald-400", gradient: "from-emerald-500/10 to-transparent", click: () => setActiveTab("courses") },
                  { label: "Job Postings", value: stats.totalOpportunities, icon: BriefcaseIcon, color: "text-purple-400", gradient: "from-purple-500/10 to-transparent", click: () => setActiveTab("intake") },
                  { label: "Review Queue", value: stats.pendingVerifications, icon: ShieldCheckIcon, color: "text-amber-400", gradient: "from-amber-500/10 to-transparent", click: () => setActiveTab("users") },
                  { label: "Support Inbox", value: stats.unreadMessages, icon: MessageSquareIcon, color: "text-pink-400", gradient: "from-pink-500/10 to-transparent", click: () => setActiveTab("messages") },
                  { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: CreditCardIcon, color: "text-primary", gradient: "from-primary/10 to-transparent", click: () => setActiveTab("financials") },
                ].map((stat, i) => (
                  <Card 
                    key={i} 
                    className="p-5 cursor-pointer hover:border-primary/40 transition-all group relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border-white/5" 
                    onClick={stat.click}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase font-bold">{stat.label}</span>
                        <stat.icon className={`size-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <h3 className="text-3xl font-bold tracking-tighter text-white">{stat.value}</h3>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Recent Messages Preview */}
              {contactMessages.filter(m => !m.is_read).length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Unread Messages</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("messages")}>View All</Button>
                  </div>
                  <div className="space-y-3">
                    {contactMessages.filter(m => !m.is_read).slice(0, 3).map(msg => (
                      <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold shrink-0">
                          {msg.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{msg.name} - {msg.subject}</p>
                          <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">All Systems Active</h3>
                    <p className="text-muted-foreground text-sm mt-1">Platform is running smoothly.</p>
                  </div>
                  <CheckCircle2Icon className="size-10 text-green-500" />
                </Card>
                <Card className="p-6 space-y-3">
                  <Button className="w-full" onClick={() => setActiveTab('courses')}>Add New Course</Button>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('intake')}>Add Job Listing</Button>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                  <p className="text-muted-foreground mt-1">{students.length} registered users</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border">
                    <SearchIcon className="size-4 text-muted-foreground" />
                    <input type="text" placeholder="Search users..." className="bg-transparent text-sm outline-none w-40" value={userSearch} onChange={e => setUserSearch(e.target.value)} />
                  </div>
                  <Button variant="outline" onClick={fetchAllData}>Refresh</Button>
                </div>
              </div>

              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b text-xs text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Points</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {loadingStudents ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Loading users...</td></tr>
                      ) : filteredStudents.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No users found.</td></tr>
                      ) : filteredStudents.map((std) => (
                        <tr key={std.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                                {std.full_name?.charAt(0)?.toUpperCase() || std.email?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium flex items-center">
                                  {std.full_name || "Star9 Member"}
                                  <VerificationBadge status={std.verification_status} />
                                </p>
                                <p className="text-xs text-muted-foreground">{std.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              className="bg-muted border border-border text-xs rounded px-2 py-1.5 outline-none"
                              value={std.role}
                              onChange={(e) => updateRole(std.id, e.target.value)}
                            >
                              <option value="student">Student</option>
                              <option value="freelancer">Freelancer</option>
                              <option value="admin">Admin</option>
                              <option value="employer">Employer</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium">{std.merit_points || 0} pts</span>
                          </td>
                          <td className="px-6 py-4">
                            {std.verification_status === 'verified' ? (
                              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">Verified</Badge>
                            ) : std.verification_status === 'pending' ? (
                              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs">Pending</Badge>
                            ) : (
                              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">Restricted</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button size="sm" variant="outline" className="text-xs">View</Button>
                                </SheetTrigger>
                                <SheetContent className="w-[400px] sm:w-[500px]">
                                  <SheetHeader className="pb-6 border-b">
                                    <SheetTitle className="text-2xl font-bold">{std.full_name || "Star9 Member"}</SheetTitle>
                                    <SheetDescription className="text-sm">
                                      Joined: {new Date(std.created_at).toLocaleDateString()}
                                    </SheetDescription>
                                  </SheetHeader>
                                  <div className="py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                                        <p className="font-medium text-sm">{std.email}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Phone</p>
                                        <p className="font-medium text-sm">{std.phone_number || "Not provided"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">National ID / Passport</p>
                                        <p className="font-medium text-sm">{std.national_id_passport || "Not provided"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Role</p>
                                        <p className="font-medium text-sm capitalize">{std.role || "student"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Location</p>
                                        <p className="font-medium text-sm">{[std.city, std.country].filter(Boolean).join(', ') || "Not provided"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Merit Points</p>
                                        <p className="font-medium text-sm">{std.merit_points || 0}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Bio</p>
                                      <p className="text-sm text-muted-foreground italic">{std.bio || "No bio provided."}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-2">Skills</p>
                                      <div className="flex flex-wrap gap-2">
                                        {std.skills?.length > 0 ? std.skills.map((s: string) => (
                                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                                        )) : <p className="text-xs text-muted-foreground">No skills listed.</p>}
                                      </div>
                                    </div>
                                    <div className="pt-6 border-t space-y-3">
                                      <p className="text-xs text-muted-foreground">Admin Actions</p>
                                      <div className="flex gap-3">
                                        {std.verification_status !== 'verified' ? (
                                          <Button className="flex-1" onClick={() => setVerification(std.id, 'verified')}>Verify User</Button>
                                        ) : (
                                          <Button variant="destructive" className="flex-1" onClick={() => setVerification(std.id, 'pending')}>Revoke Verification</Button>
                                        )}
                                        <Button variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteUser(std.id)}>Purge User</Button>
                                      </div>
                                    </div>
                                  </div>
                                </SheetContent>
                              </Sheet>
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

          {activeTab === "verifications" && (
            <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Resume Verification</h1>
                <p className="text-muted-foreground mt-1">Review uploaded resumes and verify user profiles.</p>
              </div>

              {(() => {
                const pendingUsers = students.filter(s => s.verification_status === 'pending');
                const verifiedUsers = students.filter(s => s.verification_status === 'verified');

                return (
                  <div className="space-y-8">
                    {/* Pending Reviews */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ShieldCheckIcon className="size-5 text-amber-500" />
                        Pending Reviews ({pendingUsers.length})
                      </h2>
                      {pendingUsers.length === 0 ? (
                        <Card className="p-8 text-center border-dashed">
                          <CheckCircle2Icon className="size-10 mx-auto mb-3 text-green-500" />
                          <p className="text-muted-foreground">No pending reviews. All caught up!</p>
                        </Card>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {pendingUsers.map(user => (
                            <Card key={user.id} className="p-5 border-amber-500/20 bg-amber-500/5">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 font-bold text-lg shrink-0">
                                  {user.full_name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold">{user.full_name || 'Unnamed'}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {user.city && `${user.city}, ${user.country}`} | ID: {user.national_id_passport || "N/A"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Phone: {user.phone_number || "N/A"} | Role: <span className="capitalize">{user.role}</span>
                                  </p>
                                  
                                  {user.resume_url && (
                                    <div className="mt-3 flex items-center gap-2">
                                      <FileTextIcon className="size-4 text-primary" />
                                      <span className="text-sm text-primary font-medium">Resume uploaded</span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="ml-auto text-xs h-7"
                                        onClick={async () => {
                                          const { data } = await supabase.storage
                                            .from('resumes')
                                            .createSignedUrl(user.resume_url, 300);
                                          if (data?.signedUrl) {
                                            window.open(data.signedUrl, '_blank');
                                          } else {
                                            toast.error("Could not generate download link.");
                                          }
                                        }}
                                      >
                                        <DownloadIcon className="size-3 mr-1" />
                                        View
                                      </Button>
                                    </div>
                                  )}
                                  
                                  <div className="flex gap-2 mt-4">
                                    <Button size="sm" className="flex-1" onClick={() => setVerification(user.id, 'verified')}>
                                      <CheckCircle2Icon className="size-3.5 mr-1.5" />
                                      Verify
                                    </Button>
                                    <Button size="sm" variant="destructive" className="flex-1" onClick={() => setVerification(user.id, 'rejected')}>
                                      <XCircleIcon className="size-3.5 mr-1.5" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Recently Verified */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2Icon className="size-5 text-green-500" />
                        Verified Users ({verifiedUsers.length})
                      </h2>
                      {verifiedUsers.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No verified users yet.</p>
                      ) : (
                        <div className="rounded-xl border bg-card overflow-hidden">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b text-xs text-muted-foreground">
                              <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Resume</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {verifiedUsers.slice(0, 20).map(u => (
                                <tr key={u.id} className="hover:bg-muted/30">
                                  <td className="px-6 py-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 text-xs font-bold">
                                        {u.full_name?.charAt(0)?.toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-medium text-sm">{u.full_name}</p>
                                        <p className="text-xs text-muted-foreground">{u.email}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-3">
                                    {u.resume_url ? (
                                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Uploaded</Badge>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">None</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-3 text-right">
                                    <Button size="sm" variant="ghost" className="text-xs text-destructive" onClick={() => setVerification(u.id, 'pending')}>
                                      Revoke
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
                  <p className="text-muted-foreground mt-1">Create, edit, and manage academy courses.</p>
                </div>
                {!editingCourse && (
                  <Button onClick={() => setEditingCourse({ title: "", category: "AI Skills", status: "draft", lessons: [], ai_tools_covered: [] })}>
                    <PlusIcon className="mr-2 size-4" /> New Course
                  </Button>
                )}
              </div>

              {editingCourse ? (
                <Card className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{editingCourse.title || "New Course"}</h2>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => setEditingCourse(null)}>Cancel</Button>
                      <Button onClick={handleSaveCourse}>Save Course</Button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Course Title</Label>
                        <Input placeholder="Course Title" value={editingCourse.title} onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <select className="w-full h-10 px-3 bg-background border border-input rounded-md text-sm" value={editingCourse.category || "AI Skills"} onChange={e => setEditingCourse({ ...editingCourse, category: e.target.value })}>
                            <option>AI Skills</option>
                            <option>Freelancing</option>
                            <option>Digital Marketing</option>
                            <option>Education</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <select className="w-full h-10 px-3 bg-background border border-input rounded-md text-sm" value={editingCourse.status} onChange={e => setEditingCourse({ ...editingCourse, status: e.target.value })}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Lessons</Label>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto p-3 bg-muted/30 border rounded-lg">
                        {(editingCourse.lessons || []).map((lesson: any, idx: number) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground">{idx + 1}</span>
                              {lesson.type === 'video' ? <PlayIcon className="size-3 text-primary" /> : <BookOpenIcon className="size-3 text-secondary" />}
                              <span className="text-sm font-medium">{lesson.title}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-destructive" onClick={() => removeLesson(lesson.id)}><XCircleIcon className="size-4" /></Button>
                          </div>
                        ))}
                        {(!editingCourse.lessons || editingCourse.lessons.length === 0) && (
                          <p className="text-center py-6 text-sm text-muted-foreground">No lessons added yet</p>
                        )}
                      </div>
                      <div className="p-3 border border-dashed rounded-lg space-y-2">
                        <Input placeholder="Lesson Title" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} className="h-9" />
                        <div className="flex gap-2">
                          <select className="h-9 px-2 bg-background border border-input rounded text-sm" value={newLesson.type} onChange={e => setNewLesson({ ...newLesson, type: e.target.value })}>
                            <option value="video">Video</option>
                            <option value="article">Article</option>
                            <option value="quiz">Quiz</option>
                          </select>
                          <Input placeholder="URL or content" value={newLesson.url} onChange={e => setNewLesson({ ...newLesson, url: e.target.value })} className="h-9" />
                          <Button size="sm" variant="secondary" className="h-9" onClick={addLesson}>Add</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loadingCourses ? (
                    <div className="col-span-full h-48 flex items-center justify-center text-muted-foreground">Loading courses...</div>
                  ) : courses.length === 0 ? (
                    <Card className="col-span-full border-dashed p-12 text-center">
                      <BookOpenIcon className="size-12 mx-auto mb-4 text-muted-foreground" />
                      <CardTitle>No Courses Yet</CardTitle>
                    </Card>
                  ) : courses.map((course) => (
                    <Card key={course.id} className="hover:border-primary/30 transition-all cursor-pointer" onClick={() => setEditingCourse(course)}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="text-xs">{course.category}</Badge>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }} className="text-muted-foreground hover:text-destructive p-1">
                            <Trash2Icon className="size-4" />
                          </button>
                        </div>
                        <CardTitle className="mt-2">{course.title}</CardTitle>
                        <CardDescription>{course.status === 'published' ? 'Published' : 'Draft'}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "intake" && (
            <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
                  <p className="text-muted-foreground mt-1">Manage remote work opportunities for students.</p>
                </div>
                <Button onClick={handleCreateOpportunity}>
                  <PlusIcon className="mr-2 size-4" /> Add Job
                </Button>
              </div>
              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b text-xs text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4">Title / Company</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {loadingOpportunities ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">Loading...</td></tr>
                      ) : opportunities.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No job listings yet.</td></tr>
                      ) : opportunities.map((opp) => (
                        <tr key={opp.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium">{opp.title || opp.employer_name}</p>
                            <p className="text-xs text-muted-foreground">{opp.company || ""}</p>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="text-xs">{opp.opportunity_category || opp.type || "General"}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={`text-xs ${opp.status === 'open' || opp.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {opp.status || (opp.is_active ? 'Active' : 'Closed')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button size="icon" variant="ghost" className="hover:text-destructive" onClick={() => handleDeleteOpportunity(opp.id)}>
                              <Trash2Icon className="size-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
                <p className="text-muted-foreground mt-1">Messages submitted through the contact form.</p>
              </div>
              {loadingMessages ? (
                <div className="text-center py-12 text-muted-foreground">Loading messages...</div>
              ) : contactMessages.length === 0 ? (
                <Card className="p-12 text-center border-dashed">
                  <MessageSquareIcon className="size-12 mx-auto mb-4 text-muted-foreground" />
                  <CardTitle>No messages yet</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">Contact form submissions will appear here.</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {contactMessages.map(msg => (
                    <Card key={msg.id} className={`p-5 transition-all ${!msg.is_read ? "border-primary/30 bg-primary/5" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                            {msg.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">{msg.name}</p>
                              {!msg.is_read && <span className="w-2 h-2 bg-primary rounded-full" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{msg.email}</p>
                            <p className="text-sm font-medium mb-2">{msg.subject}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[10px] text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => markMessageRead(msg.id, msg.is_read)}
                            title={msg.is_read ? "Mark as unread" : "Mark as read"}
                          >
                            {msg.is_read ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            asChild
                            title="Reply via email"
                          >
                            <a href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`}>
                              <MailIcon className="size-4" />
                            </a>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-muted-foreground hover:text-destructive" 
                            onClick={() => handleDeleteMessage(msg.id)}
                            title="Delete message"
                          >
                            <Trash2Icon className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "financials" && (
            <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Finances</h1>
                <p className="text-muted-foreground mt-1">Revenue tracking and billing overview.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                  <h2 className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</h2>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Pending Payments</p>
                  <h2 className="text-3xl font-bold text-amber-500">{invoices.filter(i => i.status === 'pending').length}</h2>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Paid Invoices</p>
                  <h2 className="text-3xl font-bold text-green-500">{invoices.filter(i => i.status === 'paid').length}</h2>
                </Card>
              </div>
              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b text-xs text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {loadingInvoices ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">Loading...</td></tr>
                      ) : invoices.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No transactions yet.</td></tr>
                      ) : invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-xs text-muted-foreground">{inv.id.substring(0, 8)}</td>
                          <td className="px-6 py-4 font-medium">{inv.user_id?.substring(0, 8)}</td>
                          <td className="px-6 py-4 font-bold text-green-500">${inv.amount}</td>
                          <td className="px-6 py-4">
                            <Badge className={`text-xs ${inv.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>{inv.status}</Badge>
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
