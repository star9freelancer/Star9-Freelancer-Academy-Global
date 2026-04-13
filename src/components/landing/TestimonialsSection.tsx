import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amina Okafor",
    role: "Freelance Content Writer, Lagos",
    avatar: "A",
    text: "The Freelancing Essentials course completely changed how I approach clients. I went from earning $500/month to $3,200/month within four months of completing the program.",
  },
  {
    name: "David Mutua",
    role: "AI-Assisted Developer, Nairobi",
    avatar: "D",
    text: "Star9 Academy taught me how to use AI tools effectively. The weekly pacing kept me accountable, and the quizzes ensured I actually learned, not just watched.",
  },
  {
    name: "Grace Mensah",
    role: "International Teacher, Accra to Texas",
    avatar: "G",
    text: "The Teacher Prep course was exactly what I needed. From interview practice to visa documentation, every module was practical and directly applicable.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative bg-muted/10 border-t border-border">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What Our Members Say</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Real stories from members who have advanced their careers through Star9.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-background border border-border/50 rounded-xl p-8 relative hover:border-primary/30 transition-colors group"
            >
              <Quote className="size-8 text-primary/10 absolute top-6 right-6" />

              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>

              <p className="text-foreground text-base mb-8 leading-relaxed">
                "{test.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="w-11 h-11 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                  {test.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{test.name}</h4>
                  <p className="text-xs text-muted-foreground">{test.role}</p>
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
