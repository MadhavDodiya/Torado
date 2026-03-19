const pageContent = {
  home: {
    pageTitle: "Home",
    heroTagPrefix: "Get On The",
    heroTagHighlight: "Right",
    heroTagSuffix: "Way",
    heroTitleLine1: "Financial Assistance",
    heroTitleLine2: "With True Purpose",
    heroDescription:
      "Miena sipu del inora aid consectetur adipiscing elit. Ut elit tellus luctus nec ullamc orperrm nutka pulvinar dapibus leo della pierrano set amuse.",
    heroButtonText: "HOW CAN WE HELP",
  },
  services: {
    pageTitle: "Our Services",
  },
  "service-detail": {
    pageTitle: "Service Detail",
  },
  aboutus: {
    pageTitle: "About Us",
  },
  pricingplan: {
    pageTitle: "Pricing Plan",
    heroWatermark: "Pricing",
    sectionTag: "How We Charge",
    sectionTitle: "Pricing Plans",
    sectionDescription:
      "Etiam euismod libero id neque facilisis elementum in eget ligula. Ut consequat varius blandit. Duis quis tortor quis lacus facilisis.",
    billingMonthlyLabel: "Monthly",
    billingYearlyLabel: "Yearly",
    billingSaveBadge: "Save 2 Months",
    includesLabel: "This Plan Includes Global Relations",
    enterpriseText: "Need custom enterprise pricing?",
    enterpriseCtaText: "Talk to our team",
    plans: [
      {
        id: "small",
        name: "Small Plan",
        monthlyPrice: 149,
        yearlyPrice: 1490,
        description:
          "Best for startup teams who need structured finance basics.",
        cta: "Start Small Plan",
        featured: false,
        features: [
          { text: "All Financial Tasks", active: true },
          { text: "Economic Market Survey", active: true },
          { text: "Sales Operations", active: false },
          { text: "Auto Intelligence", active: false },
          { text: "24/7 Support", active: false },
          { text: "Technology Services", active: false },
        ],
      },
      {
        id: "smart",
        name: "Smart Plan",
        monthlyPrice: 249,
        yearlyPrice: 2490,
        description:
          "For growing businesses that need full planning and execution.",
        cta: "Start Smart Plan",
        featured: true,
        features: [
          { text: "All Financial Tasks", active: true },
          { text: "Economic Market Survey", active: true },
          { text: "Sales Operations", active: true },
          { text: "Auto Intelligence", active: true },
          { text: "24/7 Support", active: false },
          { text: "Technology Services", active: false },
        ],
      },
      {
        id: "super",
        name: "Super Plan",
        monthlyPrice: 349,
        yearlyPrice: 3490,
        description:
          "Advanced package for high-scale operations and dedicated support.",
        cta: "Start Super Plan",
        featured: false,
        features: [
          { text: "All Financial Tasks", active: true },
          { text: "Economic Market Survey", active: true },
          { text: "Sales Operations", active: true },
          { text: "Auto Intelligence", active: true },
          { text: "24/7 Support", active: true },
          { text: "Technology Services", active: true },
        ],
      },
    ],
  },
  faqs: {
    pageTitle: "Faq's",
  },
  testimonials: {
    pageTitle: "Testimonials",
  },
  "privacy-policy": {
    pageTitle: "Privacy Policy",
  },
  "term-condition": {
    pageTitle: "Term & Condition",
  },
  error: {
    pageTitle: "Error Page",
    statusCode: "404",
    heading: "Page Not Found",
    description:
      "The page you are looking for does not exist or may have been moved. Please return to the homepage or go back to the previous page.",
    primaryButtonText: "Go Home",
    secondaryButtonText: "Go Back",
  },
  portfolio: {
    pageTitle: "Portfolio",
  },
  teams: {
    pageTitle: "Team",
  },
  "team-detail": {
    pageTitle: "Team Detail",
  },
  blog: {
    pageTitle: "Blog",
  },
  "blog-details": {
    pageTitle: "Blog Details",
  },
  contact: {
    pageTitle: "Contact",
  },
  login: {
    pageTitle: "Login",
  },
  register: {
    pageTitle: "Register",
  },
  "admin-login": {
    pageTitle: "Admin Login",
    subtitle: "Sign in to access admin panel",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButtonText: "LOGIN",
    registerPrompt: "Admin account nahi hai?",
    registerLinkText: "Admin Register",
  },
  "admin-register": {
    pageTitle: "Admin Register",
    subtitle: "Create admin account for dashboard access",
    nameLabel: "Full Name",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButtonText: "REGISTER",
    loginPrompt: "Already registered?",
    loginLinkText: "Admin Login",
  },
};

export default pageContent;
