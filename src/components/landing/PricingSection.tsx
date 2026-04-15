import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    subtitle: "Try before you commit",
    features: [
      "Module 1 of every course",
      "Community forum access",
      "5 job applications per month",
      "Basic skill assessments",
      "Profile creation",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    emoji: "🌱",
  },
  {
    name: "Learner",
    price: "$5",
    period: "/ month",
    localPrice: "~KES 650 / NGN 4,000",
    subtitle: "Full course access with guided pacing",
    features: [
      "Full access to all modules",
      "Weekly guided progression",
      "Verified certificate on completion",
      "Unlimited job applications",
      "Community group chat",
      "Resume review by mentors",
    ],
    buttonText: "Start Learning",
    buttonVariant: "default" as const,
    highlighted: true,
    badge: "Most Popular",
    emoji: "🚀",
  },
  {
    name: "Professional",
    price: "$15",
    period: "/ month",
    localPrice: "~KES 1,950 / NGN 12,000",
    subtitle: "For serious career changers",
    features: [
      "Everything in Learner, plus:",
      "1-on-1 mentorship sessions",
      "Priority study abroad support",
      "Exclusive networking events",
      "Portfolio review and feedback",
      "Early access to new courses",
    ],
    buttonText: "Go Professional",
    buttonVariant: "default" as const,
    emoji: "💎",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 overflow-hidden relative border-t border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Simple.{" "}
            <span className="text-muted-foreground">Transparent Pricing.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality education should be accessible. M-Pesa, card, and mobile money support included.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                tier.highlighted
                  ? "border-primary/50 bg-primary/5 shadow-lg scale-[1.02]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{tier.emoji}</span>
                  <p className="text-sm font-semibold text-muted-foreground">{tier.name}</p>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground text-sm pb-1">{tier.period}</span>
                </div>
                {tier.localPrice && (
                  <p className="text-xs text-primary mt-1.5 font-medium">{tier.localPrice}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">{tier.subtitle}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full py-5 text-sm font-semibold group"
                variant={tier.buttonVariant}
                asChild
              >
                <Link to="/auth" className="flex items-center justify-center gap-2">
                  {tier.buttonText}
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto"
        >
          All plans include a 7-day free trial. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
