import React from "react";
import { Award, ShieldCheck, Globe } from "lucide-react";
import logo from "@/assets/logo_transparent.png";
import goldSeal from "@/assets/gold_foil_seal.png";

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
      <div className="absolute inset-8 border-[6px] border-[#1e293b] pointer-events-none" />
      <div className="absolute inset-[44px] border-[1px] border-[#c4a059]/40 pointer-events-none" />

      {/* Main Content Area: Centered Vertically and Horizontally */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-32 py-12 relative z-10 text-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 transform -translate-y-4">
          <img src={logo} alt="Star9" className="h-16 mb-4 brightness-[0.2] contrast-150" />
        </div>

        {/* Certificate Title */}
        <div className="space-y-4 mb-10">
          <h1 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-6xl font-extrabold uppercase tracking-tight text-[#1e293b]"
          >
            Certificate of Achievement
          </h1>
          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl text-slate-500 italic"
          >
            This high-trust credential is presented to
          </p>
        </div>

        {/* Recipient Information */}
        <div className="space-y-10 flex flex-col items-center w-full mb-12">
          <div className="w-full max-w-2xl border-b-2 border-slate-200 pb-2">
             <h2 
               style={{ fontFamily: "'Playfair Display', serif" }}
               className="text-7xl font-black text-[#1e293b] px-8 tracking-tight"
             >
               {studentName}
             </h2>
          </div>

          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl text-slate-500 italic max-w-2xl px-12"
          >
            for demonstrating operational excellence and architectural mastery in
          </p>

          <h3 className="text-4xl font-black text-[#1e293b] uppercase tracking-wide">
            {courseTitle}
          </h3>
        </div>
      </div>

      {/* Perfectly Symmetrical Footer Structure */}
      <div className="w-full h-64 relative flex items-center px-32 pb-24">
         
         {/* Left Side: Metadata (Absolute Bottom-Left) */}
         <div className="absolute left-32 bottom-20 space-y-4 text-left">
            <div className="space-y-1">
               <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Credential Proof</p>
               <div className="grid gap-0.5">
                  <p className="font-mono text-[10px] text-slate-400">ID: <span className="text-slate-800 font-bold ml-2">{credentialId}</span></p>
                  <p className="font-mono text-[10px] text-slate-400">DATE: <span className="text-slate-800 font-bold ml-2">{issueDate}</span></p>
               </div>
            </div>
            <div className="flex items-center gap-2 opacity-40">
               <ShieldCheck className="size-3 text-slate-500" />
               <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-slate-400">STAR9_LEDGER_AUTHENTICATED</span>
            </div>
         </div>

         {/* Center: Absolute Seal Centering with Authentic 3D Foil Asset */}
         <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center">
            <img 
               src={goldSeal} 
               alt="Official Seal" 
               className="size-32 drop-shadow-2xl object-contain"
            />
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#c4a059] mt-2">Executive Validation</p>
         </div>

         {/* Right Side: Presidential Signature (Absolute Bottom-Right) */}
         <div className="absolute right-32 bottom-20 w-80 text-center flex flex-col items-center">
            <div 
              style={{ fontFamily: "'Dancing Script', serif", fontWeight: 700 }}
              className="text-6xl text-[#1e293b] mb-2 transform -skew-x-6"
            >
               Esther Hiuko
            </div>
            <div className="h-[2px] w-full bg-slate-200 mb-3" />
            <div className="space-y-0.5">
               <p className="font-bold text-[12px] uppercase tracking-[0.2em] text-[#1e293b]">Esther Hiuko</p>
               <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-400 font-bold mt-1">Director of Operations</p>
            </div>
         </div>

      </div>

      {/* Fixed Navigation/Identity Footer Line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 text-[7px] font-mono uppercase tracking-[0.6em] text-slate-300">
         <span>Authorized Network Signature</span>
         <Globe className="size-3" />
         <span>Global Recognition Protocol</span>
      </div>

    </div>
  );
});

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
