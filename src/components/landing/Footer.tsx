import { Link } from "react-router-dom";
import logo from "@/assets/logo_transparent.png";

const Footer = () => (
  <footer className="relative border-t border-white/8 py-14 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Star9" className="h-7 w-auto opacity-70" />
        <span className="text-xs text-white/25 tracking-wide">Freelancing with heart and skill.</span>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/25">
        <Link to="/about" className="hover:text-amber-400/70 transition-colors duration-300">About</Link>
        <Link to="/academy" className="hover:text-amber-400/70 transition-colors duration-300">Academy</Link>
        <Link to="/global" className="hover:text-amber-400/70 transition-colors duration-300">Global</Link>
        <Link to="/contact" className="hover:text-amber-400/70 transition-colors duration-300">Contact</Link>
        <Link to="/terms" className="hover:text-amber-400/70 transition-colors duration-300">Terms</Link>
        <Link to="/privacy" className="hover:text-amber-400/70 transition-colors duration-300">Privacy</Link>
      </nav>

      <p className="text-[11px] text-white/15 tracking-wider">
        &copy; {new Date().getFullYear()} Star9 Freelancer Ltd.
      </p>
    </div>
  </footer>
);

export default Footer;
