import { Link } from "react-router-dom";
import { 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon, 
  Twitter as TwitterIcon, 
  Linkedin as LinkedinIcon, 
  MessageCircle as WhatsAppIcon,
  Music2 as TikTokIcon
} from "lucide-react";
import logo from "@/assets/logo_transparent.png";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-card">
    <div className="container max-w-6xl mx-auto px-6 space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Star9" className="h-8 w-auto" />
            <span className="text-xl font-bold tracking-tighter">STAR9</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
            Global freelancer network and academy. Bridging the gap between talent and opportunity.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground/50">Follow Our Journey</p>
          <div className="flex items-center gap-4">
            <a href="https://web.facebook.com/people/Star9-Freelancer/61572019842249/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300">
              <FacebookIcon className="size-5" />
            </a>
            <a href="https://www.instagram.com/star9freelancer" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300">
              <InstagramIcon className="size-5" />
            </a>
            <a href="https://www.tiktok.com/@star9.freelancer" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300">
              <TikTokIcon className="size-5" />
            </a>
            <a href="https://x.com/Star9Freelancer" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300">
              <TwitterIcon className="size-5" />
            </a>
            <a href="https://www.linkedin.com/company/star9-freelancer/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300">
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="h-px bg-border/50 w-full" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          <Link to="/about"   className="hover:text-primary transition-colors">About</Link>
          <Link to="/academy" className="hover:text-primary transition-colors">Academy</Link>
          <Link to="/global"  className="hover:text-primary transition-colors">Global</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Support</Link>
          <a href="https://wa.me/254117103483" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold transition-colors">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </nav>

        <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Star9 Freelancer Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
