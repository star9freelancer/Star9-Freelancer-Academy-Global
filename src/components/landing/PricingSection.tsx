import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "$0",
    description: "forever",
    subtitle: "Everything you need to get started",
    features: [
      "Access to community forums",
      "5 job applications per month",
      "Basic skill assessments",
      "Profile creation",
      "Weekly newsletter",
      "No credit card required"
    ],
    buttonText: "Get Started Free",
  },
  {
    name: "$5",
    description: "/ month",
    subtitle: "For members who want no limits",
    features: [
      "Unlimited job applications",
      "Premium course access",
      "1-on-1 mentorship sessions",
      "Priority study abroad support",
      "Resume review by experts",
      "Exclusive networking events"
    ],
    buttonText: "Upgrade to Pro",
    highlighted: true,
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 overflow-hidden relative border-t border-border">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Start free. Upgrade when you're ready.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-10 rounded-xl border ${tier.highlighted ? 'border-primary/50 bg-primary/5 shadow-lg' : 'border-border bg-background'}`}
            >
              <div className="flex items-end gap-2 mb-2">
                <h3 className="text-5xl font-bold tracking-tight text-foreground">{tier.name}</h3>
                <span className="text-muted-foreground text-sm pb-1">{tier.description}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-10">{tier.subtitle}</p>
              
              <ul className="space-y-4 mb-12">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full py-6 text-sm font-semibold"
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link to="/auth">{tier.buttonText}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
