import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "2,500+", label: "Active Learners" },
  { value: "30+", label: "Countries Reached" },
  { value: "92%", label: "Completion Rate" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* Accent blobs */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] -z-0" />

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <MapPin className="size-3.5" />
            Empowering African Talent Worldwide
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground"
          >
            Freelancing with{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                heart
              </span>
            </span>{" "}
            and{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary/70">
                skill.
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-3 bg-secondary/15 -z-10 rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Master in-demand skills at our Academy, land premium remote jobs worldwide, 
            or explore international study programs. Your global career starts here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button size="lg" className="h-14 px-10 font-semibold text-sm group w-full sm:w-auto" asChild>
              <Link to="/auth" className="gap-3 flex items-center justify-center">
                Get Started Free
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 font-semibold text-sm group w-full sm:w-auto" asChild>
              <Link to="/academy" className="gap-3 flex items-center justify-center">
                Browse Courses
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 ${i < stats.length - 1 ? "border-r border-border" : ""}`}
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: GraduationCap, title: "Star9 Academy", desc: "Professional courses in AI, freelancing, and education", accent: "primary" },
            { icon: Briefcase, title: "Star9 Global", desc: "Remote jobs and international study programs", accent: "secondary" },
            { icon: MapPin, title: "Star9 Foundation", desc: "Social impact and community empowerment", accent: "primary" },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="group p-6 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                card.accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
              }`}>
                <card.icon className="size-5" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
