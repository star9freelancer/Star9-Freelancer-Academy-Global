import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { PersonnelSettings } from "@/components/academy/PersonnelSettings";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import logo from "@/assets/logo_transparent.png";

const Academy = () => {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { courses, enrollments, certificates, isLoading: loadingCourses, invalidateAll } = useAcademyData();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [playingCourse, setPlayingCourse] = useState<any | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<any>(null);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
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
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
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
        email: user.email,
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
      user_id: user.id,
      course_id: courseId,
      credential_id: credId,
    }]);
    
    if (!error) {
      toast.success("Credential Issued", { description: "Your certificate is now stored in the Star9 Ledger." });
      invalidateAll();
    }
  };

  const generateLinkedInUrl = (cert: any) => {
    const courseTitle = cert.academy_courses?.title || "Star9 Professional Certification";
    const baseUrl = "https://www.linkedin.com/profile/add";
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: courseTitle,
      organizationName: "Star9 Infrastructure",
      issueYear: new Date(cert.created_at).getFullYear().toString(),
      issueMonth: (new Date(cert.created_at).getMonth() + 1).toString(),
      certId: cert.credential_id,
      certUrl: `${window.location.origin}/verify/${cert.credential_id}`
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    setEnrolling(courseId);
    try {
      const { error } = await supabase
        .from('user_enrollments')
        .insert({ user_id: user.id, course_id: courseId, progress: 0 });
      
      if (error) {
         if (error.code === '23505') {
            toast.error("Already enrolled in this course");
         } else {
            toast.error(`Enrollment failed: ${error.message || 'Please try again.'}`);
         }
      } else {
         toast.success("Successfully enrolled in course");
         invalidateAll();
      }
    } finally {
      setEnrolling(null);
    }
  };

  const handleLessonComplete = async (courseId: string, lessonIdx: number) => {
    if (!user || !playingCourse || !profile) return;
    const lessons = playingCourse.academy_lessons || [];
    const newProgress = Math.round(((lessonIdx + 1) / lessons.length) * 100);
    
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
        toast.success(`+${pointsToAward} Network Merit`, { 
          description: newProgress >= 100 ? "Curriculum Mastery Achieved!" : "Digital skill synchronized." 
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

  const studentLinks = [
    { id: "home", icon: Home, label: "Home Feed" },
    { id: "academy", icon: BookOpen, label: "Learning Path" },
    { id: "catalog", icon: Globe, label: "Program Catalog" },
    { id: "certificates", icon: Award, label: "Credentials" },
    { id: "community", icon: Users, label: "Connect" },
    { id: "careers", icon: Briefcase, label: "Career Engine" },
    { id: "events", icon: Calendar, label: "Personnel Events" },
    { id: "settings", icon: Settings, label: "Protocols" },
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* COMMAND HUB (Floating Nav) */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-500">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="flex items-center gap-2 md:gap-4 px-4 py-2.5 rounded-full glass border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-full overflow-x-auto no-scrollbar relative"
        >
          {/* Logo / Home */}
          <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors shrink-0">
             <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <div className="size-3 bg-primary rounded-sm animate-pulse" />
             </div>
          </Link>

          <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Search Integrated */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 focus-within:border-primary/40 focus-within:bg-white/[0.08] transition-all group w-48">
             <Search className="size-3.5 text-zinc-500 group-focus-within:text-primary transition-colors" />
             <input 
               type="text" 
               placeholder="Protocol Search..." 
               className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none w-full text-zinc-300 placeholder:text-zinc-600"
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
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${isActive ? "text-primary" : "text-zinc-500 hover:text-white"}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="hub-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full shadow-[0_0_20px_rgba(var(--primary),0.1)]" 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <l.icon className={`size-4 shrink-0 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  <span className={`text-[10px] uppercase tracking-widest font-black hidden xl:inline-block relative z-10 transition-all ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto"}`}>
                     {l.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Merit & Profile Identity */}
          <div className="flex items-center gap-2 shrink-0">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 rounded-full group cursor-help hover:bg-amber-500/10 transition-all">
                <Sparkles className="size-3 text-amber-500" />
                <span className="text-[10px] font-mono font-black text-amber-500">{profile?.merit_points || 0}</span>
             </div>

             <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="size-9 rounded-full border border-white/10 bg-zinc-900 group relative overflow-hidden transition-all hover:border-primary/40"
                    >
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-mono text-xs text-primary font-bold">{profile?.full_name?.charAt(0) || "U"}</span>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-950 border-white/5 text-zinc-300 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5">Identity Verification Required</TooltipContent>
                </Tooltip>
             </TooltipProvider>

             <button 
               onClick={handleLogout}
               className="p-2 rounded-full text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
             >
                <ArrowRight className="size-4 rotate-180" />
             </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Nav Overlay (Fallback) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[60] bg-zinc-950/80 backdrop-blur-md" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MAIN CONTENT WRAPPER */}
      <div className="pt-28 md:pt-32 pb-24 lg:pb-0 min-h-screen">
        <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 space-y-16 relative z-10">

      {/* MOBILE BOTTOM DOCK (Personnel Utility Rail) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-4 flex justify-center translate-y-[-10px]">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-6 px-8 py-3.5 rounded-full glass border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
        >
          {studentLinks.slice(0, 4).map((l) => {
            const isActive = activeTab === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setActiveTab(l.id)}
                className={`flex flex-col items-center gap-1.5 transition-all ${isActive ? "text-primary scale-110" : "text-zinc-600 hover:text-zinc-300"}`}
              >
                <l.icon className="size-5" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">{l.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

          {selectedProgram ? (
            <ProgramDetailView 
              course={selectedProgram}
              enrollment={enrollments.get(selectedProgram.id)}
              onBack={() => setSelectedProgram(null)}
              onEnroll={() => handleEnroll(selectedProgram.id)}
              onStart={(idx) => { setPlayingCourse(selectedProgram); setActiveLessonIdx(idx); setSelectedProgram(null); }}
            />
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
               {["home", "academy", "catalog", "community", "careers", "events"].includes(activeTab) && (
                 <AcademyHero 
                   type={activeTab === 'careers' ? 'career' : activeTab === 'catalog' ? 'catalog' : activeTab === 'academy' ? 'learning' : 'community'}
                   userName={profile?.full_name?.split(' ')[0]}
                 />
               )}

               {activeTab === "home" && <HomeFeed setActiveTab={setActiveTab} courses={courses} enrollments={enrollments} profile={profile} />}

               {activeTab === "academy" && (
                 <div className="space-y-8">
                    <div className="flex items-center gap-3">
                       <div className="h-px flex-1 bg-border/50" />
                       <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Active Learning Tracks</h3>
                       <div className="h-px flex-1 bg-border/50" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.filter(c => enrollments.has(c.id)).map((course) => (
                         <CourseCard key={course.id} course={course} enrollment={enrollments.get(course.id)} onOpen={() => { setPlayingCourse(course); setActiveLessonIdx(0); }} />
                      ))}
                      {courses.filter(c => enrollments.has(c.id)).length === 0 && (
                         <Card className="glass border-dashed p-12 text-center col-span-full opacity-60">
                            <BookOpen className="size-12 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="font-bold">No Active Paths Detected</h3>
                            <Button className="mt-6 font-mono text-[10px] bg-primary/20 text-primary border-primary/20" variant="outline" onClick={() => setActiveTab('catalog')}>Open Catalog</Button>
                         </Card>
                      )}
                    </div>
                 </div>
               )}

               {activeTab === "catalog" && (
                 <div className="space-y-8">
                    <div className="flex items-center gap-3">
                       <div className="h-px flex-1 bg-border/50" />
                       <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Global Program Catalog</h3>
                       <div className="h-px flex-1 bg-border/50" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map((course) => (
                        <CourseCard key={course.id} course={course} enrollment={enrollments.get(course.id)} isEnrolling={enrolling === course.id} onEnroll={() => handleEnroll(course.id)} onViewDetails={() => setSelectedProgram(course)} />
                      ))}
                    </div>
                 </div>
               )}

               {activeTab === "certificates" && (
                 <div className="space-y-6 relative z-10">
                   <h1 className="text-3xl font-bold tracking-tight">Earned Credentials</h1>
                   <div className="grid md:grid-cols-2 gap-6">
                     {certificates.map((cert) => (
                       <Card key={cert.id} className="glass overflow-hidden group">
                         <div className="h-40 bg-zinc-900 flex flex-col items-center justify-center p-6 border-b border-white/5 relative">
                           <Award className="w-16 h-16 text-primary/20 mb-2" />
                           <p className="text-[10px] font-mono tracking-widest text-primary uppercase">Star9 Official Transcript</p>
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
                       <Calendar className="size-16 mx-auto mb-6 text-muted-foreground" />
                       <h2 className="text-2xl font-bold">No Events Scheduled</h2>
                    </div>
                 </div>
               )}

               {activeTab === "careers" && <JobBoard />}

               {activeTab === "settings" && (
                 <PersonnelSettings 
                   user={user} profile={profile} profileForm={profileForm} setProfileForm={setProfileForm}
                   saving={saving} handleSaveProfile={handleSaveProfile} newSkill={newSkill} setNewSkill={setNewSkill}
                   addSkill={addSkill} removeSkill={removeSkill} certificates={certificates} handleLogout={handleLogout}
                 />
               )}
            </div>
          )}
        </main>
      </div>

      {/* Persistence Modal for Certificates (Hidden) */}
      <div className="fixed -left-[2000px] top-0 pointer-events-none">
        {activeCert && (
          <div ref={certificateRef}>
             <CertificateTemplate 
                studentName={profile?.full_name || "Personnel"} 
                courseName={activeCert.academy_courses?.title || "Star9 Mastery Class"}
                date={new Date(activeCert.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                credentialId={activeCert.credential_id}
             />
          </div>
        )}
      </div>

      {/* Video Player Overlay */}
      {playingCourse && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-500">
           <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 shrink-0">
              <div className="flex items-center gap-4">
                 <img src={logo} alt="Star9" className="h-6 brightness-200" />
                 <div className="h-4 w-px bg-white/10" />
                 <div><h2 className="text-sm font-bold tracking-tight text-white">{playingCourse.title}</h2></div>
              </div>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-red-400" onClick={() => setPlayingCourse(null)}><XIcon className="size-5" /></Button>
           </header>
           <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-1 bg-black relative flex flex-col">
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                  {playingCourse.academy_lessons?.[activeLessonIdx]?.video_url ? (
                    <iframe src={`${playingCourse.academy_lessons[activeLessonIdx].video_url}?autoplay=0&rel=0&modestbranding=1`} className="absolute inset-0 w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  ) : (
                    <div className="text-zinc-500 font-mono text-[10px] uppercase">Standby...</div>
                  )}
                </div>
                <div className="h-20 border-t border-white/5 flex items-center justify-between px-8 bg-zinc-900/50">
                   <div className="flex gap-4">
                      <Button variant="ghost" className="text-zinc-400" disabled={activeLessonIdx === 0} onClick={() => setActiveLessonIdx(v => v - 1)}><ArrowLeft className="size-5" /></Button>
                      <Button variant="ghost" className="text-zinc-400" disabled={activeLessonIdx === (playingCourse.academy_lessons?.length || 1) - 1} onClick={() => setActiveLessonIdx(v => v + 1)}><ArrowRight className="size-5" /></Button>
                   </div>
                   <Button className="bg-primary/20 text-primary border-primary/20 font-mono text-[10px] uppercase" variant="outline" onClick={() => handleLessonComplete(playingCourse.id, activeLessonIdx)}>Mark Mastered</Button>
                </div>
              </div>
              <div className="w-full lg:w-90 border-l border-white/5 p-4 overflow-y-auto space-y-2 bg-zinc-900/30 shrink-0">
                 {playingCourse.academy_lessons?.map((lesson: any, i: number) => (
                    <button key={lesson.id} onClick={() => setActiveLessonIdx(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${activeLessonIdx === i ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-transparent text-zinc-400'}`}>
                       <p className="text-xs font-bold">{lesson.title}</p>
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Academy;
