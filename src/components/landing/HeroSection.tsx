import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            🌍 Empowering Global Talent
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Freelancing with{" "}
            <span className="text-primary">heart</span> and{" "}
            <span className="text-secondary">skill.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Empowering global talent through world-class AI education, premium remote work, and international study opportunities.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/academy" className="gap-2">
                Explore the Academy <ArrowRight className="!size-4" />
              </Link>
            </Button>
            <Button variant="hero-secondary" size="lg" asChild>
              <Link to="/global" className="gap-2">
                Discover Opportunities <ArrowRight className="!size-4" />
              </Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold text-primary">2,500+</p>
              <p className="text-sm text-muted-foreground">Active Learners</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">150+</p>
              <p className="text-sm text-muted-foreground">Remote Jobs Posted</p>
            </div>
            <div>
              <p className="text-2xl font-bold">30+</p>
              <p className="text-sm text-muted-foreground">Countries Reached</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex justify-end pt-10"
        >
          <div className="relative w-full max-w-lg">
            {/* The main glowing dashboard card */}
            <div className="relative animate-float z-20">
              <div className="w-[450px] rounded-2xl bg-card border border-primary/20 shadow-2xl overflow-hidden glass">
                <div className="h-10 border-b flex items-center px-4 gap-2 bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 h-4 w-32 bg-background rounded-full border" />
                </div>
                <div className="p-6 grid grid-cols-3 gap-4 bg-gradient-to-br from-card to-muted/20">
                  <div className="col-span-1 space-y-4">
                    <div className="h-2 w-16 bg-muted-foreground/20 rounded-full" />
                    <div className="h-10 w-full bg-primary/10 rounded-lg border border-primary/20 flex items-center px-3 gap-2">
                       <div className="w-6 h-6 rounded-md bg-primary/20" />
                       <div className="h-2 w-12 bg-primary/40 rounded-full" />
                    </div>
                    <div className="h-8 w-full bg-muted rounded-lg" />
                    <div className="h-8 w-full bg-muted rounded-lg" />
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="h-2 w-20 bg-muted-foreground/30 rounded-full mb-2" />
                        <div className="h-5 w-32 bg-foreground/80 rounded-full" />
                      </div>
                      <div className="h-8 w-24 bg-secondary/20 rounded-full border border-secondary/30" />
                    </div>
                    <div className="h-32 w-full bg-accent/30 rounded-xl border border-accent flex items-end p-4">
                       <div className="w-full flex justify-between items-end gap-2 h-20">
                          {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                            <div key={i} className="w-full bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }} />
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 p-4 rounded-xl bg-card border shadow-xl flex items-center gap-3 glass"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold">✓</div>
                <div>
                  <div className="h-2 w-10 bg-muted-foreground/40 rounded-full mb-1" />
                  <div className="h-3 w-16 bg-foreground/80 rounded-full" />
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-12 w-40 p-4 rounded-xl bg-card border shadow-xl flex items-center gap-3 glass"
              >
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xl">🚀</div>
                <div>
                  <div className="h-2 w-12 bg-muted-foreground/40 rounded-full mb-1" />
                  <div className="h-3 w-20 bg-foreground/80 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
