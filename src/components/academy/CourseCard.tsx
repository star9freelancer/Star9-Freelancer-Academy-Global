import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Database, PlayCircle, ShieldCheck, Loader2, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: any;
  enrollment?: any;
  isEnrolling?: boolean;
  onEnroll?: () => void;
  onOpen?: () => void;
  onViewDetails?: () => void;
}

const CourseCard = ({ course, enrollment, isEnrolling, onEnroll, onOpen, onViewDetails }: CourseCardProps) => {
  const isEnrolled = !!enrollment;
  const progress = enrollment?.progress || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="glass h-full border-white/5 shadow-2xl hover:shadow-primary/10 transition-all flex flex-col group overflow-hidden bg-zinc-900/40 backdrop-blur-xl relative">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit] pointer-events-none" />

        <div className="h-52 relative overflow-hidden shrink-0">
          <motion.img 
            src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
            alt={course.title} 
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-1000"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            <Badge className="bg-zinc-950/60 text-primary border-primary/20 backdrop-blur-xl uppercase font-mono text-[9px] tracking-widest px-2.5 py-1">
              {course.category}
            </Badge>
            {isEnrolled && (
              <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 border-emerald-400/30 bg-emerald-400/10 backdrop-blur-xl">
                <ShieldCheck className="size-2.5 mr-1" /> Synchronized
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 z-10">
             <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                <Clock className="size-3" />
                <span>Est. {course.duration || "10 Weeks"}</span>
             </div>
          </div>
        </div>

        <CardHeader className="pt-6 pb-2 px-6">
          <CardTitle className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {course.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col pt-0 px-6">
          <p className="text-[13px] text-zinc-400 line-clamp-2 leading-relaxed mb-6">
             {course.overview || course.description || "Master the transition to decentralized digital professional infrastructure with Star9."}
          </p>

          {isEnrolled && (
            <div className="mt-auto pt-6 space-y-3 border-t border-white/5">
               <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500">Curriculum Mastery</p>
                    <p className="text-xs font-bold text-white">{progress}% Complete</p>
                  </div>
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="size-4 text-primary animate-pulse" />
                  </div>
               </div>
               <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-primary to-emerald-400 shadow-[0_0_12px_rgba(var(--primary),0.6)]"
                  />
               </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2 pb-8 px-6 gap-3">
          {isEnrolled ? (
            <Button 
              className="group/btn w-full font-mono uppercase text-[10px] tracking-[0.2em] bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/10 py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={onOpen}
            >
              Resume Path <ArrowRight className="ml-2 size-3 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="flex flex-col w-full gap-2.5">
              <Button 
                className="w-full font-mono uppercase text-[10px] tracking-[0.2em] bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                onClick={onEnroll}
                disabled={isEnrolling}
              >
                {isEnrolling ? <Loader2 className="size-3 animate-spin mr-2" /> : <ShieldCheck className="size-3 mr-2" />}
                {isEnrolling ? "Verifying..." : "Enroll Now"}
              </Button>
              <Button 
                variant="outline"
                className="w-full font-mono uppercase text-[10px] tracking-[0.2em] border-white/5 hover:bg-white/5 py-6 rounded-xl text-zinc-400 hover:text-white transition-all backdrop-blur-md"
                onClick={onViewDetails}
              >
                View Specifications
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default CourseCard;
