import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Operations Manager",
    avatar: "S",
    text: "The structured curriculum and access to curated opportunities allowed me to transition into a full-time remote role within six months.",
  },
  {
    name: "Kwame Osei",
    role: "Computer Science Scholar",
    avatar: "K",
    text: "The platform's global resources provided invaluable guidance in securing my admission and managing the visa process for a top-tier European university.",
  },
  {
    name: "Elena Rodriguez",
    role: "Senior Product Designer",
    avatar: "E",
    text: "Having educational resources, active community feedback, and direct job applications consolidated into a single unified workspace significantly streamlined my career transition.",
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Trusted by Professionals</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Our members successfully leverage Star9 to advance their careers and academic pursuits on a global scale.
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
              className="bg-card glass border p-8 rounded-3xl relative"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground text-lg italic mb-8 relative z-10">"{test.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg">
                  {test.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{test.name}</h4>
                  <p className="text-sm text-muted-foreground">{test.role}</p>
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
