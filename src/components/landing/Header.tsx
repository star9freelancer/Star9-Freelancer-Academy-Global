import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Moon as MoonIcon, 
  Sun as SunIcon, 
  Menu as MenuIcon, 
  X as XIcon, 
  LayoutDashboard as LayoutDashboardIcon, 
  Home as HomeIcon, 
  BookOpen as BookOpenIcon, 
  Globe as GlobeIcon, 
  Users as UsersIcon, 
  Sparkles as SparklesIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("star9-dark-mode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("star9-dark-mode", String(dark));
  }, [dark]);

  const navLinks = [
    { label: "Freelancer", href: "/", icon: UsersIcon },
    { label: "Academy", href: "/academy", icon: BookOpenIcon },
    { label: "Global", href: "/global", icon: GlobeIcon },
    { label: "Support", href: "/contact", icon: SparklesIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-5">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-full backdrop-blur-xl border shadow-lg max-w-full transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/80 border-white/10"
            : "bg-zinc-950/40 border-white/5"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors shrink-0">
          <img src={logo} alt="Star9" className="h-7 w-auto" />
        </Link>

        <div className="h-6 w-px bg-white/10 mx-1 shrink-0 hidden md:block" />

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Button key={l.label} variant="ghost" size="sm" className="text-sm font-medium rounded-full gap-2 px-4 text-white/70 hover:text-white hover:bg-white/5 shrink-0" asChild>
              <Link to={l.href}>
                <l.icon className="size-4 opacity-50" />
                {l.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="h-6 w-px bg-white/10 mx-1 shrink-0 hidden md:block" />

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Button size="sm" className="gap-2 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 brightness-110" asChild>
              <Link to="/academy">
                <LayoutDashboardIcon className="size-3.5" />
                Intelligence Hub
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="rounded-full text-white/50 hover:text-white" asChild>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button size="sm" className="rounded-full bg-white text-black hover:bg-zinc-200" asChild>
                <Link to="/auth">Start Now</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button 
          className="md:hidden p-2 rounded-full bg-white/5 text-white" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </motion.nav>

      {/* Premium Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[60] bg-zinc-950/98 backdrop-blur-2xl flex flex-col p-8 pt-24"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-8">Navigation Menu</p>
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={l.href}
                    className="flex items-center justify-between py-4 border-b border-white/5 text-2xl font-bold tracking-tighter text-white/90 hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                    <l.icon className="size-6 text-primary opacity-50" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-4">
               {user ? (
                 <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-primary text-white" asChild onClick={() => setMobileOpen(false)}>
                   <Link to="/academy">Go to Dashboard</Link>
                 </Button>
               ) : (
                 <div className="grid grid-cols-2 gap-4">
                   <Button variant="outline" className="h-14 rounded-2xl border-white/10 text-white" asChild onClick={() => setMobileOpen(false)}>
                     <Link to="/auth">Log In</Link>
                   </Button>
                   <Button className="h-14 rounded-2xl bg-white text-black font-bold" asChild onClick={() => setMobileOpen(false)}>
                     <Link to="/auth">Join Now</Link>
                   </Button>
                 </div>
               )}
               <p className="text-center text-[10px] font-mono text-white/20 uppercase tracking-widest pt-4">&copy; {new Date().getFullYear()} Star9 Academy Global</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
