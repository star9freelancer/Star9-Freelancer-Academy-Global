import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-border/40" />
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-border/40" />
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-border/20" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-8"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary rounded-full"></span>
            <span className="text-sm font-semibold tracking-wide text-secondary uppercase">
              Empowering African Talent
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-foreground">
            Freelancing with<br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                heart and skill.
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-2 left-0 h-3 bg-primary/20 -z-0"
              />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed font-medium pl-6 border-l-2 border-primary/30">
            Master AI skills at our Academy, land premium remote jobs, or explore international study programs. Your global career starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 font-semibold text-sm group transition-all" asChild>
              <Link to="/academy" className="gap-3 flex items-center justify-center">
                Explore Academy 
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="size-3" />
                </div>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 font-semibold text-sm group" asChild>
              <Link to="/global" className="gap-3 flex items-center justify-center">
                Find Opportunities
                <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-secondary" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block h-[600px] w-full"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 right-[-100px] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] -z-10" />

          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-[10%] w-[420px] bg-card/60 glass border border-border/50 backdrop-blur-2xl p-8 rounded-xl shadow-2xl"
          >
            <div className="flex justify-between items-start border-b border-border/50 pb-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Your Journey</p>
                <p className="text-xl font-bold tracking-tight text-foreground">Global Opportunities</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Path</p>
                <p className="font-medium text-lg text-foreground">Remote Work</p>
                <p className="text-xs text-secondary mt-1">Applications Open</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Level</p>
                <p className="font-medium text-lg text-foreground">Premium</p>
                <p className="text-xs text-primary mt-1">Verified Member</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="h-2 flex-[3] bg-primary/30 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>
              <div className="h-2 flex-1 bg-secondary/30 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-secondary rounded-full" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-[-20px] bottom-[15%] w-[280px] bg-secondary/10 glass border border-secondary/20 p-6 rounded-xl shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-white font-bold text-lg">
                AI
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Popular Course</p>
                <p className="font-bold text-sm text-foreground">AI for Freelancers</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
