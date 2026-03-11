import {
  FaChartLine,
  FaCogs,
  FaHandshake,
  FaHeadset,
  FaLightbulb,
  FaPuzzlePiece,
} from 'react-icons/fa'
import service1 from './assets/Image/service1.jpg'
import service2 from './assets/Image/service2.jpg'
import service3 from './assets/Image/service3.jpg'
import service4 from './assets/Image/service4.jpg'
import service5 from './assets/Image/service5.jpg'
import team1 from './assets/Image/team1.jpg'
import team2 from './assets/Image/team2.jpg'
import team3 from './assets/Image/team3.jpg'
import team4 from './assets/Image/team4.jpg'
import heroBg from './assets/Image/hero-color-bg.png'

export const navItems = [
  { id: 'home', label: 'Home' },
  {
    id: 'services',
    label: 'Services',
    children: [
      { id: 'services', label: 'All Services' },
      { id: 'financial-analysis', label: 'Financial Analysis' },
      { id: 'taxation-planning', label: 'Taxation Planning' },
      { id: 'investment-trading', label: 'Investment Trading' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    children: [
      { id: 'about', label: 'About Us' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact Us' },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    children: [{ id: 'team', label: 'Our Team' }],
  },
  {
    id: 'blog',
    label: 'Blog',
    children: [{ id: 'blog', label: 'Latest News' }],
  },
  { id: 'contact', label: 'Contact' },
]

export const getPagePath = (pageId) => (pageId === 'home' ? '/' : `/${pageId}`)

export const getPageIdFromPath = (pathname) => {
  if (!pathname || pathname === '/') {
    return 'home'
  }

  return pathname.replace(/^\/+|\/+$/g, '') || 'home'
}

export const footerLinkMap = {
  'About Us': 'about',
  'Our Team': 'team',
  'Our Projects': 'projects',
  'Latest News': 'blog',
  'Contact Us': 'contact',
  'Financial Advice': 'financial-analysis',
  'Planning Strategies': 'services',
  'Taxation Planning': 'taxation-planning',
  'Investment Trading': 'investment-trading',
  'Wealth Marketing': 'services',
}

export const pageContent = {
  about: {
    badge: 'About Torado',
    title: 'Plan Business Growth With A Clear Financial Strategy',
    description:
      'Torado helps founders and established teams move from reactive finance work to structured planning, reporting, and execution.',
    heroImage: service4,
    intro:
      'We combine financial planning, tax structure, operational reviews, and execution support so teams can scale with confidence.',
    highlights: [
      {
        title: 'Strategy Workshops',
        text: 'Translate business goals into realistic operating and capital plans.',
        icon: FaLightbulb,
      },
      {
        title: 'Execution Support',
        text: 'Keep recommendations practical through implementation-focused follow-up.',
        icon: FaHandshake,
      },
      {
        title: 'Performance Review',
        text: 'Track the metrics that actually matter to decisions and growth.',
        icon: FaChartLine,
      },
    ],
  },
  services: {
    badge: 'Our Services',
    title: 'Flexible Advisory Services For Finance, Tax, And Growth',
    description:
      'Choose a focused engagement or combine services into a broader operating plan.',
    heroImage: service2,
    intro:
      'Our service stack is designed to support growing businesses that need clarity, speed, and reliable financial structure.',
    highlights: [
      {
        title: 'Financial Analysis',
        text: 'Review cash flow, margins, planning assumptions, and reporting quality.',
        icon: FaChartLine,
      },
      {
        title: 'Taxation Planning',
        text: 'Reduce avoidable tax friction with better timing, structure, and process.',
        icon: FaCogs,
      },
      {
        title: 'Investment Trading',
        text: 'Support for portfolio visibility, capital use, and risk-aware decisions.',
        icon: FaHandshake,
      },
    ],
  },
  'financial-analysis': {
    badge: 'Service Detail',
    title: 'Financial Analysis That Improves Visibility And Decisions',
    description:
      'We turn raw numbers into an operating view the business can act on quickly.',
    heroImage: service1,
    intro:
      'This service focuses on forecasting, variance reviews, cash discipline, reporting quality, and board or investor-ready summaries.',
    highlights: [
      {
        title: 'Forecasting',
        text: 'Build monthly and quarterly projections with defensible assumptions.',
        icon: FaChartLine,
      },
      {
        title: 'Reporting',
        text: 'Create cleaner management reporting for faster operational reviews.',
        icon: FaHeadset,
      },
      {
        title: 'Decision Support',
        text: 'Model scenarios before committing budget or capital.',
        icon: FaLightbulb,
      },
    ],
  },
  'taxation-planning': {
    badge: 'Service Detail',
    title: 'Taxation Planning Built Around Business Operations',
    description:
      'Tax planning works better when it is integrated with timing, process, and growth plans.',
    heroImage: service2,
    intro:
      'We review current structure, recurring obligations, and expansion plans to reduce friction and create a more predictable tax workflow.',
    highlights: [
      {
        title: 'Compliance Review',
        text: 'Identify weak points before they create delays or penalties.',
        icon: FaCogs,
      },
      {
        title: 'Structure Planning',
        text: 'Align tax decisions with the operating model and entity setup.',
        icon: FaPuzzlePiece,
      },
      {
        title: 'Calendar Discipline',
        text: 'Keep the team prepared for deadlines, filings, and supporting documents.',
        icon: FaHandshake,
      },
    ],
  },
  'investment-trading': {
    badge: 'Service Detail',
    title: 'Investment Trading Support With Risk And Performance Focus',
    description:
      'We help teams evaluate capital deployment and portfolio performance with more structure.',
    heroImage: service3,
    intro:
      'This offering is suited to organizations that need a clearer framework for managing investment decisions, exposure, and ongoing review.',
    highlights: [
      {
        title: 'Portfolio Review',
        text: 'Assess allocation, exposure, concentration, and reporting cadence.',
        icon: FaChartLine,
      },
      {
        title: 'Risk Controls',
        text: 'Define guardrails before strategy drift turns into avoidable loss.',
        icon: FaHeadset,
      },
      {
        title: 'Execution Rhythm',
        text: 'Standardize how trades and investment decisions are reviewed.',
        icon: FaPuzzlePiece,
      },
    ],
  },
  projects: {
    badge: 'Portfolio',
    title: 'Selected Projects And Business Improvement Engagements',
    description:
      'A sample of the planning, finance, and operating work Torado supports.',
    heroImage: service5,
    intro:
      'Projects often start with a narrow issue and expand into broader operating support as the team gains traction.',
    highlights: [
      {
        title: 'Cash Flow Reset',
        text: 'Rebuilt reporting and weekly review rhythm for a multi-location business.',
        icon: FaChartLine,
      },
      {
        title: 'Tax Process Cleanup',
        text: 'Standardized filing workflow and reduced late-cycle corrections.',
        icon: FaCogs,
      },
      {
        title: 'Growth Planning Sprint',
        text: 'Turned expansion targets into a staged, measurable operating plan.',
        icon: FaHandshake,
      },
    ],
  },
  team: {
    badge: 'Our Team',
    title: 'Meet The Advisors Behind Torado',
    description:
      'A multidisciplinary team covering planning, reporting, tax, and execution.',
    heroImage: team1,
    intro:
      'The team combines finance operations, strategic planning, and consulting experience to support both daily decisions and long-term growth.',
    highlights: [
      {
        title: 'Senior Advisors',
        text: 'Hands-on guidance from people who understand execution, not just theory.',
        icon: FaHandshake,
      },
      {
        title: 'Cross-Functional Support',
        text: 'Finance, tax, and operations input aligned into one plan.',
        icon: FaPuzzlePiece,
      },
      {
        title: 'Client Communication',
        text: 'Clear updates, concrete next steps, and accountable follow-through.',
        icon: FaHeadset,
      },
    ],
    teamMembers: [
      { name: 'William Benjamin', role: 'Financial Advisor', img: team1 },
      { name: 'Sophia Isabella', role: 'Financial Head', img: team2 },
      { name: 'Michael Pluim', role: 'Head Office Manager', img: team3 },
      { name: 'Charlotte Allen', role: 'Account Manager', img: team4 },
    ],
  },
  blog: {
    badge: 'Latest News',
    title: 'Insights On Finance, Tax, Operations, And Growth',
    description:
      'Short practical updates designed for teams that need usable advice, not filler.',
    heroImage: service4,
    intro:
      'Our blog section collects recurring questions from clients and turns them into concise guidance for planning and execution.',
    highlights: [
      {
        title: 'Cash Discipline',
        text: 'How to improve visibility before cash problems escalate.',
        icon: FaChartLine,
      },
      {
        title: 'Tax Planning',
        text: 'What to prepare early instead of fixing at deadline time.',
        icon: FaCogs,
      },
      {
        title: 'Growth Execution',
        text: 'Why operating cadence matters more than broad strategy decks.',
        icon: FaLightbulb,
      },
    ],
  },
  contact: {
    badge: 'Contact Us',
    title: 'Talk With Torado About Your Business Priorities',
    description:
      'Use the contact page to start a planning conversation or request an engagement review.',
    heroImage: heroBg,
    intro:
      'We usually start with a short conversation focused on your current issue, reporting quality, and what success should look like over the next quarter.',
    highlights: [
      {
        title: 'Fast Response',
        text: 'Share your issue and get routed to the right advisory stream quickly.',
        icon: FaHeadset,
      },
      {
        title: 'Clear Scope',
        text: 'We define what is included, what changes, and how progress will be measured.',
        icon: FaPuzzlePiece,
      },
      {
        title: 'Actionable Next Steps',
        text: 'Leave the first conversation with concrete direction, not vague promises.',
        icon: FaHandshake,
      },
    ],
  },
}
