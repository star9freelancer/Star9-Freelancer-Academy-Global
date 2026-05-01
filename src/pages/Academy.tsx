import React, { useState, useEffect, useRef } from "react";
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
  Search as SearchIcon, 
  LayoutDashboard as LayoutDashboardIcon,
  ArrowRight as ArrowRightIcon, 
  Sparkles as SparklesIcon, 
  Globe as GlobeIcon, 
  Link as LinkIcon, 
  Briefcase as BriefcaseIcon, 
  Calendar as CalendarIcon, 
  CreditCard as CreditCardIcon,
  Smartphone as SmartphoneIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon,
  Music as MusicIcon,
  LogOut as LogOutIcon,
  ChevronDown as ChevronDownIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  User as UserIcon,
  Trophy as TrophyIcon,
  Plane as PlaneIcon,
  Check as CheckIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import logo from "@/assets/logo_transparent.png";
import { getStoredTheme, applyTheme } from "@/lib/theme";

const STAR9_EXCHANGE_RATE = 150;

const Academy = () => {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { 
    courses, enrollments, certificates, 
    isLoading: loadingCourses, 
    isError: isDataError, 
    error: dataError,
    invalidateAll 
  } = useAcademyData();
  
  const [forceShow, setForceShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => getStoredTheme());
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profileForm, setProfileForm] = useState<any>({
    full_name: '', phone_number: '', bio: '', country: '', city: '',
    date_of_birth: '', gender: 'Other', linkedin_url: '', portfolio_url: '',
    company_name: '', industry: '', job_title: '', institution: '',
    degree: '', graduation_year: '', experience_years: '', skills: [],
    national_id_passport: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShow(true);
      if (authLoading || (loadingCourses && !courses.length)) setShowError(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [authLoading, loadingCourses, courses.length]);

  useEffect(() => { applyTheme(isDarkMode); }, [isDarkMode]);

  useEffect(() => {
    if (profile) setProfileForm({
      ...profile,
      experience_years: profile.experience_years || '',
      skills: profile.skills || []
    });
  }, [profile]);

  useEffect(() => {
    if (!authLoading && !user && activeTab === "home") setActiveTab("catalog");
    if (profile?.role === 'referrer' && activeTab === 'home') setActiveTab('referral');
  }, [user, profile, authLoading, activeTab]);

  const handleThemeToggle = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      ...profileForm, id: user.id, email: user.email
    });
    setSaving(false);
    if (!error) {
      await refreshProfile();
      toast.success('Profile saved!');
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfileForm({ ...profileForm, skills: [...(profileForm.skills || []), newSkill.trim()] });
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setProfileForm({ ...profileForm, skills: (profileForm.skills || []).filter((s: string) => s !== skill) });
  };

  const handleEnroll = (courseId: string) => {
    if (!user) { navigate('/auth'); return; }
    setEnrolling(courseId);
    setPaymentModalOpen(true);
  };

  const initiatePayment = (currency: 'USD' | 'KES' | 'GHS') => {
    const courseId = enrolling;
    if (!courseId) return;
    const courseObj = courses.find(c => c.id === courseId);
    let basePrice = 50;
    if (courseObj?.title.toLowerCase().includes("mastering freelancing")) basePrice = 100;
    if (courseObj?.title.toLowerCase().includes("teacher preparation")) basePrice = 1500;
    
    let amount = basePrice * 100;
    if (currency === 'KES') amount = Math.round(basePrice * STAR9_EXCHANGE_RATE) * 100;
    if (currency === 'GHS') amount = Math.round(basePrice * 15) * 100;

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!paystackKey) { toast.error("Payment configuration error."); return; }
    setPaymentModalOpen(false);
    if ((window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey, email: user?.email, amount, currency,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ref: 'ST9_' + Math.floor(Math.random() * 1e9),
        callback: () => { toast.success("Enrollment Synchronizing..."); setTimeout(() => invalidateAll(), 3000); },
        onClose: () => setEnrolling(null)
      });
      handler.openIframe();
    }
  };

  const handleDownloadPDF = async (cert: any) => {
    setActiveCert(cert);
    setIsDownloading(true);
    setTimeout(async () => {
      if (certificateRef.current) {
        const canvas = await html2canvas(certificateRef.current, { scale: 2 });
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1122.5, 793.7] });
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 1122.5, 793.7);
        pdf.save(`Star9_Certificate_${cert.credential_id}.pdf`);
        setIsDownloading(false);
        setActiveCert(null);
      }
    }, 500);
  };

  if ((authLoading || loadingCourses) && !forceShow) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <img src={logo} className="size-20 animate-pulse" alt="Logo" />
        <div className="flex gap-1"><div className="w-2 h-2 bg-primary rounded-full animate-bounce" /><div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" /><div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" /></div>
      </div>
    );
  }

  if (isDataError || (showError && !courses.length)) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <GlobeIcon className="size-16 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold text-white">Vault Connection Refused</h2>
        <Button onClick={() => window.location.reload()}>Reconnect to Academy</Button>
      </div>
    );
  }

  const mainNavItems = [
    { id: "home", icon: HomeIcon, label: "Home", public: true },
    { id: "academy", icon: BookOpenIcon, label: "Vault", public: false },
    { id: "catalog", icon: GlobeIcon, label: "Catalog", public: true },
  ];

  const moreNavItems = [
    { id: "careers", icon: BriefcaseIcon, label: "Careers", public: true },
    { id: "referral", icon: LinkIcon, label: "Referrals", public: true },
    { id: "community", icon: UsersIcon, label: "Social", public: false },
    { id: "certificates", icon: AwardIcon, label: "Credentials", public: false },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/20">
      {/* Dynamic Aura */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <div className="absolute hidden md:block top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px]" />
        <div className="absolute hidden md:block bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[120px]" />
      </div>

      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center p-2 md:p-6 pointer-events-none">
        <div className="flex items-center gap-1 md:gap-4 px-2 md:px-6 py-2 md:py-3 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-2xl pointer-events-auto max-w-[98vw] overflow-x-auto no-scrollbar">
          <Link to="/" className="flex items-center gap-2 shrink-0"><img src={logo} className="h-6 md:h-8" /><span className="font-black italic text-xl hidden lg:block">STAR<span className="text-primary">9</span></span></Link>
          <div className="h-6 w-px bg-border mx-1 md:mx-2 shrink-0" />
          <div className="flex items-center gap-0.5 md:gap-1">
            {mainNavItems.filter(i => i.public || user).map(item => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all shrink-0 ${activeTab === item.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent"}`}
              >
                <item.icon className="size-3.5 md:size-4" /> <span className="hidden xl:block">{item.label}</span>
              </button>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all text-muted-foreground hover:bg-accent outline-none shrink-0">
                More <ChevronDownIcon className="size-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-2xl p-2 mt-2">
                {moreNavItems.filter(i => i.public || user).map(item => (
                  <DropdownMenuItem 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)} 
                    className={`rounded-xl gap-2 p-3 cursor-pointer ${activeTab === item.id ? "bg-primary/10 text-primary" : ""}`}
                  >
                    <item.icon className="size-4" /> {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="h-6 w-px bg-border mx-1 md:mx-2 shrink-0" />
          <button onClick={() => setSearchDialogOpen(true)} className="p-1.5 md:p-2 shrink-0"><SearchIcon className="size-3.5 md:size-4" /></button>
          <button onClick={handleThemeToggle} className="p-1.5 md:p-2 shrink-0">{isDarkMode ? <SunIcon className="size-3.5 md:size-4" /> : <MoonIcon className="size-3.5 md:size-4" />}</button>
          
          <div className="shrink-0 ml-1">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="size-8 md:size-10 rounded-full border-2 border-primary/20 p-0.5 hover:border-primary/50 transition-colors bg-primary/5 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                      alt="Avatar" 
                      className="size-full rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-4">
                  <DropdownMenuLabel className="px-3 py-4"><p className="font-bold">{profile?.full_name}</p><p className="text-[10px] text-muted-foreground">{user.email}</p></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab('settings')} className="rounded-xl gap-2 p-3 cursor-pointer"><SettingsIcon className="size-4" /> Account Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl gap-2 p-3 text-destructive cursor-pointer"><LogOutIcon className="size-4" /> Disconnect</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : <Button size="sm" className="rounded-full px-4 md:px-6 h-8 md:h-10 text-[10px] md:text-xs" asChild><Link to="/auth">Access</Link></Button>}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex-grow">
        {selectedProgram ? (
          <ProgramDetailView 
            course={selectedProgram} onBack={() => setSelectedProgram(null)}
            enrollment={enrollments.get(selectedProgram.id)} 
            onEnroll={() => handleEnroll(selectedProgram.id)} 
            onStart={() => navigate(`/academy/course/${selectedProgram.id}`)}
          />
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {['academy', 'catalog'].includes(activeTab) && <AcademyHero type={activeTab === 'catalog' ? 'catalog' : 'learning'} userName={profile?.full_name?.split(' ')[0]} onTabChange={setActiveTab} />}
            
            <div className="min-h-[400px]">
              {activeTab === "home" && <HomeFeed setActiveTab={setActiveTab} courses={courses} enrollments={enrollments} profile={profile} />}
              
              {(activeTab === "academy" || activeTab === "catalog") && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {courses
                    .filter(c => (activeTab === "academy" ? enrollments.has(c.id) : true))
                    .filter(c => !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(course => (
                      <CourseCard 
                        key={course.id} course={course} 
                        enrollment={enrollments.get(course.id)}
                        onEnroll={() => handleEnroll(course.id)}
                        onViewDetails={() => setSelectedProgram(course)}
                        onOpen={() => navigate(`/academy/course/${course.id}`)}
                      />
                    ))
                  }
                </div>
              )}

              {activeTab === "certificates" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map(cert => (
                    <Card key={cert.id} className="border-border hover:border-primary/50 transition-colors">
                      <CardHeader><CardTitle className="text-lg">{cert.academy_courses?.title}</CardTitle><CardDescription className="text-[10px] font-mono">{cert.credential_id}</CardDescription></CardHeader>
                      <CardFooter><Button className="w-full gap-2 rounded-xl" variant="outline" onClick={() => handleDownloadPDF(cert)}><AwardIcon className="size-4" /> Download Credential</Button></CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "community" && <CommunityChat user={user} profile={profile} />}
              {activeTab === "referral" && <ReferralDashboard user={user} profile={profile} />}
              {activeTab === "careers" && <JobBoard />}
              {activeTab === "settings" && <UserSettings 
                  user={user} profile={profile} profileForm={profileForm} setProfileForm={setProfileForm}
                  saving={saving} handleSaveProfile={handleSaveProfile} newSkill={newSkill} setNewSkill={setNewSkill}
                  addSkill={addSkill} removeSkill={removeSkill} certificates={certificates} handleLogout={handleLogout}
              />}
            </div>
          </div>
        )}
      </main>

      <AcademyFooter />

      {/* Hidden Certificate Ref */}
      <div className="fixed -left-[2000px] top-0 pointer-events-none">
        {activeCert && <div ref={certificateRef}><CertificateTemplate studentName={profile?.full_name} courseTitle={activeCert.academy_courses?.title} issueDate={new Date().toLocaleDateString()} credentialId={activeCert.credential_id} /></div>}
      </div>

      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className={`${courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("teacher") ? "sm:max-w-xl" : "sm:max-w-md"} rounded-3xl p-8 max-h-[90vh] overflow-y-auto no-scrollbar`}>
          <DialogTitle className="text-2xl font-black italic tracking-tighter">Secure <span className="text-primary">Enrollment</span></DialogTitle>
          <DialogDescription>Access the program. Select payment method.</DialogDescription>
          
          {courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("teacher") && (
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 my-4 space-y-4 text-sm animate-in fade-in zoom-in duration-500">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-primary flex items-center gap-2 text-base">
                   <PlaneIcon className="size-5" /> Global Placement Package
                 </h3>
                 <Badge className="bg-primary text-white">Value $3,500+</Badge>
               </div>
               
               <div className="space-y-2">
                 <p className="font-bold text-foreground italic flex items-center gap-2">
                   One-time fee of <span className="text-primary text-lg">$1,500</span> includes:
                 </p>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                   {["Teacher Preparation", "Passport fees", "USA Document Verification", "Visa fee", "Relocation mentorship"].map((item, idx) => (
                     <li key={idx} className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
                       <CheckIcon className="size-3.5 text-emerald-500 shrink-0" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="space-y-4 pt-4 border-t border-primary/10">
                  <div className="flex gap-4 items-start group">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary text-xs group-hover:scale-110 transition-transform">1</div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-widest text-primary mb-1">Phase 1: Vetting & Admin</p>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">Passport application, resume writing, loom video creation, LinkedIn Optimization, and USA Document Verification.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start group">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary text-xs group-hover:scale-110 transition-transform">2</div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-widest text-primary mb-1">Phase 2: Vetting & Interviews</p>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">Comprehensive interview preparation and taking the actual interviews to secure your offer letter.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start group">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary text-xs group-hover:scale-110 transition-transform">3</div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-widest text-primary mb-1">Phase 3: Visa & Travel</p>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">Full support with your Visa application and travel preparations.</p>
                    </div>
                  </div>
               </div>
            </div>
          )}

          <div className="grid gap-3 pt-4">
            <Button onClick={() => initiatePayment('USD')} className="h-14 flex justify-between px-6 rounded-2xl group">
              <span className="flex items-center gap-3"><CreditCardIcon className="size-5" /> Global Card (USD)</span>
              <span className="font-mono">$ {
                courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("teacher") ? "1500" :
                courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("mastering") ? "100" : "50"
              }</span>
            </Button>
            <Button onClick={() => initiatePayment('KES')} variant="outline" className="h-14 flex justify-between px-6 rounded-2xl group border-emerald-500/20 hover:bg-emerald-500/5">
              <span className="flex items-center gap-3"><SmartphoneIcon className="size-5 text-emerald-500" /> M-Pesa (KES)</span>
              <span className="font-mono text-emerald-500">KES {(
                courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("teacher") ? 1500 :
                courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("mastering") ? 100 : 50
              ) * STAR9_EXCHANGE_RATE}</span>
            </Button>
            <Button onClick={() => initiatePayment('GHS')} variant="outline" className="h-14 flex justify-between px-6 rounded-2xl group border-amber-500/20 hover:bg-amber-500/5">
              <span className="flex items-center gap-3"><SmartphoneIcon className="size-5 text-amber-500" /> Airtel / MTN (GHS)</span>
              <span className="font-mono text-amber-500">GH₵ {(
                courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("teacher") ? 1500 :
                courses.find(c => c.id === enrolling)?.title.toLowerCase().includes("mastering") ? 100 : 50
              ) * 15}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className="sm:max-w-2xl rounded-3xl p-0 overflow-hidden border-border bg-card/95 backdrop-blur-none bg-background/100 md:bg-background/98 md:backdrop-blur-2xl">
          <div className="p-6 border-b border-border flex items-center gap-4">
            <SearchIcon className="size-5 text-primary" />
            <input 
              autoFocus className="bg-transparent border-none outline-none w-full text-lg placeholder:text-muted-foreground"
              placeholder="Search intelligence modules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="max-h-[400px] overflow-y-auto p-2">
            {courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
              <div key={c.id} className="p-4 hover:bg-accent rounded-xl cursor-pointer flex justify-between items-center group" onClick={() => { setSelectedProgram(c); setSearchDialogOpen(false); }}>
                <div><p className="font-bold">{c.title}</p><p className="text-[10px] text-muted-foreground">{c.category}</p></div>
                <ArrowRightIcon className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Academy;
