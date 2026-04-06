import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, X as XIcon, Save, ShieldCheck, Award, Users, 
  Link as LinkIcon, Globe, ArrowRight 
} from "lucide-react";

interface PersonnelSettingsProps {
  user: any;
  profile: any;
  profileForm: any;
  setProfileForm: (form: any) => void;
  saving: boolean;
  handleSaveProfile: () => void;
  newSkill: string;
  setNewSkill: (skill: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
  certificates: any[];
  handleLogout: () => void;
}

export const PersonnelSettings = ({
  user,
  profile,
  profileForm,
  setProfileForm,
  saving,
  handleSaveProfile,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  certificates,
  handleLogout
}: PersonnelSettingsProps) => {
  return (
    <div className="space-y-8 max-w-6xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- LEFT: Identity Form --- */}
        <div className="flex-1 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Full Name</Label>
              <Input 
                value={profileForm.full_name} 
                onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                placeholder="Your Name"
                className="bg-card/50 border-border/50 focus:border-primary/40 rounded-xl py-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email Address</Label>
              <Input 
                value={user?.email || ""} 
                disabled
                className="bg-muted/30 border-border/20 text-muted-foreground rounded-xl py-6 opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">About You / Bio</Label>
            <textarea 
              value={profileForm.bio}
              onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
              placeholder="Tell us about your professional background..."
              className="w-full min-h-[120px] bg-card/50 border border-border/50 focus:border-primary/40 rounded-xl p-4 text-sm outline-none transition-all"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">City</Label>
              <Input 
                value={profileForm.city} 
                onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                className="bg-card/50 border-border/50 rounded-xl py-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Country</Label>
              <Input 
                value={profileForm.country} 
                onChange={(e) => setProfileForm({...profileForm, country: e.target.value})}
                className="bg-card/50 border-border/50 rounded-xl py-6"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">LinkedIn URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-blue-500" />
                <Input 
                  value={profileForm.linkedin_url} 
                  onChange={(e) => setProfileForm({...profileForm, linkedin_url: e.target.value})}
                  className="pl-9 bg-card/50 border-border/50 rounded-xl py-6"
                  placeholder="linkedin.com/in/..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Portfolio / Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-secondary" />
                <Input 
                  value={profileForm.portfolio_url} 
                  onChange={(e) => setProfileForm({...profileForm, portfolio_url: e.target.value})}
                  className="pl-9 bg-card/50 border-border/50 rounded-xl py-6"
                  placeholder="your-portfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Proficiency Manager */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Your Skills</Label>
              <Badge variant="outline" className="text-[9px] border-primary/20 opacity-60 font-mono">{profileForm.skills?.length || 0} ITEMS</Badge>
            </div>
            <div className="flex gap-2">
              <Input 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a new skill..."
                className="bg-card/50 border-border/50 rounded-xl py-6"
              />
              <button 
                onClick={addSkill} 
                className="shrink-0 h-[52px] w-[52px] bg-primary/20 text-primary hover:bg-primary/30 rounded-xl border border-primary/20 transition-all flex items-center justify-center"
              >
                <Plus className="size-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileForm.skills?.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 rounded-xl bg-zinc-950 border border-white/5 flex items-center gap-2 group transition-all hover:border-red-500/30">
                  <span className="text-[10px] font-mono tracking-tight uppercase tracking-widest font-bold">{skill}</span>
                  <button onClick={() => removeSkill(skill)} className="hover:text-red-400 opacity-40 group-hover:opacity-100 transition-opacity">
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Button 
              onClick={handleSaveProfile} 
              disabled={saving}
              className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-2xl font-mono text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              {saving ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Save Profile Changes
            </Button>
          </div>
        </div>

        {/* --- RIGHT: Digital Identity Preview --- */}
        <div className="w-full lg:w-96 shrink-0 space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground pl-2 leading-relaxed text-center lg:text-left">Account Info</h3>
          
          {/* Premium ID Card */}
          <div className="relative aspect-[1.6/1] w-full bg-zinc-950 rounded-[2.5rem] border border-white/10 shadow-2xl p-8 overflow-hidden group hover:border-primary/30 transition-all duration-500 mx-auto max-w-sm lg:max-w-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] animate-pulse pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 blur-[60px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80 font-black">Star9 Academy</p>
                  <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-zinc-600">ID: {user?.id?.substring(0, 12)}</p>
                </div>
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <ShieldCheck className="size-6 text-primary" />
                </div>
              </div>

              <div className="mt-6 flex items-end gap-6">
                <div className="w-16 h-20 bg-zinc-900 rounded-xl border border-white/10 overflow-hidden shrink-0 shadow-inner group-hover:border-primary/50 transition-all duration-500 grayscale group-hover:grayscale-0">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} className="w-full h-full object-cover brightness-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black font-black text-2xl uppercase">
                      {profileForm.full_name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <p className="text-xl font-black tracking-tighter text-white whitespace-nowrap overflow-hidden text-ellipsis uppercase">
                    {profileForm.full_name || "New User"}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest truncate">
                      {profileForm.city || "Online Member"}
                    </p>
                    <div className="size-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/20 text-[8px] h-4 font-mono px-2 rounded-sm mt-1">STAR9_MEMBER</Badge>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center bg-zinc-900/40 -mx-8 -mb-8 px-8 py-5 backdrop-blur-md border-t border-white/10">
                <div className="flex gap-2">
                  <div className="size-4 rounded-sm bg-zinc-800 border border-white/5" />
                  <div className="size-4 rounded-sm bg-zinc-800 border border-white/5" />
                  <div className="size-4 rounded-sm bg-zinc-800 border border-white/5" />
                </div>
                <p className="text-[9px] font-mono tracking-tighter text-zinc-600 font-bold uppercase">SECURED @ BY_STAR9</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="grid gap-3 pt-6">
            <div className="p-5 bg-zinc-900/40 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-primary/40 transition-all cursor-default shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10"><Award className="size-5" /></div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">Certificates</p>
                  <p className="text-sm font-black tracking-tighter font-mono">{certificates.length} COMPLETED</p>
                </div>
              </div>
              <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-all text-primary -translate-x-2 group-hover:translate-x-0" />
            </div>
            <div className="p-5 bg-zinc-900/40 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-secondary/40 transition-all cursor-default shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/10"><Sparkles className="size-5" /></div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">Member Points</p>
                  <p className="text-sm font-black tracking-tighter font-mono">{profile?.merit_points || 0} POINTS</p>
                </div>
              </div>
              <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-all text-secondary -translate-x-2 group-hover:translate-x-0" />
            </div>
          </div>
          
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 py-8 rounded-2xl font-mono text-[10px] uppercase tracking-widest shadow-lg shadow-red-500/5 active:scale-95 transition-all"
          >
            Log Out of Account
          </Button>
        </div>
      </div>
    </div>
  );
};
