import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, ArrowRight, Sparkles } from "lucide-react";
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
      <Card className="h-full border-border/50 shadow-2xl hover:shadow-primary/10 transition-all flex flex-col group overflow-hidden bg-white dark:bg-zinc-900/40 dark:backdrop-blur-xl relative">
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
                <ShieldCheck className="size-2.5 mr-1" /> Joined
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 z-10">
             <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">
                <Clock className="size-3" />
                <span>Est. {course.duration || "4 Hours"}</span>
             </div>
          </div>
        </div>

        <CardHeader className="pt-6 pb-2 px-6">
          <CardTitle className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {course.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col pt-0 px-6">
          <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed mb-6">
             {course.overview || course.description || "Master new technical skills with Star9 Academy."}
          </p>

          {isEnrolled ? (
            <div className="space-y-1 relative z-10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">Progress</span>
                <span className="text-[10px] font-mono text-primary font-black">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted dark:bg-zinc-900 rounded-full overflow-hidden border border-border/50 p-[1px]">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 relative z-10">
              <Clock className="size-3 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{course.duration || "4 Hours"}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex gap-2 relative z-10">
          {isEnrolled ? (
            <Button 
              onClick={(e) => { e.stopPropagation(); onOpen?.(); }}
              className="flex-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-xl h-11 font-mono text-[10px] uppercase tracking-widest font-bold"
            >
              Resume Course
            </Button>
          ) : (
            <>
              <Button 
                onClick={(e) => { e.stopPropagation(); onEnroll?.(); }}
                disabled={isEnrolling}
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-xl h-11 font-mono text-[10px] uppercase tracking-widest font-bold shadow-lg"
              >
                {isEnrolling ? "Joining..." : "Join Course"}
              </Button>
              <Button 
                variant="outline"
                onClick={(e) => { e.stopPropagation(); onViewDetails?.(); }}
                className="size-11 rounded-xl border-border bg-card text-foreground hover:bg-muted flex items-center justify-center p-0"
              >
                <ArrowRight className="size-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
