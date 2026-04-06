import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden border-t border-border bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 glass border border-border p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Ready to start?</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Launch Your <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Global Career</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Access curated coursework and remote job placements meeting international standards. Join thousands of freelancers already building their future.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-sm font-semibold group" asChild>
                <Link to="/auth" className="flex items-center gap-3">
                  Get Started Free
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
