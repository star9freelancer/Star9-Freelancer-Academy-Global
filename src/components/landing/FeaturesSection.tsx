import { motion } from "framer-motion";
import { Zap, Shield, Globe2, BookOpen, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "AI-Powered Curriculum",
    description: "Learn cutting-edge skills like Prompt Engineering and AI workflows, updated weekly."
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Access remote jobs and university programs across 30+ countries globally."
  },
  {
    icon: Shield,
    title: "Verified Opportunities",
    description: "Every job and study program is manually vetted by our expert team for your safety."
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
    <section id="features" className="py-24 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Everything you need to <span className="text-primary">succeed online.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We provide the infrastructure for your freelance and academic journey, so you can focus on what matters most.
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
