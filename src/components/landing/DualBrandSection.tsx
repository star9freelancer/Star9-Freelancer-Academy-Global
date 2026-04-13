import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Star9 Academy",
    subtitle: "Courses & Certifications",
    description: "Structured online courses in AI for freelancers, freelancing essentials, and international teacher preparation. Each course runs 8-12 weeks with weekly modules, quizzes, and a verified certificate.",
    icon: GraduationCap,
    link: "/academy",
    accent: "primary" as const,
    stats: "3 Courses / 60+ Modules",
  },
  {
    title: "Star9 Global",
    subtitle: "Jobs & Study Abroad",
    description: "Connecting African professionals to verified remote jobs worldwide and providing guidance for international study opportunities. Every listing is manually vetted.",
    icon: Globe,
    link: "/global",
    accent: "secondary" as const,
    stats: "30+ Countries / 200+ Listings",
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
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Our Ecosystem</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Two Platforms. One Vision.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From acquiring skills to landing global opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
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
                className={`block p-8 md:p-10 rounded-xl border group transition-all duration-300 hover:shadow-lg h-full ${
                  card.accent === "primary"
                    ? "border-primary/20 hover:border-primary/40 bg-primary/[0.02]"
                    : "border-secondary/20 hover:border-secondary/40 bg-secondary/[0.02]"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  card.accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                }`}>
                  <card.icon className="size-7" />
                </div>

                <h3 className="text-2xl font-bold tracking-tight mb-1">{card.title}</h3>
                <p className={`text-sm font-medium mb-4 ${
                  card.accent === "primary" ? "text-primary" : "text-secondary"
                }`}>{card.subtitle}</p>

                <p className="text-muted-foreground leading-relaxed mb-6">{card.description}</p>

                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <span className="text-xs text-muted-foreground font-medium">{card.stats}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    card.accent === "primary"
                      ? "border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : "border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                  }`}>
                    <ArrowRight className="size-4" />
                  </div>
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
