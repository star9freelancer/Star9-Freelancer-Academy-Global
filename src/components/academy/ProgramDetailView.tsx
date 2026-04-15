import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X as XIcon, 
  PlayCircle as PlayCircleIcon, 
  ShieldCheck as ShieldCheckIcon, 
  Clock as ClockIcon, 
  Database as DatabaseIcon, 
  Sparkles as SparklesIcon, 
  ArrowLeft as ArrowLeftIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgramDetailViewProps {
  course: any;
  enrollment?: any;
  onBack: () => void;
  onEnroll: () => void;
  onStart: (lessonIdx: number) => void;
}

const ProgramDetailView = ({ course, enrollment, onBack, onEnroll, onStart }: ProgramDetailViewProps) => {
  const isEnrolled = !!enrollment;
  const progress = enrollment?.progress || 0;
  const lessons = course.academy_lessons || [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-12 pb-20 relative z-10"
    >
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
        >
          <div className="size-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-primary transition-all">
            <ArrowLeftIcon className="size-4" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest ont-bold">Back to Courses</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column: Info & Actions */}
        <div className="space-y-8">
          <div className="h-[400px] rounded-[3rem] overflow-hidden relative border border-white/5 group shadow-2xl">
            <img src={course.image_url} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 space-y-4">
               <div className="flex items-center gap-3">
                  <Badge className="bg-primary/20 text-primary border-primary/20 uppercase font-mono text-[9px] tracking-widest">{course.category}</Badge>
                  <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-widest">{course.duration} TOTAL</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-bold tracking-tighter italic">{course.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Duration", value: course.duration || "4 Hours", icon: ClockIcon },
               { label: "Lessons", value: lessons.length.toString(), icon: PlayCircleIcon },
               { label: "Points", value: "500 XP", icon: SparklesIcon },
               { label: "Format", value: "Online Video", icon: DatabaseIcon }
             ].map((stat, i) => (
               <div key={i} className="p-6 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 space-y-1 group hover:border-primary transition-all">
                  <stat.icon className="size-4 text-zinc-600 mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{stat.label}</p>
                  <p className="text-sm font-bold text-white">{stat.value}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Curriculum & Progress */}
        <div className="space-y-8 flex flex-col h-full">
           <Card className="glass border-white/5 p-8 rounded-[2.5rem] space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-4 text-center">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`size-2 rounded-full animate-pulse ${isEnrolled ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"}`} />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                      {isEnrolled ? "Joined Star9 Academy" : "Enrollment Restricted"}
                    </span>
                 </div>
                 <p className="text-zinc-400 leading-relaxed text-sm max-w-sm mx-auto">
                    {isEnrolled 
                      ? "You are currently participating in this course. Resume your progress below." 
                      : "Join this course to access the training modules and earn your official certificate."}
                 </p>
              </div>

              <div className="pt-4">
                {isEnrolled ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-zinc-500 font-bold">Progress</span>
                          <span className="text-primary font-black">{progress}%</span>
                       </div>
                       <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5 p-[1px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full" 
                          />
                       </div>
                    </div>
                    <Button 
                      onClick={() => onStart(0)}
                      className="w-full h-16 rounded-3xl bg-primary text-white hover:bg-primary/90 font-bold tracking-widest text-[10px] uppercase shadow-lg shadow-primary/20"
                    >
                       Continue Lesson
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={onEnroll}
                    className="w-full h-16 rounded-3xl bg-white text-black hover:bg-zinc-200 font-bold tracking-widest text-[10px] uppercase shadow-xl"
                  >
                     Join Course Now
                  </Button>
                )}
              </div>
           </Card>

           <div className="space-y-4">
              <div className="flex items-center justify-between ml-2">
                 <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 font-bold">Lessons List</h3>
                 <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{lessons.length} Parts</span>
              </div>
              <div className="space-y-3">
                {lessons.map((lesson, idx) => {
                  const isCompleted = isEnrolled && progress >= ((idx + 1) / lessons.length) * 100;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 4 }}
                      onClick={() => isEnrolled && onStart(idx)}
                      disabled={!isEnrolled}
                      className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-center gap-5 group ${isEnrolled ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-zinc-950/40 border-white/[0.02] opacity-50 cursor-not-allowed"}`}
                    >
                      <div className="size-10 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0 relative">
                         <span className="text-[10px] font-mono font-bold text-zinc-600">{idx + 1}</span>
                         {isCompleted && (
                           <div className="absolute -top-1 -right-1 size-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-zinc-950">
                              <ShieldCheckIcon className="size-3 text-white" />
                           </div>
                         )}
                      </div>
                      <div className="flex-1">
                         <p className="font-bold text-sm tracking-tight">{lesson.title}</p>
                      </div>
                      {isEnrolled && (
                        <div className="size-10 rounded-full border border-white/5 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:border-primary">
                           <PlayCircleIcon className="size-5 text-zinc-600 group-hover:text-white" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramDetailView;
