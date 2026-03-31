import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Architectural Background Lines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-border/40" />
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-border/40" />
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-border/20" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Authoritative Typography */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-8"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary rounded-full"></span>
            <span className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-secondary uppercase">
              The Global Hub
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter text-foreground">
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
            Welcome to the centralized launchpad for exceptional talent. Master AI at our Academy, or step into premium remote jobs and international study programs via Star9 Global.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold tracking-widest uppercase text-sm group transition-all" asChild>
              <Link to="/academy" className="gap-3 flex items-center justify-center">
                Enter Academy 
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="size-3" />
                </div>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 rounded-none border-border text-foreground hover:bg-accent font-mono font-bold tracking-widest uppercase text-sm group" asChild>
              <Link to="/global" className="gap-3 flex items-center justify-center">
                Star9 Global
                <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-secondary" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Abstract Passport/Boarding Pass Structure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block h-[600px] w-full"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 right-[-100px] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] -z-10" />

          {/* The Structural Element */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-[10%] w-[420px] bg-card/60 glass border border-border/50 backdrop-blur-2xl p-8 rounded-sm shadow-2xl"
          >
            <div className="flex justify-between items-start border-b border-border/50 pb-6 mb-6">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">Access Granted</p>
                <p className="text-xl font-bold tracking-tight text-foreground">Global Opportunities</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">Destination</p>
                <p className="font-medium text-lg text-foreground">Remote Work</p>
                <p className="text-xs text-secondary mt-1">Status: Boarding</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">Priority</p>
                <p className="font-medium text-lg text-foreground">First Class</p>
                <p className="text-xs text-primary mt-1">ID: S9-GLOBAL</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-[2px] w-full bg-border" />
              <div className="h-[2px] w-full bg-border" />
              <div className="h-[2px] w-full bg-border" />
              <div className="h-[2px] w-3/4 bg-primary/50" />
            </div>

            {/* Barcode representation */}
            <div className="mt-8 flex gap-1 h-12 opacity-30 dark:opacity-50">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="bg-foreground h-full" style={{ width: Math.random() * 6 + 2 + "px" }} />
              ))}
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-[-20px] bottom-[15%] w-[280px] bg-secondary/10 glass border border-secondary/20 p-6 rounded-sm shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary flex items-center justify-center text-primary-foreground font-bold font-mono text-lg">
                AI
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Module Active</p>
                <p className="font-bold text-sm text-foreground">Academy Synchronized</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
