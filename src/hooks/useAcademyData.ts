import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

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
    assessment_details: 'To earn your certificate, you must pass all module quizzes with at least 80% and complete the final project.',
    duration: '8 Weeks',
    commitment: '15-20 hrs/week',
    price: 0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      {
        id: 'a1', title: 'Module 1: Intro to the AI Economy', duration_minutes: 5, type: 'article',
        content: `# Welcome to the AI Economy\n\nArtificial Intelligence is no longer just a buzzword for Silicon Valley—it is the foundational toolset for the modern freelancer. In this masterclass, we will explore why adopting AI is the highest ROI activity you can undertake today.\n\n## The AI Advantage\nFreelancers utilizing tools like ChatGPT and Claude are reporting productivity increases of 40-60%. It is not about replacing human creativity; it is about eliminating the friction between an idea and its execution.\n\n> "AI won't replace freelancers. Freelancers who use AI will replace those who don't."\n\n## Core Paradigms\n**1. The Centaur Model**\nYou are the strategist. The AI is the executor. Never accept AI output as a final product. Your value is in your taste, your editing, and your domain expertise.\n\n**2. Iterative Prompting**\nGreat results come from conversations, not single commands. Treat AI like a brilliant intern who lacks context.\n\nNext, we'll dive into the Prompt Playground to see this in action.`
      },
      {
        id: 'a2', title: 'Module 2: Mastering Prompt Engineering', duration_minutes: 15, type: 'playground',
        content: `Mastering prompt engineering is the single most valuable technical skill you can learn this year.\n\nThe difference between generic AI output and professional-grade deliverables is entirely dictated by the quality of your prompt. We use the **R.C.T.F.C** Framework:\n\n- **R**ole: Tell the AI who it is.\n- **C**ontext: Provide the background.\n- **T**ask: Explain exactly what needs to be done.\n- **F**ormat: Define the exact output structure.\n- **C**onstraints: State what it MUST NOT do.\n\nCopy the prompts in the workspace and test them in ChatGPT or Claude to see the difference.`,
        quiz_data: {
          prompts: [
            { title: "The Perfect Copywriting Prompt", code: "ACT AS: A senior conversion copywriter with 10 years of experience in direct-response marketing.\n\nCONTEXT: We are launching a new B2B SaaS tool that automates invoice collection for creative agencies.\n\nTASK: Write a 300-word cold email to marketing agency owners.\n\nFORMAT: 1 subject line, 3 short paragraphs, 1 clear call to action.\n\nCONSTRAINTS: Do not use the words 'innovative', 'revolutionary', or 'game-changer'. Keep reading level below 8th grade. Tone should be highly professional but slightly punchy." },
            { title: "The Code Debugger Prompt", code: "ACT AS: A Senior React/TypeScript Developer.\n\nCONTEXT: I am building a dashboard and getting an infinite loop in my useEffect hook.\n\nTASK: Review the following code snippet and identify the exact cause of the infinite render. Then, provide the corrected code.\n\nFORMAT: \n1. Explanation of the bug (bullet points)\n2. Corrected code block\n3. Best practice tip for the future.\n\n[INSERT CODE HERE]" },
            { title: "The Content Repurposer", code: "ACT AS: A Social Media Manager specializing in LinkedIn and Twitter growth.\n\nCONTEXT: I have a 1,500 word blog post about remote work productivity.\n\nTASK: Repurpose this blog post into:\n1. A highly engaging LinkedIn text post with a hook.\n2. A 5-part Twitter thread.\n\nCONSTRAINTS: Do not use emojis in the Twitter thread. Ensure each tweet is under 280 characters." }
          ]
        }
      },
      {
        id: 'a3', title: 'Module 3: AI for Rapid Research', duration_minutes: 45, type: 'video',
        video_url: 'https://www.youtube.com/embed/z-EtmaFJieY',
        content: `Note: This module retains the legacy video player to ensure backward compatibility for certain intensive visual topics. Watch the tutorial carefully.`,
        quiz_data: {
          questions: [
            { question: "What is the primary benefit of AI for freelancers?", options: ["Replacing human workers", "Increasing productivity and efficiency", "Making work more complicated", "Reducing client expectations"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'a4', title: 'Module 4: Workflow Automation Matrix', duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "t1", title: "Map your repetitive tasks", instruction: "Write down 5 tasks you do every week that do not require deep thinking (e.g., sending invoices, transferring lead data)." },
            { id: "t2", title: "Create a Zapier Account", instruction: "Sign up for a free Zapier account at zapier.com." },
            { id: "t3", title: "Build your first Trigger", instruction: "Create a Zap where the trigger is 'New Email in Gmail' matching a specific label." },
            { id: "t4", title: "Add an Action", instruction: "Connect the trigger to Google Sheets. Have Zapier automatically create a new row with the email sender's details." },
            { id: "t5", title: "Test the Automation", instruction: "Send a test email and verify the spreadsheet updates instantly." }
          ]
        }
      },
      {
        id: 'a5', title: 'Module 5: Selling AI Services', duration_minutes: 10, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You are pitching an 'AI Copywriting Retainer' to a new client. They are currently paying a traditional agency $2000/mo.",
              prompt: "CLIENT: 'Wait, if you're just using ChatGPT to write these blogs, why should I pay you $1,500 a month? I could just use it myself for free.'",
              correct: 1,
              options: [
                { text: "Because I have the premium version of ChatGPT and you don't.", explanation: "This focuses on the wrong value. Anyone can buy ChatGPT Plus." },
                { text: "You're paying for the strategy, fact-checking, brand voice alignment, and editing. ChatGPT is just my typewriter; I'm still the author.", explanation: "Perfect. This positions AI as a standard tool (like a typewriter) and correctly repositions your value around strategy and quality control." },
                { text: "I can lower the price to $500 since I'm using AI.", explanation: "Never unnecessarily discount your services. Value-based pricing applies regardless of your tools." }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Freelancing Essentials',
    category: 'Global Business',
    overview: 'Transform your skills into a highly profitable, borderless business. Launch, manage, and scale globally.',
    academy_lessons: [
      {
        id: 'f1', title: 'Module 1: The Global Marketplace', duration_minutes: 8, type: 'article',
        content: `# The Borderless Economy\n\nYou are no longer competing in a local market. Platforms like Upwork and Fiverr have flattened the earning curve, allowing talent from anywhere to earn tier-1 global rates.\n\n## The Skill Arbitrage\nThe secret to global freelancing is skill arbitrage. By acquiring high-value skills (like API integrations, UX design, or specialized copywriting), you decouple your earning potential from your geographic location.\n\n> "Your value is determined by the size of the problem you solve, not the city you log in from."\n\n## Action Steps\nIn the next modules, we dive purely into execution: building the exact profile that converts global traffic into paying contracts.`
      },
      {
        id: 'f2', title: 'Module 2: Building Your Ecosystem', duration_minutes: 12, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "c1", title: "Set up a Professional Email", instruction: "Create an email address using your name or agency name (not a nickname)." },
            { id: "c2", title: "Optimize Upwork Profile", instruction: "Ensure your Headline is specific ('B2B SaaS Copywriter' not 'Freelance Writer')." },
            { id: "c3", title: "Upload 3 Portfolio Pieces", instruction: "Add 3 high-quality case studies detailing the Problem, Solution, and Result." },
            { id: "c4", title: "Create a Wise/Payoneer Account", instruction: "Set up a global receiving account to accept USD payments with minimal conversion fees." }
          ]
        }
      },
      {
        id: 'f3', title: 'Module 3: The Conversion Toolkit', duration_minutes: 5, type: 'toolkit',
        quiz_data: {
          resources: [
            { title: "The 10k Proposal Template", desc: "Our highest-converting Upwork proposal structure.", type: "Google Doc" },
            { title: "Client Intake Questionnaire", desc: "Send this to new leads to establish instant authority.", type: "PDF" },
            { title: "Rate Calculator Matrix", desc: "Calculate your exact hourly and project rates.", type: "Excel" },
            { title: "Cold Outreach Scripts", desc: "4 plug-and-play email sequences for LinkedIn outreach.", type: "Doc" }
          ]
        }
      },
      {
        id: 'f4', title: 'Module 4: High-Stakes Negotiation', duration_minutes: 15, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You just proposed $2,500 for a website redesign.",
              prompt: "CLIENT: 'We love your portfolio, but our maximum budget is $1,500. Can you do it for that?'",
              correct: 2,
              options: [
                { text: "Yes, I can lower my price to $1,500 to win your business.", explanation: "This immediately devalues your work and signals that your initial price was inflated." },
                { text: "No, my price is strictly $2,500. Take it or leave it.", explanation: "Too aggressive. You lose the client entirely." },
                { text: "I can meet the $1,500 budget, but we will need to adjust the scope. I can remove the custom animations and the extra sub-pages to fit that price.", explanation: "Masterful. You protect your effective hourly rate by reducing deliverables, firmly proving that your pricing is tied directly to value." }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    title: 'International Teacher Preparation',
    category: 'Education',
    overview: 'Navigate the US K-12 education system, ace interviews, and secure your J1 Visa placement.',
    academy_lessons: [
      {
        id: 't1', title: 'Module 1: The US K-12 Framework', duration_minutes: 10, type: 'article',
        content: `# Navigating the American Classroom\n\nTeaching internationally requires more than just pedagogical excellence; it requires radical cultural adaptability. The US educational framework places a massive emphasis on Student-Centered Learning and Standardized Core Competencies.\n\n## The Core Shift\nUnlike traditional lecture-based systems, US schools mandate active engagement.\n\n- **Formative over Summative**: You will assess students daily (exit tickets, discussions) rather than relying solely on massive end-of-term exams.\n- **Differentiation**: IEPs (Individualized Education Programs) are legally binding. You must adapt your lessons for students with varying learning abilities.\n\n> "In the US system, you are not the sage on the stage; you are the guide on the side."`
      },
      {
        id: 't2', title: 'Module 2: Interview Mastery Simulator', duration_minutes: 15, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You are in a Zoom interview with a US School District Principal for a J1 Visa position.",
              prompt: "PRINCIPAL: 'How do you handle severe behavioral disruptions in your classroom?'",
              correct: 1,
              options: [
                { text: "I immediately send the student to the principal's office to ensure order is maintained.", explanation: "US administrations expect teachers to handle level 1 & 2 behaviors in-house first. Over-referring is a red flag." },
                { text: "I rely on a tiered approach: prevention through engagement, subtle redirection, and restorative conversations. Office referrals are a last resort.", explanation: "Perfect. This demonstrates modern classroom management mastery and restorative justice practices." },
                { text: "I use strict disciplinary measures and public corrections to deter others.", explanation: "Public shaming or strict authoritarian discipline is heavily frowned upon in modern US pedagogy." }
              ]
            }
          ]
        }
      },
      {
        id: 't3', title: 'Module 3: The Educator Toolkit', duration_minutes: 5, type: 'toolkit',
        quiz_data: {
          resources: [
            { title: "US-Standard Resume Template", desc: "A ATS-friendly teaching resume specifically formatted for US districts.", type: "Google Doc" },
            { title: "Lesson Plan Framework", desc: "A backward-design (Understanding by Design) lesson planner.", type: "PDF" },
            { title: "J1 Visa Document Checklist", desc: "Ensure you have all the legal documentation required for your sponsor.", type: "PDF" }
          ]
        }
      }
    ]
  }
];

export const useAcademyData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const courses = React.useMemo(() => {
    return [...CURRICULUM_LEDGER];
  }, []);

  const isLoadingCourses = false;

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
