import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Remote Operations Manager",
    avatar: "S",
    text: "The structured curriculum and curated job listings helped me transition into a full-time remote role within six months.",
  },
  {
    name: "Kwame Osei",
    role: "Computer Science Student",
    avatar: "K",
    text: "Star9 Global gave me the guidance I needed to secure admission and manage the visa process for a European university.",
  },
  {
    name: "Elena Rodriguez",
    role: "Product Designer",
    avatar: "E",
    text: "Having courses, community support, and job applications all in one place made my career transition so much smoother.",
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative bg-muted/10">
      <div className="container max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What Our Members Say</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Real stories from members who've advanced their careers through Star9.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-background border border-border/50 rounded-xl p-8 relative hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground text-lg mb-8 font-medium leading-relaxed">"{test.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
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
