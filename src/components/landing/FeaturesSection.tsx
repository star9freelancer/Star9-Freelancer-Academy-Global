import { motion } from "framer-motion";
import { BookOpen, Globe2, Shield, Users, Clock, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Professional Courses",
    description: "AI for Freelancers, Freelancing Essentials, and International Teacher Preparation. Structured for real career impact with weekly pacing over 2-3 months.",
    accent: "primary",
    span: "md:col-span-2 md:row-span-2",
    size: "large",
  },
  {
    icon: Globe2,
    title: "Global Opportunities",
    description: "Remote jobs and international study programs across 30+ countries, all vetted by our team.",
    accent: "secondary",
    badge: "30+ Countries",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every job and program is manually vetted by our quality assurance team before publication.",
    accent: "primary",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of freelancers sharing tips, resources, and referrals in course-specific groups.",
    accent: "secondary",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Weekly module unlocks keep you on track. Complete quizzes to progress. Average completion: 8-12 weeks.",
    accent: "primary",
    span: "md:col-span-2",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Pass all assessments to earn a verified Star9 certificate you can share with employers.",
    accent: "secondary",
    span: "md:col-span-2",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-card relative overflow-hidden border-t border-border">
      <div className="container relative z-10 max-w-6xl">
        <div className="max-w-2xl mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-primary font-medium"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Everything You Need{" "}
            <span className="text-muted-foreground">In One Place</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Skills training, career opportunities, and community support under one roof.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min md:auto-rows-[260px]">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${f.span || ""} bg-background/50 border border-border rounded-xl p-8 flex flex-col justify-between group hover:border-${f.accent}/40 transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  f.accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                }`}>
                  <f.icon className={f.size === "large" ? "size-6" : "size-5"} />
                </div>
                {f.badge && (
                  <span className="text-xs text-muted-foreground font-medium">{f.badge}</span>
                )}
              </div>
              <div>
                <h3 className={`font-bold mb-2 ${f.size === "large" ? "text-2xl" : "text-lg"}`}>{f.title}</h3>
                <p className={`text-muted-foreground leading-relaxed ${f.size === "large" ? "text-base" : "text-sm"}`}>
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
