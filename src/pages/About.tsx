import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">About Star9</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Star9 Freelancer Ltd is a Kenya-registered company empowering African freelancers with the skills, technology, and global connections they need to succeed.
          </p>
        </div>

        <section className="space-y-4" id="about">
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We exist to bridge the gap between African talent and global opportunity. Through our Academy, Global platform, and Foundation, we provide comprehensive support for freelancers at every stage of their career. Our motto, "Freelancing with heart and skill," reflects our commitment to both professional excellence and human-centered values.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Star9 Academy</h3>
              <p className="text-sm text-muted-foreground">Professional courses in AI for Freelancers, Mastering Freelancing, and International Teacher Preparation.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Star9 Global</h3>
              <p className="text-sm text-muted-foreground">Curated remote job listings and international study abroad programs across 30+ countries.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Star9 Foundation</h3>
              <p className="text-sm text-muted-foreground">Social impact initiatives supporting education and digital inclusion across Africa.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Star9 Platform</h3>
              <p className="text-sm text-muted-foreground">A freelancer marketplace connecting certified professionals with clients worldwide.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
          <p className="text-muted-foreground leading-relaxed">
            Star9 is led by a passionate team of professionals who understand the unique challenges African freelancers face. Our Director of Operations, Esther Hiuko, leads day-to-day operations with a focus on quality and impact.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Values</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3"><span className="text-primary font-bold">1.</span> Excellence in everything we deliver</li>
            <li className="flex items-start gap-3"><span className="text-primary font-bold">2.</span> Empowerment through education and opportunity</li>
            <li className="flex items-start gap-3"><span className="text-primary font-bold">3.</span> Community-driven growth and mutual support</li>
            <li className="flex items-start gap-3"><span className="text-primary font-bold">4.</span> Transparency and integrity in all operations</li>
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
