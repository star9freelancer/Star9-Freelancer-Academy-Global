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
        id: 'a1', title: 'Module 1: Introduction to AI and the Modern Freelance Economy', duration_minutes: 45, type: 'video',
        video_url: 'https://www.youtube.com/embed/AivZ31S1s24',
        content: `# Introduction to AI and the Modern Freelance Economy

### What You Will Learn
In this opening module, you will gain a foundational understanding of artificial intelligence and why it matters for freelancers today.

**Key Topics Covered:**
- What AI actually is and how it works in simple terms
- The difference between AI, machine learning, and automation
- How AI is transforming the freelance economy worldwide
- Real-world examples of freelancers using AI to earn more

### The AI Opportunity for Freelancers
The freelance economy is worth over $1.5 trillion globally. AI tools are creating a massive competitive advantage for those who adopt them early. Freelancers who use AI tools report 40-60% increases in productivity.

### Key Takeaways
- AI is a tool, not a replacement for human creativity
- Early adopters have a significant market advantage
- Understanding AI fundamentals is essential for every modern freelancer
- The best AI users combine technical skill with domain expertise`,
        quiz_data: {
          questions: [
            { question: "What is the primary benefit of AI for freelancers?", options: ["Replacing human workers", "Increasing productivity and efficiency", "Making work more complicated", "Reducing client expectations"], correctAnswer: 1 },
            { question: "Which statement about AI is most accurate?", options: ["AI can fully replace human creativity", "AI is only useful for tech workers", "AI is a tool that enhances human capabilities", "AI is too expensive for freelancers"], correctAnswer: 2 },
            { question: "What is the estimated value of the global freelance economy?", options: ["$500 billion", "$1 trillion", "$1.5 trillion", "$3 trillion"], correctAnswer: 2 },
            { question: "What advantage do early AI adopters have?", options: ["Lower prices", "Significant market advantage", "More vacation time", "Fewer clients needed"], correctAnswer: 1 },
            { question: "What is the reported productivity increase for freelancers using AI?", options: ["10-20%", "20-30%", "40-60%", "80-100%"], correctAnswer: 2 }
          ]
        }
      },
      {
        id: 'a2', title: 'Module 2: Mastering ChatGPT for Content Creation', duration_minutes: 60, type: 'video',
        video_url: 'https://www.youtube.com/embed/k_N6Z2Z_L_c',
        content: `# Mastering ChatGPT for Content Creation

### What You Will Learn
This module dives deep into using ChatGPT as your primary content creation assistant. You will learn prompt engineering techniques that produce professional-quality output.

**Key Topics Covered:**
- Setting up ChatGPT for professional use
- The anatomy of an effective prompt
- Advanced prompt engineering techniques (chain-of-thought, few-shot, role-based)
- Creating blog posts, social media content, email campaigns, and proposals
- Quality control and editing AI-generated content

### Prompt Engineering Framework
1. **Role**: Tell ChatGPT who to be (e.g., "You are an expert copywriter")
2. **Context**: Provide background information
3. **Task**: Clearly state what you need
4. **Format**: Specify the desired output format
5. **Constraints**: Set boundaries (tone, length, style)

### Practical Exercise
Write 5 prompts using the framework above for different freelance deliverables: a blog post, a product description, a cold outreach email, a social media caption, and a project proposal.`,
        quiz_data: {
          questions: [
            { question: "What is the first element of an effective prompt?", options: ["Task description", "Role assignment", "Format specification", "Word count"], correctAnswer: 1 },
            { question: "Which prompt technique involves providing examples?", options: ["Zero-shot", "Few-shot", "Chain-of-thought", "Role-based"], correctAnswer: 1 },
            { question: "Why should you edit AI-generated content?", options: ["AI output is always wrong", "To add personal voice and verify accuracy", "To make it longer", "It's not necessary"], correctAnswer: 1 },
            { question: "What does the 'Context' element in a prompt do?", options: ["Sets the word count", "Provides background information", "Chooses the language", "Determines the price"], correctAnswer: 1 },
            { question: "Which is NOT a good use of ChatGPT for freelancers?", options: ["Writing blog posts", "Creating proposals", "Replacing client communication entirely", "Drafting email campaigns"], correctAnswer: 2 }
          ]
        }
      },
      {
        id: 'a3', title: 'Module 3: AI for Research and Data Analysis', duration_minutes: 50, type: 'video',
        video_url: 'https://www.youtube.com/embed/V2_6mXp9V5s',
        content: `# AI for Research and Data Analysis

### What You Will Learn
Learn how to use AI tools to conduct thorough research, analyze data, and deliver insights that would take hours to compile manually.

**Key Topics Covered:**
- Using AI for market research and competitive analysis
- Summarizing long documents and reports
- Data analysis with natural language queries
- Creating data visualizations from raw data
- Fact-checking and source verification

### Research Workflow with AI
1. Define your research question clearly
2. Use AI to gather initial insights and identify key themes
3. Verify facts against primary sources
4. Synthesize findings into actionable recommendations
5. Present data visually for maximum client impact

### Tools Covered
- ChatGPT for research synthesis
- Claude for long document analysis
- Perplexity for fact-checked research`,
        quiz_data: {
          questions: [
            { question: "What is the first step in the AI research workflow?", options: ["Gather data", "Define your research question", "Create visualizations", "Write the report"], correctAnswer: 1 },
            { question: "Why is fact-checking important when using AI for research?", options: ["AI always makes up information", "AI can occasionally produce inaccurate information", "Clients never verify work", "It's not important"], correctAnswer: 1 },
            { question: "Which tool is recommended for long document analysis?", options: ["Midjourney", "DALL-E", "Claude", "Zapier"], correctAnswer: 2 },
            { question: "What should you do after AI generates research insights?", options: ["Submit them directly to the client", "Verify facts against primary sources", "Delete them and start over", "Add more AI-generated content"], correctAnswer: 1 },
            { question: "How should research findings be presented to clients?", options: ["As raw text only", "With data visualizations for maximum impact", "In code format", "Without any formatting"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'a4', title: 'Module 4: Workflow Automation with Zapier & Make', duration_minutes: 75, type: 'video',
        video_url: 'https://www.youtube.com/embed/XqCAsyH06vY',
        content: `# Workflow Automation with Zapier & Make

### What You Will Learn
Automate repetitive tasks and build efficient workflows that save you hours every week. This module covers both Zapier and Make (formerly Integromat).

**Key Topics Covered:**
- Understanding triggers, actions, and workflows
- Building your first Zap (Zapier automation)
- Creating scenarios in Make
- Automating client onboarding processes
- Setting up automated invoicing and follow-ups
- Connecting multiple apps into seamless workflows

### Automation Ideas for Freelancers
- Auto-send welcome emails when a new client signs a contract
- Automatically create project folders in Google Drive
- Send Slack notifications when payments are received
- Auto-generate weekly reports from time tracking data
- Schedule social media posts from a spreadsheet

### ROI Calculation
If you spend 5 hours/week on repetitive tasks and automation reduces that to 30 minutes, you save 234 hours per year. At $50/hour, that is $11,700 in recovered revenue.`,
        quiz_data: {
          questions: [
            { question: "What are the two main components of an automation?", options: ["Input and output", "Triggers and actions", "Start and stop", "Upload and download"], correctAnswer: 1 },
            { question: "What was Make formerly known as?", options: ["Automate.io", "Integromat", "IFTTT", "Power Automate"], correctAnswer: 1 },
            { question: "How many hours per year can automation save if it reduces 5 weekly hours to 30 minutes?", options: ["100 hours", "150 hours", "234 hours", "300 hours"], correctAnswer: 2 },
            { question: "Which is a good first automation for freelancers?", options: ["Building a website", "Auto-sending welcome emails to new clients", "Writing blog posts", "Editing videos"], correctAnswer: 1 },
            { question: "What is the key benefit of connecting multiple apps?", options: ["More subscriptions to manage", "Seamless workflows that reduce manual work", "Higher costs", "More complexity"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'a5', title: 'Module 5: Selling AI-Powered Services', duration_minutes: 60, type: 'video',
        video_url: 'https://www.youtube.com/embed/7X8mS8K6V6k',
        content: `# Selling AI-Powered Services

### What You Will Learn
Transform your AI skills into profitable service offerings. Learn how to package, price, and market AI-enhanced services to premium clients.

**Key Topics Covered:**
- Identifying high-demand AI service opportunities
- Packaging AI services (consulting, implementation, training)
- Pricing strategies for AI-enhanced deliverables
- Writing proposals that highlight your AI advantage
- Building case studies and portfolios

### High-Demand AI Services
1. AI-powered content creation packages
2. Workflow automation consulting
3. AI chatbot development for businesses
4. Data analysis and reporting services
5. AI training workshops for teams

### Pricing Framework
- Charge for the value delivered, not hours spent
- AI services command 30-50% premium over traditional services
- Offer tiered packages (Basic, Professional, Enterprise)
- Include ongoing support and optimization`,
        quiz_data: {
          questions: [
            { question: "How should you price AI-enhanced services?", options: ["By the hour only", "Based on value delivered", "At the lowest possible rate", "Same as non-AI services"], correctAnswer: 1 },
            { question: "What premium can AI services command over traditional services?", options: ["5-10%", "10-20%", "30-50%", "100%"], correctAnswer: 2 },
            { question: "Which is NOT listed as a high-demand AI service?", options: ["Content creation packages", "Workflow automation consulting", "Manual data entry", "AI chatbot development"], correctAnswer: 2 },
            { question: "What should proposals highlight?", options: ["How cheap your services are", "Your AI advantage and value proposition", "How many hours you'll work", "Your personal story"], correctAnswer: 1 },
            { question: "What is a recommended pricing approach?", options: ["Single flat rate for everything", "Tiered packages (Basic, Pro, Enterprise)", "Free trials only", "Pay what you want"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'a6', title: 'Module 6: Ethics and Responsible AI Use', duration_minutes: 40, type: 'video',
        video_url: 'https://www.youtube.com/embed/e6-O66xI5rQ',
        content: `# Ethics and Responsible AI Use

### What You Will Learn
Understanding the ethical implications of AI use is crucial for building trust with clients and maintaining professional integrity.

**Key Topics Covered:**
- Transparency with clients about AI usage
- Data privacy and confidentiality considerations
- Copyright and intellectual property with AI-generated content
- Avoiding bias in AI outputs
- Building ethical AI practices into your workflow

### Ethical Guidelines for Freelancers
1. Always disclose AI usage to clients when asked
2. Never use client data to train AI models without permission
3. Verify AI outputs for accuracy and bias
4. Respect copyright and attribution requirements
5. Maintain human oversight of all AI-generated deliverables

### Building Trust Through Transparency
Clients who understand your AI process are more likely to become long-term partners. Frame AI as a tool that enhances your expertise, not a shortcut that replaces quality work.`,
        quiz_data: {
          questions: [
            { question: "Should you disclose AI usage to clients?", options: ["Never", "Only if they ask", "Always when asked, proactively when relevant", "Only for large projects"], correctAnswer: 2 },
            { question: "What should you do with client data regarding AI?", options: ["Use it freely for training", "Never use it to train AI models without permission", "Share it publicly", "Sell it to AI companies"], correctAnswer: 1 },
            { question: "Why is human oversight important for AI outputs?", options: ["AI is always correct", "To verify accuracy and check for bias", "It's not important", "To slow down the process"], correctAnswer: 1 },
            { question: "How should you frame AI usage to clients?", options: ["As a way to do less work", "As a tool that enhances your expertise", "As something to hide", "As a cost-cutting measure"], correctAnswer: 1 },
            { question: "What builds long-term client relationships?", options: ["Lowest prices", "Transparency about your process", "Never communicating", "Using AI secretly"], correctAnswer: 1 }
          ]
        }
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Freelancing Essentials',
    category: 'Global Business',
    ai_tools_covered: ['Upwork', 'Fiverr', 'LinkedIn', 'Wise', 'Payoneer'],
    overview: 'Transform your skills into a highly profitable, borderless business. This comprehensive foundational course provides the exact roadmap to launch, manage, and scale a freelancing career on the global stage.',
    learning_outcomes: [
      'Build a magnetic, high-converting freelancer profile',
      'Secure premium clients on platforms like Upwork and Fiverr',
      'Manage projects with world-class professionalism',
      'Build a recognizable and trusted personal brand'
    ],
    assessment_details: 'Pass all module quizzes (80% minimum) and submit a complete freelance business plan.',
    duration: '6 Weeks',
    commitment: '10-15 hrs/week',
    price: 0,
    status: 'published',
    image_url: '/freelancing_essentials.png',
    academy_lessons: [
      {
        id: 'f1', title: 'Module 1: Introduction to Global Freelancing', duration_minutes: 40, type: 'video',
        video_url: 'https://www.youtube.com/embed/mGjA4f8mHkc',
        content: `# Introduction to Global Freelancing

### What You Will Learn
Understand the global freelancing landscape, identify opportunities, and position yourself for success in the international market.

**Key Topics Covered:**
- The state of global freelancing in 2024-2025
- Top freelancing platforms and how they differ
- Skills in highest demand globally
- How African freelancers can compete internationally
- Setting realistic income expectations

### The Global Freelancing Opportunity
- 1.57 billion freelancers worldwide
- Remote work has grown 300% since 2020
- African freelancers are the fastest-growing segment
- English-speaking African professionals have a unique advantage in global markets

### Getting Started Checklist
- Reliable internet connection
- Professional email address
- Portfolio of 3-5 work samples
- Clear understanding of your niche
- Payment method (Wise, Payoneer, or PayPal)`,
        quiz_data: {
          questions: [
            { question: "How many freelancers are there worldwide?", options: ["500 million", "1 billion", "1.57 billion", "2 billion"], correctAnswer: 2 },
            { question: "By how much has remote work grown since 2020?", options: ["50%", "100%", "200%", "300%"], correctAnswer: 3 },
            { question: "What is the fastest-growing freelancer segment?", options: ["European freelancers", "Asian freelancers", "African freelancers", "American freelancers"], correctAnswer: 2 },
            { question: "How many work samples should you start with?", options: ["1-2", "3-5", "10-15", "20+"], correctAnswer: 1 },
            { question: "Which is NOT listed as a recommended payment method?", options: ["Wise", "Payoneer", "Cash only", "PayPal"], correctAnswer: 2 }
          ]
        }
      },
      {
        id: 'f2', title: 'Module 2: Building Your Online Profile', duration_minutes: 90, type: 'video',
        video_url: 'https://www.youtube.com/embed/8oR_8pWfE2E',
        content: `# Building Your Online Profile

### What You Will Learn
Create profiles on Upwork, Fiverr, and LinkedIn that attract high-quality clients and stand out from the competition.

**Key Topics Covered:**
- Writing a compelling professional headline
- Crafting an overview that converts visitors to clients
- Choosing the right profile photo
- Setting your hourly rate and project pricing
- Building a portfolio that demonstrates expertise
- Getting your first reviews

### Profile Optimization Formula
1. **Headline**: [Skill] + [Specialization] + [Benefit to Client]
2. **Overview**: Hook + Experience + Results + Call to Action
3. **Portfolio**: 3-5 best pieces with descriptions of the problem solved
4. **Skills**: List 10-15 relevant skills, most important first
5. **Availability**: Keep it updated and responsive

### Common Mistakes to Avoid
- Generic headlines like "Freelancer" or "Writer"
- No profile photo or unprofessional photo
- Copying other people's profiles
- Setting rates too low to compete
- Not responding to messages within 24 hours`,
        quiz_data: {
          questions: [
            { question: "What should a professional headline include?", options: ["Just your name", "Skill + Specialization + Benefit", "Your location only", "A funny quote"], correctAnswer: 1 },
            { question: "How many portfolio pieces should you start with?", options: ["1", "3-5", "15-20", "None needed"], correctAnswer: 1 },
            { question: "What is a common profile mistake?", options: ["Having a professional photo", "Responding quickly to messages", "Using a generic headline like 'Freelancer'", "Setting competitive rates"], correctAnswer: 2 },
            { question: "Within how many hours should you respond to messages?", options: ["1 hour", "24 hours", "1 week", "Whenever you feel like it"], correctAnswer: 1 },
            { question: "What should the overview section end with?", options: ["Your full address", "A call to action", "A list of complaints", "Nothing special"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'f3', title: 'Module 3: Proposal Writing and Client Acquisition', duration_minutes: 60, type: 'video',
        video_url: 'https://www.youtube.com/embed/Yv9mQ8S8K6E',
        content: `# Proposal Writing and Client Acquisition

### What You Will Learn
Master the art of writing winning proposals that stand out and convert prospects into paying clients.

**Key Topics Covered:**
- Understanding what clients actually want
- The anatomy of a winning proposal
- Personalization techniques that increase response rates
- Follow-up strategies
- Converting one-time clients to recurring revenue

### Winning Proposal Template
1. **Personalized greeting** referencing their specific project
2. **Understanding** of their problem in your own words
3. **Proposed solution** with clear deliverables
4. **Relevant experience** with similar projects
5. **Timeline and pricing** with clear milestones
6. **Call to action** suggesting a quick call

### Key Statistics
- Personalized proposals get 3x more responses
- Proposals sent within 1 hour of posting get 5x more views
- Including a relevant sample increases win rate by 40%`,
        quiz_data: {
          questions: [
            { question: "What is the first element of a winning proposal?", options: ["Your pricing", "A personalized greeting referencing their project", "A generic template", "Your resume"], correctAnswer: 1 },
            { question: "How much more likely are personalized proposals to get responses?", options: ["Same as generic", "2x more", "3x more", "10x more"], correctAnswer: 2 },
            { question: "When should you send proposals for best visibility?", options: ["A week after posting", "Within 1 hour of posting", "At midnight", "Only on weekends"], correctAnswer: 1 },
            { question: "Including a relevant sample increases win rate by how much?", options: ["10%", "20%", "40%", "80%"], correctAnswer: 2 },
            { question: "What should a proposal end with?", options: ["Nothing", "A call to action", "Your life story", "A complaint about the budget"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'f4', title: 'Module 4: Pricing and Negotiation', duration_minutes: 50, type: 'video',
        video_url: 'https://www.youtube.com/embed/5y0iNoeHOnE',
        content: `# Pricing and Negotiation

### What You Will Learn
Set profitable rates, negotiate confidently, and understand the psychology of pricing in the freelance market.

**Key Topics Covered:**
- Understanding your market value
- Hourly vs. project-based pricing
- Value-based pricing strategies
- Negotiation tactics for freelancers
- When and how to raise your rates

### Pricing Formula
1. Calculate your minimum viable rate (expenses + desired profit / available hours)
2. Research market rates for your skill and experience level
3. Position yourself at the 60th-75th percentile
4. Increase rates by 10-15% every 6 months as you build reputation

### Negotiation Rules
- Never be the first to name a price if possible
- Always have a walk-away number
- Package services to create perceived value
- Offer payment plans for larger projects
- Be confident in the value you provide`,
        quiz_data: {
          questions: [
            { question: "Where should you position your rates initially?", options: ["Lowest possible", "60th-75th percentile", "The absolute highest", "Whatever the client suggests"], correctAnswer: 1 },
            { question: "How often should you increase your rates?", options: ["Never", "Every month", "Every 6 months by 10-15%", "Only when clients complain"], correctAnswer: 2 },
            { question: "What is value-based pricing?", options: ["Charging by the hour", "Charging based on the value delivered to the client", "Charging the minimum", "Charging whatever competitors charge"], correctAnswer: 1 },
            { question: "What should you always have during negotiation?", options: ["A friend present", "A walk-away number", "A discount ready", "Multiple clients bidding"], correctAnswer: 1 },
            { question: "Which pricing approach is generally more profitable?", options: ["Always hourly", "Project-based or value-based", "Free trials", "Donations"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'f5', title: 'Module 5: Client Communication and Retention', duration_minutes: 45, type: 'video',
        video_url: 'https://www.youtube.com/embed/fWbb6Yf30vQ',
        content: `# Client Communication and Retention

### What You Will Learn
Build lasting client relationships through professional communication, exceeded expectations, and strategic account management.

**Key Topics Covered:**
- Professional communication standards
- Setting and managing expectations
- Handling difficult clients and scope creep
- Building long-term relationships
- Turning clients into referral sources

### Communication Best Practices
- Respond within 24 hours (12 hours is better)
- Send weekly progress updates
- Be proactive about potential delays
- Use professional language and formatting
- Document all agreements in writing

### Client Retention Strategy
1. Deliver 10% more than promised
2. Ask for feedback after every project
3. Send occasional helpful resources (articles, tools)
4. Offer loyalty discounts for recurring work
5. Ask for referrals after successful projects`,
        quiz_data: {
          questions: [
            { question: "What is the ideal response time for client messages?", options: ["Immediately", "Within 12-24 hours", "Within a week", "When you feel like it"], correctAnswer: 1 },
            { question: "How much more than promised should you deliver?", options: ["Exactly what was agreed", "10% more", "50% more", "Double"], correctAnswer: 1 },
            { question: "What is scope creep?", options: ["A type of insect", "When project requirements expand beyond the original agreement", "A pricing strategy", "A negotiation tactic"], correctAnswer: 1 },
            { question: "When should you ask for referrals?", options: ["Before starting work", "After successful projects", "During negotiations", "Never"], correctAnswer: 1 },
            { question: "Why should you document agreements in writing?", options: ["To waste time", "To protect both you and the client", "To look professional only", "It's not necessary"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 'f6', title: 'Module 6: Scaling Your Freelance Business', duration_minutes: 55, type: 'video',
        video_url: 'https://www.youtube.com/embed/m5_TbeG-R7c',
        content: `# Scaling Your Freelance Business

### What You Will Learn
Move from solo freelancer to business owner. Learn strategies for scaling revenue, building a team, and creating sustainable growth.

**Key Topics Covered:**
- Signs you are ready to scale
- Hiring subcontractors and virtual assistants
- Creating systems and standard operating procedures (SOPs)
- Diversifying income streams
- Building a personal brand that attracts inbound clients

### Scaling Roadmap
1. **Phase 1** (0-6 months): Master your craft, build portfolio, get first 10 clients
2. **Phase 2** (6-12 months): Specialize, raise rates, build systems
3. **Phase 3** (12-24 months): Hire help, create SOPs, diversify income
4. **Phase 4** (24+ months): Build a brand, create passive income, mentor others

### Income Diversification
- Active freelancing (hourly/project work)
- Digital products (templates, courses, guides)
- Consulting and coaching
- Affiliate partnerships
- Passive income from content creation`,
        quiz_data: {
          questions: [
            { question: "What is the first phase of scaling?", options: ["Hiring a team", "Mastering your craft and getting first 10 clients", "Creating passive income", "Building a brand"], correctAnswer: 1 },
            { question: "What are SOPs?", options: ["Sales operation plans", "Standard operating procedures", "System of payments", "Strategic outreach programs"], correctAnswer: 1 },
            { question: "When should you consider hiring help?", options: ["Immediately", "After 12-24 months when you have systems in place", "Never", "Before getting any clients"], correctAnswer: 1 },
            { question: "Which is NOT a listed income diversification strategy?", options: ["Digital products", "Consulting", "Gambling", "Affiliate partnerships"], correctAnswer: 2 },
            { question: "What should you do in Phase 2?", options: ["Quit freelancing", "Specialize, raise rates, and build systems", "Work for free", "Start a new career"], correctAnswer: 1 }
          ]
        }
      }
    ]
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    title: 'International Teacher Preparation',
    category: 'Education & Global Mobility',
    ai_tools_covered: ['Google Classroom', 'Canva', 'Canvas', 'J1 Visa Platform'],
    overview: 'Bridge the gap between local talent and global classrooms. This specialized course prepares educators for international teaching opportunities, with a focus on securing placements in the USA via the J1 visa program.',
    learning_outcomes: [
      'Navigate the US K-12 education system with clarity',
      'Ace international interviews and deliver demonstration lessons',
      'Craft professional, globally recognized teaching portfolios',
      'Adapt to and lead multicultural classrooms'
    ],
    assessment_details: 'Pass all module quizzes (80% minimum), submit a teaching demo video, and complete a lesson plan portfolio.',
    duration: '12 Weeks',
    commitment: '20-25 hrs/week',
    price: 0,
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    academy_lessons: [
      {
        id: 't1', title: 'Module 1: Overview of the US Education System', duration_minutes: 60, type: 'video',
        video_url: 'https://www.youtube.com/embed/v3HwY26_foc',
        content: `# Overview of the US Education System

### What You Will Learn
Gain a comprehensive understanding of how the American K-12 education system works, including grade levels, curriculum standards, and school culture.

**Key Topics Covered:**
- Structure of the US education system (Elementary, Middle, High School)
- Common Core State Standards and state-specific curricula
- The role of standardized testing
- School culture and classroom expectations
- Understanding IEPs and accommodations for diverse learners

### Key Differences from African Education Systems
- Student-centered vs. teacher-centered approaches
- Emphasis on critical thinking over memorization
- Parental involvement expectations
- Technology integration in classrooms
- Diverse and multicultural student populations

### Preparing for the Transition
Understanding these differences is the foundation for success. International teachers who adapt quickly to US classroom culture report higher satisfaction and contract renewal rates.`,
        quiz_data: {
          questions: [
            { question: "What are the three levels of US K-12 education?", options: ["Primary, Secondary, Tertiary", "Elementary, Middle, High School", "Basic, Intermediate, Advanced", "Nursery, Primary, Secondary"], correctAnswer: 1 },
            { question: "What approach does the US education system emphasize?", options: ["Memorization-based", "Student-centered with critical thinking", "Teacher-only lectures", "Self-study only"], correctAnswer: 1 },
            { question: "What is an IEP?", options: ["International Education Program", "Individualized Education Program", "Integrated Exam Protocol", "International Exchange Process"], correctAnswer: 1 },
            { question: "What is a key difference from African education systems?", options: ["Less technology use", "Greater emphasis on critical thinking over memorization", "Smaller class sizes always", "No standardized testing"], correctAnswer: 1 },
            { question: "What leads to higher contract renewal rates?", options: ["Teaching the same way as back home", "Quick adaptation to US classroom culture", "Avoiding parent communication", "Teaching only one subject"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 't2', title: 'Module 2: Curriculum Planning and Lesson Delivery', duration_minutes: 75, type: 'video',
        video_url: 'https://www.youtube.com/embed/O_UozI0hV64',
        content: `# Curriculum Planning and Lesson Delivery

### What You Will Learn
Design engaging, standards-aligned lesson plans that meet American curriculum requirements and engage diverse learners.

**Key Topics Covered:**
- Understanding backward design (Understanding by Design framework)
- Writing clear learning objectives using Bloom's Taxonomy
- Differentiated instruction strategies
- Incorporating technology in lesson delivery
- Assessment types: formative vs. summative

### Lesson Plan Template
1. **Learning Objective**: What students will know/be able to do
2. **Standards Alignment**: Which state/national standards are addressed
3. **Opening Activity**: Engaging hook (5-10 minutes)
4. **Direct Instruction**: Teaching the concept (15-20 minutes)
5. **Guided Practice**: Students work with support (15 minutes)
6. **Independent Practice**: Students work alone (10-15 minutes)
7. **Closing/Assessment**: Check for understanding (5 minutes)`,
        quiz_data: {
          questions: [
            { question: "What is backward design?", options: ["Teaching in reverse order", "Starting with the desired outcome and planning backwards", "Letting students design the lesson", "Using only textbooks"], correctAnswer: 1 },
            { question: "What is Bloom's Taxonomy used for?", options: ["Classifying plants", "Writing clear learning objectives at different cognitive levels", "Grading students", "Organizing classroom furniture"], correctAnswer: 1 },
            { question: "What is differentiated instruction?", options: ["Teaching the same way to everyone", "Adapting teaching to meet diverse learner needs", "Using only one textbook", "Teaching only advanced students"], correctAnswer: 1 },
            { question: "What is the difference between formative and summative assessment?", options: ["No difference", "Formative is ongoing; summative is at the end", "Summative is daily; formative is annual", "They are the same thing"], correctAnswer: 1 },
            { question: "How long should the opening activity typically be?", options: ["1 minute", "5-10 minutes", "30 minutes", "The entire class period"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 't3', title: 'Module 3: Classroom Management Strategies', duration_minutes: 60, type: 'video',
        video_url: 'https://www.youtube.com/embed/pgk-719mTxM',
        content: `# Classroom Management Strategies

### What You Will Learn
Develop effective classroom management techniques that create a positive learning environment in American schools.

**Key Topics Covered:**
- Establishing classroom rules and routines
- Positive behavior reinforcement systems
- De-escalation techniques for challenging behaviors
- Building rapport with students from diverse backgrounds
- Working with school counselors and administration

### The 3 Pillars of Effective Classroom Management
1. **Prevention**: Clear expectations, engaging lessons, positive relationships
2. **Intervention**: Redirecting behavior, private conversations, logical consequences
3. **Restoration**: Restorative practices, student conferences, parent communication

### Cultural Considerations
- Discipline styles vary significantly between cultures
- Physical punishment is prohibited in US schools
- Students have legal rights that must be respected
- Building trust is more effective than authoritarian control`,
        quiz_data: {
          questions: [
            { question: "What are the 3 pillars of classroom management?", options: ["Rules, punishment, rewards", "Prevention, intervention, restoration", "Lecture, test, grade", "Silence, obedience, compliance"], correctAnswer: 1 },
            { question: "Is physical punishment allowed in US schools?", options: ["Yes, in all states", "Only for serious offenses", "No, it is prohibited", "Only with parent permission"], correctAnswer: 2 },
            { question: "What is the most effective approach to discipline?", options: ["Authoritarian control", "Building trust and positive relationships", "Ignoring all behavior", "Sending students to the office immediately"], correctAnswer: 1 },
            { question: "What are restorative practices?", options: ["Repairing broken furniture", "Approaches that repair harm and rebuild relationships", "Extra homework assignments", "Suspension from school"], correctAnswer: 1 },
            { question: "What should you do before escalating a behavior issue?", options: ["Send the student home", "Try redirection and private conversation first", "Call the police", "Ignore it completely"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 't4', title: 'Module 4: Interview Preparation (J1 Visa Focus)', duration_minutes: 90, type: 'video',
        video_url: 'https://www.youtube.com/embed/F4Syr5_p-mU',
        content: `# Interview Preparation (J1 Visa Focus)

### What You Will Learn
Prepare thoroughly for international teaching interviews, with specific focus on the J1 visa process and what US school districts look for.

**Key Topics Covered:**
- Understanding the J1 visa teacher program
- Common interview questions and model answers
- Delivering a demonstration lesson
- Visa application process and timeline
- Working with placement agencies

### Top 10 Interview Questions
1. Why do you want to teach in the United States?
2. Describe your teaching philosophy
3. How do you handle classroom management?
4. How do you differentiate instruction?
5. Describe a successful lesson you taught
6. How do you use technology in the classroom?
7. How do you communicate with parents?
8. How do you assess student learning?
9. What would you do if a student was struggling?
10. How do you handle cultural differences?

### Demo Lesson Tips
- Keep it to 15-20 minutes
- Include a clear learning objective
- Engage the "students" (interviewers) with questions
- Show enthusiasm and energy
- Have a backup plan if technology fails`,
        quiz_data: {
          questions: [
            { question: "How long should a demo lesson typically be?", options: ["5 minutes", "15-20 minutes", "45 minutes", "1 hour"], correctAnswer: 1 },
            { question: "What is the J1 visa?", options: ["A tourist visa", "A cultural exchange visa for teachers", "A permanent residency card", "A student visa"], correctAnswer: 1 },
            { question: "What should you always include in a demo lesson?", options: ["A test", "A clear learning objective", "Homework assignment", "Punishment protocol"], correctAnswer: 1 },
            { question: "What should you do if technology fails during a demo?", options: ["Cancel the lesson", "Have a backup plan ready", "Blame the school", "Walk out"], correctAnswer: 1 },
            { question: "How should you describe your teaching philosophy?", options: ["Copy it from the internet", "Be authentic and give specific examples", "Say you don't have one", "Keep it very vague"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 't5', title: 'Module 5: Professional Documentation', duration_minutes: 50, type: 'video',
        video_url: 'https://www.youtube.com/embed/1_S-v_fVfG8',
        content: `# Professional Documentation

### What You Will Learn
Create professional-quality resumes, cover letters, and teaching portfolios that meet US and international standards.

**Key Topics Covered:**
- Writing a US-standard teaching resume
- Crafting targeted cover letters
- Building a digital teaching portfolio
- Document authentication and credential evaluation
- Letters of recommendation best practices

### Resume Essentials for International Teachers
- Keep it to 2 pages maximum
- Lead with certification and qualifications
- Include specific achievements with numbers
- List technology skills prominently
- Include relevant professional development

### Portfolio Contents
1. Professional resume and cover letter
2. Teaching philosophy statement (1 page)
3. Sample lesson plans (3-5)
4. Student assessment examples
5. Classroom photos or videos
6. Letters of recommendation (2-3)
7. Certificates and credentials`,
        quiz_data: {
          questions: [
            { question: "How long should a teaching resume be?", options: ["1 page only", "2 pages maximum", "5 pages", "As long as possible"], correctAnswer: 1 },
            { question: "How many sample lesson plans should your portfolio include?", options: ["1", "3-5", "10-15", "None"], correctAnswer: 1 },
            { question: "What should your resume lead with?", options: ["Personal interests", "Certification and qualifications", "Your photo", "Your age"], correctAnswer: 1 },
            { question: "How many letters of recommendation should you include?", options: ["None", "1", "2-3", "10+"], correctAnswer: 2 },
            { question: "How long should a teaching philosophy statement be?", options: ["1 paragraph", "1 page", "5 pages", "10 pages"], correctAnswer: 1 }
          ]
        }
      },
      {
        id: 't6', title: 'Module 6: Cultural Adaptation and Global Teaching Ethics', duration_minutes: 45, type: 'video',
        video_url: 'https://www.youtube.com/embed/_K-fA1W0M_w',
        content: `# Cultural Adaptation and Global Teaching Ethics

### What You Will Learn
Navigate cultural differences, build resilience, and maintain ethical standards while teaching internationally.

**Key Topics Covered:**
- Understanding culture shock and adaptation stages
- Building relationships in a new community
- Legal and ethical obligations of international teachers
- Maintaining connection with home while abroad
- Planning for professional growth and career advancement

### The 4 Stages of Cultural Adaptation
1. **Honeymoon**: Everything is exciting and new (0-3 months)
2. **Frustration**: Differences become challenging (3-6 months)
3. **Adjustment**: You start finding your rhythm (6-12 months)
4. **Acceptance**: You feel comfortable and competent (12+ months)

### Ethical Obligations
- Follow all local laws and school policies
- Maintain professional boundaries with students
- Respect cultural differences without judgment
- Contribute positively to the school community
- Continue professional development throughout your placement`,
        quiz_data: {
          questions: [
            { question: "What is the first stage of cultural adaptation?", options: ["Frustration", "Acceptance", "Honeymoon", "Adjustment"], correctAnswer: 2 },
            { question: "When does the frustration stage typically occur?", options: ["Immediately", "3-6 months in", "After 2 years", "Never"], correctAnswer: 1 },
            { question: "What is an ethical obligation of international teachers?", options: ["Teaching only your home country's curriculum", "Following all local laws and school policies", "Avoiding all local customs", "Working without a contract"], correctAnswer: 1 },
            { question: "What helps maintain well-being while abroad?", options: ["Isolating yourself", "Maintaining connection with home while building new relationships", "Never leaving your apartment", "Complaining constantly"], correctAnswer: 1 },
            { question: "When do most teachers reach the acceptance stage?", options: ["Immediately", "After 1 month", "After 12+ months", "Never"], correctAnswer: 2 }
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
