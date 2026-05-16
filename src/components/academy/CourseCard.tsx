import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock as ClockIcon,
  ArrowRight as ArrowRightIcon,
  PlayCircle as PlayCircleIcon,
  CheckCircle2 as CheckCircle2Icon,
  Lock as LockIcon,
  CalendarClock as CalendarClockIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// Cohort launch gate — lessons unlock on this date
const COHORT_START = new Date("2026-05-12T00:00:00");

interface CourseCardProps {
  course: any;
  enrollment?: any;
  onEnroll?: () => void;
  onOpen?: () => void;
}

const CourseCard = ({ course, enrollment, onEnroll, onOpen }: CourseCardProps) => {
  const { isAdmin } = useAuth();

  // Memoize computed values to prevent unnecessary re-renders
  const isEnrolled = useMemo(() => !!enrollment || isAdmin, [enrollment, isAdmin]);
  const progress = useMemo(() => enrollment?.progress || 0, [enrollment?.progress]);
  const isLocked = useMemo(() => isEnrolled && !isAdmin && new Date() < COHORT_START, [isEnrolled, isAdmin]);

  const handleCardClick = () => {
    if (isLocked) {
      toast.info("📅 Lessons begin Tuesday, 12th May", {
        description: "Hang tight — your course unlocks on the 12th. Get excited!",
        duration: 5000,
      });
      return;
    }
    // If enrolled, open the course; otherwise, trigger enrollment
    if (isEnrolled) {
      onOpen?.();
    } else {
      onEnroll?.();
    }
  };

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
        onClick={handleCardClick}
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
                <span>{course.duration || "4 Weeks (Self-Paced)"}</span>
              </div>
              <div className="size-1 rounded-full bg-border" />
              <span>
                {(() => {
                  // Count total modules from lessons structure
                  if (course.lessons && Array.isArray(course.lessons)) {
                    const totalModules = course.lessons.reduce((count: number, week: any) => {
                      return count + (week.modules?.length || 0);
                    }, 0);
                    return `${totalModules} ${totalModules === 1 ? 'Module' : 'Modules'}`;
                  }
                  return '6 Modules'; // Fallback
                })()}
              </span>
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
            {isLocked ? (
              <span className="text-sm font-semibold text-amber-500 flex items-center gap-2">
                <CalendarClockIcon className="size-4" /> Starts May 12th
              </span>
            ) : (
              <span className="text-sm font-semibold text-foreground">
                {isEnrolled ? "Continue Learning" : "Enroll Now"}
              </span>
            )}
            <div className={`size-8 rounded-full flex items-center justify-center transition-colors ${isLocked
              ? 'bg-amber-500/10 text-amber-500'
              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
              }`}>
              {isLocked ? <LockIcon className="size-4" /> : isEnrolled ? <PlayCircleIcon className="size-4" /> : <ArrowRightIcon className="size-4" />}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
