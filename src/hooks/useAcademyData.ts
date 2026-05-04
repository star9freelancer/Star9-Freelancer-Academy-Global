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

// Shared "Foundations" basics module that opens both AI and Mastering Freelancing.
// Beginners learn the same fundamentals before each course branches into its specialty.
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
  // ───────────────────────────────────────────────────────────
  // Mastering Freelancing
  // ───────────────────────────────────────────────────────────
  "22222222-2222-2222-2222-222222222222": [
    {
      id: "mf-m0",
      title: "Module 1: Freelance Foundations (Basics)",
      lessons: FREELANCE_FOUNDATIONS("mf"),
    },
    {
      id: "mf-m1",
      title: "Module 2: The Sovereign Freelance Mindset",
      lessons: [
        { id: "mf-m1-l1", title: "Digital Sovereignty: Owning Your Career", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m1-l2", title: "Niche Selection & Market Arbitrage", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m1-l3", title: "Activity: Personal Value Proposition", duration: "10:00", isCompleted: false, type: "article", content: "![Freelancer setup](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200)\n\n# Crafting Your Value\nYour value is not your time; it is the **delta** between the client's current pain and their future success.\n\n### Reflection Questions\n- What high-ticket problem do you solve?\n- Why should a US or EU client choose you over a local agency?\n- What proof do you have that you can deliver?" },
        { id: "mf-m1-l4", title: "Quiz: The Freelance Mindset", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What is the primary factor that determines your freelance value?", options: ["The number of hours you work", "The magnitude of the problem you solve", "Your local geographic market rate", "The number of tools you know"], correctAnswer: 1 },
            { question: "Market arbitrage in freelancing refers to:", options: ["Selling services across borders to leverage currency differences", "Trading stocks while freelancing", "Working multiple jobs simultaneously", "Outsourcing your work to AI"], correctAnswer: 0 },
          ],
        }},
      ],
    },
    {
      id: "mf-m2",
      title: "Module 3: High-Ticket Profile & Personal Brand",
      lessons: [
        { id: "mf-m2-l1", title: "Personal Branding for Global Trust", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m2-l2", title: "Portfolio Engineering: Show, Don't Tell", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m2-l3", title: "Anatomy of a High-Converting Profile", duration: "12:00", isCompleted: false, type: "article", content: "![Profile design](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200)\n\n# Profile Mastery\nWhen clients view your Upwork or LinkedIn profile, they are looking for **trust signals**.\n\n### Key Components\n- **Professional headshot:** high contrast, good lighting, neutral background.\n- **Clear headline:** result-oriented (e.g. *Helping B2B SaaS scale via React*).\n- **Social proof:** testimonials and case studies placed prominently." },
        { id: "mf-m2-l4", title: "Quiz: Branding Essentials", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "Which element of a portfolio is most important to a high-ticket client?", options: ["The colour palette", "Clear ROI case studies", "A long list of every skill you have", "Your personal hobbies"], correctAnswer: 1 },
            { question: "What should your profile headline focus on?", options: ["Your employment history", "Your college degree", "The results you deliver to clients", "Your geographical location"], correctAnswer: 2 },
          ],
        }},
      ],
    },
    {
      id: "mf-m3",
      title: "Module 4: Pricing & Pitching Like a Pro",
      lessons: [
        { id: "mf-m3-l1", title: "How to Price Your Services (3 Models)", duration: "18:00", isCompleted: false, type: "article", content: "![Pricing strategy](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200)\n\n# The 3 Pricing Models\n- **Hourly** — easy to start, hard to scale, signals junior status above $80/hr.\n- **Fixed-project** — tie pricing to deliverables, not effort. Best for most freelancers.\n- **Retainer** — recurring monthly income for a defined scope. The dream model.\n\n### Anchoring Rules\n- Always quote in **USD**, never your local currency.\n- Present 3 tiers (good / better / best) — most clients pick the middle.\n- Never quote your first number; ask for the budget first." },
        { id: "mf-m3-l2", title: "The Psychology of Rejection & Persistence", duration: "12:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m3-l3", title: "Structuring Winning Proposals", duration: "20:00", isCompleted: false, type: "article", content: "![Proposals](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200)\n\n# The Art of the Pitch\nDo not copy-paste templates blindly. Tailor your hook to the client's unique problem.\n\n### The 3-Part Hook\n- **Acknowledge:** restate their problem in your own words.\n- **Validate:** provide a mini-audit, framework, or quick win.\n- **Call to action:** ask a qualifying question to start a conversation." },
        { id: "mf-m3-l4", title: "Toolkit: Winning Proposal Templates", duration: "5:00", isCompleted: false, type: "toolkit", quiz_data: {
          resources: [
            { title: "Proposal Blueprint v1", desc: "3-tier pricing template for most service types.", type: "PDF" },
            { title: "Discovery Call Script", desc: "Questions to ask during your first client meeting.", type: "PDF" },
            { title: "Cold Outreach Email Pack", desc: "10 high-converting cold email templates.", type: "PDF" },
          ],
        }},
        { id: "mf-m3-l5", title: "Quiz: Sales & Pricing Mastery", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What is the best way to start a proposal?", options: ["Hello sir/madam", "Restating the client's problem", "Listing your years of experience", "Giving a generic greeting"], correctAnswer: 1 },
            { question: "During a discovery call, who should speak more?", options: ["You", "The client", "An equal 50/50 split", "Neither"], correctAnswer: 1 },
            { question: "Why quote in USD rather than your local currency?", options: ["It's required by law", "It anchors you to the global market and avoids FX confusion", "USD is always cheaper", "Clients pay faster in USD"], correctAnswer: 1 },
          ],
        }},
      ],
    },
    {
      id: "mf-m4",
      title: "Module 5: Client Management & Delivery",
      lessons: [
        { id: "mf-m4-l1", title: "Onboarding a New Client (Contracts, Scope, Kick-off)", duration: "20:00", isCompleted: false, type: "article", content: "![Client meeting](https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200)\n\n# Day One With a New Client\nSet the tone in the first 48 hours. Confused clients become unhappy clients.\n\n### Your Onboarding Pack\n- **Signed contract** — scope, deliverables, payment terms, kill fee.\n- **50% deposit invoice** — never start without it for new clients.\n- **Welcome doc** — communication channels, response times, project plan.\n- **Kick-off call** — confirm goals, success metrics, decision-makers." },
        { id: "mf-m4-l2", title: "Communication Cadence That Builds Trust", duration: "14:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m4-l3", title: "Handling Scope Creep & Difficult Clients", duration: "16:00", isCompleted: false, type: "simulator", quiz_data: {
          scenarios: [
            { context: "Client asks for 'one quick extra page' that wasn't in scope.", prompt: "How do you respond?", options: [
              { text: "Just do it to keep them happy", explanation: "This trains the client that scope is negotiable. You will burn out and lose money." },
              { text: "Acknowledge, scope it, and send a small change-order quote", explanation: "Correct — protect the relationship and your time. Scope-of-work documents exist for this." },
            ], correct: 1 },
          ],
        }},
        { id: "mf-m4-l4", title: "Quiz: Client Management", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "Why take a 50% deposit before starting?", options: ["It is illegal not to", "It reduces risk and signals seriousness from both sides", "Clients prefer it", "It avoids taxes"], correctAnswer: 1 },
            { question: "Best response to scope creep?", options: ["Do it for free", "Quote a change order and document it", "Ignore the request", "Quit the project"], correctAnswer: 1 },
          ],
        }},
      ],
    },
    {
      id: "mf-m5",
      title: "Module 6: Scaling — From Freelancer to Business",
      lessons: [
        { id: "mf-m5-l1", title: "Productizing Your Service", duration: "18:00", isCompleted: false, type: "article", content: "![Scaling business](https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200)\n\n# Stop Selling Hours, Start Selling Outcomes\nA productized service is a fixed offer with a fixed price and a fixed delivery timeline.\n\n### Examples\n- *Brand identity in 14 days — $2,500*\n- *SEO audit & 90-day plan — $1,200*\n- *5 LinkedIn posts per week — $800/month retainer*\n\n### Why It Works\n- Clients understand exactly what they're buying.\n- You stop quoting from scratch every time.\n- You can hire help to deliver against a fixed process." },
        { id: "mf-m5-l2", title: "Building Recurring Revenue (Retainers)", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m5-l3", title: "Hiring Your First Subcontractor", duration: "12:00", isCompleted: false, type: "article", content: "![Team collaboration](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200)\n\n# Your First Hire\nWhen you are turning down work, it is time to bring on help. Start with a junior version of yourself.\n\n### How to Structure It\n- Project-based, not hourly — protect your margins.\n- Pay them 30-50% of what you charge the client.\n- Document your process before delegating it." },
        { id: "mf-m5-l4", title: "Final Capstone Quiz", duration: "20:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What is a productized service?", options: ["A physical product", "A fixed offer with fixed price and timeline", "A free trial", "An hourly contract"], correctAnswer: 1 },
            { question: "Why are retainers the most valuable revenue model?", options: ["They are the easiest to sell", "They produce predictable recurring income", "They require no work", "Clients prefer them legally"], correctAnswer: 1 },
            { question: "When you hire your first subcontractor, you should pay them roughly:", options: ["The same rate you charge the client", "30-50% of what you charge the client", "Twice what you charge", "Nothing — give them experience"], correctAnswer: 1 },
          ],
        }},
      ],
    },
  ],

  // ───────────────────────────────────────────────────────────
  // AI for Freelancers
  // ───────────────────────────────────────────────────────────
  "11111111-1111-1111-1111-111111111111": [
    {
      id: "ai-m0",
      title: "Module 1: Freelance Foundations (Basics)",
      lessons: FREELANCE_FOUNDATIONS("ai"),
    },
    {
      id: "ai-m1",
      title: "Module 2: The AI Revolution",
      lessons: [
        { id: "ai-m1-l1", title: "Understanding LLMs: Beyond the Hype", duration: "14:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "ai-m1-l2", title: "Setting Up Your AI Tech Stack", duration: "10:00", isCompleted: false, type: "article", content: "![AI tech stack](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200)\n\n# Your Starter AI Stack\nFree and paid tools every AI freelancer should be fluent in.\n\n### Free Tier\n- **ChatGPT (free):** day-to-day reasoning and writing.\n- **Google AI Studio (Gemini):** large context windows, free.\n- **Perplexity:** research with citations.\n\n### Paid Tier (worth it once you earn)\n- **ChatGPT Plus** ($20/mo) — GPT-4-class models, image generation.\n- **Claude Pro** ($20/mo) — best for long documents and coding.\n- **Cursor or GitHub Copilot** — for any technical work." },
        { id: "ai-m1-l3", title: "The AI Mindset Shift", duration: "12:00", isCompleted: false, type: "article", content: "![Thinking with AI](https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=1200)\n\n# Thinking in AI\nTo master AI you must move from **search** to **synthesis**.\n\n### The Future of Work\n- **Augmentation, not replacement** — AI handles grunt work; you handle strategy.\n- **Infinite leverage** — one person can deliver work that used to require a 5-person agency.\n- **Speed compounds** — every saved hour reinvested into pitching is more income." },
        { id: "ai-m1-l4", title: "Quiz: AI Foundations", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What does LLM stand for?", options: ["Logical Language Model", "Large Language Model", "Linked Learning Module", "Local Language Memory"], correctAnswer: 1 },
            { question: "Best mindset shift for AI freelancers?", options: ["AI replaces me, so I should quit", "AI augments me, freeing time for strategy", "AI is a fad, ignore it", "AI only matters in tech"], correctAnswer: 1 },
          ],
        }},
      ],
    },
    {
      id: "ai-m2",
      title: "Module 3: Prompt Engineering Mastery",
      lessons: [
        { id: "ai-m2-l1", title: "Frameworks: CO-STAR and Beyond", duration: "20:00", isCompleted: false, type: "article", content: "![Prompt engineering](https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200)\n\n# Advanced Prompting\nMastering AI is mastering the **intent–output bridge**.\n\n### The CO-STAR Framework\n- **C**ontext — provide background.\n- **O**bjective — state the goal.\n- **S**tyle — define the writing style.\n- **T**one — emotional resonance.\n- **A**udience — who is this for?\n- **R**esponse — required output format.\n\n### Beyond CO-STAR\n- **Few-shot prompting** — give 2-3 examples of the output you want.\n- **Chain of thought** — ask the model to reason step by step.\n- **Role assignment** — *Act as a senior copywriter with 15 years of B2B SaaS experience.*" },
        { id: "ai-m2-l2", title: "Prompt Playground: Live Testing", duration: "30:00", isCompleted: false, type: "playground", content: "Test your frameworks here before deploying as client deliverables. Iterate at least 3 times — first drafts are rarely the best.", quiz_data: {
          prompts: [
            { title: "Client Strategy Prompt", code: "Act as a Senior Business Consultant. Create a 3-month growth plan for a SaaS startup specialising in [niche]. Use the CO-STAR framework. Output as a Notion-friendly markdown document." },
            { title: "Cold Outreach Generator", code: "Write 5 short cold LinkedIn DMs (max 80 words each) targeting [persona]. Each must reference a specific pain point and end with one qualifying question. Tone: confident but not pushy." },
            { title: "SEO Brief", code: "Create a content brief for an article titled '[topic]'. Include: target keyword, search intent, suggested H2s, internal link opportunities, and a 1-sentence meta description." },
          ],
        }},
        { id: "ai-m2-l3", title: "Quiz: Prompting Foundations", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What does the 'S' in CO-STAR stand for?", options: ["Strategy", "Style", "Synthesis", "Structure"], correctAnswer: 1 },
            { question: "Why is context important in a prompt?", options: ["It makes the response longer", "It helps the AI narrow down relevant patterns from training", "It is not important", "It makes the prompt look professional"], correctAnswer: 1 },
            { question: "Few-shot prompting means:", options: ["Sending many short prompts", "Giving the model 2-3 examples of the desired output", "Using a small AI model", "Asking quickly without thinking"], correctAnswer: 1 },
          ],
        }},
      ],
    },
    {
      id: "ai-m3",
      title: "Module 4: AI-Powered Service Delivery",
      lessons: [
        { id: "ai-m3-l1", title: "AI for Writing & Content", duration: "18:00", isCompleted: false, type: "article", content: "![Writing with AI](https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200)\n\n# Writing 10x Faster Without Sounding Like a Bot\nThe key is to use AI as a **first draft engine**, not a final-draft author.\n\n### Workflow\n1. Outline yourself (your unique angle).\n2. Ask the AI to expand each section in a defined tone.\n3. Edit ruthlessly — cut 30%, add 1 personal example per section.\n4. Run a final pass for cliché phrases (*delve, tapestry, in the realm of...*)." },
        { id: "ai-m3-l2", title: "AI for Design (Image Generation)", duration: "16:00", isCompleted: false, type: "article", content: "![AI design](https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200)\n\n# Visual AI for Freelancers\n### Tools to Master\n- **Midjourney** — hero images, brand visuals.\n- **DALL·E (inside ChatGPT)** — quick mockups.\n- **Canva Magic Studio** — fast social graphics with AI assist.\n\n### Pro Tip\nAlways combine AI images with hand-tuned typography in Figma or Canva. Pure AI output looks generic; AI + human polish looks premium." },
        { id: "ai-m3-l3", title: "AI for Research & Analysis", duration: "14:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "ai-m3-l4", title: "Quiz: AI Service Delivery", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "Best way to use AI in writing client deliverables?", options: ["Copy and paste the AI output directly", "Use AI for first drafts, then edit ruthlessly with your voice", "Avoid AI entirely", "Only use AI for headlines"], correctAnswer: 1 },
            { question: "Why combine AI images with human design polish?", options: ["AI cannot generate images", "Pure AI output looks generic; human polish makes it premium", "It is required by law", "It saves money"], correctAnswer: 1 },
          ],
        }},
      ],
    },
    {
      id: "ai-m4",
      title: "Module 5: Workflow Automation",
      lessons: [
        { id: "ai-m4-l1", title: "Connecting AI to the Real World (Zapier, Make)", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "ai-m4-l2", title: "Building Your First AI Workflow", duration: "20:00", isCompleted: false, type: "article", content: "![Automation flow](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200)\n\n# Your First Automation\nLet's automate something a real client will pay for: a **lead-qualification pipeline**.\n\n### The Workflow\n1. New form submission lands in Google Sheets (trigger).\n2. Make.com sends the data to Claude with a qualifying prompt.\n3. Claude returns a score (1-10) and a 3-line summary.\n4. Output is written back to the sheet and posted to Slack.\n\n### What to Charge\nA small business will pay $500–$2,000 to set this up + $100/month to maintain it." },
        { id: "ai-m4-l3", title: "Checklist: Deploying Your First Bot", duration: "10:00", isCompleted: false, type: "checklist", quiz_data: {
          tasks: [
            { id: "t1", title: "Map out the workflow", instruction: "List every step from trigger to completion on paper first." },
            { id: "t2", title: "Connect via Zapier or Make", instruction: "Build the integration in a sandbox before running it on live client data." },
            { id: "t3", title: "Add error handling", instruction: "What happens if the AI returns no answer? Always have a fallback." },
            { id: "t4", title: "Document for the client", instruction: "Provide a 1-page Loom walkthrough so they can use it without you." },
          ],
        }},
        { id: "ai-m4-l4", title: "The Ethics of Automation", duration: "12:00", isCompleted: false, type: "article", content: "![Ethical AI](https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200)\n\n# Ethical AI in Client Work\nWith great power comes great responsibility. Transparency is the foundation of long-term client relationships.\n\n### Best Practices\n- **Disclose usage** — let clients know when AI is part of the process.\n- **Human-in-the-loop** — always verify AI outputs for accuracy and bias.\n- **Data privacy** — never paste client confidential data into free AI tools.\n- **Attribution** — if AI generated an image, say so when the brand requires it." },
      ],
    },
    {
      id: "ai-m5",
      title: "Module 6: Selling AI Services to Clients",
      lessons: [
        { id: "ai-m5-l1", title: "Packaging AI as a Service", duration: "18:00", isCompleted: false, type: "article", content: "![Selling AI](https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1200)\n\n# What Clients Actually Buy\nClients don't buy *AI*. They buy **outcomes** — saved time, more leads, lower costs.\n\n### Productized AI Offers\n- *AI Lead Qualifier* — $1,500 setup + $200/month.\n- *Content Engine* — 20 SEO articles/month for $2,500.\n- *Customer Support Bot* — $3,000 setup, trained on the client's docs.\n\n### How to Pitch\nLead with the metric: *We will reduce your support response time from 6 hours to 2 minutes.* Then explain the AI is the mechanism." },
        { id: "ai-m5-l2", title: "Final Capstone Quiz", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What do clients actually buy when you sell AI services?", options: ["AI tools", "Outcomes like saved time and more revenue", "Cool tech demos", "Subscriptions"], correctAnswer: 1 },
            { question: "Best way to pitch an AI service?", options: ["Lead with the technology details", "Lead with the business metric you'll improve", "Show off your prompts", "Promise it will replace all employees"], correctAnswer: 1 },
            { question: "What is one rule for ethical AI delivery?", options: ["Always hide that you used AI", "Disclose AI usage and keep humans in the loop", "Use only paid models", "Avoid all client data"], correctAnswer: 1 },
          ],
        }},
      ],
    },
  ],

  // ───────────────────────────────────────────────────────────
  // International Teacher Preparation
  // ───────────────────────────────────────────────────────────
  "33333333-3333-3333-3333-333333333333": [
    {
      id: "tp-m1",
      title: "Phase 1: Global Vetting",
      lessons: [
        { id: "tp-m1-l1", title: "The International Teaching Landscape", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "tp-m1-l2", title: "Document Vetting & Credential Evaluation", duration: "20:00", isCompleted: false, type: "article", content: "![Teaching credentials](https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200)\n\n# Vetting Mastery\nWorking globally requires recognised credentials.\n\n### Essential Requirements\n- Verifiable degree (with WES or equivalent evaluation).\n- English proficiency (C1 / C2 — IELTS, TOEFL or equivalent).\n- Documented teaching experience (letters, payslips, contracts)." },
        { id: "tp-m1-l3", title: "Quiz: Vetting Protocols", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "What level of English proficiency is generally required for international placements?", options: ["A1 / A2", "B1 / B2", "C1 / C2", "None required"], correctAnswer: 2 },
          ],
        }},
      ],
    },
    {
      id: "tp-m2",
      title: "Phase 2: Pedagogy & Lesson Design",
      lessons: [
        { id: "tp-m2-l1", title: "Curriculum Design for Modern Learners", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "tp-m2-l2", title: "Engaging Digital Classrooms", duration: "20:00", isCompleted: false, type: "article", content: "![Classroom tech](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200)\n\n# Digital Engagement\nModern teaching requires interactive touchpoints every 5 minutes.\n\n### Techniques\n- Use polls and quick quizzes.\n- Breakout rooms for peer learning.\n- Gamified reward systems." },
        { id: "tp-m2-l3", title: "Activity: Lesson Simulator", duration: "30:00", isCompleted: false, type: "simulator", quiz_data: {
          scenarios: [
            { context: "A student is disengaged in a virtual classroom.", prompt: "How do you pivot the lesson?", options: [
              { text: "Reprimand them", explanation: "Negative reinforcement rarely works in digital spaces." },
              { text: "Gamify the next concept", explanation: "Gamification increases retention and engagement instantly." },
            ], correct: 1 },
          ],
        }},
        { id: "tp-m2-l4", title: "Quiz: Pedagogy Review", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
          questions: [
            { question: "How frequently should you include interactive touchpoints in a digital lesson?", options: ["Every 60 minutes", "Every 5 minutes", "Only at the end", "Never"], correctAnswer: 1 },
          ],
        }},
      ],
    },
  ],
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
