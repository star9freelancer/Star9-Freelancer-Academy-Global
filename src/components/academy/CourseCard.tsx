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
}

const CourseCard = ({ course, isEnrolled, isEnrolling, onEnroll, onOpen }: CourseCardProps) => {
  return (
    <Card className={`glass border-border/50 shadow-card hover:shadow-card-hover transition-all flex flex-col group ${!isEnrolled ? "opacity-90 grayscale-[0.5] hover:grayscale-0" : ""}`}>
      <CardHeader className="relative overflow-hidden">
        <div className="flex justify-between items-start mb-2 relative z-10">
          <Badge className={`w-fit bg-primary/20 text-primary hover:bg-primary/30 border-primary/10`}>
            {course.category}
          </Badge>
          {isEnrolled && (
            <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest text-secondary border-secondary/30 bg-secondary/5">
              Enrolled
            </Badge>
          )}
        </div>
        <CardTitle className="relative z-10">{course.title}</CardTitle>
        <CardDescription className="relative z-10">
          Published {new Date(course.created_at).toLocaleDateString()}
        </CardDescription>
        
        {/* Subtle decorative background icon */}
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          <Database className="size-24" />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col relative z-10">
        {isEnrolled ? (
          <div className="mb-4">
            <div className="flex justify-between text-[10px] mb-1.5 font-mono uppercase tracking-widest text-muted-foreground">
              <span>Progress</span>
              <span>0%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[5%]" />
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Status: Premium Module</p>
            <p className="text-xs font-bold mt-1 text-foreground">Secure connection required</p>
          </div>
        )}
        
        {course.lessons && course.lessons.length > 0 && (
          <div className="space-y-2 text-left mt-2">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">Curriculum:</p>
            {course.lessons.slice(0, 2).map((lesson: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                <PlayCircle className="w-3 h-3 text-secondary" />
                <span className="line-clamp-1">{lesson.title}</span>
              </div>
            ))}
            {course.lessons.length > 2 && (
              <p className="text-[10px] text-muted-foreground italic pl-5">+{course.lessons.length - 2} more segments</p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-border/50 pt-4 bg-muted/10">
        {isEnrolled ? (
          <Button 
            className="w-full font-mono uppercase text-xs tracking-widest gap-2 bg-primary hover:bg-primary/90"
            onClick={onOpen}
          >
            Continue Module <Play className="w-3 h-3" />
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="w-full font-mono uppercase text-xs tracking-widest gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            onClick={onEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <ShieldCheck className="size-3" />
            )}
            {isEnrolling ? "Verifying..." : "Secure Access"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
