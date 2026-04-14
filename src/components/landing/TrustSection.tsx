import { motion } from "framer-motion";

const partners = [
  { name: "M-Pesa", emoji: "📱" },
  { name: "Visa", emoji: "💳" },
  { name: "PayPal", emoji: "🌐" },
  { name: "Wise", emoji: "💸" },
  { name: "Mastercard", emoji: "💳" },
];

const TrustSection = () => (
  <section className="py-12 border-y border-border bg-muted/20">
    <div className="container max-w-4xl">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium text-muted-foreground mb-6 uppercase tracking-widest"
      >
        Trusted Payment Partners
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50"
          >
            <span className="text-base">{p.emoji}</span>
            <span className="text-sm font-semibold text-muted-foreground">{p.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
