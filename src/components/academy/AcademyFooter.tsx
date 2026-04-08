import { Link } from "react-router-dom";
import logo from "@/assets/logo_transparent.png";

export const AcademyFooter = () => {
  return (
    <footer className="w-full mt-auto pt-10 pb-20 md:pb-8 border-t border-border px-6">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Star9" className="h-6 w-auto opacity-60" />
          <span className="text-xs text-muted-foreground font-medium">Star9 Academy</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Support</Link>
          </div>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Star9 Freelancer Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};
