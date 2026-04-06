import React from "react";
import { Shield, Activity, Globe, Zap } from "lucide-react";

export const AcademyFooter = () => {
  return (
    <footer className="mt-20 pt-12 pb-24 border-t border-white/5 bg-zinc-950/30 backdrop-blur-sm -mx-4 md:-mx-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white font-bold">Star9 Academy</span>
          </div>
          <p className="text-[10px] font-medium text-zinc-500 leading-relaxed max-w-xs">
            The premier digital infrastructure and AI operations training platform for the modern workforce. 
            Empowering professionals through elite certification.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">System Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-600">Network Layer</span>
              <span className="text-emerald-500 flex items-center gap-1.5"><div className="size-1 rounded-full bg-emerald-500 animate-pulse" /> OPERATIONAL</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
               <span>Curriculum Sync</span>
               <span className="text-emerald-500 flex items-center gap-1.5"><div className="size-1 rounded-full bg-emerald-500" /> ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
           <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Legal & Security</h4>
           <div className="flex flex-wrap gap-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-primary transition-colors">Access Agreement</a>
              <a href="#" className="hover:text-primary transition-colors">Security Manual</a>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-700">
               <Globe className="size-3" />
               <span>US-EAST-1</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-700">
               <Zap className="size-3" />
               <span>LATENCY: 24MS</span>
            </div>
         </div>
         <p className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.2em] font-bold">
            © 2026 Star9 Global Infrastructure Group. Secure Transmission.
         </p>
      </div>
    </footer>
  );
};
