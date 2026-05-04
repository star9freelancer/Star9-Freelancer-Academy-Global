import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-28 relative overflow-hidden border-t border-border bg-background">
      <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="container max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-secondary" />
            Built for African talent · Trusted globally
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Launch your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              global career
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of African professionals building borderless careers with Star9.
            Enroll in AI for Freelancers ($50), Mastering Freelancing ($100), or International Teacher Preparation ($1,500) and start earning on the global stage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-10 text-sm font-semibold group shadow-lg shadow-primary/20"
              asChild
            >
              <Link to="/auth" className="flex items-center gap-3">
                Get Started Free
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 text-sm font-semibold"
              asChild
            >
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
