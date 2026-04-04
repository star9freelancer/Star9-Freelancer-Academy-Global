import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { BadgeCheck, ShieldCheck, Award, Globe, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo_transparent.png";

const Verify = () => {
  const { credentialId } = useParams<{ credentialId: string }>();
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_certificates')
          .select(`
            *,
            academy_courses (title, category),
            profiles (full_name, avatar_url)
          `)
          .eq('credential_id', credentialId)
          .single();

        if (error || !data) {
          setError("Credential not found in our decentralized infrastructure.");
        } else {
          setCert(data);
        }
      } catch (err) {
        setError("Network error validating credential.");
      } finally {
        setLoading(false);
      }
    };

    if (credentialId) fetchCertificate();
  }, [credentialId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Synchronizing with Star9 Ledger...</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <ShieldCheck className="w-16 h-16 text-red-500 mb-6 opacity-20" />
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">Validation Failure</h1>
        <p className="text-muted-foreground mb-8">{error}</p>
        <Button asChild variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
          <Link to="/">Back to Main Domain</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      {/* Public Header */}
      <header className="h-20 border-b flex items-center justify-between px-6 md:px-12 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Star9" className="h-[48px] w-auto brightness-200" />
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Globe className="size-3" /> Ledger ID: {cert.credential_id}
        </div>
      </header>

      <main className="container max-w-4xl py-12 md:py-24 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 font-mono text-[10px] uppercase tracking-[0.2em] animate-in zoom-in duration-500">
            <BadgeCheck className="size-4" /> Authenticated Credential
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Credential Proof</h1>
          <p className="text-muted-foreground text-lg italic">Star9 Infrastructure Academy Validation Portal</p>
        </div>

        <Card className="glass border-primary/20 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
          <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[80px]" />
          
          <CardHeader className="text-center space-y-6 pt-12 pb-8 border-b border-primary/10">
            <div className="space-y-2">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80">Star9 Certification of Mastery</p>
              <CardTitle className="text-4xl md:text-5xl font-serif text-foreground/90 italic tracking-tight">{cert.academy_courses?.title}</CardTitle>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center p-3">
                  <Award className="w-full h-full text-primary" />
               </div>
               <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Certified Curriculum Hub</p>
            </div>
          </CardHeader>

          <CardContent className="py-12 md:px-24 space-y-12 text-center">
            <div className="space-y-4">
              <p className="text-muted-foreground italic">Successfully conferred upon</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">{cert.profiles?.full_name}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-primary/5 text-left">
               <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Issue Date</p>
                  <p className="font-bold text-lg">{new Date(cert.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
               </div>
               <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Classification</p>
                  <p className="font-bold text-lg">{cert.academy_courses?.category}</p>
               </div>
               <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Credential Hash</p>
                  <p className="font-mono text-sm font-bold text-primary">{cert.credential_id}</p>
               </div>
               <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</p>
                  <p className="font-bold text-green-500 uppercase tracking-widest text-sm flex items-center gap-1.5"><ShieldCheck className="size-4" /> Validated</p>
               </div>
            </div>
          </CardContent>

          <CardFooter className="bg-zinc-900/50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 bg-primary/10 flex items-center justify-center font-bold text-primary">
                 {cert.profiles?.avatar_url ? (
                   <img src={cert.profiles.avatar_url} alt="Personnel" className="w-full h-full object-cover" />
                 ) : (
                   cert.profiles?.full_name?.charAt(0) || "P"
                 )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-tight">{cert.profiles?.full_name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">Verified Star9 Personnel</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
                <Link to="/academy" className="gap-2">Join Academy <BookOpen className="size-3" /></Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 pb-24">
           <Card className="p-6 glass border-border/50 space-y-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <ShieldCheck className="size-4" />
              </div>
              <h4 className="font-bold uppercase tracking-tight text-xs">Immutable Ledger Protection</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">This credential is locked to the Star9 Infrastructure Ledger and cannot be altered or forged. Every issuance generates a unique cryptographic ID for employer verification.</p>
           </Card>
           <Card className="p-6 glass border-border/50 space-y-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <Globe className="size-4" />
              </div>
              <h4 className="font-bold uppercase tracking-tight text-xs">Global Reciprocal Recognition</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Accepted by our international network of remote partners, this certificate denotes exceptional mastery of technical and operational protocols in the Star9 ecosystem.</p>
           </Card>
        </div>
      </main>

      <footer className="h-32 border-t border-border/10 flex flex-col items-center justify-center space-y-2">
         <img src={logo} alt="Star9" className="h-[24px] opacity-30 grayscale" />
         <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground opacity-50">Authorized Infrastructure Endpoint</p>
      </footer>
    </div>
  );
};

export default Verify;
