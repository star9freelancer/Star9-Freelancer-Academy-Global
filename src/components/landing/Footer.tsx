import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="border-t py-16 bg-card">
    <div className="container grid md:grid-cols-4 gap-10">
      <div className="space-y-4 md:col-span-1">
        <img src={logo} alt="Star9 Freelancer" className="h-10 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Freelancing with heart and skill. Empowering global talent since 2024.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Platform</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/academy" className="hover:text-foreground transition-colors">Academy</Link>
          <Link to="/global" className="hover:text-foreground transition-colors">Global</Link>
          <a href="#foundation" className="hover:text-foreground transition-colors">Foundation</a>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Legal</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Stay Updated</h4>
        <p className="text-sm text-muted-foreground">Get the latest opportunities and courses.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button size="sm">Subscribe</Button>
        </div>
      </div>
    </div>

    <div className="container mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Star9 Freelancer Ltd. All rights reserved.
    </div>
  </footer>
);

export default Footer;
