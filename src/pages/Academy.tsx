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
  Save as SaveIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast.info("Sign in Required", { description: "You need to create a free account to enroll in courses." });
      navigate("/auth");
      return;
    }
    setEnrolling(courseId);

    const courseObj = courses.find(c => c.id === courseId);
    let price = 100;
    if (courseObj?.title.toLowerCase().includes("mastering")) price = 250;
    if (courseObj?.title.toLowerCase().includes("teacher")) price = 300;

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    try {
      if ((window as any).PaystackPop) {
        const handler = (window as any).PaystackPop.setup({
          key: paystackKey,
          email: user?.email || "student@star9global.com",
          amount: price * 100, // strictly in cents
          currency: 'USD', // Lock to Equity USD parameters
          ref: 'ST9_' + Math.floor((Math.random() * 1000000000) + 1),
          // Crucial Metadata payload for Webhooks + DB integration
          metadata: {
             custom_fields: [
                { display_name: "Internal User ID", variable_name: "user_id", value: user.id },
                { display_name: "Course Lookup Hash", variable_name: "course_id", value: courseId }
             ]
          },
          callback: function(response: any) {
            toast.success(`Payment verified by processor! Reference: ${response.reference}`);
            toast.info(`Please allow up to 60 seconds for the Global Cloud Node to authorize your module unlocks.`);
            setEnrolling(null);
            // The Webhook asynchronously writes to the database. 
            setTimeout(() => { invalidateAll(); }, 5000); 
          },
          onClose: function() {
            toast.error("Transaction cancelled", { description: "You must complete the payment to access the course." });
            setEnrolling(null);
          }
        });
        handler.openIframe();
      } else {
        toast.error("Payment Gateway unreachable. Try refreshing the page.");
        setEnrolling(null);
      }
    } catch (e) {
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

  const allLinks = [
    { id: "home",        icon: HomeIcon,       label: "Home",        public: true },
    { id: "academy",     icon: BookOpenIcon,   label: "My Courses",  public: false },
    { id: "catalog",     icon: GlobeIcon,      label: "Browse",      public: true },
    { id: "certificates",icon: AwardIcon,      label: "Certificates",public: false },
    { id: "community",   icon: UsersIcon,      label: "Community",   public: false },
    { id: "careers",     icon: BriefcaseIcon,  label: "Jobs",        public: true },
    { id: "referral",    icon: LinkIcon,   label: "Referrals",   public: false },
    { id: "events",      icon: CalendarIcon,   label: "Events",      public: true },
    { id: "settings",    icon: SettingsIcon,   label: "Settings",    public: false },
  ];

  const studentLinks = user ? allLinks : allLinks.filter(l => l.public);

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
          className="flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-lg max-w-full overflow-x-auto no-scrollbar"
        >
          {/* Logo */}
          <Link to="/" className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
            <img src={logo} alt="Star9" className="h-7 w-auto" />
          </Link>

          <div className="h-6 w-px bg-border mx-1 shrink-0" />

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border focus-within:border-primary/40 transition-all group w-48">
            <SearchIcon className="size-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden lg:block h-6 w-px bg-border mx-1 shrink-0" />

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
          </div>

          <div className="h-6 w-px bg-border mx-1 shrink-0" />

          {/* Points & Profile / Auth Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-full">
                  <SparklesIcon className="size-3 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-500">{profile?.merit_points || 0}</span>
                </div>

                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className="size-8 rounded-full border border-border bg-muted overflow-hidden transition-all hover:border-primary/40"
                      >
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">{profile?.full_name?.charAt(0) || "U"}</span>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Settings</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                  title="Log Out"
                >
                  <ArrowRightIcon className="size-4 rotate-180" />
                </button>
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
          {studentLinks.slice(0, user ? 5 : 4).map((l) => {
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
                 />
               )}

               <div className="space-y-12 pb-20">
                 {activeTab === "home" && <HomeFeed setActiveTab={setActiveTab} courses={courses} enrollments={enrollments} profile={profile} />}

                 {activeTab === "academy" && (
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <div className="h-px flex-1 bg-border/50" />
                          <h3 className="text-sm font-medium text-primary">Your Learning Progress</h3>
                         <div className="h-px flex-1 bg-border/50" />
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses
                          .filter(c => enrollments.has(c.id))
                          .filter(c => 
                            searchQuery === "" || 
                            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.category.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((course) => (
                            <CourseCard key={course.id} course={course} enrollment={enrollments.get(course.id)} onOpen={() => navigate(`/academy/course/${course.id}`)} />
                          ))
                        }
                        {courses.filter(c => enrollments.has(c.id)).length === 0 && (
                           <Card className="glass border-dashed p-12 text-center col-span-full opacity-60">
                              <BookOpenIcon className="size-12 mx-auto mb-4 text-muted-foreground" />
                               <h3 className="font-bold">No courses yet</h3>
                               <Button className="mt-6" variant="outline" onClick={() => setActiveTab('catalog')}>Browse Courses</Button>
                           </Card>
                        )}
                      </div>
                   </div>
                 )}

                 {activeTab === "catalog" && (
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <div className="h-px flex-1 bg-border/50" />
                         <h3 className="text-sm font-medium text-muted-foreground">All Courses</h3>
                         <div className="h-px flex-1 bg-border/50" />
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses
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

    </div>
  );
};

export default Academy;
