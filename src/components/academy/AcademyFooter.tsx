import React from "react";
import { Shield, Activity, Globe, Zap } from "lucide-react";

export const AcademyFooter = () => {
  return (
    <footer className="w-full mt-auto py-12 border-t border-white/5 bg-zinc-950/30 backdrop-blur-sm px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Shield className="size-4 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/80 font-bold">Star9 Academy</span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex gap-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
           <a href="#" className="hover:text-primary transition-colors">Privacy</a>
           <a href="#" className="hover:text-primary transition-colors">Access</a>
           <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
        <p className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.2em] font-bold">
           © 2026 Star9 Infrastructure Group.
        </p>
      </div>
    </footer>
  );
};
