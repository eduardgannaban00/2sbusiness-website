// Central source of truth for the public demo portfolio.
// Technical URLs remain active until branded subdomains are verified and DNS
// migration is complete. Client Onboarding intentionally has no URL yet.
const brandedBase = "https://2sbusinesssupport.com";

const demos = [
  {
    id: "dental",
    name: "Dental AI Receptionist & Booking",
    shortName: "Dental AI Receptionist",
    description: "An illustrative receptionist workflow for common practice questions and booking-related conversations.",
    category: "booking-customer-experience",
    industries: ["Dental"],
    technicalUrl: "https://2s-dental-ai-demo.vercel.app/",
    brandedUrl: `${brandedBase}/dental/`,
    status: "verified",
    ctaLabel: "Explore the Dental Demo",
    order: 10,
  },
  {
    id: "hvac",
    name: "HVAC AI Booking & Missed-Call Recovery",
    shortName: "HVAC Booking & Recovery",
    description: "An example of after-hours booking support and structured missed-call recovery for HVAC businesses.",
    category: "booking-customer-experience",
    industries: ["HVAC"],
    technicalUrl: "https://2s-hvac-ai-demo.vercel.app/",
    brandedUrl: `${brandedBase}/hvac/`,
    status: "verified",
    ctaLabel: "Explore the HVAC Demo",
    order: 20,
  },
  {
    id: "roofing",
    name: "Roofing Lead Follow-Up",
    shortName: "Roofing Follow-Up",
    description: "A lead response and follow-up example shaped around the roofing sales process.",
    category: "lead-sales",
    industries: ["Roofing"],
    technicalUrl: "https://2s-roofing-ai-demo.vercel.app/",
    brandedUrl: `${brandedBase}/roofing/`,
    status: "verified",
    ctaLabel: "Explore the Roofing Demo",
    order: 30,
  },
  {
    id: "crm",
    name: "General Lead Follow-Up + CRM",
    shortName: "Lead Follow-Up + CRM",
    description: "A general-purpose example of capturing, tracking, and advancing leads through a CRM workflow.",
    category: "lead-sales",
    industries: ["Service businesses"],
    technicalUrl: "https://2s-lead-crm-demo.vercel.app/",
    brandedUrl: `${brandedBase}/crm/`,
    status: "verified",
    ctaLabel: "Explore the CRM Demo",
    order: 40,
  },
  {
    id: "website",
    name: "Website + Lead Conversion",
    shortName: "Website + Conversion",
    description: "An example of connecting a customer-facing website experience to lead capture and next steps.",
    category: "lead-sales",
    industries: ["Service businesses"],
    technicalUrl: "https://website-lead-conversion-demo.vercel.app/",
    brandedUrl: `${brandedBase}/website/`,
    status: "verified",
    ctaLabel: "Explore the Website Demo",
    order: 50,
  },
  {
    id: "support",
    name: "Customer Support Automation",
    shortName: "Customer Support",
    description: "An example of organizing common support requests, routing, and human escalation.",
    category: "booking-customer-experience",
    industries: ["Service businesses"],
    technicalUrl: "https://customer-support-automation-demo.vercel.app/",
    brandedUrl: `${brandedBase}/support/`,
    status: "verified",
    ctaLabel: "Explore Support Automation",
    order: 60,
  },
  {
    id: "appointments",
    name: "Appointment & No-Show Automation",
    shortName: "Appointments & No-Shows",
    description: "An example of appointment reminders, confirmations, and no-show recovery workflows.",
    category: "booking-customer-experience",
    industries: ["Dental", "HVAC", "Service businesses"],
    technicalUrl: "https://appointment-no-show-demo.vercel.app/",
    brandedUrl: `${brandedBase}/appointments/`,
    status: "verified",
    ctaLabel: "Explore Appointment Automation",
    order: 70,
  },
  {
    id: "quotes",
    name: "Quote / Estimate Follow-Up",
    shortName: "Quote Follow-Up",
    description: "An example of keeping estimates visible and following up with prospects at the right time.",
    category: "lead-sales",
    industries: ["Roofing", "HVAC", "Service businesses"],
    technicalUrl: "https://quote-estimate-follow-up-demo.vercel.app/",
    brandedUrl: `${brandedBase}/quotes/`,
    status: "verified",
    ctaLabel: "Explore Quote Follow-Up",
    order: 80,
  },
  {
    id: "reviews",
    name: "Review / Reputation Automation",
    shortName: "Reviews & Reputation",
    description: "An example of requesting feedback and organizing reputation workflows with appropriate human oversight.",
    category: "retention-operations",
    industries: ["Service businesses"],
    technicalUrl: "https://review-reputation-automation-demo.vercel.app/",
    brandedUrl: `${brandedBase}/reviews/`,
    status: "verified",
    ctaLabel: "Explore Reputation Automation",
    order: 90,
  },
  {
    id: "businessos",
    name: "Business OS / Operations Dashboard",
    shortName: "Business OS",
    description: "The flagship example of a connected operating view where modules share customer, activity, and follow-up context.",
    category: "flagship",
    industries: ["Service businesses"],
    technicalUrl: "https://2-s-business-os-demo.vercel.app/",
    brandedUrl: `${brandedBase}/businessos/`,
    status: "verified",
    ctaLabel: "Explore the Business OS",
    order: 1,
    flagship: true,
  },
  {
    id: "hr",
    name: "HR Screening / Interview Assistant",
    shortName: "HR Intelligence",
    description: "An illustrative screening, interview, and recruiter review workflow with structured evaluation steps.",
    category: "retention-operations",
    industries: ["Service businesses"],
    technicalUrl: "https://2s-hr-ai-interview.vercel.app/",
    brandedUrl: `${brandedBase}/hr/`,
    status: "verified",
    ctaLabel: "Explore HR Intelligence",
    order: 110,
  },
  {
    id: "onboarding",
    name: "Client Onboarding Automation",
    shortName: "Client Onboarding",
    description: "A complete onboarding workflow example whose public deployment URL is not yet verified.",
    category: "retention-operations",
    industries: ["Service businesses"],
    technicalUrl: null,
    brandedUrl: `${brandedBase}/onboarding/`,
    status: "unverified",
    ctaLabel: "Preview Unavailable",
    order: 100,
  },
];

function getDemo(id) {
  return demos.find((demo) => demo.id === id);
}

function getPublicDemoUrl(id) {
  const demo = getDemo(id);
  return demo && demo.status === "verified" ? demo.technicalUrl : null;
}

function demosByCategory(category) {
  return demos
    .filter((demo) => demo.category === category)
    .sort((a, b) => a.order - b.order);
}

module.exports = { demos, getDemo, getPublicDemoUrl, demosByCategory };
