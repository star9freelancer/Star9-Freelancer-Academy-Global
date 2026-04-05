import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export const useAcademyData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 1. Fetch All Published Academy Courses
  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["academy_courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academy_courses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // 2. Fetch User Enrollments
  const { data: enrollmentsData = [], isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ["user_enrollments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_enrollments")
        .select("course_id")
        .eq("user_id", user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const enrollments = new Set(enrollmentsData.map((e) => e.course_id));

  // 3. Fetch User Certificates
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
    enabled: !!user,
  });

  // Utility: Refresh all data
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
    invalidateAll,
  };
};
