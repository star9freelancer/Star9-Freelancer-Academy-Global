import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAuth } from "@/context/AuthContext";
import { useAcademyData } from "@/hooks/useAcademyData";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import CertificateTemplate from "@/components/academy/CertificateTemplate";
import CommunityChat from "@/components/academy/CommunityChat";
import CourseCard from "@/components/academy/CourseCard";
import JobBoard from "@/components/academy/JobBoard";
import AcademyHero from "@/components/academy/AcademyHero";
import ProgramDetailView from "@/components/academy/ProgramDetailView";
import { HomeFeed } from "@/components/academy/HomeFeed";
import { UserSettings } from "@/components/academy/UserSettings";
import { AcademyFooter } from "@/components/academy/AcademyFooter";
import ReferralDashboard from "@/components/academy/ReferralDashboard";
import { 
  Home as HomeIcon, 
  BookOpen as BookOpenIcon, 
  Users as UsersIcon, 
  Award as AwardIcon, 
  Settings as SettingsIcon, 
  Menu as MenuIcon, 
  Bell as BellIcon, 
  Search as SearchIcon, 
  LayoutDashboard as LayoutDashboardIcon,
  ArrowLeft as ArrowLeftIcon, 
  ArrowRight as ArrowRightIcon, 
  Download as DownloadIcon, 
  Play as PlayIcon, 
  Clock as ClockIcon, 
  Sparkles as SparklesIcon, 
  Globe as GlobeIcon, 
  Link as LinkIcon, 
  Briefcase as BriefcaseIcon, 
  Calendar as CalendarIcon, 
  Save as SaveIcon,
  CreditCard as CreditCardIcon,
  Smartphone as SmartphoneIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown as ChevronDownIcon, LogOut as LogOutIcon } from "lucide-react";
import logo from "@/assets/logo_transparent.png";

const Academy = () => {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { courses, enrollments, certificates, isLoading: loadingCourses, invalidateAll } = useAcademyData();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (!authLoading && !user && activeTab === "home") {
      setActiveTab("catalog");
    }
  }, [user, authLoading, activeTab]);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<any>(null);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profileForm, setProfileForm] = useState<any>({
    full_name: '',
    phone_number: '',
    bio: '',
    country: '',
    city: '',
    date_of_birth: '',
    gender: 'Other',
    linkedin_url: '',
    portfolio_url: '',
    company_name: '',
    industry: '',
    job_title: '',
    institution: '',
    degree: '',
    graduation_year: '',
    experience_years: '',
    skills: []
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        phone_number: profile.phone_number || '',
        bio: profile.bio || '',
        country: profile.country || '',
        city: profile.city || '',
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || 'Other',
        linkedin_url: profile.linkedin_url || '',
        portfolio_url: profile.portfolio_url || '',
        company_name: profile.company_name || '',
        industry: profile.industry || '',
        job_title: profile.job_title || '',
        institution: profile.institution || '',
        degree: profile.degree || '',
        graduation_year: profile.graduation_year || '',
        experience_years: profile.experience_years || '',
        skills: profile.skills || []
      });
    }
  }, [profile]);

  const navigate = useNavigate();

  const handleDownloadPDF = async (cert: any) => {
    setActiveCert(cert);
    setIsDownloading(true);
    setTimeout(async () => {
      if (certificateRef.current) {
        try {
          const canvas = await html2canvas(certificateRef.current, { scale: 3, useCORS: true, backgroundColor: '#fffdf7', logging: false, removeContainer: true });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1122.5, 793.7] });
          pdf.addImage(imgData, 'PNG', 0, 0, 1122.5, 793.7);
          pdf.save(`Star9_Certificate_${cert.credential_id}.pdf`);
          toast.success("Certificate downloaded successfully");
        } catch (err) {
          toast.error("Failed to generate PDF. Please try again.");
        } finally {
          setIsDownloading(false);
          setActiveCert(null);
        }
      }
    }, 500);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const expValue = !profileForm.experience_years ? null : parseInt(String(profileForm.experience_years), 10);

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profileForm.full_name,
        phone_number: profileForm.phone_number,
        bio: profileForm.bio || '',
        country: profileForm.country || '',
        city: profileForm.city || '',
        date_of_birth: profileForm.date_of_birth,
        gender: profileForm.gender,
        linkedin_url: profileForm.linkedin_url,
        portfolio_url: profileForm.portfolio_url,
        company_name: profileForm.company_name,
        industry: profileForm.industry,
        job_title: profileForm.job_title,
        institution: profileForm.institution,
        degree: profileForm.degree,
        graduation_year: profileForm.graduation_year,
        experience_years: expValue,
        skills: profileForm.skills || [],
        email: user?.email || '',
      }, { onConflict: 'id' });
    setSaving(false);
    if (!error) {
      await refreshProfile();
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
      user_id: user?.id,
      course_id: courseId,
      credential_id: credId,
    }]);
    
    if (!error) {
      toast.success("Certificate Issued", { description: "Your certificate is ready to download." });
      invalidateAll();
    }
  };

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [exchangeRate] = useState(150); // Set fixed rate for launch

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast.info("Sign in Required", { description: "You need to create a free account to enroll in courses." });
      navigate("/auth");
      return;
    }
    setEnrolling(courseId);
    setPaymentModalOpen(true);
  };

  const initiatePayment = (currency: 'USD' | 'KES') => {
    const courseId = enrolling;
    if (!courseId) return;

    const courseObj = courses.find(c => c.id === courseId);
    let basePrice = 50; // New default price for AI for Freelancers
    if (courseObj?.title.toLowerCase().includes("mastering freelancing")) basePrice = 100;
    if (courseObj?.title.toLowerCase().includes("teacher preparation")) basePrice = 300;

    const amount = currency === 'USD' ? basePrice * 100 : Math.round(basePrice * exchangeRate) * 100;

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    try {
      if ((window as any).PaystackPop) {
        const handler = (window as any).PaystackPop.setup({
          key: paystackKey,
          email: user?.email || "student@star9global.com",
          amount: amount,
          currency: currency,
          channels: currency === 'USD' 
            ? ['card', 'apple_pay', 'google_pay'] 
            : ['card', 'mobile_money', 'bank_transfer'],
          ref: 'ST9_' + Math.floor((Math.random() * 1000000000) + 1),
          metadata: {
             custom_fields: [
                { display_name: "Internal User ID", variable_name: "user_id", value: user.id },
                { display_name: "Course Lookup Hash", variable_name: "course_id", value: courseId }
             ]
          },
          callback: function(response: any) {
            toast.success(`Payment verified! Reference: ${response.reference}`);
            setPaymentModalOpen(false);
            setEnrolling(null);
            setTimeout(() => { invalidateAll(); }, 5000); 
          },
          onClose: function() {
            setEnrolling(null);
            setPaymentModalOpen(false);
          }
        });
        handler.openIframe();
      } else {
        toast.error("Payment Gateway unreachable.");
        setEnrolling(null);
      }
    } catch (err) {
      console.error(err);
      setEnrolling(null);
    }
  };

  // finalizeEnrollment function intentionally deleted for security purposes.
  // Real enrollments are now handled solely via supabase/functions/paystack-webhook

  const handleLessonComplete = async (courseId: string, lessonIdx: number, lessonsCount: number) => {
    if (!user || !profile) return;
    const newProgress = Math.round(((lessonIdx + 1) / lessonsCount) * 100);
    
    // 1. Update Lesson Progress
    const { error: progressError } = await supabase
      .from('user_enrollments')
      .update({ progress: newProgress })
      .match({ user_id: user.id, course_id: courseId });
      
    if (!progressError) {
      // 2. Award Merit Points (+10 for lesson, +50 for completion)
      const pointsToAward = newProgress >= 100 ? 50 : 10;
      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ merit_points: (profile.merit_points || 0) + pointsToAward })
        .eq('id', user.id);

      if (!pointsError) {
        toast.success(`+${pointsToAward} Merit Points`, { 
          description: newProgress >= 100 ? "Course Completed!" : "Lesson finished." 
        });
        await refreshProfile();
      }

      // 3. Issue Certificate if completed
      if (newProgress >= 100) {
        const alreadyHasCert = certificates.some(c => c.course_id === courseId);
        if (!alreadyHasCert) {
          await issueCertificate(courseId);
        }
      }
      invalidateAll();
    }
  };

  const navItems = [
    { id: "home",         icon: HomeIcon,       label: "Home",         public: true,  priority: "primary" },
    { id: "academy",      icon: BookOpenIcon,   label: "My Courses",   public: false, priority: "primary" },
    { id: "catalog",      icon: GlobeIcon,      label: "Browse",       public: true,  priority: "primary" },
    { id: "careers",      icon: BriefcaseIcon,  label: "Jobs",         public: true,  priority: "primary" },
    { id: "certificates", icon: AwardIcon,      label: "Certificates", public: false, priority: "primary" },
    { id: "community",    icon: UsersIcon,      label: "Community",    public: false, priority: "secondary" },
    { id: "referral",     icon: LinkIcon,       label: "Referrals",    public: false, priority: "secondary" },
    { id: "events",       icon: CalendarIcon,   label: "Events",       public: true,  priority: "secondary" },
    { id: "settings",     icon: SettingsIcon,   label: "Settings",     public: false, priority: "profile" },
  ];

  const studentLinks = (user ? navItems : navItems.filter(l => l.public)).filter(l => l.priority === "primary");
  const secondaryLinks = (user ? navItems : navItems.filter(l => l.public)).filter(l => l.priority === "secondary");
  const profileLinks = (user ? navItems : navItems.filter(l => l.public)).filter(l => l.priority === "profile");

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation - hidden on mobile */}
      <div className="hidden md:flex fixed top-0 inset-x-0 z-50 justify-center p-4 md:p-6 transition-all duration-500">
        <nav 
          className="flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-lg max-w-full overflow-x-auto no-scrollbar"
        >
          {/* Logo */}
          <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors shrink-0">
            <img src={logo} alt="Star9" className="h-7 w-auto" />
          </Link>

          <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 focus-within:border-primary/40 transition-all group w-48 transition-all">
            <SearchIcon className="size-3.5 text-white/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search..."
              className="bg-transparent text-sm outline-none w-full text-white placeholder:text-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden lg:block h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Navigation Links */}
          <div className="flex items-center gap-1 shrink-0">
            {studentLinks.map((l) => {
              const isActive = activeTab === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveTab(l.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {isActive && (
                    <div 
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full" 
                    />
                  )}
                  <l.icon className="size-4 shrink-0 relative z-10" />
                  <span className={`text-xs font-medium hidden xl:inline-block relative z-10 ${isActive ? "opacity-100" : ""}`}>
                    {l.label}
                  </span>
                </button>
              );
            })}

            {/* Resources Dropdown */}
            {secondaryLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-full text-muted-foreground hover:text-foreground transition-all text-sm">
                    <LayoutDashboardIcon className="size-4" />
                    <span className="text-xs font-medium hidden xl:inline-block">Resources</span>
                    <ChevronDownIcon className="size-3 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-zinc-950 border-white/10 rounded-2xl shadow-2xl">
                  <DropdownMenuLabel className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">More Options</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  {secondaryLinks.map((l) => (
                    <DropdownMenuItem 
                      key={l.id} 
                      onClick={() => setActiveTab(l.id)}
                      className={`gap-3 p-3 rounded-xl cursor-pointer ${activeTab === l.id ? "bg-primary/10 text-primary" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                    >
                      <l.icon className="size-4" />
                      <span className="text-xs font-medium">{l.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="hidden lg:block h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Points & Profile / Auth Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-full">
                  <SparklesIcon className="size-3 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-500">{profile?.merit_points || 0}</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group relative size-8 rounded-full border border-border bg-muted overflow-hidden transition-all hover:border-primary/40">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <span className="text-xs font-semibold text-muted-foreground">{profile?.full_name?.charAt(0) || "U"}</span>
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ChevronDownIcon className="size-3 text-white" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-white/10 rounded-2xl shadow-2xl p-2">
                    <DropdownMenuLabel className="px-3 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white tracking-tight">{profile?.full_name || "Star9 Member"}</p>
                        <p className="text-[10px] font-mono text-zinc-500 truncate">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    {profileLinks.map((l) => (
                      <DropdownMenuItem 
                        key={l.id} 
                        onClick={() => setActiveTab(l.id)}
                        className={`gap-3 p-3 rounded-xl cursor-pointer ${activeTab === l.id ? "bg-primary/10 text-primary" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                      >
                        <l.icon className="size-4" />
                        <span className="text-xs font-medium">{l.label}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="gap-3 p-3 rounded-xl cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors"
                    >
                      <LogOutIcon className="size-4" />
                      <span className="text-xs font-medium">Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-full text-xs" asChild>
                   <Link to="/auth">Log In</Link>
                </Button>
                <Button size="sm" className="rounded-full text-xs px-5" asChild>
                   <Link to="/auth">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Nav Overlay (Fallback) */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[60] bg-zinc-950/80 backdrop-blur-md" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="pt-6 md:pt-28 pb-20 md:pb-12 min-h-screen flex flex-col">
        <main className="max-w-full mx-auto px-4 md:px-10 lg:px-12 xl:px-20 space-y-8 md:space-y-16 relative z-10 flex-grow flex flex-col w-full">

      {/* MOBILE BOTTOM DOCK */}
      <div className="md:hidden fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
        <div 
          className="flex items-center gap-4 px-6 py-3 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg"
        >
          {studentLinks.slice(0, 5).map((l) => {
            const isActive = activeTab === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setActiveTab(l.id)}
                className={`flex flex-col items-center gap-1 transition-all ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                <l.icon className="size-5" />
                <span className="text-[9px] font-medium">{l.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
        </div>
      </div>

          {selectedProgram ? (
            <ProgramDetailView 
              course={selectedProgram}
              enrollment={enrollments.get(selectedProgram.id)}
              onBack={() => setSelectedProgram(null)}
              onEnroll={() => handleEnroll(selectedProgram.id)}
              onStart={(idx) => { navigate(`/academy/course/${selectedProgram.id}`); setSelectedProgram(null); }}
            />
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
               {['learning', 'catalog'].includes(activeTab) && (
                 <AcademyHero 
                   type={activeTab === 'catalog' ? 'catalog' : 'learning'}
                   userName={profile?.full_name?.split(' ')[0]}
                   onTabChange={setActiveTab}
                 />
               )}

               <div className="space-y-12 pb-20">
                 {activeTab === "home" && <HomeFeed setActiveTab={setActiveTab} courses={courses} enrollments={enrollments} profile={profile} />}

                  {activeTab === "academy" && (
                    <div className="space-y-12 pb-12">
                       {/* Premium Student Dashboard Header */}
                       <div className="relative p-10 md:p-14 rounded-[3rem] bg-zinc-900 border border-white/5 overflow-hidden group shadow-2xl">
                          <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                             <SparklesIcon className="size-64 text-primary" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
                          
                          <div className="relative z-10 space-y-6">
                             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                Student Command Centre
                             </div>
                             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white">
                                Intelligence <span className="text-primary underline decoration-primary/30 underline-offset-8">Hub</span>
                             </h2>
                             <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed">
                                Deploy your skills to the global market. Your active learning modules and career progress are tracked here.
                             </p>
                             
                             <div className="flex flex-wrap gap-8 pt-4">
                               <div className="space-y-1">
                                 <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Active Modules</p>
                                 <p className="text-2xl font-black text-white">{courses.filter(c => enrollments.has(c.id)).length}</p>
                               </div>
                               <div className="h-10 w-px bg-white/10" />
                               <div className="space-y-1">
                                 <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Merit Points</p>
                                 <p className="text-2xl font-black text-amber-500 flex items-center gap-2">
                                   {profile?.merit_points || 0}
                                   <SparklesIcon className="size-5" />
                                 </p>
                               </div>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-8">
                         <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">In-Progress Curriculums</h3>
                            {searchQuery && (
                              <Badge variant="outline" className="text-[10px] font-mono border-white/10">Filter: {searchQuery}</Badge>
                            )}
                         </div>

                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                           {courses
                             .filter(c => enrollments.has(c.id))
                             .filter(c => !c.title.toLowerCase().includes("teacher")) // Moved to Global
                             .filter(c => 
                               searchQuery === "" || 
                               c.title.toLowerCase().includes(searchQuery.toLowerCase())
                             )
                             .map((course) => (
                               <div key={course.id} className="group relative">
                                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-violet-600/40 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-20 transition duration-700" />
                                  <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-zinc-950 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                                    <CourseCard 
                                      course={course} 
                                      enrollment={enrollments.get(course.id)} 
                                      onOpen={() => navigate(`/academy/course/${course.id}`)} 
                                    />
                                  </div>
                               </div>
                             ))
                           }
                           
                           {courses.filter(c => enrollments.has(c.id)).length === 0 && (
                              <div className="col-span-full py-24 flex flex-col items-center text-center space-y-8 glass rounded-[3rem] border-white/5">
                                 <div className="size-32 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10 relative">
                                    <BookOpenIcon className="size-12 text-zinc-700" />
                                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                                 </div>
                                 <div className="max-w-xs space-y-2">
                                    <h3 className="text-2xl font-black text-white italic tracking-tight">Vault Empty</h3>
                                    <p className="text-zinc-500 text-sm">You haven't initialized any modules yet. Your global career starts at the catalog.</p>
                                 </div>
                                 <Button className="h-14 px-10 rounded-2xl bg-primary text-white font-bold tracking-widest text-xs uppercase" onClick={() => setActiveTab('catalog')}>
                                   Browse Knowledge Vault
                                 </Button>
                              </div>
                           )}
                         </div>
                       </div>
                    </div>
                  )}

                  {activeTab === "catalog" && (
                    <div className="space-y-12 pb-20">
                       {!user && (
                         <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 md:p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                               <SparklesIcon className="size-32 text-primary" />
                            </div>
                            <div className="relative z-10 space-y-4 max-w-2xl">
                               <h2 className="text-3xl md:text-4xl font-bold tracking-tighter italic">Transform Your Business <span className="text-primary">With AI & Global Strategy</span></h2>
                               <p className="text-zinc-500 text-sm md:text-base leading-relaxed">Join thousands of professionals already mastering the digital economy. Create a free account to track your progress and earn verifiable global credentials.</p>
                               <div className="flex flex-wrap gap-4 pt-4">
                                  <Button className="h-12 px-8 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold tracking-widest text-[10px] uppercase shadow-lg shadow-primary/20" asChild>
                                     <Link to="/auth">Sign Up Free</Link>
                                  </Button>
                                  <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                     <UsersIcon className="size-3" /> Already 520+ Active Students
                                  </p>
                               </div>
                            </div>
                         </div>
                       )}

                       <div className="relative pt-8">
                          <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-white/5"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-[#09090b] px-6 text-[10px] font-mono font-black uppercase tracking-[0.5em] text-zinc-600">
                               Available Curriculums
                            </span>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
                        {courses
                          .filter(c => !enrollments.has(c.id))
                          .filter(c => !c.title.toLowerCase().includes("teacher")) // Teacher Preparation is now in Global hub
                          .filter(c => 
                            searchQuery === "" || 
                            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.category.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((course) => (
                            <CourseCard key={course.id} course={course} enrollment={enrollments.get(course.id)} isEnrolling={enrolling === course.id} onEnroll={() => handleEnroll(course.id)} onViewDetails={() => setSelectedProgram(course)} />
                          ))
                        }
                      </div>
                   </div>
                 )}

                 {activeTab === "certificates" && (
                   <div className="space-y-8 relative z-10 animate-in fade-in duration-500">
                     <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8 rounded-3xl border border-primary/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-sm">
                        <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                           <AwardIcon className="size-8 text-primary" />
                        </div>
                        <div className="relative z-10 flex-1 text-center md:text-left">
                           <h2 className="text-2xl font-bold tracking-tight mb-2">Your Credentials Vault</h2>
                           <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto md:mx-0">Every certificate you earn is cryptographically tied to your profile and verifiable globally. Showcasing these on LinkedIn can significantly increase hiring velocity.</p>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-8 opacity-[0.04] pointer-events-none">
                           <AwardIcon className="size-64 -rotate-12" />
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/50" />
                        <h3 className="text-sm font-medium text-muted-foreground">Obtained Certificates</h3>
                        <div className="h-px flex-1 bg-border/50" />
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                       {certificates.map((cert) => (
                         <Card key={cert.id} className="glass overflow-hidden group">
                           <div className="h-40 bg-zinc-900 flex flex-col items-center justify-center p-6 border-b border-white/5 relative">
                             <AwardIcon className="w-16 h-16 text-primary/20 mb-2" />
                             <p className="text-[10px] font-mono tracking-widest text-primary uppercase">Star9 Certificate</p>
                           </div>
                           <CardHeader className="text-center">
                             <CardTitle className="text-lg">{cert.academy_courses?.title}</CardTitle>
                             <CardDescription className="font-mono text-[10px] uppercase tracking-widest">ID: {cert.credential_id}</CardDescription>
                           </CardHeader>
                           <CardFooter className="flex gap-2">
                             <Button className="flex-1 bg-primary/10 text-primary border-primary/20" variant="outline" onClick={() => handleDownloadPDF(cert)}>Download PDF</Button>
                           </CardFooter>
                         </Card>
                       ))}
                     </div>
                   </div>
                 )}

                 {activeTab === "community" && <CommunityChat user={user} profile={profile} />}

                 {activeTab === "events" && (
                   <div className="space-y-6">
                      <div className="flex items-center gap-3 text-center opacity-70 p-16">
                         <CalendarIcon className="size-16 mx-auto mb-6 text-muted-foreground" />
                         <h2 className="text-2xl font-bold">No Events Scheduled</h2>
                      </div>
                   </div>
                 )}

                  {activeTab === "referral" && (
                    user
                      ? <ReferralDashboard user={user} profile={profile} />
                      : (
                        <div className="text-center py-24 space-y-4">
                          <LinkIcon className="size-12 mx-auto text-muted-foreground" />
                          <h3 className="text-xl font-bold">Sign in to access Referrals</h3>
                          <p className="text-muted-foreground text-sm max-w-sm mx-auto">Create a free account to get your referral link and start earning commissions.</p>
                          <Button asChild><Link to="/auth">Sign Up Free</Link></Button>
                        </div>
                      )
                  )}

                 {activeTab === "careers" && <JobBoard />}

                 {activeTab === "settings" && (
                   <UserSettings 
                     user={user} profile={profile} profileForm={profileForm} setProfileForm={setProfileForm}
                     saving={saving} handleSaveProfile={handleSaveProfile} newSkill={newSkill} setNewSkill={setNewSkill}
                     addSkill={addSkill} removeSkill={removeSkill} certificates={certificates} handleLogout={handleLogout}
                   />
                 )}
               </div>
            </div>
          )}
          <AcademyFooter />
        </main>
      </div>

      {/* Persistence Modal for Certificates (Hidden) */}
      <div className="fixed -left-[2000px] top-0 pointer-events-none">
        {activeCert && (
          <div ref={certificateRef}>
             <CertificateTemplate 
                studentName={profile?.full_name || "Member"} 
                courseTitle={activeCert.academy_courses?.title || "Star9 Mastery Class"}
                issueDate={new Date(activeCert.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                credentialId={activeCert.credential_id}
             />
          </div>
        )}
      </div>

      {/* Payment Selection Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={(open) => { if(!open) { setPaymentModalOpen(false); setEnrolling(null); } }}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-zinc-950 border-white/10 shadow-2xl rounded-3xl">
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold tracking-tight italic">Secure <span className="text-primary">Checkout</span></DialogTitle>
              <DialogDescription className="text-zinc-500">Choose your preferred payment method. Next cohort launch: May 4th.</DialogDescription>
            </div>

            <div className="grid gap-4">
              <button 
                onClick={() => initiatePayment('USD')}
                className="group relative flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CreditCardIcon className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">International Card</h4>
                    <p className="text-xs text-zinc-500">Secure USD Transaction (Equity Bank)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-black text-white">$ {
                    courses.find(c => c.id === enrolling)?.title?.toLowerCase()?.includes("mastering freelancing") ? "100" : 
                    (courses.find(c => c.id === enrolling)?.title?.toLowerCase()?.includes("teacher preparation") || courses.find(c => c.id === enrolling)?.title?.toLowerCase()?.includes("teacher prep")) ? "300" : "50"
                  }</p>
                </div>
              </button>

              <button 
                onClick={() => initiatePayment('KES')}
                className="group relative flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <SmartphoneIcon className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">M-Pesa / Local Card</h4>
                    <p className="text-xs text-zinc-500">Mobile Money & Local KES Banks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-black text-emerald-400">
                    KES {Math.round((
                      courses.find(c => c.id === enrolling)?.title?.toLowerCase()?.includes("mastering freelancing") ? 100 : 
                      (courses.find(c => c.id === enrolling)?.title?.toLowerCase()?.includes("teacher preparation") || courses.find(c => c.id === enrolling)?.title?.toLowerCase()?.includes("teacher prep")) ? 300 : 50
                    ) * exchangeRate).toLocaleString()}
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-4 flex flex-col items-center gap-4 border-t border-white/5">
               <div className="flex items-center gap-3 opacity-40">
                  <GlobeIcon className="size-3" />
                  <span className="text-[10px] uppercase tracking-widest font-mono">End-to-End Encrypted</span>
               </div>
               <p className="text-[10px] text-center text-zinc-600 leading-relaxed italic">
                 "Freelancing with heart and skill." - Star9 Global Platform
               </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Academy;
