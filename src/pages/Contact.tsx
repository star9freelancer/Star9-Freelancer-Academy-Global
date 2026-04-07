import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Globe } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent!", { description: "We'll get back to you within 24-48 hours." });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">Get in Touch</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Have a question, partnership inquiry, or need support? We'd love to hear from you.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:info@star9freelancer.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">info@star9freelancer.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">Kenya</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Globe className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Website</p>
                    <a href="https://star9freelancer.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">star9freelancer.com</a>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-xl border border-border bg-card">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <textarea 
                  placeholder="Tell us more..."
                  required
                  className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button type="submit" className="w-full h-12" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
