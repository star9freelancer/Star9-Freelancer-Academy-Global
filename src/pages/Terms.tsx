import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: April 2026</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using the Star9 platform, website, and services (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Description of Services</h2>
            <p>Star9 Freelancer ltd (a registered company in Kenya) provides an online learning platform (Star9 Academy), a job and study abroad board (Star9 Global), community features, and related freelancer support services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. User Accounts</h2>
            <p>To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Course Enrollment and Certificates</h2>
            <p>Enrollment in Academy courses grants you personal, non-transferable access to course materials. Certificates are issued upon successful completion and remain the intellectual property of Star9 Freelancer ltd.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. User Conduct</h2>
            <p>You agree not to misuse the Services, including but not limited to: sharing course materials without authorization, posting offensive content in community spaces, or attempting to gain unauthorized access to the platform.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Payments and Refunds</h2>
            <p>Paid services are billed as described at the time of purchase. Refund requests must be submitted within 14 days of purchase and will be reviewed on a case-by-case basis.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Intellectual Property</h2>
            <p>All content on the Star9 platform, including courses, logos, text, and designs, is owned by Star9 Freelancer ltd and protected by applicable copyright laws.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p>Star9 Freelancer ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Continued use of the Services after changes constitutes acceptance of the revised terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:info@star9freelancer.com" className="text-primary hover:underline">info@star9freelancer.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
