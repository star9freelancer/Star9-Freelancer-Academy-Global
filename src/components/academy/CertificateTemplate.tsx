import React from 'react';
import { ShieldCheck, Award, FileCheck, Globe } from "lucide-react";
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
      className="certificate-container"
      style={{
        width: '1122.5px', // A4 Landscape
        height: '793.7px',
        backgroundColor: '#09090b', // Deep Obsidian
        color: '#ffffff',
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
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(120%) brightness(100%)'
        }}
      />

      {/* Ornate Triple Gold Border */}
      <div className="absolute inset-8 border-[1px] border-[#c5a059]/30 rounded-sm pointer-events-none" />
      <div className="absolute inset-10 border-[3px] border-[#c5a059]/50 rounded-sm pointer-events-none" />
      <div className="absolute inset-[44px] border-[1px] border-[#c5a059]/30 rounded-sm pointer-events-none" />
      
      {/* Corner Flourishes */}
      {[
        'top-8 left-8 border-t-4 border-l-4',
        'top-8 right-8 border-t-4 border-r-4',
        'bottom-8 left-8 border-b-4 border-l-4',
        'bottom-8 right-8 border-b-4 border-r-4'
      ].map((classes, i) => (
        <div key={i} className={`absolute size-16 border-[#c5a059] ${classes} rounded-sm`} />
      ))}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center w-full px-24 py-20 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Star9" className="h-20 mb-6 drop-shadow-2xl brightness-125" />
          <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
        </div>

        {/* Certificate Title */}
        <div className="text-center space-y-3 mb-10">
          <h1 
            style={{
               fontFamily: "'Playfair Display', serif",
               fontStyle: 'italic',
               letterSpacing: '0.1em'
            }}
            className="text-6xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#f3e3ad] via-[#c5a059] to-[#926a31]"
          >
            Certificate of Excellence
          </h1>
          <p className="text-[10px] font-mono tracking-[0.6em] uppercase text-[#c5a059] font-bold">
            Authorized Protocol Infrastructure Achievement
          </p>
        </div>

        {/* Body Text */}
        <div className="text-center space-y-8 flex flex-col items-center w-full max-w-2xl">
          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl text-zinc-400 italic"
          >
            This high-trust credential is presented as formal recognition of mastery to
          </p>

          <div className="w-full relative py-4">
             <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
             <h2 
               style={{ fontFamily: "'Playfair Display', serif" }}
               className="text-6xl font-black text-white px-8 tracking-tight"
             >
               {studentName}
             </h2>
          </div>

          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-lg text-zinc-400 italic"
          >
            for successfully conferring operational standards and architectural proficiency in
          </p>

          <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-[#c5a059]/90 border border-[#c5a059]/20 px-8 py-3 bg-[#c5a059]/5 rounded-sm">
            {courseTitle}
          </h3>
        </div>

        {/* Validation Footnote */}
        <div className="mt-12 flex items-center gap-6 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-600">
           <span>Credential Authenticated @ Star9 Edge</span>
           <ShieldCheck className="size-3 text-zinc-700" />
           <span>Global Reciprocal Recognition Protocol</span>
        </div>
      </div>

      {/* Footer Signature Section */}
      <div className="w-full h-56 bg-zinc-900/40 border-t border-zinc-800/80 mt-auto px-16 flex items-center justify-between relative overflow-hidden">
         {/* Subtle pattern background for footer */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

         {/* Left: Credential ID Block */}
         <div className="space-y-4">
           <div className="flex items-center gap-2">
              <Globe className="size-4 text-[#c5a059]" />
              <p className="text-[10px] font-mono tracking-widest text-[#c5a059] font-bold">DIGITAL_LEDGER_PROOF</p>
           </div>
           <div className="grid gap-1">
             <p className="font-mono text-[10px] text-zinc-500 uppercase">HashID: <span className="text-zinc-300 ml-2">{credentialId}</span></p>
             <p className="font-mono text-[10px] text-zinc-500 uppercase">Issued: <span className="text-zinc-300 ml-2">{issueDate}</span></p>
           </div>
         </div>

         {/* Center: The Royal Seal */}
         <div className="relative">
            <div className="size-32 rounded-full shadow-[0_0_50px_rgba(197,160,89,0.2)] flex items-center justify-center border-2 border-[#c5a059]/30 bg-gradient-to-br from-[#f3e3ad] via-[#c5a059] to-[#926a31] p-1">
               <div className="size-full rounded-full border-2 border-white/20 border-dashed animate-[spin_30s_linear_infinite]" />
               <Award className="absolute size-14 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            </div>
         </div>

         {/* Right: Signature Block */}
         <div className="text-center w-64">
           <div 
             style={{ fontFamily: "'Dancing Script', 'Cursive', serif" }}
             className="text-4xl text-white italic mb-2 tracking-wide drop-shadow-md pb-1"
           >
             Esther Hiuko
           </div>
           <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-3" />
           <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Esther Hiuko</p>
           <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c5a059] mt-1">Director of Operations</p>
         </div>
      </div>
      
      {/* Decorative filigree */}
      <div className="absolute top-10 left-10 size-16 opacity-10 flex items-center justify-center transform -rotate-45">
         <FileCheck className="size-full text-[#c5a059]" />
      </div>

    </div>
  );
});

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
