import { Link } from "react-router-dom";
import { 
  MessageCircle as WhatsAppIcon,
  Music2 as TikTokIcon
} from "lucide-react";
import logo from "@/assets/logo_highres_transparent.png";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const Footer = () => (
  <footer className="border-t border-border py-12 bg-card">
    <div className="container max-w-6xl mx-auto px-6 space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Star9" className="h-20 w-auto object-contain" />
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
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Page</Link>
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
