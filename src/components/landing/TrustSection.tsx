import { motion } from "framer-motion";

const partners = ["Visa", "PayPal", "Wise", "M-Pesa"];

const TrustSection = () => (
  <section className="py-16 border-y bg-muted/30">
    <div className="container">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest"
      >
        Trusted Global Payment Partners
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {partners.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-2xl md:text-3xl font-bold text-muted-foreground/40 select-none"
          >
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
