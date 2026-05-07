import { Link } from "react-router-dom";
import { 
  Music2 as TikTokIcon,
  MessageCircle as WhatsAppIcon
} from "lucide-react";
import logo from "@/assets/logo_highres.jpg";

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
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export const AcademyFooter = () => {
  return (
    <footer className="w-full mt-auto pt-10 pb-20 md:pb-8 border-t border-border px-6">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Star9" className="h-16 w-auto opacity-80 object-contain" />
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
