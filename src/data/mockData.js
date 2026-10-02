// Neo Minds Tech Hub Data Architecture

export const METRICS = [
  { value: '50+', label: 'Colleges' },
  { value: '5000+', label: 'Students' },
  { value: '100+', label: 'Projects' },
  { value: '20+', label: 'Industry Partners' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Explore opportunities',
    description: 'Explore high-demand technology tracks, college hackathons, campus club activities, and industry pathways tailored to your interests and year of study.',
    outcomes: ['Track discovery', 'Campus community access', 'Orientation to emerging tech'],
    activeByDefault: false
  },
  {
    number: '02',
    title: 'Assess',
    tagline: 'Know your current skills',
    description: 'Take a diagnostic evaluation that maps your current knowledge, highlights critical blind spots, and provides a clear personalized skill benchmark.',
    outcomes: ['Skill benchmark report', 'Identified gap analysis', 'Tailored learning roadmap'],
    activeByDefault: true
  },
  {
    number: '03',
    title: 'Learn',
    tagline: 'Fill your skill gaps',
    description: 'Engage in hands-on, live-guided learning modules focused on modern industry tools, system architectures, workflows, and production best practices.',
    outcomes: ['Mentor-led sessions', 'Tool mastery (n8n, APIs, React)', 'Architecture patterns'],
    activeByDefault: false
  },
  {
    number: '04',
    title: 'Build',
    tagline: 'Work on real projects',
    description: 'Construct end-to-end, production-grade applications and automations designed alongside engineering leaders from partnering tech startups and enterprises.',
    outcomes: ['GitHub code repository', 'Deployable live demos', 'Engineering case study'],
    activeByDefault: false
  },
  {
    number: '05',
    title: 'Intern',
    tagline: 'Gain industry experience',
    description: 'Transition directly into verified 8-to-12 week industry internships with startups and tech companies through our pre-screened talent pipeline.',
    outcomes: ['Paid stipend internships', 'Letter of recommendation', 'Direct PPO opportunities'],
    activeByDefault: false
  }
];

export const COLLEGES = [
  {
    id: 'osmania',
    name: 'Osmania University',
    shortName: 'Osmania\nUniversity',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/images/campus_osmania.jpg',
    ambassador: 'Vamshi Krishna (University College of Engg)',
    members: 510,
    establishedYear: 1918,
    activeProjects: 36,
    description: 'Historic central university campus with an expansive student network. Active chapters across CSE, ECE, and Information Technology.',
    upcomingEvent: 'Campus Ambassador Summit & Tech Expo'
  },
  {
    id: 'loyola',
    name: 'Loyola Academy College',
    shortName: 'Loyola\nAcademy College',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/images/campus_loyola.jpg',
    ambassador: 'Sanjana Reddy (B.Tech CSE)',
    members: 240,
    establishedYear: 1976,
    activeProjects: 14,
    description: 'Autonomous degree college known for academic rigor and active technical chapters. Neo Minds Club conducts bi-weekly hands-on build sprints.',
    upcomingEvent: 'AI Automation Hackathon 2026'
  },
  {
    id: 'cbit',
    name: 'CBIT',
    shortName: 'CBIT',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/img21.jpeg',
    ambassador: 'Divya Sree (CSE)',
    members: 420,
    establishedYear: 1979,
    activeProjects: 28,
    description: 'Top-tier engineering college fostering student startups, hackathon champions, and active open-source contributors.',
    upcomingEvent: 'Generative AI & Agentic Workflows'
  },
  {
    id: 'anwar-ul-uloom',
    name: 'Anwar Ul Uloom College',
    shortName: 'Anwar Ul Uloom\nCollege',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/images/campus_anwar.jpg',
    ambassador: 'Mohammed Farhan (B.Tech IT)',
    members: 380,
    establishedYear: 1953,
    activeProjects: 22,
    description: 'Premier higher education institute in New Mallepally. Home to a vibrant Neo Minds Tech Hub with student-led initiatives in AI and cloud computing.',
    upcomingEvent: 'Full-Stack Product Sprint'
  },
  {
    id: 'jntu-hyderabad',
    name: 'JNTU Hyderabad',
    shortName: 'JNTU\nHyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/img23.jpeg',
    ambassador: 'Karthik Rao (ECE)',
    members: 460,
    establishedYear: 1972,
    activeProjects: 31,
    description: 'Leading state technical university known for engineering excellence and state-of-the-art research laboratories.',
    upcomingEvent: 'Autonomous Systems & Embedded IoT Summit'
  },
  {
    id: 'st-francis',
    name: 'St. Francis College',
    shortName: 'St. Francis\nCollege',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/img26.jpeg',
    ambassador: 'Ananya Sharma (Computer Science)',
    members: 320,
    establishedYear: 1959,
    activeProjects: 20,
    description: 'Prestigious autonomous college promoting technical leadership, women in STEM, and developer innovation.',
    upcomingEvent: 'Product Design & Web3 Sprint'
  },
  {
    id: 'vnr-vjiet',
    name: 'VNR VJIET',
    shortName: 'VNR\nVJIET',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active Club',
    image: '/img30.jpeg',
    ambassador: 'Akhil Tej (Information Science)',
    members: 395,
    establishedYear: 1995,
    activeProjects: 25,
    description: 'Innovation-driven institution with cutting-edge incubation facilities and student research labs.',
    upcomingEvent: 'Cloud Infrastructure & DevOps Boot'
  }
];

export const PROGRAMS = [
  {
    id: 'ai-automation',
    number: '01',
    title: 'AI & Automation',
    tagline: 'AI tools, workflows, real world applications',
    description: 'Master practical AI systems, autonomous agentic pipelines, n8n automations, vector databases, and enterprise integration patterns that companies urgently hire for.',
    slug: '/programs/ai-automation',
    duration: '10 Weeks',
    commitment: '6-8 hrs/week',
    level: 'Beginner to Advanced',
    tools: ['n8n', 'OpenAI', 'LangChain', 'Pinecone', 'Make', 'REST APIs'],
    modules: [
      { week: 'Week 1-2', title: 'Foundations of Modern AI & Prompt Engineering', topics: 'Token mechanics, system instructions, few-shot prompting, schema outputs.' },
      { week: 'Week 3-4', title: 'Workflow Automation with n8n & Webhooks', topics: 'Trigger nodes, data transformation, HTTP request nodes, error handling.' },
      { week: 'Week 5-6', title: 'API Integration & Dynamic Databases', topics: 'Connecting Supabase, Airtable, PostgreSQL, and CRM webhooks.' },
      { week: 'Week 7-8', title: 'Autonomous AI Agents & Memory Stores', topics: 'Vector search, RAG pipelines, function calling, agent tool execution.' },
      { week: 'Week 9-10', title: 'Capstone: Enterprise AI Lead Qualifier', topics: 'End-to-end automated deployment, monitoring, live testing.' }
    ],
    careers: ['AI Automation Specialist', 'Junior AI Engineer', 'Solutions Consultant'],
    activeByDefault: true
  },
  {
    id: 'digital-marketing',
    number: '02',
    title: 'Digital Marketing',
    tagline: 'Strategy, ads and analytics',
    description: 'Learn quantitative performance marketing, paid acquisition frameworks, SEO mechanics, conversion rate optimization, and AI-accelerated creative workflows.',
    slug: '/programs/digital-marketing',
    duration: '8 Weeks',
    commitment: '5-7 hrs/week',
    level: 'All Levels',
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'Ahrefs', 'Figma'],
    modules: [
      { week: 'Week 1-2', title: 'Consumer Psychology & Offer Positioning', topics: 'Value proposition design, audience segmentation, copy frameworks.' },
      { week: 'Week 3-4', title: 'Paid Search & Social Performance', topics: 'Meta Ads Manager, Google Search Ads, bidding strategies, CBO.' },
      { week: 'Week 5-6', title: 'Conversion Funnel Optimization & CRO', topics: 'Landing page architecture, A/B testing, heatmaps, scroll depth.' },
      { week: 'Week 7-8', title: 'Analytics, Attribution & Capstone Campaign', topics: 'GA4 custom events, ROAS calculation, live budget deployment.' }
    ],
    careers: ['Performance Marketer', 'Growth Specialist', 'Digital Strategist'],
    activeByDefault: false
  },
  {
    id: 'web-software',
    number: '03',
    title: 'Web & Software',
    tagline: 'Frontend, backend, modern frameworks',
    description: 'Build fast, accessible, resilient web applications using modern React, Next.js, Node.js, TypeScript, PostgreSQL, and scalable cloud architectures.',
    slug: '/programs/web-software',
    duration: '12 Weeks',
    commitment: '8-10 hrs/week',
    level: 'Intermediate',
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind', 'Docker'],
    modules: [
      { week: 'Week 1-3', title: 'Modern React Architecture & State Management', topics: 'Hooks, context, component composition, performance optimization.' },
      { week: 'Week 4-6', title: 'Fullstack APIs & Relational Databases', topics: 'REST/GraphQL, Prisma ORM, Postgres schemas, auth tokens.' },
      { week: 'Week 7-9', title: 'Server Components, SSR & Edge Deployment', topics: 'Next.js App Router, caching strategies, server actions.' },
      { week: 'Week 10-12', title: 'Production Capstone: Multi-Tenant SaaS App', topics: 'Stripe billing, RBAC, CI/CD pipelines, Docker containerization.' }
    ],
    careers: ['Frontend Developer', 'Full Stack Engineer', 'Software Associate'],
    activeByDefault: false
  },
  {
    id: 'emerging-technology',
    number: '04',
    title: 'Emerging Technology',
    tagline: 'Stay ahead with future skills',
    description: 'Explore spatial computing, edge AI computing, IoT hardware gateways, and distributed cloud computing systems driving the next industrial wave.',
    slug: '/programs/emerging-technology',
    duration: '8 Weeks',
    commitment: '6-8 hrs/week',
    level: 'Advanced',
    tools: ['Python', 'TensorFlow Lite', 'Raspberry Pi', 'MQTT', 'WebSockets', 'AWS IoT'],
    modules: [
      { week: 'Week 1-2', title: 'Edge Computing Fundamentals & Protocols', topics: 'MQTT, CoAP, edge gateways, sensor telemetry processing.' },
      { week: 'Week 3-4', title: 'On-Device Lightweight Neural Models', topics: 'Quantization, ONNX runtime, computer vision inference at the edge.' },
      { week: 'Week 5-6', title: 'Event-Driven Realtime Architectures', topics: 'Kafka, WebSockets, time-series data streaming.' },
      { week: 'Week 7-8', title: 'Capstone: Smart Campus Environmental Monitor', topics: 'Hardware assembly, cloud ingestion, real-time alert engine.' }
    ],
    careers: ['IoT Solutions Developer', 'Embedded AI Engineer', 'Edge Systems Architect'],
    activeByDefault: false
  }
];

export const PROJECTS = [
  {
    id: '01',
    number: '01',
    title: 'AI Lead Automation System',
    category: 'AI & Automation',
    tagline: 'Automates lead capture, follow-ups and CRM updates using AI.',
    description: 'An autonomous multi-stage workflow that captures inbound student enquiries, evaluates intent using OpenAI GPT-4o, enriches college records via APIs, and synchronizes real-time status with Google Sheets and HubSpot CRM.',
    tech: ['n8n', 'OpenAI', 'Google Sheets', 'PostgreSQL', 'Webhooks'],
    author: 'Aryan Sharma & Team (CBIT)',
    impact: 'Processes 450+ inquiries daily with 98.4% classification accuracy.',
    demoUrl: 'https://demo.neominds.dev/lead-automation',
    repoUrl: 'https://github.com/neominds/ai-lead-automation',
    featured: true,
    workflowSteps: [
      { step: '1. Webhook Ingestion', detail: 'Captures form payloads & Discord campus triggers' },
      { step: '2. LLM Intent Extraction', detail: 'Categorizes student year, track interest, qualification' },
      { step: '3. CRM & Sheets Sync', detail: 'Appends verified row and sends personalized email' }
    ]
  },
  {
    id: '02',
    number: '02',
    title: 'Autonomous Campus Placement Bot',
    category: 'AI & Automation',
    tagline: 'Instant resume matching and interview preparation agent.',
    description: 'An AI-powered conversational agent that parses student resumes, matches them with active hiring partner requirements, and generates personalized technical mock questions.',
    tech: ['Next.js', 'LangChain', 'FastAPI', 'Pinecone', 'Tailwind'],
    author: 'Priya Kulkarni (Anwar Ul Uloom)',
    impact: 'Helped 320+ students identify resume gaps prior to campus interviews.',
    demoUrl: 'https://demo.neominds.dev/placement-bot',
    repoUrl: 'https://github.com/neominds/campus-placement-bot',
    featured: false,
    workflowSteps: [
      { step: '1. PDF Resume Parse', detail: 'Extracts skills, certifications, and project experience' },
      { step: '2. Vector Semantic Search', detail: 'Compares against 150+ verified JD profiles' },
      { step: '3. Gap Report & Qs', detail: 'Provides tailored technical interview challenge' }
    ]
  },
  {
    id: '03',
    number: '03',
    title: 'Multi-Tenant College Event Hub',
    category: 'Web & Software',
    tagline: 'Centralized ticketing and RSVP portal for collegiate tech fests.',
    description: 'High-throughput fullstack ticketing platform capable of handling flash registrations, QR code entry validation, and real-time attendee analytics.',
    tech: ['React', 'TypeScript', 'Node.js', 'Redis', 'Supabase'],
    author: 'Vamshi & Sneha (Osmania Univ)',
    impact: 'Served 12,000+ tickets across 4 inter-college technical symposiums.',
    demoUrl: 'https://demo.neominds.dev/event-hub',
    repoUrl: 'https://github.com/neominds/college-event-hub',
    featured: false,
    workflowSteps: [
      { step: '1. Registration Queue', detail: 'Redis token-bucket rate limits traffic surges' },
      { step: '2. Dynamic QR Pass', detail: 'Encrypted verification token sent to WhatsApp' },
      { step: '3. Scanner App', detail: 'PWA scanner checks in 40 attendees per minute' }
    ]
  },
  {
    id: '04',
    number: '04',
    title: 'Performance Marketing Analytics Suite',
    category: 'Digital Marketing',
    tagline: 'Automated ROAS audit and creative fatigue tracker.',
    description: 'Custom reporting dashboard connecting Meta Marketing API and GA4 to visualize blended CAC, click attribution, and automated budget reallocation triggers.',
    tech: ['Python', 'Google Cloud', 'BigQuery', 'Looker Studio', 'Streamlit'],
    author: 'Rahul Verma (Loyola Academy)',
    impact: 'Cut campaign waste by 24% for two university tech-incubator startups.',
    demoUrl: 'https://demo.neominds.dev/growth-audit',
    repoUrl: 'https://github.com/neominds/growth-audit-suite',
    featured: false,
    workflowSteps: [
      { step: '1. Ad Spend Ingestion', detail: 'Daily cron pulls multi-channel ad performance' },
      { step: '2. Attribution Engine', detail: 'Matches conversion timestamps with landing sessions' },
      { step: '3. Real-time Dashboard', detail: 'Surfaces actionable creative refresh recommendations' }
    ]
  }
];

export const SKILL_ASSESSMENT_DATA = {
  defaultScore: 68,
  breakdown: [
    { skill: 'AI Fundamentals', score: 82, status: 'Strong' },
    { skill: 'Prompt Engineering', score: 61, status: 'Proficient' },
    { skill: 'APIs & Webhooks', score: 44, status: 'Need improvement' },
    { skill: 'Automation & Logic', score: 38, status: 'Need improvement' },
    { skill: 'Problem Solving', score: 71, status: 'Proficient' }
  ],
  topGaps: [
    { title: 'APIs & Integration', note: 'Need improvement', action: 'Recommended: Module 3 in AI Automation' },
    { title: 'Automation Workflows', note: 'Need improvement', action: 'Recommended: n8n Workflow Architecture' },
    { title: 'System Design Basics', note: 'Need improvement', action: 'Recommended: Web & Software Sprint' }
  ],
  quizQuestions: [
    {
      id: 1,
      category: 'AI Fundamentals',
      question: 'When configuring a System Prompt for an autonomous customer-support LLM, which principle best prevents prompt injections?',
      options: [
        'Place the user input directly at the beginning without boundary markers',
        'Use XML/Markdown delimiters to segregate instructions from untrusted user inputs',
        'Increase the temperature to 1.2 to allow creative recovery',
        'Rely entirely on client-side regex checks'
      ],
      correctIndex: 1,
      explanation: 'Clear delimiter encapsulation (like <user_input>) ensures the model clearly separates system directives from external user inputs.'
    },
    {
      id: 2,
      category: 'APIs & Webhooks',
      question: 'What is the primary difference between a REST API polling request and a Webhook trigger?',
      options: [
        'Webhooks require continuous client polling every 5 seconds',
        'Webhooks send real-time HTTP POST notifications when an event occurs at the source',
        'REST APIs can only transmit plaintext, while webhooks only transmit binary data',
        'Webhooks cannot carry authentication tokens in headers'
      ],
      correctIndex: 1,
      explanation: 'Webhooks are reverse APIs; instead of polling, the event source proactively pushes a POST payload as soon as the event happens.'
    },
    {
      id: 3,
      category: 'Automation & Logic',
      question: 'In an n8n or Make automation workflow handling multi-item orders, what node pattern prevents duplicate notifications?',
      options: [
        'A single broadcast webhook with no deduplication key',
        'Item aggregation into a single batch followed by an idempotent check or state flag',
        'Infinite while loop with sleep intervals',
        'Running 10 parallel HTTP requests without awaiting promises'
      ],
      correctIndex: 1,
      explanation: 'Batching and idempotency keys ensure multi-item orders trigger exactly one consolidated notification.'
    },
    {
      id: 4,
      category: 'Problem Solving',
      question: 'Your web application experiences high latency during campus festival ticket launches. What is the most effective immediate architectural intervention?',
      options: [
        'Move all relational database queries to synchronous client-side fetch calls',
        'Implement an in-memory Redis cache for hot event data and a rate-limited queue',
        'Disable HTTPS encryption to reduce TCP overhead',
        'Increase DOM elements on the frontend'
      ],
      correctIndex: 1,
      explanation: 'Caching hot read data in Redis alongside queue-based throttling absorbs flash surges without overloading database connections.'
    },
    {
      id: 5,
      category: 'Prompt Engineering',
      question: 'Which technique ensures an LLM outputs structured, valid JSON matching your schema consistently?',
      options: [
        'Asking politely in natural language at the end of the prompt',
        'Enforcing Structured Outputs with a JSON Schema / Pydantic definition',
        'Setting max_tokens to 20',
        'Running the prompt 5 times and choosing the longest response'
      ],
      correctIndex: 1,
      explanation: 'Constrained JSON schema decoding guarantees grammar-level compliance with your required data structure.'
    }
  ]
};

export const INTERNSHIPS = [
  {
    id: 'ai-intern',
    title: 'AI Automation Intern',
    location: 'Remote / Hyderabad',
    duration: '8 Weeks',
    stipend: '₹15,000 - ₹25,000 / month',
    type: 'Full-time / Part-time',
    company: 'Neo Minds Partner Labs',
    skills: ['AI', 'n8n', 'APIs', 'Automation'],
    description: 'Work directly with high-growth tech startups building production workflow automations, customer interaction bots, and internal intelligence pipelines.',
    responsibilities: [
      'Design and deploy n8n automation workflows connecting Slack, CRMs, and LLM APIs.',
      'Test and tune custom prompt models with structured schema validation.',
      'Build monitoring webhooks and error-notification escalation channels.'
    ],
    eligibility: 'Pre-final and Final year college students with verified 65%+ score on Neo Minds Assessment or completed AI & Automation Program.',
    openings: 8
  },
  {
    id: 'fullstack-intern',
    title: 'Full Stack Web Intern',
    location: 'Hybrid / Hyderabad',
    duration: '12 Weeks',
    stipend: '₹18,000 - ₹30,000 / month',
    type: 'Full-time',
    company: 'CloudScale Systems',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    description: 'Join an agile product engineering squad building scalable web interfaces, API integrations, and database schemas for enterprise SaaS clients.',
    responsibilities: [
      'Develop modular React components adhering to strict design token specifications.',
      'Implement REST and GraphQL endpoints in Node.js / Next.js server actions.',
      'Optimize bundle size and Core Web Vitals for critical web funnels.'
    ],
    eligibility: 'Students with solid modern JavaScript/TypeScript foundation and completed Capstone Project.',
    openings: 6
  },
  {
    id: 'marketing-intern',
    title: 'Growth & Performance Intern',
    location: 'Remote',
    duration: '8 Weeks',
    stipend: '₹12,000 - ₹20,000 / month',
    type: 'Part-time',
    company: 'ScaleX Media',
    skills: ['Meta Ads', 'GA4', 'A/B Testing', 'Copywriting', 'Figma'],
    description: 'Run conversion rate experiments, manage digital ad funnels, and analyze campus acquisition metrics across student communities.',
    responsibilities: [
      'Set up targeted Meta and Google Search campaigns with strict CAC guardrails.',
      'Analyze UTM parameters and build GA4 conversion exploration funnels.',
      'Produce high-converting ad creative iterations using modern design tools.'
    ],
    eligibility: 'College students enthusiastic about growth marketing, analytics, and consumer psychology.',
    openings: 4
  },
  {
    id: 'cloud-intern',
    title: 'Cloud & DevOps Associate Intern',
    location: 'Hyderabad',
    duration: '10 Weeks',
    stipend: '₹20,000 - ₹28,000 / month',
    type: 'Full-time',
    company: 'InfraMatrix Tech',
    skills: ['Docker', 'AWS', 'Linux', 'CI/CD', 'GitHub Actions'],
    description: 'Assist in automating container builds, managing cloud environments, and monitoring deployment health for cloud-native services.',
    responsibilities: [
      'Write Dockerfiles and multi-stage container optimization scripts.',
      'Configure automated testing and deployment workflows in GitHub Actions.',
      'Monitor container CPU/memory usage and configure alerting rules.'
    ],
    eligibility: 'Students with foundational knowledge of Linux command line, networking, and Git workflows.',
    openings: 5
  }
];

export const PIPELINE_STEPS = [
  { step: '01', title: 'Apply', description: 'Submit your profile & verified project portfolio' },
  { step: '02', title: 'Assessment', description: 'Complete practical diagnostic benchmark' },
  { step: '03', title: 'Shortlist', description: 'Direct matching based on verified project proof' },
  { step: '04', title: 'Interview', description: 'Technical conversation with company founders/leads' },
  { step: '05', title: 'Internship', description: 'Begin paid work with ongoing mentorship' }
];

export const SUCCESS_STORIES = [
  {
    id: 'aryan',
    name: 'Aryan Sharma',
    college: 'Chaitanya Bharathi Institute of Technology',
    branch: 'B.Tech CSE (3rd Year)',
    avatar: '/images/student_aryan.jpg',
    targetRole: 'AI Automation Engineer',
    company: 'HyperScale AI',
    stipend: '₹28,000 / mo',
    story: 'Aryan joined Neo Minds with basic theoretical knowledge of Python. After taking the diagnostic assessment, he honed his API integration skills, built 4 real-world automation projects, and secured a paid role at an AI startup.',
    journey: [
      { phase: 'Started', label: 'Beginner', detail: 'Theoretical classroom knowledge, zero portfolio' },
      { phase: 'Learned', label: 'AI Automation', detail: 'Mastered n8n, OpenAI APIs, vector databases' },
      { phase: 'Built', label: '4 Projects', detail: 'AI Lead qualifier, CRM sync, smart bot', isHighlight: true },
      { phase: 'Interned', label: 'AI Intern', detail: '8-week paid sprint with direct founder mentorship' },
      { phase: 'Now', label: 'Building Career', detail: 'Received Pre-Placement Offer (PPO) at ₹8.5 LPA' }
    ]
  },
  {
    id: 'sneha',
    name: 'Sneha Reddy',
    college: 'Osmania University',
    branch: 'B.Tech IT (Final Year)',
    avatar: '/images/student_aryan.jpg', // fallback avatar
    targetRole: 'Full Stack Engineer',
    company: 'FinTech Velocity',
    stipend: '₹32,000 / mo',
    story: 'Frustrated with legacy textbook curricula, Sneha utilized the Neo Minds Web & Software track to build high-performance React applications. Her campus fest ticketing platform was adopted by 4 university departments.',
    journey: [
      { phase: 'Started', label: 'Academic Coder', detail: 'Rote college syllabus, unhosted assignments' },
      { phase: 'Learned', label: 'Web & Software', detail: 'React 19, TypeScript, PostgreSQL, Docker' },
      { phase: 'Built', label: 'Multi-Tenant Hub', detail: 'Processed 12K transactions with zero downtime', isHighlight: true },
      { phase: 'Interned', label: 'Frontend Intern', detail: 'Engineered merchant checkout modules' },
      { phase: 'Now', label: 'Associate SWE', detail: 'Joining full-time engineering core team' }
    ]
  },
  {
    id: 'rahul',
    name: 'Rahul Verma',
    college: 'Loyola Academy College',
    branch: 'B.Sc Computer Data Science',
    avatar: '/images/student_aryan.jpg',
    targetRole: 'Performance Growth Analyst',
    company: 'ScaleX Media',
    stipend: '₹22,000 / mo',
    story: 'Rahul leveraged his quantitative curiosity to master GA4 attribution models and Meta ad architectures, running data-backed marketing experiments that reduced customer acquisition costs.',
    journey: [
      { phase: 'Started', label: 'Curious Student', detail: 'Exploring digital careers without hands-on budget' },
      { phase: 'Learned', label: 'Digital Marketing', detail: 'A/B testing, GA4 events, ad creative testing' },
      { phase: 'Built', label: 'ROAS Audit Tool', detail: 'Automated live dashboard for incubator brands', isHighlight: true },
      { phase: 'Interned', label: 'Growth Intern', detail: 'Managed live ₹2.5 Lakh campaign spend' },
      { phase: 'Now', label: 'Growth Lead', detail: 'Directing university acquisition pipelines' }
    ]
  }
];

export const EVENTS = [
  {
    id: 'event-1',
    title: 'Hyderabad AI Builders Hackathon 2026',
    date: 'OCT 18 - 19, 2026',
    time: '9:00 AM - 6:00 PM IST',
    location: 'T-Hub / Hybrid',
    category: 'AI',
    speaker: 'Aditya Rao (Principal AI Architect, Ex-Google)',
    seatsRemaining: 42,
    description: '36-hour physical hackathon to build production autonomous agents using n8n and modern LLMs. Cash prizes and direct internship interviews.'
  },
  {
    id: 'event-2',
    title: 'From College Project to Paid Internship: Masterclass',
    date: 'OCT 24, 2026',
    time: '6:30 PM - 8:00 PM IST',
    location: 'Online Live Stream',
    category: 'Industry',
    speaker: 'Neha Gupta (Head of Talent, ScaleX)',
    seatsRemaining: 180,
    description: 'Demystifying what engineering hiring managers look for in student portfolios, GitHub commits, and live deployments.'
  },
  {
    id: 'event-3',
    title: 'Modern Fullstack Architecture with Next.js & Supabase',
    date: 'NOV 02, 2026',
    time: '5:00 PM - 7:30 PM IST',
    location: 'Anwar Ul Uloom Tech Auditorium',
    category: 'Web',
    speaker: 'Kiran Kumar (Staff Engineer)',
    seatsRemaining: 65,
    description: 'Interactive live coding session on server actions, row level security, and real-time database subscription patterns.'
  },
  {
    id: 'event-4',
    title: 'Neo Minds Campus Ambassador Summit 2026',
    date: 'NOV 12, 2026',
    time: '10:00 AM - 4:00 PM IST',
    location: 'Osmania University Arts College Quad',
    category: 'Campus',
    speaker: 'Campus Leadership Council',
    seatsRemaining: 28,
    description: 'Exclusive leadership gathering for appointed ambassadors across 50+ colleges to share playbook strategies and rewards.'
  }
];

export const CAMPUS_PROGRAM_STEPS = [
  { step: '01', title: 'College Enquiry', desc: 'College leadership or department chair initiates partnership inquiry.' },
  { step: '02', title: 'Discussion', desc: 'Discovery session to assess student demographics, labs, and career goals.' },
  { step: '03', title: 'MoU Partnership', desc: 'Formal academic collaboration agreement signed with zero fee barrier.' },
  { step: '04', title: 'Neo Minds Club Setup', desc: 'Official student technical chapter chartered on campus.' },
  { step: '05', title: 'Campus Ambassador', desc: 'Vetted student leaders appointed to direct club sprints and hackathons.' },
  { step: '06', title: 'Student Onboarding', desc: 'Diagnostic skill evaluation rolled out across enrolled departments.' },
  { step: '07', title: 'Skill Programs', desc: 'Cohort-based live technical and project tracks delivered weekly.' },
  { step: '08', title: 'Live Projects', desc: 'Students build production applications solving institutional & industry needs.' },
  { step: '09', title: 'Internship Pathway', desc: 'Direct interview placement pipeline with 20+ verified tech companies.' }
];

export const AMBASSADOR_PERKS = [
  { title: 'Free Program Access', desc: '100% complimentary enrollment in all Neo Minds Masterclasses and Pro tracks.' },
  { title: 'Direct Founder Mentorship', desc: 'Monthly closed-door strategy and career reviews with industry veterans.' },
  { title: 'Official Letter of Recommendation', desc: 'Recognized leadership credential validating your campus impact.' },
  { title: 'Performance Stipend & Swag', desc: 'Performance-based bonuses, tech gear, and all-expenses-paid summit passes.' },
  { title: 'Priority Internship Placement', desc: 'Fast-tracked interview scheduling with verified hiring partner companies.' }
];

export const INDUSTRY_BENEFITS = [
  {
    title: 'Pre-Vetted Proof, Not Plain Resumes',
    desc: 'Review live hosted applications, verified GitHub commits, and quantified skill benchmarks before scheduling interviews.'
  },
  {
    title: 'Zero Traditional Agency Headaches',
    desc: 'Skip weeks of sifting through unqualified generic applicants. Neo Minds talent has demonstrated hands-on tool fluency.'
  },
  {
    title: 'Commission Custom Capstone Sprints',
    desc: 'Propose real internal problems for high-performing student cohorts to solve as guided semester projects.'
  },
  {
    title: 'Campus Brand Presence',
    desc: 'Host guest technical sessions, sponsor hackathons, and become the top-of-mind employer across 50+ collegiate campuses.'
  }
];
