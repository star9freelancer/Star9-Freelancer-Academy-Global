import React from "react";
import { Sparkles, Users, BookOpen, Globe, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AcademyHeroProps {
  type: "community" | "learning" | "catalog" | "career";
  title?: string;
  subtitle?: string;
  userName?: string;
}

const AcademyHero = ({ type, title, subtitle, userName }: AcademyHeroProps) => {
  const configs = {
    community: {
      gradient: "from-blue-600/30 via-primary/20 to-transparent",
      icon: Users,
      defaultTitle: "Connect With Fellow Learners",
      defaultSubtitle: "Get peer support and build your professional network in the Star9 global community.",
      accent: "text-blue-400",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
    },
    learning: {
      gradient: "from-emerald-600/30 via-secondary/20 to-transparent",
      icon: BookOpen,
      defaultTitle: `Welcome Back, ${userName || 'User'}`,
      defaultSubtitle: "Track your progress and skills across your enrolled courses.",
      accent: "text-emerald-400",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
    },
    catalog: {
      gradient: "from-amber-600/30 via-primary/20 to-transparent",
      icon: Globe,
      defaultTitle: "Unlock New Skills",
      defaultSubtitle: "Explore premium courses on digital infrastructure and AI operations.",
      accent: "text-amber-400",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
    },
    career: {
      gradient: "from-purple-600/30 via-secondary/20 to-transparent",
      icon: TrendingUp,
      defaultTitle: "Accelerate Your Career",
      defaultSubtitle: "Discover high-tier job opportunities for certified Star9 members.",
      accent: "text-purple-400",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 group border border-white/5 shadow-2xl">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={config.image} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.3] group-hover:scale-105 transition-transform duration-[20s]"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient}`} />
        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px]" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-32 rounded-full bg-primary/10 blur-[80px]"
              animate={{
                x: [Math.random() * 500, Math.random() * 500],
                y: [Math.random() * 500, Math.random() * 500],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 space-y-3 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md ${config.accent} shadow-lg`}>
             <Icon className="size-5" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 font-bold">Academy Home</span>
        </motion.div>
        
        <div className="space-y-4">
          <motion.h1 
            key={type + "title"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            {title || config.defaultTitle.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? "text-primary" : ""}>{word} </span>
            ))}
          </motion.h1>
          
          <motion.p 
            key={type + "subtitle"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xs md:text-base text-white/50 font-medium max-w-2xl leading-relaxed"
          >
            {subtitle || config.defaultSubtitle}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          {type === 'community' && (
            <>
               <Button className="font-mono text-[9px] uppercase tracking-widest bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  Join Community
               </Button>
               <Button variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-white/10 text-white/80 hover:bg-white/5 px-6 py-4 rounded-xl backdrop-blur-md">
                  View Events
               </Button>
            </>
          )}
          {type === 'catalog' && (
            <Button className="font-mono text-[10px] uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95">
               Browse Courses
            </Button>
          )}
        </motion.div>
      </div>

      {/* Bottom accent glass bar */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r ${config.gradient} opacity-30 shadow-[0_-4px_30px_rgba(var(--primary),0.3)]`} />
    </div>
  );
};

export default AcademyHero;
