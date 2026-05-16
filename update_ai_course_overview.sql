-- ============================================
-- Update AI for Freelancers Course Overview
-- Shows all tools covered in the course
-- ============================================

UPDATE academy_courses
SET 
    ai_tools_covered = ARRAY[
        'ChatGPT',
        'Google Gemini',
        'Microsoft Copilot',
        'Perplexity AI',
        'Grammarly',
        'Quillbot',
        'LanguageTool',
        'Canva',
        'Buffer',
        'Later',
        'Hootsuite',
        'Durable.co',
        'Wix AI',
        'Framer AI',
        'Toggl Track',
        'TickTick',
        'Google Calendar',
        'Google Sheets',
        'Notion',
        'Trello'
    ],
    overview = 'Master 20+ AI tools to multiply your productivity and income. Learn ChatGPT, Gemini, Perplexity AI, Canva, Buffer, Durable.co, and more. Build websites, automate social media, manage time, and deliver professional work faster.',
    learning_outcomes = ARRAY[
        'Master AI fundamentals and prompt engineering with ChatGPT, Gemini, and Copilot',
        'Create professional content using AI writing and editing tools',
        'Build complete websites with AI website builders (Durable.co, Wix AI)',
        'Automate social media marketing with Buffer, Later, and Hootsuite',
        'Manage time and multiple clients with productivity tools',
        'Analyze data and create reports using AI and Google Sheets',
        'Write winning proposals and professional emails with AI assistance',
        'Deliver AI-powered services to clients ethically and professionally'
    ]
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Verify the update
SELECT 
    id,
    title,
    overview,
    ai_tools_covered,
    learning_outcomes
FROM academy_courses
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✓ AI for Freelancers course overview updated!';
    RAISE NOTICE '';
    RAISE NOTICE 'Tools covered (20+):';
    RAISE NOTICE '  AI Assistants: ChatGPT, Google Gemini, Microsoft Copilot, Perplexity AI';
    RAISE NOTICE '  Writing Tools: Grammarly, Quillbot, LanguageTool';
    RAISE NOTICE '  Design: Canva';
    RAISE NOTICE '  Social Media: Buffer, Later, Hootsuite';
    RAISE NOTICE '  Website Builders: Durable.co, Wix AI, Framer AI';
    RAISE NOTICE '  Productivity: Toggl Track, TickTick, Google Calendar';
    RAISE NOTICE '  Data & Organization: Google Sheets, Notion, Trello';
    RAISE NOTICE '';
    RAISE NOTICE 'The course overview now shows all tools covered across 3 weeks!';
END $$;
