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
        id: 'a1', title: 'Module 1: The AI Economy', duration_minutes: 15, type: 'article',
        content: `# Welcome to the AI Economy\n\nArtificial Intelligence is no longer just a buzzword for Silicon Valley. It is the foundational toolset for the modern freelancer. In this module, we explore why adopting AI is the highest ROI activity you can undertake today.\n\n## The AI Advantage\nFreelancers utilizing tools like ChatGPT and Claude are reporting productivity increases of 40-60%. It is not about replacing human creativity; it is about eliminating the friction between an idea and its execution.\n\n> "AI won't replace freelancers. Freelancers who use AI will replace those who don't."\n\n## Core Paradigms\n**1. The Centaur Model**\nYou are the strategist. The AI is the executor. Never accept AI output as a final product. Your value is in your taste, your editing, and your domain expertise.\n\n**2. Iterative Prompting**\nGreat results come from conversations, not single commands. Treat AI like a brilliant intern who lacks context.\n\n**3. The 80/20 Rule of AI**\nAI handles the 80% of repetitive, templated work so you can focus on the 20% that requires human creativity and judgment.\n\n## Key Statistics\n- 72% of top-earning freelancers on Upwork now use AI tools daily\n- AI-assisted freelancers earn 34% more per project on average\n- Companies are 3x more likely to hire freelancers who demonstrate AI proficiency\n\n## Assignment\nBefore moving to the next module, create a free account on ChatGPT (chat.openai.com) and Claude (claude.ai). Familiarize yourself with their interfaces.`
      },
      {
        id: 'a2', title: 'Module 2: Prompt Engineering Fundamentals', duration_minutes: 25, type: 'playground',
        content: `Mastering prompt engineering is the single most valuable technical skill you can learn this year.\n\nThe difference between generic AI output and professional-grade deliverables is entirely dictated by the quality of your prompt. We use the **R.C.T.F.C** Framework:\n\n- **R**ole: Tell the AI who it is.\n- **C**ontext: Provide the background.\n- **T**ask: Explain exactly what needs to be done.\n- **F**ormat: Define the exact output structure.\n- **C**onstraints: State what it MUST NOT do.\n\nCopy the prompts in the workspace and test them in ChatGPT or Claude to see the difference.`,
        quiz_data: {
          prompts: [
            { title: "The Perfect Copywriting Prompt", code: "ACT AS: A senior conversion copywriter with 10 years of experience in direct-response marketing.\n\nCONTEXT: We are launching a new B2B SaaS tool that automates invoice collection for creative agencies.\n\nTASK: Write a 300-word cold email to marketing agency owners.\n\nFORMAT: 1 subject line, 3 short paragraphs, 1 clear call to action.\n\nCONSTRAINTS: Do not use the words 'innovative', 'revolutionary', or 'game-changer'. Keep reading level below 8th grade. Tone should be highly professional but slightly punchy." },
            { title: "The Code Debugger Prompt", code: "ACT AS: A Senior React/TypeScript Developer.\n\nCONTEXT: I am building a dashboard and getting an infinite loop in my useEffect hook.\n\nTASK: Review the following code snippet and identify the exact cause of the infinite render. Then, provide the corrected code.\n\nFORMAT:\n1. Explanation of the bug (bullet points)\n2. Corrected code block\n3. Best practice tip for the future.\n\n[INSERT CODE HERE]" },
            { title: "The Content Repurposer", code: "ACT AS: A Social Media Manager specializing in LinkedIn and Twitter growth.\n\nCONTEXT: I have a 1,500 word blog post about remote work productivity.\n\nTASK: Repurpose this blog post into:\n1. A highly engaging LinkedIn text post with a hook.\n2. A 5-part Twitter thread.\n\nCONSTRAINTS: Do not use emojis in the Twitter thread. Ensure each tweet is under 280 characters." }
          ]
        }
      },
      {
        id: 'a3', title: 'Module 3: AI for Research & Analysis', duration_minutes: 45, type: 'video',
        video_url: 'https://www.youtube.com/embed/z-EtmaFJieY',
        content: `Watch this tutorial on how to use AI tools for deep research and competitive analysis. Pay close attention to how prompts are structured for extracting specific data.`,
        quiz_data: {
          questions: [
            { question: "What is the primary benefit of AI for freelancers?", options: ["Replacing human workers", "Increasing productivity and efficiency", "Making work more complicated", "Reducing client expectations"], correctAnswer: 1 },
            { question: "Which framework is taught in this course for prompt engineering?", options: ["S.M.A.R.T", "R.C.T.F.C", "A.I.D.A", "P.E.S.T"], correctAnswer: 1 },
            { question: "What percentage of top Upwork freelancers use AI tools daily?", options: ["32%", "52%", "72%", "92%"], correctAnswer: 2 },
            { question: "What is the Centaur Model?", options: ["AI replaces humans entirely", "Human strategist + AI executor working together", "A type of machine learning algorithm", "An AI pricing model"], correctAnswer: 1 },
            { question: "What should you never do with raw AI output?", options: ["Edit it", "Review it", "Accept it as final product", "Share it with colleagues for review"], correctAnswer: 2 }
          ]
        }
      },
      {
        id: 'a4', title: 'Module 4: AI-Powered Content Creation', duration_minutes: 20, type: 'article',
        content: `# Creating Professional Content with AI\n\nContent creation is where AI truly shines for freelancers. Whether you write blog posts, design social media graphics, or produce marketing copy, AI can accelerate every stage of your workflow.\n\n## The Content Pipeline\n**Stage 1: Ideation**\nUse AI to brainstorm topics. Prompt: "Generate 20 blog post ideas for [niche] that would rank well on Google in 2026."\n\n**Stage 2: Outlining**\nHave AI create detailed outlines. Always provide your target audience and desired tone.\n\n**Stage 3: First Draft**\nLet AI write the first draft, then apply your expertise to edit, fact-check, and add your unique voice.\n\n**Stage 4: Optimization**\nUse AI for SEO optimization, readability scoring, and headline testing.\n\n## Tools Covered\n- **ChatGPT**: Best for long-form content and complex reasoning\n- **Claude**: Superior for nuanced writing and following detailed instructions\n- **Jasper**: Specialized marketing copy tool\n- **Grammarly**: AI-powered editing and tone adjustment\n\n## Real-World Case Study\nSarah, a freelance content writer from Lagos, increased her monthly output from 8 articles to 25 articles using the AI content pipeline. Her monthly revenue grew from $2,400 to $7,500 without sacrificing quality.\n\n> "I spend 70% less time on first drafts and redirect that time to research and client strategy." - Sarah K.\n\n## Practice Exercise\nUsing the R.C.T.F.C framework, write a prompt that generates a 500-word LinkedIn article about the future of remote work in Africa. Compare outputs from ChatGPT and Claude.`
      },
      {
        id: 'a5', title: 'Module 5: Workflow Automation with Zapier', duration_minutes: 30, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "t1", title: "Map your repetitive tasks", instruction: "Write down 5 tasks you do every week that do not require deep thinking (e.g., sending invoices, transferring lead data, scheduling posts)." },
            { id: "t2", title: "Create a Zapier account", instruction: "Sign up for a free Zapier account at zapier.com. Explore the dashboard and understand the concepts of Triggers and Actions." },
            { id: "t3", title: "Build your first Zap", instruction: "Create a Zap where the trigger is 'New Email in Gmail' matching a specific label. Connect it to Google Sheets to automatically log sender details." },
            { id: "t4", title: "Create a client onboarding automation", instruction: "Build a multi-step Zap: New Typeform submission -> Create Google Drive folder -> Send welcome email via Gmail -> Add row to client tracker spreadsheet." },
            { id: "t5", title: "Test and document", instruction: "Run each automation 3 times. Document the time saved per week and calculate your monthly ROI." }
          ]
        }
      },
      {
        id: 'a6', title: 'Module 6: Advanced Automation with Make', duration_minutes: 25, type: 'article',
        content: `# Beyond Zapier: Complex Automations with Make\n\nWhile Zapier excels at simple linear automations, Make (formerly Integromat) allows you to build complex, branching workflows with conditional logic.\n\n## When to Use Make vs Zapier\n- **Zapier**: Simple "if this, then that" automations. Best for beginners.\n- **Make**: Multi-branch workflows with routers, filters, and error handling. Best for power users.\n\n## Building a Client Proposal Automation\nScenario: When a lead fills out your intake form, automatically:\n1. Create a custom proposal using AI (via API call to OpenAI)\n2. Generate a branded PDF\n3. Send it via email with a personalized subject line\n4. Log the interaction in your CRM\n5. Set a follow-up reminder for 3 days later\n\n## Error Handling\nProfessional automations must handle failures gracefully:\n- **Retry logic**: Automatically retry failed steps up to 3 times\n- **Fallback paths**: If the AI API is down, queue the task for later\n- **Notifications**: Alert yourself via Slack when critical automations fail\n\n## Cost Analysis\nA freelancer billing $50/hour who saves 10 hours/month through automation effectively earns an extra $6,000/year. The tools cost roughly $30/month combined.\n\n## Assignment\nSign up for Make.com (free tier) and recreate one of your Zapier automations. Compare the experience, noting advantages of each platform.`
      },
      {
        id: 'a7', title: 'Module 7: AI for Design & Visual Content', duration_minutes: 20, type: 'article',
        content: `# Visual Content Creation with AI\n\nAI image generation has revolutionized visual content for freelancers who are not professional designers.\n\n## Tools Overview\n**Midjourney**: Best for artistic, high-quality images. Requires Discord.\n**DALL-E 3 (via ChatGPT)**: Best for quick iterations and specific compositions.\n**Canva AI**: Best for social media templates and brand-consistent designs.\n**Remove.bg**: Instant background removal.\n\n## Prompt Structure for Image Generation\nThe key components of a great image prompt:\n1. **Subject**: What is in the image?\n2. **Style**: Photography? Illustration? 3D render?\n3. **Mood**: Warm? Professional? Energetic?\n4. **Technical**: Aspect ratio, lighting, camera angle\n\n## Example Prompt\n"Professional headshot of a confident African businesswoman in a modern office, natural lighting, shallow depth of field, warm color palette, shot on Canon EOS R5, 85mm lens, 4:5 aspect ratio"\n\n## Ethical Considerations\n- Always disclose AI-generated images to clients\n- Never use AI to generate images of real people without consent\n- Understand copyright implications in your jurisdiction\n- Use AI images as starting points, not final deliverables for premium clients\n\n## Practice\nGenerate 5 different social media post images for a fictional coffee brand using DALL-E 3. Create variations in style and mood.`
      },
      {
        id: 'a8', title: 'Module 8: Selling AI-Enhanced Services', duration_minutes: 15, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You are pitching an 'AI Copywriting Retainer' to a new client. They are currently paying a traditional agency $2000/mo.",
              prompt: "CLIENT: 'Wait, if you're just using ChatGPT to write these blogs, why should I pay you $1,500 a month? I could just use it myself for free.'",
              correct: 1,
              options: [
                { text: "Because I have the premium version of ChatGPT and you don't.", explanation: "This focuses on the wrong value. Anyone can buy ChatGPT Plus." },
                { text: "You're paying for the strategy, fact-checking, brand voice alignment, and editing. ChatGPT is just my typewriter; I'm still the author.", explanation: "Perfect. This positions AI as a standard tool and correctly repositions your value around strategy and quality control." },
                { text: "I can lower the price to $500 since I'm using AI.", explanation: "Never unnecessarily discount your services. Value-based pricing applies regardless of your tools." }
              ]
            },
            {
              context: "A potential client asks about your process for a website redesign project.",
              prompt: "CLIENT: 'Do you use AI in your work? I'm worried about quality if everything is just generated by a computer.'",
              correct: 2,
              options: [
                { text: "No, I do everything manually. No AI involved.", explanation: "Dishonesty will backfire. Clients who discover you lied about using AI will lose all trust." },
                { text: "Yes, AI does most of the work. It's much faster this way.", explanation: "This devalues your expertise and makes the client question why they need you." },
                { text: "I use AI as one of many tools in my workflow, similar to how architects use CAD software. The creative direction, quality control, and strategic decisions are all mine.", explanation: "Excellent. Transparent, professional, and positions AI correctly as a tool, not a replacement for your expertise." }
              ]
            }
          ]
        }
      },
      {
        id: 'a9', title: 'Module 9: Building an AI Service Package', duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "p1", title: "Define your AI-enhanced service", instruction: "Choose one service you currently offer and define how AI improves it. Example: 'AI-Powered Blog Writing Package - 8 SEO-optimized articles per month with keyword research, outline, draft, edit, and publish.'" },
            { id: "p2", title: "Create a pricing structure", instruction: "Develop three tiers (Basic, Pro, Premium) with clear deliverables. Price based on value delivered, not hours spent." },
            { id: "p3", title: "Build a case study", instruction: "Document a real or hypothetical project showing the before/after of AI integration. Include metrics: time saved, quality improvements, client satisfaction." },
            { id: "p4", title: "Write your service proposal template", instruction: "Create a one-page proposal template that explains your AI-enhanced process without over-emphasizing the AI. Focus on outcomes." },
            { id: "p5", title: "Prepare objection responses", instruction: "Write professional responses to the top 5 objections clients raise about AI-assisted work (quality concerns, pricing, originality, etc.)." }
          ]
        }
      },
      {
        id: 'a10', title: 'Module 10: AI Ethics & Best Practices', duration_minutes: 15, type: 'article',
        content: `# Ethical AI Usage for Freelancers\n\nAs AI becomes central to your workflow, understanding ethical boundaries is critical for long-term career sustainability.\n\n## The Transparency Principle\nAlways be transparent with clients about your use of AI tools. This does not mean listing every tool; it means not misrepresenting AI-generated work as entirely hand-crafted.\n\n## Data Privacy\n- Never input client confidential data into public AI tools without permission\n- Use enterprise AI accounts when handling sensitive information\n- Understand the data retention policies of each tool you use\n- Consider self-hosted AI solutions for highly sensitive projects\n\n## Quality Assurance\n- Always fact-check AI-generated content\n- Run plagiarism checks on AI-written text\n- Review AI-generated code for security vulnerabilities\n- Never ship AI output without human review\n\n## Intellectual Property\n- Understand who owns AI-generated content in your jurisdiction\n- Include AI usage clauses in your client contracts\n- Keep records of your creative input and editing process\n\n## The Future of AI in Freelancing\nAI will continue to evolve rapidly. The freelancers who thrive will be those who:\n1. Continuously update their AI skills\n2. Focus on uniquely human abilities (creativity, empathy, strategic thinking)\n3. Build systems that leverage AI for scale while maintaining quality\n4. Position themselves as AI-augmented experts, not AI operators\n\n> "The goal is not to become an AI expert. The goal is to become an expert who uses AI."`
      },
      {
        id: 'a11', title: 'Module 11: Capstone Project', duration_minutes: 30, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "cap1", title: "Select your capstone topic", instruction: "Choose a real client project or create a detailed fictional brief. The project should involve content creation, automation, and client delivery." },
            { id: "cap2", title: "Build the AI workflow", instruction: "Document every AI tool used, every prompt written, and every automation created. Screenshot each step." },
            { id: "cap3", title: "Create the deliverable", instruction: "Produce the final deliverable (e.g., 5 blog posts, a marketing campaign, a website prototype) using your AI-enhanced workflow." },
            { id: "cap4", title: "Calculate ROI", instruction: "Compare the time and cost of producing this deliverable with and without AI. Present the savings as a percentage." },
            { id: "cap5", title: "Write a reflection", instruction: "Write a 500-word reflection on what you learned, what surprised you, and how you plan to integrate AI into your daily freelancing practice." }
          ]
        }
      },
      {
        id: 'a12', title: 'Final Assessment', duration_minutes: 20, type: 'video',
        video_url: 'https://www.youtube.com/embed/z-EtmaFJieY',
        content: `Watch this comprehensive review video, then complete the final quiz to earn your certificate.`,
        quiz_data: {
          questions: [
            { question: "What does the 'R' stand for in the R.C.T.F.C prompting framework?", options: ["Result", "Role", "Reference", "Research"], correctAnswer: 1 },
            { question: "Which tool is best for complex multi-branch automations?", options: ["Zapier", "Make (Integromat)", "Gmail filters", "IFTTT"], correctAnswer: 1 },
            { question: "What is the recommended approach when a client asks if you use AI?", options: ["Deny it completely", "Over-emphasize AI to seem modern", "Be transparent and position AI as one of your professional tools", "Refuse to answer"], correctAnswer: 2 },
            { question: "What should you always do before delivering AI-generated content?", options: ["Add more AI polish", "Fact-check, edit, and apply human review", "Send it immediately for speed", "Run it through another AI tool"], correctAnswer: 1 },
            { question: "According to the course, what percentage more do AI-assisted freelancers earn per project?", options: ["10%", "22%", "34%", "50%"], correctAnswer: 2 }
          ]
        }
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Freelancing Essentials',
    category: 'Global Business',
    overview: 'Transform your skills into a highly profitable, borderless business. Learn to launch, manage, and scale your freelance career globally.',
    learning_outcomes: [
      'Set up a professional freelancing business from scratch',
      'Win clients on Upwork, Fiverr, and through cold outreach',
      'Master pricing, negotiation, and contract management',
      'Build systems for scaling beyond solo freelancing'
    ],
    duration: '6 Weeks',
    commitment: '10-15 hrs/week',
    price: 0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      {
        id: 'f1', title: 'Module 1: The Global Marketplace', duration_minutes: 15, type: 'article',
        content: `# The Borderless Economy\n\nYou are no longer competing in a local market. Platforms like Upwork, Fiverr, and Toptal have flattened the earning curve, allowing talent from anywhere to earn tier-1 global rates.\n\n## The Skill Arbitrage\nThe secret to global freelancing is skill arbitrage. By acquiring high-value skills (like API integrations, UX design, or specialized copywriting), you decouple your earning potential from your geographic location.\n\n> "Your value is determined by the size of the problem you solve, not the city you log in from."\n\n## The Freelance Economy in Numbers\n- The global freelance market is worth $1.5 trillion and growing 15% annually\n- 36% of the global workforce now freelances in some capacity\n- Africa's freelance market grew 130% between 2020-2025\n- Remote-first companies increased by 400% since 2020\n\n## Types of Freelancing\n**1. Platform-Based**: Upwork, Fiverr, Toptal, PeoplePerHour\n**2. Agency Model**: Building a small team under your brand\n**3. Direct Client**: Cold outreach, referrals, personal brand\n**4. Productized Services**: Fixed-scope, fixed-price offerings\n\n## Assignment\nResearch 5 freelancers in your niche who earn $5,000+/month. Study their profiles, portfolios, and positioning. Note what they do differently from average freelancers.`
      },
      {
        id: 'f2', title: 'Module 2: Setting Up Your Business', duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "c1", title: "Set up a professional email", instruction: "Create an email address using your name or agency name (e.g., hello@yourname.com). Use Google Workspace or Zoho Mail." },
            { id: "c2", title: "Create your Upwork profile", instruction: "Your headline must be specific ('B2B SaaS Copywriter' not 'Freelance Writer'). Write a profile summary using the PAS formula (Problem, Agitate, Solution)." },
            { id: "c3", title: "Upload 3 portfolio pieces", instruction: "Add 3 high-quality case studies detailing the Problem, Solution, and Result. Include metrics wherever possible." },
            { id: "c4", title: "Set up payment accounts", instruction: "Create a Wise or Payoneer account to accept USD payments with minimal conversion fees. Link to your Upwork and direct clients." },
            { id: "c5", title: "Create a LinkedIn profile", instruction: "Optimize your LinkedIn headline, about section, and featured section. Connect with 50 people in your target industry." }
          ]
        }
      },
      {
        id: 'f3', title: 'Module 3: Winning Your First Clients', duration_minutes: 20, type: 'article',
        content: `# The Client Acquisition System\n\nThe biggest challenge for new freelancers is getting that first paying client. This module provides a proven system.\n\n## The Proposal Framework\nA winning Upwork proposal follows this structure:\n\n**Hook** (1 sentence): Show you understand their problem.\n"I noticed you need someone to fix the checkout flow on your Shopify store. I've optimized checkout conversions for 12 e-commerce brands."\n\n**Proof** (2-3 sentences): Demonstrate relevant experience.\n"For my last client, I reduced cart abandonment by 34% by simplifying the checkout to 3 steps. Here's the case study: [link]"\n\n**Plan** (2-3 sentences): Show how you'd approach their project.\n"For your store, I'd start with a UX audit, then implement the top 3 conversion improvements within the first week."\n\n**CTA** (1 sentence): Clear next step.\n"Want me to send over a quick audit of your current checkout? Happy to do it free of charge."\n\n## Cold Outreach Strategy\n1. Identify 50 potential clients on LinkedIn\n2. Engage with their content for 2 weeks (genuine comments, not spam)\n3. Send a personalized message offering specific value\n4. Follow up exactly 3 days later\n5. Never pitch in the first message\n\n## The 100 Proposal Challenge\nCommit to sending 100 quality proposals in your first month. Track response rates and iterate on what works.\n\n> "The freelancer who sends 100 targeted proposals in a month will always outperform the freelancer who sends 10 perfect ones."`
      },
      {
        id: 'f4', title: 'Module 4: The Freelancer Toolkit', duration_minutes: 10, type: 'toolkit',
        quiz_data: {
          resources: [
            { title: "The 10k Proposal Template", desc: "Our highest-converting Upwork proposal structure with fill-in-the-blank sections.", type: "Google Doc" },
            { title: "Client Intake Questionnaire", desc: "Send this to new leads to establish instant authority and gather project requirements.", type: "PDF" },
            { title: "Rate Calculator Matrix", desc: "Calculate your exact hourly and project rates based on expenses, desired income, and market position.", type: "Excel" },
            { title: "Cold Outreach Scripts", desc: "4 plug-and-play email and LinkedIn message sequences for different industries.", type: "Doc" },
            { title: "Contract Template", desc: "Professional freelance contract covering scope, payment terms, revisions, and IP transfer.", type: "PDF" }
          ]
        }
      },
      {
        id: 'f5', title: 'Module 5: Pricing & Value-Based Billing', duration_minutes: 20, type: 'article',
        content: `# Stop Trading Time for Money\n\nThe fastest way to increase your freelance income is to change how you price your services.\n\n## Three Pricing Models\n\n**Hourly Billing** (Worst)\n- Punishes efficiency\n- Creates income ceiling\n- Clients focus on hours, not results\n\n**Project-Based** (Better)\n- Fixed scope = predictable income\n- Rewards efficiency\n- Requires clear scope definitions\n\n**Value-Based** (Best)\n- Price based on client ROI\n- No income ceiling\n- Requires understanding the client's business\n\n## The Value Conversation\nBefore quoting a price, ask:\n1. "What would solving this problem be worth to your business?"\n2. "What's the cost of NOT solving this?"\n3. "What does success look like for this project?"\n\n## Pricing Formula\nFor value-based pricing: charge 10-20% of the value you create.\n- If your redesign will increase their revenue by $100,000/year, charge $10,000-$20,000.\n- If your copy increases conversions by $50,000, charge $5,000-$10,000.\n\n## Raising Your Rates\n- Raise rates by 20% for every new client after you reach full capacity\n- Never negotiate on rate; negotiate on scope instead\n- Grandfather existing clients for 3 months, then raise\n\n> "If no one ever pushes back on your prices, you're charging too little."`
      },
      {
        id: 'f6', title: 'Module 6: High-Stakes Negotiation', duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You just proposed $2,500 for a website redesign.",
              prompt: "CLIENT: 'We love your portfolio, but our maximum budget is $1,500. Can you do it for that?'",
              correct: 2,
              options: [
                { text: "Yes, I can lower my price to $1,500 to win your business.", explanation: "This immediately devalues your work and signals that your initial price was inflated." },
                { text: "No, my price is strictly $2,500. Take it or leave it.", explanation: "Too aggressive. You lose the client entirely without exploring alternatives." },
                { text: "I can work within $1,500, but we'd need to adjust the scope. I can remove the custom animations and limit to 4 pages instead of 8.", explanation: "You protect your effective hourly rate by reducing deliverables, proving that pricing is tied directly to value." }
              ]
            },
            {
              context: "A client wants you to do a 'quick test project' for free before hiring you.",
              prompt: "CLIENT: 'Can you do a small sample article for free so we can see your writing style? We have a big project coming up.'",
              correct: 1,
              options: [
                { text: "I don't do free work, but I can offer a paid trial article at a reduced rate. If you're happy, we proceed with the full project at standard rates.", explanation: "Professional response. Protects your time while showing willingness to build trust." },
                { text: "Sure, I'll write a free sample. It's a good investment to win the larger project.", explanation: "This sets a bad precedent. Free work attracts clients who don't value your time." },
                { text: "My portfolio has 30+ examples of my work. If those don't demonstrate my capability, we're probably not a good fit.", explanation: "Too confrontational. While the point is valid, the delivery could cost you a good client." }
              ]
            }
          ]
        }
      },
      {
        id: 'f7', title: 'Module 7: Client Management & Communication', duration_minutes: 15, type: 'article',
        content: `# Professional Client Relationships\n\nRetaining clients is 5x cheaper than acquiring new ones. Excellent communication is the key.\n\n## The Client Communication Framework\n\n**Onboarding (Day 1-3)**\n- Send a welcome packet with project timeline, communication preferences, and expectations\n- Set up a shared project space (Notion, Trello, or Asana)\n- Schedule a kickoff call to align on vision and deliverables\n\n**In Progress (Weekly)**\n- Send weekly progress updates every Friday, even if brief\n- Never surprise a client with bad news; communicate delays immediately\n- Ask questions in batches, not one at a time\n\n**Delivery**\n- Deliver 24 hours early whenever possible\n- Include a brief explanation of your work and decisions\n- Proactively suggest improvements beyond the original scope\n\n**Post-Project**\n- Ask for a testimonial within 48 hours of project completion\n- Follow up 30 days later to check satisfaction\n- Offer a retainer package for ongoing work\n\n## Red Flags to Watch For\n- "We don't need a contract"\n- "We'll pay you when the project makes money"\n- Constantly changing scope without adjusting budget\n- Disrespecting your working hours\n- Requesting "quick favors" outside the agreed scope\n\n## Setting Boundaries\nBoundaries are professional, not personal. Communicate them clearly upfront:\n- Working hours and response times\n- Revision limits and what constitutes a revision\n- Payment terms (50% upfront, 50% on delivery is standard)`
      },
      {
        id: 'f8', title: 'Module 8: Financial Management', duration_minutes: 15, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "fin1", title: "Set up a business account", instruction: "Open a separate bank account for freelance income. Never mix personal and business finances." },
            { id: "fin2", title: "Create an invoicing system", instruction: "Use Wave, FreshBooks, or a simple Google Sheets template. Include your business name, payment terms, and bank details." },
            { id: "fin3", title: "Implement the profit-first system", instruction: "Allocate every payment: 50% operating expenses, 30% tax reserve, 15% profit, 5% emergency fund." },
            { id: "fin4", title: "Track expenses", instruction: "Log every business expense (software, internet, equipment) for tax deductions. Use a simple spreadsheet or Wave accounting." },
            { id: "fin5", title: "Build a 3-month runway", instruction: "Calculate your monthly expenses and save 3 months' worth before going full-time freelance." }
          ]
        }
      },
      {
        id: 'f9', title: 'Module 9: Scaling Beyond Solo', duration_minutes: 20, type: 'article',
        content: `# From Freelancer to Agency\n\nOnce you hit capacity as a solo freelancer, you have three growth paths.\n\n## Path 1: Raise Prices\nThe simplest scaling strategy. If you're fully booked, raise prices by 30%. Some clients will leave, making room for higher-value ones.\n\n## Path 2: Productized Services\nPackage your service into a fixed-scope, fixed-price offering.\nExample: "Website Audit Package - $500. Includes: 15-page UX audit, performance report, 3 priority recommendations, 30-minute strategy call."\n\nBenefits:\n- Predictable delivery time\n- Easy to systematize and delegate\n- Scalable without proportional time increase\n\n## Path 3: Build a Micro-Agency\n1. Start by subcontracting 1-2 tasks you dislike or that are below your skill level\n2. Create SOPs (Standard Operating Procedures) for everything\n3. Hire contractors at 40-50% of your client rate\n4. Focus your time on client relationships and quality control\n\n## The Systems You Need\n- **Project management**: Notion, ClickUp, or Asana\n- **Client communication**: Slack or dedicated email\n- **File management**: Google Drive with clear folder structure\n- **Invoicing**: Wave or FreshBooks\n- **Contracts**: HelloSign or DocuSign\n\n> "The goal is to work ON your business, not just IN your business."`
      },
      {
        id: 'f10', title: 'Final Assessment', duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You've been freelancing for 6 months and are consistently booked. A major client wants to put you on a monthly retainer.",
              prompt: "CLIENT: 'We'd like to put you on retainer for $3,000/month for 40 hours of work. That way we always have priority access.'",
              correct: 1,
              options: [
                { text: "That works out to $75/hour which is my current rate. But I'd want a 6-month minimum commitment and a 15% discount structure for the guaranteed volume.", explanation: "Excellent negotiation. You secure stability while ensuring the retainer is worthwhile." },
                { text: "$3,000 for 40 hours sounds great! When do we start?", explanation: "You should always evaluate if a retainer makes strategic sense. Consider the opportunity cost of being locked to one client for 40 hours/month." },
                { text: "I don't do retainers. I prefer project-based work.", explanation: "Retainers provide predictable income, which is valuable. Dismissing them entirely limits your growth options." }
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
    overview: 'Navigate the US K-12 education system, ace interviews, and secure your J1 Visa teaching placement. Comprehensive preparation for international educators.',
    learning_outcomes: [
      'Understand the US K-12 education system and classroom culture',
      'Master behavioral interview techniques for school district interviews',
      'Prepare all documentation for J1 Visa sponsorship',
      'Develop culturally responsive teaching strategies'
    ],
    duration: '6 Weeks',
    commitment: '10-12 hrs/week',
    price: 0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      {
        id: 't1', title: 'Module 1: The US K-12 Framework', duration_minutes: 15, type: 'article',
        content: `# Navigating the American Classroom\n\nTeaching internationally requires more than pedagogical excellence; it requires cultural adaptability. The US educational framework emphasizes Student-Centered Learning and Standardized Core Competencies.\n\n## The Core Shift\nUnlike traditional lecture-based systems, US schools mandate active engagement.\n\n- **Formative over Summative**: You will assess students daily (exit tickets, discussions) rather than relying solely on end-of-term exams.\n- **Differentiation**: IEPs (Individualized Education Programs) are legally binding. You must adapt lessons for students with varying learning abilities.\n- **Standards-Based Grading**: Grades reflect mastery of specific standards, not participation or effort alone.\n\n> "In the US system, you are not the sage on the stage; you are the guide on the side."\n\n## Grade Level Breakdown\n- **Elementary (K-5)**: One teacher covers all subjects. Focus on foundational literacy and numeracy.\n- **Middle School (6-8)**: Subject-specific teachers. Students navigate hormonal and social changes.\n- **High School (9-12)**: Advanced subjects, college prep, and career exploration.\n\n## Key Terminology\n- **PLC**: Professional Learning Community (teacher collaboration groups)\n- **504 Plan**: Accommodations for students with disabilities\n- **FERPA**: Federal law protecting student data privacy\n- **RTI**: Response to Intervention (tiered academic support)\n\n## Cultural Expectations\n- Teachers are expected to be approachable and warm\n- Parent communication is critical and frequent\n- Professional development is ongoing (not optional)\n- Classroom management relies on positive reinforcement, not punishment`
      },
      {
        id: 't2', title: 'Module 2: Classroom Management Strategies', duration_minutes: 20, type: 'article',
        content: `# Building a Positive Classroom Culture\n\nEffective classroom management in the US is built on relationships, routines, and restorative practices, not authoritarian control.\n\n## The PBIS Framework\nPositive Behavioral Interventions and Supports (PBIS) is used in 90%+ of US schools:\n\n**Tier 1**: Universal strategies for all students\n- Clear expectations posted and practiced\n- Consistent routines and procedures\n- Positive reinforcement ratio of 5:1 (5 praises for every 1 correction)\n\n**Tier 2**: Targeted interventions for at-risk students\n- Check-in/check-out systems\n- Small group social skills instruction\n- Behavior contracts\n\n**Tier 3**: Intensive individual support\n- Functional behavior assessments\n- Individualized behavior plans\n- Wraparound services\n\n## Restorative Practices\nInstead of punitive discipline:\n- "What happened?" (not "What did you do?")\n- "Who was affected?"\n- "What can you do to make it right?"\n\n## De-escalation Techniques\n1. Stay calm and lower your voice\n2. Use proximity rather than calling out across the room\n3. Offer choices instead of demands\n4. Allow cool-down time before discussing the issue\n5. Follow up privately, never publicly shame a student\n\n## First Week Essentials\n- Teach and practice every procedure (how to enter, how to ask for help, how to transition)\n- Learn every student's name by Day 3\n- Establish your signal for attention (raise hand, countdown, chime)\n- Create a safe, inclusive environment from Day 1`
      },
      {
        id: 't3', title: 'Module 3: Interview Mastery', duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You are in a Zoom interview with a US School District Principal for a J1 Visa position.",
              prompt: "PRINCIPAL: 'How do you handle severe behavioral disruptions in your classroom?'",
              correct: 1,
              options: [
                { text: "I immediately send the student to the principal's office to ensure order is maintained.", explanation: "US administrations expect teachers to handle level 1 and 2 behaviors in-house first. Over-referring is a red flag." },
                { text: "I rely on a tiered approach: prevention through engagement, subtle redirection, and restorative conversations. Office referrals are a last resort.", explanation: "This demonstrates modern classroom management mastery and restorative justice practices." },
                { text: "I use strict disciplinary measures and public corrections to deter others.", explanation: "Public shaming or strict authoritarian discipline is heavily frowned upon in modern US pedagogy." }
              ]
            },
            {
              context: "The interview panel asks about your experience with diverse learners.",
              prompt: "INTERVIEWER: 'How would you differentiate instruction for a class that includes English Language Learners, students with IEPs, and gifted students?'",
              correct: 2,
              options: [
                { text: "I teach to the middle and provide extra worksheets for struggling students.", explanation: "This one-size-fits-all approach doesn't address the needs of diverse learners and ignores legal IEP requirements." },
                { text: "I would refer struggling students to the special education department.", explanation: "Differentiation is the classroom teacher's responsibility. Over-referring signals inability to manage diverse learners." },
                { text: "I use flexible grouping, tiered assignments, and scaffolded materials. For ELLs, I provide visual supports and sentence frames. For IEP students, I follow their accommodation plans. For gifted students, I offer extension activities.", explanation: "Comprehensive answer that shows awareness of all learner needs and specific strategies for each group." }
              ]
            }
          ]
        }
      },
      {
        id: 't4', title: 'Module 4: Lesson Planning (UbD Framework)', duration_minutes: 20, type: 'article',
        content: `# Understanding by Design (UbD)\n\nThe UbD framework, also called "Backward Design," is the gold standard for lesson planning in US schools.\n\n## The Three Stages\n\n**Stage 1: Identify Desired Results**\nStart with the end. What should students know and be able to do?\n- Align to state standards (Common Core, NGSS, etc.)\n- Write clear learning objectives using Bloom's Taxonomy\n- Determine essential questions that drive inquiry\n\n**Stage 2: Determine Assessment Evidence**\nHow will you know students have learned?\n- Summative assessments (tests, projects, presentations)\n- Formative assessments (exit tickets, observations, discussions)\n- Performance tasks (real-world application)\n\n**Stage 3: Plan Learning Experiences**\nOnly now do you plan the actual activities.\n- Hook/engagement activity\n- Direct instruction (mini-lesson, max 15 minutes)\n- Guided practice\n- Independent practice\n- Closure/reflection\n\n## Bloom's Taxonomy Verbs\n- **Remember**: List, define, identify, recall\n- **Understand**: Explain, summarize, compare\n- **Apply**: Use, demonstrate, solve\n- **Analyze**: Differentiate, examine, categorize\n- **Evaluate**: Judge, critique, justify\n- **Create**: Design, construct, develop\n\n## Sample Lesson Plan Structure\n| Component | Time | Description |\n|-----------|------|-------------|\n| Bell Ringer | 5 min | Entry task reviewing prior knowledge |\n| Mini-Lesson | 10-15 min | Direct instruction on new concept |\n| Guided Practice | 15 min | Teacher-led practice with class |\n| Independent Work | 15-20 min | Students apply learning independently |\n| Exit Ticket | 5 min | Quick assessment of understanding |`
      },
      {
        id: 't5', title: 'Module 5: The Educator Toolkit', duration_minutes: 10, type: 'toolkit',
        quiz_data: {
          resources: [
            { title: "US-Standard Resume Template", desc: "An ATS-friendly teaching resume formatted for US school districts. Includes action verbs and quantified achievements.", type: "Google Doc" },
            { title: "Lesson Plan Framework", desc: "A backward-design (Understanding by Design) lesson planner with examples for multiple subject areas.", type: "PDF" },
            { title: "J1 Visa Document Checklist", desc: "Complete checklist of all legal documentation required for J1 Visa sponsorship, with links to official forms.", type: "PDF" },
            { title: "Classroom Management Toolkit", desc: "Templates for behavior tracking, parent communication logs, and PBIS reward systems.", type: "Doc" },
            { title: "Interview Preparation Guide", desc: "50 common US teaching interview questions with model answers and tips.", type: "PDF" }
          ]
        }
      },
      {
        id: 't6', title: 'Module 6: J1 Visa Process & Documentation', duration_minutes: 20, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "v1", title: "Verify your eligibility", instruction: "Confirm you meet the J1 Teacher requirements: valid teaching license, 3+ years of experience, and a bachelor's degree in education or your teaching subject." },
            { id: "v2", title: "Gather academic documents", instruction: "Collect: degree certificates, teaching license, transcripts, professional references (3 minimum), and background check clearance." },
            { id: "v3", title: "Prepare your DS-2019", instruction: "Your sponsor organization will issue this form. Ensure all information matches your passport exactly." },
            { id: "v4", title: "Schedule visa interview", instruction: "Book your US Embassy interview appointment. Prepare: DS-160 confirmation, DS-2019, passport, SEVIS fee receipt, and supporting financial documents." },
            { id: "v5", title: "Complete cultural orientation", instruction: "Attend the mandatory pre-departure orientation covering: US cultural norms, classroom expectations, housing logistics, and emergency procedures." }
          ]
        }
      },
      {
        id: 't7', title: 'Module 7: Culturally Responsive Teaching', duration_minutes: 15, type: 'article',
        content: `# Teaching Across Cultures\n\nAs an international teacher, you bring a unique global perspective to the US classroom. This is your superpower.\n\n## Culturally Responsive Teaching (CRT)\nCRT is a pedagogy that recognizes the importance of students' cultural backgrounds in all aspects of learning.\n\n**Key Principles:**\n1. **High expectations for all students** regardless of background\n2. **Incorporating diverse perspectives** into curriculum and materials\n3. **Validating students' cultural identities** as assets, not deficits\n4. **Building relationships** across cultural differences\n\n## Navigating Cultural Differences\n\n**Communication Styles**\n- US classrooms value student voice and questioning (not disrespect)\n- Eye contact expectations vary across cultures\n- "How are you?" is a greeting, not a real question\n\n**Parent Relationships**\n- Regular communication is expected (weekly or bi-weekly)\n- Parents are partners, not adversaries\n- Be direct about student progress (both strengths and areas for growth)\n\n**Professional Culture**\n- Collaboration is valued over individual achievement\n- Feedback is growth-oriented, not personal criticism\n- Asking for help is a sign of professionalism, not weakness\n\n## Your International Advantage\n- Multilingual skills are increasingly valued\n- Global perspective enriches classroom discussions\n- Resilience and adaptability are evident in your journey\n- Students benefit from diverse role models\n\n> "You are not just teaching a subject. You are representing your country and culture while embracing a new one."`
      },
      {
        id: 't8', title: 'Module 8: Technology in the US Classroom', duration_minutes: 15, type: 'article',
        content: `# EdTech Essentials for International Teachers\n\nUS schools are heavily technology-integrated. Familiarity with these tools is expected from Day 1.\n\n## Learning Management Systems (LMS)\n- **Google Classroom**: Most common. Used for assignments, announcements, and grading.\n- **Canvas**: Common in secondary and higher education.\n- **Schoology**: Growing in popularity.\n\n## Communication Tools\n- **Remind**: Text-based communication with parents and students (no phone numbers shared)\n- **ClassDojo**: Behavior tracking and parent communication for elementary\n- **Talking Points**: Translates messages for multilingual families\n\n## Assessment Tools\n- **Kahoot/Quizizz**: Gamified formative assessments\n- **Google Forms**: Quick surveys and exit tickets\n- **Nearpod**: Interactive presentations with embedded assessments\n\n## Productivity Tools\n- **Google Workspace**: Docs, Sheets, Slides (used universally)\n- **Canva for Education**: Creating visually appealing materials\n- **Loom**: Recording instructional videos\n\n## Digital Citizenship\nYou are responsible for teaching students safe, ethical technology use:\n- Appropriate online behavior\n- Digital footprint awareness\n- Copyright and fair use\n- Cyberbullying prevention\n\n## Assignment\nCreate a Google Classroom and build a sample assignment including: an instruction document, a rubric, and a due date. Practice the student view to understand their experience.`
      },
      {
        id: 't9', title: 'Module 9: Living in the US', duration_minutes: 15, type: 'checklist',
        quiz_data: {
          tasks: [
            { id: "us1", title: "Research your placement area", instruction: "Learn about your assigned school district: cost of living, weather, public transportation, nearby amenities, and cultural communities." },
            { id: "us2", title: "Prepare housing logistics", instruction: "Budget for first month's rent + security deposit. Research furnished housing options, roommate-finding services, and temporary housing for arrival." },
            { id: "us3", title: "Understand US banking", instruction: "Plan to open a US bank account upon arrival (Chase, Bank of America, or a local credit union). Bring passport, DS-2019, and school employment letter." },
            { id: "us4", title: "Healthcare preparation", instruction: "Understand your health insurance coverage through the J1 program. Locate nearby hospitals, pharmacies, and urgent care centers." },
            { id: "us5", title: "Build your support network", instruction: "Connect with other international teachers in your district. Join online communities (Facebook groups, Reddit) for J1 teachers." }
          ]
        }
      },
      {
        id: 't10', title: 'Final Assessment', duration_minutes: 20, type: 'simulator',
        quiz_data: {
          scenarios: [
            {
              context: "You are in your first week at a US school. A parent emails you concerned about their child's behavior grade.",
              prompt: "PARENT EMAIL: 'My son says he got a C in behavior. He never had behavior issues before. I want to schedule a meeting immediately.'",
              correct: 2,
              options: [
                { text: "Reply explaining that the student was disruptive and deserved the grade. Attach documentation of incidents.", explanation: "Too defensive. Start with empathy and collaboration, not justification." },
                { text: "Forward the email to the principal and let them handle it.", explanation: "This is a Tier 1 parent concern. Escalating immediately signals you cannot handle basic parent communication." },
                { text: "Reply thanking the parent for reaching out, express that you want the best for their child, and suggest a meeting time. Prepare specific examples of both strengths and areas for growth.", explanation: "Professional and empathetic. Shows you value the parent as a partner in the student's success." }
              ]
            }
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
