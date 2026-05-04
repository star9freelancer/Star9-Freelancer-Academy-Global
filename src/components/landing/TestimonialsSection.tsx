import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amina Okafor",
    role: "Freelance AI Consultant · Lagos, Nigeria",
    initials: "AO",
    text: "The AI for Freelancers course completely changed how I work. I automated half my workflow and went from $500 a month to $3,200 a month in four months.",
  },
  {
    name: "David Mutua",
    role: "Remote Data Analyst · Nairobi, Kenya",
    initials: "DM",
    text: "Mastering Freelancing gave me a complete system. The Global Job Board bonus alone paid for the course fee — I landed a $2,800 a month contract within weeks.",
  },
  {
    name: "Grace Mensah",
    role: "ESL Teacher · Accra, Ghana → Texas, USA",
    initials: "GM",
    text: "The 3-phase International Teacher Preparation pipeline was exactly what I needed. From the Loom audition to visa documentation, every step was guided and practical.",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="py-24 overflow-hidden relative bg-background border-t border-border"
    >
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Our Members
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            What our members say
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
              className="bg-card border border-border/60 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
            >
              <Quote className="size-6 text-primary/30 mb-5" strokeWidth={2} />

              <p className="text-foreground text-[15px] leading-relaxed mb-8">
                {t.text}
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    {t.name}
                  </h4>
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
