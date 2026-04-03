import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Moon, Sun, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";
import { supabase } from "@/lib/supabase";

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

    // Auth check
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
    { label: "Ecosystem", href: "#about" },
    { label: "Capabilities", href: "#features" },
    { label: "Academy", href: "/academy" },
    { label: "Global", href: "/global" },
    { label: "Admin Portal", href: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 z-50">
          <img src={logo} alt="Star9" className="h-10 md:h-[48px] w-auto object-contain shrink-0" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <Button key={l.label} variant="ghost-nav" size="sm" className="font-mono uppercase tracking-widest text-[11px]" asChild>
              {l.href.startsWith("#") ? (
                <a href={l.href}>{l.label}</a>
              ) : (
                <Link to={l.href}>{l.label}</Link>
              )}
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <div className="flex items-center gap-2 border-l border-border/50 pl-4">
            {user ? (
              <Button variant="default" size="sm" className="font-mono uppercase tracking-widest text-[11px] rounded-none gap-2" asChild>
                <Link to="/academy">
                  <LayoutDashboard className="size-3" />
                  My Academy
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="font-mono uppercase tracking-widest text-[11px]" asChild>
                  <Link to="/auth">Portal Login</Link>
                </Button>
                <Button variant="default" size="sm" className="font-mono uppercase tracking-widest text-[11px] rounded-none" asChild>
                  <Link to="/auth">Initialize</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t p-4 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href.startsWith("#") ? "/" : l.href}
              className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-muted-foreground">Dark Mode</span>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
          <div className="flex gap-2 pt-2">
            {user ? (
              <Button variant="hero" size="sm" className="flex-1" asChild>
                <Link to="/academy" onClick={() => setMobileOpen(false)}>My Academy</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost-nav" size="sm" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>Log In</Link>
                </Button>
                <Button variant="hero" size="sm" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>Get Started</Link>
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
