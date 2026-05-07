import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock as ClockIcon, 
  ArrowRight as ArrowRightIcon,
  PlayCircle as PlayCircleIcon,
  CheckCircle2 as CheckCircle2Icon
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full flex"
    >
      <Card 
        className="w-full flex flex-col overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-card"
        onClick={isEnrolled ? onOpen : onViewDetails}
      >
        {/* Top Image Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted shrink-0">
          <img 
            src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-background/90 hover:bg-background backdrop-blur-sm text-foreground text-[10px] font-semibold border-none shadow-sm">
              {course.category}
            </Badge>
            {isEnrolled && (
              <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white border-none shadow-sm text-[10px] gap-1">
                <CheckCircle2Icon className="size-3" /> Enrolled
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
               <div className="flex items-center gap-1.5">
                   <ClockIcon className="size-3.5" />
                   <span>{course.duration || "4 Hours"}</span>
               </div>
               <div className="size-1 rounded-full bg-border" />
               <span>6 Modules</span>
            </div>
          </div>

          {!isEnrolled && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {course.overview || "Access global intelligence and operational mastery in this comprehensive program."}
            </p>
          )}

          {isEnrolled && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary" 
                />
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer Action */}
        <div className="p-5 pt-0 mt-auto">
          <div className="w-full flex items-center justify-between pt-4 border-t border-border/50">
            <span className="text-sm font-semibold text-foreground">
              {isEnrolled ? "Continue Learning" : "View Details"}
            </span>
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {isEnrolled ? <PlayCircleIcon className="size-4" /> : <ArrowRightIcon className="size-4" />}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
