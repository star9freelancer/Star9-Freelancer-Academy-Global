import React from "react";
import { 
  Clock, Calendar, CreditCard, CheckCircle2, PlayCircle, 
  Lock, ArrowLeft, Share2, Award, Users, Sparkles, Cpu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProgramDetailViewProps {
  course: any;
  isEnrolled: boolean;
  onBack: () => void;
  onEnroll: () => void;
  onStart: (lessonIdx: number) => void;
}

const ProgramDetailView = ({ course, isEnrolled, onBack, onEnroll, onStart }: ProgramDetailViewProps) => {
  const stats = [
    { label: "Duration", value: course.duration || "10 Weeks", icon: Clock },
    { label: "Commitment", value: course.commitment || "30-40 hrs/week", icon: Calendar },
    { label: "Access Fee", value: course.price === 0 ? "Free Access" : `$${course.price}/month`, icon: CreditCard },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary" onClick={onBack}>
          <ArrowLeft className="size-4" /> Back to Catalog
        </Button>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="icon" className="rounded-full"><Share2 className="size-4" /></Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 uppercase tracking-widest text-[10px]">
              {course.category || "Skill Track"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{course.title}</h1>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {course.overview || course.description || "Master the essential skills required to thrive in a rapidly evolving global digital workforce with Star9 Infrastructure."}
          </p>
          
          {course.learning_outcomes && course.learning_outcomes.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Expected Learning Outcomes:</h3>
              <div className="grid gap-3">
                {course.learning_outcomes.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-1 size-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-3 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {course.assessment_details && (
            <div className="p-6 rounded-2xl border border-secondary/20 bg-secondary/5 space-y-3">
               <h4 className="font-bold text-sm flex items-center gap-2">
                  <Award className="size-4 text-secondary" /> Certification Assessment
               </h4>
               <p className="text-xs text-muted-foreground leading-relaxed italic">
                  {course.assessment_details}
               </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                  <stat.icon className="size-3" /> {stat.label}
                </p>
                <p className="text-sm font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Platform Features:</h3>
            <div className="grid gap-3">
              {[
                "24/7 Global Access to Star9 Infrastructure",
                "Direct Mentorship from Industry Practitioners",
                "Immutable Credential Issuance on the Star9 Ledger",
                "Priority Placement in the Career Engine"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1 size-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-3 text-primary/60" />
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media / Action Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="glass border-border/50 overflow-hidden shadow-2xl">
            <div className="aspect-video relative group cursor-pointer overflow-hidden">
               <img 
                 src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
                 alt={course.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="size-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                     <PlayCircle className="size-8 text-white fill-white/20" />
                  </div>
               </div>
            </div>
            <CardContent className="p-6 space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Status</span>
                     <Badge variant={isEnrolled ? "default" : "outline"} className="font-mono text-[9px] uppercase tracking-widest">
                        {isEnrolled ? "Active Track" : "Available to Enroll"}
                     </Badge>
                  </div>
                  <h4 className="font-bold text-center py-2">
                    {isEnrolled ? "Personnel Identity Synchronized" : "Authorization Required"}
                  </h4>
               </div>

               {isEnrolled ? (
                 <Button className="w-full py-6 font-mono uppercase tracking-widest text-xs bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={() => onStart(0)}>
                   Resume Learning Path
                 </Button>
               ) : (
                 <Button className="w-full py-6 font-mono uppercase tracking-widest text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" onClick={onEnroll}>
                   Secure Access Now
                 </Button>
               )}
               
               <div className="pt-4 border-t border-border/50 flex items-center justify-center gap-6">
                  <div className="text-center group">
                     <Users className="size-5 mx-auto mb-1 text-muted-foreground group-hover:text-primary transition-colors" />
                     <p className="text-[9px] font-mono uppercase tracking-tighter opacity-60">1.2k Agents</p>
                  </div>
                  <div className="text-center group">
                     <Award className="size-5 mx-auto mb-1 text-muted-foreground group-hover:text-secondary transition-colors" />
                     <p className="text-[9px] font-mono uppercase tracking-tighter opacity-60">Accredited</p>
                  </div>
                  <div className="text-center group">
                     <Sparkles className="size-5 mx-auto mb-1 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                     <p className="text-[9px] font-mono uppercase tracking-tighter opacity-60">AI Ops</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Program Structure */}
      <div className="space-y-8 pt-12">
        <div className="flex items-center gap-4">
           <h2 className="text-2xl font-bold tracking-tight">Program Structure</h2>
           <div className="h-px flex-1 bg-border/50" />
        </div>

        <div className="grid gap-6">
          {course.lessons?.map((lesson: any, i: number) => (
            <Card key={lesson.id} className="glass border-border/50 hover:border-primary/30 transition-all overflow-hidden group">
              <div className="flex md:items-center gap-6 p-6">
                <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                  isEnrolled ? "bg-primary/10 border-primary/25 text-primary shadow-lg shadow-primary/5" : "bg-muted border-border/50 text-muted-foreground"
                }`}>
                  <Cpu className="size-5" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="font-bold tracking-tight group-hover:text-primary transition-colors">
                      {i + 1}. {lesson.title}
                    </h3>
                    <Badge variant="outline" className="w-fit font-mono text-[9px] uppercase tracking-widest text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all">
                      {isEnrolled ? "Module Open" : "Class TBA"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 italic">
                    {lesson.type === 'video' ? "Video Masterclass" : "Technical Validation"} • Segment {i + 1}
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-1 px-6 border-l border-border/50">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground opacity-60">Timeline</p>
                  <p className="text-xs font-bold whitespace-nowrap">Week {Math.floor(i / 2) + 1}</p>
                </div>

                {isEnrolled ? (
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" onClick={() => onStart(i)}>
                    <PlayCircle className="size-6" />
                  </Button>
                ) : (
                  <div className="size-10 flex items-center justify-center text-muted-foreground opacity-30">
                    <Lock className="size-5" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailView;
