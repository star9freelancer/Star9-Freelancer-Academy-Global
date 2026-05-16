// WEEK 1: AI Basics + Social Media Marketing for Freelancers
// This content is imported into useAcademyData.ts

import { Module } from "./useAcademyData";

// Define the modules first
const AI_WEEK_1_MODULES_DATA: Module[] = [
    {
        id: "ai-w1-m1",
        title: "Module 1: Introduction to AI for Freelancing",
        lessons: [
            {
                id: "ai-w1-m1-l1",
                title: "What Is AI?",
                duration: "15:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/ad79nYk2keg",
                content: `# What Is AI?

## AI stands for Artificial Intelligence

AI is a very fast computer program that has read millions of books, websites, and conversations. It learns patterns from all that reading. When you ask a question, AI predicts the most likely correct answer based on those patterns.

---

## A simple analogy

AI is like a very smart intern who has read the entire internet. The intern works fast but does not truly understand emotions or facts. You still need to check the intern's work.

---

## What AI is NOT

- **AI does not think like a human** - It processes patterns, not thoughts
- **AI does not have feelings or opinions** - It simulates responses based on data
- **AI does not know what is true or false** - It predicts likely answers
- **AI does not remember past conversations** - Unless you tell it to

---

## Everyday examples of AI you already use

- **Google Search suggestions** - Predicts what you're looking for
- **Email spam filters** - Identifies unwanted messages
- **Netflix recommendations** - Suggests shows based on your viewing
- **Phone autocorrect and predictive text** - Completes your sentences
- **ChatGPT, Gemini, Copilot** - Conversational AI assistants

---

## Key takeaway

> **AI is a tool, not a person. You are the boss. AI works for you.**`,
            },
            {
                id: "ai-w1-m1-l2",
                title: "Benefits of AI for Freelancers",
                duration: "18:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/JTxsNm9IdYU",
                content: `# Benefits of AI for Freelancers

## Benefit 1: Saves time

AI writes drafts in 5 seconds instead of 30 minutes.

**Example:** Writing a client email, proposal, or blog intro

## Benefit 2: Helps with writer's block

Staring at a blank page? Ask AI for 10 ideas instantly.

**Example:** "Give me 10 headlines for a freelance graphic designer portfolio"

## Benefit 3: Improves grammar and tone

Not a native English speaker? AI helps you sound professional.

**Example:** "Rewrite this email to be more polite and clear"

## Benefit 4: Works 24/7

Need help at 2 AM? AI is always available. No waiting for a human assistant.

## Benefit 5: Free or very cheap

Many powerful AI tools are completely free. You do not need to invest money to start.

## Benefit 6: Learns from your style

You can teach AI to match your voice.

**Example:** "Write like a friendly expert, not like a robot"

## Real-world freelancing example

Maria is a freelance writer from Mexico. English is her second language. She uses AI to check her grammar and rewrite awkward sentences. Her clients think she is a native English speaker.`,
            },
            {
                id: "ai-w1-m1-l3",
                title: "Limitations of AI",
                duration: "20:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/5p248yoa3oE",
                content: `# Limitations of AI

## Limitation 1: AI can be wrong

AI does not know facts. It predicts words. Sometimes it predicts incorrect information confidently. This is called **hallucination**, which means AI makes things up.

### Example of AI being wrong

Ask AI: "Who won the World Cup in 1942?" 

AI might give an answer. But there was no World Cup in 1942 because of World War II. AI made it up.

## Limitation 2: AI is outdated

Free AI tools may not know recent events.

**Example:** ChatGPT free version may know nothing after May 2025

## Limitation 3: AI has no common sense

AI cannot understand sarcasm, jokes, or deep emotions.

**Example:** "This client is a nightmare" → AI might take it literally

## Limitation 4: AI can be biased

AI learns from the internet, which contains human biases. Always check for unfair or stereotypical answers.

## Limitation 5: AI does not understand your specific client

Only you know the client's personality, history, and hidden needs. AI gives general advice. You add the personal touch.

## The Golden Rule of AI for Freelancers

**Never copy-paste AI output directly to a client. Always read, edit, fact-check, and personalize.**`,
            },
            {
                id: "ai-w1-m1-l4",
                title: "Prompting Basics",
                duration: "25:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/_ZvnD73m40o",
                content: `# Prompting Basics

## What is a prompt?

A prompt is the question or instruction you type into AI. Better prompt = better answer.

## The 4-Part Prompt Formula

| Part | What it means | Example |
|------|---------------|---------|
| **Role** | Who AI should pretend to be | "You are a freelance copywriter" |
| **Task** | What you want AI to do | "Write 5 Instagram captions" |
| **Format** | How you want the answer | "In bullet points" |
| **Tone** | The feeling or style | "Friendly and casual" |

### Putting it together

"You are a freelance social media manager. Write 3 LinkedIn posts in short paragraphs. Professional but warm tone."

## Bad prompt vs. Good prompt

| Bad prompt | Good prompt |
|------------|-------------|
| "Write about freelancing" | "You are a freelancing coach. Write 5 tips for new freelancers in a numbered list. Encouraging tone." |
| "Help me with email" | "Write a polite follow-up email to a client who hasn't paid in 2 weeks. Short and professional." |

## Common prompting mistakes

- Being too vague like "Write something good"
- Forgetting the tone like "Write a proposal" which sounds like a robot
- Asking for too much at once. Break big tasks into small steps.

## Pro tip: Iterate

1. First prompt → get rough draft
2. Second prompt → "Make it shorter"
3. Third prompt → "Make it sound more confident"

AI improves with each round.

## Quick practice prompt

"You are a freelance writer. Write 3 short sentences describing your services to a new client. Friendly and clear."`,
            },
            {
                id: "ai-w1-m1-l5",
                title: "Real Examples of AI in Freelancing",
                duration: "22:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/VznoKyh6AXs",
                content: `# Real Examples of AI in Freelancing

## Example 1: Writing a client proposal

**Without AI:** 45 minutes of staring and rewriting  
**With AI:** 5 minutes

**AI prompt:**  
"Write a short proposal for a freelance logo designer. Client needs a logo for a coffee shop. Include: my process in 3 steps, timeline of 5 days, price of $150. Friendly and excited tone."

## Example 2: Replying to a difficult client email

**Client writes:** "This isn't what I wanted at all."

**AI prompt:**  
"Rewrite this reply to be professional and calm: 'I'm sorry you don't like it. Send me feedback and I will fix it.' Make it sound confident and solution-focused."

## Example 3: Creating a service list for your portfolio

"I am a freelance virtual assistant. List 10 services I can offer, written for busy small business owners. Short phrases. Example: 'Email management.'"

## Example 4: Translating complicated ideas into simple language

"Explain 'SEO keyword research' to a beginner freelancer in 3 simple sentences. No jargon."

## Example 5: Brainstorming freelance niche ideas

"I am good at organizing and love dogs. Suggest 5 freelance business ideas that combine both. Be specific."

## Example 6: Creating a pricing table

"Create a simple pricing table for a freelance proofreader: Basic $50 for 1000 words, Standard $80 for 2000 words, Premium $120 for 3000 words with feedback."

## Summary: AI use cases

| Freelance task | AI helps by |
|----------------|-------------|
| Cold email to new client | Drafting, tone adjustment |
| Blog post outline | Creating structure |
| Social media caption | Writing 10 options to choose from |
| Client question answer | Suggesting professional phrasing |
| Contract or terms | Simple template generation |`,
            },
            {
                id: "ai-w1-m1-quiz",
                title: "Module 1: Self-Assessment Quiz",
                duration: "10:00",
                isCompleted: false,
                type: "quiz" as const,
                quiz_data: {
                    questions: [
                        {
                            question: "True or False: AI feels emotions like a human.",
                            options: ["True", "False"],
                            correctAnswer: 1,
                            explanation:
                                "AI does not have feelings or emotions. It is a tool that predicts patterns based on data.",
                        },
                        {
                            question: "Name one thing AI is bad at:",
                            options: [
                                "Writing drafts quickly",
                                "Understanding facts and truth",
                                "Generating ideas",
                                "Working 24/7",
                            ],
                            correctAnswer: 1,
                            explanation:
                                "AI can hallucinate and make up information. It does not know what is true or false.",
                        },
                        {
                            question: "What are the 4 parts of a good prompt?",
                            options: [
                                "Role, Task, Format, Tone",
                                "Question, Answer, Example, Result",
                                "Input, Output, Process, Review",
                                "Start, Middle, End, Summary",
                            ],
                            correctAnswer: 0,
                            explanation:
                                "A good prompt includes: Role (who AI should be), Task (what to do), Format (how to present), and Tone (style/feeling).",
                        },
                        {
                            question: "Should you copy-paste AI answers directly to a client?",
                            options: [
                                "Yes, AI is always accurate",
                                "No, you must read, edit, fact-check, and personalize",
                                "Yes, if you are in a hurry",
                                "Only for simple tasks",
                            ],
                            correctAnswer: 1,
                            explanation:
                                "Never copy-paste directly. AI can be wrong, outdated, or not personalized to your client.",
                        },
                        {
                            question: "Which is a better prompt?",
                            options: [
                                "Write something",
                                "Help me",
                                "You are a freelance graphic designer. Write a 2-sentence LinkedIn bio. Friendly and creative tone.",
                                "Make a bio",
                            ],
                            correctAnswer: 2,
                            explanation:
                                "The best prompt includes Role, Task, Format, and Tone clearly defined.",
                        },
                    ],
                },
            },
        ],
    },
    {
        id: "ai-w1-m2",
        title: "Module 2: AI for Social Media Marketing",
        lessons: [
            {
                id: "ai-w1-m2-l1",
                title: "Star9 Freelancer Account",
                duration: "20:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/g-M0BqCTh-k",
                content: `# Star9 Freelancer Account

## What is Star9?

Star9 is a professional platform for freelancers similar to LinkedIn but focused on freelancing. You create a profile that acts as your online portfolio. Clients search Star9 to find freelancers.

## Why use Star9?

- Free to join
- Looks professional to clients
- Better than sending PDF resumes

## What to put on your Star9 profile

| Section | What to write |
|---------|---------------|
| **Headline** | Your job title plus who you help. Example: "Social Media Manager for Small Bakeries" |
| **Bio or About** | 3 to 5 sentences: who you are, what you do, how you help |
| **Services** | Bullet list of specific services with prices or "starting at" |
| **Portfolio** | Samples of your work, even practice work |
| **Testimonials** | Reviews from past clients. Start with practice ones or friends. |

## How AI helps with Star9

**Prompt for Headline:**

"Write 5 professional headlines for a freelance virtual assistant. Include who I help which is small business owners. Short and clear."

**Prompt for Bio:**

"Write a 4-sentence bio for Star9. I am a freelance proofreader. I help bloggers and students. Friendly but professional tone."

**Prompt for Services List:**

"List 8 services for a freelance social media manager. Each service should be 2 to 4 words. Example: 'Content calendar creation.'"

## Step-by-step to create your Star9 profile

1. Go to Star9.com and click Sign Up for free
2. Choose Freelancer account type
3. Fill in your name and email
4. Go to Edit Profile
5. Use AI prompts above to generate each section
6. Edit the AI output to sound like you
7. Add a professional photo or an AI-generated headshot
8. Save and publish

## Real example

Sofia used AI to write her Star9 bio. She edited it to add her personality: "I love helping busy bakery owners grow on Instagram." Within 2 weeks, she got her first client.`,
            },
            {
                id: "ai-w1-m2-l2",
                title: "LinkedIn for Freelancers",
                duration: "25:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/QCIvHSRJwY4",
                content: `# LinkedIn for Freelancers

## Why LinkedIn for freelancers?

- Where businesses look for professionals
- Free to post and connect
- Your posts can reach clients without paying for ads

## Types of LinkedIn posts AI can write

| Post type | Purpose | AI prompt example |
|-----------|---------|-------------------|
| **Tip post** | Show expertise | "Write 3 LinkedIn tips for freelancers. Short sentences. Professional tone." |
| **Story post** | Build connection | "Write a short story about failing and learning as a freelancer. Humble and honest tone." |
| **Offer post** | Get clients | "Announce that I am open for freelance writing work. Confident but not pushy." |
| **Question post** | Engagement | "Ask freelancers: What is your biggest struggle with time management?" |

## AI prompt template for LinkedIn posts

"Write a LinkedIn post for a freelance social media manager. Topic: why simple logos work better. Short post. Professional but friendly. Add 3 relevant hashtags at the end."

## How to post on LinkedIn

1. Go to LinkedIn.com
2. Click "Start a post" at the top
3. Paste your AI-generated post
4. Edit to sound more like you
5. Add a relevant image using Canva
6. Click Post

## Pro tip: Comment on other people's posts

AI can help write comments too.

**Prompt:** "Write a thoughtful 2-sentence comment agreeing with this post. Professional and adds value."

## How often to post

- **Beginner:** 3 times per week
- **Better:** once per day

AI makes daily posting easy.`,
            },
            {
                id: "ai-w1-m2-l3",
                title: "Facebook for Freelancers",
                duration: "22:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/Ek3aeUhHaFY",
                content: `# Facebook for Freelancers

## Why Facebook?

- Great for local services like cleaning, tutoring, dog walking, and photography
- Facebook Groups are goldmines for freelancers
- Free to post

## Two ways to use Facebook as a freelancer

### Way 1: Your own Facebook page

- Create a Facebook Page for your freelance business
- Post services, before and after photos, client results
- AI writes the captions

### Way 2: Facebook Groups

- Join groups where your clients hang out
- Example groups: "Small Business Owners in Austin", "Moms Who Need Help", "Freelance Jobs"
- Answer questions helpfully. Introduce yourself politely. No direct spamming.

## AI prompts for Facebook posts

### For your business page:
"Write a friendly Facebook post announcing my freelance dog walking service. Include service area: downtown. Price: $20 per walk. Call to action: 'Message me for free meet-and-greet.' Warm and local tone."

### For a group introduction:
"Write a short introduction for a Facebook group of small business owners. I am a freelance bookkeeper. I help with receipts and monthly reports. Humble and helpful tone. No hard selling."

## Important difference: LinkedIn vs. Facebook tone

| Platform | Tone | Length |
|----------|------|--------|
| **LinkedIn** | Professional, expert | Medium (100-200 words) |
| **Facebook** | Friendly, personal | Short (50-100 words) |

## Example: Same service, different tone

**LinkedIn version:**  
"Write a professional LinkedIn post about bookkeeping services. Focus on accuracy and tax readiness."

**Facebook version:**  
"Write a warm, short Facebook post about bookkeeping. Say: 'Let me handle the receipts so you can focus on your business.' Use an emoji or two."`,
            },
            {
                id: "ai-w1-m2-l4",
                title: "Twitter and X for Freelancers",
                duration: "20:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/bOOQJRHMy8o",
                content: `# Twitter and X for Freelancers

## Why Twitter or X?

- Great for short tips and building a following
- Clients search for experts in your field
- Posts (called tweets) are short and easy to create with AI
- Tweet length limit: 280 characters (about 2 sentences)

## What works on Twitter or X

| Type | Example |
|------|---------|
| **Quick tip** | "Write your client proposal in 5 minutes using this 3-step formula:" |
| **Thread** | Tweet 1: problem. Tweet 2: solution. Tweet 3: example. |
| **Question** | "Freelancers: What's your biggest struggle with pricing?" |
| **Resource** | "Free AI tools every freelancer should bookmark:" |

## How AI helps with Twitter or X

### Prompt for a single tweet:
"Write a Twitter tip for freelancers about time management. Under 250 characters. Add 2 hashtags."

### Prompt for a thread of 5 tweets:
"Turn this paragraph into a Twitter thread of 5 short tweets. Each tweet under 250 characters. Topic: How to get your first freelance client."

## Example AI-generated thread on getting first client

**Tweet 1:** "Your first freelance client is closer than you think. Here's how."

**Tweet 2:** "1. Offer a small free task not a full project. Example: 'I'll audit your Instagram for free.'"

**Tweet 3:** "2. Ask friends to share your service. One share equals free advertising."

**Tweet 4:** "3. Send 5 personalized DMs on LinkedIn every day."

**Tweet 5:** "That's it. Start tomorrow. You'll have a client in 2 weeks."

## How to post on Twitter or X

1. Go to Twitter.com
2. Click the "Post" button
3. Paste your AI tweet
4. Edit to fit your voice
5. Click Post

## Pro tip: Use AI to reply to other people's tweets

**Prompt:** "Write a helpful 1-sentence reply to this tweet. Add value, don't just agree."`,
            },
            {
                id: "ai-w1-m2-l5",
                title: "AI for Content Creation and Scheduling",
                duration: "30:00",
                isCompleted: false,
                type: "article" as const,
                videoUrl: "https://www.youtube.com/embed/AIrWB9q5R8k",
                content: `# AI for Content Creation and Scheduling

## The problem: Posting every day is exhausting  
## The solution: Content batching plus scheduling

## What is content batching?

Writing many posts at once (like 10 posts in 1 hour), then scheduling them to post automatically. AI makes batching fast.

## How to batch content with AI

### Step 1: Choose 1 topic
Example: "Time management for freelancers"

### Step 2: Ask AI to generate many post ideas
**Prompt:** "Give me 10 social media post ideas about time management for freelancers. Mix of tips, questions, and stories."

### Step 3: Ask AI to write each post for each platform

**Prompt for LinkedIn:**  
"Write a LinkedIn post about time management for freelancers. Professional tone."

**Prompt for Facebook:**  
"Rewrite the same idea for Facebook. Friendly tone. Add 1 emoji."

**Prompt for Twitter:**  
"Turn the same idea into a 250-character tweet."

### Step 4: Copy all posts into a spreadsheet
Use Google Sheets to organize your content.

## Free scheduling tools

| Tool | Free plan limits | Best for |
|------|------------------|----------|
| **Buffer** | 3 accounts, 10 scheduled posts each | Beginners |
| **Later** | 1 account, 30 posts per month | Instagram and Facebook |
| **Hootsuite** | 1 account, 5 scheduled posts | Trying multiple tools |

## How to schedule with Buffer (free)

1. Sign up at Buffer.com for free
2. Connect your social media accounts (LinkedIn, Facebook, X)
3. Click "Create post"
4. Paste your AI-generated text
5. Choose date and time
6. Click "Schedule"
7. Repeat for all posts

## Sample weekly posting schedule using AI

| Day | Platform | Post type | Time to create with AI |
|-----|----------|-----------|------------------------|
| Monday | LinkedIn | Tip post | 2 minutes |
| Tuesday | Facebook | Personal story | 2 minutes |
| Wednesday | X | Quick tip tweet | 1 minute |
| Thursday | LinkedIn | Client win story | 2 minutes |
| Friday | Facebook | Offer or service | 2 minutes |
| Saturday | X | Thread of 5 tweets | 5 minutes |

**Total time for 1 week of content:** About 15 minutes with AI batching

## Real-world freelancing example

Ahmed is a freelance social media manager. He uses AI to write 30 posts on Sunday morning in 30 minutes. He schedules them for the whole week using Buffer free plan. He saves over 10 hours per week.`,
            },
            {
                id: "ai-w1-m2-quiz",
                title: "Module 2: Self-Assessment Quiz",
                duration: "10:00",
                isCompleted: false,
                type: "quiz" as const,
                quiz_data: {
                    questions: [
                        {
                            question:
                                "What are the 3 most important sections of a Star9 freelancer profile?",
                            options: [
                                "Headline, Bio, Services",
                                "Photo, Location, Age",
                                "Education, Experience, Skills",
                                "Friends, Followers, Likes",
                            ],
                            correctAnswer: 0,
                            explanation:
                                "The most important sections are Headline (who you help), Bio (what you do), and Services (what you offer).",
                        },
                        {
                            question:
                                "How is the tone different between a LinkedIn post and a Facebook post?",
                            options: [
                                "They are exactly the same",
                                "LinkedIn is professional and expert; Facebook is friendly and personal",
                                "Facebook is more formal than LinkedIn",
                                "LinkedIn uses more emojis",
                            ],
                            correctAnswer: 1,
                            explanation:
                                "LinkedIn requires a professional, expert tone while Facebook is more friendly and personal.",
                        },
                        {
                            question: "What does content batching mean?",
                            options: [
                                "Posting one thing at a time",
                                "Writing many posts at once and scheduling them for later",
                                "Deleting old posts",
                                "Copying other people's content",
                            ],
                            correctAnswer: 1,
                            explanation:
                                "Content batching means creating multiple posts in one session and scheduling them to post automatically over time.",
                        },
                        {
                            question: "Name one free tool to schedule social media posts:",
                            options: ["Microsoft Word", "Buffer", "Google Search", "WhatsApp"],
                            correctAnswer: 1,
                            explanation:
                                "Buffer, Later, and Hootsuite all offer free plans for scheduling social media posts.",
                        },
                        {
                            question: "What is the maximum character limit for a Twitter/X post?",
                            options: [
                                "100 characters",
                                "280 characters",
                                "500 characters",
                                "Unlimited",
                            ],
                            correctAnswer: 1,
                            explanation:
                                "Twitter/X posts are limited to 280 characters, which is about 2 sentences.",
                        },
                    ],
                },
            },
        ],
    },
];

// Export as a week structure (array of weeks, each containing modules)
export const WEEK_1_AI_MODULES = [
    {
        id: "ai-week-1",
        title: "Week 1: AI Basics + Social Media Marketing",
        duration: "6-8 hours",
        modules: AI_WEEK_1_MODULES_DATA
    }
];
