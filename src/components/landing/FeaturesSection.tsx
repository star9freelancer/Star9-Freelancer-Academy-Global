import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu,
  Briefcase,
  GraduationCap,
  Globe,
  Laptop,
  HandshakeIcon,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    Icon: Cpu,
    title: "AI for Freelancers",
    description:
      "8-week intensive programme. Learn to leverage AI tools to multiply your output and win global clients. One-time fee of $50.",
  },
  {
    Icon: Briefcase,
    title: "Mastering Freelancing",
    description:
      "12-week complete pipeline for building a thriving global freelance business. Includes lifetime access to the Global Job Board. $100 one-time.",
  },
  {
    Icon: GraduationCap,
    title: "International Teacher Prep & Placement",
    description:
      "3-phase pipeline: vetting and resume review, Loom audition and interviews, then visa and relocation support. $1,500 one-time.",
  },
  {
    Icon: Globe,
    title: "Work Abroad Portal",
    description:
      "Curated placements across the US, UK, Canada, China, Germany and more. Each listing is manually reviewed before publication.",
  },
  {
    Icon: Laptop,
    title: "Remote Work Board",
    description:
      "Diverse remote categories covering writing, design, development, virtual assistance, online tutoring, sales, data, and AI consulting.",
  },
  {
    Icon: HandshakeIcon,
    title: "Referral Programme",
    description:
      "Earn commissions by referring students. $10 per AI course, $15 per Mastering Freelancing, and $40 per Teacher Prep enrolment.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 bg-card relative overflow-hidden border-t border-border"
    >
      <div className="container relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold"
          >
            Why Star9
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Everything You Need{" "}
            <span className="text-muted-foreground">In One Place</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete ecosystem for African talent — from foundational training to global placement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-card"
            >
              <Link
                to="/auth"
                className="group relative block h-full p-8 hover:bg-accent/40 transition-colors duration-300"
              >
                <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <f.Icon className="size-5 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="size-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
