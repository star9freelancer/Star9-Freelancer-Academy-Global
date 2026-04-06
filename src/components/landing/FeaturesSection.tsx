import { motion } from "framer-motion";
import { BookOpen, Globe2, Shield, Users, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Professional Courses",
    description: "AI for Freelancers, Freelancing Essentials, and International Teacher Preparation courses designed for real-world impact."
  },
  {
    icon: Globe2,
    title: "Global Opportunities",
    description: "Access remote jobs and international study programs across 30+ countries."
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every job and program is manually vetted by our quality assurance team."
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of freelancers sharing tips, resources, and referrals."
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Build your profile and start applying to jobs within minutes."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track your course progress, certificates, and applications in one place."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-card relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-border" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-border" />
      </div>

      <div className="container relative z-10 max-w-6xl">
        <div className="max-w-2xl mb-16 space-y-4 border-l-4 border-primary pl-6">
          <p className="text-sm uppercase tracking-widest text-primary">What We Offer</p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Everything You Need <br/><span className="text-muted-foreground">In One Place</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground pt-4"
          >
            Skills training, career opportunities, and community support, all under one roof.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min md:auto-rows-[280px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-background/50 border border-border rounded-xl p-10 flex flex-col justify-between group hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen className="size-6" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">{features[0].title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{features[0].description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-background/50 border border-border rounded-xl p-8 flex flex-col justify-between group hover:border-secondary/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <Globe2 className="size-8 text-secondary" />
              <span className="text-xs text-muted-foreground">30+ Countries</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{features[1].title}</h3>
              <p className="text-muted-foreground">{features[1].description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-8 flex flex-col justify-between"
          >
            <Shield className="size-8 text-primary mb-4" />
            <div>
              <h3 className="text-lg font-bold mb-2">{features[2].title}</h3>
              <p className="text-sm text-muted-foreground">{features[2].description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/5 border border-secondary/20 rounded-xl p-8 flex flex-col justify-between"
          >
            <Users className="size-8 text-secondary mb-4" />
            <div>
              <h3 className="text-lg font-bold mb-2">{features[3].title}</h3>
              <p className="text-sm text-muted-foreground">{features[3].description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="md:col-span-2 bg-background/50 border border-border rounded-xl p-8 flex items-center gap-8 group hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center shrink-0">
              <TrendingUp className="size-6 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{features[5].title}</h3>
              <p className="text-muted-foreground">{features[5].description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-muted/30 border border-border rounded-xl p-8 flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{features[4].title}</h3>
              <p className="text-muted-foreground">{features[4].description}</p>
            </div>
            <Zap className="size-10 text-primary opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
