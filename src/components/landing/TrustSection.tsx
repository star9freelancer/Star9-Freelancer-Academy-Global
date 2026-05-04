import { motion } from "framer-motion";

const partners = [
  "M-Pesa",
  "Visa",
  "PayPal",
  "Wise",
  "Mastercard",
  "Paystack",
  "Flutterwave",
];

const TrustSection = () => (
  <section className="py-12 border-y border-border bg-muted/20">
    <div className="container max-w-5xl">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium text-muted-foreground mb-8 uppercase tracking-[0.2em]"
      >
        Trusted Payment Partners
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
        {partners.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="text-base md:text-lg font-semibold text-muted-foreground/70 tracking-tight"
          >
            {p}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
