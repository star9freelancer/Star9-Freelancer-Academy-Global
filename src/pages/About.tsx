import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">About Star9 Freelancer Ltd</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Star9 Freelancer Ltd is a fully remote platform dedicated to empowering African youth and women by connecting them to global opportunities through digital skills, education, and international career pathways.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that talent is everywhere—but opportunity is not equally distributed.
          </p>
          <p className="text-lg font-semibold text-primary">
            Our mission is to bridge that gap.
          </p>
        </div>

        <section className="space-y-4" id="our-story">
          <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4 border-l-2 border-border pl-6">
            <p>Star9 Freelancer Ltd was founded from real experience.</p>
            <p>Our founder began her journey as a top-performing student at Gitunduti Primary School, where she achieved an A- in KCPE and was ranked the best student in Nyeri County. This academic excellence opened doors through scholarships and leadership opportunities, including mentorship under the Wings to Fly program.</p>
            <p>She later pursued a degree in Mathematics (Statistics) at the University of Nairobi and began freelancing in 2018.</p>
            <div className="py-2">
              <p className="font-semibold text-foreground">However, despite having the skills, she encountered major challenges:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Limited access to global clients</li>
                <li>Lack of structured guidance</li>
                <li>Difficulty scaling as a freelancer</li>
              </ul>
            </div>
            <p>Everything changed through her experience with Mwerevu Education, where she was trained and worked remotely as an online tutor supporting students abroad.</p>
            <div className="py-4 my-4 border-l-4 border-primary pl-4 bg-muted/30 rounded-r-lg">
              <p className="font-medium text-foreground">
                <span className="text-xl mr-2">👉</span> Africans can work globally and succeed—with the right training and support.
              </p>
            </div>
            <p className="font-semibold">Star9 Freelancer Ltd was built to provide exactly that.</p>
          </div>
        </section>

        <section className="space-y-6" id="what-we-do">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">What We Do</h2>
            <p className="text-muted-foreground">We provide a complete ecosystem for global opportunities:</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
              <h3 className="font-bold text-foreground mb-3 text-lg flex items-center gap-2"><span>💻</span> AI & Freelancing Training</h3>
              <p className="text-muted-foreground leading-relaxed">Practical, job-ready skills that help individuals earn online and build sustainable careers.</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
              <h3 className="font-bold text-foreground mb-3 text-lg flex items-center gap-2"><span>🌐</span> Remote Work Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">Connecting African talent to global clients and companies.</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
              <h3 className="font-bold text-foreground mb-3 text-lg flex items-center gap-2"><span>🎓</span> Study Abroad Pathways</h3>
              <p className="text-muted-foreground leading-relaxed">Support for certificates, diplomas, undergraduate, and postgraduate programs abroad.</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
              <h3 className="font-bold text-foreground mb-3 text-lg flex items-center gap-2"><span>✈️</span> Work Abroad Programs</h3>
              <p className="text-muted-foreground leading-relaxed">Preparation and placement for international careers, including teaching and caregiving.</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 py-4">
          <section className="space-y-4 p-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower African youth and women with practical, income-generating skills and connect them to global opportunities in education and employment.
            </p>
          </section>

          <section className="space-y-4 p-8 rounded-2xl bg-secondary/5 border border-secondary/20">
            <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become a leading global platform that transforms African talent into a competitive global workforce.
            </p>
          </section>
        </div>

        <section className="space-y-4 text-center py-6">
          <h2 className="text-2xl font-bold text-foreground">Why Star9</h2>
          <div className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto space-y-2">
            <p>We are not just a platform—we are a solution built from lived experience.</p>
            <p>We understand the challenges because we have lived them.</p>
            <p className="font-semibold text-foreground">And we are building the bridge to global success.</p>
          </div>
        </section>

        <section className="space-y-6 pt-10 border-t border-border text-center">
          <h2 className="text-3xl font-bold text-foreground">Join Us</h2>
          <p className="text-muted-foreground text-lg">Whether you are a student, a job seeker, a freelancer, or an organization:</p>
          <p className="text-foreground font-semibold text-xl pt-2">
            Star9 Freelancer Ltd is here to help you grow, connect, and succeed globally.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="https://www.star9freelancer.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-colors duration-300">
              <span>🌐</span> www.star9freelancer.com
            </a>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
