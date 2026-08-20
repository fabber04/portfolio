/* ============================================================
   PERSONALIZE THIS FILE
   Name, links, projects, and rates all live here.
   ============================================================ */

window.SITE = {
  firstName: "Fabilous",
  lastName: "Lashidi",
  role: "Software Developer",
  tagline: "I build websites and products that have to work in the real world — from Zimbabwe.",
  bio: "I'm Fabilous Lashidi — software developer, NUST Computer Science student, and cofounder of CT Flex. I design and build reliable websites and web apps for businesses, communities, and products that solve real problems at home in Zimbabwe.",
  location: "Based in Harare, Zimbabwe",
  email: "fabulousdallen87@gmail.com",
  availability: "Open for freelance projects",
  // After deploying js/mail-backend.gs, paste the Web app URL here.
  formEndpoint: "https://script.google.com/macros/s/AKfycbwxDTCgbVb6kXrPZKXgUtPPX9y74EBhc4aPTlwaBRg4nOcPhaTNNt7dxqruoZygCfm-/exec",

  about: {
    kicker: "About me",
    headline: "I’m Fabilous — a person who builds, not just a developer with a rate card.",
    intro: "I’m a Computer Science student at NUST in Zimbabwe, a freelance software developer, and cofounder of CT Flex. I care about people, ideas, and making things that actually help.",
    story: [
      "I came to software because I like solving real problems. Not abstract ones — the kind you can point to. A student who doesn’t know what to study next. A worker who doesn’t have a traditional 9-to-5. A community that needs a place to grow.",
      "I’m studying BSc Computer Science at the National University of Science and Technology (NUST), and I work at Skilotech on GenAI-powered recruitment tools. I also earned a ThreatVector Security scholarship — I’m serious about building things that are useful and hard to break.",
      "That’s also why I cofounded CT Flex. Most insurance is built for people with a salary, a payslip, and a predictable month. A huge part of Zimbabwe’s workforce doesn’t live like that — gig work, informal trade, income that rises and falls. CT Flex is a flexible-premium insurance product for that reality. People can pay when they can, stay covered, and get protection that fits irregular work. We build it for licensed insurer partners. We are not the insurer.",
      "CT Flex was recognized at the African Insurance Exchange (AIE) 2026. That moment mattered because it said this problem is worth taking seriously — and that a product from home can stand on a continental stage.",
      "Off the screen I’m curious, calm, and stubborn about quality. I listen first. I think things through. Then I build. Faith, community, and craft matter to me — not as slogans, as how I try to show up for people.",
      "If we work together, you’ll get someone who keeps the process simple, tells you the truth about scope, and treats your project like it has to live in the real world — not just look good in a screenshot."
    ],
    facts: [
      { label: "From", value: "Harare, Zimbabwe" },
      { label: "Studies", value: "BSc Computer Science, NUST" },
      { label: "Work", value: "Skilotech · CT Flex cofounder" },
      { label: "Focus", value: "ThreatVector Security scholar" }
    ],
    values: [
      {
        title: "People first",
        text: "I build for humans with messy lives, not for a demo that only works on my laptop."
      },
      {
        title: "Useful over fancy",
        text: "A clean product that ships and helps someone beats a complicated one that never leaves the draft."
      },
      {
        title: "Stay curious",
        text: "I’m a student on purpose. I keep learning — design, code, and the problem behind the brief."
      },
      {
        title: "Keep it honest",
        text: "Clear timelines, clear rates, and a straight answer if something is out of scope."
      }
    ]
  },

  social: {
    github: "https://github.com/fabber04",
    linkedin: "https://www.linkedin.com/in/fabilous-lashidi-571ab0259",
    dribbble: "https://dribbble.com/",
    whatsapp: "+263777965100"
  },

  skills: ["Software Development", "Web apps", "CT Flex cofounder"],

  services: [
    {
      title: "Websites & frontend",
      text: "Custom sites and interfaces — HTML, CSS, JavaScript, React — that look clean and work on a phone."
    },
    {
      title: "Backend & APIs",
      text: "The systems behind the screen: data, logins, FastAPI, and connections to payments or other tools."
    },
    {
      title: "Product builds",
      text: "Web apps and product concepts like Family of Greatness and CT Flex — not just a brochure page."
    },
    {
      title: "Secure, search-ready delivery",
      text: "Basic hardening and on-page SEO with every build. I don’t sell pentests or ad campaigns as a separate agency."
    }
  ],

  stack: [
    "HTML & CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "FastAPI",
    "REST APIs",
    "Git & GitHub"
  ],

  projects: [
    {
      title: "Family of Greatness",
      type: "Web app",
      url: "https://familyofgreatness.com/",
      image: "assets/work-fog.jpg?v=2",
      problem: "A community needed one place for library, podcasts, events, and care — not a stack of disconnected pages.",
      built: "A live web app with dashboard, content, and community tools for FOG in Zimbabwe and beyond.",
      result: "People can join, browse, and stay in one product instead of chasing links.",
      tags: ["Web app", "Community"]
    },
    {
      title: "CT Flex",
      type: "Cofounder",
      url: "https://fabber04.github.io/ct-flex/",
      image: "assets/work-ctflex.jpg",
      problem: "Insurance assumes a salary. Gig and informal workers in Zimbabwe don’t get paid that way.",
      built: "A flexible-premium product concept for licensed insurer partners — we are not the insurer.",
      result: "Recognized at the African Insurance Exchange (AIE) 2026.",
      tags: ["Fintech", "AIE 2026"]
    },
    {
      title: "NUST Career Guidance",
      type: "Student platform",
      url: "https://fabber04.github.io/Career-guidance/",
      image: "assets/work-career.jpg",
      problem: "Students picking a degree needed honest program detail, reviews, and Q&A in one guide.",
      built: "A live prototype with programs, ratings, verified alumni notes, and contributor insights.",
      result: "A clearer path through NUST options than scattered hearsay.",
      tags: ["Web app", "Education"]
    }
  ],

  currency: "USD",
  currencySymbol: "$",

  packages: [
    {
      id: "starter",
      name: "Starter",
      price: "350",
      period: "one-time",
      maintenance: "100",
      summary: "A site of up to 10 pages that introduces your brand and captures leads.",
      popular: false,
      features: [
        "Up to 10 custom pages",
        "Mobile-responsive layout",
        "Contact form",
        "Basic on-page SEO",
        "2 rounds of revisions",
        "Delivery in about 1 week"
      ]
    },
    {
      id: "business",
      name: "Business",
      price: "800",
      period: "one-time",
      maintenance: "250",
      summary: "A full website of up to 20 pages, built to look professional and convert visitors.",
      popular: true,
      features: [
        "Up to 20 custom pages",
        "Unique visual design",
        "Mobile + desktop polish",
        "Contact, about, and services",
        "SEO setup + analytics",
        "3 rounds of revisions",
        "Delivery in 2–3 weeks"
      ]
    },
    {
      id: "custom",
      name: "Custom",
      price: "3,500",
      period: "one-time",
      maintenance: "300",
      summary: "E-commerce, bookings, or a fully custom experience with extra functionality.",
      popular: false,
      features: [
        "Custom design system",
        "Shop, booking, or app features",
        "Integrations (payments, CRM, etc.)",
        "Performance + accessibility pass",
        "Content help on request",
        "Launch support",
        "Timeline scoped per project"
      ]
    }
  ],

  addons: [
    { name: "Extra page", price: "180" },
    { name: "Blog / news section", price: "450" },
    { name: "Booking or calendar", price: "550" }
  ],

  hourlyRate: "20",
  hourlyNote: "Small updates, landing tweaks, and ongoing support.",
  ratesNote: "Prices are in USD, as starting points for small businesses and startups. Local or overseas work is scoped before we begin."
};
