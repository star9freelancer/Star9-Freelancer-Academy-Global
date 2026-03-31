import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center pt-28 pb-16 md:pt-16 md:pb-12 overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      
      {/* Floating Abstract Element */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute right-[5%] top-[20%] w-[320px] h-[340px] rounded-3xl border border-border/50 bg-card/40 glass p-6 shadow-2xl flex-col justify-between pointer-events-none z-0"
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
            <div className="w-5 h-5 rounded-md bg-primary/80" />
          </div>
          <div className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold tracking-widest uppercase border border-secondary/20">
            Platform Match
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-2 w-full bg-muted-foreground/20 rounded-full" />
          <div className="h-2 w-4/5 bg-primary/40 rounded-full" />
          <div className="h-2 w-2/3 bg-muted-foreground/20 rounded-full" />
          <div className="h-2 w-5/6 bg-secondary/40 rounded-full" />
        </div>
        <div className="pt-5 border-t border-border/50 flex items-center justify-between">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/30" />
            <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary/30" />
            <div className="w-10 h-10 rounded-full border-2 border-background bg-muted" />
          </div>
          <div className="text-xs font-mono font-bold text-foreground">Active Now</div>
        </div>
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-8"
        >
          <div className="font-mono text-xs md:text-sm font-semibold tracking-widest text-secondary uppercase">
            Global Talent Platform
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[1.05] tracking-tight text-foreground select-none">
            Freelancing with<br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> heart and skill.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium pt-2">
            Star9 Freelancer Ltd. gives you the tools to succeed. Master AI and freelancing skills at our Academy, or connect to remote jobs and international study opportunities via Star9 Global.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-8 z-10 relative">
            <Button size="lg" className="w-full sm:w-auto rounded-md px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold tracking-widest uppercase text-sm group transition-all hover:shadow-lg hover:shadow-primary/20" asChild>
              <Link to="/academy" className="gap-2">
                Start Free <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto rounded-md px-6 py-6 text-muted-foreground hover:text-foreground font-mono font-bold tracking-widest uppercase text-sm group" asChild>
              <Link to="/global" className="gap-2 flex items-center justify-center">
                Dashboard <ArrowRight className="size-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
