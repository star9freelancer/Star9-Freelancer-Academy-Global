import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-secondary/20 rounded-full blur-[100px] -z-10" />
      
      <div className="container max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card glass border border-primary/20 p-10 md:p-16 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden"
        >
          {/* Inner ambient glow */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Advance Your Professional Journey
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Access curated coursework, remote job placements, and academic opportunities designed to meet international industry standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 rounded-xl" asChild>
              <Link to="/academy">
                Start Learning Free <ArrowRight className="!size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base gap-2 h-14 px-8 rounded-xl bg-background/50 hover:bg-muted" asChild>
              <Link to="/global">
                Browse Remote Jobs
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required for the basic tier.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
