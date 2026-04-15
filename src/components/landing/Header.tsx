import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X, LayoutDashboard, Home, BookOpen, Globe, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

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
    { label: "Freelancer", href: "/", icon: Users },
    { label: "Academy", href: "/academy", icon: BookOpen },
    { label: "Global", href: "/global", icon: Globe },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-5">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 rounded-full backdrop-blur-xl border shadow-lg max-w-full transition-all duration-300 ${
          scrolled 
            ? "bg-card/80 border-border" 
            : "bg-card/60 border-border/50"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
          <img src={logo} alt="Star9" className="h-7 w-auto" />
        </Link>

        <div className="h-6 w-px bg-border mx-1 shrink-0 hidden md:block" />

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Button key={l.label} variant="ghost" size="sm" className="text-sm font-medium rounded-full gap-2 px-4" asChild>
              {l.href.startsWith("#") ? (
                <a href={l.href}>
                  <l.icon className="size-4" />
                  {l.label}
                </a>
              ) : (
                <Link to={l.href}>
                  <l.icon className="size-4" />
                  {l.label}
                </Link>
              )}
            </Button>
          ))}
        </div>

        <div className="h-6 w-px bg-border mx-1 shrink-0 hidden md:block" />

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          {user ? (
            <Button size="sm" className="gap-2 rounded-full" asChild>
              <Link to="/academy">
                <LayoutDashboard className="size-3.5" />
                My Academy
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="rounded-full" asChild>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button size="sm" className="rounded-full" asChild>
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-full hover:bg-muted" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-4 space-y-2 shadow-xl z-50">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href.startsWith("#") ? "/" : l.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              <l.icon className="size-4 text-muted-foreground" />
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-muted-foreground">Dark Mode</span>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
          <div className="flex gap-2 pt-2">
            {user ? (
              <Button size="sm" className="flex-1 rounded-full" asChild>
                <Link to="/academy" onClick={() => setMobileOpen(false)}>My Academy</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="flex-1 rounded-full" asChild>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>Log In</Link>
                </Button>
                <Button size="sm" className="flex-1 rounded-full" asChild>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
