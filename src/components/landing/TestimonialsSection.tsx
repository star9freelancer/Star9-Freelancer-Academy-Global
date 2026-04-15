import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amina Okafor",
    role: "Freelance AI Consultant, Lagos",
    text: "The AI for Freelancers course completely changed how I work. I automated half my workflow and went from $500/month to $3,200/month in four months.",
    avatar: "🇳🇬",
    highlight: "$3,200/month",
  },
  {
    name: "David Mutua",
    role: "Remote Data Analyst, Nairobi",
    text: "Mastering Freelancing gave me a complete system. The Global Job Board bonus alone paid for the course fee — I landed a $2,800/month contract within weeks.",
    avatar: "🇰🇪",
    highlight: "$2,800/month contract",
  },
  {
    name: "Grace Mensah",
    role: "ESL Teacher, Accra to Texas",
    text: "The 3-phase Teacher Prep pipeline was exactly what I needed. From my Loom audition to visa documentation, every step was guided and practical.",
    avatar: "🇬🇭",
    highlight: "Accra to Texas",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative bg-background border-t border-border">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Our Members</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            What Our Members Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-5 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>

              <p className="text-foreground text-[15px] leading-relaxed mb-8">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
