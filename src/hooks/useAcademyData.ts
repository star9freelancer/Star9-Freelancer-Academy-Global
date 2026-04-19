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
      title: "Global Landscape",
      lessons: [
        { id: "l1", title: "The Sovereign Professional Mindset", duration: "12:05", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2", title: "Market Analysis & Niche Selection", duration: "15:30", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l3", title: "Quiz: Freelancing Foundations", duration: "10:00", isCompleted: false, type: "quiz", quiz: {
          questions: [
            { question: "What is the primary characteristic of a sovereign professional?", options: ["Dependence on one employer", "Diversified income and skill ownership", "Working 9-5 only", "Avoiding taxes"], correct: 1 },
            { question: "Which niche is currently high-growth?", options: ["Data Entry", "AI Implementation & Strategy", "Basic Transcription", "General Virtual Assistance"], correct: 1 }
          ]
        }}
      ]
    },
    {
      id: "m2",
      title: "Profile Mastery",
      lessons: [
        { id: "l4", title: "Personal Branding Architecture", duration: "18:45", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l5", title: "Portfolio Optimization for High-Ticket Clients", duration: "22:10", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
      ]
    }
  ],
  // AI Mastery
  "11111111-1111-1111-1111-111111111111": [
    {
      id: "m1",
      title: "AI Foundations",
      lessons: [
        { id: "l1", title: "The LLM Revolution", duration: "14:20", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2", title: "Prompt Engineering Mastery", duration: "25:15", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
      ]
    }
  ],
  // Digital Marketing / International Teacher Preparation
  "33333333-3333-3333-3333-333333333333": [
    {
      id: "m1",
      title: "Content Strategy",
      lessons: [
        { id: "l1", title: "The Attention Economy", duration: "11:40", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "l2", title: "Organic Growth Engines", duration: "20:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
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

      return (data || []).map(course => ({
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
