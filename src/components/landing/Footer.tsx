import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";

const Footer = () => (
  <footer className="border-t py-16 bg-card">
    <div className="container grid md:grid-cols-4 gap-12">
      <div className="space-y-4 md:col-span-1">
        <img src={logo} alt="Star9" className="h-10 w-auto" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Freelancing with heart and skill. Empowering African freelancers with skills, technology, and global opportunities.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Platform</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <Link to="/academy" className="hover:text-primary transition-colors">Academy</Link>
          <Link to="/global" className="hover:text-secondary transition-colors">Global</Link>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Company</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">About Us</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Stay Updated</h4>
        <p className="text-sm text-muted-foreground">Get the latest courses and job openings.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:border-primary transition-colors"
          />
          <Button size="sm" className="text-sm h-auto">Subscribe</Button>
        </div>
      </div>
    </div>

    <div className="container mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
      &copy; {new Date().getFullYear()} Star9 Freelancer Ltd. All rights reserved.
    </div>
  </footer>
);

export default Footer;
