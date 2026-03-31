import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Copywriter",
    avatar: "S",
    text: "Star9 changed my life. Between the prompt engineering course and the community gigs, my monthly income tripled within 6 months. Best investment ever.",
  },
  {
    name: "Kwame Osei",
    role: "Data Science Student",
    avatar: "K",
    text: "The global study platform helped me find a fully-funded master's degree in Germany. The vetting process made me feel secure through every step.",
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Designer",
    avatar: "E",
    text: "I love the unified platform. Watching courses on one tab and applying for remote design roles on the other is a seamless workflow. Highly recommended!",
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Loved by talent globally</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Don't just take our word for it. Here is what our community members are saying about their journey.
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
