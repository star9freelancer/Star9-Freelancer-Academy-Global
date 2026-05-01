import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: "video" | "quiz" | "article" | "toolkit" | "checklist" | "simulator" | "playground";
  content?: string;
  videoUrl?: string;
  quiz_data?: any;
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
        { id: "l3", title: "Activity: Personal Value Proposition", duration: "10:00", isCompleted: false, type: "article", content: "![Freelancer Setup](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800)\n\n# Crafting Your Value\nYour value is not your time; it is the **delta** between the client's current pain and their future success.\n\n### Reflection Questions:\n- What high-ticket problem do you solve?\n- Why should a US/EU client choose you over a local agency?" },
        { id: "l3b", title: "Quiz: The Freelance Mindset", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What is the primary factor that determines your freelance value?", options: ["The number of hours you work", "The magnitude of the problem you solve", "Your local geographic market rate", "The number of tools you know"], correctAnswer: 1 },
            { question: "Market Arbitrage in freelancing refers to:", options: ["Selling services across borders to leverage currency differences", "Trading stocks while freelancing", "Working multiple jobs simultaneously", "Outsourcing your work to AI"], correctAnswer: 0 }
          ]
        }}
      ]
    },
    {
      id: "m2",
      title: "Module 2: High-Ticket Presentation",
      lessons: [
        { id: "l4", title: "Personal Branding for Global Trusts", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l5", title: "Portfolio Engineering: Show, Don't Tell", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l5b", title: "The Anatomy of a High-Converting Profile", duration: "12:00", isCompleted: false, type: "article", content: "![Business Setup](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800)\n\n# Profile Mastery\nWhen clients view your Upwork or LinkedIn profile, they are looking for **trust signals**.\n\n### Key Components:\n- **Professional Headshot:** High contrast, good lighting.\n- **Clear Headline:** Result-oriented (e.g., 'Helping B2B SaaS Scale via React').\n- **Social Proof:** Testimonials and case studies placed prominently." },
        { id: "l6", title: "Quiz: Branding Essentials", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "Which element of a portfolio is most important to a high-ticket client?", options: ["The color palette", "Clear ROI case studies", "A long list of every skill you have", "Your personal hobbies"], correctAnswer: 1 },
            { question: "What should your profile headline focus on?", options: ["Your employment history", "Your college degree", "The results you deliver to clients", "Your geographical location"], correctAnswer: 2 }
          ]
        }}
      ]
    },
    {
      id: "m3",
      title: "Module 3: Global Sales & Proposals",
      lessons: [
        { id: "l7", title: "The Psychology of Rejection & Persistence", duration: "12:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l7b", title: "Structuring Winning Proposals", duration: "20:00", isCompleted: false, type: "article", content: "![Proposals](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800)\n\n# The Art of the Pitch\nDo not copy-paste templates blindly. Tailor your hook to the client's unique problem.\n\n### The 3-Part Hook:\n- **Acknowledge:** Restate their problem.\n- **Validate:** Provide a mini-audit or quick solution.\n- **Call to Action:** Ask a qualifying question to initiate a chat." },
        { id: "l8", title: "Toolkit: Winning Proposal Templates", duration: "5:00", isCompleted: false, type: "toolkit", quiz_data: {
          resources: [
            { title: "Proposal Blueprint v1", desc: "Standard 3-tier pricing template for most service types.", type: "PDF" },
            { title: "Discovery Call Script", desc: "Questions to ask during your first client meeting.", type: "PDF" }
          ]
        }},
        { id: "l9", title: "Quiz: Sales Mastery", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What is the best way to start a proposal?", options: ["Hello sir/madam", "Restating the client's problem", "Listing your years of experience", "Giving a generic greeting"], correctAnswer: 1 },
            { question: "During a discovery call, who should speak more?", options: ["You", "The client", "An equal 50/50 split", "Neither"], correctAnswer: 1 }
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
        { id: "l2", title: "Setting Up Your AI Tech Stack", duration: "10:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2b", title: "The AI Mindset Shift", duration: "15:00", isCompleted: false, type: "article", content: "![AI Tech](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800)\n\n# Thinking in AI\nTo master AI, you must move from 'Search' to 'Synthesis'.\n\n### The Future of Work:\n- **Augmentation, not Replacement:** AI handles the grunt work; you handle the strategy.\n- **Infinite Leverage:** One person can now do the work of a 5-person agency." }
      ]
    },
    {
      id: "m2",
      title: "Module 2: Prompt Engineering Mastery",
      lessons: [
        { id: "l3", title: "Frameworks: CO-STAR and Beyond", duration: "20:00", isCompleted: false, type: "article", content: "![Prompting](https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800)\n\n# Advanced Prompting\nMastering AI is about mastering the **intent-output bridge**.\n\n### The CO-STAR Framework:\n- **C**ontext: Provide background.\n- **O**bjective: State the goal.\n- **S**tyle: Define the tone.\n- **T**one: Emotional resonance.\n- **A**udience: Who is this for?\n- **R**esponse: Format requirements." },
        { id: "l4", title: "Prompt Playground: Live Testing", duration: "30:00", isCompleted: false, type: "playground", content: "Test your frameworks here before deploying as client deliverables.", quiz_data: {
          prompts: [
            { title: "Client Strategy Prompt", code: "Act as a Senior Business Consultant. Create a 3-month growth plan for a SaaS startup specializing in..." }
          ]
        }},
        { id: "l4b", title: "Quiz: Prompting Foundations", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What does the 'S' in CO-STAR stand for?", options: ["Strategy", "Style", "Synthesis", "Structure"], correctAnswer: 1 },
            { question: "Why is Context important in a prompt?", options: ["It makes the response longer", "It helps the AI narrow down relevant training data", "It is not important", "It makes the prompt look professional"], correctAnswer: 1 }
          ]
        }}
      ]
    },
    {
      id: "m3",
      title: "Module 3: Workflow Automation",
      lessons: [
        { id: "l5", title: "Connecting AI to the Real World", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l6", title: "Checklist: Deploying Your First Bot", duration: "10:00", isCompleted: false, type: "checklist", quiz_data: {
          tasks: [
            { id: "t1", title: "Map out the workflow", instruction: "Line up every step from trigger to completion." },
            { id: "t2", title: "Connect via Zapier/Make", instruction: "Ensure data flows seamlessly between nodes." }
          ]
        }},
        { id: "l7", title: "The Ethics of Automation", duration: "12:00", isCompleted: false, type: "article", content: "![Automation](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800)\n\n# Ethical AI\nWith great power comes great responsibility. Transparency is key when using AI for client work.\n\n### Best Practices:\n- **Disclose Usage:** Let clients know when AI is part of the process.\n- **Human-in-the-Loop:** Always verify AI outputs for accuracy and bias." }
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
        { id: "l2", title: "Document Vetting & Credential Evaluation", duration: "20:00", isCompleted: false, type: "article", content: "![Teaching Credentials](https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800)\n\n# Vetting Mastery\nWorking globally requires recognized credentials.\n\n### Essential Requirements:\n- Verifiable Degree\n- English Proficiency (C1/C2)\n- Experience Ledger" },
        { id: "l2b", title: "Quiz: Vetting Protocols", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What level of English proficiency is generally required for international placements?", options: ["A1/A2", "B1/B2", "C1/C2", "None required"], correctAnswer: 2 }
          ]
        }}
      ]
    },
    {
      id: "m2",
      title: "Phase 2: Pedagogy & Design",
      lessons: [
        { id: "l3", title: "Curriculum Design for Modern Learners", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l3b", title: "Engaging Digital Classrooms", duration: "20:00", isCompleted: false, type: "article", content: "![Classroom Tech](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800)\n\n# Digital Engagement\nModern teaching requires interactive touchpoints every 5 minutes.\n\n### Techniques:\n- Use polls and quick quizzes.\n- Breakout rooms for peer learning.\n- Gamified reward systems." },
        { id: "l4", title: "Activity: Creating a Lesson Simulator", duration: "30:00", isCompleted: false, type: "simulator", quiz_data: {
           scenarios: [
             { context: "A student is disengaged in a virtual classroom.", prompt: "How do you pivot the lesson?", options: [{ text: "Reprimand them", explanation: "Negative reinforcement rarely works in digital spaces." }, { text: "Gamify the next concept", explanation: "Gamification increases retention and engagement instantly." }], correct: 1 }
           ]
        }},
        { id: "l5", title: "Quiz: Pedagogy Review", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "How frequently should you include interactive touchpoints in a digital lesson?", options: ["Every 60 minutes", "Every 5 minutes", "Only at the end", "Never"], correctAnswer: 1 }
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
  const coursesQuery = useQuery({
    queryKey: ["academy_courses"],
    retry: 1, // Don't hang on retries
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_courses")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;

      return (data || [])
        .filter(course => !course.title.toLowerCase().includes("teacher preparation") && !course.title.toLowerCase().includes("teacher prep"))
        .map(course => ({
          ...course,
          title: course.title === "Freelancing Essentials" ? "Mastering Freelancing" : course.title,
          modules: CURRICULUM_LEDGER[course.id] || []
        }));
    }
  });

  const courses = coursesQuery.data || [];
  const isLoadingCourses = coursesQuery.isLoading;

  // Fetch Enrollments
  const enrollmentsQuery = useQuery({
    queryKey: ["user_enrollments", user?.id],
    retry: 1,
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

  const enrollmentsRaw = enrollmentsQuery.data || [];
  const isLoadingEnrollments = enrollmentsQuery.isLoading;

  // Enrollments map for easy lookup
  const enrollments = new Map(enrollmentsRaw.map(e => [e.course_id, e]));

  // Fetch Certificates
  const certificatesQuery = useQuery({
    queryKey: ["user_certificates", user?.id],
    retry: 1,
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_certificates")
        .select("*, academy_courses(title)")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return (data || []).map((cert: any) => ({
        ...cert,
        academy_courses: cert.academy_courses ? {
          ...cert.academy_courses,
          title: cert.academy_courses.title === "Freelancing Essentials" ? "Mastering Freelancing" : cert.academy_courses.title
        } : null
      }));
    },
    enabled: !!user
  });

  const certificates = certificatesQuery.data || [];
  const isLoadingCertificates = certificatesQuery.isLoading;

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["academy_courses"] });
    queryClient.invalidateQueries({ queryKey: ["user_enrollments", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["user_certificates", user?.id] });
  };

  const isLoading = isLoadingCourses || isLoadingEnrollments || isLoadingCertificates;
  const isError = coursesQuery.isError || enrollmentsQuery.isError || certificatesQuery.isError;

  return {
    courses,
    enrollments,
    certificates,
    isLoading,
    isError,
    error: coursesQuery.error || enrollmentsQuery.error || certificatesQuery.error,
    isLoadingCourses,
    invalidateAll
  };
};
