import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  X as XIcon,
  Home as HomeIcon,
  BookOpen as BookOpenIcon,
  Globe as GlobeIcon,
  Sparkles as SparklesIcon,
  ChevronDown as ChevronDownIcon,
  Users as UsersIcon,
  Link as LinkIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
  Briefcase as BriefcaseIcon,
  Award as AwardIcon,
  LogOut as LogOutIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/Star9_Logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { getStoredTheme, applyTheme } from "@/lib/theme";

interface HeaderProps {
  onLogout?: () => void;
}

const Header = ({ onLogout }: HeaderProps = {}) => {
  const [dark] = useState(() => getStoredTheme());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    applyTheme(dark);
  }, [dark]);

  const navLinks = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Academy", href: "/academy", icon: BookOpenIcon },
    { label: "Global", href: "/global", icon: GlobeIcon },
    { label: "Referrals", href: "/referrals", icon: UsersIcon },
    { label: "Contact", href: "/contact", icon: PhoneIcon },
  ];

  const moreLinks = [
    { label: "Support", href: "/support", icon: SparklesIcon },
    { label: "Careers", href: "/academy?tab=careers", icon: BriefcaseIcon },
    { label: "Social", href: "/academy?tab=community", icon: UsersIcon },
    { label: "Credentials", href: "/academy?tab=certificates", icon: AwardIcon },
    { label: "About", href: "/about", icon: InfoIcon },
    { label: "Terms", href: "/terms", icon: LinkIcon },
    { label: "Privacy", href: "/privacy", icon: LinkIcon },
  ];

  const mobileMoreLinks = [
    { label: "Referrals", href: "/referrals", icon: UsersIcon },
    { label: "Contact", href: "/contact", icon: PhoneIcon },
    { label: "Support", href: "/support", icon: SparklesIcon },
    { label: "Careers", href: "/academy?tab=careers", icon: BriefcaseIcon },
    { label: "Social", href: "/academy?tab=community", icon: UsersIcon },
    { label: "Credentials", href: "/academy?tab=certificates", icon: AwardIcon },
    { label: "About", href: "/about", icon: InfoIcon },
    { label: "Terms", href: "/terms", icon: LinkIcon },
    { label: "Privacy", href: "/privacy", icon: LinkIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2 md:p-5">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="flex items-center gap-2 md:gap-3 px-4 py-1 md:px-6 md:py-1.5 max-w-full transition-all duration-300 bg-white rounded-full shadow-lg border border-gray-100"
      >
        {/* Logo */}
        <Link to="/" className="p-1 rounded-full hover:opacity-80 transition-opacity shrink-0">
          <img src={logo} alt="Star9 Freelancer" className="h-28 sm:h-32 w-auto object-contain" />
        </Link>

        <div className="h-6 w-px bg-gray-200 mx-2 shrink-0 hidden md:block" />

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Button key={l.label} variant="ghost" size="sm" className="text-sm font-medium rounded-full gap-2 px-4 text-primary hover:text-primary hover:bg-primary/10 shrink-0" asChild>
              <Link to={l.href}>
                <l.icon className="size-4 opacity-70" />
                {l.label}
              </Link>
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all text-primary hover:bg-primary/10 outline-none shrink-0">
              More <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 rounded-2xl p-2 mt-2">
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild className="rounded-xl gap-2 p-3 cursor-pointer">
                  <Link to={link.href}>
                    <link.icon className="size-4" /> {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile More Button */}
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all text-primary hover:bg-primary/10 outline-none shrink-0">
              More <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 mt-2">
              {mobileMoreLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild className="rounded-xl gap-2 p-3 cursor-pointer">
                  <Link to={link.href}>
                    <link.icon className="size-4" /> {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Logout Button (Desktop & Mobile) */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
            aria-label="Logout"
            title="Logout"
          >
            <LogOutIcon className="size-5" />
          </button>
        )}

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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
            className="md:hidden fixed inset-0 z-[60] bg-background/98 backdrop-blur-none bg-background/100 md:bg-background/98 md:backdrop-blur-2xl flex flex-col p-8 pt-24"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border/50">
                <img src={logo} alt="Star9 Freelancer" className="h-28 w-auto object-contain" />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground/30 mb-8">Navigation Menu</p>
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={l.href}
                    className="flex items-center justify-between py-4 border-b border-border text-2xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                    <l.icon className="size-6 text-primary opacity-50" />
                  </Link>
                </motion.div>
              ))}

              <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground/30 mb-4 mt-8">More</p>
              {mobileMoreLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navLinks.length + i) * 0.1 }}
                >
                  <Link
                    to={l.href}
                    className="flex items-center justify-between py-3 border-b border-border text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                    <l.icon className="size-5 text-primary opacity-50" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              <p className="text-center text-[10px] font-mono text-white/20 uppercase tracking-widest pt-4">&copy; {new Date().getFullYear()} Star9 Freelancer</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
