import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft as ArrowLeftIcon, 
  PlayCircle as PlayCircleIcon, 
  FileText as FileTextIcon, 
  CheckCircle2 as CheckCircle2Icon, 
  ChevronRight as ChevronRightIcon, 
  Lock as LockIcon, 
  Clock as ClockIcon, 
  Award as AwardIcon, 
  Menu as MenuIcon, 
  X as XIcon, 
  ChevronLeft as ChevronLeftIcon, 
  Trophy as TrophyIcon, 
  AlertTriangle as AlertTriangleIcon, 
  RefreshCcw as RefreshCcwIcon, 
  Video as VideoIcon, 
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card, CardContent, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useAcademyData } from "@/hooks/useAcademyData";
import { ArticleModule, ToolkitModule, ChecklistModule, SimulatorModule, PlaygroundModule } from "@/components/academy/InteractiveModules";
import logo from "@/assets/logo_transparent.png";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const CoursePlayer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses, enrollments } = useAcademyData();
  
  const [course, setCourse] = useState<any | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [ytPlayer, setYtPlayer] = useState<any>(null);
  const [isCourseComplete, setIsCourseComplete] = useState(false);

  useEffect(() => {
    if (!user || !courseId) return;
    setLoading(true);

    // Find course from local curriculum first (Optimization for instant navigation)
    const localCourse = courses.find(c => c.id === courseId);
    
    const tryFetchProgress = async (cid: string) => {
      try {
        const { data, error } = await supabase
          .from('user_lesson_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('course_id', cid);
        
        if (error) throw error;
        if (data) setCompletedLessons(new Set(data.map(p => p.lesson_id)));
      } catch (err) {
        console.warn("Database progress fetch failed, falling back to local storage:", err);
        const localKey = `star9_progress_${user.id}_${cid}`;
        const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
        setCompletedLessons(new Set(localData));
      }
    };

    if (localCourse && localCourse.modules && localCourse.modules.length > 0) {
      setCourse(localCourse);
      
      const courseLessons = localCourse.modules.flatMap((m: any) => 
        (m.lessons || []).map((l: any) => ({
          ...l,
          duration_minutes: parseInt(l.duration || "0"),
          video_url: l.videoUrl || l.video_url
        }))
      );

      if (courseLessons.length > 0) {
        setLessons(courseLessons);
        setActiveLesson(courseLessons[0]);
        tryFetchProgress(courseId);
        setLoading(false);
        return;
      }
    }

    // Fallback: fetch from DB
    const fetchCourseData = async () => {
      try {
        const { data: courseData, error: cError } = await supabase
          .from('academy_courses')
          .select('*')
          .eq('id', courseId)
          .single();
        
        if (cError) throw cError;

        const [lessonsRes, progressRes] = await Promise.all([
          supabase.from('academy_lessons').select('*').eq('course_id', courseData.id).order('order_index', { ascending: true }),
          supabase.from('user_lesson_progress').select('lesson_id').eq('user_id', user.id).eq('course_id', courseData.id)
        ]);
          
        if (lessonsRes.data && lessonsRes.data.length > 0) {
          setLessons(lessonsRes.data);
          setActiveLesson(lessonsRes.data[0]);
        }
        if (progressRes.data) {
          setCompletedLessons(new Set(progressRes.data.map(p => p.lesson_id)));
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user, courses]);

  // YouTube API Loader
  useEffect(() => {
    if (!activeLesson?.video_url) return;
    
    setVideoWatched(false);
    setShowQuiz(false);

    const videoId = activeLesson.video_url.includes('embed/')
      ? activeLesson.video_url.split('embed/')[1]?.split('?')[0]
      : activeLesson.video_url?.split('/').pop()?.split('?')[0];

    // Robust Script Loader
    const loadYoutubeApi = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    };

    let interval: any;

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      
      // Cleanup previous player if exists
      const container = document.getElementById('yt-player');
      if (container) container.innerHTML = '';

      new window.YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: { 
          autoplay: 0, 
          modestbranding: 1, 
          rel: 0,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setYtPlayer(event.target);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              interval = setInterval(() => {
                const duration = event.target.getDuration();
                const currentTime = event.target.getCurrentTime();
                if (duration > 0 && (currentTime / duration) > 0.9) {
                  setVideoWatched(true);
                  clearInterval(interval);
                }
              }, 1000);
            } else {
              clearInterval(interval);
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      loadYoutubeApi();
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      clearInterval(interval);
      if (ytPlayer && ytPlayer.destroy) ytPlayer.destroy();
    };
  }, [activeLesson?.id]);

  const handleMarkComplete = async () => {
    if (!user || !activeLesson || !courseId) return;

    try {
      // Upsert progress with fallback for potential schema mismatch
      const { error: upsertError } = await supabase
        .from('user_lesson_progress')
        .upsert({ 
          user_id: user.id, 
          course_id: courseId, 
          lesson_id: activeLesson.id,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });

      if (upsertError && upsertError.code === 'PGRST116') {
        // Fallback to local storage if table doesn't exist for immediate launch stability
        const localKey = `star9_progress_${user.id}_${courseId}`;
        const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
        localStorage.setItem(localKey, JSON.stringify([...new Set([...localData, activeLesson.id])]));
        console.warn("Using local storage fallback for progression.");
      }

      setCompletedLessons(prev => new Set([...prev, activeLesson.id]));

      // Update streak
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profile) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastDate = profile.last_study_date ? new Date(profile.last_study_date) : null;
        const lastStudyDay = lastDate ? new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()) : null;

        let newStreak = profile.current_streak || 0;
        if (!lastStudyDay) newStreak = 1;
        else {
          const diffDays = Math.floor((today.getTime() - lastStudyDay.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) newStreak += 1;
          else if (diffDays > 1) newStreak = 1;
        }

        const pointsToAward = 10;
        await supabase.from('profiles').update({
          current_streak: newStreak,
          last_study_date: now.toISOString(),
          longest_streak: Math.max(newStreak, profile.longest_streak || 0),
          merit_points: (profile.merit_points || 0) + pointsToAward
        }).eq('id', user.id);
      }

      toast.success("Lesson completed!", {
        description: "+10 Merit Points earned.",
      });

      // Auto-advance
      const currentIdx = lessons.findIndex(l => l.id === activeLesson.id);
      if (currentIdx < lessons.length - 1) {
        setTimeout(() => setActiveLesson(lessons[currentIdx + 1]), 1000);
      } else {
        // Last lesson completed!
        if (progressPercentage >= 95) { // Account for the current lesson just marked
          setIsCourseComplete(true);
        }
      }
    } catch (err: any) {
      toast.error("Failed to save progress. Please try again.");
    }
  };

  const progressPercentage = lessons.length > 0 
    ? Math.round((completedLessons.size / lessons.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Course Not Found</h1>
          <p className="text-muted-foreground">The course you are looking for could not be found.</p>
          <Button onClick={() => navigate('/academy')} variant="outline">Back to Academy</Button>
        </div>
      </div>
    );
  }

  // Pacing Calculation (2 modules per week starting from enrollment)
  const enrollment = courseId ? enrollments.get(courseId) : null;
  const weeksActive = enrollment?.created_at 
    ? Math.floor((Date.now() - new Date(enrollment.created_at).getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1 
    : 1; // Default to 1 week if no enrollment date is found
  const maxAllowedModules = weeksActive * 2;

  if (isCourseComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-in slide-in-from-left duration-[2s]" />
        
        <div className="max-w-xl w-full text-center space-y-10 relative z-10 animate-in zoom-in duration-700">
           <div className="relative inline-block">
             <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse" />
             <div className="size-32 rounded-[2.5rem] bg-card border border-primary/30 flex items-center justify-center mx-auto shadow-2xl relative">
                <TrophyIcon className="size-16 text-amber-500" />
             </div>
           </div>
           
           <div className="space-y-4">
             <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground">
               Journey <span className="text-primary underline decoration-primary/30 underline-offset-8">Complete</span>
             </h1>
             <p className="text-muted-foreground text-lg leading-relaxed">
               Mastery achieved. You have finalized every module in **{course.title}**. Your global trajectory has just accelerated.
             </p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-card border border-border">
                 <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Merit Earned</p>
                 <p className="text-3xl font-black text-amber-500">+{lessons.length * 10}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                 <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                 <p className="text-3xl font-black text-primary italic">Certified</p>
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <Button size="lg" className="h-16 rounded-2xl bg-primary text-white text-lg font-bold shadow-xl shadow-primary/20" onClick={() => navigate('/academy')}>
                 Claim Certificate & Return
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => setIsCourseComplete(false)}>
                 Review Lessons
              </Button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 border-b bg-card/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-50 shrink-0 sticky top-0">
        <div className="flex items-center gap-3">
          <Link to="/academy" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeftIcon className="size-4" />
          </Link>
          <div className="hidden md:block">
            <img src={logo} alt="Star9" className="h-7 w-auto cursor-pointer" onClick={() => navigate('/')} />
          </div>
          <div className="h-4 w-px bg-border hidden md:block" />
          <div>
            <h1 className="text-sm font-semibold truncate max-w-[200px] md:max-w-md">{course.title}</h1>
            <p className="text-xs text-muted-foreground">{course.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Progress</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
              </div>
              <span className="text-xs font-semibold">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden absolute inset-0 z-30 bg-background/80 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
        
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-80 border-r" : "w-0 border-transparent"} bg-card flex flex-col transition-all duration-300 overflow-hidden absolute lg:relative z-40 h-[calc(100vh-3.5rem)]`}>
          <div className="p-4 border-b shrink-0 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground">Course Modules</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <XIcon className="size-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {lessons.map((lesson, idx) => {
                const isActive = activeLesson?.id === lesson.id;
                const isCompleted = completedLessons.has(lesson.id);
                // Locked by sequence
                const isLockedBySequence = idx > 0 && !completedLessons.has(lessons[idx - 1].id);
                // Locked by pace (2 per week)
                const isLockedByPace = idx >= maxAllowedModules;
                const isLocked = isLockedBySequence || isLockedByPace;

                return (
                  <button
                    key={lesson.id}
                    disabled={isLocked}
                    onClick={() => {
                      setActiveLesson(lesson);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                      isActive 
                        ? "bg-primary/10 border border-primary/20" 
                        : isLocked
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2Icon className="size-5 text-emerald-500 fill-emerald-500/20" />
                      ) : isLocked ? (
                        <LockIcon className="size-5 text-muted-foreground" />
                      ) : isActive ? (
                        <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="size-2 bg-primary rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <div className="size-5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[10px] font-semibold">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-xs font-semibold leading-snug ${isActive ? "text-foreground" : ""}`}>
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <ClockIcon className="size-3" /> {lesson.duration_minutes}m
                        </span>
                        {lesson.quiz_data && <Badge variant="secondary" className="text-[9px] py-0 px-1.5">Quiz</Badge>}
                        {isLockedByPace ? (
                           <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-amber-500/30 text-amber-500 bg-amber-500/10">Locked: Week {Math.floor(idx / 2) + 1}</Badge>
                        ) : isLockedBySequence ? (
                           <Badge variant="secondary" className="text-[9px] py-0 px-1.5">Locked</Badge>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          
          {!sidebarOpen && (
            <Button 
              size="icon" variant="secondary" 
              className="absolute top-4 left-4 z-40 rounded-full shadow-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="size-4" />
            </Button>
          )}

          {/* Live Class Banner */}
          {(isAiCourse || isMasteringCourse) && (
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-3 xl:px-6 flex flex-col sm:flex-row sm:items-center justify-between shrink-0 gap-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <VideoIcon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Live Online Lesson</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground font-medium">
                    {isAiCourse && "Every Tuesday via Google Meet"}
                    {isMasteringCourse && "Every Wednesday via Google Meet"}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 text-primary w-full sm:w-auto" asChild>
                <Link to="/contact">
                  <LinkIcon className="size-3" /> Join Google Meet
                </Link>
              </Button>
            </div>
          )}

          {/* Module Content */}
          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
              
              {/* Dynamic Module Area */}
              {activeLesson?.type === 'video' || !activeLesson?.type ? (
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-xl relative" id="yt-player-container">
                  <div id="yt-player" className="absolute inset-0 w-full h-full" />
                </div>
              ) : null}

              {/* Lesson Info */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{activeLesson?.title || "Welcome"}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    {completedLessons.has(activeLesson?.id) ? (
                      <Button size="sm" disabled className="bg-emerald-500/20 text-emerald-500 border-emerald-500/20">
                        <CheckCircle2Icon className="size-3 mr-2" /> Completed
                      </Button>
                    ) : showQuiz ? (
                      <Button variant="outline" size="sm" onClick={() => setShowQuiz(false)}>
                        Back to Lesson
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        disabled={activeLesson?.type === 'video' && !videoWatched}
                        onClick={() => (activeLesson?.quiz_data && activeLesson.type === 'video') ? setShowQuiz(true) : handleMarkComplete()}
                      >
                        {(activeLesson?.type === 'video' && !videoWatched) ? (
                          <><ClockIcon className="size-3 mr-2" /> Watch video to continue</>
                        ) : (activeLesson?.quiz_data && activeLesson.type === 'video') ? (
                          "Take Quiz"
                        ) : (
                          "Mark Complete"
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Module Body */}
                {showQuiz ? (
                  <QuizModule 
                    quizData={activeLesson.quiz_data} 
                    onPass={() => {
                      setShowQuiz(false);
                      handleMarkComplete();
                    }} 
                  />
                ) : activeLesson?.type === 'article' ? (
                  <ArticleModule content={activeLesson.content} readTime={activeLesson.duration_minutes || 5} />
                ) : activeLesson?.type === 'toolkit' ? (
                  <ToolkitModule resources={activeLesson.quiz_data?.resources || []} />
                ) : activeLesson?.type === 'checklist' ? (
                  <ChecklistModule tasks={activeLesson.quiz_data?.tasks || []} />
                ) : activeLesson?.type === 'simulator' ? (
                  <SimulatorModule scenarios={activeLesson.quiz_data?.scenarios || []} />
                ) : activeLesson?.type === 'playground' ? (
                  <PlaygroundModule instructions={activeLesson.content} prompts={activeLesson.quiz_data?.prompts || []} />
                ) : activeLesson?.content ? (
                  <div className="prose prose-zinc dark:prose-invert max-w-none">
                    {activeLesson.content
                      .replace(/\\n/g, '\n') // Handle literal \n sequences from DB
                      .split('\n')
                      .map((line: string, i: number) => {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('# ')) {
                          return <h1 key={i} className="text-2xl font-bold mt-8 mb-4 border-b pb-2 text-foreground font-display">{trimmedLine.replace('# ', '')}</h1>;
                        }
                        if (trimmedLine.startsWith('### ')) {
                          return <h3 key={i} className="text-lg font-bold mt-6 mb-2 text-primary">{trimmedLine.replace('### ', '')}</h3>;
                        }
                        if (trimmedLine.startsWith('- ')) {
                          return (
                            <li key={i} className="text-muted-foreground ml-4 my-2 flex items-start gap-3 group">
                              <div className="size-1.5 rounded-full bg-primary/60 shrink-0 mt-2 group-hover:bg-primary transition-colors" /> 
                              <span dangerouslySetInnerHTML={{ __html: trimmedLine.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                            </li>
                          );
                        }
                        if (trimmedLine === '') {
                          return <div key={i} className="h-4" />;
                        }
                        return (
                          <p 
                            key={i} 
                            className="text-muted-foreground leading-relaxed my-4" 
                            dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} 
                          />
                        );
                    })}
                  </div>
                ) : (
                  <div className="py-16 text-center border rounded-xl bg-muted/20 border-dashed">
                    <FileTextIcon className="size-10 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">No lesson available yet.</p>
                  </div>
                )}
                
                {/* Module Nav */}
                <div className="flex items-center justify-between pt-8 border-t mt-8">
                  <Button 
                    variant="ghost" className="gap-2 group"
                    disabled={lessons.findIndex(l => l.id === activeLesson?.id) === 0}
                    onClick={() => {
                      const idx = lessons.findIndex(l => l.id === activeLesson?.id);
                      if (idx > 0) setActiveLesson(lessons[idx - 1]);
                    }}
                  >
                    <ChevronLeftIcon className="size-4" /> Previous
                  </Button>
                  <Button 
                    variant="ghost" className="gap-2 group"
                    disabled={lessons.findIndex(l => l.id === activeLesson?.id) === lessons.length - 1}
                    onClick={() => {
                      const idx = lessons.findIndex(l => l.id === activeLesson?.id);
                      if (idx < lessons.length - 1 && completedLessons.has(activeLesson?.id)) {
                        setActiveLesson(lessons[idx + 1]);
                      } else if (idx < lessons.length - 1) {
                        toast.info("Complete this lesson first to proceed.");
                      }
                    }}
                  >
                    Next <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

const QuizModule = ({ quizData, onPass }: { quizData: any, onPass: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = quizData.questions;

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const passThreshold = 0.8;
  const finalScore = finished 
    ? score / questions.length
    : (score + (selectedAnswer === questions[currentQuestion]?.correctAnswer ? 1 : 0)) / questions.length;
  const passed = finalScore >= passThreshold;

  if (finished) {
    return (
      <div className="space-y-6 animate-in zoom-in duration-500">
        <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-4">
          {passed ? (
            <TrophyIcon className="size-16 text-amber-500 mx-auto" />
          ) : (
            <AlertTriangleIcon className="size-16 text-destructive mx-auto" />
          )}
          <h3 className="text-2xl font-bold">
            {passed ? "Quiz Passed!" : "Not quite there yet"}
          </h3>
          <p className="text-muted-foreground text-sm">
            Your score: {Math.round(finalScore * 100)}% | Required: {passThreshold * 100}%
          </p>
          <div className="pt-4">
            {passed ? (
              <Button onClick={onPass}>
                Continue to Next Lesson
              </Button>
            ) : (
              <Button onClick={() => { setCurrentQuestion(0); setSelectedAnswer(null); setScore(0); setFinished(false); }} variant="outline">
                <RefreshCcwIcon className="size-3 mr-2" /> Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <Card className="border-border overflow-hidden rounded-xl">
        <CardHeader className="bg-muted/50 border-b">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="text-xs">Question {currentQuestion + 1} of {questions.length}</Badge>
            <span className="text-xs text-muted-foreground">Passing: 80%</span>
          </div>
          <CardTitle className="text-lg md:text-xl font-bold leading-tight">{questions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup 
            value={selectedAnswer?.toString()} 
            onValueChange={(v) => setSelectedAnswer(parseInt(v))}
            className="grid gap-3"
          >
            {questions[currentQuestion].options.map((option: string, idx: number) => (
              <div key={idx}>
                <RadioGroupItem value={idx.toString()} id={`q-${idx}`} className="peer sr-only" />
                <Label
                  htmlFor={`q-${idx}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                >
                  <span className="text-sm">{option}</span>
                  {selectedAnswer === idx && <CheckCircle2Icon className="size-4 text-primary" />}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 border-t flex justify-end">
          <Button 
            disabled={selectedAnswer === null} 
            onClick={handleNext}
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoursePlayer;
