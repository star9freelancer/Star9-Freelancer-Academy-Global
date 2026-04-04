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
      <div className="absolute inset-8 border-[6px] border-[#1e293b] pointer-events-none" />
      <div className="absolute inset-[44px] border-[1px] border-[#c4a059]/40 pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center w-full px-32 py-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Star9" className="h-16 mb-2 brightness-[0.2] contrast-150" />
        </div>

        {/* Certificate Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl font-extrabold uppercase tracking-tight text-[#1e293b]"
          >
            Certificate of Achievement
          </h1>
        </div>

        {/* Recipient Information */}
        <div className="text-center space-y-6 flex flex-col items-center w-full">
          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl text-slate-500 italic"
          >
            This is to certify that
          </p>

          <div className="w-full max-w-3xl border-b border-slate-200 pb-2">
             <h2 
               style={{ fontFamily: "'Playfair Display', serif" }}
               className="text-6xl font-black text-[#1e293b] px-8"
             >
               {studentName}
             </h2>
          </div>

          <p 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-base text-slate-500 italic max-w-2xl px-12"
          >
            has successfully fulfilled all requirements and demonstrated mastery in
          </p>

          <h3 className="text-3xl font-black text-[#1e293b] uppercase tracking-wide">
            {courseTitle}
          </h3>
        </div>

      </div>

      {/* Official Bottom Section */}
      <div className="w-full px-24 pb-20 flex items-center justify-between mt-auto">
         
         {/* Left: Metadata & Validation */}
         <div className="space-y-2">
            <div className="grid gap-0.5">
               <p className="font-mono text-[9px] text-slate-400">ID: <span className="font-bold text-slate-800">{credentialId}</span></p>
               <p className="font-mono text-[9px] text-slate-400">DATE: <span className="font-bold text-slate-800">{issueDate}</span></p>
            </div>
         </div>

         {/* Center: The Academic Gold Medal */}
         {/* Center: The Academic Gold Foil Seal */}
         <div className="relative group">
            <div className="size-28 rounded-full border-[1px] border-[#c4a059]/50 p-1 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[#c4a059]/10" />
               <div className="size-full rounded-full bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center border-[4px] border-[#c4a059] relative shadow-lg">
                  <Award className="size-10 text-[#c4a059] drop-shadow-sm" />
               </div>
            </div>
         </div>

         {/* Right: Signature Block */}
         <div className="text-center w-80 flex flex-col items-center">
            <div 
              style={{ fontFamily: "'Dancing Script', serif", fontWeight: 700 }}
              className="text-5xl text-[#1e293b] mb-1 transform -rotate-1"
            >
               Esther Hiuko
            </div>
            <div className="h-[1.5px] w-64 bg-slate-300 mb-2" />
            <div className="space-y-0.5">
               <p className="font-bold text-[11px] uppercase tracking-[0.2em] text-slate-800 underline decoration-[#c4a059] decoration-2 underline-offset-8">Esther Hiuko</p>
               <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold mt-3">Director of Operations</p>
            </div>
         </div>
      </div>


    </div>
  );
});

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
