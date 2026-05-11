import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-40 md:pt-44 pb-20 overflow-hidden bg-[#1a1a1a]">
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Large gradient orb - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          }}
        />

        {/* Medium gradient orb - bottom left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)",
          }}
        />

        {/* Floating hexagon - top left */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotate: 0 }}
          animate={{ opacity: 0.05, y: 0, rotate: 30 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute top-32 left-16 w-24 h-24"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
          }}
        />

        {/* Floating diamond - right side */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 0 }}
          animate={{ opacity: 0.04, x: 0, rotate: 45 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600"
        />

        {/* Small circle accent - top center */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-24 right-1/3 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"
        />

        {/* Thin line accent - middle */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.04, scaleX: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-1/2 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />

        {/* Pentagon - bottom right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: 0.04, scale: 1, rotate: 72 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute bottom-32 right-1/4 w-20 h-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
          }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block text-secondary"
          >
            Freelancing with
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
              }}
            >
              heart and skill.
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            We empower African youth and women with in-demand skills, remote work, study abroad, and work abroad opportunities — equipping you to earn globally and build sustainable careers beyond borders.
          </motion.span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button
            size="lg"
            className="h-12 px-8 font-semibold text-sm group bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 w-auto"
            asChild
          >
            <Link to="/academy" className="flex items-center gap-2">
              Academy
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 font-semibold text-sm border-gray-700 text-white hover:bg-gray-800 w-auto"
            asChild
          >
            <Link to="/global">Global</Link>
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-4 pt-8"
        >
          <div className="flex -space-x-2.5">
            {["A", "D", "G", "K", "M"].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center text-xs font-bold text-white"
                style={{
                  backgroundColor: `hsl(${213 + i * 28}, 60%, ${44 + i * 5}%)`,
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-0.5 text-cyan-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="size-3 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              2,500+ learners across Africa
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
