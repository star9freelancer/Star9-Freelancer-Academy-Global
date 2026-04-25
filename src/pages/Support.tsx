import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const Support = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container max-w-4xl space-y-12 shrink-0">
        <div className="space-y-4 text-center">
          <span className="text-5xl block mb-6">❤️</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Support the Star9 Mission</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Help us empower African youth and women with global opportunities.
          </p>
        </div>

        <section className="space-y-6">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why We Need Your Support</h2>
            <div className="text-muted-foreground leading-relaxed space-y-6 text-lg">
              <p>Millions of talented young people across Africa lack access to:</p>
              <ul className="grid sm:grid-cols-2 gap-4 text-sm font-medium pt-2">
                <li className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"><span className="text-primary text-xl">💻</span> Digital skills training</li>
                <li className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"><span className="text-primary text-xl">🌐</span> Remote work opportunities</li>
                <li className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"><span className="text-primary text-xl">🎓</span> Study abroad pathways</li>
                <li className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"><span className="text-primary text-xl">🧭</span> Structured career guidance</li>
              </ul>
              <div className="pt-4 border-t border-border mt-6">
                <p>At Star9 Freelancer Ltd, we are working to change that.</p>
                <p className="font-semibold text-foreground text-xl mt-2">But we cannot do it alone.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Our Mission Goals</h2>
          <p className="text-muted-foreground mb-4 text-lg">With your support, we aim to:</p>
          <div className="grid md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🎯</span>
                <p className="font-medium text-foreground">Train <strong className="text-primary">200 African youth</strong> in AI and freelancing</p>
             </div>
             <div className="p-6 rounded-2xl border border-secondary/20 bg-secondary/5 flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🎯</span>
                <p className="font-medium text-foreground">Prepare and place <strong className="text-secondary">100 teachers</strong> to work in the United States</p>
             </div>
             <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🎯</span>
                <p className="font-medium text-foreground">Expand our platform to include more courses and global opportunities</p>
             </div>
          </div>
        </section>

        <section className="space-y-8 p-8 md:p-10 rounded-3xl bg-accent/50 border border-border">
          <div className="text-center max-w-2xl mx-auto mb-8">
             <h2 className="text-2xl font-bold text-foreground mb-3">How Your Support Helps</h2>
             <p className="text-muted-foreground text-lg">Your contribution will go towards:</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-1">Platform Development</h3>
              <p className="text-primary font-bold mb-3 md:text-xl">$2,000</p>
              <p className="text-sm text-muted-foreground">Building and improving our online learning system</p>
            </div>
            
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-1">Training Programs</h3>
              <p className="text-secondary font-bold mb-3 md:text-xl">Variable</p>
              <p className="text-sm text-muted-foreground">Providing AI and freelancing education to underserved youth</p>
            </div>
            
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-1">Teacher Placement</h3>
              <p className="text-emerald-500 font-bold mb-3 md:text-xl">$1,000 / teacher</p>
              <p className="text-sm text-muted-foreground">Supporting qualified teachers to secure jobs abroad</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Your Impact</h2>
          <p className="text-muted-foreground text-center mb-8 text-lg">By supporting Star9, you are:</p>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">✔</div>
              <p className="font-medium">Empowering youth with income-generating skills</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">✔</div>
              <p className="font-medium">Supporting women to access global careers</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">✔</div>
              <p className="font-medium">Creating pathways for education and employment</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">✔</div>
              <p className="font-medium">Transforming lives and communities</p>
            </div>
          </div>
        </section>

        <section className="space-y-8 text-center py-16 px-4 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Make a Difference Today</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every contribution counts. Together, we can build a future where African talent is recognized and empowered globally.
          </p>
          <div className="pt-6">
             <Button size="lg" className="h-16 px-12 text-lg font-bold group shadow-xl shadow-primary/20 rounded-full" onClick={() => window.open('https://paystack.com/pay/q6-31a8o2j', '_blank')}>
               Support Us Here
             </Button>
             <p className="mt-4 text-sm text-muted-foreground font-medium">
               <a href="https://www.star9freelancer.com/support" className="hover:underline">www.star9freelancer.com/support</a>
             </p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <section className="space-y-4 p-8 rounded-2xl bg-card border border-border h-full">
            <h2 className="text-2xl font-bold text-foreground">Partner With Us</h2>
            <p className="text-muted-foreground mb-4">We are also open to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Grants and funding partnerships</li>
              <li>Corporate sponsorships</li>
              <li>Educational collaborations</li>
            </ul>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="font-medium text-foreground flex items-center gap-2">
                <span>📩</span> Contact us to collaborate and scale impact globally.
              </p>
            </div>
          </section>

          <section className="space-y-6 p-8 rounded-2xl bg-card border border-border h-full flex flex-col justify-center text-center">
            <h2 className="text-2xl font-bold text-foreground">Thank You</h2>
            <p className="text-muted-foreground">
              Thank you for believing in our mission and supporting the future of African talent.
            </p>
          </section>
        </div>

        <section className="text-center pt-8 pb-4">
          <div className="p-8 md:p-10 rounded-3xl bg-secondary/10 border border-secondary/20 inline-block max-w-3xl w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-8xl font-serif">"</span>
            </div>
            <p className="text-xl md:text-2xl italic font-medium text-foreground relative z-10">
              "From one student who once needed an opportunity, to a platform creating opportunities for thousands."
            </p>
          </div>
        </section>

      </div>
    </main>
    <Footer />
  </div>
);

export default Support;
