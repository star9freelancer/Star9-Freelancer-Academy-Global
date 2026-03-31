import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Star9 Freelancer Academy",
    subtitle: "AI & Freelancing Courses",
    description: "Online short courses in AI for freelancers and essential freelancing skills. Learn how to scale your independent career.",
    icon: GraduationCap,
    link: "/academy",
    accent: "primary" as const,
  },
  {
    title: "Star9 Global",
    subtitle: "Remote Work & Study Abroad",
    description: "Connecting freelancers to remote jobs and providing access to academic study opportunities around the world.",
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
                className={`group block h-full rounded-[2rem] border bg-card p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden ${
                  card.accent === "primary" ? "hover:border-primary/50" : "hover:border-secondary/50"
                }`}
              >
                {/* Background ambient light */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  card.accent === "primary" ? "bg-primary" : "bg-secondary"
                }`} />

                <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-muted/50 ${
                  card.accent === "primary" ? "text-primary" : "text-secondary"
                }`}>
                  <card.icon className="size-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider mb-4 ${
                  card.accent === "primary" ? "text-primary" : "text-secondary"
                }`}>
                  {card.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">{card.description}</p>
                <div className={`inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-4 ${
                  card.accent === "primary" ? "text-primary bg-primary/10 px-4 py-2 rounded-full" : "text-secondary bg-secondary/10 px-4 py-2 rounded-full"
                }`}>
                  Explore Platform <ArrowRight className="size-5" />
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
