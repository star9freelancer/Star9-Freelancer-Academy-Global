import { Link } from "react-router-dom";
import { 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon, 
  Linkedin as LinkedinIcon, 
  Twitter as TwitterIcon,
  Music2 as TikTokIcon,
  MessageCircle as WhatsAppIcon
} from "lucide-react";
import logo from "@/assets/logo_transparent.png";

export const AcademyFooter = () => {
  return (
    <footer className="w-full mt-auto pt-10 pb-20 md:pb-8 border-t border-border px-6">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Star9" className="h-6 w-auto opacity-60" />
            <span className="text-xs text-muted-foreground font-medium">Star9 Academy</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://web.facebook.com/people/Star9-Freelancer/61572019842249/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <FacebookIcon className="size-4" />
            </a>
            <a href="https://www.instagram.com/star9freelancer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <InstagramIcon className="size-4" />
            </a>
            <a href="https://www.tiktok.com/@star9.freelancer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <TikTokIcon className="size-4" />
            </a>
            <a href="https://x.com/Star9Freelancer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <TwitterIcon className="size-4" />
            </a>
            <a href="https://www.linkedin.com/company/star9-freelancer/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Support</Link>
          </div>
          <a href="https://wa.me/254117103483" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-500 font-bold flex items-center gap-1.5 hover:text-emerald-400">
            <WhatsAppIcon className="size-3.5" /> WhatsApp Support
          </a>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Star9 Freelancer Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};
