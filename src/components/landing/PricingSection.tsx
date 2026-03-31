import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "$0",
    description: "forever",
    subtitle: "Everything you need to get started",
    features: [
      "Access to community forums",
      "5 job applications / month",
      "Basic skill assessments",
      "Profile creation",
      "Weekly newsletter",
      "No credit card required"
    ],
    buttonText: "START FREE — NO CARD NEEDED",
  },
  {
    name: "$5",
    description: "/ month",
    subtitle: "For power users who want no limits",
    features: [
      "Unlimited job applications",
      "Premium course access",
      "1-on-1 mentorship sessions",
      "Priority study abroad",
      "Resume feedback from experts",
      "Exclusive networking events"
    ],
    buttonText: "UPGRADE TO PRO",
    highlighted: true,
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 overflow-hidden relative border-t border-border">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-10 md:p-14 ${i === 0 ? "border-b md:border-b-0 md:border-r border-border" : ""} bg-background`}
            >
              <div className="flex items-end gap-2 mb-2">
                <h3 className="text-5xl font-bold tracking-tight text-foreground">{tier.name}</h3>
                <span className="text-muted-foreground font-mono text-sm pb-1">{tier.description}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-10">{tier.subtitle}</p>
              
              <ul className="space-y-4 mb-12">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-6 font-mono font-bold tracking-widest text-xs uppercase rounded-md ${
                  tier.highlighted 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground border-none" 
                    : "bg-transparent border border-border text-foreground hover:bg-muted"
                }`}
                variant={tier.highlighted ? "default" : "outline"}
              >
                {tier.buttonText} →
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Payment Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-border/50 text-center"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6">Trusted Global Payment Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Generic shapes as placeholders for partner logos */}
            <div className="flex items-center gap-2 font-bold font-sans text-xl"><div className="w-6 h-6 rounded-full bg-foreground" /> Stripe</div>
            <div className="flex items-center gap-2 font-bold font-sans text-xl"><div className="w-6 h-6 rotate-45 bg-foreground" /> PayPal</div>
            <div className="flex items-center gap-2 font-bold font-sans text-xl"><div className="w-6 h-6 rounded bg-foreground" /> Visa</div>
            <div className="flex items-center gap-2 font-bold font-sans text-xl"><div className="w-8 h-5 rounded-sm border-2 border-foreground" /> Mastercard</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
