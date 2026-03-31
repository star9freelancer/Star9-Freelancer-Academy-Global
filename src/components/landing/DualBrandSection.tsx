import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Star9 Freelancer Academy",
    subtitle: "Master AI Tools & Freelance Skills",
    description: "World-class courses in AI, digital skills, and freelance business building. Learn from industry experts and earn recognized certificates.",
    icon: GraduationCap,
    link: "/academy",
    accent: "primary" as const,
  },
  {
    title: "Star9 Global",
    subtitle: "Remote Jobs & Study Abroad Programs",
    description: "Access premium remote work opportunities and international academic programs. Build your career without borders.",
    icon: Globe,
    link: "/global",
    accent: "secondary" as const,
  },
];

const DualBrandSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Ecosystems, One Vision</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're building skills or building your career, Star9 has you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                className="group block h-full rounded-2xl border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                  card.accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                }`}>
                  <card.icon className="size-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className={`text-sm font-semibold mb-3 ${
                  card.accent === "primary" ? "text-primary" : "text-secondary"
                }`}>
                  {card.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">{card.description}</p>
                <span className={`inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1 ${
                  card.accent === "primary" ? "text-primary" : "text-secondary"
                }`}>
                  Explore <ArrowRight className="size-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualBrandSection;
