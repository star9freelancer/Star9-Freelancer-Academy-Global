import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus as PlusIcon, 
  Briefcase as BriefcaseIcon, 
  MapPin as MapPinIcon, 
  DollarSign as DollarSignIcon,
  CheckCircle2 as CheckCircle2Icon,
  XCircle as XCircleIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const EmployerDashboard = ({ user, profile }: { user: any; profile: any }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: profile?.company_name || "",
    location: "",
    type: "Remote Work",
    salary_range: "",
    description: "",
    requirements: [] as string[],
    submission_requirements: [] as string[],
    application_url: ""
  });
  const [reqInput, setReqInput] = useState("");
  const [subReqInput, setSubReqInput] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, [user]);

  const fetchMyJobs = async () => {
    setLoading(true);
    // Filter by employer_id (user.id) for jobs posted by this employer
    const { data, error } = await supabase
      .from('academy_jobs')
      .select('*')
      .eq('employer_id', user.id)
      .order('posted_at', { ascending: false });
      
    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const handleCreateJob = async () => {
    if (!newJob.title || !newJob.company) {
      toast.error("Title and Company are required.");
      return;
    }
    
    // Merge submission requirements into requirements array so JobBoard renders it natively
    const finalRequirements = [...newJob.requirements];
    if (newJob.submission_requirements.length > 0) {
      finalRequirements.push("SUBMISSIONS REQUIRED:");
      newJob.submission_requirements.forEach(req => finalRequirements.push(`✓ ${req}`));
    }

    const { error } = await supabase.from('academy_jobs').insert([{
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      type: newJob.type,
      salary_range: newJob.salary_range,
      description: newJob.description,
      requirements: finalRequirements,
      application_url: newJob.application_url,
      employer_id: user.id,
      is_active: true
    }]);

    if (!error) {
      toast.success("Job posted successfully!");
      setIsCreating(false);
      setNewJob({ ...newJob, title: "", location: "", salary_range: "", description: "", requirements: [], submission_requirements: [], application_url: "" });
      fetchMyJobs();
    } else {
      toast.error("Failed to post job: " + error.message);
    }
  };

  const toggleJobStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('academy_jobs').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) {
      setJobs(jobs.map(j => j.id === id ? { ...j, is_active: !currentStatus } : j));
      toast.success("Job status updated");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">Employer Hub</h2>
          <p className="text-muted-foreground mt-1">Manage your job postings and hiring requirements.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="gap-2">
          {isCreating ? "Cancel" : <><PlusIcon className="size-4" /> Post New Role</>}
        </Button>
      </div>

      {isCreating ? (
        <Card className="p-6 md:p-8 space-y-8 border-primary/20 bg-card">
          <div>
            <h3 className="text-xl font-bold">Create Job Posting</h3>
            <p className="text-sm text-muted-foreground">Fill out the details for your new open position.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Job Title *</Label>
              <Input placeholder="e.g. Senior Frontend Developer" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Company Name *</Label>
              <Input placeholder="Company Name" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="e.g. Remote, New York" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label>Job Type</Label>
                 <select className="w-full h-10 px-3 bg-background border border-input rounded-md text-sm" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                   <option value="Remote Work">Remote Work</option>
                   <option value="Full-Time">Full-Time</option>
                   <option value="Contract">Contract</option>
                   <option value="Freelance">Freelance</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <Label>Salary Range</Label>
                 <Input placeholder="e.g. $80k - $120k" value={newJob.salary_range} onChange={e => setNewJob({...newJob, salary_range: e.target.value})} />
               </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Job Description</Label>
            <textarea 
              className="w-full min-h-[120px] p-3 bg-background border border-input rounded-md text-sm" 
              placeholder="Describe the role and responsibilities..."
              value={newJob.description}
              onChange={e => setNewJob({...newJob, description: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-border">
            {/* General Requirements */}
            <div className="space-y-4">
              <div>
                <Label>Required Skills / Experience</Label>
                <p className="text-[10px] text-muted-foreground mb-2">Add general skills required for this role.</p>
                <div className="flex gap-2">
                  <Input placeholder="e.g. 5+ years React" value={reqInput} onChange={e => setReqInput(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); if(reqInput.trim()) { setNewJob({...newJob, requirements: [...newJob.requirements, reqInput.trim()]}); setReqInput(''); }}}} />
                  <Button type="button" variant="secondary" onClick={() => { if(reqInput.trim()) { setNewJob({...newJob, requirements: [...newJob.requirements, reqInput.trim()]}); setReqInput(''); }}}>Add</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {newJob.requirements.map((req, i) => (
                  <Badge key={i} variant="outline" className="gap-1 px-2 py-1">
                    {req} <XCircleIcon className="size-3 cursor-pointer hover:text-destructive" onClick={() => setNewJob({...newJob, requirements: newJob.requirements.filter((_, idx) => idx !== i)})} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Submission Requirements */}
            <div className="space-y-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div>
                <Label className="text-primary font-bold">Applicant Submission Requirements</Label>
                <p className="text-[10px] text-muted-foreground mb-2">What exactly must the applicant submit? (e.g. Loom video link, GitHub profile, PDF Resume)</p>
                <div className="flex gap-2">
                  <Input className="border-primary/30" placeholder="e.g. 2-minute Loom Video" value={subReqInput} onChange={e => setSubReqInput(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); if(subReqInput.trim()) { setNewJob({...newJob, submission_requirements: [...newJob.submission_requirements, subReqInput.trim()]}); setSubReqInput(''); }}}} />
                  <Button type="button" onClick={() => { if(subReqInput.trim()) { setNewJob({...newJob, submission_requirements: [...newJob.submission_requirements, subReqInput.trim()]}); setSubReqInput(''); }}}>Add Req</Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {newJob.submission_requirements.map((req, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md bg-background border border-primary/10 text-sm">
                    <span className="flex items-center gap-2"><CheckCircle2Icon className="size-4 text-emerald-500" /> {req}</span>
                    <XCircleIcon className="size-4 text-muted-foreground cursor-pointer hover:text-destructive" onClick={() => setNewJob({...newJob, submission_requirements: newJob.submission_requirements.filter((_, idx) => idx !== i)})} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Label>Application URL or Email</Label>
            <Input placeholder="Where should candidates apply? (e.g. https://... or mailto:...)" value={newJob.application_url} onChange={e => setNewJob({...newJob, application_url: e.target.value})} />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button size="lg" onClick={handleCreateJob} className="font-bold">Post Job to Network</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <h3 className="font-bold text-xl mb-2">Your Active Listings</h3>
          {loading ? (
            <div className="h-32 rounded-xl bg-muted animate-pulse" />
          ) : jobs.length === 0 ? (
            <Card className="p-12 text-center border-dashed text-muted-foreground">
              <BriefcaseIcon className="size-12 mx-auto mb-4 opacity-20" />
              <p>You have not posted any roles yet.</p>
              <Button variant="link" onClick={() => setIsCreating(true)}>Post your first job</Button>
            </Card>
          ) : (
            jobs.map(job => (
              <Card key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold">{job.title}</h4>
                    <Badge variant={job.is_active ? "default" : "secondary"} className={job.is_active ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}>
                      {job.is_active ? "Active" : "Closed"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPinIcon className="size-3.5" /> {job.location || "Remote"}</span>
                    <span className="flex items-center gap-1"><DollarSignIcon className="size-3.5" /> {job.salary_range || "DOE"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={() => toggleJobStatus(job.id, job.is_active)}>
                    {job.is_active ? "Mark as Closed" : "Re-open Role"}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
