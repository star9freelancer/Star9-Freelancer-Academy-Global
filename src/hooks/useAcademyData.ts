import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: "video" | "quiz" | "reading";
  content?: string;
  videoUrl?: string;
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correct: number;
    }[];
  };
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  lessons_count: number;
  instructor: string;
  image: string;
  modules: Module[];
}

export const CURRICULUM_LEDGER: Record<string, Module[]> = {
  // Mastering Freelancing
  "22222222-2222-2222-2222-222222222222": [
    {
      id: "m1",
      title: "Module 1: The Sovereign Mindset",
      lessons: [
        { id: "l1", title: "Digital Sovereignty: Owning Your Career", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2", title: "Niche Selection & Market Arbitrage", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l3", title: "Activity: Personal Value Proposition", duration: "10:00", isCompleted: false, type: "article", content: "# Crafting Your Value\nYour value is not your time; it is the **delta** between the client's current pain and their future success.\n\n### Reflection Questions:\n- What high-ticket problem do you solve?\n- Why should a US/EU client choose you over a local agency?" }
      ]
    },
    {
      id: "m2",
      title: "Module 2: High-Ticket Presentation",
      lessons: [
        { id: "l4", title: "Personal Branding for Global Trusts", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l5", title: "Portfolio Engineering: Show, Don't Tell", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l6", title: "Quiz: Branding Essentials", duration: "15:00", isCompleted: false, type: "quiz", quiz: {
          questions: [
            { question: "Which element of a portfolio is most important to a high-ticket client?", options: ["The color palette", "Clear ROI case studies", "A long list of every skill you have", "Your personal hobbies"], correct: 1 }
          ]
        }}
      ]
    },
    {
      id: "m3",
      title: "Module 3: Global Sales & Proposals",
      lessons: [
        { id: "l7", title: "The Psychology of Rejection & Persistence", duration: "12:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l8", title: "Toolkit: Winning Proposal Templates", duration: "5:00", isCompleted: false, type: "toolkit", quiz: {
          resources: [
            { title: "Proposal Blueprint v1", desc: "Standard 3-tier pricing template for most service types.", type: "PDF" }
          ]
        }}
      ]
    }
  ],
  // AI Mastery
  "11111111-1111-1111-1111-111111111111": [
    {
      id: "m1",
      title: "Module 1: The AI Revolution",
      lessons: [
        { id: "l1", title: "Understanding LLMs: Beyond the Hype", duration: "14:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2", title: "Setting Up Your AI Tech Stack", duration: "10:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
      ]
    },
    {
      id: "m2",
      title: "Module 2: Prompt Engineering Mastery",
      lessons: [
        { id: "l3", title: "Frameworks: CO-STAR and Beyond", duration: "20:00", isCompleted: false, type: "article", content: "# Advanced Prompting\nMastering AI is about mastering the **intent-output bridge**.\n\n### The CO-STAR Framework:\n- **C**ontext: Provide background.\n- **O**bjective: State the goal.\n- **S**tyle: Define the tone.\n- **T**one: Emotional resonance.\n- **A**udience: Who is this for?\n- **R**esponse: Format requirements." },
        { id: "l4", title: "Prompt Playground: Live Testing", duration: "30:00", isCompleted: false, type: "playground", content: "Test your frameworks here before deploying as client deliverables.", quiz: {
          prompts: [
            { title: "Client Strategy Prompt", code: "Act as a Senior Business Consultant. Create a 3-month growth plan for a SaaS startup specializing in..." }
          ]
        }}
      ]
    },
    {
      id: "m3",
      title: "Module 3: Workflow Automation",
      lessons: [
        { id: "l5", title: "Connecting AI to the Real World", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l6", title: "Checklist: Deploying Your First Bot", duration: "10:00", isCompleted: false, type: "checklist", quiz: {
          tasks: [
            { id: "t1", title: "Map out the workflow", instruction: "Line up every step from trigger to completion." },
            { id: "t2", title: "Connect via Zapier/Make", instruction: "Ensure data flows seamlessly between nodes." }
          ]
        }}
      ]
    }
  ],
  // Teacher Preparation
  "33333333-3333-3333-3333-333333333333": [
    {
      id: "m1",
      title: "Phase 1: Global Vetting",
      lessons: [
        { id: "l1", title: "The International Teaching Landscape", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2", title: "Document Vetting & Credential Evaluation", duration: "20:00", isCompleted: false, type: "article", content: "# Vetting Mastery\nWorking globally requires recognized credentials.\n\n### Essential Requirements:\n- Verifiable Degree\n- English Proficiency (C1/C2)\n- Experience Ledger" }
      ]
    },
    {
      id: "m2",
      title: "Phase 2: Pedagogy & Design",
      lessons: [
        { id: "l3", title: "Curriculum Design for Modern Learners", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l4", title: "Activity: Creating a Lesson Simulator", duration: "30:00", isCompleted: false, type: "simulator", quiz: {
           scenarios: [
             { context: "A student is disengaged in a virtual classroom.", prompt: "How do you pivot the lesson?", options: [{ text: "Reprimand them", explanation: "Negative reinforcement rarely works in digital spaces." }, { text: "Gamify the next concept", explanation: "Gamification increases retention and engagement instantly." }], correct: 1 }
           ]
        }}
      ]
    }
  ]
};

export const useAcademyData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch Courses
  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["academy_courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_courses")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;

      return (data || [])
        .map(course => ({
          ...course,
          modules: CURRICULUM_LEDGER[course.id] || []
        }));
    }
  });

  // Fetch Enrollments
  const { data: enrollmentsRaw = [], isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ["user_enrollments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_enrollments")
        .select("*")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Enrollments map for easy lookup
  const enrollments = new Map(enrollmentsRaw.map(e => [e.course_id, e]));

  // Fetch Certificates
  const { data: certificates = [], isLoading: isLoadingCertificates } = useQuery({
    queryKey: ["user_certificates", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_certificates")
        .select("*, academy_courses(title)")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["academy_courses"] });
    queryClient.invalidateQueries({ queryKey: ["user_enrollments", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["user_certificates", user?.id] });
  };

  return {
    courses,
    enrollments,
    certificates,
    isLoading: isLoadingCourses || isLoadingEnrollments || isLoadingCertificates,
    invalidateAll
  };
};
