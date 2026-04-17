import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck as ShieldCheckIcon, 
  Clock as ClockIcon, 
  ArrowRight as ArrowRightIcon, 
  Sparkles as SparklesIcon 
} from "lucide-react";
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
      className="h-full"
    >
      <Card className="h-full border-border/50 shadow-2xl hover:shadow-primary/20 transition-all flex flex-col lg:flex-row group overflow-hidden bg-white dark:bg-zinc-900/40 dark:backdrop-blur-xl relative rounded-[2.5rem]">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit] pointer-events-none" />

        {/* Thumbnail Section */}
        <div className="lg:w-72 xl:w-80 h-64 lg:h-auto relative overflow-hidden shrink-0">
          <motion.img 
            src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
            alt={course.title} 
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-1000"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
          
          <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
            <Badge className="bg-zinc-950/60 text-primary border-primary/20 backdrop-blur-xl uppercase font-mono text-[10px] tracking-widest px-3 py-1">
              {course.category}
            </Badge>
          </div>
          
          <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/90">
            <ClockIcon className="size-3 text-primary" />
            <span>{course.duration || "4 Hours"} Course</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col p-8 lg:p-10 relative z-10">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tighter italic group-hover:text-primary transition-colors duration-300 leading-tight">
                {course.title}
              </h3>
              {isEnrolled && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[10px] uppercase tracking-widest shrink-0 w-fit">
                   <ShieldCheckIcon className="size-3" /> Enrolled
                </div>
              )}
            </div>
            
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-2xl line-clamp-3 lg:line-clamp-none">
              {course.overview || course.description || "Master new technical skills with Star9 Academy's flagship professional training programs."}
            </p>

            <div className="flex items-center gap-6 pt-2">
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Curriculum</span>
                  <span className="text-sm font-bold flex items-center gap-2">
                    <SparklesIcon className="size-3 text-primary" /> 6 Deep Dive Modules
                  </span>
               </div>
               <div className="w-px h-8 bg-border/50" />
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Certification</span>
                  <span className="text-sm font-bold">Global Credential</span>
               </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            {isEnrolled ? (
              <>
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Training Progress</span>
                    <span className="text-[10px] font-mono text-primary font-black">{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted dark:bg-zinc-950/80 rounded-full overflow-hidden border border-border/50 p-[1px]">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${progress}%` }}
                       className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={(e) => { e.stopPropagation(); onOpen?.(); }}
                  className="w-full sm:w-auto px-8 h-12 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold tracking-widest text-[10px] uppercase shadow-lg shadow-primary/20"
                >
                  Continue Journey
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={(e) => { e.stopPropagation(); onEnroll?.(); }}
                  disabled={isEnrolling}
                  className="flex-1 w-full sm:w-auto h-12 rounded-2xl bg-white text-black hover:bg-zinc-200 font-bold tracking-widest text-[10px] uppercase shadow-xl"
                >
                  {isEnrolling ? "Initializing..." : "Enroll Now"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); onViewDetails?.(); }}
                  className="w-full sm:w-auto px-8 h-12 rounded-2xl border-white/5 bg-zinc-950/20 text-white hover:bg-zinc-900 font-mono text-[10px] uppercase tracking-widest"
                >
                  Explore Details
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
