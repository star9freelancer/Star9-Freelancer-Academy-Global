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
        backgroundColor: '#fffdf7',
        position: 'relative',
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Simple elegant border */}
      <div style={{
        position: 'absolute',
        inset: '24px',
        border: '3px solid #1a2744',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: '32px',
        border: '1px solid #c9b06b',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '60px 80px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Decorative line */}
        <div style={{
          width: '80px',
          height: '3px',
          backgroundColor: '#c9b06b',
          marginBottom: '28px',
        }} />

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '48px',
          fontWeight: 700,
          color: '#1a2744',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0',
          lineHeight: 1.2,
        }}>
          Certificate
        </h1>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '18px',
          fontWeight: 400,
          color: '#6b7280',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          margin: '0 0 32px 0',
        }}>
          of Achievement
        </p>

        {/* Presented to */}
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '16px',
          color: '#9ca3af',
          fontStyle: 'italic',
          margin: '0 0 16px 0',
        }}>
          This certificate is proudly presented to
        </p>

        {/* Student Name */}
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '52px',
          fontWeight: 700,
          color: '#1a2744',
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
        }}>
          {studentName}
        </h2>

        {/* Underline */}
        <div style={{
          width: '300px',
          height: '1px',
          backgroundColor: '#d1d5db',
          marginBottom: '24px',
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '15px',
          color: '#9ca3af',
          fontStyle: 'italic',
          margin: '0 0 20px 0',
          maxWidth: '500px',
          lineHeight: 1.6,
        }}>
          for successfully completing all course requirements and demonstrating excellence in
        </p>

        {/* Course Title */}
        <h3 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '22px',
          fontWeight: 800,
          color: '#1a2744',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: '0 0 40px 0',
        }}>
          {courseTitle}
        </h3>

        {/* Decorative line */}
        <div style={{
          width: '80px',
          height: '3px',
          backgroundColor: '#c9b06b',
          marginBottom: '40px',
        }} />

        {/* Footer: Date, Seal, Signature */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '800px',
        }}>

          {/* Left: Date & ID */}
          <div style={{ textAlign: 'left', minWidth: '200px' }}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              color: '#9ca3af',
              margin: '0 0 4px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              Date Issued
            </p>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '16px',
              color: '#1a2744',
              fontWeight: 600,
              margin: '0 0 16px 0',
            }}>
              {issueDate}
            </p>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '9px',
              color: '#c9b06b',
              letterSpacing: '1px',
              margin: 0,
            }}>
              {credentialId}
            </p>
          </div>

          {/* Center: SVG Seal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer starburst */}
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
                return (
                  <path
                    key={i}
                    d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`}
                    fill="#c9b06b"
                  />
                );
              })}
              {/* Inner circle */}
              <circle cx="50" cy="50" r="38" fill="#c9b06b" />
              <circle cx="50" cy="50" r="35" fill="#fffdf7" stroke="#c9b06b" strokeWidth="1" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#c9b06b" strokeWidth="0.5" />
              {/* Star */}
              <path
                d="M50 22L56.2 38.5H73.5L59.7 48.5L65.8 65L50 55L34.2 65L40.3 48.5L26.5 38.5H43.8Z"
                fill="#c9b06b"
              />
              {/* Inner ring text substitute - small dots */}
              <circle cx="50" cy="50" r="28" fill="none" stroke="#c9b06b" strokeWidth="0.3" strokeDasharray="2 3" />
            </svg>
          </div>

          {/* Right: Signature */}
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '32px',
              color: '#1a2744',
              margin: '0 0 4px 0',
              lineHeight: 1,
            }}>
              Esther Hiuko
            </p>
            <div style={{
              width: '180px',
              height: '1px',
              backgroundColor: '#1a2744',
              margin: '0 auto 8px auto',
            }} />
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#1a2744',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: '0 0 2px 0',
            }}>
              Esther Hiuko
            </p>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '9px',
              color: '#9ca3af',
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

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
