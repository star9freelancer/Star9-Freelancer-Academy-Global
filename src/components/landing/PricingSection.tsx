import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Cpu,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "AI for Freelancers",
    price: "$50",
    period: "one-time",
    subtitle: "Master AI tools and land your first global client.",
    referral: "Earn $10 per referral",
    features: [
      "8-week structured programme",
      "AI productivity and automation tools",
      "Prompt engineering fundamentals",
      "Weekly quizzes and projects",
      "Verified completion certificate",
      "Community group access",
    ],
    buttonText: "Enroll Now",
    buttonVariant: "outline" as const,
    Icon: Cpu,
  },
  {
    name: "Mastering Freelancing",
    price: "$100",
    period: "one-time",
    subtitle: "The complete pipeline from zero to global freelance income.",
    referral: "Earn $15 per referral",
    features: [
      "12-week intensive programme",
      "Everything in AI for Freelancers",
      "Lifetime Global Job Board access",
      "1-on-1 mentorship and portfolio review",
      "Direct employer introductions",
      "Verified completion certificate",
    ],
    buttonText: "Enroll Now",
    buttonVariant: "default" as const,
    highlighted: true,
    badge: "Best Value",
    Icon: Briefcase,
  },
  {
    name: "International Teacher Prep",
    price: "$1,500",
    period: "one-time",
    subtitle: "3-phase pipeline to a US or EU teaching placement.",
    referral: "Earn $40 per referral",
    features: [
      "Phase 1 — Vetting and resume review",
      "Phase 2 — Loom audition and interview coaching",
      "Phase 3 — Visa and relocation support",
      "Priority school placement (US / EU)",
      "Ongoing post-placement check-ins",
      "Verified programme certificate",
    ],
    buttonText: "Apply Now",
    buttonVariant: "outline" as const,
    Icon: GraduationCap,
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-24 overflow-hidden relative border-t border-border"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Simple,{" "}
            <span className="text-muted-foreground">transparent pricing.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pay once. Gain skills and access that pay for themselves. Paystack accepted in all currencies.
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide uppercase">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`size-10 rounded-lg flex items-center justify-center border ${
                      tier.highlighted
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    <tier.Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {tier.name}
                  </p>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm pb-1">
                    {tier.period}
                  </span>
                </div>
                <p className="text-xs text-secondary font-medium mt-1">
                  {tier.referral}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {tier.subtitle}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check
                      className="size-4 text-primary shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full py-5 text-sm font-semibold group"
                variant={tier.buttonVariant}
                asChild
              >
                <Link
                  to="/auth"
                  className="flex items-center justify-center gap-2"
                >
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
          5% commission applies on remote earnings. Flat $1,000 fee for
          contracts exceeding $10k over 6 months. Employers are never charged.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
