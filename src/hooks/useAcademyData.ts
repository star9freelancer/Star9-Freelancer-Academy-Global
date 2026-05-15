import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { WEEK_1_AI_MODULES } from "./week1_ai_content";

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

// Shared "Foundations" basics module that opens both AI and Mastering Freelancing.
const FREELANCE_FOUNDATIONS = (prefix: string) => [
  {
    id: `${prefix}-l1`,
    title: "Welcome: How Global Freelancing Actually Works",
    duration: "12:00",
    isCompleted: false,
    type: "article" as const,
    content:
      "![Remote workspace](https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200)\n\n# Welcome to Star9\nFreelancing is the most accessible way to earn in foreign currency from anywhere in Africa. In this lesson, we cover the **landscape**: who hires, what they pay for, and how money flows.\n\n### The 3 Markets\n- **Marketplaces** (Upwork, Fiverr, Toptal) — fast to start, lower margins.\n- **Direct outbound** (LinkedIn, cold email) — higher margins, slower start.\n- **Referral and inbound** — built over time, the most profitable.\n\n### Who Pays Best\n- US, UK, Canada, Australia, and Germany consistently pay the highest hourly rates.\n- B2B buyers (other businesses) pay 3-10x more than B2C (individuals).\n\n### Your First Goal\nBy the end of this course, you will have a positioned profile, a tested pitch, and a system for receiving payment globally.",
  },
  {
    id: `${prefix}-l2`,
    title: "Choosing Your Niche: The Skill–Demand Map",
    duration: "16:00",
    isCompleted: false,
    type: "article" as const,
    content:
      "![Strategy planning](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200)\n\n# Picking a Niche You Can Sell\nMost beginners fail by being too broad. A **niche** combines: a skill you can deliver + a market that has money + a problem they actively pay to solve.\n\n### The Skill–Demand Map\n- **Writing & Content:** copywriting, SEO articles, ghostwriting, technical writing.\n- **Design:** brand identity, web design, presentation design, social media.\n- **Tech:** web development, no-code tools, automation, AI integration.\n- **Operations:** virtual assistance, project management, customer support.\n- **Education:** ESL, tutoring, course creation.\n\n### How to Choose\n- **Skill check:** can you produce a portfolio sample in under 7 days?\n- **Demand check:** search Upwork — are there 20+ recent jobs in this category?\n- **Pay check:** do those jobs pay $25/hr or more?",
  },
  {
    id: `${prefix}-l3`,
    title: "Setting Up to Get Paid Globally",
    duration: "14:00",
    isCompleted: false,
    type: "article" as const,
    content:
      "![Banking and finance](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200)\n\n# Receiving Money From Anywhere\nYou cannot earn globally if you cannot collect payment cleanly. Set this up **before** you pitch your first client.\n\n### Recommended Stack\n- **Wise** — multi-currency account with USD, EUR, GBP details. Lowest FX fees.\n- **Payoneer** — works with most marketplaces (Upwork, Fiverr, etc.).\n- **PayPal** — required by some clients, expensive but unavoidable.\n- **Local mobile money** (M-Pesa, MoMo) — for off-ramping to your local currency.\n\n### Setup Checklist\n- Verified ID document\n- Proof of address (utility bill or bank statement)\n- A professional email address (your name @ gmail or your domain)\n- A clear withdrawal plan from each platform to your local account",
  },
  {
    id: `${prefix}-l4`,
    title: "Your Workspace: Tools Every Freelancer Needs",
    duration: "10:00",
    isCompleted: false,
    type: "checklist" as const,
    quiz_data: {
      tasks: [
        { id: "t1", title: "Create a Gmail with your real name", instruction: "yourname@gmail.com — not nicknames or numbers." },
        { id: "t2", title: "Install Zoom and Google Meet", instruction: "Test your camera, mic and a stable backdrop." },
        { id: "t3", title: "Sign up for Notion or Trello", instruction: "You'll use this to track every client and proposal." },
        { id: "t4", title: "Set up Wise or Payoneer", instruction: "Begin verification today — it can take 2-5 days." },
        { id: "t5", title: "Create LinkedIn and Upwork profiles", instruction: "Don't write copy yet — just claim the accounts." },
      ],
    },
  },
  {
    id: `${prefix}-l5`,
    title: "Foundations Quiz",
    duration: "10:00",
    isCompleted: false,
    type: "quiz" as const,
    quiz_data: {
      questions: [
        {
          question: "Which client market typically pays the highest rates?",
          options: ["B2C individuals", "B2B businesses", "Friends and family", "Local small shops"],
          correctAnswer: 1,
        },
        {
          question: "What three things define a strong freelance niche?",
          options: [
            "A skill you can deliver, a market with money, and an active problem",
            "Your hobby, your location, and your school degree",
            "A trending TikTok topic, free tools, and luck",
            "Your full-time job, your CV, and your network",
          ],
          correctAnswer: 0,
        },
        {
          question: "Why is Wise recommended for African freelancers?",
          options: [
            "It allows holding USD, EUR and GBP with low FX fees",
            "It is the only legal payment method",
            "It pays interest on every transaction",
            "It is the same as PayPal but cheaper to send",
          ],
          correctAnswer: 0,
        },
      ],
    },
  },
];

export const CURRICULUM_LEDGER: Record<string, Module[]> = {
  "22222222-2222-2222-2222-222222222222": [
    {
      id: "mf-m0",
      title: "Module 1: Freelance Foundations (Basics)",
      lessons: FREELANCE_FOUNDATIONS("mf"),
    },
  ],
  "00000000-0000-0000-0000-000000000001": WEEK_1_AI_MODULES,
  "33333333-3333-3333-3333-333333333333": [
    {
      id: "tp-m1",
      title: "Phase 1: Global Vetting",
      lessons: [
        { id: "tp-m1-l1", title: "The International Teaching Landscape", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ],
    },
  ],
};

export const useAcademyData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const coursesQuery = useQuery({
    queryKey: ["academy_courses"],
    retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_courses")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (data || []).map(course => ({
        ...course,
        title: course.title === "Freelancing Essentials" ? "Mastering Freelancing" : course.title,
        modules: CURRICULUM_LEDGER[course.id] || []
      }));
    }
  });

  const courses = coursesQuery.data || [];
  const isLoadingCourses = coursesQuery.isLoading;

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
  const enrollments = new Map(enrollmentsRaw.map(e => [e.course_id, e]));

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
