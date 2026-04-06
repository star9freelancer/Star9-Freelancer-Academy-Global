import logo from "@/assets/logo_transparent.png";

export const AcademyFooter = () => {
  return (
    <footer className="w-full mt-auto pt-12 pb-8 border-t border-border/30 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Star9" className="h-6 w-auto opacity-60" />
          <span className="text-xs text-muted-foreground font-medium">Star9 Academy</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex gap-6 text-xs text-muted-foreground">
             <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
             <a href="#" className="hover:text-foreground transition-colors">Terms</a>
             <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
          <p className="text-xs text-muted-foreground/60">
             &copy; {new Date().getFullYear()} Star9 Freelancer Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};
