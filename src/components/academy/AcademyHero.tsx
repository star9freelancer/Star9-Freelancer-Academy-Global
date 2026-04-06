import React from "react";
import { Sparkles, Users, BookOpen, Globe, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AcademyHeroProps {
  type: "community" | "learning" | "catalog" | "career";
  title?: string;
  subtitle?: string;
  userName?: string;
}

const AcademyHero = ({ type, title, subtitle, userName }: AcademyHeroProps) => {
  const configs = {
    community: {
      gradient: "from-blue-600/20 via-primary/10 to-transparent",
      icon: Users,
      defaultTitle: "Connect With Fellow Learners",
      defaultSubtitle: "Get peer support and build your professional network in the Star9 global community.",
      accent: "text-blue-500",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
    },
    learning: {
      gradient: "from-emerald-600/20 via-secondary/10 to-transparent",
      icon: BookOpen,
      defaultTitle: `Continue Your Journey, ${userName || 'Personnel'}`,
      defaultSubtitle: "Track your progress and mastery across your enrolled skill tracks.",
      accent: "text-emerald-500",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
    },
    catalog: {
      gradient: "from-amber-600/20 via-primary/10 to-transparent",
      icon: Globe,
      defaultTitle: "Unlock Unlimited Learning",
      defaultSubtitle: "Explore premium digital infrastructure and AI operational Mastery modules.",
      accent: "text-amber-500",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
    },
    career: {
      gradient: "from-purple-600/20 via-secondary/10 to-transparent",
      icon: TrendingUp,
      defaultTitle: "Accelerate Your Personnel Track",
      defaultSubtitle: "Discover high-tier career opportunities for certified Star9 practitioners.",
      accent: "text-purple-500",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-12 group">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={config.image} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.5] group-hover:scale-105 transition-transform duration-10000"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient}`} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 space-y-4 max-w-4xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${config.accent}`}>
             <Icon className="size-5" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">Star9 Intelligence Hub</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          {title || config.defaultTitle}
        </h1>
        
        <p className="text-sm md:text-lg text-white/60 font-medium max-w-2xl leading-relaxed">
          {subtitle || config.defaultSubtitle}
        </p>

        {type === 'community' && (
          <div className="flex flex-wrap gap-4 pt-4">
             <Button className="font-mono text-xs uppercase tracking-widest bg-white text-black hover:bg-white/90">
                Join Network Space
             </Button>
             <Button variant="outline" className="font-mono text-xs uppercase tracking-widest border-white/20 text-white hover:bg-white/10">
                View Network Events
             </Button>
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${config.gradient} opacity-50`} />
    </div>
  );
};

export default AcademyHero;
