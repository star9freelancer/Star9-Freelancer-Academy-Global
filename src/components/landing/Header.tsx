import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X, LayoutDashboard } from "lucide-react";
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
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Academy", href: "/academy" },
    { label: "Global", href: "/global" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 z-50">
          <img src={logo} alt="Star9" className="h-10 md:h-12 w-auto object-contain shrink-0" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Button key={l.label} variant="ghost" size="sm" className="text-sm font-medium" asChild>
              {l.href.startsWith("#") ? (
                <a href={l.href}>{l.label}</a>
              ) : (
                <Link to={l.href}>{l.label}</Link>
              )}
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <div className="flex items-center gap-2 border-l border-border/50 pl-3">
            {user ? (
              <Button size="sm" className="gap-2" asChild>
                <Link to="/academy">
                  <LayoutDashboard className="size-3.5" />
                  My Academy
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border p-4 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href.startsWith("#") ? "/" : l.href}
              className="block px-4 py-2.5 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-muted-foreground">Dark Mode</span>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
          <div className="flex gap-2 pt-2">
            {user ? (
              <Button size="sm" className="flex-1" asChild>
                <Link to="/academy" onClick={() => setMobileOpen(false)}>My Academy</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>Log In</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
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
