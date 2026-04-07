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
import { UserSettings } from "@/components/academy/UserSettings";
import { AcademyFooter } from "@/components/academy/AcademyFooter";
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
      toast.success("Certificate Issued", { description: "Your certificate is ready to download." });
      invalidateAll();
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    setEnrolling(courseId);
    try {
      // 1. Course Enrollment
      const { error: enrollError } = await supabase
        .from('user_enrollments')
        .insert({ user_id: user.id, course_id: courseId, progress: 0 });
      
      if (enrollError) {
         if (enrollError.code === '23505') {
            toast.error("Already enrolled in this course");
         } else {
            toast.error(`Enrollment failed: ${enrollError.message || 'Please try again.'}`);
         }
         return;
      }

      // 2. Automatic Community Integration
      // A. Join General Lounge (if not member)
      const { data: generalGroup } = await supabase.from('chat_groups').select('id').eq('type', 'general').single();
      if (generalGroup) {
        await supabase.from('chat_members').upsert({ group_id: generalGroup.id, user_id: user.id }, { onConflict: 'group_id,user_id' });
      }

      // B. Join Course Community
      const { data: courseGroup } = await supabase.from('chat_groups').select('id').eq('course_id', courseId).single();
      if (courseGroup) {
        await supabase.from('chat_members').upsert({ group_id: courseGroup.id, user_id: user.id }, { onConflict: 'group_id,user_id' });
      }
      
      toast.success("Successfully enrolled", { description: "You've been added to the course and its community group." });
      invalidateAll();
    } catch (err) {
      toast.error("Enrollment sequence interrupted");
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

  const studentLinks = [
    { id: "home", icon: Home, label: "Home" },
    { id: "academy", icon: BookOpen, label: "My Courses" },
    { id: "catalog", icon: Globe, label: "Browse" },
    { id: "certificates", icon: Award, label: "Certificates" },
    { id: "community", icon: Users, label: "Community" },
    { id: "careers", icon: Briefcase, label: "Jobs" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation - hidden on mobile */}
      <div className="hidden md:flex fixed top-0 inset-x-0 z-50 justify-center p-4 md:p-6 transition-all duration-500">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-lg max-w-full overflow-x-auto no-scrollbar"
        >
          {/* Logo */}
          <Link to="/" className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
            <img src={logo} alt="Star9" className="h-7 w-auto" />
          </Link>

          <div className="h-6 w-px bg-border mx-1 shrink-0" />

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border focus-within:border-primary/40 transition-all group w-48">
            <Search className="size-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                    <motion.div 
                      layoutId="hub-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full" 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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

          {/* Points & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-full">
              <Sparkles className="size-3 text-amber-500" />
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
      <div className="pt-28 md:pt-32 pb-24 min-h-screen flex flex-col">
        <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 space-y-16 relative z-10 flex-grow flex flex-col">

      {/* MOBILE BOTTOM DOCK */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 flex justify-center">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
                         <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Your Learning Progress</h3>
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
                            <CourseCard key={course.id} course={course} enrollment={enrollments.get(course.id)} onOpen={() => { setPlayingCourse(course); setActiveLessonIdx(0); }} />
                          ))
                        }
                        {courses.filter(c => enrollments.has(c.id)).length === 0 && (
                           <Card className="glass border-dashed p-12 text-center col-span-full opacity-60">
                              <BookOpen className="size-12 mx-auto mb-4 text-muted-foreground" />
                              <h3 className="font-bold">No Active Courses Detected</h3>
                              <Button className="mt-6 font-mono text-[10px] bg-primary/20 text-primary border-primary/20" variant="outline" onClick={() => setActiveTab('catalog')}>Browse Catalog</Button>
                           </Card>
                        )}
                      </div>
                   </div>
                 )}

                 {activeTab === "catalog" && (
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <div className="h-px flex-1 bg-border/50" />
                         <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Full Course Catalog</h3>
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
                   <div className="space-y-6 relative z-10">
                     <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
                     <div className="grid md:grid-cols-2 gap-6">
                       {certificates.map((cert) => (
                         <Card key={cert.id} className="glass overflow-hidden group">
                           <div className="h-40 bg-zinc-900 flex flex-col items-center justify-center p-6 border-b border-white/5 relative">
                             <Award className="w-16 h-16 text-primary/20 mb-2" />
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
                         <Calendar className="size-16 mx-auto mb-6 text-muted-foreground" />
                         <h2 className="text-2xl font-bold">No Events Scheduled</h2>
                      </div>
                   </div>
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
                   <Button className="bg-primary/20 text-primary border-primary/20 text-xs" variant="outline" onClick={() => handleLessonComplete(playingCourse.id, activeLessonIdx)}>Mark Complete</Button>
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
