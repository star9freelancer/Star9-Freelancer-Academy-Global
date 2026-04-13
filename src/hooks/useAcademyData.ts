import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

// Weekly pacing: modules are grouped into weeks.
// Students can only access modules for weeks they've reached.
// Each course runs 8-12 weeks = 2-3 months

const CURRICULUM_LEDGER = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    title: 'AI for Freelancers',
    category: 'AI & Automation',
    ai_tools_covered: ['ChatGPT', 'Midjourney', 'Zapier', 'Make', 'Claude', 'Canva AI', 'Grammarly'],
    overview: 'Future-proof your career. This 10-week intensive program empowers modern freelancers with practical AI skills to multiply productivity, build automated workflows, and increase earning capacity.',
    learning_outcomes: [
      'Master core AI fundamentals and navigate top-tier industry tools with confidence',
      'Deploy AI for rapid content creation, complex coding, and deep research',
      'Engineer automated workflows that save hours of manual labor every week',
      'Package, market, and deliver high-value AI-enhanced services to global clients'
    ],
    assessment_details: 'Pass all module quizzes with at least 80% and complete the final project to earn your certificate.',
    duration: '10 Weeks',
    total_weeks: 10,
    commitment: '12-15 hrs/week',
    price: 5,
    price_tier: 'learner',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      // WEEK 1: Foundations
      {
        id: 'a1', title: 'Module 1: The AI Economy', week: 1, duration_minutes: 25, type: 'article',
        content: `# Welcome to the AI Economy\n\nArtificial Intelligence is no longer just a buzzword for Silicon Valley. It is the foundational toolset for the modern freelancer. In this module, we explore why adopting AI is the highest ROI activity you can undertake today.\n\n## The AI Advantage\nFreelancers utilizing tools like ChatGPT and Claude are reporting productivity increases of 40-60%. It is not about replacing human creativity; it is about eliminating the friction between an idea and its execution.\n\n> "AI won't replace freelancers. Freelancers who use AI will replace those who don't."\n\n## Core Paradigms\n**1. The Centaur Model**\nYou are the strategist. The AI is the executor. Never accept AI output as a final product. Your value is in your taste, your editing, and your domain expertise.\n\n**2. Iterative Prompting**\nGreat results come from conversations, not single commands. Treat AI like a brilliant intern who lacks context.\n\n**3. The 80/20 Rule of AI**\nAI handles the 80% of repetitive, templated work so you can focus on the 20% that requires human creativity and judgment.\n\n## Key Statistics\n- 72% of top-earning freelancers on Upwork now use AI tools daily\n- AI-assisted freelancers earn 34% more per project on average\n- Companies are 3x more likely to hire freelancers who demonstrate AI proficiency\n\n## The African Context\nAfrica's freelance market grew 130% between 2020-2025. AI adoption among African freelancers is still under 20%, creating a massive first-mover advantage for those who learn now.\n\n## Assignment\nCreate a free account on ChatGPT (chat.openai.com) and Claude (claude.ai). Familiarize yourself with their interfaces and write your first prompt.`
      },
      {
        id: 'a2', title: 'Module 2: AI Tools Landscape', week: 1, duration_minutes: 20, type: 'article',
        content: `# Navigating the AI Tool Ecosystem\n\nThere are hundreds of AI tools. You do not need all of them. This module maps the essential toolkit for freelancers.\n\n## Tier 1: Must-Have (Free)\n- **ChatGPT**: General-purpose AI. Writing, brainstorming, coding, analysis.\n- **Claude**: Superior for nuanced writing and following detailed instructions.\n- **Google Gemini**: Integrated with Google Workspace.\n\n## Tier 2: Power Tools (Freemium)\n- **Canva AI**: Design and visual content creation.\n- **Grammarly**: Writing enhancement and tone adjustment.\n- **Otter.ai**: Meeting transcription and notes.\n\n## Tier 3: Specialist Tools (Paid)\n- **Midjourney**: High-quality image generation.\n- **Jasper**: Marketing copy specialist.\n- **Descript**: Video editing with AI.\n\n## Tier 4: Automation\n- **Zapier**: Simple workflow automation.\n- **Make (Integromat)**: Complex multi-step automation.\n- **n8n**: Open-source automation for technical users.\n\n## How to Choose\nStart with Tier 1. Add tools only when you have a specific use case. The goal is mastery of a few tools, not surface-level familiarity with many.\n\n## Cost Optimization\nMost tools offer free tiers sufficient for starting freelancers. Budget $20-50/month for AI tools once you are earning consistently.\n\n## Assignment\nCreate accounts on ChatGPT, Claude, and Canva. Complete the onboarding tutorial for each. Document which features seem most relevant to your freelancing niche.`
      },
      // WEEK 2: Prompt Engineering
      {
        id: 'a3', title: 'Module 3: Prompt Engineering Fundamentals', week: 2, duration_minutes: 30, type: 'playground',
        content: `Mastering prompt engineering is the single most valuable technical skill you can learn this year.\n\nThe difference between generic AI output and professional-grade deliverables is entirely dictated by the quality of your prompt. We use the **R.C.T.F.C** Framework:\n\n- **R**ole: Tell the AI who it is.\n- **C**ontext: Provide the background.\n- **T**ask: Explain exactly what needs to be done.\n- **F**ormat: Define the exact output structure.\n- **C**onstraints: State what it MUST NOT do.\n\nCopy the prompts in the workspace and test them in ChatGPT or Claude to see the difference.`,
        quiz_data: {
          prompts: [
            { title: "The Perfect Copywriting Prompt", code: "ACT AS: A senior conversion copywriter with 10 years of experience in direct-response marketing.\n\nCONTEXT: We are launching a new B2B SaaS tool that automates invoice collection for creative agencies.\n\nTASK: Write a 300-word cold email to marketing agency owners.\n\nFORMAT: 1 subject line, 3 short paragraphs, 1 clear call to action.\n\nCONSTRAINTS: Do not use the words 'innovative', 'revolutionary', or 'game-changer'. Keep reading level below 8th grade." },
            { title: "The Code Debugger Prompt", code: "ACT AS: A Senior React/TypeScript Developer.\n\nCONTEXT: I am building a dashboard and getting an infinite loop in my useEffect hook.\n\nTASK: Review the following code snippet and identify the exact cause of the infinite render. Then, provide the corrected code.\n\nFORMAT:\n1. Explanation of the bug (bullet points)\n2. Corrected code block\n3. Best practice tip for the future.\n\n[INSERT CODE HERE]" },
            { title: "The Content Repurposer", code: "ACT AS: A Social Media Manager specializing in LinkedIn and Twitter growth.\n\nCONTEXT: I have a 1,500 word blog post about remote work productivity.\n\nTASK: Repurpose this blog post into:\n1. A highly engaging LinkedIn text post with a hook.\n2. A 5-part Twitter thread.\n\nCONSTRAINTS: Do not use emojis in the Twitter thread. Ensure each tweet is under 280 characters." }
          ]
        }
      },
      {
        id: 'a4', title: 'Module 4: Advanced Prompting Techniques', week: 2, duration_minutes: 25, type: 'article',
        content: `# Beyond Basic Prompts\n\nOnce you have mastered the R.C.T.F.C framework, it is time to learn advanced techniques that separate professionals from amateurs.\n\n## Chain-of-Thought Prompting\nAsk the AI to "think step by step" before answering. This dramatically improves accuracy for complex tasks.\n\nExample: "Before writing the email, first analyze the target audience, identify their top 3 pain points, then draft the email addressing each pain point."\n\n## Few-Shot Learning\nProvide examples of what you want:\n"Here are 3 examples of headlines that performed well: [examples]. Now write 5 new headlines in the same style for [topic]."\n\n## System Prompts\nIn ChatGPT, use Custom Instructions to set a persistent context:\n- "I am a freelance content writer specializing in B2B SaaS"\n- "Always write in active voice, 8th grade reading level"\n- "Never use cliches or buzzwords"\n\n## Prompt Chaining\nBreak complex tasks into sequential prompts:\n1. Prompt 1: "Research the top 10 trends in [industry]"\n2. Prompt 2: "Based on these trends, generate 20 blog post ideas"\n3. Prompt 3: "Write a detailed outline for idea #7"\n4. Prompt 4: "Write the full article following this outline"\n\n## Common Mistakes\n- Being too vague ("write something about marketing")\n- Not providing context about the audience\n- Accepting the first output without iteration\n- Forgetting to specify format and length\n\n## Practice Exercise\nTake a task you do regularly and write 3 versions of the prompt: basic, intermediate (R.C.T.F.C), and advanced (with chain-of-thought). Compare the outputs.`,
        quiz_data: {
          questions: [
            { question: "What does the 'C' in R.C.T.F.C stand for (first C)?", options: ["Command", "Context", "Create", "Clarify"], correctAnswer: 1 },
            { question: "What is chain-of-thought prompting?", options: ["Sending multiple unrelated prompts", "Asking AI to think step by step", "Using AI to generate chains", "A type of automation"], correctAnswer: 1 },
            { question: "What is few-shot learning in prompting?", options: ["Using very short prompts", "Providing examples of desired output", "Learning AI in a few days", "Using AI for photography"], correctAnswer: 1 },
            { question: "Which is a common prompting mistake?", options: ["Being too specific", "Providing too many examples", "Being too vague and accepting first output", "Using the R.C.T.F.C framework"], correctAnswer: 2 },
            { question: "What are Custom Instructions in ChatGPT?", options: ["One-time prompts", "Persistent context settings", "API configurations", "Plugin settings"], correctAnswer: 1 }
          ]
        }
      },
      // WEEK 3: AI for Research & Writing
      {
        id: 'a5', title: 'Module 5: AI for Research & Analysis', week: 3, duration_minutes: 45, type: 'video',
        video_url: 'https://www.youtube.com/embed/z-EtmaFJieY',
        content: `Watch this tutorial on how to use AI tools for deep research and competitive analysis. Pay close attention to how prompts are structured for extracting specific data.\n\nAfter watching, complete the quiz to continue.`,
        quiz_data: {
          questions: [
            { question: "What is the primary benefit of AI for freelancers?", options: ["Replacing human workers", "Increasing productivity and efficiency", "Making work more complicated", "Reducing client expectations"], correctAnswer: 1 },
            { question: "Which framework is taught for prompt engineering?", options: ["S.M.A.R.T", "R.C.T.F.C", "A.I.D.A", "P.E.S.T"], correctAnswer: 1 },
            { question: "What percentage of top Upwork freelancers use AI tools daily?", options: ["32%", "52%", "72%", "92%"], correctAnswer: 2 },
            { question: "What is the Centaur Model?", options: ["AI replaces humans entirely", "Human strategist + AI executor working together", "A type of machine learning algorithm", "An AI pricing model"], correctAnswer: 1 },
            { question: "What should you never do with raw AI output?", options: ["Edit it", "Review it", "Accept it as final product", "Share it with colleagues for review"], correctAnswer: 2 }
          ]
        }
      },
      {
        id: 'a6', title: 'Module 6: AI-Powered Writing & Content', week: 3, duration_minutes: 25, type: 'article',
        content: `# Creating Professional Content with AI\n\nContent creation is where AI truly shines for freelancers.\n\n## The Content Pipeline\n**Stage 1: Ideation** - Use AI to brainstorm topics. "Generate 20 blog post ideas for [niche] that would rank well on Google in 2026."\n\n**Stage 2: Outlining** - Have AI create detailed outlines. Always provide your target audience and desired tone.\n\n**Stage 3: First Draft** - Let AI write the first draft, then apply your expertise to edit, fact-check, and add your unique voice.\n\n**Stage 4: Optimization** - Use AI for SEO optimization, readability scoring, and headline testing.\n\n## Tools Covered\n- **ChatGPT**: Best for long-form content and complex reasoning\n- **Claude**: Superior for nuanced writing and following detailed instructions\n- **Grammarly**: AI-powered editing and tone adjustment\n\n## Case Study: Sarah from Lagos\nSarah, a freelance content writer, increased her monthly output from 8 articles to 25 articles using the AI content pipeline. Her monthly revenue grew from $2,400 to $7,500 without sacrificing quality.\n\n> "I spend 70% less time on first drafts and redirect that time to research and client strategy."\n\n## Practice Exercise\nUsing the R.C.T.F.C framework, write a prompt that generates a 500-word LinkedIn article about the future of remote work in Africa. Compare outputs from ChatGPT and Claude.`
      },
      // WEEK 4: Visual Content & Design
      {
        id: 'a7', title: 'Module 7: AI for Design & Visual Content', week: 4, duration_minutes: 25, type: 'article',
        content: `# Visual Content Creation with AI\n\nAI image generation has revolutionized visual content for freelancers who are not professional designers.\n\n## Tools Overview\n- **DALL-E 3 (via ChatGPT)**: Best for quick iterations and specific compositions.\n- **Canva AI**: Best for social media templates and brand-consistent designs.\n- **Remove.bg**: Instant background removal.\n- **Midjourney**: Best for artistic, high-quality images (requires Discord).\n\n## Prompt Structure for Image Generation\n1. **Subject**: What is in the image?\n2. **Style**: Photography? Illustration? 3D render?\n3. **Mood**: Warm? Professional? Energetic?\n4. **Technical**: Aspect ratio, lighting, camera angle\n\n## Example Prompt\n"Professional headshot of a confident African businesswoman in a modern office, natural lighting, shallow depth of field, warm color palette, 4:5 aspect ratio"\n\n## Ethical Considerations\n- Always disclose AI-generated images to clients\n- Never use AI to generate images of real people without consent\n- Use AI images as starting points, not final deliverables for premium clients\n\n## Practice\nGenerate 5 social media post images for a fictional coffee brand using DALL-E 3 or Canva AI. Create variations in style and mood.`
      },
      {
        id: 'a8', title: 'Module 8: Building a Visual Brand with AI', week: 4, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "vb1", title: "Create a brand mood board", instruction: "Use Canva or Pinterest to collect 10-15 images that represent your freelance brand's visual identity. Include colors, typography, and imagery styles." },
            { id: "vb2", title: "Generate brand assets", instruction: "Use Canva AI to create: a simple logo concept, a social media banner, and 3 Instagram post templates consistent with your brand." },
            { id: "vb3", title: "Design a portfolio cover", instruction: "Create a professional portfolio cover image using AI tools. It should communicate your niche and expertise clearly." },
            { id: "vb4", title: "Build a social media content calendar", instruction: "Plan 2 weeks of content (14 posts) with AI-generated visuals and captions. Use a spreadsheet to organize post type, platform, and schedule." },
            { id: "vb5", title: "Create a client presentation template", instruction: "Design a 5-slide presentation template in Canva that you can reuse for client proposals and project updates." }
          ]
        }
      },
      // WEEK 5: Automation Basics
      {
        id: 'a9', title: 'Module 9: Workflow Automation with Zapier', week: 5, duration_minutes: 30, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "t1", title: "Map your repetitive tasks", instruction: "Write down 5 tasks you do every week that do not require deep thinking (e.g., sending invoices, transferring lead data, scheduling posts)." },
            { id: "t2", title: "Create a Zapier account", instruction: "Sign up for a free Zapier account at zapier.com. Explore the dashboard and understand Triggers and Actions." },
            { id: "t3", title: "Build your first Zap", instruction: "Create a Zap: New Email in Gmail matching a label -> Log sender details in Google Sheets." },
            { id: "t4", title: "Create client onboarding automation", instruction: "Build a multi-step Zap: New form submission -> Create Google Drive folder -> Send welcome email -> Add row to client tracker." },
            { id: "t5", title: "Test and document", instruction: "Run each automation 3 times. Document the time saved per week and calculate your monthly ROI." }
          ]
        }
      },
      {
        id: 'a10', title: 'Module 10: Advanced Automation with Make', week: 5, duration_minutes: 25, type: 'article',
        content: `# Beyond Zapier: Complex Automations with Make\n\nWhile Zapier excels at simple linear automations, Make (formerly Integromat) allows you to build complex, branching workflows.\n\n## When to Use Make vs Zapier\n- **Zapier**: Simple "if this, then that" automations. Best for beginners.\n- **Make**: Multi-branch workflows with routers, filters, and error handling.\n\n## Building a Client Proposal Automation\nWhen a lead fills out your intake form, automatically:\n1. Create a custom proposal using AI (API call to OpenAI)\n2. Generate a branded PDF\n3. Send via email with personalized subject\n4. Log in your CRM\n5. Set a follow-up reminder for 3 days later\n\n## Error Handling\n- **Retry logic**: Automatically retry failed steps up to 3 times\n- **Fallback paths**: If the AI API is down, queue for later\n- **Notifications**: Alert yourself via Slack when critical automations fail\n\n## Cost Analysis\nA freelancer billing $50/hour who saves 10 hours/month through automation effectively earns an extra $6,000/year. The tools cost roughly $30/month combined.\n\n## Assignment\nSign up for Make.com (free tier) and recreate one of your Zapier automations. Compare the experience.`
      },
      // WEEK 6: AI for Coding & Technical Work
      {
        id: 'a11', title: 'Module 11: AI for Coding & Development', week: 6, duration_minutes: 25, type: 'article',
        content: `# Using AI as Your Coding Partner\n\nEven if you are not a developer, understanding how to use AI for technical tasks opens high-value service opportunities.\n\n## AI Coding Assistants\n- **GitHub Copilot**: Real-time code suggestions in your editor\n- **ChatGPT/Claude**: Explain code, debug issues, write functions\n- **Cursor**: AI-native code editor\n\n## Use Cases for Non-Developers\n1. **Website tweaks**: "Add a contact form to this HTML page"\n2. **Data processing**: "Write a Python script to merge these CSV files"\n3. **Spreadsheet formulas**: "Create a Google Sheets formula that calculates..."\n4. **No-code customization**: "Write custom CSS to change the header color"\n\n## Use Cases for Developers\n1. **Boilerplate code**: Generate repetitive structures instantly\n2. **Debugging**: Paste error messages and get solutions\n3. **Code review**: Ask AI to review your code for bugs and best practices\n4. **Documentation**: Generate README files and API docs\n\n## Best Practices\n- Always review AI-generated code before using in production\n- Test thoroughly; AI code can contain subtle bugs\n- Use AI for the first draft, then refine manually\n- Never paste sensitive credentials into AI tools\n\n## Assignment\nUse ChatGPT to build a simple personal portfolio webpage. Start with a prompt describing what you want, iterate 3-4 times, then deploy it for free on Netlify or Vercel.`
      },
      {
        id: 'a12', title: 'Module 12: AI for Data Analysis', week: 6, duration_minutes: 20, type: 'article',
        content: `# Turning Data into Insights with AI\n\nData analysis is one of the highest-paying freelance skills. AI makes it accessible to non-technical professionals.\n\n## ChatGPT Advanced Data Analysis\nUpload spreadsheets, CSVs, or datasets directly to ChatGPT and ask:\n- "Summarize the key trends in this data"\n- "Create a chart showing sales by month"\n- "Identify outliers and anomalies"\n- "Write a report with 5 key findings"\n\n## Google Sheets + AI\n- Use ChatGPT to generate complex formulas\n- Create pivot tables with AI guidance\n- Automate data cleaning workflows\n\n## Freelance Data Services You Can Offer\n1. **Monthly reporting dashboards** for small businesses\n2. **Market research reports** using AI-gathered data\n3. **Competitor analysis** with structured data comparison\n4. **Survey analysis** with AI-generated insights\n\n## Pricing Data Services\n- Basic report: $200-500\n- Comprehensive analysis: $500-1,500\n- Ongoing monthly dashboards: $300-800/month\n\n## Assignment\nDownload a free dataset from Kaggle.com. Upload it to ChatGPT and ask 5 analytical questions. Create a one-page summary report of your findings.`
      },
      // WEEK 7: Selling AI Services
      {
        id: 'a13', title: 'Module 13: Selling AI-Enhanced Services', week: 7, duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You are pitching an 'AI Copywriting Retainer' to a new client paying a traditional agency $2000/mo.",
              prompt: "CLIENT: 'If you're using ChatGPT, why should I pay you $1,500/month? I could use it myself.'",
              correct: 1,
              options: [
                { text: "Because I have the premium version of ChatGPT.", explanation: "This focuses on the wrong value. Anyone can buy ChatGPT Plus." },
                { text: "You're paying for strategy, fact-checking, brand voice alignment, and editing. ChatGPT is just my typewriter; I'm the author.", explanation: "Correctly positions AI as a tool and your value around expertise." },
                { text: "I can lower to $500 since I use AI.", explanation: "Never unnecessarily discount. Value-based pricing applies regardless of tools." }
              ]
            },
            {
              context: "A client asks about your process for a website redesign.",
              prompt: "CLIENT: 'Do you use AI? I'm worried about quality.'",
              correct: 2,
              options: [
                { text: "No, I do everything manually.", explanation: "Dishonesty will backfire." },
                { text: "Yes, AI does most of the work.", explanation: "Devalues your expertise." },
                { text: "I use AI as one of many tools, similar to how architects use CAD. The creative direction and quality control are all mine.", explanation: "Transparent, professional, positions AI correctly." }
              ]
            }
          ]
        }
      },
      {
        id: 'a14', title: 'Module 14: Packaging Your AI Services', week: 7, duration_minutes: 25, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "p1", title: "Define your AI-enhanced service", instruction: "Choose one service and define how AI improves it. Example: 'AI-Powered Blog Writing Package - 8 SEO articles/month.'" },
            { id: "p2", title: "Create a pricing structure", instruction: "Develop three tiers (Basic, Pro, Premium) with clear deliverables. Price based on value delivered." },
            { id: "p3", title: "Build a case study", instruction: "Document a real or hypothetical project showing before/after of AI integration with metrics." },
            { id: "p4", title: "Write your proposal template", instruction: "Create a one-page proposal that explains your AI-enhanced process, focusing on outcomes." },
            { id: "p5", title: "Prepare objection responses", instruction: "Write professional responses to the top 5 objections clients raise about AI-assisted work." }
          ]
        }
      },
      // WEEK 8: Ethics, Quality & AI Best Practices
      {
        id: 'a15', title: 'Module 15: AI Ethics & Professional Standards', week: 8, duration_minutes: 20, type: 'article',
        content: `# Ethical AI Usage for Freelancers\n\nAs AI becomes central to your workflow, understanding ethical boundaries is critical.\n\n## The Transparency Principle\nAlways be transparent with clients about your use of AI tools. This does not mean listing every tool; it means not misrepresenting AI-generated work as entirely hand-crafted.\n\n## Data Privacy\n- Never input client confidential data into public AI tools without permission\n- Use enterprise AI accounts for sensitive information\n- Understand data retention policies of each tool\n\n## Quality Assurance\n- Always fact-check AI-generated content\n- Run plagiarism checks on AI-written text\n- Review AI-generated code for security vulnerabilities\n- Never ship AI output without human review\n\n## Intellectual Property\n- Understand who owns AI-generated content in your jurisdiction\n- Include AI usage clauses in client contracts\n- Keep records of your creative input and editing\n\n## The Future of AI in Freelancing\nFreelancers who thrive will:\n1. Continuously update their AI skills\n2. Focus on uniquely human abilities\n3. Build systems that leverage AI for scale\n4. Position themselves as AI-augmented experts\n\n> "The goal is not to become an AI expert. The goal is to become an expert who uses AI."`
      },
      {
        id: 'a16', title: 'Module 16: Quality Control & Review Processes', week: 8, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "qc1", title: "Create a QA checklist", instruction: "Build a quality assurance checklist for AI-generated deliverables: fact-checking, tone consistency, plagiarism check, client brief alignment, formatting." },
            { id: "qc2", title: "Set up a review workflow", instruction: "Define your personal review process: AI Draft -> Human Edit -> Quality Check -> Client Preview -> Final Delivery." },
            { id: "qc3", title: "Test plagiarism tools", instruction: "Run 3 AI-generated articles through Grammarly's plagiarism checker. Note the originality scores and adjust your workflow accordingly." },
            { id: "qc4", title: "Create client contracts", instruction: "Draft a freelance contract template that includes: scope, deliverables, revision limits, AI disclosure, payment terms, and IP ownership." },
            { id: "qc5", title: "Build a feedback system", instruction: "Create a simple feedback form (Google Form or Typeform) to send clients after project completion." }
          ]
        }
      },
      // WEEK 9: Building Your AI-Powered Business
      {
        id: 'a17', title: 'Module 17: Building an AI-Powered Freelance Business', week: 9, duration_minutes: 25, type: 'article',
        content: `# From Freelancer to AI-Powered Business\n\nThis module brings everything together into a sustainable business model.\n\n## The AI-Powered Freelancer Stack\n\n**Client Acquisition**\n- AI-written proposals and cold outreach\n- Automated lead nurturing sequences\n- AI-optimized portfolio and LinkedIn profile\n\n**Service Delivery**\n- AI-assisted content/code/design creation\n- Automated quality checks\n- Template-driven deliverables for consistency\n\n**Business Operations**\n- Automated invoicing and follow-ups\n- AI-powered time tracking and estimates\n- Client onboarding automations\n\n**Growth**\n- AI market research for new service opportunities\n- Automated testimonial collection\n- Content marketing powered by AI\n\n## Revenue Goals\n**Month 1-3**: $500-1,500/month (building portfolio, landing first clients)\n**Month 3-6**: $1,500-4,000/month (repeat clients, referrals)\n**Month 6-12**: $4,000-10,000/month (premium positioning, productized services)\n\n## Scaling Options\n1. Raise prices as demand increases\n2. Create productized services (fixed scope, fixed price)\n3. Hire subcontractors for overflow work\n4. Build passive income through templates/courses\n\n## Assignment\nCreate a 6-month business plan using the template provided. Include: target market, services, pricing, monthly revenue goals, and marketing strategy.`
      },
      {
        id: 'a18', title: 'Module 18: Marketing Yourself as an AI Expert', week: 9, duration_minutes: 20, type: 'article',
        content: `# Personal Branding for AI-Augmented Freelancers\n\n## Your LinkedIn Strategy\n1. **Headline**: Include "AI-Powered" or "AI-Enhanced" in your title\n2. **About section**: Tell your story of transformation through AI\n3. **Featured**: Pin case studies showing AI-powered results\n4. **Content**: Post weekly about AI tools and tips in your niche\n\n## Building Authority\n- Share AI tips relevant to your niche on LinkedIn (2-3x/week)\n- Create a simple newsletter documenting your AI journey\n- Contribute to relevant online communities\n- Offer free AI tool workshops for your network\n\n## Portfolio Optimization\nEvery portfolio piece should show:\n- The challenge the client faced\n- How you used AI to solve it efficiently\n- The measurable results achieved\n- Time/cost savings compared to traditional methods\n\n## Networking\n- Join freelancer communities (Africa-focused: ALN, Andela Community)\n- Attend virtual AI events and share learnings\n- Build relationships with other AI-augmented freelancers\n- Create referral partnerships\n\n## Assignment\nUpdate your LinkedIn profile using the guidelines above. Write and publish your first LinkedIn post about AI in freelancing.`
      },
      // WEEK 10: Capstone & Final Assessment
      {
        id: 'a19', title: 'Module 19: Capstone Project', week: 10, duration_minutes: 40, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "cap1", title: "Select your capstone topic", instruction: "Choose a real client project or detailed fictional brief involving content creation, automation, and delivery." },
            { id: "cap2", title: "Build the AI workflow", instruction: "Document every AI tool used, every prompt written, and every automation created. Screenshot each step." },
            { id: "cap3", title: "Create the deliverable", instruction: "Produce the final deliverable (5 blog posts, a marketing campaign, or a website prototype) using your AI-enhanced workflow." },
            { id: "cap4", title: "Calculate ROI", instruction: "Compare time and cost of producing this deliverable with and without AI. Present savings as a percentage." },
            { id: "cap5", title: "Write a reflection", instruction: "Write a 500-word reflection on what you learned, what surprised you, and how you will integrate AI into daily practice." }
          ]
        }
      },
      {
        id: 'a20', title: 'Module 20: Final Assessment', week: 10, duration_minutes: 25, type: 'video',
        video_url: 'https://www.youtube.com/embed/z-EtmaFJieY',
        content: `Watch this comprehensive review, then complete the final quiz to earn your certificate.`,
        quiz_data: {
          questions: [
            { question: "What does the 'R' stand for in R.C.T.F.C?", options: ["Result", "Role", "Reference", "Research"], correctAnswer: 1 },
            { question: "Which tool is best for complex multi-branch automations?", options: ["Zapier", "Make (Integromat)", "Gmail filters", "IFTTT"], correctAnswer: 1 },
            { question: "How should you handle client questions about AI usage?", options: ["Deny it", "Over-emphasize it", "Be transparent and position AI as a professional tool", "Refuse to answer"], correctAnswer: 2 },
            { question: "What should you always do before delivering AI content?", options: ["Add more AI polish", "Fact-check, edit, and apply human review", "Send immediately", "Run through another AI"], correctAnswer: 1 },
            { question: "What is value-based pricing?", options: ["Charging by the hour", "Charging based on project complexity", "Pricing based on client ROI from your work", "Charging the lowest possible rate"], correctAnswer: 2 }
          ]
        }
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Freelancing Essentials',
    category: 'Global Business',
    overview: 'Transform your skills into a highly profitable, borderless business. This 12-week program teaches you to launch, manage, and scale your freelance career globally.',
    learning_outcomes: [
      'Set up a professional freelancing business from scratch',
      'Win clients on Upwork, Fiverr, and through cold outreach',
      'Master pricing, negotiation, and contract management',
      'Build systems for scaling beyond solo freelancing'
    ],
    duration: '12 Weeks',
    total_weeks: 12,
    commitment: '10-12 hrs/week',
    price: 5,
    price_tier: 'learner',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      // WEEK 1
      { id: 'f1', title: 'Module 1: The Global Freelance Economy', week: 1, duration_minutes: 20, type: 'article',
        content: `# The Borderless Economy\n\nPlatforms like Upwork, Fiverr, and Toptal have flattened the earning curve, allowing talent from anywhere to earn global rates.\n\n## The Skill Arbitrage\nBy acquiring high-value skills, you decouple your earning potential from your geographic location.\n\n> "Your value is determined by the size of the problem you solve, not the city you log in from."\n\n## The Freelance Economy in Numbers\n- Global freelance market: $1.5 trillion, growing 15% annually\n- 36% of the global workforce freelances\n- Africa's freelance market grew 130% (2020-2025)\n- Remote-first companies increased by 400% since 2020\n\n## Types of Freelancing\n1. **Platform-Based**: Upwork, Fiverr, Toptal\n2. **Agency Model**: Small team under your brand\n3. **Direct Client**: Cold outreach, referrals, personal brand\n4. **Productized Services**: Fixed-scope, fixed-price offerings\n\n## Assignment\nResearch 5 freelancers in your niche earning $5,000+/month. Study their profiles, portfolios, and positioning.`
      },
      { id: 'f2', title: 'Module 2: Finding Your Niche', week: 1, duration_minutes: 20, type: 'article',
        content: `# The Niche Decision\n\nGeneralists compete on price. Specialists compete on value.\n\n## The Niche Framework\nYour ideal niche sits at the intersection of:\n1. **Your skills**: What can you do well?\n2. **Market demand**: What do people pay for?\n3. **Your interest**: What do you enjoy doing?\n\n## High-Demand Niches for African Freelancers\n- **Content Writing**: B2B SaaS, fintech, health tech\n- **Web Development**: React, WordPress, Shopify\n- **Virtual Assistance**: Executive support, project management\n- **Graphic Design**: Brand identity, social media, UI/UX\n- **Digital Marketing**: SEO, paid ads, email marketing\n- **Data Entry/Analysis**: Spreadsheets, databases, reporting\n\n## Positioning Statement Formula\n"I help [specific audience] achieve [specific result] through [your service]."\n\nExamples:\n- "I help SaaS startups increase sign-ups through conversion-focused landing page copy."\n- "I help e-commerce brands reduce bounce rates through professional product photography editing."\n\n## Common Mistakes\n- Choosing a niche that is too broad ("I'm a writer")\n- Choosing based only on what pays well (burnout)\n- Changing niches every month (no authority built)\n\n## Assignment\nWrite 3 positioning statements for 3 potential niches. Share them with 5 people in your target market and gather feedback.`
      },
      // WEEK 2
      { id: 'f3', title: 'Module 3: Setting Up Your Business', week: 2, duration_minutes: 25, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "c1", title: "Set up professional email", instruction: "Create an email using your name or brand (hello@yourname.com). Use Google Workspace or Zoho Mail." },
            { id: "c2", title: "Create your Upwork profile", instruction: "Headline must be specific ('B2B SaaS Copywriter' not 'Freelance Writer'). Write summary using PAS formula." },
            { id: "c3", title: "Upload 3 portfolio pieces", instruction: "Add 3 case studies with Problem, Solution, and Result. Include metrics wherever possible." },
            { id: "c4", title: "Set up payment accounts", instruction: "Create Wise or Payoneer account for USD payments with minimal conversion fees." },
            { id: "c5", title: "Optimize LinkedIn profile", instruction: "Update headline, about section, and featured section. Connect with 50 people in your target industry." }
          ]
        }
      },
      { id: 'f4', title: 'Module 4: Building Your Portfolio from Scratch', week: 2, duration_minutes: 20, type: 'article',
        content: `# No Experience? No Problem.\n\nEvery freelancer starts with zero portfolio pieces. Here is how to build one fast.\n\n## Strategy 1: Spec Work\nCreate sample work for real companies without being hired.\n- Redesign an existing website's homepage\n- Write a blog post for a brand you admire\n- Create a social media campaign for a local business\n\n## Strategy 2: Pro Bono Projects\nOffer free work to 2-3 businesses in exchange for:\n- A detailed testimonial\n- Permission to use the work in your portfolio\n- A case study with before/after metrics\n\n## Strategy 3: Personal Projects\n- Start a blog in your niche\n- Build a personal website showcasing your skills\n- Create a newsletter or YouTube channel\n\n## Portfolio Presentation\nEvery piece should include:\n1. **The Brief**: What was the project?\n2. **The Process**: How did you approach it?\n3. **The Result**: What was the outcome? (metrics preferred)\n4. **Visuals**: Screenshots, mockups, or samples\n\n## Where to Host\n- **Behance**: Best for designers\n- **Contently/Clippings.me**: Best for writers\n- **GitHub**: Best for developers\n- **Personal website**: Best for everyone (use Carrd, Webflow, or WordPress)\n\n## Assignment\nCreate 3 portfolio pieces using the strategies above. Publish them on at least one platform.`
      },
      // WEEK 3
      { id: 'f5', title: 'Module 5: Winning Your First Clients', week: 3, duration_minutes: 25, type: 'article',
        content: `# The Client Acquisition System\n\n## The Proposal Framework\nA winning Upwork proposal:\n\n**Hook** (1 sentence): Show you understand their problem.\n"I noticed you need someone to fix the checkout flow on your Shopify store. I've optimized conversions for 12 e-commerce brands."\n\n**Proof** (2-3 sentences): Demonstrate relevant experience.\n\n**Plan** (2-3 sentences): Show how you'd approach their project.\n\n**CTA** (1 sentence): Clear next step.\n\n## Cold Outreach Strategy\n1. Identify 50 potential clients on LinkedIn\n2. Engage with their content for 2 weeks\n3. Send a personalized message offering specific value\n4. Follow up exactly 3 days later\n5. Never pitch in the first message\n\n## The 100 Proposal Challenge\nSend 100 quality proposals in your first month. Track response rates and iterate.\n\n> "The freelancer who sends 100 targeted proposals will always outperform the one who sends 10 perfect ones."\n\n## Assignment\nWrite 10 proposals for real Upwork jobs in your niche. Track which ones get responses and analyze why.`
      },
      { id: 'f6', title: 'Module 6: The Freelancer Toolkit', week: 3, duration_minutes: 15, type: 'toolkit',
        quiz_data: {
          resources: [
            { title: "The 10k Proposal Template", desc: "Highest-converting Upwork proposal structure with fill-in sections.", type: "Google Doc" },
            { title: "Client Intake Questionnaire", desc: "Send to new leads to establish authority and gather requirements.", type: "PDF" },
            { title: "Rate Calculator Matrix", desc: "Calculate hourly and project rates based on expenses and market position.", type: "Excel" },
            { title: "Cold Outreach Scripts", desc: "4 email and LinkedIn message sequences for different industries.", type: "Doc" },
            { title: "Contract Template", desc: "Professional freelance contract covering scope, payments, and IP.", type: "PDF" }
          ]
        }
      },
      // WEEK 4
      { id: 'f7', title: 'Module 7: Pricing & Value-Based Billing', week: 4, duration_minutes: 25, type: 'article',
        content: `# Stop Trading Time for Money\n\n## Three Pricing Models\n\n**Hourly** (Worst): Punishes efficiency, creates income ceiling.\n**Project-Based** (Better): Fixed scope = predictable income.\n**Value-Based** (Best): Price based on client ROI.\n\n## The Value Conversation\nBefore quoting, ask:\n1. "What would solving this be worth to your business?"\n2. "What is the cost of NOT solving this?"\n3. "What does success look like?"\n\n## Pricing Formula\nCharge 10-20% of the value you create.\n- Redesign increases revenue by $100k/year -> charge $10k-$20k\n\n## Raising Rates\n- Raise 20% for every new client after full capacity\n- Never negotiate rate; negotiate scope\n- Grandfather existing clients for 3 months\n\n> "If no one pushes back on your prices, you're charging too little."`
      },
      { id: 'f8', title: 'Module 8: Pricing Practice', week: 4, duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You proposed $2,500 for a website redesign.",
              prompt: "CLIENT: 'Our maximum budget is $1,500. Can you do it for that?'",
              correct: 2,
              options: [
                { text: "Yes, I can lower to $1,500.", explanation: "Immediately devalues your work." },
                { text: "No, $2,500 is firm. Take it or leave it.", explanation: "Too aggressive." },
                { text: "I can work within $1,500 but we'd need to reduce scope: 4 pages instead of 8, no custom animations.", explanation: "Protects your rate by reducing deliverables." }
              ]
            },
            {
              context: "A client wants a free test project.",
              prompt: "CLIENT: 'Can you do a sample article for free? We have a big project coming up.'",
              correct: 0,
              options: [
                { text: "I don't do free work, but I can offer a paid trial at a reduced rate.", explanation: "Professional, protects your time." },
                { text: "Sure, it's a good investment.", explanation: "Sets a bad precedent." },
                { text: "My portfolio has 30+ examples. If those don't demonstrate capability, we're not a good fit.", explanation: "Valid point but too confrontational." }
              ]
            }
          ]
        }
      },
      // WEEK 5
      { id: 'f9', title: 'Module 9: Client Communication', week: 5, duration_minutes: 20, type: 'article',
        content: `# Professional Client Relationships\n\nRetaining clients is 5x cheaper than acquiring new ones.\n\n## Communication Framework\n\n**Onboarding (Day 1-3)**\n- Send welcome packet with timeline and expectations\n- Set up shared project space\n- Schedule kickoff call\n\n**In Progress (Weekly)**\n- Weekly progress updates every Friday\n- Communicate delays immediately\n- Batch questions, don't send one at a time\n\n**Delivery**\n- Deliver 24 hours early when possible\n- Include explanation of decisions\n- Proactively suggest improvements\n\n**Post-Project**\n- Request testimonial within 48 hours\n- Follow up 30 days later\n- Offer retainer for ongoing work\n\n## Red Flags\n- "We don't need a contract"\n- "We'll pay when the project makes money"\n- Constantly changing scope\n- Requesting "quick favors" outside scope\n\n## Setting Boundaries\nCommunicate upfront: working hours, response times, revision limits, payment terms.`
      },
      { id: 'f10', title: 'Module 10: Managing Difficult Clients', week: 5, duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "A client keeps requesting changes beyond the agreed scope.",
              prompt: "CLIENT: 'Can you just quickly add a blog section too? It shouldn't take long.'",
              correct: 1,
              options: [
                { text: "Sure, no problem!", explanation: "Scope creep. You're working for free." },
                { text: "I'd be happy to add a blog section! That falls outside our current scope, so I'll send over a quick quote for the additional work.", explanation: "Professional, firm, and offers a solution." },
                { text: "That's not in the contract. I refuse.", explanation: "Technically correct but damages the relationship." }
              ]
            }
          ]
        }
      },
      // WEEK 6
      { id: 'f11', title: 'Module 11: Financial Management', week: 6, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "fin1", title: "Open a business account", instruction: "Separate business and personal finances. Open a dedicated bank account." },
            { id: "fin2", title: "Set up invoicing", instruction: "Use Wave, FreshBooks, or Google Sheets. Include business name, terms, and bank details." },
            { id: "fin3", title: "Implement profit-first", instruction: "Allocate: 50% operating, 30% tax reserve, 15% profit, 5% emergency." },
            { id: "fin4", title: "Track expenses", instruction: "Log every business expense for tax deductions." },
            { id: "fin5", title: "Build a 3-month runway", instruction: "Calculate monthly expenses and save 3 months before going full-time." }
          ]
        }
      },
      { id: 'f12', title: 'Module 12: Taxes & Legal for Freelancers', week: 6, duration_minutes: 20, type: 'article',
        content: `# The Legal Side of Freelancing\n\n## Business Registration\nDepending on your country:\n- **Kenya**: Register as a sole proprietor or limited company with the Registrar of Companies\n- **Nigeria**: Register with CAC (Corporate Affairs Commission)\n- **South Africa**: Register with CIPC\n- **General**: Many freelancers start as sole proprietors and incorporate later\n\n## Tax Obligations\n- Track all income and expenses\n- Set aside 25-30% of revenue for taxes\n- Understand your country's tax filing deadlines\n- Deductible expenses: internet, equipment, software, home office\n\n## Contracts\nEvery project needs a written agreement covering:\n- Scope of work (specific deliverables)\n- Timeline and milestones\n- Payment terms (50% upfront recommended)\n- Revision limits (2-3 rounds standard)\n- IP transfer (who owns the work)\n- Termination clause\n\n## International Payments\n- **Wise**: Best exchange rates, low fees\n- **Payoneer**: Popular with platforms\n- **PayPal**: Widely accepted but higher fees\n- **M-Pesa/Mobile Money**: For local transactions\n\n## Assignment\nCreate a simple freelance contract using the template in your toolkit. Customize it for your specific services.`
      },
      // WEEK 7-8
      { id: 'f13', title: 'Module 13: Upwork Mastery', week: 7, duration_minutes: 25, type: 'article',
        content: `# Dominating Upwork\n\n## Profile Optimization\n- **Photo**: Professional headshot, clean background\n- **Title**: Specific and keyword-rich\n- **Overview**: PAS formula (Problem, Agitate, Solution)\n- **Portfolio**: 5+ relevant pieces\n- **Skills**: Choose 10 most relevant\n\n## Proposal Strategy\n- Only apply to jobs posted in the last 2 hours\n- Skip jobs with 50+ proposals already\n- Personalize every proposal (no templates)\n- Include a specific observation about their project\n- Ask one smart question to start a conversation\n\n## Pricing on Upwork\n- Start at competitive rates to build reviews\n- Raise rates after every 5 successful projects\n- Use fixed-price for projects under $1,000\n- Use hourly for ongoing relationships\n\n## Getting to Top Rated\n- Maintain 90%+ Job Success Score\n- Complete at least $10,000 in earnings\n- No contract cancellations\n- Respond to invitations within 24 hours\n\n## Beyond Upwork\nUpwork is a launchpad, not a destination. Use it to:\n1. Build a client base\n2. Collect testimonials\n3. Develop case studies\n4. Transition clients to direct billing (higher margins)`
      },
      { id: 'f14', title: 'Module 14: Cold Outreach Mastery', week: 7, duration_minutes: 20, type: 'article',
        content: `# Landing Clients Without Platforms\n\n## The Cold Email Formula\n\n**Subject line**: Short, specific, no salesy language\n"Quick question about [their company's] [specific thing]"\n\n**Opening**: Reference something specific about their business\n"I noticed [their company] just launched [product]. Congrats!"\n\n**Value proposition**: One sentence about what you can do\n"I help companies like yours increase [metric] through [your service]."\n\n**Social proof**: Brief credibility\n"Last month, I helped [similar company] achieve [specific result]."\n\n**CTA**: Low-commitment ask\n"Would you be open to a quick 15-minute call to see if this could work for you?"\n\n## Finding Prospects\n- LinkedIn Sales Navigator (free trial)\n- Industry directories\n- Job boards (companies hiring = they need help)\n- Conferences and events\n- Social media comments sections\n\n## Follow-Up Schedule\n- Day 0: Send initial email\n- Day 3: Follow up (reference original email)\n- Day 7: Add new value (share a relevant article/insight)\n- Day 14: Final follow up\n\n## Response Rate Benchmarks\n- 1-3% is normal for cold email\n- 5-10% is excellent\n- Above 10% means your targeting is perfect\n\n## Assignment\nIdentify 20 potential clients. Send personalized cold emails to 10 of them using the formula above. Track results.`
      },
      { id: 'f15', title: 'Module 15: Freelance Platforms Deep Dive', week: 8, duration_minutes: 20, type: 'article',
        content: `# Beyond Upwork: Other Platforms\n\n## Fiverr\n- Seller creates "gigs" (fixed services)\n- Best for productized services\n- Focus on SEO: keyword-rich titles and descriptions\n- Start with 3-5 well-optimized gigs\n\n## Toptal\n- Exclusive network (top 3% of freelancers)\n- Higher rates ($60-200/hour)\n- Rigorous screening process\n- Best for experienced developers and designers\n\n## PeoplePerHour\n- UK-focused but growing globally\n- Good for creative and digital services\n- Project-based and hourly options\n\n## 99designs\n- Design-specific platform\n- Contest-based and direct hire\n- Good for graphic designers\n\n## Platform Strategy\n- Don't spread yourself too thin\n- Master one platform before expanding\n- Use different platforms for different services\n- Always build your direct client channel alongside platforms`
      },
      { id: 'f16', title: 'Module 16: Negotiation & Contracts', week: 8, duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "Negotiating a retainer with a satisfied client.",
              prompt: "CLIENT: 'We'd like a $3,000/month retainer for 40 hours of work.'",
              correct: 0,
              options: [
                { text: "That's $75/hour, my current rate. I'd want a 6-month minimum and 15% volume discount structure.", explanation: "Excellent negotiation. Secures stability." },
                { text: "$3,000 for 40 hours sounds great! When do we start?", explanation: "Should evaluate if it makes strategic sense." },
                { text: "I don't do retainers. I prefer project-based.", explanation: "Retainers provide valuable predictable income." }
              ]
            }
          ]
        }
      },
      // WEEK 9-10
      { id: 'f17', title: 'Module 17: Scaling Beyond Solo', week: 9, duration_minutes: 25, type: 'article',
        content: `# From Freelancer to Agency\n\nOnce you hit capacity, you have three growth paths.\n\n## Path 1: Raise Prices\nIf fully booked, raise prices by 30%. Some clients leave, making room for higher-value ones.\n\n## Path 2: Productized Services\nPackage your service into fixed-scope, fixed-price offerings.\nExample: "Website Audit Package - $500. Includes: 15-page UX audit, performance report, 3 recommendations, 30-minute call."\n\n## Path 3: Build a Micro-Agency\n1. Subcontract 1-2 tasks\n2. Create SOPs for everything\n3. Hire contractors at 40-50% of your client rate\n4. Focus on client relationships and quality control\n\n## Systems Needed\n- Project management: Notion, ClickUp, or Asana\n- Communication: Slack or dedicated email\n- Files: Google Drive with clear folder structure\n- Invoicing: Wave or FreshBooks\n- Contracts: HelloSign or DocuSign\n\n> "Work ON your business, not just IN your business."`
      },
      { id: 'f18', title: 'Module 18: Building Passive Income', week: 9, duration_minutes: 20, type: 'article',
        content: `# Income Beyond Client Work\n\n## Digital Products\n- Templates and frameworks\n- E-books and guides\n- Online courses and workshops\n- Stock assets (photos, graphics, code)\n\n## Content Monetization\n- YouTube channel (ad revenue + sponsorships)\n- Blog with affiliate marketing\n- Newsletter (paid or sponsored)\n- Podcast (sponsorships)\n\n## Pricing Digital Products\n- Templates: $15-99\n- E-books: $9-49\n- Mini-courses: $47-197\n- Full courses: $197-997\n\n## Launch Strategy\n1. Build an audience first (minimum 500 email subscribers)\n2. Create a minimum viable product\n3. Pre-sell to validate demand\n4. Launch with a limited-time offer\n5. Collect feedback and iterate\n\n## The Freelancer Flywheel\nClient work -> case studies -> content -> audience -> digital products -> more clients\n\nEach element feeds the others, creating compound growth.\n\n## Assignment\nIdentify 3 digital product ideas based on your freelancing expertise. Outline the content for one of them.`
      },
      // WEEK 11-12
      { id: 'f19', title: 'Module 19: Personal Branding', week: 10, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "pb1", title: "Define your brand voice", instruction: "Write a brand voice document: tone (professional, friendly, authoritative), vocabulary to use and avoid, communication style." },
            { id: "pb2", title: "Create consistent visuals", instruction: "Choose brand colors, fonts, and a logo. Apply consistently across LinkedIn, portfolio, and proposals." },
            { id: "pb3", title: "Set up a personal website", instruction: "Build a simple website with: about page, services, portfolio, testimonials, and contact form. Use Carrd ($19/year) or WordPress." },
            { id: "pb4", title: "Create a content calendar", instruction: "Plan 4 weeks of LinkedIn posts: 2 educational, 1 personal story, 1 client win per week." },
            { id: "pb5", title: "Launch your newsletter", instruction: "Start a bi-weekly newsletter sharing insights from your freelancing niche. Use Substack (free) or ConvertKit." }
          ]
        }
      },
      { id: 'f20', title: 'Module 20: Work-Life Balance', week: 10, duration_minutes: 15, type: 'article',
        content: `# Sustainable Freelancing\n\n## The Burnout Trap\nFreelancers often work more hours than employees because there is no one telling them to stop. Sustainability is key to long-term success.\n\n## Setting Boundaries\n- Define working hours and communicate them to clients\n- Turn off notifications outside work hours\n- Take weekends off (at least one day)\n- Schedule vacations in advance\n\n## Time Management\n- Use time-blocking: specific tasks at specific times\n- Batch similar tasks (all emails at 10am, all calls at 2pm)\n- Protect your most productive hours for deep work\n- Use the Pomodoro Technique (25 min work, 5 min break)\n\n## Health & Wellbeing\n- Exercise 3-4 times per week\n- Take regular breaks from screens\n- Maintain social connections outside work\n- Consider co-working spaces for social interaction\n\n## Financial Security for Peace of Mind\n- 3-month emergency fund minimum\n- Health insurance\n- Retirement savings (start small, but start)\n- Income diversification (multiple clients, multiple income streams)`
      },
      { id: 'f21', title: 'Module 21: Capstone: Your Freelance Business Plan', week: 11, duration_minutes: 40, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "biz1", title: "Write your executive summary", instruction: "One-page overview: who you serve, what you offer, your unique value proposition, and revenue targets." },
            { id: "biz2", title: "Define your service offerings", instruction: "List 2-3 core services with pricing tiers. Include scope, deliverables, and timeline for each." },
            { id: "biz3", title: "Create your marketing plan", instruction: "Detail how you'll acquire clients: platforms, cold outreach, content marketing, and referrals." },
            { id: "biz4", title: "Build financial projections", instruction: "Project monthly revenue for 12 months. Include expenses, profit targets, and break-even analysis." },
            { id: "biz5", title: "Set 90-day goals", instruction: "Define 3 SMART goals for your first 90 days: specific, measurable, achievable, relevant, time-bound." }
          ]
        }
      },
      { id: 'f22', title: 'Module 22: Final Assessment', week: 12, duration_minutes: 25, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You've completed the full Freelancing Essentials course. A friend asks for advice.",
              prompt: "FRIEND: 'I want to start freelancing but I have no portfolio, no clients, and no idea where to begin. What should I do first?'",
              correct: 1,
              options: [
                { text: "Just start applying to every job on Upwork.", explanation: "Without a niche or portfolio, you'll waste time and get discouraged." },
                { text: "Pick a niche, create 3 spec portfolio pieces, optimize your profile, then send 100 targeted proposals in your first month.", explanation: "Systematic approach that covers all the fundamentals taught in this course." },
                { text: "Read 5 more books about freelancing before starting.", explanation: "Analysis paralysis. Action beats theory." }
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
    overview: 'Navigate the US K-12 education system, ace interviews, and secure your J1 Visa teaching placement. Comprehensive 10-week preparation for international educators.',
    learning_outcomes: [
      'Understand the US K-12 education system and classroom culture',
      'Master behavioral interview techniques for school district interviews',
      'Prepare all documentation for J1 Visa sponsorship',
      'Develop culturally responsive teaching strategies'
    ],
    duration: '10 Weeks',
    total_weeks: 10,
    commitment: '10-12 hrs/week',
    price: 5,
    price_tier: 'learner',
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      // WEEK 1
      { id: 't1', title: 'Module 1: The US K-12 Framework', week: 1, duration_minutes: 20, type: 'article',
        content: `# Navigating the American Classroom\n\nTeaching internationally requires cultural adaptability. The US emphasizes Student-Centered Learning and Standardized Core Competencies.\n\n## The Core Shift\nUnlike traditional lecture-based systems, US schools mandate active engagement.\n\n- **Formative over Summative**: Assess students daily, not just end-of-term\n- **Differentiation**: IEPs are legally binding. Adapt lessons for varying abilities.\n- **Standards-Based Grading**: Grades reflect mastery of specific standards\n\n> "In the US system, you are the guide on the side, not the sage on the stage."\n\n## Grade Level Breakdown\n- **Elementary (K-5)**: One teacher, all subjects. Foundational literacy/numeracy.\n- **Middle School (6-8)**: Subject-specific teachers. Social development.\n- **High School (9-12)**: Advanced subjects, college prep.\n\n## Key Terminology\n- PLC: Professional Learning Community\n- 504 Plan: Disability accommodations\n- FERPA: Student data privacy law\n- RTI: Response to Intervention\n\n## Cultural Expectations\n- Teachers are approachable and warm\n- Parent communication is critical and frequent\n- Professional development is ongoing\n- Classroom management uses positive reinforcement`
      },
      { id: 't2', title: 'Module 2: US Education Standards', week: 1, duration_minutes: 20, type: 'article',
        content: `# Understanding Standards-Based Education\n\n## Common Core State Standards\nAdopted by 41 states, Common Core defines what students should know at each grade level in English Language Arts and Mathematics.\n\n## Key Features\n- Focus on critical thinking, not memorization\n- Progression builds across grade levels\n- Emphasis on evidence-based reasoning\n- Application of knowledge, not just recall\n\n## Next Generation Science Standards (NGSS)\n- Three-dimensional learning: practices, crosscutting concepts, core ideas\n- Inquiry-based, hands-on approach\n- Integration of engineering practices\n\n## State-Specific Standards\nSome states (Texas, Virginia) use their own standards:\n- TEKS (Texas Essential Knowledge and Skills)\n- Virginia Standards of Learning\n\n## How to Prepare\n1. Identify the standards for your subject and grade level\n2. Read 5-10 sample lesson plans aligned to those standards\n3. Practice writing learning objectives using Bloom's Taxonomy\n4. Understand how assessments align to standards\n\n## Assignment\nDownload the standards document for your teaching subject. Identify 5 standards and write one learning objective for each.`
      },
      // WEEK 2
      { id: 't3', title: 'Module 3: Classroom Management', week: 2, duration_minutes: 25, type: 'article',
        content: `# Building a Positive Classroom Culture\n\nEffective classroom management in the US is built on relationships, routines, and restorative practices.\n\n## The PBIS Framework\nUsed in 90%+ of US schools:\n\n**Tier 1**: Universal strategies\n- Clear expectations posted and practiced\n- Consistent routines and procedures\n- Positive reinforcement ratio 5:1\n\n**Tier 2**: Targeted interventions\n- Check-in/check-out systems\n- Small group social skills instruction\n\n**Tier 3**: Intensive individual support\n- Functional behavior assessments\n- Individualized behavior plans\n\n## Restorative Practices\n- "What happened?" (not "What did you do?")\n- "Who was affected?"\n- "What can you do to make it right?"\n\n## De-escalation\n1. Stay calm, lower your voice\n2. Use proximity, not calling out\n3. Offer choices, not demands\n4. Allow cool-down time\n5. Follow up privately\n\n## First Week Essentials\n- Teach and practice every procedure\n- Learn every name by Day 3\n- Establish your attention signal\n- Create a safe, inclusive environment`
      },
      { id: 't4', title: 'Module 4: Positive Behavior Systems', week: 2, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "beh1", title: "Design your behavior system", instruction: "Create a classroom rewards system with clear criteria. Include: points system, reward menu, and weekly recognition." },
            { id: "beh2", title: "Write classroom expectations", instruction: "Write 3-5 positively stated expectations. Example: 'Be Respectful, Be Responsible, Be Ready.' Practice explaining each to students." },
            { id: "beh3", title: "Create procedure scripts", instruction: "Write step-by-step scripts for: entering the classroom, transitioning between activities, requesting help, and ending class." },
            { id: "beh4", title: "Design a parent communication plan", instruction: "Create templates for: welcome letter, weekly update, positive behavior report, and concern notification." },
            { id: "beh5", title: "Prepare de-escalation strategies", instruction: "Write out 5 specific de-escalation responses you'll use. Practice saying them out loud until they feel natural." }
          ]
        }
      },
      // WEEK 3
      { id: 't5', title: 'Module 5: Interview Mastery', week: 3, duration_minutes: 25, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "Zoom interview with a US School District Principal for a J1 Visa position.",
              prompt: "PRINCIPAL: 'How do you handle severe behavioral disruptions?'",
              correct: 1,
              options: [
                { text: "I immediately send the student to the principal's office.", explanation: "US schools expect teachers to handle level 1-2 behaviors in-house." },
                { text: "I rely on a tiered approach: prevention through engagement, subtle redirection, and restorative conversations. Office referrals are a last resort.", explanation: "Demonstrates modern classroom management mastery." },
                { text: "I use strict disciplinary measures and public corrections.", explanation: "Authoritarian discipline is heavily frowned upon in modern US pedagogy." }
              ]
            },
            {
              context: "Interview panel asks about diverse learners.",
              prompt: "INTERVIEWER: 'How would you differentiate for ELLs, IEP students, and gifted students?'",
              correct: 2,
              options: [
                { text: "I teach to the middle and provide extra worksheets.", explanation: "One-size-fits-all approach doesn't address diverse needs." },
                { text: "I'd refer struggling students to special education.", explanation: "Differentiation is the classroom teacher's responsibility." },
                { text: "I use flexible grouping, tiered assignments, scaffolded materials. For ELLs: visual supports and sentence frames. For IEP students: accommodation plans. For gifted: extension activities.", explanation: "Comprehensive answer showing awareness of all learner needs." }
              ]
            }
          ]
        }
      },
      { id: 't6', title: 'Module 6: Common Interview Questions', week: 3, duration_minutes: 20, type: 'article',
        content: `# 20 Most Common Teaching Interview Questions\n\n## About You\n1. "Tell us about yourself and your teaching journey."\n2. "Why do you want to teach in the United States?"\n3. "What is your teaching philosophy?"\n\n## Classroom Management\n4. "Describe your approach to classroom management."\n5. "How do you handle a student who refuses to participate?"\n6. "What would you do if two students were in a physical altercation?"\n\n## Instruction\n7. "Walk us through how you plan a lesson."\n8. "How do you assess student learning?"\n9. "How do you differentiate instruction for diverse learners?"\n10. "How do you integrate technology into your teaching?"\n\n## Relationships\n11. "How do you communicate with parents?"\n12. "How do you build relationships with students?"\n13. "Describe your experience working with a team."\n\n## Scenarios\n14. "A parent disagrees with a grade you gave. What do you do?"\n15. "A student tells you they are being bullied. How do you respond?"\n\n## Preparing Your Answers\nUse the STAR method:\n- **S**ituation: Set the scene\n- **T**ask: Describe your responsibility\n- **A**ction: Explain what you did\n- **R**esult: Share the outcome\n\n## Assignment\nWrite STAR responses for questions 1, 4, 7, 9, and 14. Practice delivering them in under 2 minutes each.`
      },
      // WEEK 4
      { id: 't7', title: 'Module 7: Lesson Planning (UbD)', week: 4, duration_minutes: 25, type: 'article',
        content: `# Understanding by Design (UbD)\n\nThe gold standard for lesson planning in US schools.\n\n## The Three Stages\n\n**Stage 1: Identify Desired Results**\nStart with the end. What should students know?\n- Align to state standards\n- Write clear objectives using Bloom's Taxonomy\n- Determine essential questions\n\n**Stage 2: Determine Assessment Evidence**\nHow will you know students learned?\n- Summative assessments\n- Formative assessments\n- Performance tasks\n\n**Stage 3: Plan Learning Experiences**\n- Hook/engagement activity\n- Direct instruction (mini-lesson, max 15 min)\n- Guided practice\n- Independent practice\n- Closure/reflection\n\n## Bloom's Taxonomy\n- Remember: List, define, identify\n- Understand: Explain, summarize, compare\n- Apply: Use, demonstrate, solve\n- Analyze: Differentiate, examine\n- Evaluate: Judge, critique, justify\n- Create: Design, construct, develop\n\n## Sample Lesson Structure\n| Component | Time | Description |\n|-----------|------|-------------|\n| Bell Ringer | 5 min | Entry task reviewing prior knowledge |\n| Mini-Lesson | 10-15 min | Direct instruction |\n| Guided Practice | 15 min | Teacher-led practice |\n| Independent Work | 15-20 min | Students apply learning |\n| Exit Ticket | 5 min | Quick assessment |`
      },
      { id: 't8', title: 'Module 8: Writing Effective Lesson Plans', week: 4, duration_minutes: 25, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "lp1", title: "Choose a standard", instruction: "Select one standard for your subject area. Write the full standard and identify the key skill students must demonstrate." },
            { id: "lp2", title: "Write a learning objective", instruction: "Using Bloom's Taxonomy, write a measurable learning objective. Format: 'Students will be able to [verb] [content] by [method].'" },
            { id: "lp3", title: "Design an assessment", instruction: "Create an exit ticket with 3 questions that directly assess the learning objective. Include 1 recall, 1 application, and 1 analysis question." },
            { id: "lp4", title: "Plan the lesson activities", instruction: "Write a detailed lesson plan using the UbD template. Include timing, materials, and differentiation strategies." },
            { id: "lp5", title: "Create a rubric", instruction: "Design a simple rubric for the assessment with 4 levels: Exceeds, Meets, Approaching, Below Standard." }
          ]
        }
      },
      // WEEK 5
      { id: 't9', title: 'Module 9: The Educator Toolkit', week: 5, duration_minutes: 15, type: 'toolkit',
        quiz_data: {
          resources: [
            { title: "US-Standard Resume Template", desc: "ATS-friendly teaching resume for US school districts.", type: "Google Doc" },
            { title: "Lesson Plan Framework", desc: "UbD lesson planner with examples for multiple subjects.", type: "PDF" },
            { title: "J1 Visa Document Checklist", desc: "Complete checklist for J1 Visa sponsorship.", type: "PDF" },
            { title: "Classroom Management Toolkit", desc: "Behavior tracking, parent logs, and PBIS templates.", type: "Doc" },
            { title: "Interview Prep Guide", desc: "50 common interview questions with model answers.", type: "PDF" }
          ]
        }
      },
      { id: 't10', title: 'Module 10: EdTech Essentials', week: 5, duration_minutes: 20, type: 'article',
        content: `# Technology in the US Classroom\n\nUS schools are heavily tech-integrated. Familiarity with these tools is expected from Day 1.\n\n## Learning Management Systems\n- **Google Classroom**: Most common. Assignments, announcements, grading.\n- **Canvas**: Common in secondary/higher ed.\n- **Schoology**: Growing in popularity.\n\n## Communication Tools\n- **Remind**: Text-based parent/student communication\n- **ClassDojo**: Behavior tracking and parent communication\n- **Talking Points**: Translates for multilingual families\n\n## Assessment Tools\n- **Kahoot/Quizizz**: Gamified formative assessments\n- **Google Forms**: Quick surveys and exit tickets\n- **Nearpod**: Interactive presentations\n\n## Digital Citizenship\nYou must teach students safe technology use: appropriate behavior, digital footprint, copyright/fair use, cyberbullying prevention.\n\n## Assignment\nCreate a Google Classroom and build a sample assignment with instructions, rubric, and due date.`
      },
      // WEEK 6
      { id: 't11', title: 'Module 11: J1 Visa Process', week: 6, duration_minutes: 25, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "v1", title: "Verify eligibility", instruction: "Confirm: valid teaching license, 3+ years experience, bachelor's degree in education or subject." },
            { id: "v2", title: "Gather documents", instruction: "Collect: degree certificates, teaching license, transcripts, 3+ references, background check." },
            { id: "v3", title: "Prepare DS-2019", instruction: "Your sponsor issues this form. Ensure all information matches your passport exactly." },
            { id: "v4", title: "Schedule visa interview", instruction: "Book US Embassy appointment. Prepare: DS-160, DS-2019, passport, SEVIS fee receipt, financial documents." },
            { id: "v5", title: "Complete cultural orientation", instruction: "Attend mandatory pre-departure orientation covering US norms, classroom expectations, and housing." }
          ]
        }
      },
      { id: 't12', title: 'Module 12: Visa Documentation Deep Dive', week: 6, duration_minutes: 20, type: 'article',
        content: `# J1 Visa Documentation Guide\n\n## Required Documents\n1. **Valid Passport** (6+ months beyond program end date)\n2. **DS-2019** (Certificate of Eligibility from sponsor)\n3. **DS-160** (Online Nonimmigrant Visa Application)\n4. **SEVIS Fee Receipt** (I-901 payment confirmation)\n5. **Passport-Style Photo** (2x2 inches, white background)\n\n## Supporting Documents\n- Teaching license/certification\n- Degree certificates and transcripts\n- Employment verification letters\n- Three professional reference letters\n- Background check clearance\n- Medical examination results\n\n## The Interview\n**What to Expect:**\n- 5-10 minute interview at US Embassy\n- Questions about your teaching experience\n- Questions about why you want to teach in the US\n- Questions about your ties to your home country\n\n**Tips:**\n- Dress professionally\n- Bring all documents organized in a folder\n- Answer honestly and concisely\n- Show enthusiasm but also demonstrate intent to return home\n- Have a clear plan for what you'll do after the program\n\n## Common Mistakes\n- Incomplete documentation\n- Inconsistent information between forms\n- Not being able to articulate why you want to teach in the US\n- Not demonstrating ties to home country\n\n## Timeline\n- 6-8 months before start: Begin application\n- 3-4 months before: Complete visa interview\n- 1-2 months before: Finalize housing and travel`
      },
      // WEEK 7
      { id: 't13', title: 'Module 13: Culturally Responsive Teaching', week: 7, duration_minutes: 20, type: 'article',
        content: `# Teaching Across Cultures\n\nAs an international teacher, your global perspective is your superpower.\n\n## CRT Key Principles\n1. High expectations for all students regardless of background\n2. Incorporate diverse perspectives into curriculum\n3. Validate students' cultural identities as assets\n4. Build relationships across cultural differences\n\n## Navigating Cultural Differences\n- US classrooms value student voice and questioning\n- "How are you?" is a greeting, not a real question\n- Regular parent communication is expected\n- Collaboration is valued over individual achievement\n\n## Your International Advantage\n- Multilingual skills are increasingly valued\n- Global perspective enriches discussions\n- Resilience and adaptability are evident\n- Students benefit from diverse role models\n\n> "You are not just teaching a subject. You are representing your culture while embracing a new one."`
      },
      { id: 't14', title: 'Module 14: Inclusive Classroom Practices', week: 7, duration_minutes: 20, type: 'article',
        content: `# Creating an Inclusive Classroom\n\n## Special Education Basics\nIn the US, students with disabilities have legal rights to education.\n\n**IEP (Individualized Education Program)**\n- Legally binding document\n- Outlines specific accommodations and modifications\n- You MUST follow IEP requirements\n- Regular progress monitoring required\n\n**504 Plan**\n- Provides accommodations (not modifications)\n- Less restrictive than IEP\n- Common accommodations: extended time, preferential seating, reduced assignments\n\n## English Language Learners (ELLs)\n- Use visual aids and graphic organizers\n- Provide sentence frames and word banks\n- Allow bilingual dictionaries\n- Pair with buddy student when possible\n- Simplify language, not content\n\n## Gifted and Talented\n- Offer extension activities\n- Allow independent research projects\n- Use higher-order questioning\n- Provide leadership roles\n\n## Universal Design for Learning (UDL)\n- Multiple means of engagement (why)\n- Multiple means of representation (what)\n- Multiple means of action/expression (how)\n\n## Assignment\nReview a sample IEP document. List 5 accommodations you might need to implement and explain how each would look in your classroom.`
      },
      // WEEK 8
      { id: 't15', title: 'Module 15: Assessment & Data', week: 8, duration_minutes: 20, type: 'article',
        content: `# Data-Driven Teaching\n\nUS schools rely heavily on data to drive instruction.\n\n## Types of Assessment\n**Formative** (ongoing, low-stakes)\n- Exit tickets\n- Think-pair-share\n- Quick polls\n- Observation checklists\n\n**Summative** (end of unit, higher-stakes)\n- Unit tests\n- Projects\n- Presentations\n- Portfolios\n\n**Diagnostic** (beginning of unit)\n- Pre-tests\n- KWL charts\n- Interest surveys\n\n## Using Data\n1. Assess\n2. Analyze results\n3. Identify gaps\n4. Reteach or extend\n5. Reassess\n\n## Grading in the US\n- Most schools use percentage or letter grades (A-F)\n- Some use standards-based grading (4-3-2-1)\n- Grade books are usually digital (PowerSchool, Infinite Campus)\n- Parents can often check grades online in real-time\n\n## Standardized Testing\n- State assessments tied to standards\n- SAT/ACT for college-bound students\n- Results used for school accountability\n- Teachers may feel pressure around test scores\n\n## Assignment\nCreate a formative assessment plan for a one-week unit. Include 5 different formative assessment strategies and explain when/how you'd use each.`
      },
      { id: 't16', title: 'Module 16: Data Analysis Practice', week: 8, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "da1", title: "Analyze sample data", instruction: "Review the provided sample class data set. Identify the top 3 standards where students are struggling." },
            { id: "da2", title: "Create a reteaching plan", instruction: "Based on your analysis, write a plan to reteach the lowest-scoring standard using a different instructional approach." },
            { id: "da3", title: "Design a data tracker", instruction: "Create a spreadsheet to track student progress across 5 standards over 4 weeks. Include columns for each assessment." },
            { id: "da4", title: "Write a data narrative", instruction: "Write a 1-paragraph summary of your data analysis suitable for a PLC meeting. Include: trends, concerns, and next steps." },
            { id: "da5", title: "Create student goal-setting sheets", instruction: "Design a simple form where students can track their own progress toward mastery of specific standards." }
          ]
        }
      },
      // WEEK 9
      { id: 't17', title: 'Module 17: Living in the US', week: 9, duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "us1", title: "Research placement area", instruction: "Learn about your assigned district: cost of living, weather, transportation, amenities." },
            { id: "us2", title: "Prepare housing", instruction: "Budget for first month + deposit. Research furnished housing and temporary options." },
            { id: "us3", title: "Understand banking", instruction: "Plan to open a US bank account upon arrival (Chase, Bank of America). Bring passport, DS-2019, employment letter." },
            { id: "us4", title: "Healthcare preparation", instruction: "Understand your J1 health insurance. Locate nearby hospitals and pharmacies." },
            { id: "us5", title: "Build support network", instruction: "Connect with other international teachers. Join Facebook groups and Reddit communities for J1 teachers." }
          ]
        }
      },
      { id: 't18', title: 'Module 18: Financial Planning for the US', week: 9, duration_minutes: 20, type: 'article',
        content: `# Managing Finances in America\n\n## Understanding US Salary\n- Teacher salaries vary by state ($35,000-$65,000/year)\n- Pay is typically bi-weekly or monthly\n- Taxes are deducted automatically (federal, state, Social Security)\n\n## Budgeting Essentials\nA typical monthly breakdown on a $45,000 salary ($3,750/month gross, ~$2,800 net):\n- Housing: $800-1,200 (aim for 30% or less)\n- Food: $300-500\n- Transportation: $200-400\n- Insurance: Covered by program\n- Savings/remittances: $500-800\n- Miscellaneous: $200-300\n\n## Sending Money Home\n- **Wise**: Best exchange rates, low fees\n- **WorldRemit**: Good for M-Pesa\n- **Western Union**: Widely available but higher fees\n\n## Building Credit\n- Open a secured credit card\n- Pay full balance monthly\n- Good credit opens doors for housing and car loans\n\n## Saving Tips\n- Cook at home most meals\n- Use public transportation when possible\n- Shop at Aldi, Walmart, or Costco\n- Take advantage of teacher discounts\n\n## Assignment\nCreate a detailed monthly budget based on the average teacher salary in your placement state. Include a plan for saving and sending money home.`
      },
      // WEEK 10
      { id: 't19', title: 'Module 19: Capstone: Interview Simulation', week: 10, duration_minutes: 30, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "First week at a US school. Parent email about child's behavior grade.",
              prompt: "PARENT: 'My son says he got a C in behavior. He never had issues before. I want a meeting immediately.'",
              correct: 2,
              options: [
                { text: "Reply explaining the student was disruptive. Attach incident reports.", explanation: "Too defensive. Start with empathy." },
                { text: "Forward to the principal.", explanation: "This is a Tier 1 concern. Handle it yourself." },
                { text: "Thank the parent, express you want the best for their child, suggest a meeting time. Prepare examples of strengths and areas for growth.", explanation: "Professional and empathetic. Values parent as partner." }
              ]
            },
            {
              context: "You notice a student is consistently falling asleep in class.",
              prompt: "COLLEAGUE: 'Just ignore it. Some students are just lazy.'",
              correct: 1,
              options: [
                { text: "Agree with the colleague and move on.", explanation: "Ignoring signs of potential issues is not good practice." },
                { text: "Privately check in with the student, ask if everything is okay, and if needed, refer to the school counselor.", explanation: "Shows care and follows proper protocols." },
                { text: "Call the parent and complain about the student's behavior.", explanation: "Confrontational approach that doesn't address root causes." }
              ]
            }
          ]
        }
      },
      { id: 't20', title: 'Module 20: Final Assessment', week: 10, duration_minutes: 25, type: 'video',
        video_url: 'https://www.youtube.com/embed/z-EtmaFJieY',
        content: `Watch this comprehensive review of the International Teacher Preparation course, then complete the final assessment to earn your certificate.`,
        quiz_data: {
          questions: [
            { question: "What does PBIS stand for?", options: ["Professional Behavior in Schools", "Positive Behavioral Interventions and Supports", "Primary Basic Instructional Standards", "Progressive Behavior Improvement System"], correctAnswer: 1 },
            { question: "What is the UbD lesson planning approach also called?", options: ["Forward Design", "Backward Design", "Lateral Design", "Circular Design"], correctAnswer: 1 },
            { question: "What is an IEP?", options: ["International Education Program", "Individualized Education Program", "Instructional Evaluation Protocol", "Integrated Educational Policy"], correctAnswer: 1 },
            { question: "What form does your J1 sponsor issue?", options: ["DS-160", "DS-2019", "I-901", "I-20"], correctAnswer: 1 },
            { question: "What is the recommended positive reinforcement ratio?", options: ["1:1", "3:1", "5:1", "10:1"], correctAnswer: 2 }
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
        .select("course_id, progress, enrolled_at")
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

  // Calculate which week a student is on based on enrollment date
  const getStudentWeek = (courseId: string): number => {
    const enrollment = enrollments.get(courseId);
    if (!enrollment?.enrolled_at) return 1;
    const enrolledDate = new Date(enrollment.enrolled_at);
    const now = new Date();
    const weeksSinceEnrollment = Math.floor(
      (now.getTime() - enrolledDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    return Math.max(1, weeksSinceEnrollment + 1);
  };

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
    getStudentWeek,
  };
};
