import React from "react";
import { 
  Clock, Calendar, CreditCard, CheckCircle2, PlayCircle, 
  Lock, ArrowLeft, Share2, Award, Users, Sparkles, Cpu, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  const stats = [
    { label: "Duration", value: course.duration || "10 Weeks", icon: Clock, color: "text-blue-400" },
    { label: "Commitment", value: course.commitment || "30-40 hrs/week", icon: Calendar, color: "text-purple-400" },
    { label: "Access Fee", value: course.price === 0 ? "Free Access" : `$${course.price}/month`, icon: CreditCard, color: "text-emerald-400" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="group gap-2 text-zinc-500 hover:text-white transition-colors" 
          onClick={onBack}
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-mono text-xs uppercase tracking-widest">Return to Vault</span>
        </Button>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="icon" className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10"><Share2 className="size-4" /></Button>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 uppercase tracking-[0.3em] text-[10px] px-3 py-1 font-bold">
                {course.category || "Skill Track"}
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
              {course.title.split(' ').map((word: string, i: number) => (
                <span key={i} className={i === 0 ? "text-white" : "text-white/40"}>{word} </span>
              ))}
            </h1>
          </div>

          <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
            {course.overview || course.description || "Master the essential skills required to thrive in a rapidly evolving global digital workforce."}
          </p>
          
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5 bg-white/[0.01] rounded-2xl px-6">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                  <stat.icon className={`size-3 ${stat.color}`} /> {stat.label}
                </p>
                <p className="text-sm font-bold text-white/90">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-primary font-bold">Instructional Outcomes</h3>
            <div className="grid gap-4">
              {course.learning_outcomes?.map((item: string, i: number) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 size-5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-3 text-primary" />
                  </div>
                  <p className="text-[15px] text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <Card className="glass border-white/5 overflow-hidden shadow-2xl bg-zinc-900/40 relative">
            <div className="aspect-video relative group cursor-pointer overflow-hidden">
               <img 
                 src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
                 alt={course.title} 
                 className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="size-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                     <PlayCircle className="size-10 text-white fill-white/10" />
                  </motion.div>
               </div>
            </div>
            
            <CardContent className="p-8 space-y-8">
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Security Access</span>
                     <Badge variant={isEnrolled ? "default" : "outline"} className={`font-mono text-[9px] uppercase tracking-widest ${isEnrolled ? 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/20' : 'border-white/10 text-zinc-500'}`}>
                        {isEnrolled ? "Active Track" : "Restricted"}
                     </Badge>
                  </div>
                  <h4 className="font-bold text-center py-2 text-xl tracking-tight">
                    {isEnrolled ? "Personnel Identity Linked" : "Awaiting Authorization"}
                  </h4>
               </div>

               {isEnrolled ? (
                 <div className="space-y-4">
                    <Button 
                      className="w-full py-7 font-mono uppercase tracking-[0.3em] text-xs bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 rounded-xl relative overflow-hidden group" 
                      onClick={() => onStart(0)}
                    >
                      <span className="relative z-10">Synchronize Mastery</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                    </Button>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                        <span>Overall Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                 </div>
               ) : (
                 <Button 
                  className="w-full py-7 font-mono uppercase tracking-[0.3em] text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 rounded-xl relative overflow-hidden group" 
                  onClick={onEnroll}
                >
                   <span className="relative z-10">Secure Access Now</span>
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                 </Button>
               )}
               
               <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  {[
                    { icon: Users, label: "1.2k Agents" },
                    { icon: Award, label: "Accredited" },
                    { icon: Sparkles, label: "AI Powered" }
                  ].map((item, i) => (
                    <div key={i} className="text-center group">
                       <item.icon className="size-5 mx-auto mb-2 text-zinc-600 group-hover:text-primary transition-colors" />
                       <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{item.label}</p>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Program Structure (Curriculum) */}
      <div className="space-y-10 pt-16">
        <div className="flex items-center gap-6">
           <h2 className="text-3xl font-bold tracking-tight">Curriculum Structure</h2>
           <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="relative pl-8 md:pl-12 space-y-8">
          {/* Vertical Timeline Path */}
          <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-[2px] bg-white/5">
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: '100%' }}
               transition={{ duration: 1.5 }}
               className="w-full bg-gradient-to-b from-primary via-emerald-500 to-transparent" 
             />
          </div>

          {course.lessons?.map((lesson: any, i: number) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`glass border-white/5 hover:border-primary/20 transition-all overflow-hidden group relative ${!isEnrolled ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-6 p-6">
                  {/* Timeline Pulse Indicator */}
                  <div className="absolute left-[-29px] md:left-[-33px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className={`size-4 rounded-full border-2 transition-all ${isEnrolled ? 'bg-zinc-950 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'bg-zinc-900 border-zinc-700'}`} />
                    {isEnrolled && <div className="absolute size-4 bg-primary/40 rounded-full animate-ping" />}
                  </div>

                  <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                    isEnrolled ? "bg-primary/5 border-primary/20 text-primary" : "bg-zinc-900/50 border-white/5 text-zinc-600"
                  }`}>
                    <Cpu className="size-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-bold text-lg tracking-tight truncate group-hover:text-primary transition-colors">
                        M{i + 1}. {lesson.title}
                      </h3>
                      <div className="hidden md:flex items-center gap-4 shrink-0">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">Module Access</span>
                        <ChevronRight className={`size-4 ${isEnrolled ? 'text-primary' : 'text-zinc-700'}`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 border-white/5 px-2">
                          {lesson.type === 'video' ? "Video Intelligence" : "Validation"}
                       </Badge>
                       <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">• {lesson.duration_minutes || 30} Minutes</span>
                    </div>
                  </div>

                  <div className="ms-auto">
                    {isEnrolled ? (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-primary hover:bg-primary/10 rounded-xl"
                        onClick={() => onStart(i)}
                      >
                        <PlayCircle className="size-8" />
                      </Button>
                    ) : (
                      <div className="size-10 flex items-center justify-center text-zinc-700">
                        <Lock className="size-5" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramDetailView;
