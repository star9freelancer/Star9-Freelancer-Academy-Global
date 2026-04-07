import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, PlayCircle, FileText, CheckCircle2, 
  ChevronRight, Lock, Clock, Award, Globe, 
  Menu, X, Sparkles, ChevronLeft, BrainCircuit,
  Trophy, AlertTriangle, RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo_transparent.png";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const CoursePlayer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [ytPlayer, setYtPlayer] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<any | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!user || !courseId) return;
      setLoading(true);
      
      try {
        let courseData;
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(courseId);
        
        if (isUuid) {
          const { data } = await supabase.from('academy_courses').select('*').eq('id', courseId).single();
          courseData = data;
        } else {
          const { data } = await supabase.from('academy_courses').select('*').eq('slug', courseId).single();
          courseData = data;
        }

        if (!courseData) {
          setLoading(false);
          return;
        }

        setCourse(courseData);

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
        console.error("Error fetching course player data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  // YouTube API Integration
  useEffect(() => {
    if (!activeLesson?.video_url) return;

    const videoId = activeLesson.video_url.split('/').pop()?.split('?')[0];
    if (!videoId) return;

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let interval: any;

    const initPlayer = () => {
      new window.YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setYtPlayer(event.target);
            setVideoWatched(false);
            setShowQuiz(false);
            setQuizScore(null);
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
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => clearInterval(interval);
  }, [activeLesson]);

  const handleMarkComplete = async () => {
    if (!user || !activeLesson || !courseId) return;

    try {
      // 1. Persist progress in the cloud ledger
      const { error: progressError } = await supabase
        .from('user_lesson_progress')
        .upsert({ 
          user_id: user.id, 
          course_id: courseId, 
          lesson_id: activeLesson.id,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });

      if (progressError) throw progressError;

      // 2. Update local state for instant feedback
      setCompletedLessons(prev => new Set([...prev, activeLesson.id]));

      // 3. Update study streak in profile
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

        await supabase.from('profiles').update({
          current_streak: newStreak,
          last_study_date: now.toISOString(),
          longest_streak: Math.max(newStreak, profile.longest_streak || 0)
        }).eq('id', user.id);
      }

      toast.success("Module Synchronized", {
        description: "Your progress has been recorded in the Star9 Ledger.",
      });

      // 4. Auto-advance to next lesson if available
      const currentIdx = lessons.findIndex(l => l.id === activeLesson.id);
      if (currentIdx < lessons.length - 1) {
        setTimeout(() => setActiveLesson(lessons[currentIdx + 1]), 1000);
      }
    } catch (err: any) {
      toast.error("Cloud synchronization failed.");
    }
  };

  const progressPercentage = lessons.length > 0 
    ? Math.round((completedLessons.size / lessons.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs animate-pulse">Initializing Skill Center...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background font-sans">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-serif uppercase tracking-tighter">Access Forbidden or Data Missing</h1>
          <p className="text-muted-foreground">The resource you are looking for at the Star9 Network cannot be located.</p>
          <Button onClick={() => navigate('/academy')} variant="ghost" className="font-mono text-xs uppercase tracking-widest border border-border">Back to Academy</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b bg-card/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-50 shrink-0 sticky top-0">
        <div className="flex items-center gap-4">
          <Link to="/academy" className="p-2 hover:bg-accent rounded-full transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div className="hidden md:block">
            <img src={logo} alt="Star9" className="h-[32px] w-auto brightness-90 grayscale hover:grayscale-0 transition-all cursor-pointer" onClick={() => navigate('/')} />
          </div>
          <div className="h-4 w-px bg-border hidden md:block" />
          <div>
            <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-md uppercase tracking-tight leading-tight">{course.title}</h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{course.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Overall Progress</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-mono">{progressPercentage}%</span>
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="font-mono text-[10px] uppercase tracking-widest hidden sm:flex">
            <Globe className="size-3 mr-2" /> Global Certification Mode
          </Button>
        </div>
      </header>

      {/* Main Learning Sidebar & Player Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Lesson Sidebar */}
        <aside className={`${sidebarOpen ? "w-80" : "w-0"} bg-card border-r flex flex-col transition-all duration-300 overflow-hidden absolute lg:relative z-40 h-full lg:translate-x-0`}>
          <div className="p-4 border-b shrink-0 flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Course Curriculum</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {lessons.map((lesson, idx) => {
                const isActive = activeLesson?.id === lesson.id;
                const isCompleted = completedLessons.has(lesson.id);
                // Gating logic: Must complete previous lesson to view next
                const isLocked = idx > 0 && !completedLessons.has(lessons[idx - 1].id);

                return (
                  <button
                    key={lesson.id}
                    disabled={isLocked}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full flex items-start gap-3 p-3 rounded-md text-left transition-all ${
                      isActive 
                        ? "bg-accent/50 border border-secondary/20 shadow-sm" 
                        : isLocked
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-500/20" />
                      ) : isLocked ? (
                        <Lock className="size-5 text-muted-foreground" />
                      ) : isActive ? (
                        <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="size-2 bg-primary rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <div className="size-5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[9px] font-bold font-mono group-hover:border-primary transition-colors">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-tight leading-snug ${isActive ? "text-foreground" : ""}`}>
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Clock className="size-3" /> {lesson.duration_minutes}m
                        </span>
                        {isLocked && <Badge variant="secondary" className="text-[8px] py-0 px-1 font-mono uppercase">Locked</Badge>}
                      </div>
                    </div>
                  </button>
                );
              })}
              
              {/* Locked Lesson Placeholder */}
              <div className="w-full flex items-start gap-3 p-3 rounded-md text-left opacity-30 cursor-not-allowed">
                <div className="mt-0.5 shrink-0">
                  <Lock className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-tight leading-snug">Verification Capstone</h4>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Unlock with Final Exam</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Video Player & Document Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Sidebar Toggle (Mobile/Tablet) */}
          {!sidebarOpen && (
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute top-4 left-4 z-40 rounded-full shadow-lg border border-border"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-4" />
            </Button>
          )}

          <ScrollArea className="flex-1">
            <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
              
              {/* Video Embded */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl relative group border border-white/5 bg-gradient-to-tr from-black via-zinc-900 to-zinc-950">
                <div id="yt-player" className="absolute inset-0 w-full h-full" />
              </div>

              {/* Lesson Description & Guide */}
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                  <div>
                    <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20 font-mono text-[10px] tracking-widest uppercase py-0.5">Active Module</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-none">{activeLesson?.title || "Welcome to the Network"}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-widest">
                      <FileText className="size-3 mr-2" /> Note Pack
                    </Button>
                    
                    {completedLessons.has(activeLesson?.id) ? (
                      <Button size="sm" disabled className="bg-emerald-500/20 text-emerald-500 border-emerald-500/20 font-mono text-xs uppercase tracking-widest">
                        <CheckCircle2 className="size-3 mr-2" /> Completed
                      </Button>
                    ) : showQuiz ? (
                      <Button variant="outline" size="sm" onClick={() => setShowQuiz(false)} className="font-mono text-xs uppercase tracking-widest">
                        Back to Lesson
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        disabled={!videoWatched && !activeLesson.is_preview}
                        className="font-mono text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                        onClick={() => activeLesson.quiz_data ? setShowQuiz(true) : handleMarkComplete()}
                      >
                        {!videoWatched && !activeLesson.is_preview ? <Clock className="size-3 mr-2 animate-pulse" /> : <BrainCircuit className="size-3 mr-2" />}
                        {!videoWatched && !activeLesson.is_preview ? "Watching..." : activeLesson.quiz_data ? "Take Assessment" : "Finish Lesson"}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    {showQuiz ? (
                      <QuizModule 
                        quizData={activeLesson.quiz_data} 
                        onPass={() => {
                          setShowQuiz(false);
                          handleMarkComplete();
                        }} 
                      />
                    ) : activeLesson?.content ? (
                      <div className="prose prose-zinc prose-invert max-w-none">
                        {activeLesson.content.split('\n').map((line: string, i: number) => {
                          if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-serif font-bold mt-8 mb-4 border-b pb-2 uppercase tracking-tighter text-foreground">{line.replace('# ', '')}</h1>;
                          if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-2 uppercase tracking-tight text-secondary text-primary">{line.replace('### ', '')}</h3>;
                          if (line.startsWith('**')) return <p key={i} className="text-base text-muted-foreground leading-relaxed my-4 font-medium" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />;
                          if (line.startsWith('- ')) return <li key={i} className="text-muted-foreground ml-4 my-1 flex items-start gap-2"><div className="size-1.5 rounded-full bg-secondary shrink-0 mt-2" /> {line.replace('- ', '')}</li>;
                          return <p key={i} className="text-muted-foreground leading-relaxed transition-all hover:text-foreground">{line}</p>;
                        })}
                      </div>
                    ) : (
                      <div className="py-20 text-center border rounded-2xl bg-muted/20 border-dashed">
                        <FileText className="size-10 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">No module notes available yet...</p>
                      </div>
                    )}
                    
                    {/* Module Nav */}
                    <div className="flex items-center justify-between pt-12 border-t mt-12">
                      <Button variant="ghost" className="gap-2 font-mono text-xs uppercase tracking-widest group">
                        <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Previous Module
                      </Button>
                      <Button variant="ghost" className="gap-2 font-mono text-xs uppercase tracking-widest group">
                        Next Module <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl border bg-card/40 backdrop-blur-sm shadow-sm space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-secondary">Module Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.ai_tools_covered?.map((t: string) => (
                          <span key={t} className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-accent border border-border/50 uppercase tracking-widest">{t}</span>
                        )) || <span className="text-[10px] font-mono text-muted-foreground italic">Domain Expertise</span>}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl border bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10 shadow-sm">
                      <Award className="size-8 text-secondary mb-4" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-2">Certification Alpha</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">Complete all 12 modules in this track to unlock your verified Star9 Network Credential.</p>
                      <div className="h-2 w-full bg-background/50 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-0 group-hover:w-[15%] transition-all duration-1000" />
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl border bg-accent/20 border-border/50">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4">Instructor Support</h4>
                      <Button size="sm" className="w-full font-mono text-[10px] uppercase tracking-widest" variant="outline">Request Direct Sync</Button>
                    </div>
                  </div>
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
  const finalScore = (score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)) / questions.length;
  const passed = finalScore >= passThreshold;

  if (finished) {
    return (
      <div className="space-y-6 animate-in zoom-in duration-500">
        <div className="p-12 text-center rounded-3xl bg-secondary/5 border border-secondary/20 space-y-4">
          {passed ? (
            <Trophy className="size-16 text-amber-500 mx-auto animate-bounce" />
          ) : (
            <AlertTriangle className="size-16 text-destructive mx-auto" />
          )}
          <h3 className="text-2xl font-bold uppercase tracking-tight">
            {passed ? "Certification Threshold Cleared" : "Strategic Gap Detected"}
          </h3>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Your accuracy: {Math.round(finalScore * 100)}% | Goal: {passThreshold * 100}%
          </p>
          <div className="pt-4">
            {passed ? (
              <Button onClick={onPass} className="bg-primary text-primary-foreground font-mono uppercase tracking-widest px-8">
                Synchronize Progress
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()} variant="outline" className="font-mono uppercase tracking-widest px-8">
                <RefreshCcw className="size-3 mr-2" /> Reset Assessment
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <Card className="border-border/50 bg-card/50 overflow-hidden rounded-3xl">
        <CardHeader className="bg-muted/50 border-b border-border/50">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="font-mono text-[10px] tracking-widest">Assessment Node {currentQuestion + 1}/{questions.length}</Badge>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Passing Grade: 80%</span>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold font-serif leading-tight">{questions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <RadioGroup 
            value={selectedAnswer?.toString()} 
            onValueChange={(v) => setSelectedAnswer(parseInt(v))}
            className="grid gap-4"
          >
            {questions[currentQuestion].options.map((option: string, idx: number) => (
              <div key={idx}>
                <RadioGroupItem 
                  value={idx.toString()} 
                  id={`q-${idx}`} 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor={`q-${idx}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                >
                  <span className="text-sm font-medium">{option}</span>
                  {selectedAnswer === idx && <CheckCircle2 className="size-4 text-primary" />}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 border-t border-border/50 flex justify-end">
          <Button 
            disabled={selectedAnswer === null} 
            onClick={handleNext} 
            className="font-mono text-xs uppercase tracking-widest bg-primary"
          >
            {currentQuestion < questions.length - 1 ? "Next Analysis" : "Finalize Results"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoursePlayer;
