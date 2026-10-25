// Club data keyed by URL slug. Add a new club here to get a /clubs/<slug> page.
// NOTE: members, announcements and achievements are sample data until the backend exists.
const clubs = {
  ieee: {
    name: "IEEE IIUC Student Branch",
    short: "IEEE",
    tagline: "Advancing technology for humanity",
    description:
      "The official student branch of the Institute of Electrical and Electronics Engineers at International Islamic University Chittagong, running technical, professional and community programs.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Technical & Professional" },
      { label: "Societies", value: "ComSoc, CS, PES, RAS, WIE" },
      { label: "Website", value: "ieeesb.iiuc.ac.bd", href: "https://ieeesb.iiuc.ac.bd/" },
    ],
    stats: [
      { value: "5", label: "Societies" },
      { value: "4+", label: "Annual Flagship Events" },
      { value: "2022–25", label: "Committees on Record" },
    ],
    announcements: [
      {
        title: "Techfest 2025 Registration Open",
        date: "2025-09-10",
        desc: "Register your team for the annual Techfest featuring contests, project showcases and workshops.",
        more: "Teams of up to three members can register. Registration closes one week before the event; shortlisted teams are notified by email.",
      },
      {
        title: "RoverX Robotics Competition",
        date: "2025-08-22",
        desc: "Build and race your rover in the RoverX robotics competition organised with the RAS chapter.",
        more: "Rule book and arena specifications are shared with registered teams. Workshops on rover basics run every weekend before the contest.",
      },
      {
        title: "IEEE Day Celebration",
        date: "2025-10-01",
        desc: "Join us in celebrating IEEE Day with talks, games and a members' meet-up.",
        more: "Open to all IIUC students. IEEE members receive priority seating at the keynote session.",
      },
    ],
    members: [
      { name: "Chairperson", role: "Chair", dept: "CSE" },
      { name: "Vice Chairperson", role: "Vice Chair", dept: "EEE" },
      { name: "General Secretary", role: "Secretary", dept: "CSE" },
      { name: "Treasurer", role: "Treasurer", dept: "EEE" },
      { name: "ComSoc Chair", role: "Society Chair", dept: "ETE" },
      { name: "WIE Chair", role: "Society Chair", dept: "CSE" },
    ],
    requirements: {
      who: [
        "Currently enrolled IIUC students",
        "Students from engineering and technology departments (all departments welcome to events)",
      ],
      eligibility: [
        "Active IIUC student ID",
        "Genuine interest in technology and volunteering",
        "Commitment to attend regular meetings",
      ],
      joining: [
        "Create an IEEE account and join the IIUC Student Branch",
        "Pay the annual IEEE membership fee",
        "Fill in the branch registration form",
        "Attend the orientation session",
      ],
      conditions: [
        "Follow the IEEE Code of Ethics",
        "Membership must be renewed every year",
      ],
    },
    achievements: [
      { title: "International Student Led Conference", year: "2025", desc: "Hosted a student-led international conference with participants from multiple institutions." },
      { title: "Techfest", year: "2025", desc: "Organised the annual technology festival with contests and project showcases." },
      { title: "RoverX Robotics Competition", year: "2025", desc: "Launched an inter-university rover competition." },
      { title: "ICISET Conference", year: "2022", desc: "Supported the International Conference on Innovative Science, Engineering and Technology." },
    ],
    about: {
      history:
        "The IEEE IIUC Student Branch was formed to give IIUC students a platform to connect with the global IEEE community. Over the years it has grown into multiple societies and a yearly executive committee that runs conferences, contests and industrial visits.",
      mission:
        "To foster technological innovation and excellence for the benefit of students, the university and society.",
      vision:
        "To be the leading student branch in the region, producing skilled and ethical technology professionals.",
      activities: [
        "Conferences and seminars",
        "Robotics and programming contests",
        "Industrial visits and site tours",
        "IEEE Day celebrations",
        "Workshops and skill-development sessions",
      ],
      contact: [
        { label: "Website", value: "ieeesb.iiuc.ac.bd", href: "https://ieeesb.iiuc.ac.bd/" },
      ],
    },
    // Sample data — replace with real member-benefit copy when available.
    benefits: [
      { title: "Hands-on Workshops", desc: "Regular sessions on tools and technologies used across the industry." },
      { title: "Competitions", desc: "Compete in hackathons, robotics and coding contests at campus and national level." },
      { title: "Networking", desc: "Connect with alumni, industry professionals and IEEE members across the region." },
      { title: "Leadership Opportunities", desc: "Take on executive and organising roles that build real leadership experience." },
      { title: "Certificates", desc: "IEEE-recognised certificates for workshops, volunteering and events." },
      { title: "Skill Development", desc: "Mentorship and structured training to grow technical and soft skills." },
    ],
    // Sample/placeholder executives — do not treat as real people until the club supplies data.
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "CSE", batch: "48" },
      { name: "Sample Name", position: "Chief Chairperson", department: "EEE", batch: "47" },
      { name: "Sample Name", position: "General Secretary", department: "CSE", batch: "48" },
      { name: "Sample Name", position: "Assistant General Secretary", department: "ETE", batch: "49" },
      { name: "Sample Name", position: "Treasurer", department: "EEE", batch: "48" },
      { name: "Sample Name", position: "Joint Secretary", department: "CSE", batch: "49" },
      { name: "Sample Name", position: "Organizing Secretary", department: "CSE", batch: "48" },
      { name: "Sample Name", position: "Executive Member", department: "EEE", batch: "50" },
    ],
    // Placeholder fee/payment numbers — replace with the club's real bKash/Nagad/Rocket merchant/personal numbers.
    membership: {
      fee: 300,
      paymentMethods: {
        bkash: "01700-000000",
        nagad: "01700-000001",
        rocket: "01700-000002",
      },
    },
  },

  "computer-club": {
    name: "IIUC Computer Club",
    short: "Computer Club",
    tagline: "Code, compete, create",
    description:
      "A student-run programming community that runs contests, workshops and open-source projects for anyone who wants to get better at building software.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Technical" },
      { label: "Focus", value: "Competitive programming, web & app dev, open source" },
    ],
    stats: [
      { value: "3", label: "Weekly Sessions" },
      { value: "6+", label: "Contests / Year" },
      { value: "150+", label: "Active Members" },
    ],
    announcements: [
      { title: "Weekly Contest #24", date: "2025-09-12", desc: "Solve five problems in two hours and climb the club leaderboard.", more: "Open to all skill levels; beginner and advanced divisions run in parallel." },
      { title: "Intro to Git & GitHub Workshop", date: "2025-08-28", desc: "A hands-on session on version control for first-time contributors.", more: "Bring a laptop with Git installed; certificates given on completion." },
      { title: "Open Source Sprint", date: "2025-10-05", desc: "A day of contributing to real open-source projects together.", more: "Mentors are available on-site to help you make your first pull request." },
    ],
    members: [
      { name: "President", role: "President", dept: "CSE" },
      { name: "Vice President", role: "Vice President", dept: "CSE" },
      { name: "General Secretary", role: "Secretary", dept: "CSE" },
      { name: "Treasurer", role: "Treasurer", dept: "CSE" },
      { name: "Contest Coordinator", role: "Coordinator", dept: "CSE" },
      { name: "Web Lead", role: "Lead", dept: "CSE" },
    ],
    requirements: {
      who: ["Any currently enrolled IIUC student interested in programming"],
      eligibility: ["Active IIUC student ID", "Basic interest in coding — no prior contest experience required"],
      joining: ["Fill in the club registration form", "Pay the membership fee", "Join the club's Discord/Facebook group", "Attend the orientation session"],
      conditions: ["Attend at least one session per month to stay an active member", "Membership renews yearly"],
    },
    achievements: [
      { title: "ICPC Regional Qualifiers", year: "2025", desc: "Three club teams qualified for the ICPC Asia regional preliminaries." },
      { title: "Inter-University Hackathon", year: "2024", desc: "Won first runner-up at a national inter-university hackathon." },
      { title: "Open Source Sprint Series", year: "2024", desc: "Launched a recurring event that produced 40+ merged pull requests." },
    ],
    about: {
      history:
        "Founded by a small group of students passionate about competitive programming, the Computer Club has grown into IIUC's largest technical community, running weekly contests and workshops.",
      mission: "To build a strong programming culture at IIUC through practice, mentorship and community.",
      vision: "To be the launchpad for IIUC students entering competitive programming and the tech industry.",
      activities: ["Weekly contests", "Workshops on new tools and languages", "Open-source contribution sprints", "Mock interviews and resume reviews"],
      contact: [{ label: "Facebook", value: "fb.com/iiuccomputerclub", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Weekly Practice", desc: "Structured contests to build consistent problem-solving habits." },
      { title: "Mentorship", desc: "Guidance from senior competitive programmers and alumni." },
      { title: "Hackathons", desc: "Team up for campus and national hackathons." },
      { title: "Open Source", desc: "Contribute to real projects and build a public portfolio." },
      { title: "Certificates", desc: "Certificates for workshops and contest participation." },
      { title: "Career Prep", desc: "Mock interviews and resume feedback from seniors." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "CSE", batch: "49" },
      { name: "Sample Name", position: "General Secretary", department: "CSE", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "CSE", batch: "48" },
      { name: "Sample Name", position: "Joint Secretary", department: "CSE", batch: "49" },
      { name: "Sample Name", position: "Organizing Secretary", department: "CSE", batch: "50" },
      { name: "Sample Name", position: "Executive Member", department: "CSE", batch: "50" },
    ],
    membership: { fee: 250, paymentMethods: { bkash: "01700-000010", nagad: "01700-000011", rocket: "01700-000012" } },
  },

  iiucps: {
    name: "IIUC Professional Society",
    short: "IIUCPS",
    tagline: "Career guidance and professional growth",
    description:
      "A career-focused society helping students build professional skills, explore career paths and connect with industry through mentorship and training.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Career & Professional Development" },
      { label: "Focus", value: "Career guidance, soft skills, industry connections" },
    ],
    stats: [
      { value: "10+", label: "Career Sessions / Year" },
      { value: "20+", label: "Industry Speakers" },
      { value: "300+", label: "Members Guided" },
    ],
    announcements: [
      { title: "Resume & LinkedIn Clinic", date: "2025-09-05", desc: "One-on-one feedback on resumes and LinkedIn profiles from alumni mentors.", more: "Bring a printed or digital copy of your current resume." },
      { title: "Career Talk: Breaking into Tech", date: "2025-08-18", desc: "An industry panel on landing your first internship or job in tech.", more: "Open to all departments; recording shared with members afterward." },
      { title: "Mock Interview Week", date: "2025-10-12", desc: "Practice interviews with structured feedback from senior members.", more: "Slots are limited and allocated on a first-come basis." },
    ],
    members: [
      { name: "President", role: "President", dept: "BBA" },
      { name: "Vice President", role: "Vice President", dept: "CSE" },
      { name: "General Secretary", role: "Secretary", dept: "English" },
      { name: "Treasurer", role: "Treasurer", dept: "BBA" },
      { name: "Events Lead", role: "Lead", dept: "Law" },
      { name: "Outreach Lead", role: "Lead", dept: "CSE" },
    ],
    requirements: {
      who: ["Students from any department looking to build professional/career skills"],
      eligibility: ["Active IIUC student ID", "Willingness to attend career-development sessions"],
      joining: ["Submit the registration form", "Pay the membership fee", "Attend the induction session"],
      conditions: ["Follow the society's code of conduct", "Renew membership each academic year"],
    },
    achievements: [
      { title: "Career Fair 2025", year: "2025", desc: "Organised a campus career fair with 15+ participating companies." },
      { title: "Mentorship Program Launch", year: "2024", desc: "Paired 100+ students with alumni mentors across industries." },
    ],
    about: {
      history: "IIUCPS was formed to close the gap between classroom learning and industry expectations, giving students structured access to career guidance.",
      mission: "To prepare IIUC students for the professional world through mentorship, training and industry exposure.",
      vision: "To be the primary bridge between IIUC students and the professional job market.",
      activities: ["Career talks", "Resume and interview clinics", "Alumni mentorship", "Industry visits"],
      contact: [{ label: "Facebook", value: "fb.com/iiucps", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Career Guidance", desc: "One-on-one guidance on career paths and higher study options." },
      { title: "Mentorship", desc: "Direct mentorship from alumni working across industries." },
      { title: "Networking", desc: "Access to a growing alumni and industry professional network." },
      { title: "Certificates", desc: "Certificates for workshops and mentorship program completion." },
      { title: "Interview Practice", desc: "Structured mock interviews with detailed feedback." },
      { title: "Industry Exposure", desc: "Visits and talks with companies across sectors." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "BBA", batch: "47" },
      { name: "Sample Name", position: "General Secretary", department: "CSE", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "BBA", batch: "48" },
      { name: "Sample Name", position: "Joint Secretary", department: "Law", batch: "49" },
      { name: "Sample Name", position: "Executive Member", department: "English", batch: "49" },
    ],
    membership: { fee: 200, paymentMethods: { bkash: "01700-000020", nagad: "01700-000021", rocket: "01700-000022" } },
  },

  "business-club": {
    name: "IIUC Business Club",
    short: "Business Club",
    tagline: "Where ideas meet enterprise",
    description:
      "A community for students interested in business, entrepreneurship and finance, running case competitions, startup workshops and networking events.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Business & Entrepreneurship" },
      { label: "Focus", value: "Case competitions, startups, finance" },
    ],
    stats: [
      { value: "5+", label: "Case Competitions / Year" },
      { value: "8+", label: "Startup Workshops" },
      { value: "200+", label: "Active Members" },
    ],
    announcements: [
      { title: "Business Case Championship", date: "2025-09-20", desc: "Compete in teams to solve a real-world business case.", more: "Winning teams receive certificates and cash prizes." },
      { title: "Startup Pitch Night", date: "2025-08-30", desc: "Pitch your startup idea to a panel of local entrepreneurs.", more: "Top three pitches get follow-up mentorship sessions." },
      { title: "Finance Basics Workshop", date: "2025-10-08", desc: "An introductory session on personal finance and investing.", more: "Open to all departments, no prior finance background needed." },
    ],
    members: [
      { name: "President", role: "President", dept: "BBA" },
      { name: "Vice President", role: "Vice President", dept: "BBA" },
      { name: "General Secretary", role: "Secretary", dept: "Economics" },
      { name: "Treasurer", role: "Treasurer", dept: "BBA" },
      { name: "Events Lead", role: "Lead", dept: "BBA" },
    ],
    requirements: {
      who: ["Students interested in business, entrepreneurship or finance"],
      eligibility: ["Active IIUC student ID", "Interest in business/case competitions"],
      joining: ["Fill in the registration form", "Pay the membership fee", "Attend the orientation meeting"],
      conditions: ["Participate in at least one club event per semester", "Renew membership yearly"],
    },
    achievements: [
      { title: "National Case Competition Finalist", year: "2025", desc: "Reached the national finals of an inter-university business case competition." },
      { title: "Startup Incubation Program", year: "2024", desc: "Helped three student startups get seed mentorship and early funding leads." },
    ],
    about: {
      history: "Business Club started as an informal study group for case-competition enthusiasts and has since grown into a full entrepreneurship community on campus.",
      mission: "To nurture business thinking and entrepreneurial skills among IIUC students.",
      vision: "To be the leading student platform for business innovation at IIUC.",
      activities: ["Case competitions", "Startup pitch nights", "Finance workshops", "Guest speaker sessions"],
      contact: [{ label: "Facebook", value: "fb.com/iiucbusinessclub", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Case Competitions", desc: "Sharpen analytical and problem-solving skills through real cases." },
      { title: "Startup Support", desc: "Pitch nights and mentorship for your own business ideas." },
      { title: "Networking", desc: "Meet entrepreneurs, investors and business alumni." },
      { title: "Leadership Roles", desc: "Organize events and lead project teams." },
      { title: "Certificates", desc: "Certificates for competitions and workshops." },
      { title: "Finance Skills", desc: "Practical sessions on budgeting, investing and financial literacy." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "BBA", batch: "48" },
      { name: "Sample Name", position: "General Secretary", department: "Economics", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "BBA", batch: "49" },
      { name: "Sample Name", position: "Organizing Secretary", department: "BBA", batch: "49" },
      { name: "Sample Name", position: "Executive Member", department: "BBA", batch: "50" },
    ],
    membership: { fee: 250, paymentMethods: { bkash: "01700-000030", nagad: "01700-000031", rocket: "01700-000032" } },
  },

  "photography-society": {
    name: "IIUC Photography Society",
    short: "Photography",
    tagline: "See the campus differently",
    description:
      "A creative community for students who love photography and visual storytelling, running photo walks, editing workshops and exhibitions.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Arts & Creative" },
      { label: "Focus", value: "Photography, editing, exhibitions" },
    ],
    stats: [
      { value: "12+", label: "Photo Walks / Year" },
      { value: "2", label: "Annual Exhibitions" },
      { value: "100+", label: "Members" },
    ],
    announcements: [
      { title: "Campus Photo Walk", date: "2025-09-14", desc: "A guided golden-hour photo walk around campus for all skill levels.", more: "Any camera or phone welcome; tripods optional." },
      { title: "Lightroom Editing Workshop", date: "2025-08-25", desc: "Learn the editing basics used in the society's featured shots.", more: "Bring a laptop with Lightroom (trial is fine) installed." },
      { title: "Annual Photo Exhibition", date: "2025-11-02", desc: "A showcase of the best member submissions from the year.", more: "Submissions open two weeks before the exhibition date." },
    ],
    members: [
      { name: "President", role: "President", dept: "CSE" },
      { name: "Vice President", role: "Vice President", dept: "English" },
      { name: "General Secretary", role: "Secretary", dept: "Architecture" },
      { name: "Treasurer", role: "Treasurer", dept: "BBA" },
      { name: "Creative Lead", role: "Lead", dept: "Architecture" },
    ],
    requirements: {
      who: ["Any student with an interest in photography, from beginner to advanced"],
      eligibility: ["Active IIUC student ID", "Own or borrowed camera/phone for shoots"],
      joining: ["Fill in the registration form", "Pay the membership fee", "Join the first photo walk"],
      conditions: ["Submit at least one photo per exhibition cycle to stay active", "Renew membership yearly"],
    },
    achievements: [
      { title: "Inter-University Photo Contest", year: "2025", desc: "A member's photograph won first place at a national inter-university contest." },
      { title: "Campus Life Exhibition", year: "2024", desc: "Held the society's first standalone campus exhibition, drawing 500+ visitors." },
    ],
    about: {
      history: "What began as a small group sharing phone photos of campus life grew into an organised society running regular walks, workshops and exhibitions.",
      mission: "To help students see and capture their world creatively through photography.",
      vision: "To be recognised as the home of visual storytelling at IIUC.",
      activities: ["Photo walks", "Editing workshops", "Exhibitions", "Photo contests"],
      contact: [{ label: "Instagram", value: "@iiucphotography", href: "https://instagram.com" }],
    },
    benefits: [
      { title: "Photo Walks", desc: "Regular guided walks to practice and shoot together." },
      { title: "Editing Workshops", desc: "Learn Lightroom/Photoshop from experienced members." },
      { title: "Exhibitions", desc: "Showcase your work to the wider campus community." },
      { title: "Contests", desc: "Compete in campus and national photography contests." },
      { title: "Certificates", desc: "Certificates for workshops and exhibition participation." },
      { title: "Portfolio Building", desc: "Build a public portfolio through featured submissions." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "Architecture", batch: "48" },
      { name: "Sample Name", position: "General Secretary", department: "English", batch: "49" },
      { name: "Sample Name", position: "Treasurer", department: "BBA", batch: "49" },
      { name: "Sample Name", position: "Executive Member", department: "CSE", batch: "50" },
    ],
    membership: { fee: 200, paymentMethods: { bkash: "01700-000040", nagad: "01700-000041", rocket: "01700-000042" } },
  },

  "debate-club": {
    name: "IIUC Debate Club",
    short: "Debate",
    tagline: "Argue well. Think better.",
    description:
      "A club for students who want to sharpen critical thinking, public speaking and argumentation through parliamentary and other debate formats.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Academic" },
      { label: "Focus", value: "Debate, public speaking, critical thinking" },
    ],
    stats: [
      { value: "4+", label: "Tournaments / Year" },
      { value: "15+", label: "Practice Sessions" },
      { value: "80+", label: "Members" },
    ],
    announcements: [
      { title: "Novice Debate Workshop", date: "2025-09-08", desc: "An introduction to parliamentary debate format for first-timers.", more: "No prior debate experience required; all materials provided." },
      { title: "IIUC Debate Open", date: "2025-10-18", desc: "The club's flagship inter-university debate tournament.", more: "Teams from partner universities are invited; registration is limited." },
      { title: "Public Speaking Bootcamp", date: "2025-08-20", desc: "A weekend bootcamp on structuring and delivering persuasive speeches.", more: "Certificates given to all participants who complete both days." },
    ],
    members: [
      { name: "President", role: "President", dept: "Law" },
      { name: "Vice President", role: "Vice President", dept: "English" },
      { name: "General Secretary", role: "Secretary", dept: "Law" },
      { name: "Treasurer", role: "Treasurer", dept: "BBA" },
      { name: "Training Lead", role: "Lead", dept: "English" },
    ],
    requirements: {
      who: ["Any student interested in debate or public speaking"],
      eligibility: ["Active IIUC student ID", "Willingness to attend regular practice sessions"],
      joining: ["Fill in the registration form", "Pay the membership fee", "Attend the novice workshop"],
      conditions: ["Attend regular practice sessions to remain an active member", "Renew membership yearly"],
    },
    achievements: [
      { title: "National Debate Championship", year: "2025", desc: "Reached the semi-finals of a national inter-university debate championship." },
      { title: "IIUC Debate Open Launch", year: "2024", desc: "Launched the club's first inter-university tournament with six participating teams." },
    ],
    about: {
      history: "The Debate Club was formed by a small group of students who wanted a structured space to practice argumentation and public speaking, and has since represented IIUC at national tournaments.",
      mission: "To build confident, critical-thinking communicators through the practice of debate.",
      vision: "To make IIUC a recognised name on the national debate circuit.",
      activities: ["Weekly practice sessions", "Inter-university tournaments", "Public speaking workshops", "Adjudication training"],
      contact: [{ label: "Facebook", value: "fb.com/iiucdebateclub", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Public Speaking", desc: "Structured practice to build confident, persuasive speaking skills." },
      { title: "Critical Thinking", desc: "Sharpen argumentation and rapid analysis through debate rounds." },
      { title: "Tournaments", desc: "Compete at campus and national inter-university tournaments." },
      { title: "Leadership", desc: "Lead teams and organise the club's own tournaments." },
      { title: "Certificates", desc: "Certificates for workshops and tournament participation." },
      { title: "Networking", desc: "Connect with debaters from partner universities." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "Law", batch: "47" },
      { name: "Sample Name", position: "General Secretary", department: "Law", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "BBA", batch: "48" },
      { name: "Sample Name", position: "Executive Member", department: "English", batch: "49" },
    ],
    membership: { fee: 200, paymentMethods: { bkash: "01700-000050", nagad: "01700-000051", rocket: "01700-000052" } },
  },

  "cultural-club": {
    name: "IIUC Cultural Club",
    short: "Cultural",
    tagline: "Celebrate every tradition",
    description:
      "A club dedicated to celebrating music, dance, drama and cultural heritage through campus events, festivals and performances.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Culture & Arts" },
      { label: "Focus", value: "Music, dance, drama, festivals" },
    ],
    stats: [
      { value: "6+", label: "Events / Year" },
      { value: "3", label: "Major Festivals" },
      { value: "250+", label: "Members" },
    ],
    announcements: [
      { title: "Pohela Boishakh Celebration", date: "2025-09-15", desc: "A campus-wide celebration with music, food stalls and traditional attire.", more: "Volunteers needed for stalls and stage management." },
      { title: "Talent Hunt Auditions", date: "2025-08-27", desc: "Auditions for singers, dancers and performers for the annual cultural night.", more: "Sign up in advance; slots are allocated on a first-come basis." },
      { title: "Annual Cultural Night", date: "2025-11-15", desc: "The club's biggest event of the year, featuring performances from members.", more: "Tickets are free for club members, limited seats for guests." },
    ],
    members: [
      { name: "President", role: "President", dept: "Bangla" },
      { name: "Vice President", role: "Vice President", dept: "English" },
      { name: "General Secretary", role: "Secretary", dept: "BBA" },
      { name: "Treasurer", role: "Treasurer", dept: "CSE" },
      { name: "Performance Lead", role: "Lead", dept: "Bangla" },
    ],
    requirements: {
      who: ["Any student interested in music, dance, drama or cultural events"],
      eligibility: ["Active IIUC student ID", "Enthusiasm for cultural activities — no performance experience required"],
      joining: ["Fill in the registration form", "Pay the membership fee", "Attend the welcome meet-up"],
      conditions: ["Support at least one club event per semester", "Renew membership yearly"],
    },
    achievements: [
      { title: "Inter-University Cultural Fest", year: "2025", desc: "Won best overall performance at an inter-university cultural festival." },
      { title: "Annual Cultural Night", year: "2024", desc: "Hosted the club's largest cultural night to date with 1,000+ attendees." },
    ],
    about: {
      history: "The Cultural Club has been the home of music, dance and drama at IIUC for years, organising the campus's biggest festivals and performance nights.",
      mission: "To celebrate and preserve cultural heritage while giving students a creative outlet.",
      vision: "To make IIUC's cultural events the most anticipated on campus.",
      activities: ["Festivals", "Talent hunts", "Cultural nights", "Workshops in music and dance"],
      contact: [{ label: "Facebook", value: "fb.com/iiucculturalclub", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Performance Opportunities", desc: "Stage time at campus festivals and cultural nights." },
      { title: "Skill Development", desc: "Workshops in music, dance and drama." },
      { title: "Community", desc: "A tight-knit creative community celebrating shared traditions." },
      { title: "Leadership", desc: "Organise and lead major campus cultural events." },
      { title: "Certificates", desc: "Certificates for event participation and organising roles." },
      { title: "Networking", desc: "Connect with performers and cultural clubs from other universities." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "Bangla", batch: "48" },
      { name: "Sample Name", position: "General Secretary", department: "BBA", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "CSE", batch: "49" },
      { name: "Sample Name", position: "Executive Member", department: "English", batch: "50" },
    ],
    membership: { fee: 150, paymentMethods: { bkash: "01700-000060", nagad: "01700-000061", rocket: "01700-000062" } },
  },

  "sports-club": {
    name: "IIUC Sports Club",
    short: "Sports",
    tagline: "Play. Compete. Belong.",
    description:
      "The official sports club organising tournaments, training sessions and inter-university competitions across cricket, football, badminton and more.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Sports" },
      { label: "Focus", value: "Cricket, football, badminton, athletics" },
    ],
    stats: [
      { value: "8+", label: "Tournaments / Year" },
      { value: "5", label: "Sports Covered" },
      { value: "400+", label: "Members" },
    ],
    announcements: [
      { title: "Inter-Department Cricket League", date: "2025-09-18", desc: "Registration open for the annual inter-department cricket league.", more: "Each department can field one team of 15 players." },
      { title: "Badminton Championship", date: "2025-08-29", desc: "Singles and doubles badminton championship for all students.", more: "Rackets available to borrow at the sports complex." },
      { title: "Football Trials", date: "2025-10-10", desc: "Open trials for the university football team ahead of the inter-university league.", more: "Bring your own boots; jerseys provided for selected players." },
    ],
    members: [
      { name: "President", role: "President", dept: "Sports Science" },
      { name: "Vice President", role: "Vice President", dept: "CSE" },
      { name: "General Secretary", role: "Secretary", dept: "BBA" },
      { name: "Treasurer", role: "Treasurer", dept: "EEE" },
      { name: "Cricket Captain", role: "Captain", dept: "CSE" },
      { name: "Football Captain", role: "Captain", dept: "BBA" },
    ],
    requirements: {
      who: ["Any student interested in playing or supporting university sports"],
      eligibility: ["Active IIUC student ID", "Medical fitness for the chosen sport"],
      joining: ["Fill in the registration form", "Pay the membership fee", "Attend team trials if trying out for a squad"],
      conditions: ["Attend scheduled practices for the sport you join", "Renew membership yearly"],
    },
    achievements: [
      { title: "Inter-University Football League Champions", year: "2025", desc: "Won the regional inter-university football league." },
      { title: "Cricket Tournament Runners-up", year: "2024", desc: "Finished as runners-up in the national inter-university cricket tournament." },
    ],
    about: {
      history: "The Sports Club has represented IIUC in inter-university competitions for years, building teams across multiple sports and running the university's biggest campus tournaments.",
      mission: "To promote fitness, teamwork and competitive spirit among IIUC students.",
      vision: "To make IIUC a dominant force in inter-university sports.",
      activities: ["Inter-department leagues", "Inter-university tournaments", "Training sessions", "Fitness camps"],
      contact: [{ label: "Facebook", value: "fb.com/iiucsportsclub", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Team Training", desc: "Structured practice sessions with coaches and captains." },
      { title: "Tournaments", desc: "Compete in campus, inter-department and inter-university events." },
      { title: "Fitness", desc: "Stay active with regular training and fitness camps." },
      { title: "Leadership", desc: "Captain or organise teams and tournaments." },
      { title: "Certificates", desc: "Certificates and awards for tournament performance." },
      { title: "Networking", desc: "Connect with athletes across departments and universities." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "Sports Science", batch: "47" },
      { name: "Sample Name", position: "General Secretary", department: "BBA", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "EEE", batch: "48" },
      { name: "Sample Name", position: "Organizing Secretary", department: "CSE", batch: "49" },
      { name: "Sample Name", position: "Executive Member", department: "BBA", batch: "50" },
    ],
    membership: { fee: 200, paymentMethods: { bkash: "01700-000070", nagad: "01700-000071", rocket: "01700-000072" } },
  },

  "volunteer-circle": {
    name: "IIUC Volunteer Circle",
    short: "Volunteers",
    tagline: "Do good, together",
    description:
      "A community-service club organising blood drives, relief campaigns and campus clean-up initiatives for students who want to give back.",
    info: [
      { label: "University", value: "International Islamic University Chittagong (IIUC)" },
      { label: "Type", value: "Social / Community Service" },
      { label: "Focus", value: "Volunteering, relief work, community service" },
    ],
    stats: [
      { value: "10+", label: "Campaigns / Year" },
      { value: "500+", label: "Blood Units Collected" },
      { value: "300+", label: "Volunteers" },
    ],
    announcements: [
      { title: "Campus Blood Drive", date: "2025-09-22", desc: "Donate blood and help build the club's emergency donor database.", more: "Free health check-up provided for all donors." },
      { title: "Flood Relief Campaign", date: "2025-08-15", desc: "Collecting funds and supplies for flood-affected communities.", more: "Donations accepted in cash, kind, or via mobile banking." },
      { title: "Campus Clean-Up Day", date: "2025-10-03", desc: "A day dedicated to cleaning and greening the university campus.", more: "Gloves, bags and refreshments provided to all volunteers." },
    ],
    members: [
      { name: "President", role: "President", dept: "Public Health" },
      { name: "Vice President", role: "Vice President", dept: "CSE" },
      { name: "General Secretary", role: "Secretary", dept: "BBA" },
      { name: "Treasurer", role: "Treasurer", dept: "Economics" },
      { name: "Campaign Lead", role: "Lead", dept: "Public Health" },
    ],
    requirements: {
      who: ["Any student who wants to volunteer and give back to the community"],
      eligibility: ["Active IIUC student ID", "Willingness to participate in campaigns and events"],
      joining: ["Fill in the registration form", "Pay the membership fee", "Attend the orientation session"],
      conditions: ["Participate in at least one campaign per semester", "Renew membership yearly"],
    },
    achievements: [
      { title: "1,000 Blood Units Milestone", year: "2025", desc: "Crossed 1,000 cumulative blood units collected since founding." },
      { title: "Flood Relief Recognition", year: "2024", desc: "Recognised by the local administration for flood relief efforts." },
    ],
    about: {
      history: "Volunteer Circle started as a small group organising blood donation camps and has grown into IIUC's main platform for community service and relief work.",
      mission: "To build a culture of service and social responsibility among IIUC students.",
      vision: "To make community service a core part of the IIUC student experience.",
      activities: ["Blood drives", "Relief campaigns", "Campus clean-ups", "Awareness programs"],
      contact: [{ label: "Facebook", value: "fb.com/iiucvolunteercircle", href: "https://facebook.com" }],
    },
    benefits: [
      { title: "Community Impact", desc: "Directly contribute to campaigns that help real people." },
      { title: "Leadership", desc: "Lead and organise campus-wide relief and service campaigns." },
      { title: "Certificates", desc: "Certificates for volunteering hours and campaign leadership." },
      { title: "Networking", desc: "Connect with like-minded students and NGOs." },
      { title: "Skill Development", desc: "Build organisational and crisis-response skills." },
      { title: "Recognition", desc: "Featured recognition for outstanding volunteer contributions." },
    ],
    executives: [
      { name: "Sample Name", position: "Chairperson", department: "Public Health", batch: "48" },
      { name: "Sample Name", position: "General Secretary", department: "BBA", batch: "48" },
      { name: "Sample Name", position: "Treasurer", department: "Economics", batch: "49" },
      { name: "Sample Name", position: "Executive Member", department: "CSE", batch: "50" },
    ],
    membership: { fee: 150, paymentMethods: { bkash: "01700-000080", nagad: "01700-000081", rocket: "01700-000082" } },
  },
};

export default clubs;
