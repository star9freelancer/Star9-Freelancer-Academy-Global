import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CertificateTemplate from "@/components/academy/CertificateTemplate";
import CommunityChat from "@/components/academy/CommunityChat";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  Home, BookOpen, Users, Award, Settings, Menu, Bell, Search, 
  ArrowLeft, ArrowRight, Download, Play, Clock, TrendingUp, Sparkles, 
  CheckCircle2, XCircle, FileText, Globe, Link as LinkIcon, 
  CreditCard, UploadCloud, BadgeCheck, Briefcase, Cpu, Database,
  Phone, MapPin, User, Calendar, Trash2, Plus, X as XIcon, Save, ShieldCheck
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("academy");
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [profileForm, setProfileForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [playingCourse, setPlayingCourse] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<any>(null);

  const handleDownloadPDF = async (cert: any) => {
    setActiveCert(cert);
    setIsDownloading(true);
    
    // Allow state to update and render the hidden template
    setTimeout(async () => {
      if (certificateRef.current) {
        try {
          const canvas = await html2canvas(certificateRef.current, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#fffdf7',
            logging: false,
            removeContainer: true
          });
          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [1122.5, 793.7]
          });
          
          pdf.addImage(imgData, 'PNG', 0, 0, 1122.5, 793.7);
          pdf.save(`Star9_Certificate_${cert.credential_id}.pdf`);
          toast.success("Certificate downloaded successfully");
        } catch (err) {
          console.error("PDF generation error:", err);
          toast.error("Failed to generate PDF. Please try again.");
        } finally {
          setIsDownloading(false);
          setActiveCert(null);
        }
      }
    }, 500);
  };
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  const navigate = useNavigate();

  const fetchCertificates = async (userId: string) => {
    const { data } = await supabase
      .from('user_certificates')
      .select('*, academy_courses(title)')
      .eq('user_id', userId);
    if (data) setCertificates(data);
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const { data, error } = await supabase
        .from('academy_courses')
        .select('*')
        .eq('status', 'published');
      if (error) console.error('Error fetching courses:', error.message);
      setCourses(data || []);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    let initialLoadDone = false;

    // Fetch initial profile and courses (user is guaranteed by ProtectedRoute)
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUser(user);
        const { data: profileData } = await supabase
          .from('profiles').select('*').eq('id', user.id).single();
        if (profileData) { setProfile(profileData); setProfileForm(profileData); }
        if (!initialLoadDone) { initialLoadDone = true; fetchCourses(); fetchCertificates(user.id); }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user);
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          const { data: profileData } = await supabase
            .from('profiles').select('*').eq('id', session.user.id).single();
          if (profileData) { setProfile(profileData); setProfileForm(profileData); }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id, // Explicitly include ID for upsert to work correctly
        full_name: profileForm.full_name,
        phone_number: profileForm.phone_number,
        bio: profileForm.bio,
        country: profileForm.country,
        city: profileForm.city,
        date_of_birth: profileForm.date_of_birth,
        gender: profileForm.gender,
        linkedin_url: profileForm.linkedin_url,
        portfolio_url: profileForm.portfolio_url,
        skills: profileForm.skills || [],
        email: user.email, // Sync email too
      }, { onConflict: 'id' });
    setSaving(false);
    if (!error) {
      setProfile({ ...profile, ...profileForm });
      toast.success('Profile saved!', { description: 'Your changes have been applied.' });
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const updated = [...(profileForm.skills || []), newSkill.trim()];
    setProfileForm((p: any) => ({ ...p, skills: updated }));
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setProfileForm((p: any) => ({ ...p, skills: (p.skills || []).filter((s: string) => s !== skill) }));
  };

  const issueCertificate = async (courseId: string) => {
    if (!user) return;
    const credId = `ST9-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${new Date().getFullYear()}`;
    const { error } = await supabase.from('user_certificates').insert([{
      user_id: user.id,
      course_id: courseId,
      credential_id: credId,
    }]);
    
    if (!error) {
      toast.success("Credential Issued", { description: "Your certificate is now stored in the Star9 Ledger." });
      fetchCertificates(user.id);
    }
  };

  const generateLinkedInUrl = (cert: any) => {
    const courseTitle = cert.academy_courses?.title || "Star9 Professional Certification";
    const baseUrl = "https://www.linkedin.com/profile/add";
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: courseTitle,
      organizationName: "Star9 Infrastructure",
      // organizationId: "0000000", // If you have a LinkedIn Page ID, insert it here for the logo
      issueYear: new Date(cert.created_at).getFullYear().toString(),
      issueMonth: (new Date(cert.created_at).getMonth() + 1).toString(),
      certId: cert.credential_id,
      certUrl: `${window.location.origin}/verify/${cert.credential_id}`
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Auto-join course chat group when starting a course
  const joinCourseChat = async (courseId: string) => {
    try {
      // Find the chat group for this course
      const { data: group } = await supabase
        .from('chat_groups')
        .select('id')
        .eq('course_id', courseId)
        .eq('type', 'course')
        .single();

      if (group && user) {
        // Try to join (will silently fail if already a member due to UNIQUE constraint)
        await supabase
          .from('chat_members')
          .upsert({ group_id: group.id, user_id: user.id }, { onConflict: 'group_id,user_id' });
      }
    } catch (err) {
      // Silently ignore — non-critical
    }
  };

  const studentLinks = [
    { id: "academy", icon: BookOpen, label: "My Academy" },
    { id: "certificates", icon: Award, label: "My Certificates" },
    { id: "community", icon: Globe, label: "Community" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const sidebarLinks = studentLinks;

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`
          fixed z-50 inset-y-0 left-0 flex flex-col
          border-r border-white/5
          bg-background/40 backdrop-blur-2xl
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-[70px]
          shadow-[4px_0_40px_rgba(0,0,0,0.5)]
        `}
      >
        {/* Top Logo */}
        <div className="h-20 flex items-center px-4 border-b border-white/5 overflow-hidden shrink-0">
          <Link to="/" className="flex items-center gap-3 min-w-0" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
              <div className="w-4 h-4 bg-primary rounded-sm" />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${sidebarHovered ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0"}`}>
              <img src={logo} alt="Star9" className="h-[30px] w-auto object-contain brightness-110" />
            </div>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-2 space-y-1">
          {sidebarLinks.map((l) => {
            const isActive = activeTab === l.id;
            return (
              <TooltipProvider key={l.id} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => { setActiveTab(l.id); setSidebarOpen(false); }}
                      className={`
                        relative w-full flex items-center gap-3 px-[14px] py-[11px] rounded-xl
                        transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-primary/15 border border-primary/25"
                            : "border border-transparent hover:bg-white/[0.04]"
                        }
                      `}
                    >
                      {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />}
                      <l.icon className={`size-[18px] shrink-0 transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                      }`} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8} className="font-mono text-[10px] uppercase tracking-widest">
                    {l.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>

        {/* Logout — pinned to very bottom */}
        <div className="px-2 pb-3 shrink-0">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-[14px] py-[11px] rounded-xl border border-transparent text-zinc-600 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 group"
                >
                  <ArrowRight className="size-[18px] shrink-0 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8} className="font-mono text-[10px] uppercase tracking-widest">
                Log Out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {/* Main Content — offset by icon-rail width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-[70px]">
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
            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full group cursor-help hover:bg-secondary/20 transition-all">
              <span className="text-sm font-mono font-bold text-secondary animate-pulse">🔥 {profile?.current_streak || 0}</span>
              <span className="hidden lg:inline text-[10px] font-mono tracking-widest uppercase font-bold text-muted-foreground group-hover:text-secondary transition-colors">Study Streak</span>
            </div>

            <button className="p-2 rounded-lg hover:bg-muted relative ml-2">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              <div className="w-8 h-8 rounded-full border border-border shrink-0 bg-primary/20 flex items-center justify-center text-primary font-bold uppercase overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}</span>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-medium flex items-center gap-1">
                {profile?.full_name || user?.email?.split('@')[0] || "User"}
                <VerificationBadge status={profile?.verification_status || 'pending'} />
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 w-full bg-background relative">
          {/* Subtle glow effect */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          {/* ----- USER / STUDENT VIEWS ----- */}


          {activeTab === "academy" && (
            <div className="space-y-6 relative z-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Academy: {profile?.full_name || 'Personnel'}</h1>
                <p className="text-muted-foreground">Continue learning and mastering your craft, {profile?.full_name?.split(' ')[0] || 'Agent'}.</p>
              </div>

              {profile?.verification_status !== 'verified' && (
                <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold uppercase tracking-tight text-orange-500">Administrative Authorization Pending</h4>
                      <p className="text-xs text-muted-foreground">Some network features are restricted until an administrator verifies your personnel credentials.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-orange-500/20 text-orange-500 hover:bg-orange-500/10 font-mono text-[10px] uppercase tracking-widest" onClick={() => setActiveTab('settings')}>Review My Profile</Button>
                </div>
              )}

              {loadingCourses ? (
                <div className="flex justify-center items-center h-48">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : courses.length === 0 ? (
                <Card className="glass border-dashed text-center p-12 opacity-80">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="mb-2">No Published Courses</CardTitle>
                  <CardDescription>There are currently no active courses available in the Academy. Check back soon!</CardDescription>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="glass border-border/50 shadow-card hover:shadow-card-hover transition-all flex flex-col">
                      <CardHeader>
                        <Badge className="w-fit mb-2 bg-primary/20 text-primary hover:bg-primary/30">{course.category}</Badge>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>Published on {new Date(course.created_at).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1 font-mono uppercase"><span>Progress</span><span>0%</span></div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary w-[0%]" />
                          </div>
                        </div>
                        
                        {course.lessons && course.lessons.length > 0 && (
                          <div className="space-y-1.5 mb-6 text-left">
                            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2 text-left">Curriculum:</p>
                            {course.lessons.slice(0, 3).map((lesson: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                {lesson.type === 'video' ? <Play className="w-3 h-3 text-secondary" /> : <Database className="w-3 h-3 text-secondary" />}
                                <span className="line-clamp-1">{lesson.title}</span>
                              </div>
                            ))}
                            {course.lessons.length > 3 && (
                              <p className="text-[10px] text-muted-foreground italic pl-5">+{course.lessons.length - 3} more modules</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button 
                          className="w-full font-mono uppercase text-xs tracking-widest gap-2"
                          onClick={() => { 
                            setPlayingCourse(course); 
                            setActiveLessonIdx(0); 
                            joinCourseChat(course.id);
                          }}
                        >
                          Start Module <Play className="w-3 h-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {playingCourse && (
                <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex animate-in fade-in duration-300">
                  <div className="flex-1 flex flex-col min-w-0">
                    <header className="h-16 px-6 border-b flex items-center justify-between bg-card/50">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setPlayingCourse(null)}><ArrowLeft className="size-5" /></Button>
                        <div>
                          <h2 className="text-sm font-bold uppercase tracking-tight line-clamp-1">{playingCourse.title}</h2>
                          <p className="text-[10px] font-mono text-muted-foreground">Lesson {activeLessonIdx + 1} of {playingCourse.lessons?.length || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/20">{Math.round(((activeLessonIdx + 1) / (playingCourse.lessons?.length || 1)) * 100)}% Complete</Badge>
                      </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 md:p-12">
                      <div className="max-w-4xl mx-auto space-y-8">
                        {playingCourse.lessons?.[activeLessonIdx]?.type === 'video' ? (
                          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 bg-zinc-900 flex items-center justify-center">
                            {playingCourse.lessons[activeLessonIdx].url ? (
                               <iframe 
                                 className="w-full h-full"
                                 src={playingCourse.lessons[activeLessonIdx].url.includes('youtube.com') 
                                   ? playingCourse.lessons[activeLessonIdx].url.replace('watch?v=', 'embed/') 
                                   : playingCourse.lessons[activeLessonIdx].url} 
                                 title="Video Player"
                                 allowFullScreen
                               />
                            ) : (
                              <div className="text-muted-foreground flex flex-col items-center gap-4">
                                <Play className="size-12 animate-pulse" />
                                <p className="font-mono text-xs uppercase tracking-widest">Video Stream Unavailable</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Card className="p-12 glass border-secondary/20 shadow-xl shadow-secondary/5">
                            <div className="max-w-2xl mx-auto space-y-8 text-left">
                              <div className="text-center space-y-2">
                                <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-2">Module Quiz</Badge>
                                <h3 className="text-3xl font-bold uppercase tracking-tighter">{playingCourse.lessons[activeLessonIdx].title}</h3>
                                <p className="text-muted-foreground italic text-sm">Pass the validation sequence to receive your Star9 Credential.</p>
                              </div>
                              <div className="space-y-4 pt-4">
                                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6 border-b border-border/50 pb-2">Technical Validation 01</p>
                                <div className="grid gap-3">
                                  {["Optimize for low-latency network protocols", "Prioritize decentralized data caching", "Implement zero-trust security shards"].map((opt, i) => (
                                    <Button key={i} variant="outline" className="justify-start h-16 px-6 text-sm hover:border-primary transition-all text-left group" onClick={() => { setQuizScore(100); toast.success("Answer Recorded"); }}>
                                      <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center mr-4 text-[10px] font-mono group-hover:bg-primary group-hover:text-white transition-colors">{i === 1 ? 'B' : i === 0 ? 'A' : 'C'}</span>
                                      {opt}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}

                        <div className="flex items-center justify-between pt-8 border-t border-border/20">
                          <Button 
                            variant="outline" 
                            disabled={activeLessonIdx === 0} 
                            onClick={() => setActiveLessonIdx(activeLessonIdx - 1)}
                            className="font-mono text-[10px] uppercase tracking-widest bg-zinc-900/40"
                          >
                           Backward Segment
                          </Button>
                          {activeLessonIdx < (playingCourse.lessons?.length || 1) - 1 ? (
                            <Button 
                              onClick={() => { setActiveLessonIdx(activeLessonIdx + 1); setQuizScore(null); }}
                              className="font-mono text-[10px] uppercase tracking-widest px-8 bg-primary hover:bg-primary/90 text-white"
                            >
                             Sync & Proceed
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => { issueCertificate(playingCourse.id); setPlayingCourse(null); }}
                              className="bg-gradient-to-r from-primary to-secondary font-mono text-[10px] uppercase tracking-widest px-8 shadow-lg shadow-primary/20 text-white"
                            >
                             Finalize Module
                            </Button>
                          )}
                        </div>
                      </div>
                    </main>
                  </div>

                  <aside className="hidden lg:flex w-80 border-l flex-col bg-card/40 backdrop-blur-md">
                    <div className="p-6 border-b">
                       <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Curriculum Map</h4>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                       {(playingCourse.lessons || []).map((lesson: any, i: number) => (
                         <button 
                           key={lesson.id} 
                           onClick={() => setActiveLessonIdx(i)}
                           className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
                             activeLessonIdx === i ? "bg-primary/10 border-primary/25 shadow-lg" : "border-transparent hover:bg-muted/50"
                           }`}
                         >
                           <div className={`size-8 rounded-lg flex items-center justify-center font-mono text-[10px] border ${
                             activeLessonIdx === i ? "bg-primary text-white border-primary" : "bg-muted text-muted-foreground border-border/50"
                           }`}>{i + 1}</div>
                           <div className="text-left">
                             <p className={`text-[11px] font-bold uppercase tracking-tight ${activeLessonIdx === i ? "text-primary" : "text-muted-foreground"}`}>{lesson.title}</p>
                             <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">{lesson.type}</p>
                           </div>
                         </button>
                       ))}
                    </div>
                  </aside>
                </div>
              )}
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
                  <span className="font-mono text-sm tracking-widest uppercase font-bold text-foreground">Earned: {certificates.length}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="glass overflow-hidden group shadow-card hover:shadow-card-hover transition-all">
                    <div className="h-40 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 relative flex flex-col items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                      <div className="z-10 text-center space-y-2">
                        <img src={logo} alt="Star9" className="h-[28px] mx-auto brightness-200" />
                        <p className="text-[8px] font-mono tracking-[0.4em] uppercase text-primary/80">Certificate of Infrastructure Excellence</p>
                      </div>
                      <Award className="absolute -bottom-8 -right-8 w-32 h-32 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <CardHeader className="text-center pt-6">
                      <Badge className="mx-auto mb-2 bg-green-500/10 text-green-500 border-green-500/20 uppercase font-mono text-[9px] tracking-widest">Verified Credential</Badge>
                      <CardTitle className="text-2xl font-serif text-foreground/90">{cert.academy_courses?.title || "Advanced Protocol Mastery"}</CardTitle>
                      <CardDescription className="font-mono mt-2 text-xs uppercase tracking-widest">Issued {new Date(cert.created_at).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center px-8 pb-8">
                      <p className="text-xs text-muted-foreground leading-relaxed">This certifies that <span className="text-foreground font-bold">{profile?.full_name || "Personnel"}</span> has demonstrated exceptional technical proficiency in all network-sanctioned modules.</p>
                      <div className="mt-8 p-4 bg-zinc-900/80 rounded-xl border border-white/5 flex flex-col gap-2 font-mono text-[10px] shadow-inner">
                        <div className="flex justify-between items-center"><span className="text-zinc-500">CREDENTIAL ID</span><span className="text-primary font-bold">{cert.credential_id}</span></div>
                        <div className="flex justify-between items-center"><span className="text-zinc-500">VERIFICATION</span><span className="text-secondary/80">AUTHENTICATED @ STAR9_EDGE</span></div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 pt-4 flex gap-3 p-4">
                      <a href={generateLinkedInUrl(cert)} target="_blank" className="flex-1">
                        <Button className="w-full font-mono uppercase tracking-widest text-[9px] gap-2 py-6 bg-zinc-900 border-border hover:bg-zinc-800" variant="outline">
                          <Globe className="w-3 h-3 text-blue-500" /> 
                          Add to LinkedIn
                        </Button>
                      </a>
                      <Button 
                        disabled={isDownloading}
                        onClick={() => handleDownloadPDF(cert)}
                        className="flex-1 font-mono uppercase tracking-widest text-[9px] gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 border py-6"
                      >
                        {isDownloading && activeCert?.id === cert.id ? (
                          <div className="size-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-3 h-3"/>
                        )} 
                        Download ID
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                {certificates.length === 0 && (
                  <Card className="glass border-dashed shadow-none flex flex-col items-center justify-center text-center p-12 opacity-50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-secondary/5 group-hover:to-secondary/10 transition-colors pointer-events-none" />
                    <Award className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-mono uppercase tracking-widest font-bold mb-2">Awaiting Credential</h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">Complete curriculum modules in My Academy to unlock enterprise certificates.</p>
                    <Button variant="outline" className="mt-6 font-mono text-xs uppercase tracking-widest bg-background/50" onClick={() => setActiveTab("academy")}>Return to Curriculums</Button>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <CommunityChat user={user} profile={profile} />
          )}

          {activeTab === "settings" && (
            <div className="space-y-8 max-w-5xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Header with avatar */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-primary/20 overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{(profileForm?.full_name || user?.email || 'U').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-all shadow-md">
                    <UploadCloud className="size-3.5 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold tracking-tight">{profileForm?.full_name || user?.email?.split('@')[0] || 'Your Name'}</h1>
                  <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {profileForm?.city && profileForm?.country && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <MapPin className="size-3" /> {profileForm.city}, {profileForm.country}
                      </span>
                    )}
                    {profileForm?.phone_number && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <Phone className="size-3" /> {profileForm.phone_number}
                      </span>
                    )}
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-[10px] font-mono uppercase tracking-widest">
                      {profile?.verification_status === 'verified' ? '✓ Verified' : 'Pending Verification'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left column — main profile */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Personal Info */}
                  <Card className="glass border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <User className="size-4 text-primary" />
                        </div>
                        <CardTitle className="text-base font-bold">Personal Information</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full Name</Label>
                          <Input
                            className="bg-background/50 border-border/50"
                            placeholder="John Doe"
                            value={profileForm?.full_name || ''}
                            onChange={e => setProfileForm((p: any) => ({ ...p, full_name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                              className="pl-9 bg-background/50 border-border/50"
                              placeholder="+254 712 345 678"
                              value={profileForm?.phone_number || ''}
                              onChange={e => setProfileForm((p: any) => ({ ...p, phone_number: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Country</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                              className="pl-9 bg-background/50 border-border/50"
                              placeholder="Kenya"
                              value={profileForm?.country || ''}
                              onChange={e => setProfileForm((p: any) => ({ ...p, country: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">City</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                              className="pl-9 bg-background/50 border-border/50"
                              placeholder="Nairobi"
                              value={profileForm?.city || ''}
                              onChange={e => setProfileForm((p: any) => ({ ...p, city: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Date of Birth</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="date"
                              className="pl-9 bg-background/50 border-border/50"
                              value={profileForm?.date_of_birth || ''}
                              onChange={e => setProfileForm((p: any) => ({ ...p, date_of_birth: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Gender</Label>
                          <select
                            className="w-full h-10 px-3 rounded-md border border-border/50 bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                            value={profileForm?.gender || ''}
                            onChange={e => setProfileForm((p: any) => ({ ...p, gender: e.target.value }))}
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Bio</Label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 rounded-md border border-border/50 bg-background/50 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                          placeholder="Tell the world about yourself — your skills, goals, and what makes you exceptional..."
                          value={profileForm?.bio || ''}
                          onChange={e => setProfileForm((p: any) => ({ ...p, bio: e.target.value }))}
                        />
                        <p className="text-[10px] text-muted-foreground text-right font-mono">{(profileForm?.bio || '').length}/280</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Primary Email</Label>
                        <Input className="bg-muted/30 border-border/30 cursor-not-allowed" disabled value={user?.email || ''} />
                        <p className="text-[10px] text-muted-foreground font-mono">Email is managed by your auth provider. Contact admin to change.</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <Card className="glass border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Globe className="size-4 text-secondary" />
                        </div>
                        <CardTitle className="text-base font-bold">Social Presence</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">LinkedIn URL</Label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                          <Input
                            className="pl-9 bg-background/50 border-border/50"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={profileForm?.linkedin_url || ''}
                            onChange={e => setProfileForm((p: any) => ({ ...p, linkedin_url: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Portfolio / Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                          <Input
                            className="pl-9 bg-background/50 border-border/50"
                            placeholder="https://yourportfolio.dev"
                            value={profileForm?.portfolio_url || ''}
                            onChange={e => setProfileForm((p: any) => ({ ...p, portfolio_url: e.target.value }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card className="glass border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Cpu className="size-4 text-emerald-500" />
                        </div>
                        <CardTitle className="text-base font-bold">Skills & Expertise</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-xl border border-border/50 bg-background/30">
                        {(profileForm?.skills || []).map((skill: string) => (
                          <span key={skill} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-mono font-bold text-primary uppercase tracking-widest">
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">
                              <XIcon className="size-3" />
                            </button>
                          </span>
                        ))}
                        {(profileForm?.skills || []).length === 0 && (
                          <p className="text-xs text-muted-foreground italic">Add your skills below...</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          className="bg-background/50 border-border/50"
                          placeholder="e.g. React, Figma, Copywriting..."
                          value={newSkill}
                          onChange={e => setNewSkill(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addSkill()}
                        />
                        <Button onClick={addSkill} size="sm" className="shrink-0 font-mono text-[10px] uppercase tracking-widest px-4">
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Identity docs */}
                  <Card className="glass shadow-card border-border/50">
                    <CardHeader>
                      <CardTitle className="font-mono text-sm tracking-widest uppercase">Identity & Documents</CardTitle>
                      <CardDescription>Upload your resume and certificates for global verification.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-background/50 hover:bg-accent/30 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Resume_2026.pdf</p>
                            <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-dashed hover:bg-accent/50 cursor-pointer transition-colors text-muted-foreground hover:text-foreground">
                        <UploadCloud className="w-5 h-5" />
                        <span className="text-sm">Click to upload new document</span>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                      </label>
                    </CardContent>
                  </Card>

                  {/* Save button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="font-mono uppercase tracking-widest text-xs px-8 py-5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/20 rounded-xl"
                    >
                      {saving ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Saving...</>
                      ) : (
                        <><Save className="size-4 mr-2" /> Save All Changes</>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  {/* Payments */}
                  <Card className="glass border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-mono tracking-widest uppercase">Payment Accounts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl border bg-green-500/5 border-green-500/20">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 font-black text-xs">M</div>
                          <span className="text-sm font-bold">M-Pesa</span>
                        </div>
                        <Badge className="text-[9px] bg-green-500/10 text-green-500 border-green-500/20 uppercase font-mono tracking-widest">Connected</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full text-[10px] font-mono uppercase tracking-widest border-dashed gap-2">
                        <Plus className="size-3" /> Connect PayPal
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-[10px] font-mono uppercase tracking-widest border-dashed gap-2">
                        <Plus className="size-3" /> Connect Wise
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Streak Stats */}
                  <Card className="glass border-border/50 bg-gradient-to-br from-secondary/5 to-primary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-mono tracking-widest uppercase">Study Record</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground uppercase">Current Streak</span>
                        <span className="text-2xl font-black text-secondary">🔥 {profile?.current_streak || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground uppercase">Longest Streak</span>
                        <span className="text-2xl font-black">{profile?.longest_streak || 0}</span>
                      </div>
                      <div className="h-px bg-border/50" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground uppercase">Member Since</span>
                        <span className="text-xs font-mono">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Danger zone */}
                  <Card className="glass border-red-500/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-red-500 text-xs font-mono uppercase tracking-widest">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="destructive" className="w-full font-mono uppercase tracking-widest text-[10px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 gap-2">
                        <Trash2 className="size-3" /> Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Hidden Export Engine */}
        <div className="fixed left-[-9999px] top-[-9999px]">
           {activeCert && (
             <CertificateTemplate 
               ref={certificateRef}
               studentName={profile?.full_name || "Star9 Personnel"}
               courseTitle={activeCert.academy_courses?.title || "Operational Mastery"}
               credentialId={activeCert.credential_id}
               issueDate={new Date(activeCert.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
             />
           )}
        </div>
      </div>
    </div>
  );
};

export default Academy;
