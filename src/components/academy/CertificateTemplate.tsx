import React from 'react';
import { Award, Globe, ShieldCheck, Check } from "lucide-react";
import logo from "@/assets/logo_transparent.png";

interface CertificateTemplateProps {
  studentName: string;
  courseTitle: string;
  credentialId: string;
  issueDate: string;
}

const CertificateTemplate = React.forwardRef<HTMLDivElement, CertificateTemplateProps>(({ 
  studentName, 
  courseTitle, 
  credentialId, 
  issueDate 
}, ref) => {
  return (
    <div 
      ref={ref}
      style={{
        width: '1122.5px', // A4 Landscape
        height: '793.7px',
        backgroundColor: '#fcfcf7', // Premium Ivory/Parchment
        color: '#1e293b', // Slate-800
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Subtle Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Modern Academic Border: Navy & Gold */}
      <div className="absolute inset-6 border-[8px] border-[#1e293b] pointer-events-none" />
      <div className="absolute inset-[32px] border-[2px] border-[#c4a059] pointer-events-none" />
      
      {/* Inner Decorative Corners */}
      {[
        'top-[32px] left-[32px] border-t-8 border-l-8',
        'top-[32px] right-[32px] border-t-8 border-r-8',
        'bottom-[32px] left-[32px] border-b-8 border-l-8',
        'bottom-[32px] right-[32px] border-b-8 border-r-8'
      ].map((classes, i) => (
        <div key={i} className={`absolute size-24 border-[#1e293b] ${classes}`} />
      ))}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center w-full px-32 py-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <img src={logo} alt="Star9" className="h-20 mb-4 brightness-[0.2] contrast-150" />
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#c4a059] font-black">Star9 Infrastructure Academy</p>
        </div>

        {/* Certificate Title */}
        <div className="text-center space-y-4 mb-12">
          <h1 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-6xl font-extrabold uppercase tracking-tight text-[#1e293b]"
          >
            Certificate of Achievement
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-24 bg-[#c4a059]/40" />
             <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-500">Official Operational Credential</p>
             <div className="h-px w-24 bg-[#c4a059]/40" />
          </div>
        </div>

        {/* Recipient Information */}
        <div className="text-center space-y-10 flex flex-col items-center w-full">
          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl text-slate-500 italic"
          >
            This is to certify that
          </p>

          <div className="w-full max-w-3xl border-b-2 border-slate-200 pb-4">
             <h2 
               style={{ fontFamily: "'Playfair Display', serif" }}
               className="text-7xl font-black text-[#1e293b] px-8"
             >
               {studentName}
             </h2>
          </div>

          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl text-slate-500 italic max-w-2xl px-12"
          >
            has successfully fulfilled all requirements and demonstrated operational mastery in
          </p>

          <h3 className="text-4xl font-black text-[#c4a059] uppercase tracking-wide">
            {courseTitle}
          </h3>
        </div>

        {/* Background Decorative Seal */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
           <Award className="size-[500px]" />
        </div>
      </div>

      {/* Official Bottom Section */}
      <div className="w-full px-24 pb-20 flex items-center justify-between mt-auto">
         
         {/* Left: Metadata & Validation */}
         <div className="space-y-4">
            <div className="space-y-1">
               <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c4a059] font-bold">Credential Reference</p>
               <div className="grid gap-0.5">
                  <p className="font-mono text-[11px] text-slate-500">GEN_ID: <span className="font-bold text-slate-800">{credentialId}</span></p>
                  <p className="font-mono text-[11px] text-slate-500">DATED: <span className="font-bold text-slate-800">{issueDate}</span></p>
               </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-100 border border-slate-200">
               <ShieldCheck className="size-4 text-slate-400" />
               <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Immutable Ledger Proof Verified</span>
            </div>
         </div>

         {/* Center: The Academic Gold Medal */}
         <div className="relative group">
            {/* Sunburst effect */}
            <div className="absolute inset-0 bg-[#c4a059]/10 rounded-full blur-2xl group-hover:bg-[#c4a059]/20 transition-all" />
            <div className="size-36 rounded-full border-4 border-[#1e293b] bg-white shadow-2xl flex flex-col items-center justify-center p-1 relative">
                <div className="size-full rounded-full border-2 border-[#c4a059]/30 flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-50">
                    <Award className="size-16 text-[#c4a059]" />
                    <p className="text-[8px] font-black uppercase tracking-tighter mt-1">Certified</p>
                    <div className="flex gap-0.5 mt-0.5">
                       {[1,2,3,4,5].map(i => <Check key={i} className="size-1.5 text-[#c4a059]" strokeWidth={4} />)}
                    </div>
                </div>
            </div>
         </div>

         {/* Right: Signature Block */}
         <div className="text-center w-72">
            <div 
              style={{ fontFamily: "'Dancing Script', serif" }}
              className="text-5xl text-slate-400 mb-2 relative"
            >
               <span className="text-[#1e293b]">Esther Hiuko</span>
            </div>
            <div className="h-[2px] w-full bg-[#1e293b] mb-2" />
            <div className="space-y-0.5">
               <p className="font-black text-xs uppercase tracking-[0.2em] text-slate-800 underline decoration-[#c4a059] decoration-2 underline-offset-4">Esther Hiuko</p>
               <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold mt-2">Director of Operations</p>
            </div>
         </div>
      </div>

      {/* Global Ledger Tag */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[8px] font-mono uppercase tracking-[0.4em] text-slate-300">
         <span>Authorized Network Signature</span>
         <Globe className="size-2.5" />
         <span>Global Recognition Protocol</span>
      </div>

    </div>
  );
});

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
