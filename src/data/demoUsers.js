export const demoUsers = [
  {
    email: "student@clubx.com",
    password: "student123",
    role: "student",
    name: "Hosaina Jabara Razty",
    studentId: "C241462",
    department: "CSE",
  },
  {
    email: "executive@clubx.com",
    password: "executive123",
    role: "executive",
    name: "Rakib Hasan",
    club: "IEEE Student Branch",
    position: "President",
  },
  {
    email: "admin@clubx.com",
    password: "admin123",
    role: "admin",
    name: "System Admin",
  },
];

export const authenticate = (email, password, selectedRole) => {
  const user = demoUsers.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password === password
  );

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  if (user.role !== selectedRole) {
    return {
      success: false,
      error: `This account is registered as a ${user.role}. Please select "${user.role}" to continue.`,
    };
  }

  return { success: true, user };
};

// =========================================
// MOCK DASHBOARD CONTENT
// (used by StudentDashboard / ExecutiveDashboard / AdminDashboard
// to render stats, lists and announcements)
// =========================================

export const mockStudent = {
  name: "Hosaina Jabara Razty",
  email: "student@clubx.com",
  studentId: "C241462",
  department: "CSE",
  memberships: [
    { club: "IEEE Student Branch", status: "Approved" },
    { club: "IIUC Computer Club", status: "Approved" },
    { club: "IIUCPS", status: "Pending" },
  ],
  events: [
    { title: "Intro to Robotics Workshop", date: "Oct 12, 2026", status: "Registered" },
    { title: "Annual Photography Walk", date: "Oct 20, 2026", status: "Registered" },
    { title: "Business Case Competition", date: "Nov 02, 2026", status: "Registered" },
  ],
  attendance: [
    { event: "Freshers' Welcome 2026", status: "Present" },
    { event: "Web Dev Bootcamp — Day 1", status: "Present" },
    { event: "Web Dev Bootcamp — Day 2", status: "Absent" },
    { event: "Tech Talk: AI in Industry", status: "Present" },
  ],
  announcements: [
    { club: "IEEE Student Branch", title: "New executive panel elections open next week." },
    { club: "IIUC Computer Club", title: "Coding contest registration closes Friday." },
    { club: "IIUCPS", title: "Photo submission deadline extended to Oct 25." },
  ],
};

export const mockExecutive = {
  name: "Rakib Hasan",
  club: "IEEE Student Branch",
  position: "President",
  stats: {
    members: 142,
    events: 5,
    announcements: 8,
  },
  pendingMembers: [
    { id: "C233011", name: "Anika Tahsin", dept: "EEE" },
    { id: "C241205", name: "Mahin Chowdhury", dept: "CSE" },
    { id: "C230987", name: "Farhan Kabir", dept: "CSE" },
  ],
  events: [
    { title: "Intro to Robotics Workshop", date: "Oct 12, 2026", registered: 64, total: 80 },
    { title: "IoT Hands-on Session", date: "Oct 28, 2026", registered: 30, total: 50 },
    { title: "IEEE Day Celebration", date: "Nov 10, 2026", registered: 12, total: 100 },
  ],
  announcements: [
    { title: "New executive panel elections open next week.", date: "Sep 24, 2026" },
    { title: "Robotics workshop venue changed to Lab 3.", date: "Sep 20, 2026" },
    { title: "Membership renewal deadline is Oct 5.", date: "Sep 15, 2026" },
  ],
};

export const mockAdmin = {
  name: "System Admin",
  stats: {
    clubs: 4,
    users: 1280,
    events: 21,
    executives: 12,
  },
  clubs: [
    { name: "IEEE Student Branch", members: 142, executive: "Rakib Hasan" },
    { name: "IIUC Computer Club", members: 210, executive: "Nusrat Jahan" },
    { name: "IIUCPS", members: 96, executive: "Tanvir Ahmed" },
    { name: "IIUC Business Club", members: 118, executive: "Sadia Islam" },
  ],
  userStats: {
    students: 1240,
    executives: 12,
    admins: 3,
  },
  announcements: [
    { title: "Platform maintenance scheduled for Oct 1, midnight.", date: "Sep 25, 2026" },
    { title: "New club registration window opens next month.", date: "Sep 18, 2026" },
    { title: "Annual club performance review starts Oct 15.", date: "Sep 10, 2026" },
  ],
};

export const mockRegisteredStudents = [
  { id: "C241462", name: "Hosaina Jabara Razty", dept: "CSE", ticketId: "TXN-2025-4782" },
  { id: "C241470", name: "Fabiya Anjum", dept: "CSE", ticketId: "TXN-2025-4783" },
  { id: "C241471", name: "Tanvir Ahmed", dept: "EEE", ticketId: "TXN-2025-4784" },
  { id: "C241488", name: "Sadia Islam", dept: "BBA", ticketId: "TXN-2025-4785" },
  { id: "C241492", name: "Nusrat Jahan", dept: "CSE", ticketId: "TXN-2025-4786" },
  { id: "C241505", name: "Rakib Hasan", dept: "EEE", ticketId: "TXN-2025-4787" },
];