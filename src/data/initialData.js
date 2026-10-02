// Initial Mock Data and LocalStorage helpers

export const INITIAL_ORGANIZATIONS = [
  {
    id: "org-techglobal",
    name: "TechGlobal Corp",
    email: "org@techglobal.com",
    logo: "⚡",
    tagline: "Building Tomorrow's Innovation Today",
    eventsCount: 2
  },
  {
    id: "org-devcorp",
    name: "DevCorp Community",
    email: "info@devcorp.org",
    logo: "🚀",
    tagline: "Empowering Developers Worldwide",
    eventsCount: 1
  },
  {
    id: "org-secops",
    name: "SecOps Association",
    email: "contact@secops.org",
    logo: "🛡️",
    tagline: "Securing the Future of Software",
    eventsCount: 1
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt-101",
    title: "TechPulse AI & Machine Learning Summit 2026",
    organizationId: "org-techglobal",
    organizationName: "TechGlobal Corp",
    date: "2026-11-15",
    time: "09:00 AM - 05:00 PM",
    venue: "Grand Tech Convention Hall, Main Auditorium",
    city: "San Francisco, CA",
    track: "AI & Machine Learning",
    capacity: 500,
    price: "Free",
    status: "Upcoming",
    description: "The flagship annual summit exploring Large Language Models, Agentic Workflows, Computer Vision, and Autonomous AI Systems.",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
  },
  {
    id: "evt-102",
    title: "Global Cloud Native & DevOps Hackathon",
    organizationId: "org-devcorp",
    organizationName: "DevCorp Community",
    date: "2026-12-01",
    time: "10:00 AM - 08:00 PM",
    venue: "Innovation Hub, Tech Park Block B",
    city: "Austin, TX",
    track: "Full Stack & Cloud",
    capacity: 300,
    price: "$15",
    status: "Upcoming",
    description: "24-hour hands-on build-a-thon. Ship cloud-native microservices with Kubernetes, Serverless, and Distributed Databases.",
    banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80"
  },
  {
    id: "evt-103",
    title: "CyberSec & Zero Trust Defense Conference",
    organizationId: "org-secops",
    organizationName: "SecOps Association",
    date: "2026-12-10",
    time: "09:30 AM - 04:30 PM",
    venue: "Cyber Pavilion & Virtual Broadcast",
    city: "Seattle, WA",
    track: "Cybersecurity & Web3",
    capacity: 250,
    price: "Free",
    status: "Upcoming",
    description: "Learn offensive security, vulnerability assessment, cryptography, and zero-trust identity architectures from top ethical hackers.",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
  },
  {
    id: "evt-104",
    title: "NextGen UI/UX & Product Design Workshop",
    organizationId: "org-techglobal",
    organizationName: "TechGlobal Corp",
    date: "2026-12-20",
    time: "01:00 PM - 06:00 PM",
    venue: "Design Studio Hub, Floor 4",
    city: "San Jose, CA",
    track: "UI/UX & Product Design",
    capacity: 200,
    price: "$10",
    status: "Upcoming",
    description: "Master modern micro-interactions, Figma design systems, motion design, and user research frameworks.",
    banner: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80"
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: "reg-001",
    ticketId: "TICK-8801",
    eventId: "evt-101",
    eventTitle: "TechPulse AI & Machine Learning Summit 2026",
    organizationId: "org-techglobal",
    name: "Jordan Vance",
    email: "jordan.vance@tech.edu",
    phone: "+1 (555) 987-6543",
    college: "California Institute of Technology",
    department: "Computer Science",
    year: "3rd Year",
    track: "AI & Machine Learning",
    checkedIn: true,
    registeredAt: "2026-10-01T10:30:00Z"
  },
  {
    id: "reg-002",
    ticketId: "TICK-8802",
    eventId: "evt-101",
    eventTitle: "TechPulse AI & Machine Learning Summit 2026",
    organizationId: "org-techglobal",
    name: "Elena Rostova",
    email: "elena.rostova@stanford.edu",
    phone: "+1 (555) 234-5678",
    college: "Stanford University",
    department: "Data Science",
    year: "4th Year",
    track: "AI & Machine Learning",
    checkedIn: false,
    registeredAt: "2026-10-01T14:15:00Z"
  },
  {
    id: "reg-003",
    ticketId: "TICK-8803",
    eventId: "evt-102",
    eventTitle: "Global Cloud Native & DevOps Hackathon",
    organizationId: "org-devcorp",
    name: "Marcus Chen",
    email: "m.chen@mit.edu",
    phone: "+1 (555) 345-6789",
    college: "MIT",
    department: "Electrical Engineering",
    year: "Graduate / Post-Grad",
    track: "Full Stack & Cloud",
    checkedIn: true,
    registeredAt: "2026-10-02T09:00:00Z"
  },
  {
    id: "reg-004",
    ticketId: "TICK-8804",
    eventId: "evt-103",
    eventTitle: "CyberSec & Zero Trust Defense Conference",
    organizationId: "org-secops",
    name: "Samantha Wright",
    email: "sam.wright@berkeley.edu",
    phone: "+1 (555) 456-7890",
    college: "UC Berkeley",
    department: "Information Technology",
    year: "2nd Year",
    track: "Cybersecurity & Web3",
    checkedIn: false,
    registeredAt: "2026-10-02T11:45:00Z"
  },
  {
    id: "reg-005",
    ticketId: "TICK-8805",
    eventId: "evt-104",
    eventTitle: "NextGen UI/UX & Product Design Workshop",
    organizationId: "org-techglobal",
    name: "Aisha Patel",
    email: "aisha.p@cmu.edu",
    phone: "+1 (555) 567-8901",
    college: "Carnegie Mellon University",
    department: "Design & HCI",
    year: "3rd Year",
    track: "UI/UX & Product Design",
    checkedIn: true,
    registeredAt: "2026-10-02T13:20:00Z"
  }
];
