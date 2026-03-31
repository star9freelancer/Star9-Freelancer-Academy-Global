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
          className="hidden lg:flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <div className="relative animate-float">
              <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border shadow-card p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-lg">
                    🎓
                  </div>
                  <div>
                    <div className="h-3 w-24 bg-primary/20 rounded-full" />
                    <div className="h-2 w-16 bg-muted rounded-full mt-2" />
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-3 w-full bg-muted rounded-full" />
                  <div className="h-3 w-4/5 bg-muted rounded-full" />
                  <div className="h-3 w-3/5 bg-muted rounded-full" />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-8 w-20 bg-primary/20 rounded-lg" />
                  <div className="h-8 w-20 bg-secondary/20 rounded-lg" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center text-2xl">🌐</div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xl">💼</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
