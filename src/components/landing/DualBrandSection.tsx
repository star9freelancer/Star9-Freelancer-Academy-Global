import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Globe2 } from "lucide-react";

const cards = [
  {
    title: "Star9 Academy",
    subtitle: "Learn. Build skills. Earn globally.",
    description:
      "Star9 Academy is the learning hub of Star9 Freelancer Ltd, designed to equip African youth and women with in-demand digital skills for the global economy. Through fully online, practical, and beginner-friendly courses, we train learners in high-demand fields such as Artificial Intelligence (AI), freelancing, and remote work.",
    link: "/academy",
    accent: "text-primary",
    accentBg: "bg-primary/10 border-primary/20",
    Icon: GraduationCap,
    stats: ["AI · Freelancing", "Pay-per-course access", "Verified certificates"],
  },
  {
    title: "Star9 Global",
    subtitle: "Work globally. Study abroad. Build your future.",
    description:
      "Star9 Global Opportunities connects African youth and women to life-changing pathways beyond borders through remote work, study abroad, and work abroad programs. We provide structured support to help individuals access global careers, earn remotely, and gain international exposure.",
    link: "/global",
    accent: "text-secondary",
    accentBg: "bg-secondary/10 border-secondary/20",
    Icon: Globe2,
    stats: ["Work abroad", "Remote work", "Study abroad"],
  },
];

const DualBrandSection = () => {
  return (
    <section
      id="about"
      className="py-28 relative bg-background border-t border-border"
    >
      <div className="container relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Our Ecosystem
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Two platforms.{" "}
            <span className="text-muted-foreground">One vision.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From acquiring high-income skills to landing global opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                to={card.link}
                className="block p-8 md:p-10 rounded-2xl border border-border bg-card group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
              >
                <div
                  className={`size-12 rounded-xl border flex items-center justify-center mb-6 ${card.accentBg}`}
                >
                  <card.Icon
                    className={`size-5 ${card.accent}`}
                    strokeWidth={1.75}
                  />
                </div>

                <h3 className="text-2xl font-bold tracking-tight mb-1">
                  {card.title}
                </h3>
                <p className={`text-sm font-semibold mb-4 ${card.accent}`}>
                  {card.subtitle}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {card.stats.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-muted/60 border border-border/50 text-xs font-medium text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span className={card.accent}>Explore</span>
                  <ArrowRight
                    className={`size-4 ${card.accent} group-hover:translate-x-1 transition-transform`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualBrandSection;
