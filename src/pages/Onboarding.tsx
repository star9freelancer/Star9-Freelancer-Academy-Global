import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  Building2 as Building2Icon, 
  GraduationCap as GraduationCapIcon, 
  Briefcase as BriefcaseIcon, 
  Rocket as RocketIcon, 
  ArrowRight as ArrowRightIcon, 
  ArrowLeft as ArrowLeftIcon, 
  CheckCircle2 as CheckCircle2Icon, 
  Loader2 as Loader2Icon,
  Globe as GlobeIcon, 
  Users as UsersIcon, 
  Target as TargetIcon, 
  Sparkles as SparklesIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/logo_highres.jpg";

const Onboarding = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<any>({
    company_name: "",
    industry: "",
    job_title: "",
    institution: "",
    degree: "",
    graduation_year: "",
    experience_years: "",
    skills: [],
    city: "",
    country: ""
  });

  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate("/academy");
    }
    if (profile) {
      setFormData(prev => ({
        ...prev,
        city: profile.city || "",
        country: profile.country || ""
      }));
    }
  }, [profile, navigate]);

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      const payload = { ...formData };
      if (payload.experience_years === "") {
        payload.experience_years = null;
      } else {
        payload.experience_years = parseInt(payload.experience_years, 10);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          ...payload,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

      if (error) throw error;
      
      await refreshProfile();
      toast.success("Profile Setup Complete!", {
        description: "Welcome to the Star9 ecosystem."
      });
      navigate("/academy");
    } catch (error: any) {
      toast.error("Error saving profile", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    const role = profile?.role || 'student';

    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2 mb-8">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {role === 'employer' && <Building2Icon className="size-8 text-primary" />}
                {role === 'student' && <GraduationCapIcon className="size-8 text-primary" />}
                {role === 'freelancer' && <BriefcaseIcon className="size-8 text-primary" />}
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Tell us about yourself</h2>
              <p className="text-muted-foreground">We'll customize your experience based on your role as a <span className="text-primary font-semibold capitalize">{role}</span>.</p>
            </div>

            <div className="space-y-4">
              {role === 'employer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input 
                      id="company" 
                      placeholder="e.g. Acme Corp" 
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      placeholder="e.g. Technology, Education" 
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job_title">Your Position</Label>
                    <Input 
                      id="job_title" 
                      placeholder="e.g. HR Manager, CEO" 
                      value={formData.job_title}
                      onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                    />
                  </div>
                </>
              )}

              {role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="institution">University / Institution</Label>
                    <Input 
                      id="institution" 
                      placeholder="e.g. University of Nairobi" 
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree / Course of Study</Label>
                    <Input 
                      id="degree" 
                      placeholder="e.g. Computer Science" 
                      value={formData.degree}
                      onChange={(e) => setFormData({...formData, degree: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grad">Expected Graduation Year</Label>
                    <Input 
                      id="grad" 
                      placeholder="e.g. 2025" 
                      value={formData.graduation_year}
                      onChange={(e) => setFormData({...formData, graduation_year: e.target.value})}
                    />
                  </div>
                </>
              )}

              {role === 'freelancer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Main Profession / Job Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g. Full Stack Developer" 
                      value={formData.job_title}
                      onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exp">Years of Experience</Label>
                    <Input 
                      id="exp" 
                      type="number" 
                      placeholder="e.g. 5" 
                      value={formData.experience_years}
                      onChange={(e) => setFormData({...formData, experience_years: e.target.value})}
                    />
                  </div>
                </>
              )}
            </div>

            <Button className="w-full h-12 gap-2" onClick={() => setStep(2)}>
              Continue <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2 mb-8">
              <div className="size-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <GlobeIcon className="size-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Location & Reach</h2>
              <p className="text-muted-foreground">Help us connect you with local and global opportunities.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  placeholder="e.g. Nairobi" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  placeholder="e.g. Kenya" 
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
               <div className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <SparklesIcon className="size-5 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">By completing your profile, you unlock access to our verified global job board and premium learning tracks.</p>
               </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="h-12 w-20" onClick={() => setStep(1)}>
                <ArrowLeftIcon className="size-4" />
              </Button>
              <Button className="flex-1 h-12 gap-2" onClick={handleComplete} disabled={loading}>
                {loading ? <Loader2Icon className="size-4 animate-spin" /> : <><RocketIcon className="size-4" /> Finalize Setup</>}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute hidden md:block top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute hidden md:block bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Star9" className="h-10 w-auto" />
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-xl bg-card/80">
          <CardContent className="pt-10 pb-8 px-8">
            {renderStep()}

            <div className="mt-10 flex justify-center gap-1.5">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-primary' : 'w-2 bg-muted'}`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
