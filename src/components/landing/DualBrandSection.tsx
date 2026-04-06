import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Star9 Academy",
    subtitle: "AI & Freelancing Courses",
    description: "Online short courses in AI for freelancers, freelancing essentials, and international teacher preparation. Learn to scale your independent career.",
    icon: GraduationCap,
    link: "/academy",
    accent: "primary" as const,
  },
  {
    title: "Star9 Global",
    subtitle: "Remote Work & Study Abroad",
    description: "Connecting freelancers to premium remote jobs and providing access to academic study opportunities around the world.",
    icon: Globe,
    link: "/global",
    accent: "secondary" as const,
  },
];

const DualBrandSection = () => {
  return (
    <section id="about" className="py-32 relative bg-background border-t border-border">
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/40" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Our Ecosystem</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Two Platforms. One Vision.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From acquiring cutting-edge skills to landing global opportunities, Star9 has you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-0 max-w-6xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              className={`md:px-12 group relative transition-all duration-700 hover:scale-[1.02] ${i === 0 ? "md:border-r border-border/40" : ""}`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-[80px] -z-10 ${
                card.accent === "primary" ? "bg-primary" : "bg-secondary"
              }`} />

              <Link to={card.link} className="block relative">
                <div className="mb-10 w-20 h-20 rounded-xl border border-border/50 flex items-center justify-center bg-card shadow-sm group-hover:border-transparent transition-colors duration-500 relative overflow-hidden">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                    card.accent === "primary" ? "bg-primary" : "bg-secondary"
                  }`} />
                  <card.icon className={`size-8 transition-transform duration-500 group-hover:scale-110 ${
                    card.accent === "primary" ? "text-primary" : "text-secondary"
                  }`} />
                </div>
                
                <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-foreground transition-colors">
                  {card.title}
                </h3>
                
                <p className={`text-sm font-semibold tracking-wide uppercase mb-6 flex items-center gap-3 ${
                  card.accent === "primary" ? "text-primary" : "text-secondary"
                }`}>
                  <span className="w-8 h-[1px] bg-current"></span>
                  {card.subtitle}
                </p>
                
                <p className="text-muted-foreground leading-relaxed text-lg mb-10 max-w-md">
                  {card.description}
                </p>
                
                <div className="flex items-center gap-4 border-t border-border/50 pt-8 mt-auto">
                  <span className="text-sm font-semibold">Learn More</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:w-14 ${
                    card.accent === "primary" ? "bg-primary/5 border-primary/20 text-primary group-hover:bg-primary group-hover:text-white" : "bg-secondary/5 border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-white"
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
