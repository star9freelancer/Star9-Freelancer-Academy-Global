import { motion } from "framer-motion";

const partners = [
  { name: "M-Pesa", desc: "Mobile Money" },
  { name: "Visa", desc: "Card Payments" },
  { name: "PayPal", desc: "Global Transfers" },
  { name: "Wise", desc: "Low-Fee Transfers" },
];

const TrustSection = () => (
  <section className="py-14 border-y border-border bg-muted/20">
    <div className="container max-w-4xl">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium text-muted-foreground mb-8 uppercase tracking-widest"
      >
        Payment Partners
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl font-bold text-muted-foreground/40 select-none">{p.name}</p>
            <p className="text-[10px] text-muted-foreground/30 mt-1">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
