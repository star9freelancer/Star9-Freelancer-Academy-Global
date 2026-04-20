import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus as PlusIcon, 
  X as XIcon, 
  Save as SaveIcon, 
  Award as AwardIcon, 
  Star as StarIcon,
  Link as LinkIcon, 
  Globe as GlobeIcon, 
  FileUp as FileUpIcon, 
  FileText as FileTextIcon, 
  MapPin as MapPinIcon, 
  LogOut as LogOutIcon
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface UserSettingsProps {
  user: any;
  profile: any;
  profileForm: any;
  setProfileForm: (form: any) => void;
  saving: boolean;
  handleSaveProfile: () => Promise<void>;
  newSkill: string;
  setNewSkill: (skill: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
  certificates: any[];
  handleLogout: () => void;
}

export const UserSettings = ({
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
}: UserSettingsProps) => {
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingDoc(true);
    
    // Upload to bucket
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/resume-${Date.now()}.${fileExt}`;
    const { error: uploadError, data } = await supabase.storage.from('user-documents').upload(filePath, file, { upsert: true });
    
    if (uploadError) {
      toast.error("Upload failed", { description: uploadError.message });
      setUploadingDoc(false);
      return;
    }

    // Insert into documents table
    const { data: publicUrlData } = supabase.storage.from('user-documents').getPublicUrl(filePath);
    
    try {
      const { error: dbError } = await supabase.from('documents').insert([
        { user_id: user.id, document_type: 'resume', file_url: publicUrlData.publicUrl }
      ]);

      if (dbError) {
        if (dbError.code === 'PGRST116') {
          toast.warning("Table 'documents' missing. Upload successful to storage, but metadata not saved.");
        } else {
          toast.error("Failed to link document", { description: dbError.message });
        }
      } else {
        toast.success("Resume uploaded successfully");
      }
    } catch (err) {
      console.error("Document link error:", err);
      toast.warning("Metadata sync failed, but document is available in storage.");
    }

    setUploadingDoc(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and account preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Form */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={profileForm.full_name || ""} 
                    onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                    placeholder="Personnel Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    value={user?.email || ""} 
                    disabled
                    className="opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <textarea 
                  value={profileForm.bio || ""}
                  onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                  placeholder="Tell us about your professional background..."
                  className="w-full min-h-[100px] bg-background border border-input rounded-md p-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input 
                    value={profileForm.city || ""} 
                    onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                    placeholder="e.g. Nairobi"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input 
                    value={profileForm.country || ""} 
                    onChange={(e) => setProfileForm({...profileForm, country: e.target.value})}
                    placeholder="e.g. Kenya"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    value={profileForm.phone_number || ""} 
                    onChange={(e) => setProfileForm({...profileForm, phone_number: e.target.value})}
                    placeholder="e.g. +254 ..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>National ID / Passport</Label>
                  <Input 
                    value={profileForm.national_id_passport || ""} 
                    onChange={(e) => setProfileForm({...profileForm, national_id_passport: e.target.value})}
                    placeholder="ID Number"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      value={profileForm.linkedin_url} 
                      onChange={(e) => setProfileForm({...profileForm, linkedin_url: e.target.value})}
                      className="pl-9"
                      placeholder="linkedin.com/in/..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Portfolio / Website</Label>
                  <div className="relative">
                    <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      value={profileForm.portfolio_url} 
                      onChange={(e) => setProfileForm({...profileForm, portfolio_url: e.target.value})}
                      className="pl-9"
                      placeholder="your-portfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Role Specific Fields */}
              <div className="pt-4 border-t border-border/50 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize text-[10px] font-mono tracking-widest">{profile?.role} Details</Badge>
                </div>

                {profile?.role === 'employer' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input 
                        value={profileForm.company_name} 
                        onChange={(e) => setProfileForm({...profileForm, company_name: e.target.value})}
                        placeholder="e.g. Acme Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Input 
                        value={profileForm.industry} 
                        onChange={(e) => setProfileForm({...profileForm, industry: e.target.value})}
                        placeholder="e.g. Technology"
                      />
                    </div>
                  </div>
                )}

                {profile?.role === 'student' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>University / School</Label>
                      <Input 
                        value={profileForm.institution} 
                        onChange={(e) => setProfileForm({...profileForm, institution: e.target.value})}
                        placeholder="e.g. City University"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree / Program</Label>
                      <Input 
                        value={profileForm.degree} 
                        onChange={(e) => setProfileForm({...profileForm, degree: e.target.value})}
                        placeholder="e.g. BSc Computer Science"
                      />
                    </div>
                  </div>
                )}

                {profile?.role === 'freelancer' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Professional Title</Label>
                      <Input 
                        value={profileForm.job_title} 
                        onChange={(e) => setProfileForm({...profileForm, job_title: e.target.value})}
                        placeholder="e.g. Visual Designer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      <Input 
                        type="number"
                        value={profileForm.experience_years} 
                        onChange={(e) => setProfileForm({...profileForm, experience_years: e.target.value})}
                        placeholder="e.g. 3"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Skills</CardTitle>
                <span className="text-xs text-muted-foreground">{profileForm.skills?.length || 0} added</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="Add a skill..."
                />
                <Button variant="outline" size="icon" onClick={addSkill}>
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileForm.skills?.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1.5 flex items-center gap-1.5">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                      <XIcon className="size-3" />
                    </button>
                  </Badge>
                ))}
                {(!profileForm.skills || profileForm.skills.length === 0) && (
                  <p className="text-sm text-muted-foreground">No skills added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Documents & Resume */}
          <Card>
             <CardHeader>
               <CardTitle className="text-base flex items-center gap-2"><FileTextIcon className="size-4 text-primary" /> Documents & Resume</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="border border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/30 transition-colors">
                   <FileUpIcon className="size-8 mx-auto mb-3 text-muted-foreground" />
                   <p className="text-sm font-medium mb-1">Upload your CV / Resume</p>
                   <p className="text-xs text-muted-foreground mb-4">PDF, DOCX up to 5MB</p>
                   <Button variant="outline" size="sm" className="relative cursor-pointer" disabled={uploadingDoc}>
                      {uploadingDoc ? "Uploading..." : "Select File"}
                      <input type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUploadResume} disabled={uploadingDoc} />
                   </Button>
                </div>
             </CardContent>
          </Card>

          <Button 
            onClick={handleSaveProfile} 
            disabled={saving}
            className="w-full h-12 gap-2"
          >
            {saving ? (
              <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <SaveIcon className="size-4" />
            )}
            Save Changes
          </Button>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-muted border border-border overflow-hidden mx-auto">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {profileForm.full_name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg">{profileForm.full_name || "Member"}</h4>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                  <MapPinIcon className="size-3" />
                  {profileForm.city || "Remote"}{profileForm.country ? `, ${profileForm.country}` : ""}
                </p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">Star9 Member</Badge>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <AwardIcon className="size-5 text-primary" />
                  <span className="text-sm text-foreground">Certificates</span>
                </div>
                <span className="font-semibold text-foreground">{certificates.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <StarIcon className="size-5 text-amber-500" />
                  <span className="text-sm text-foreground">Points</span>
                </div>
                <span className="font-semibold text-foreground">{profile?.merit_points || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 gap-2"
          >
            <LogOutIcon className="size-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};
