import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight as ArrowRightIcon } from "lucide-react";

const cards = [
  {
    title: "Star9 Academy",
    subtitle: "Learn. Build Skills. Earn Globally.",
    description:
      "Star9 Academy is the learning hub of Star9 Freelancer Ltd, designed to equip African youth and women with in-demand digital skills for the global economy. Through fully online, practical, and beginner-friendly courses, we train learners in high-demand fields such as Artificial Intelligence (AI), freelancing, and remote work.",
    link: "/academy",
    gradient: "from-primary/20 to-primary/5",
    borderHover: "hover:border-primary/40",
    accent: "text-primary",
    stats: ["AI · Freelancing", "Pay-per-course access", "Verified Certificates"],
    emoji: "🎓",
  },
  {
    title: "Star9 Global",
    subtitle: "Work. Travel. Grow.",
    description:
      "Connecting African professionals to Work Abroad opportunities in the US, UK, Canada, China, and Germany, plus 8 curated Remote Work categories and Study Abroad programme support.",
    link: "/global",
    gradient: "from-secondary/20 to-secondary/5",
    borderHover: "hover:border-secondary/40",
    accent: "text-secondary",
    stats: ["Work Abroad: 5 Countries", "8 Remote Categories", "Study Abroad Portals"],
    emoji: "🌍",
  },
];

const DualBrandSection = () => {
  return (
    <section id="about" className="py-28 relative bg-background border-t border-border">
      <div className="container relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Our Ecosystem</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Two Platforms.{" "}
            <span className="text-muted-foreground">One Vision.</span>
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
                className={`block p-8 md:p-10 rounded-2xl border group transition-all duration-300 hover:shadow-xl h-full bg-gradient-to-br ${card.gradient} ${card.borderHover}`}
              >
                <span className="text-4xl mb-6 block">{card.emoji}</span>

                <h3 className="text-2xl font-bold tracking-tight mb-1">{card.title}</h3>
                <p className={`text-sm font-semibold mb-4 ${card.accent}`}>{card.subtitle}</p>

                <p className="text-muted-foreground leading-relaxed mb-6">{card.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {card.stats.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-background/60 border border-border/50 text-xs font-medium text-foreground">{s}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span className={card.accent}>Explore</span>
                  <ArrowRightIcon className={`size-4 ${card.accent} group-hover:translate-x-1 transition-transform`} />
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
