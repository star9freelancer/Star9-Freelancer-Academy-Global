import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck as ShieldCheckIcon, 
  Clock as ClockIcon, 
  ArrowRight as ArrowRightIcon, 
  Sparkles as SparklesIcon,
  Play as PlayIcon
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full cursor-pointer relative group"
      onClick={isEnrolled ? onOpen : onViewDetails}
    >
      <div className="relative aspect-[3/4.5] w-full rounded-[2.2rem] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-700 group-hover:border-primary/50 group-hover:shadow-primary/20">
        
        {/* Background Image - Full Bleed */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
            alt={course.title} 
            className="w-full h-full object-cover grayscale-[0.4] contrast-[1.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
          />
          {/* Gradients for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          <div className="bg-primary/95 text-white backdrop-blur-md font-black text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-none border-l-2 border-primary-foreground/30 shadow-2xl">
            {course.category}
          </div>
          {isEnrolled && (
            <div className="bg-emerald-500/90 text-white backdrop-blur-md font-bold text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-none border-l-2 border-white/20 w-fit">
              Active Module
            </div>
          )}
        </div>

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 inset-x-0 z-10 p-8 pt-20 bg-gradient-to-t from-zinc-950 to-transparent">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Academy Unit
              </p>
              <h3 className="text-xl md:text-2xl font-black italic tracking-tighter text-white leading-tight decoration-primary/40 group-hover:underline underline-offset-4">
                {course.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
               <div className="flex items-center gap-2">
                  <ClockIcon className="size-3 text-primary/60" />
                  <span>{course.duration || "4H"}</span>
               </div>
               <div className="size-1 rounded-full bg-white/20" />
               <span>6 Modules</span>
            </div>

            {/* Modern Progress Line */}
            {isEnrolled ? (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">Completion</span>
                  <span className="text-[10px] font-mono text-primary font-black">{progress}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden p-[0.5px] border border-white/10 group-hover:border-primary/20 transition-colors">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary" 
                  />
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                {course.overview || "Access global intelligence and operational mastery."}
              </p>
            )}

            {/* Interaction Button */}
            <div className="pt-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <Button 
                variant="outline" 
                className="w-full h-11 rounded-none border-white/5 bg-white text-black hover:bg-zinc-200 font-black text-[9px] uppercase tracking-[0.2em] shadow-2xl"
              >
                {isEnrolled ? "Resume Module" : "Explore Unit"} <PlayIcon className="size-3 ml-2 fill-current" />
              </Button>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -inset-1 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default CourseCard;
