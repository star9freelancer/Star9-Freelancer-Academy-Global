import { motion } from "framer-motion";

// Inline SVG components for logos
const VisaLogo = () => (
  <svg viewBox="0 0 141.732 141.732" className="h-8 w-auto">
    <g fill="#1434CB">
      <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z" />
    </g>
  </svg>
);

const partners = [
  { name: "M-Pesa", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" },
  { name: "Visa", component: <VisaLogo /> },
  { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Wise", logo: "https://wise.com/public-resources/assets/logos/wise/brand_logo.svg" },
  { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
  { name: "Paystack", text: true },
  { name: "Flutterwave", logo: "https://flutterwave.com/images/logo/full.svg" },
];

const TrustSection = () => (
  <section className="py-12 border-y border-border bg-muted/20">
    <div className="container max-w-5xl">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium text-muted-foreground mb-8 uppercase tracking-[0.2em]"
      >
        Trusted Payment Partners
      </motion.p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            {p.text ? (
              <span className="text-lg font-bold text-foreground/80 hover:text-foreground">
                {p.name}
              </span>
            ) : p.component ? (
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                {p.component}
              </div>
            ) : (
              <img
                src={p.logo}
                alt={p.name}
                className="h-8 w-auto object-contain max-w-[120px] opacity-70 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  const span = document.createElement('span');
                  span.className = 'text-lg font-bold text-foreground/80';
                  span.textContent = p.name;
                  e.currentTarget.parentElement!.appendChild(span);
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
