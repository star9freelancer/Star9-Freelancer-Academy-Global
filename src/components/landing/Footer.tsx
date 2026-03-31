import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_transparent.png";
import { MonitorPlay } from "lucide-react";

const Footer = () => (
  <footer className="border-t py-16 bg-card">
    <div className="container grid md:grid-cols-4 gap-12">
      <div className="space-y-4 md:col-span-1">
        <img src={logo} alt="Star9" className="h-[46px] w-auto" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Freelancing with heart and skill. Empowering global talent since 2024.
        </p>
        <div className="flex gap-4 pt-2">
          <a href="#" className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition-colors group">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X" className="size-4 opacity-50 dark:invert group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-all" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition-colors group">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" className="size-4 opacity-50 dark:invert group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-all" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition-colors group">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" alt="GitHub" className="size-4 opacity-50 dark:invert group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-all" />
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-mono text-xs font-bold uppercase tracking-widest">Platform</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <Link to="/academy" className="hover:text-primary transition-colors flex items-center gap-2"><MonitorPlay className="size-3" /> Academy</Link>
          <Link to="/global" className="hover:text-secondary transition-colors flex items-center gap-2"><MonitorPlay className="size-3" /> Global</Link>
          <a href="#foundation" className="hover:text-foreground transition-colors flex items-center gap-2"><MonitorPlay className="size-3" /> Foundation</a>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-mono text-xs font-bold uppercase tracking-widest">Legal</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-mono text-xs font-bold uppercase tracking-widest">Stay Updated</h4>
        <p className="text-sm text-muted-foreground">Get the latest opportunities and courses.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="[ YOUR@EMAIL.COM ]"
            className="flex-1 px-4 py-2 text-xs font-mono tracking-widest rounded-none border border-border bg-background focus:outline-none focus:border-primary transition-colors placeholder:opacity-50"
          />
          <Button size="sm" className="rounded-none font-mono tracking-widest text-xs uppercase h-auto">Subscribe</Button>
        </div>
      </div>
    </div>

    <div className="container mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Star9 Freelancer Ltd. All rights reserved.
    </div>
  </footer>
);

export default Footer;
