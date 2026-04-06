import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Database, PlayCircle, ShieldCheck, Loader2 } from "lucide-react";

interface CourseCardProps {
  course: any;
  isEnrolled: boolean;
  isEnrolling?: boolean;
  onEnroll?: () => void;
  onOpen?: () => void;
  onViewDetails?: () => void;
}

const CourseCard = ({ course, isEnrolled, isEnrolling, onEnroll, onOpen, onViewDetails }: CourseCardProps) => {
  return (
    <Card className="glass border-border/50 shadow-card hover:shadow-card-hover transition-all flex flex-col group overflow-hidden bg-gradient-to-br from-card/50 to-background/50">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
          alt={course.title} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/10 backdrop-blur-md uppercase font-mono text-[9px] tracking-widest">
            {course.category}
          </Badge>
          {isEnrolled && (
            <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
              Synchronized
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{course.title}</CardTitle>
        <CardDescription className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">
           Est. Completion: {course.duration || "10 Weeks"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
           {course.overview || course.description || "Master the transition to decentralized digital professional infrastructure with Star9."}
        </p>

        {isEnrolled && (
          <div className="mt-auto pt-4 space-y-2 border-t border-border/50">
             <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>Network Progress</span>
                <span className="text-primary font-bold">12%</span>
             </div>
             <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)] w-[12%] transition-all duration-1000" />
             </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 pb-6 px-6 gap-3">
        {isEnrolled ? (
          <Button 
            className="flex-1 font-mono uppercase text-[10px] tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/10 py-5"
            onClick={onOpen}
          >
            Continue <Play className="ml-2 size-3" />
          </Button>
        ) : (
          <div className="flex flex-col w-full gap-2">
            <Button 
               className="w-full font-mono uppercase text-[10px] tracking-widest bg-emerald-500 hover:bg-emerald-600 text-white py-5 shadow-lg shadow-emerald-500/20"
               onClick={onEnroll}
               disabled={isEnrolling}
            >
               {isEnrolling ? <Loader2 className="size-3 animate-spin mr-2" /> : <ShieldCheck className="size-3 mr-2" />}
               {isEnrolling ? "Verifying..." : "Enroll Now"}
            </Button>
            <Button 
               variant="outline"
               className="w-full font-mono uppercase text-[10px] tracking-widest border-border hover:bg-muted py-5"
               onClick={onViewDetails}
            >
               View Details
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
