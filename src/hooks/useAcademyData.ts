import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

/**
 * PRODUCTION-READY CURRICULUM LEDGER (Star9 Exclusive)
 * This ledger contains the only three courses visible to personnel.
 * Each module is mapped to a relevant instructional video for an immersive experience.
 */
const CURRICULUM_LEDGER = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    title: 'AI for Freelancers',
    category: 'AI & Automation',
    ai_tools_covered: ['ChatGPT', 'Midjourney', 'Zapier', 'Make', 'Claude'],
    overview: 'Future-proof your career. This intensive program empowers modern freelancers with practical, cutting-edge AI skills to instantly multiply productivity, build seamless automated workflows, and significantly increase earning capacity.',
    learning_outcomes: [
      'Master core AI fundamentals and navigate top-tier industry tools with confidence',
      'Deploy AI for rapid content creation, complex coding, and deep research',
      'Engineer automated workflows that save hours of manual labor every week',
      'Package, market, and deliver high-value, AI-enhanced services to global clients'
    ],
    assessment_details: 'To earn your certificate, you must successfully complete practical weekly assignments, navigate real-world client simulation tasks, and submit a comprehensive final AI-powered freelance project.',
    duration: '8 Weeks',
    commitment: '15-20 hrs/week',
    price: 0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      { id: 'a1', title: 'Module 1: Introduction to AI and the Modern Freelance Economy', duration_minutes: 45, type: 'video', video_url: 'https://www.youtube.com/embed/AivZ31S1s24' },
      { id: 'a2', title: 'Module 2: AI Tools for Content Creation (Featuring ChatGPT & Midjourney)', duration_minutes: 60, type: 'video', video_url: 'https://www.youtube.com/embed/k_N6Z2Z_L_c' },
      { id: 'a3', title: 'Module 3: Leveraging AI for Data Analysis and Deep Research', duration_minutes: 50, type: 'video', video_url: 'https://www.youtube.com/embed/V2_6mXp9V5s' },
      { id: 'a4', title: 'Module 4: Workflow Automation Tools (Mastering Zapier & Make)', duration_minutes: 75, type: 'video', video_url: 'https://www.youtube.com/embed/XqCAsyH06vY' },
      { id: 'a5', title: 'Module 5: Architecting and Selling AI-Powered Services', duration_minutes: 60, type: 'video', video_url: 'https://www.youtube.com/embed/7X8mS8K6V6k' },
      { id: 'a6', title: 'Module 6: Ethics, Integrity, and Responsible AI Application', duration_minutes: 40, type: 'video', video_url: 'https://www.youtube.com/embed/e6-O66xI5rQ' }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Freelancing Essentials',
    category: 'Global Business',
    ai_tools_covered: ['Upwork', 'Fiverr', 'LinkedIn', 'Wise', 'Payoneer'],
    overview: 'Transform your skills into a highly profitable, borderless business. This comprehensive foundational course provides the exact roadmap required to successfully launch, manage, and scale a lucrative freelancing career on the global stage.',
    learning_outcomes: [
      'Construct a magnetic, high-converting global freelancer profile',
      'Secure premium clients on major platforms like Upwork and Fiverr',
      'Execute and manage complex projects with world-class professionalism',
      'Cultivate a recognizable and trusted personal brand'
    ],
    assessment_details: 'Student proficiency is rigorously evaluated through a live profile creation, practical proposal writing tasks, a mock client interview, and the submission of a fully developed freelance business plan.',
    duration: '6 Weeks',
    commitment: '10-15 hrs/week',
    price: 0,
    status: 'published',
    image_url: '/freelancing_essentials.png',
    academy_lessons: [
      { id: 'f1', title: 'Module 1: Introduction to the Global Freelancing Landscape', duration_minutes: 40, type: 'video', video_url: 'https://www.youtube.com/embed/mGjA4f8mHkc' },
      { id: 'f2', title: 'Module 2: Setting up High-Converting Profiles (Upwork, Fiverr, LinkedIn)', duration_minutes: 90, type: 'video', video_url: 'https://www.youtube.com/embed/8oR_8pWfE2E' },
      { id: 'f3', title: 'Module 3: The Art of Proposal Writing and Client Acquisition', duration_minutes: 60, type: 'video', video_url: 'https://www.youtube.com/embed/Yv9mQ8S8K6E' },
      { id: 'f4', title: 'Module 4: Strategic Pricing and Confident Negotiation', duration_minutes: 50, type: 'video', video_url: 'https://www.youtube.com/embed/5y0iNoeHOnE' },
      { id: 'f5', title: 'Module 5: Mastering Client Communication and Retention', duration_minutes: 45, type: 'video', video_url: 'https://www.youtube.com/embed/fWbb6Yf30vQ' },
      { id: 'f6', title: 'Module 6: The Blueprint for Scaling Your Freelance Business', duration_minutes: 55, type: 'video', video_url: 'https://www.youtube.com/embed/m5_TbeG-R7c' }
    ]
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    title: 'International Teacher Preparation',
    category: 'Education & Global Mobility',
    ai_tools_covered: ['Google Classroom', 'Canva', 'Canvas', 'J1 Visa Platform'],
    overview: 'Bridge the gap between local talent and global classrooms. This specialized, high-impact course rigorously prepares educators for elite international teaching opportunities, with a dedicated focus on securing placements in the USA via the J1 visa program.',
    learning_outcomes: [
      'Navigate the intricacies of the US K-12 education system with absolute clarity',
      'Ace high-stakes international interviews and execute flawless demonstration lessons',
      'Craft professional, globally recognized teaching portfolios',
      'Seamlessly adapt to and confidently lead multicultural classrooms'
    ],
    assessment_details: 'Certification requires the submission of a professional teaching demo video, tailored resume and cover letter documentation, successful completion of a mock interview, and a comprehensive lesson plan design.',
    duration: '12 Weeks',
    commitment: '20-25 hrs/week',
    price: 0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      { id: 't1', title: 'Module 1: Comprehensive Overview of the US Education System', duration_minutes: 60, type: 'video', video_url: 'https://www.youtube.com/embed/v3HwY26_foc' },
      { id: 't2', title: 'Module 2: Advanced Curriculum Planning and Modern Lesson Delivery', duration_minutes: 75, type: 'video', video_url: 'https://www.youtube.com/embed/O_UozI0hV64' },
      { id: 't3', title: 'Module 3: Elite Classroom Management Strategies', duration_minutes: 60, type: 'video', video_url: 'https://www.youtube.com/embed/pgk-719mTxM' },
      { id: 't4', title: 'Module 4: Intensive Interview Preparation (J1 Visa Focus)', duration_minutes: 90, type: 'video', video_url: 'https://www.youtube.com/embed/F4Syr5_p-mU' },
      { id: 't5', title: 'Module 5: Professional Documentation (Resumes & Cover Letters)', duration_minutes: 50, type: 'video', video_url: 'https://www.youtube.com/embed/1_S-v_fVfG8' },
      { id: 't6', title: 'Module 6: Cultural Adaptation and Global Teaching Ethics', duration_minutes: 45, type: 'video', video_url: 'https://www.youtube.com/embed/_K-fA1W0M_w' }
    ]
  }
];

export const useAcademyData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 1. Return EXCLUSIVE production curriculum tracks (Instant-Access)
  // We prioritize the CURRICULUM_LEDGER to ensure a curated, premium experience.
  const courses = React.useMemo(() => {
    return [...CURRICULUM_LEDGER];
  }, []);

  const isLoadingCourses = false; // Zero-latency curriculum

  // 2. Fetch User Enrollments
  const { data: enrollmentsData = [], isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ["user_enrollments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_enrollments")
        .select("course_id, progress")
        .eq("user_id", user.id);
      if (error) return [];
      return data || [];
    },
    enabled: !!user,
  });

  const enrollments = React.useMemo(() => {
    const map = new Map<string, any>();
    enrollmentsData.forEach((e) => map.set(e.course_id, e));
    return map;
  }, [enrollmentsData]);

  // 3. Fetch User Certificates
  const { data: certificates = [], isLoading: isLoadingCertificates } = useQuery({
    queryKey: ["user_certificates", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_certificates")
        .select("*, academy_courses(title)")
        .eq("user_id", user.id);
      if (error) return [];
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
