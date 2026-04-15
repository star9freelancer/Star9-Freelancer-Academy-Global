import { motion } from "framer-motion";

const features = [
  {
    emoji: "📚",
    title: "Structured Courses",
    description: "8-12 week programs in AI, freelancing, and education. Weekly modules with quizzes keep you on track.",
    color: "bg-primary/10 border-primary/20",
  },
  {
    emoji: "🌐",
    title: "Global Job Board",
    description: "Vetted remote jobs across 30+ countries. Every listing is reviewed by our team before publication.",
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    emoji: "🏅",
    title: "Verified Certificates",
    description: "Pass all assessments to earn a Star9 certificate. Share it with employers and stand out.",
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    emoji: "👥",
    title: "Community Support",
    description: "Join course-specific groups. Share tips, get feedback, and find referrals from fellow professionals.",
    color: "bg-violet-500/10 border-violet-500/20",
  },
  {
    emoji: "⏱️",
    title: "Learn at Your Pace",
    description: "Weekly module unlocks keep you accountable. Complete quizzes before moving on. No rushing through.",
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    emoji: "✈️",
    title: "Study Abroad Guidance",
    description: "International teacher prep, visa support, and study program guidance for career changers.",
    color: "bg-rose-500/10 border-rose-500/20",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-card relative overflow-hidden border-t border-border">
      <div className="container relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-secondary font-semibold"
          >
            Why Star9
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group p-7 rounded-2xl border ${f.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <span className="text-3xl mb-4 block">{f.emoji}</span>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
