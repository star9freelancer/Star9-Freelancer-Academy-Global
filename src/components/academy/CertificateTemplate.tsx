import React from "react";

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
        width: '1122px',
        height: '794px',
        background: 'linear-gradient(145deg, #0d1b2a 0%, #1b2d4a 40%, #0d1b2a 100%)',
        position: 'relative',
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
      }}
    >
      {/* Decorative corner accents */}
      <CornerAccent position="top-left" />
      <CornerAccent position="top-right" />
      <CornerAccent position="bottom-left" />
      <CornerAccent position="bottom-right" />

      {/* Subtle border */}
      <div style={{
        position: 'absolute',
        inset: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(27,93,171,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '50px 80px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Star9 Brand */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          margin: '0 0 24px 0',
          fontWeight: 600,
        }}>
          Star9 Freelancer Academy
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '46px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          margin: '0 0 6px 0',
          lineHeight: 1.2,
        }}>
          Certificate
        </h1>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '16px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          margin: '0 0 28px 0',
        }}>
          of Achievement
        </p>

        {/* Gold accent line */}
        <div style={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          marginBottom: '28px',
        }} />

        {/* Presented to */}
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
          fontStyle: 'italic',
          margin: '0 0 14px 0',
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          This certificate is proudly presented to
        </p>

        {/* Student Name */}
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '48px',
          fontWeight: 700,
          color: '#c9a84c',
          margin: '0 0 6px 0',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
        }}>
          {studentName}
        </h2>

        {/* Underline */}
        <div style={{
          width: '280px',
          height: '1px',
          backgroundColor: 'rgba(201,168,76,0.3)',
          marginBottom: '20px',
        }} />

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
          fontStyle: 'italic',
          margin: '0 0 16px 0',
          maxWidth: '480px',
          lineHeight: 1.7,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          for successfully completing all course requirements and demonstrating excellence in
        </p>

        {/* Course Title */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: '0 0 36px 0',
        }}>
          {courseTitle}
        </h3>

        {/* Footer: Date, Seal, Signature */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '780px',
        }}>
          {/* Left: Date & ID */}
          <div style={{ textAlign: 'left', minWidth: '180px' }}>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              margin: '0 0 4px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Date Issued
            </p>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '14px',
              color: '#ffffff',
              fontWeight: 600,
              margin: '0 0 14px 0',
            }}>
              {issueDate}
            </p>
            <p style={{
              fontSize: '9px',
              color: '#c9a84c',
              letterSpacing: '1px',
              margin: 0,
              opacity: 0.7,
            }}>
              {credentialId}
            </p>
          </div>

          {/* Center: Gold Seal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="85" height="85" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15) * Math.PI / 180;
                const r1 = 48;
                const r2 = 42;
                const x1 = 50 + r1 * Math.cos(angle);
                const y1 = 50 + r1 * Math.sin(angle);
                const midAngle = ((i * 15) + 7.5) * Math.PI / 180;
                const x2 = 50 + r2 * Math.cos(midAngle);
                const y2 = 50 + r2 * Math.sin(midAngle);
                const nextAngle = ((i + 1) * 15) * Math.PI / 180;
                const x3 = 50 + r1 * Math.cos(nextAngle);
                const y3 = 50 + r1 * Math.sin(nextAngle);
                return <path key={i} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} fill="#c9a84c" />;
              })}
              <circle cx="50" cy="50" r="38" fill="#c9a84c" />
              <circle cx="50" cy="50" r="35" fill="#0d1b2a" stroke="#c9a84c" strokeWidth="1" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
              <path d="M50 24L55.5 37.5H70L58.2 46L63.5 60L50 51L36.5 60L41.8 46L30 37.5H44.5Z" fill="#c9a84c" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="#c9a84c" strokeWidth="0.3" strokeDasharray="2 3" />
            </svg>
          </div>

          {/* Right: Signature */}
          <div style={{ textAlign: 'center', minWidth: '180px' }}>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '30px',
              color: '#c9a84c',
              margin: '0 0 4px 0',
              lineHeight: 1,
            }}>
              Esther Hiuko
            </p>
            <div style={{
              width: '160px',
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              margin: '0 auto 8px auto',
            }} />
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: '0 0 2px 0',
            }}>
              Esther Hiuko
            </p>
            <p style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Director of Operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const CornerAccent = ({ position }: { position: string }) => {
  const size = 60;
  const styles: Record<string, React.CSSProperties> = {
    'top-left': { top: 12, left: 12 },
    'top-right': { top: 12, right: 12, transform: 'scaleX(-1)' },
    'bottom-left': { bottom: 12, left: 12, transform: 'scaleY(-1)' },
    'bottom-right': { bottom: 12, right: 12, transform: 'scale(-1)' },
  };

  return (
    <div style={{ position: 'absolute', ...styles[position], width: size, height: size, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: size, height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: size, background: 'linear-gradient(180deg, #c9a84c, transparent)' }} />
    </div>
  );
};

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
