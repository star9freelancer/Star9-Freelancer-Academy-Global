import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("star9-dark-mode");
    if (stored !== null) return stored === "true";
    return document.documentElement.classList.contains("dark");
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("star9-dark-mode", String(dark));
  }, [dark]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Academy", href: "/academy" },
    { label: "Global", href: "/global" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-18">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Star9 Freelancer" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Button key={l.label} variant="ghost-nav" size="sm" asChild>
              {l.href.startsWith("#") ? (
                <a href={l.href}>{l.label}</a>
              ) : (
                <Link to={l.href}>{l.label}</Link>
              )}
            </Button>
          ))}
          <Button variant="ghost-nav" size="sm" asChild>
            <a href="#foundation" className="flex items-center gap-1">
              Star9 Foundation <ExternalLink className="!size-3" />
            </a>
          </Button>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Button variant="ghost-nav" size="sm" asChild>
            <Link to="/academy">Log In</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/academy">Get Started</Link>
          </Button>
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
            <Button variant="ghost-nav" size="sm" className="flex-1" asChild>
              <Link to="/academy">Log In</Link>
            </Button>
            <Button variant="hero" size="sm" className="flex-1" asChild>
              <Link to="/academy">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
