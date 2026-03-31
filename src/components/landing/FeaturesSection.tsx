import { motion } from "framer-motion";
import { Zap, Shield, Globe2, BookOpen, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Industry-Standard Curriculum",
    description: "Access specialized digital skills training and structured pathways updated to meet modern market demands."
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Access remote jobs and international study programs across 30+ countries."
  },
  {
    icon: Shield,
    title: "Verified Opportunities",
    description: "Every role and academic affiliation is manually vetted by our quality assurance team."
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join thousands of freelancers sharing tips, templates, and referral gigs."
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Build your portfolio and start applying to jobs within 10 minutes."
  },
  {
    icon: TrendingUp,
    title: "Career Tracking",
    description: "Track your course progress, certificates, and job applications in one place."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 border-t border-border bg-card relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
      <div className="container relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            A Comprehensive <span className="text-primary">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Providing the necessary infrastructure for your professional and academic advancement.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
