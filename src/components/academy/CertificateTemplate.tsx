import React from 'react';
import { BadgeCheck, ShieldCheck, Globe, Award } from "lucide-react";
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
        width: '1122.5px', // Standard A4 Landscape at 96 DPI
        height: '793.7px',
        backgroundColor: '#09090b', // Zinc-950 (Star9 Theme)
        color: '#fafafa',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
        border: '32px solid #18181b', // Zinc-900 border
        boxSizing: 'border-box'
      }}
    >
      {/* Intricate Border Pattern */}
      <div className="absolute inset-0 border-[2px] border-primary/20 m-4 pointer-events-none" />
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <img src={logo} alt="Watermark" className="w-[600px] grayscale" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-6 mt-12 mb-12">
        <img src={logo} alt="Star9" className="h-16 brightness-200" />
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Title */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl font-black uppercase tracking-[0.2em] text-primary">Certificate of Excellence</h1>
        <p className="text-sm font-mono tracking-[0.4em] uppercase text-zinc-500">Star9 Infrastructure Academy Validation</p>
      </div>

      {/* Conferred to */}
      <div className="text-center space-y-8 mb-16">
        <p className="text-xl italic text-zinc-400 font-serif">This certifies that successfully confers operational mastery upon</p>
        <h2 className="text-6xl font-black uppercase tracking-tight text-white border-b-2 border-primary/10 pb-4 min-w-[500px]">
          {studentName}
        </h2>
        <p className="text-xl italic text-zinc-400 font-serif">for the exceptional completion of all network-sanctioned modules in</p>
        <h3 className="text-3xl font-bold text-primary uppercase tracking-wide">
          {courseTitle}
        </h3>
      </div>

      {/* Footer Section */}
      <div className="mt-auto w-full flex items-end justify-between px-12">
        {/* Left: Credential Info */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Verified Infrastructure Credential</span>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[11px] text-zinc-400">ID: {credentialId}</p>
            <p className="font-mono text-[11px] text-zinc-400">ISSUED: {issueDate}</p>
          </div>
        </div>

        {/* Center: Gold Seal (Simulated) */}
        <div className="relative flex items-center justify-center p-4">
           <div className="size-32 rounded-full bg-gradient-to-br from-yellow-300 via-primary to-yellow-600 shadow-2xl flex items-center justify-center border-4 border-yellow-200/20">
              <div className="size-24 rounded-full border border-yellow-100/30 border-dashed animate-[spin_20s_linear_infinite]" />
              <Award className="absolute size-14 text-yellow-50 mb-1" />
           </div>
        </div>

        {/* Right: Signature */}
        <div className="space-y-4 text-center">
          <div className="font-serif italic text-4xl text-white underline decoration-primary/20 decoration-dashed">
            Esther Hiuko
          </div>
          <div className="h-px w-48 bg-zinc-700 mx-auto" />
          <div className="space-y-0.5">
            <p className="font-bold text-sm uppercase tracking-tight">Esther Hiuko</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Director of Operations</p>
          </div>
        </div>
      </div>

      {/* Global Metadata */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-600">
        <span>STAR9_EDGE_VERIFIED</span>
        <Globe className="size-2" />
        <span>GLOBAL_RECOGNITION_PROTOCOL</span>
      </div>
    </div>
  );
});

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
