import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: April 2026</p>
        </div>

        <div className="space-y-6 text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your name, email address, phone number, location, and professional details when you create an account or enroll in courses.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and improve our Services</li>
              <li>To process course enrollments and issue certificates</li>
              <li>To communicate with you about updates, courses, and opportunities</li>
              <li>To personalize your experience on the platform</li>
              <li>To maintain the security and integrity of our Services</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with trusted service providers who help us operate the platform, subject to confidentiality agreements.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Cookies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze site traffic.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may also request a copy of your data or withdraw consent for processing at any time by contacting us.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Data Retention</h2>
            <p>We retain your data for as long as your account is active or as needed to provide our Services. You may request deletion of your account and associated data at any time.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at <a href="mailto:info@star9freelancer.com" className="text-primary hover:underline">info@star9freelancer.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
