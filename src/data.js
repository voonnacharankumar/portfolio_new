export const profile = {
  name: "Voonna Charan Kumar",
  role: "Software Development Engineer",
  location: "India",
  summary:
    "Software Development Engineer with 2+ years of experience building Java microservices and full-stack applications with AWS, React and TypeScript across payments and logistics. I've shipped systems that improved conversion, feature adoption, engagement and operational reliability.",
  email: "voonnacharankumar994@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/voonnacharankumar" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/voonna-charan-kumar-4a94881bb" },
    { label: "Email", href: "mailto:voonnacharankumar994@gmail.com" },
  ],
};

export const stats = [
  { value: "~380K", label: "OTPs delivered daily" },
  { value: "11%", label: "checkout conversion lift" },
  { value: "35+", label: "financing plans onboarded" },
  { value: "120+", label: "shippers on automated alerts" },
];

export const experience = [
  {
    company: "Amazon",
    title: "Software Development Engineer I",
    period: "April 2025 - Present",
    teams: [
      {
        name: "Amazon Shipping",
        period: "December 2025 - Present",
        points: [
          "Extended the core returns workflow engine to propagate quality-check data from upstream inspection services to the downstream consumer.",
          "Architected a Java returns quality-check microservice on DynamoDB, SQS/SNS and infrastructure as code, covering ingestion, access-controlled link resolution, versioned event publishing and DLQ reprocessing.",
          "Owned real-time returns-tracking milestones in the shipper-facing UI, with phased delivery coordinated across tracking and front-end teams to hit the India launch date.",
          "Automated weekly pending-claims alerts to 120+ shippers with an AWS Lambda service, shortening claim-processing time.",
          "Leading India's OTP integration through an event-driven Java pipeline (SQS, Lambda, DynamoDB) delivering ~380K shipment-authentication OTPs daily across shipping aggregators, with partial-batch retries and DLQ redrive.",
          "Translated India-expansion requirements into technical features and delivered every item on the regional launch checklist.",
        ],
      },
      {
        name: "Payments",
        period: "April 2025 - November 2025",
        points: [
          "Integrated processing fees into BNPL offer, total and monthly installment calculations for Tabby and Tamara across payment selection and checkout, lifting conversion by 11%.",
          "Led the rollout of an installment-offer comparison table across the UAE, Saudi Arabia, Egypt and Turkey, standardizing lender calculations and growing adoption by 15%.",
          "Uncovered and corrected a three-year-old discrepancy in Egypt offer calculations affecting 10+ offers, unblocking the release.",
          "Onboarded 35+ financing plans by extending configuration and validation flows for provider-specific rules across MENAT.",
          "Launched a vendor-funded offer component that dynamically displays seller names, boosting product-page engagement by 15%.",
          "Fixed mobile checkout view-mode and notification issues, cutting checkout errors by 8%.",
        ],
      },
    ],
  },
  {
    company: "CES Limited",
    title: "Trainee Software Engineer",
    period: "July 2024 - March 2025",
    teams: [
      {
        name: "",
        period: "",
        points: [
          "Built applications that generate hedge-fund portfolio risk metrics, enabling faster and more accurate investment analysis.",
          "Debugged critical risk-metrics batch-processing issues, increasing reliability and reducing error rates by 15%.",
          "Worked directly with clients to gather requirements and deliver tailored improvements to portfolio risk reporting.",
        ],
      },
    ],
  },
];

export const projects = [
  {
    name: "QC Debug Assistant (MCP)",
    tech: ["TypeScript", "MCP", "DynamoDB"],
    description:
      "A TypeScript MCP server that lets an AI assistant diagnose where a return's quality-check pipeline stalled. Read-only tools collect every detected issue and return structured output without exposing secrets to the model.",
    href: "",
  },
  {
    name: "Story Times",
    tech: ["Node.js", "Express", "MongoDB Atlas", "EJS"],
    description:
      "An authenticated blogging platform with full CRUD, so users can write, edit, publish and delete their own stories.",
    href: "https://github.com/voonnacharankumar/storytime_blogging",
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "TypeScript", "Python", "C++"] },
  { group: "Frameworks", items: ["Spring Boot", "Node.js", "Express.js", "React.js", "Mongoose"] },
  { group: "AWS & DevOps", items: ["Lambda", "SQS", "SNS", "S3", "DynamoDB", "CloudWatch", "CI/CD"] },
  { group: "Databases", items: ["DynamoDB", "MongoDB", "SQL"] },
  { group: "Core", items: ["Data Structures & Algorithms", "OOP", "Design Patterns", "System Design"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Kiro CLI", "Claude Code"] },
];

export const codingProfiles = [
  { label: "LeetCode", handle: "vcharan1729", href: "https://leetcode.com/vcharan1729/" },
  { label: "Codeforces", handle: "voonnacharankumar994", href: "https://codeforces.com/profile/voonnacharankumar994" },
  { label: "CodeChef", handle: "charan1729", href: "https://www.codechef.com/users/charan1729" },
  { label: "HackerRank", handle: "voonnacharankum1", href: "https://www.hackerrank.com/voonnacharankum1" },
];

export const education = {
  degree: "B.Tech., Electronics & Communication Engineering",
  school: "National Institute of Technology, Agartala",
  period: "November 2020 - May 2024",
  grade: "CGPA 8.77/10",
};

export const publication = {
  text: "Reconfigurable-antenna research presented at the 9th International Conference on Signal Processing and Communication, Noida.",
  href: "https://ieeexplore.ieee.org/document/10441210",
  label: "IEEE Xplore",
};
