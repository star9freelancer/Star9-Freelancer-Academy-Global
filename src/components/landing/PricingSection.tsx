import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for beginners exploring opportunities.",
    features: [
      "Access to community forum",
      "View global jobs & programs",
      "Basic AI templates",
      "1 free course module per month"
    ],
    buttonText: "Get Started Free",
    popular: false
  },
  {
    name: "Pro Freelancer",
    price: "$29",
    period: "/month",
    description: "Everything you need to scale your income.",
    features: [
      "All Academy courses unlocked",
      "Official Certificates",
      "Apply to premium remote jobs",
      "Direct client messaging",
      "Resume & Portfolio reviews"
    ],
    buttonText: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Global Scholar",
    price: "$49",
    period: "/month",
    description: "For serious students seeking abroad programs.",
    features: [
      "Everything in Pro",
      "1-on-1 Visa consulting",
      "University application assistance",
      "Accommodation search support",
      "Priority listing in talent pool"
    ],
    buttonText: "Become a Scholar",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Invest in your trajectory</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your career or educational goals. Transparent pricing, no hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-card rounded-3xl border p-8 flex flex-col ${
                tier.popular ? "shadow-xl border-primary scale-105 z-10" : "shadow-sm"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{tier.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <Check className="size-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={tier.popular ? "default" : "outline"} 
                className={`w-full ${tier.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                size="lg"
              >
                {tier.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
