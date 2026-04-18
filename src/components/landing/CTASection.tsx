import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden border-t border-border bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="container max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-4xl">🚀</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Launch Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Global Career
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of African professionals building borderless careers with Star9.
            Enroll in AI for Freelancers ($50), Mastering Freelancing ($100), or International Teacher Preparation ($300) and start earning on the global stage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-10 text-sm font-semibold group shadow-lg shadow-primary/20" asChild>
              <Link to="/auth" className="flex items-center gap-3">
                Get Started Free
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 text-sm font-semibold" asChild>
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
