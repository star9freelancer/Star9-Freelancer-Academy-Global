import { Link } from "react-router-dom";
import logo from "@/assets/logo_transparent.png";

const Footer = () => (
  <footer className="border-t border-border py-10 bg-card">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto px-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Star9" className="h-8 w-auto" />
        <span className="text-sm text-muted-foreground">Freelancing with heart and skill.</span>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <Link to="/about"   className="hover:text-primary transition-colors">About</Link>
        <Link to="/academy" className="hover:text-primary transition-colors">Academy</Link>
        <Link to="/global"  className="hover:text-primary transition-colors">Global</Link>
        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        <Link to="/terms"   className="hover:text-primary transition-colors">Terms</Link>
        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
      </nav>

      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Star9 Freelancer Ltd.
      </p>
    </div>
  </footer>
);

export default Footer;
