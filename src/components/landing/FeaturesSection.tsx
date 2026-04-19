import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    emoji: "🤖",
    title: "AI for Freelancers",
    description: "8-week intensive programme. Learn to leverage AI tools to multiply your output and win global clients. One-time fee of $50.",
    color: "bg-primary/10 border-primary/20",
  },
  {
    emoji: "💼",
    title: "Mastering Freelancing",
    description: "12-week complete pipeline for building a thriving global freelance business. Includes bonus lifetime access to the Global Job Board. $100 one-time.",
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    emoji: "✈️",
    title: "International Teacher Preparation",
    description: "3-phase pipeline: Vetting and Resume review, Loom audition and interviews, then Visa and Relocation support. $300 one-time.",
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    emoji: "🌐",
    title: "Work Abroad Portal",
    description: "Curated placements in the US, UK, Canada, China, and Germany. Each listing is manually reviewed before publication.",
    color: "bg-violet-500/10 border-violet-500/20",
  },
  {
    emoji: "💻",
    title: "Remote Work Board",
    description: "8 core remote work categories covering writing, design, development, virtual assistance, teaching, sales, data, and AI consulting.",
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    emoji: "🤝",
    title: "Referral Programme",
    description: "Earn commissions by referring students. $10 per AI course, $15 per Mastering Freelancing or Teacher Preparation enrolment.",
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
            >
              <Link
                to="/auth"
                className={`group block h-full p-7 rounded-2xl border ${f.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <span className="text-3xl mb-4 block">{f.emoji}</span>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <span className="text-lg">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
