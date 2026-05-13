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
        {
          id: "mf-m1-l4", title: "Quiz: The Freelance Mindset", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What is the primary factor that determines your freelance value?", options: ["The number of hours you work", "The magnitude of the problem you solve", "Your local geographic market rate", "The number of tools you know"], correctAnswer: 1 },
              { question: "Market arbitrage in freelancing refers to:", options: ["Selling services across borders to leverage currency differences", "Trading stocks while freelancing", "Working multiple jobs simultaneously", "Outsourcing your work to AI"], correctAnswer: 0 },
            ],
          }
        },
      ],
    },
    {
      id: "mf-m2",
      title: "Module 3: High-Ticket Profile & Personal Brand",
      lessons: [
        { id: "mf-m2-l1", title: "Personal Branding for Global Trust", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m2-l2", title: "Portfolio Engineering: Show, Don't Tell", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m2-l3", title: "Anatomy of a High-Converting Profile", duration: "12:00", isCompleted: false, type: "article", content: "![Profile design](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200)\n\n# Profile Mastery\nWhen clients view your Upwork or LinkedIn profile, they are looking for **trust signals**.\n\n### Key Components\n- **Professional headshot:** high contrast, good lighting, neutral background.\n- **Clear headline:** result-oriented (e.g. *Helping B2B SaaS scale via React*).\n- **Social proof:** testimonials and case studies placed prominently." },
        {
          id: "mf-m2-l4", title: "Quiz: Branding Essentials", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "Which element of a portfolio is most important to a high-ticket client?", options: ["The colour palette", "Clear ROI case studies", "A long list of every skill you have", "Your personal hobbies"], correctAnswer: 1 },
              { question: "What should your profile headline focus on?", options: ["Your employment history", "Your college degree", "The results you deliver to clients", "Your geographical location"], correctAnswer: 2 },
            ],
          }
        },
      ],
    },
    {
      id: "mf-m3",
      title: "Module 4: Pricing & Pitching Like a Pro",
      lessons: [
        { id: "mf-m3-l1", title: "How to Price Your Services (3 Models)", duration: "18:00", isCompleted: false, type: "article", content: "![Pricing strategy](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200)\n\n# The 3 Pricing Models\n- **Hourly** — easy to start, hard to scale, signals junior status above $80/hr.\n- **Fixed-project** — tie pricing to deliverables, not effort. Best for most freelancers.\n- **Retainer** — recurring monthly income for a defined scope. The dream model.\n\n### Anchoring Rules\n- Always quote in **USD**, never your local currency.\n- Present 3 tiers (good / better / best) — most clients pick the middle.\n- Never quote your first number; ask for the budget first." },
        { id: "mf-m3-l2", title: "The Psychology of Rejection & Persistence", duration: "12:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m3-l3", title: "Structuring Winning Proposals", duration: "20:00", isCompleted: false, type: "article", content: "![Proposals](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200)\n\n# The Art of the Pitch\nDo not copy-paste templates blindly. Tailor your hook to the client's unique problem.\n\n### The 3-Part Hook\n- **Acknowledge:** restate their problem in your own words.\n- **Validate:** provide a mini-audit, framework, or quick win.\n- **Call to action:** ask a qualifying question to start a conversation." },
        {
          id: "mf-m3-l4", title: "Toolkit: Winning Proposal Templates", duration: "5:00", isCompleted: false, type: "toolkit", quiz_data: {
            resources: [
              { title: "Proposal Blueprint v1", desc: "3-tier pricing template for most service types.", type: "PDF" },
              { title: "Discovery Call Script", desc: "Questions to ask during your first client meeting.", type: "PDF" },
              { title: "Cold Outreach Email Pack", desc: "10 high-converting cold email templates.", type: "PDF" },
            ],
          }
        },
        {
          id: "mf-m3-l5", title: "Quiz: Sales & Pricing Mastery", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What is the best way to start a proposal?", options: ["Hello sir/madam", "Restating the client's problem", "Listing your years of experience", "Giving a generic greeting"], correctAnswer: 1 },
              { question: "During a discovery call, who should speak more?", options: ["You", "The client", "An equal 50/50 split", "Neither"], correctAnswer: 1 },
              { question: "Why quote in USD rather than your local currency?", options: ["It's required by law", "It anchors you to the global market and avoids FX confusion", "USD is always cheaper", "Clients pay faster in USD"], correctAnswer: 1 },
            ],
          }
        },
      ],
    },
    {
      id: "mf-m4",
      title: "Module 5: Client Management & Delivery",
      lessons: [
        { id: "mf-m4-l1", title: "Onboarding a New Client (Contracts, Scope, Kick-off)", duration: "20:00", isCompleted: false, type: "article", content: "![Client meeting](https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200)\n\n# Day One With a New Client\nSet the tone in the first 48 hours. Confused clients become unhappy clients.\n\n### Your Onboarding Pack\n- **Signed contract** — scope, deliverables, payment terms, kill fee.\n- **50% deposit invoice** — never start without it for new clients.\n- **Welcome doc** — communication channels, response times, project plan.\n- **Kick-off call** — confirm goals, success metrics, decision-makers." },
        { id: "mf-m4-l2", title: "Communication Cadence That Builds Trust", duration: "14:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        {
          id: "mf-m4-l3", title: "Handling Scope Creep & Difficult Clients", duration: "16:00", isCompleted: false, type: "simulator", quiz_data: {
            scenarios: [
              {
                context: "Client asks for 'one quick extra page' that wasn't in scope.", prompt: "How do you respond?", options: [
                  { text: "Just do it to keep them happy", explanation: "This trains the client that scope is negotiable. You will burn out and lose money." },
                  { text: "Acknowledge, scope it, and send a small change-order quote", explanation: "Correct — protect the relationship and your time. Scope-of-work documents exist for this." },
                ], correct: 1
              },
            ],
          }
        },
        {
          id: "mf-m4-l4", title: "Quiz: Client Management", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "Why take a 50% deposit before starting?", options: ["It is illegal not to", "It reduces risk and signals seriousness from both sides", "Clients prefer it", "It avoids taxes"], correctAnswer: 1 },
              { question: "Best response to scope creep?", options: ["Do it for free", "Quote a change order and document it", "Ignore the request", "Quit the project"], correctAnswer: 1 },
            ],
          }
        },
      ],
    },
    {
      id: "mf-m5",
      title: "Module 6: Scaling — From Freelancer to Business",
      lessons: [
        { id: "mf-m5-l1", title: "Productizing Your Service", duration: "18:00", isCompleted: false, type: "article", content: "![Scaling business](https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200)\n\n# Stop Selling Hours, Start Selling Outcomes\nA productized service is a fixed offer with a fixed price and a fixed delivery timeline.\n\n### Examples\n- *Brand identity in 14 days — $2,500*\n- *SEO audit & 90-day plan — $1,200*\n- *5 LinkedIn posts per week — $800/month retainer*\n\n### Why It Works\n- Clients understand exactly what they're buying.\n- You stop quoting from scratch every time.\n- You can hire help to deliver against a fixed process." },
        { id: "mf-m5-l2", title: "Building Recurring Revenue (Retainers)", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "mf-m5-l3", title: "Hiring Your First Subcontractor", duration: "12:00", isCompleted: false, type: "article", content: "![Team collaboration](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200)\n\n# Your First Hire\nWhen you are turning down work, it is time to bring on help. Start with a junior version of yourself.\n\n### How to Structure It\n- Project-based, not hourly — protect your margins.\n- Pay them 30-50% of what you charge the client.\n- Document your process before delegating it." },
        {
          id: "mf-m5-l4", title: "Final Capstone Quiz", duration: "20:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What is a productized service?", options: ["A physical product", "A fixed offer with fixed price and timeline", "A free trial", "An hourly contract"], correctAnswer: 1 },
              { question: "Why are retainers the most valuable revenue model?", options: ["They are the easiest to sell", "They produce predictable recurring income", "They require no work", "Clients prefer them legally"], correctAnswer: 1 },
              { question: "When you hire your first subcontractor, you should pay them roughly:", options: ["The same rate you charge the client", "30-50% of what you charge the client", "Twice what you charge", "Nothing — give them experience"], correctAnswer: 1 },
            ],
          }
        },
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
        {
          id: "ai-m1-l4", title: "Quiz: AI Foundations", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What does LLM stand for?", options: ["Logical Language Model", "Large Language Model", "Linked Learning Module", "Local Language Memory"], correctAnswer: 1 },
              { question: "Best mindset shift for AI freelancers?", options: ["AI replaces me, so I should quit", "AI augments me, freeing time for strategy", "AI is a fad, ignore it", "AI only matters in tech"], correctAnswer: 1 },
            ],
          }
        },
      ],
    },
    {
      id: "ai-m2",
      title: "Module 3: Prompt Engineering Mastery",
      lessons: [
        { id: "ai-m2-l1", title: "Frameworks: CO-STAR and Beyond", duration: "20:00", isCompleted: false, type: "article", content: "![Prompt engineering](https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200)\n\n# Advanced Prompting\nMastering AI is mastering the **intent–output bridge**.\n\n### The CO-STAR Framework\n- **C**ontext — provide background.\n- **O**bjective — state the goal.\n- **S**tyle — define the writing style.\n- **T**one — emotional resonance.\n- **A**udience — who is this for?\n- **R**esponse — required output format.\n\n### Beyond CO-STAR\n- **Few-shot prompting** — give 2-3 examples of the output you want.\n- **Chain of thought** — ask the model to reason step by step.\n- **Role assignment** — *Act as a senior copywriter with 15 years of B2B SaaS experience.*" },
        {
          id: "ai-m2-l2", title: "Prompt Playground: Live Testing", duration: "30:00", isCompleted: false, type: "playground", content: "Test your frameworks here before deploying as client deliverables. Iterate at least 3 times — first drafts are rarely the best.", quiz_data: {
            prompts: [
              { title: "Client Strategy Prompt", code: "Act as a Senior Business Consultant. Create a 3-month growth plan for a SaaS startup specialising in [niche]. Use the CO-STAR framework. Output as a Notion-friendly markdown document." },
              { title: "Cold Outreach Generator", code: "Write 5 short cold LinkedIn DMs (max 80 words each) targeting [persona]. Each must reference a specific pain point and end with one qualifying question. Tone: confident but not pushy." },
              { title: "SEO Brief", code: "Create a content brief for an article titled '[topic]'. Include: target keyword, search intent, suggested H2s, internal link opportunities, and a 1-sentence meta description." },
            ],
          }
        },
        {
          id: "ai-m2-l3", title: "Quiz: Prompting Foundations", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What does the 'S' in CO-STAR stand for?", options: ["Strategy", "Style", "Synthesis", "Structure"], correctAnswer: 1 },
              { question: "Why is context important in a prompt?", options: ["It makes the response longer", "It helps the AI narrow down relevant patterns from training", "It is not important", "It makes the prompt look professional"], correctAnswer: 1 },
              { question: "Few-shot prompting means:", options: ["Sending many short prompts", "Giving the model 2-3 examples of the desired output", "Using a small AI model", "Asking quickly without thinking"], correctAnswer: 1 },
            ],
          }
        },
      ],
    },
    {
      id: "ai-m3",
      title: "Module 4: AI-Powered Service Delivery",
      lessons: [
        { id: "ai-m3-l1", title: "AI for Writing & Content", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/8psgEDhT1MM", content: "![Writing with AI](https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200)\n\n# Writing 10x Faster Without Sounding Like a Bot\nThe key is to use AI as a **first draft engine**, not a final-draft author.\n\n### The 4-Step Content Workflow\n1. **Outline yourself** — your unique angle, not the AI's generic take.\n2. **Expand with AI** — ask the AI to flesh out each section in a defined tone.\n3. **Edit ruthlessly** — cut 30%, add 1 personal example per section.\n4. **Final pass** — remove cliché phrases (*delve, tapestry, in the realm of, unlock, leverage*).\n\n### Content Types You Can Deliver\n- **Blog posts & SEO articles** — $150-$500 per piece.\n- **Email sequences** — $300-$1,200 for a 5-7 email nurture series.\n- **LinkedIn ghostwriting** — $800-$2,000/month for 3-5 posts per week.\n- **Case studies** — $400-$1,000 each.\n- **White papers** — $1,500-$5,000 depending on depth.\n\n### Pro Tips\n- Always inject **client voice** — interview them for 15 minutes and capture their phrases.\n- Use AI for structure, not soul. Your job is to add the soul.\n- Run everything through Grammarly or Hemingway Editor for polish.\n- Keep a swipe file of great examples in your niche." },
        { id: "ai-m3-l2", title: "AI for Design (Image Generation)", duration: "16:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/mvXkz9yTHGY", content: "![AI design](https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200)\n\n# Visual AI for Freelancers\nAI image generation has democratized design. You don't need to be a trained designer to deliver professional visuals.\n\n### Tools to Master\n- **Midjourney** — best for hero images, brand visuals, and artistic concepts. $10/month basic plan.\n- **DALL·E (inside ChatGPT Plus)** — quick mockups, product concepts, social media graphics.\n- **Canva Magic Studio** — fast social graphics with AI assist, templates, and brand kits.\n- **Leonardo.ai** — free tier available, great for consistent character generation.\n- **Stable Diffusion (via Clipdrop)** — free, open-source, more control for technical users.\n\n### What Clients Pay For\n- **Social media graphics pack** — 20 branded posts for $300-$800.\n- **Hero images for websites** — $50-$200 per image.\n- **Product mockups** — $100-$400 per set.\n- **Brand concept boards** — $500-$1,500.\n\n### The Winning Formula\n1. Generate 10-20 variations with AI.\n2. Pick the best 3.\n3. Polish in Figma or Canva — add typography, adjust colors, overlay brand elements.\n4. Deliver in multiple formats (PNG, JPG, SVG where applicable).\n\n### Pro Tip\nPure AI output looks generic. AI + human polish looks premium. Always add custom typography and brand-specific touches." },
        { id: "ai-m3-l3", title: "AI for Research & Analysis", duration: "20:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/WE9c9AZe-DY", content: "![Research with AI](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)\n\n# AI-Powered Research That Clients Pay For\nResearch used to take days. With AI, you can deliver comprehensive market analysis in hours.\n\n### Research Services You Can Offer\n- **Competitor analysis** — $500-$2,000.\n- **Market research reports** — $800-$3,000.\n- **Customer persona development** — $400-$1,500.\n- **Trend analysis** — $600-$2,500.\n- **Content gap analysis** — $300-$1,000.\n\n### Your AI Research Stack\n- **Perplexity Pro** — research with citations, perfect for fact-checking.\n- **Claude (Anthropic)** — best for analyzing long documents (100k+ tokens).\n- **ChatGPT with browsing** — real-time web data.\n- **Consensus.app** — AI-powered academic research.\n- **Elicit.org** — summarizes research papers.\n\n### The Research Workflow\n1. **Define the question** — what decision is the client trying to make?\n2. **Gather raw data** — use Perplexity and traditional search.\n3. **Synthesize with AI** — feed all sources to Claude, ask for patterns and insights.\n4. **Validate** — cross-check key claims with primary sources.\n5. **Package** — deliver as a slide deck or Notion doc with clear recommendations.\n\n### Example Prompt\n*Analyze these 5 competitor websites. Identify: (1) their core value propositions, (2) pricing strategies, (3) content marketing tactics, (4) gaps we can exploit. Output as a comparison table plus 3 strategic recommendations.*\n\n### Warning\nAI can hallucinate facts. Always verify statistics, quotes, and claims before delivering to clients." },
        { id: "ai-m3-l4", title: "AI for Code & No-Code Development", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/Hirwa5n3aBk", content: "![Coding with AI](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200)\n\n# Building Without Being a Developer\nYou don't need a computer science degree to deliver technical solutions anymore.\n\n### What You Can Build\n- **Landing pages** — $500-$2,500 each.\n- **Automation workflows** — $800-$3,000 setup.\n- **Custom GPTs** — $300-$1,500 per bot.\n- **Chrome extensions** — $1,000-$5,000.\n- **Simple web apps** — $2,000-$10,000.\n\n### Your AI Coding Stack\n- **Cursor** — AI-first code editor, best for building from scratch.\n- **GitHub Copilot** — AI pair programmer inside VS Code.\n- **v0.dev (by Vercel)** — generates React components from text prompts.\n- **Replit** — code and deploy in the browser with AI assist.\n- **Bolt.new** — full-stack apps from prompts.\n\n### No-Code + AI = Superpowers\n- **Webflow + ChatGPT** — design in Webflow, generate custom code snippets with AI.\n- **Bubble + AI plugins** — build complex apps without code.\n- **Zapier/Make + AI** — connect any tool to any AI model.\n\n### The Build Process\n1. **Spec it out** — write a clear requirements doc (AI can help).\n2. **Prototype with AI** — use Cursor or v0.dev to generate the first version.\n3. **Test and iterate** — AI code often needs debugging.\n4. **Deploy** — Vercel, Netlify, or Replit for hosting.\n5. **Document** — provide a handoff doc or Loom video.\n\n### Pro Tip\nStart with no-code tools (Webflow, Bubble, Framer) and use AI to fill the gaps. You'll deliver faster and with fewer bugs." },
        { id: "ai-m3-l5", title: "AI for Video & Audio Production", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/g_3e1IS3gjo", content: "![Video production](https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200)\n\n# AI-Powered Media Production\nVideo and audio used to require expensive equipment and teams. Not anymore.\n\n### Video Services You Can Offer\n- **Explainer videos** — $500-$2,500 per video.\n- **Social media video ads** — $300-$1,500 per ad.\n- **YouTube video editing** — $100-$500 per video.\n- **Talking head videos (AI avatars)** — $200-$800 per video.\n\n### Your AI Video Stack\n- **Descript** — edit video by editing text, AI voice cloning, filler word removal.\n- **Runway ML** — AI video generation and editing.\n- **HeyGen** — AI avatars that speak your script.\n- **ElevenLabs** — best AI voice generation.\n- **CapCut** — free, AI-powered video editing.\n- **Pictory** — turn blog posts into videos automatically.\n\n### Audio Services\n- **Podcast editing** — $50-$200 per episode.\n- **Voiceovers** — $100-$500 per project.\n- **Audio ads** — $200-$1,000 per ad.\n- **Audiobook narration** — $100-$300 per finished hour.\n\n### The Video Workflow\n1. **Script** — write or generate with AI.\n2. **Voiceover** — record yourself or use ElevenLabs.\n3. **Visuals** — stock footage (Pexels, Unsplash) + AI-generated images.\n4. **Edit** — Descript or CapCut.\n5. **Captions** — auto-generate with AI.\n6. **Export** — multiple formats for different platforms.\n\n### Pro Tip\nClients care about the final result, not how you made it. If an AI avatar saves you 4 hours and the client is happy, use it." },
        {
          id: "ai-m3-l6", title: "Quiz: AI Service Delivery", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "Best way to use AI in writing client deliverables?", options: ["Copy and paste the AI output directly", "Use AI for first drafts, then edit ruthlessly with your voice", "Avoid AI entirely", "Only use AI for headlines"], correctAnswer: 1 },
              { question: "Why combine AI images with human design polish?", options: ["AI cannot generate images", "Pure AI output looks generic; human polish makes it premium", "It is required by law", "It saves money"], correctAnswer: 1 },
              { question: "What should you always do with AI-generated research before delivering to clients?", options: ["Deliver it immediately", "Verify statistics and claims with primary sources", "Add more AI-generated content", "Translate it to another language"], correctAnswer: 1 },
              { question: "What is the advantage of using no-code tools with AI?", options: ["They are always free", "You can deliver faster with fewer bugs", "They require no learning", "They replace all developers"], correctAnswer: 1 },
            ],
          }
        },
      ],
    },
    {
      id: "ai-m4",
      title: "Module 5: Workflow Automation",
      lessons: [
        { id: "ai-m4-l1", title: "Introduction to AI Automation", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/s7wmiS2mSXY", content: "![Automation overview](https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1200)\n\n# Connecting AI to the Real World\nAI becomes exponentially more valuable when it can interact with your tools and workflows automatically.\n\n### What is AI Automation?\nAI automation combines:\n- **Triggers** — events that start the workflow (new email, form submission, scheduled time).\n- **AI processing** — the model analyzes, generates, or decides.\n- **Actions** — the result is sent somewhere (database, email, Slack, CRM).\n\n### The Automation Platforms\n- **Zapier** — easiest to learn, 6,000+ integrations, $20-$50/month.\n- **Make (formerly Integromat)** — more powerful, visual builder, $9-$29/month.\n- **n8n** — open-source, self-hosted, free but technical.\n- **Activepieces** — newer, AI-native, growing fast.\n\n### What Clients Pay For\n- **Lead qualification bot** — $800-$2,500 setup.\n- **Email auto-responder with AI** — $500-$1,500.\n- **Social media scheduler with AI captions** — $600-$2,000.\n- **Customer support triage** — $1,500-$5,000.\n- **Data enrichment pipeline** — $1,000-$4,000.\n\n### The Value Proposition\nA business owner paying $25/hour for a VA to manually qualify leads will happily pay you $1,500 once to automate it forever." },
        { id: "ai-m4-l2", title: "Building Your First AI Workflow", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/air6WvfDWSo", content: "![Automation flow](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200)\n\n# Your First Automation: Lead Qualification Pipeline\nLet's build something a real client will pay for.\n\n### The Workflow\n1. **Trigger:** New form submission lands in Google Sheets.\n2. **AI Processing:** Make.com sends the data to Claude with a qualifying prompt.\n3. **Decision:** Claude returns a score (1-10) and a 3-line summary.\n4. **Action:** Output is written back to the sheet and posted to Slack.\n\n### Step-by-Step Setup\n\n**Step 1: Connect Google Sheets**\n- In Make.com, add a Google Sheets module.\n- Select \"Watch New Rows.\"\n- Choose your sheet and specify which columns contain lead data.\n\n**Step 2: Add the AI Module**\n- Add an HTTP module to call the Claude API (or use OpenAI).\n- Set the endpoint: `https://api.anthropic.com/v1/messages`\n- Add your API key in headers.\n\n**Step 3: Write the Qualifying Prompt**\n```\nYou are a lead qualification expert. Analyze this lead:\n\nName: {{name}}\nCompany: {{company}}\nMessage: {{message}}\nBudget: {{budget}}\n\nScore this lead from 1-10 based on:\n- Budget fit (is it above $5,000?)\n- Message clarity (do they know what they want?)\n- Company legitimacy (real business or tire-kicker?)\n\nReturn JSON:\n{\n  \"score\": 8,\n  \"summary\": \"Strong lead. Clear project scope, realistic budget, established company.\",\n  \"next_action\": \"Schedule discovery call within 24 hours.\"\n}\n```\n\n**Step 4: Parse and Route**\n- Use Make's JSON parser to extract the score.\n- Add a Router: if score >= 7, send to Slack. If score < 7, add to a \"nurture\" list.\n\n**Step 5: Test and Deploy**\n- Run a test with sample data.\n- Check that all outputs land in the right places.\n- Turn on the automation.\n\n### What to Charge\nA small business will pay $800–$2,500 to set this up + $100-$300/month to maintain and optimize it.\n\n### Pro Tip\nAlways build in a sandbox first. Never test on live client data until you've run it 10 times successfully." },
        { id: "ai-m4-l3", title: "Advanced Automation Patterns", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/bZQun8Y4L2A", content: "![Advanced automation](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)\n\n# 5 High-Value Automation Patterns\n\n### 1. AI Email Assistant\n**What it does:** Reads incoming emails, categorizes them, drafts responses.\n**Stack:** Gmail + OpenAI + Gmail (send).\n**Pricing:** $1,200-$3,000 setup.\n\n### 2. Content Repurposing Engine\n**What it does:** Takes a blog post, generates 10 social posts, 5 email subject lines, and a LinkedIn article.\n**Stack:** RSS/Webhook + Claude + Airtable + Buffer.\n**Pricing:** $800-$2,500 setup + $200/month.\n\n### 3. Customer Support Triage\n**What it does:** New support ticket → AI reads it → assigns priority and category → routes to the right team member.\n**Stack:** Zendesk/Intercom + OpenAI + Slack.\n**Pricing:** $2,000-$5,000 setup.\n\n### 4. Meeting Notes & Action Items\n**What it does:** Zoom recording → transcription → AI summary → action items sent to project management tool.\n**Stack:** Zoom + AssemblyAI + Claude + Notion/Asana.\n**Pricing:** $1,500-$4,000 setup.\n\n### 5. Personalized Outreach at Scale\n**What it does:** Pulls LinkedIn profiles → AI writes personalized cold emails → sends via your email tool.\n**Stack:** Phantombuster + OpenAI + Lemlist/Instantly.\n**Pricing:** $1,000-$3,500 setup.\n\n### The Pattern\n1. **Trigger** (new data arrives).\n2. **Enrich** (pull additional context if needed).\n3. **AI processes** (analyzes, generates, decides).\n4. **Action** (send, save, notify).\n5. **Log** (track everything for debugging).\n\n### Pro Tip\nEvery automation should have a \"human escape hatch\" — a way for someone to review and override the AI's decision." },
        { id: "ai-m4-l4", title: "The Ethics of Automation", duration: "15:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/LqjP7O9SxOM", content: "![Ethical AI](https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200)\n\n# Ethical AI in Client Work\nWith great power comes great responsibility. Transparency is the foundation of long-term client relationships.\n\n### Best Practices\n\n**1. Disclose AI Usage**\nLet clients know when AI is part of the process. Most don't care how you do it, but they appreciate honesty.\n\n**2. Human-in-the-Loop**\nAlways verify AI outputs for accuracy and bias, especially in:\n- Legal or medical contexts.\n- Financial decisions.\n- Customer-facing communications.\n\n**3. Data Privacy**\n- Never paste client confidential data into free AI tools (ChatGPT free tier, Claude free tier).\n- Use API access with proper data handling agreements.\n- Check if the AI provider stores or trains on your data.\n\n**4. Attribution**\nIf AI generated an image or content and the client's brand guidelines require attribution, disclose it.\n\n**5. Bias Awareness**\nAI models can reflect biases from their training data. Review outputs for:\n- Gender, race, or cultural stereotypes.\n- Assumptions about geography or socioeconomic status.\n- Language that excludes or marginalizes.\n\n**6. Job Displacement Sensitivity**\nIf your automation replaces someone's job, acknowledge it. Help the client think through transition plans.\n\n### The Trust Equation\nClients who trust you will:\n- Refer you to others.\n- Pay you more.\n- Give you repeat business.\n\nClients who feel deceived will:\n- Leave bad reviews.\n- Demand refunds.\n- Warn others.\n\n### Your Ethical Checklist\n- [ ] I disclosed that AI is part of my workflow.\n- [ ] I verified all factual claims.\n- [ ] I used paid API access for client data.\n- [ ] I reviewed outputs for bias.\n- [ ] I provided a way for humans to override the AI." },
        {
          id: "ai-m4-l5", title: "Checklist: Deploying Your First Bot", duration: "10:00", isCompleted: false, type: "checklist", quiz_data: {
            tasks: [
              { id: "t1", title: "Map out the workflow", instruction: "List every step from trigger to completion on paper first. Draw it out." },
              { id: "t2", title: "Choose your platform", instruction: "Zapier for simplicity, Make for power, n8n for control." },
              { id: "t3", title: "Build in a sandbox", instruction: "Never test on live client data. Use dummy data for the first 10 runs." },
              { id: "t4", title: "Add error handling", instruction: "What happens if the AI returns no answer? Always have a fallback." },
              { id: "t5", title: "Test edge cases", instruction: "What if the input is blank? What if it's in a different language?" },
              { id: "t6", title: "Document for the client", instruction: "Provide a 1-page Loom walkthrough so they can use it without you." },
              { id: "t7", title: "Set up monitoring", instruction: "Use Make's error notifications or Zapier's task history to catch failures." },
            ],
          }
        },
        {
          id: "ai-m4-l6", title: "Quiz: Workflow Automation", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What are the three core components of an AI automation?", options: ["Trigger, AI processing, and action", "Input, output, and storage", "Code, server, and database", "Email, Slack, and Sheets"], correctAnswer: 0 },
              { question: "Why should you always build automations in a sandbox first?", options: ["It's required by law", "To avoid testing on live client data and causing errors", "Sandboxes are faster", "Clients prefer it"], correctAnswer: 1 },
              { question: "What is a 'human escape hatch' in automation?", options: ["A way to delete the automation", "A way for someone to review and override the AI's decision", "A backup server", "A manual mode for the client"], correctAnswer: 1 },
              { question: "Best practice for handling client data in AI workflows?", options: ["Use free AI tools for convenience", "Use paid API access with proper data handling", "Store everything in Google Sheets", "Share data publicly for transparency"], correctAnswer: 1 },
            ],
          }
        },
      ],
    },
    {
      id: "ai-m5",
      title: "Module 6: Selling AI Services to Clients",
      lessons: [
        { id: "ai-m5-l1", title: "Packaging AI as a Service", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/YJRqB1xtIxg", content: "![Selling AI](https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1200)\n\n# What Clients Actually Buy\nClients don't buy *AI*. They buy **outcomes** — saved time, more leads, lower costs, higher revenue.\n\n### The Mistake Most AI Freelancers Make\nThey lead with the technology: *\"I'll build you a GPT-4 powered chatbot with RAG and vector embeddings.\"*\n\nThe client hears: *\"I have no idea what you just said.\"*\n\n### The Right Approach\nLead with the business metric:\n- *\"We will reduce your support response time from 6 hours to 2 minutes.\"*\n- *\"We will generate 50 qualified leads per month on autopilot.\"*\n- *\"We will cut your content production time by 70%.\"*\n\nThen explain that AI is the mechanism.\n\n### Productized AI Offers\n- **AI Lead Qualifier** — $1,500 setup + $200/month maintenance.\n- **Content Engine** — 20 SEO articles/month for $2,500.\n- **Customer Support Bot** — $3,000 setup, trained on the client's docs.\n- **Social Media Manager** — 5 posts/day across 3 platforms for $800/month.\n- **Email Responder** — $1,200 setup + $150/month.\n\n### Pricing Strategy\n- **Setup fee** — covers your time to build and configure.\n- **Monthly retainer** — covers maintenance, monitoring, and optimization.\n- **Performance bonus** — optional, ties your pay to results.\n\n### Pro Tip\nPackage your service with a clear deliverable, timeline, and success metric. Clients buy certainty, not possibilities." },
        { id: "ai-m5-l2", title: "Finding Your First AI Clients", duration: "20:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/Ky3--8Pbhio", content: "![Finding clients](https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200)\n\n# Where to Find Clients Who Pay for AI\n\n### 1. Upwork & Freelance Marketplaces\n**Search terms:**\n- \"AI automation\"\n- \"ChatGPT integration\"\n- \"Zapier expert\"\n- \"AI content writer\"\n- \"Machine learning consultant\"\n\n**Pro tip:** Filter for clients who have spent $10k+ and have a 5-star rating. They pay well and on time.\n\n### 2. LinkedIn Outreach\n**Target personas:**\n- Marketing directors at B2B SaaS companies.\n- Operations managers at agencies.\n- Founders of 10-50 person startups.\n\n**Message template:**\n*Hi [Name], I noticed [Company] is growing fast. I help teams like yours save 15+ hours/week by automating [specific task] with AI. Would a 15-min call to explore this make sense?*\n\n### 3. Cold Email\n**Best targets:**\n- Companies hiring for roles you can automate (VA, content writer, data entry).\n- Agencies with 5-20 employees (big enough to pay, small enough to move fast).\n\n**Subject line:** *Quick question about [their pain point]*\n\n### 4. Referrals & Word of Mouth\nYour best clients come from happy clients. After every successful project:\n- Ask for a testimonial.\n- Ask for an introduction to 2 people in their network.\n- Offer a referral bonus ($200-$500 per closed deal).\n\n### 5. Content Marketing\nPublish case studies, tutorials, and demos:\n- LinkedIn posts showing before/after results.\n- YouTube videos walking through your process.\n- Twitter threads with actionable AI tips.\n\n### The Fastest Path to $5k/Month\n1. Land 1 client at $1,500 (setup project).\n2. Upsell them to $300/month retainer.\n3. Repeat 4 more times.\n4. You now have $6,500/month in recurring revenue." },
        { id: "ai-m5-l3", title: "The AI Sales Call Framework", duration: "22:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/ll5RI8DD37M", content: "![Sales call](https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200)\n\n# How to Close AI Deals on Discovery Calls\n\n### The 5-Part Framework\n\n**1. Set the Agenda (2 minutes)**\n*\"Thanks for jumping on. Here's what I'd like to cover: understand your current process, identify where AI can help, and if it makes sense, outline next steps. Sound good?\"*\n\n**2. Diagnose the Problem (10 minutes)**\nAsk open-ended questions:\n- *\"Walk me through how you currently handle [task].\"*\n- *\"What's the most time-consuming part?\"*\n- *\"What have you tried so far?\"*\n- *\"If we could wave a magic wand, what would the ideal outcome look like?\"*\n\n**3. Present the Solution (5 minutes)**\nDescribe the workflow in simple terms:\n- *\"Here's what we'd build: when X happens, the AI does Y, and the result goes to Z.\"*\n- Show a similar example or demo if you have one.\n- Emphasize the business outcome, not the tech.\n\n**4. Handle Objections (5 minutes)**\nCommon objections:\n- *\"Is AI accurate enough?\"* → *\"We build in human review for anything critical.\"*\n- *\"Will it replace my team?\"* → *\"No, it frees them to focus on higher-value work.\"*\n- *\"What if it breaks?\"* → *\"We monitor it daily and fix issues within 24 hours.\"*\n\n**5. Close or Advance (3 minutes)**\nDon't leave without a next step:\n- *\"Based on what we discussed, I think we can save you 20 hours/week. I'll send over a proposal by Friday. Does that work?\"*\n- Or: *\"This sounds like a great fit. I have availability to start next Monday. Should I send over the contract?\"*\n\n### Pro Tips\n- Let the client talk 70% of the time.\n- Take notes visibly (shows you're listening).\n- Never quote a price without understanding the problem first.\n- If they're not ready, offer a free audit or mini-project to build trust." },
        { id: "ai-m5-l4", title: "Writing Proposals That Win", duration: "18:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/gCwKfa4MGiQ", content: "![Proposal writing](https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200)\n\n# The AI Service Proposal Template\n\n### Structure\n\n**1. Executive Summary**\n*\"You're currently spending 30 hours/week manually qualifying leads. We'll build an AI-powered system that does this in real-time, freeing your team to focus on closing deals.\"*\n\n**2. The Problem (in their words)**\nRestate what they told you on the call:\n- Current process is manual and slow.\n- Leads fall through the cracks.\n- Sales team wastes time on unqualified prospects.\n\n**3. The Solution**\nDescribe the workflow:\n- New leads enter via your website form.\n- AI analyzes and scores each lead (1-10).\n- High-scoring leads are sent to Slack instantly.\n- Low-scoring leads go into a nurture sequence.\n\n**4. Deliverables**\nBe specific:\n- Fully configured Make.com workflow.\n- AI prompt tuned to your qualification criteria.\n- Slack integration with custom notifications.\n- 1-hour training session for your team.\n- 30 days of monitoring and optimization.\n\n**5. Timeline**\n- Week 1: Setup and configuration.\n- Week 2: Testing and refinement.\n- Week 3: Go live and monitor.\n- Week 4: Handoff and training.\n\n**6. Investment**\n- Setup: $1,800 (one-time).\n- Monthly maintenance: $250.\n- Optional: Performance bonus if we hit X metric.\n\n**7. Next Steps**\n*\"Reply to this email to confirm, and I'll send over the contract. We can start as early as next Monday.\"*\n\n### Pro Tips\n- Use the client's language, not jargon.\n- Include a case study or testimonial if you have one.\n- Offer 2-3 pricing tiers (good/better/best).\n- Add a FAQ section to preempt objections." },
        { id: "ai-m5-l5", title: "Delivering Excellence & Getting Referrals", duration: "16:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/Uo0BKSmMDKA", content: "![Client success](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200)\n\n# Turning Clients Into Advocates\n\n### The Delivery Checklist\n\n**Week 1: Kick-off**\n- Confirm scope and success metrics.\n- Get access to all necessary tools and data.\n- Set up a shared Slack channel or project board.\n\n**Week 2: Build**\n- Build the automation in a sandbox.\n- Test with dummy data.\n- Share a Loom video showing progress.\n\n**Week 3: Test & Refine**\n- Run the automation on real data (with client supervision).\n- Gather feedback and iterate.\n- Document edge cases and how you handled them.\n\n**Week 4: Launch & Train**\n- Go live.\n- Train the client's team (record the session).\n- Provide a 1-page \"how to use this\" guide.\n\n### Post-Launch\n- Check in after 1 week, 2 weeks, and 1 month.\n- Ask: *\"What's working? What could be better?\"*\n- Proactively suggest improvements.\n\n### The Referral Ask\nAfter a successful project:\n\n*\"I'm so glad this is working well for you. Quick question: do you know 2-3 other [role] who might benefit from something similar? I'd love an intro, and I'm happy to offer them a discount as a thank-you.\"*\n\n### Upsell Opportunities\n- *\"Now that the lead qualifier is running, want to automate your follow-up emails too?\"*\n- *\"I noticed you're still manually posting to social media. We could automate that for $400/month.\"*\n\n### Pro Tip\nYour reputation is your most valuable asset. Deliver on time, communicate proactively, and always leave the client better than you found them." },
        {
          id: "ai-m5-l6", title: "Final Capstone Quiz", duration: "15:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What do clients actually buy when you sell AI services?", options: ["AI tools", "Outcomes like saved time and more revenue", "Cool tech demos", "Subscriptions"], correctAnswer: 1 },
              { question: "Best way to pitch an AI service?", options: ["Lead with the technology details", "Lead with the business metric you'll improve", "Show off your prompts", "Promise it will replace all employees"], correctAnswer: 1 },
              { question: "What is one rule for ethical AI delivery?", options: ["Always hide that you used AI", "Disclose AI usage and keep humans in the loop", "Use only paid models", "Avoid all client data"], correctAnswer: 1 },
              { question: "On a discovery call, who should talk more?", options: ["You should talk 70% of the time", "The client should talk 70% of the time", "Equal 50/50 split", "Neither, just send a proposal"], correctAnswer: 1 },
              { question: "What should you always include in a proposal?", options: ["Your entire resume", "Specific deliverables, timeline, and investment", "A list of all AI tools you know", "Your personal story"], correctAnswer: 1 },
              { question: "Best time to ask for referrals?", options: ["During the sales call", "After a successful project", "Before you start work", "Never ask"], correctAnswer: 1 },
            ],
          }
        },
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
        {
          id: "tp-m1-l3", title: "Quiz: Vetting Protocols", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "What level of English proficiency is generally required for international placements?", options: ["A1 / A2", "B1 / B2", "C1 / C2", "None required"], correctAnswer: 2 },
            ],
          }
        },
      ],
    },
    {
      id: "tp-m2",
      title: "Phase 2: Pedagogy & Lesson Design",
      lessons: [
        { id: "tp-m2-l1", title: "Curriculum Design for Modern Learners", duration: "25:00", isCompleted: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: "tp-m2-l2", title: "Engaging Digital Classrooms", duration: "20:00", isCompleted: false, type: "article", content: "![Classroom tech](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200)\n\n# Digital Engagement\nModern teaching requires interactive touchpoints every 5 minutes.\n\n### Techniques\n- Use polls and quick quizzes.\n- Breakout rooms for peer learning.\n- Gamified reward systems." },
        {
          id: "tp-m2-l3", title: "Activity: Lesson Simulator", duration: "30:00", isCompleted: false, type: "simulator", quiz_data: {
            scenarios: [
              {
                context: "A student is disengaged in a virtual classroom.", prompt: "How do you pivot the lesson?", options: [
                  { text: "Reprimand them", explanation: "Negative reinforcement rarely works in digital spaces." },
                  { text: "Gamify the next concept", explanation: "Gamification increases retention and engagement instantly." },
                ], correct: 1
              },
            ],
          }
        },
        {
          id: "tp-m2-l4", title: "Quiz: Pedagogy Review", duration: "10:00", isCompleted: false, type: "quiz", quiz_data: {
            questions: [
              { question: "How frequently should you include interactive touchpoints in a digital lesson?", options: ["Every 60 minutes", "Every 5 minutes", "Only at the end", "Never"], correctAnswer: 1 },
            ],
          }
        },
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
