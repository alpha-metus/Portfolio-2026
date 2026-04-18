export interface UserStat {
  userCount: string;
  sectionTitle: string;
  descriptionText: string;
  iconName: string;
}

export interface MarketingDataProps {
  sessionTitle: string;
  sessionDescription: string;
  iconName: string;
  color: string;
}

export const userEngagementList: UserStat[] = [
  {
    userCount: "2k+",
    sectionTitle: "Learners Enrolled",
    descriptionText:
      "Trusted by thousands for quality chess learning worldwide.",
    iconName: "shoppingBag",
  },
  {
    userCount: "150k+",
    sectionTitle: "Sessions Delivered",
    descriptionText: "Live classes and activities conducted across all levels.",
    iconName: "settingIcon",
  },
  {
    userCount: "97%",
    sectionTitle: "Student Satisfaction",
    descriptionText: "Our students love the way they learn and grow here.",
    iconName: "shoppingCart",
  },
  {
    userCount: "100+",
    sectionTitle: "Certified Coaches",
    descriptionText: "Expert trainers from national and international arenas.",
    iconName: "userIcon",
  },
];

export const marketingSectionData: MarketingDataProps[] = [
  {
    sessionTitle: "One-2-One",
    sessionDescription: "Private session with flexible scheduling",
    iconName: "announcemetIcon",
    color: "#806DF2",
  },
  {
    sessionTitle: "Group session",
    sessionDescription: "Small groups structured learning",
    iconName: "groupIcon",
    color: "#806DF2",
  },
  {
    sessionTitle: "Tournaments",
    sessionDescription: "Weekly online practice tournaments",
    iconName: "networkIcon",
    color: "#806DF2",
  },
  {
    sessionTitle: "Assignments",
    sessionDescription: "Puzzle-based tasks, with pdf and links",
    iconName: "yearlyIcon",
    color: "#806DF2",
  },
];

export interface StudentImage {
  id: string;
  src: string;
  alt: string;
  name: string;
  age: number;
  achievements: string;
}

export const topRowStudents: StudentImage[] = [
  {
    id: "student1",
    src: "/images/student1.jpeg",
    alt: "Student with cricket bat",
    name: "Alex Johnson",
    age: 9,
    achievements: "Regional Cricket Champion",
  },
  {
    id: "student2",
    src: "/images/student2.jpeg",
    alt: "Student in Arsenal jersey",
    name: "Michael Chen",
    age: 8,
    achievements: "Junior Football League MVP",
  },
  {
    id: "student3",
    src: "/images/student3.jpeg",
    alt: "Student with trophy",
    name: "Jacob Williams",
    age: 10,
    achievements: "School Chess Tournament Winner",
  },
  {
    id: "student4",
    src: "/images/student4.jpeg",
    alt: "Student with chess pieces",
    name: "Sophia Liu",
    age: 9,
    achievements: "National Chess Championship Finalist",
  },
  {
    id: "student5",
    src: "/images/student5.jpeg",
    alt: "Student in white shirt",
    name: "Aiden Patel",
    age: 11,
    achievements: "Mathematics Olympiad Gold Medal",
  },
  {
    id: "student6",
    src: "/images/student6.jpeg",
    alt: "Student in blue t-shirt",
    name: "Emma Rodriguez",
    age: 10,
    achievements: "Science Fair Winner",
  },
  {
    id: "student7",
    src: "/images/student7.jpeg",
    alt: "Student with chess medal",
    name: "Liam Thompson",
    age: 10,
    achievements: "District Chess Champion",
  },
  {
    id: "student8",
    src: "/images/student8.jpeg",
    alt: "Student with trophy",
    name: "Priya Sharma",
    age: 9,
    achievements: "State Chess Finalist",
  },
  {
    id: "student9",
    src: "/images/student9.jpeg",
    alt: "Student at chess board",
    name: "Noah Okafor",
    age: 11,
    achievements: "Junior Chess League Winner",
  },
  {
    id: "student10",
    src: "/images/student10.jpeg",
    alt: "Student with certificate",
    name: "Zara Ahmed",
    age: 10,
    achievements: "Online Chess Tournament Champion",
  },
  {
    id: "student11",
    src: "/images/student11.jpeg",
    alt: "Student posing with trophy",
    name: "Mason Clarke",
    age: 12,
    achievements: "Regional Chess Gold Medal",
  },
  {
    id: "student12",
    src: "/images/student12.jpeg",
    alt: "Student smiling with award",
    name: "Ava Nguyen",
    age: 9,
    achievements: "School Chess Prodigy Award",
  },
  {
    id: "student13",
    src: "/images/student13.jpeg",
    alt: "Student holding chess piece",
    name: "Ethan Kapoor",
    age: 11,
    achievements: "Blitz Chess City Champion",
  },
  {
    id: "student14",
    src: "/images/student14.jpeg",
    alt: "Student with medal",
    name: "Isabella Costa",
    age: 10,
    achievements: "National Junior Chess Top 10",
  },
  {
    id: "student15",
    src: "/images/student15.jpeg",
    alt: "Student at tournament",
    name: "James Osei",
    age: 11,
    achievements: "Chess Olympiad Youth Qualifier",
  },
  {
    id: "student16",
    src: "/images/student16.jpeg",
    alt: "Student with chess board",
    name: "Mia Petrov",
    age: 9,
    achievements: "International Youth Chess Bronze",
  },
  {
    id: "student17",
    src: "/images/student17.jpeg",
    alt: "Student celebrating win",
    name: "Samuel Adeyemi",
    age: 12,
    achievements: "Continental Chess Championship Finalist",
  },
];

export const bottomRowStudents: StudentImage[] = [
  {
    id: "student18",
    src: "/images/student18.jpeg",
    alt: "Student with hands up",
    name: "Tyler Moore",
    age: 12,
    achievements: "School Dance Competition Winner",
  },
  {
    id: "student19",
    src: "/images/student19.jpeg",
    alt: "Student with trophy",
    name: "Lucas Kim",
    age: 10,
    achievements: "Regional Quiz Champion",
  },
  {
    id: "student20",
    src: "/images/student20.jpeg",
    alt: "Student in blue jacket",
    name: "Nathan Lee",
    age: 11,
    achievements: "Junior Debate Champion",
  },
  {
    id: "student21",
    src: "/images/student21.jpeg",
    alt: "Student with chess trophy",
    name: "Gabriel Sharma",
    age: 9,
    achievements: "Chess Tournament Runner-up",
  },
  {
    id: "student22",
    src: "/images/student22.jpeg",
    alt: "Student at chess board",
    name: "Oliver Wilson",
    age: 10,
    achievements: "School Chess Club President",
  },
  {
    id: "student23",
    src: "/images/student23.jpeg",
    alt: "Student with certificate",
    name: "Ethan Martinez",
    age: 11,
    achievements: "Spelling Bee Champion",
  },
  {
    id: "student24",
    src: "/images/student24.jpeg",
    alt: "Student with chess trophy",
    name: "Riya Malhotra",
    age: 11,
    achievements: "State Level Chess Gold",
  },
  {
    id: "student25",
    src: "/images/student25.jpeg",
    alt: "Student at chess event",
    name: "Diego Herrera",
    age: 10,
    achievements: "Inter-School Chess Champion",
  },
  {
    id: "student26",
    src: "/images/student26.jpeg",
    alt: "Student with award",
    name: "Fatima Al-Hassan",
    age: 12,
    achievements: "National Chess Under-12 Winner",
  },
  {
    id: "student27",
    src: "/images/student27.jpeg",
    alt: "Student holding trophy",
    name: "Kai Yamamoto",
    age: 9,
    achievements: "Online Blitz Chess Champion",
  },
  {
    id: "student28",
    src: "/images/student28.jpeg",
    alt: "Student smiling at camera",
    name: "Amara Diallo",
    age: 11,
    achievements: "Regional Chess Runner-up",
  },
  {
    id: "student29",
    src: "/images/student29.jpeg",
    alt: "Student with chess set",
    name: "Ben Kowalski",
    age: 10,
    achievements: "City Chess League Champion",
  },
  {
    id: "student30",
    src: "/images/student30.jpeg",
    alt: "Student celebrating",
    name: "Nadia Ivanova",
    age: 12,
    achievements: "Youth Chess Grand Prix Winner",
  },
  {
    id: "student31",
    src: "/images/student31.jpeg",
    alt: "Student with certificate",
    name: "Aryan Mehta",
    age: 9,
    achievements: "District Chess Prodigy Award",
  },
  {
    id: "student32",
    src: "/images/student32.jpeg",
    alt: "Student at podium",
    name: "Sofia Andersen",
    age: 11,
    achievements: "Scandinavian Youth Chess Top 5",
  },
  {
    id: "student33",
    src: "/images/student33.jpeg",
    alt: "Student with medal",
    name: "Caleb Obi",
    age: 10,
    achievements: "West Africa Junior Chess Champion",
  },
];

export const pricingPlans = [
  {
    duration: "1 Month",
    sessions: "8 Sessions",
    tournaments: "4 Tournaments",
    assignments: "8 Assignments",
    dashboard: "24/7 Dashboard",
    isBestseller: false,
    badge: null as string | null,
    bestFor: "Try it out first",
    spotsLeft: null as number | null,
  },
  {
    duration: "4 Month",
    sessions: "32 Sessions",
    tournaments: "16 Tournaments",
    assignments: "40 Assignments",
    dashboard: "24/7 Dashboard",
    isBestseller: false,
    badge: null as string | null,
    bestFor: "Build a solid foundation",
    spotsLeft: null as number | null,
  },
  {
    duration: "8 Month",
    sessions: "64 Sessions",
    tournaments: "32 Tournaments",
    assignments: "40 Assignments",
    dashboard: "24/7 Dashboard",
    isBestseller: true,
    badge: "MOST POPULAR" as string | null,
    bestFor: "Serious skill improvement",
    spotsLeft: 4 as number | null,
  },
  {
    duration: "12 Month",
    sessions: "98 Sessions",
    tournaments: "48 Tournaments",
    assignments: "200 Assignments",
    dashboard: "24/7 Dashboard",
    isBestseller: false,
    badge: "BEST VALUE" as string | null,
    bestFor: "Full competitive mastery",
    spotsLeft: null as number | null,
  },
];

export const marqueeText = [
  "Personalized 1-on-1 Chess Coaching",
  "Curriculum Designed by National & International Players",
  "Affordable Global Access to Premium Chess Education",
  "Focus on Competitive Preparation",
  "Tech-Enabled Learning Platform",
];
