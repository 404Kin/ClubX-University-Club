// import event1 from "../assets/event1.jpg";
// import event2 from "../assets/event2.jpg";
// import event3 from "../assets/event3.jpg";


// const events = [
//   {
//     id: "ieee-workshop",
//     src: event1,
//     title: "IEEE Tech Workshop",
//     club: "IEEE Student Branch",
//     desc: "Hands-on workshop on IoT and Embedded Systems. Build real-world projects with mentors.",
//     day: "28",
//     month: "Sep",
//     year: "2025",
//     place: "CSE Seminar Hall",
//     time: "10:00 AM – 1:00 PM",
//     seats: [42, 60],
//   },
//   {
//     id: "programming-contest",
//     src: event2,
//     title: "Inter-Department Programming Contest",
//     club: "Computer Club",
//     desc: "Algorithmic battle across departments. Team up, solve, and win.",
//     day: "30",
//     month: "Sep",
//     year: "2025",
//     place: "Computer Lab, Bldg 2",
//     time: "9:00 AM – 12:00 PM",
//     seats: [78, 100],
//   },
//   {
//     id: "career-seminar",
//     src: event3,
//     title: "Career Guidance Seminar",
//     club: "IIUCPS",
//     desc: "Industry experts talk internships, CV building, and career paths.",
//     day: "05",
//     month: "Oct",
//     year: "2025",
//     place: "Main Auditorium",
//     time: "2:00 PM – 5:00 PM",
//     seats: [130, 200],
//   },
// ];

// export default events;


import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";

export const events = [
  {
    id: "ieee-workshop",
    src: event1,
    title: "IEEE Tech Workshop 2025",
    club: "IEEE Student Branch",
    category: "Workshop",
    desc: "Hands-on workshop on IoT and Embedded Systems. Build real-world projects with mentors and industry experts.",
    longDesc:
      "This workshop is designed for students who want to move beyond theory and build real IoT projects. You'll work with microcontrollers, sensors, and cloud platforms under the guidance of experienced mentors. Whether you're just starting out or already familiar with embedded systems, you'll leave with a working prototype and a strong foundation in IoT development.",
    day: "28",
    month: "Sep",
    year: "2025",
    time: "10:00 AM – 1:00 PM",
    place: "CSE Seminar Hall, Academic Building",
    seats: [42, 60],
    fee: 0,
    deadline: "25 Sep 2025",
    schedule: [
      { time: "10:00 AM", item: "Registration & Welcome" },
      { time: "10:30 AM", item: "Introduction to IoT & Embedded Systems" },
      { time: "11:15 AM", item: "Hands-on Session: Build Your First Sensor" },
      { time: "12:15 PM", item: "Q&A with Mentors" },
      { time: "01:00 PM", item: "Closing & Certificate Distribution" },
    ],
    speakers: [
      { name: "Dr. Ahsan Habib", role: "Professor, Dept. of CSE" },
      { name: "Engr. Rakib Hasan", role: "IoT Engineer, Grameenphone" },
    ],
    learn: [
      "Understand the fundamentals of IoT and embedded systems",
      "Work hands-on with Arduino and sensors",
      "Connect devices to the cloud",
      "Build a working prototype by the end of the session",
    ],
  },

  {
    id: "programming-contest",
    src: event2,
    title: "Inter-Department Programming Contest",
    club: "IIUC Computer Club",
    category: "Contest",
    desc: "Algorithmic battle across departments. Team up, solve problems, and win exciting prizes.",
    longDesc:
      "The Inter-Department Programming Contest brings together the brightest coders from every department of IIUC. Teams of 3 will compete to solve algorithmic problems within a limited time. This is your chance to test your problem-solving skills, learn from peers, and represent your department on the winner's podium.",
    day: "30",
    month: "Sep",
    year: "2025",
    time: "9:00 AM – 12:00 PM",
    place: "Computer Lab, Building 2",
    seats: [78, 100],
    fee: 200,
    deadline: "28 Sep 2025",
    schedule: [
      { time: "09:00 AM", item: "Team Registration & Setup" },
      { time: "09:30 AM", item: "Contest Begins" },
      { time: "11:30 AM", item: "Contest Ends" },
      { time: "12:00 PM", item: "Result Announcement & Prize Giving" },
    ],
    speakers: [
      { name: "Prof. Mahmudul Hasan", role: "Head, Dept. of CSE" },
      { name: "Tanvir Ahmed", role: "ICPC Regional Finalist" },
    ],
    learn: [
      "Sharpen algorithmic thinking under time pressure",
      "Learn from competitive programmers",
      "Compete for prize money and certificates",
      "Build teamwork and communication skills",
    ],
  },

  {
    id: "career-seminar",
    src: event3,
    title: "Career Guidance Seminar",
    club: "IIUCPS",
    category: "Seminar",
    desc: "Industry experts talk internships, CV building, and career paths for CSE students.",
    longDesc:
      "Confused about what to do after graduation? This seminar brings together industry professionals, HR experts, and successful alumni to guide you through the career maze. You'll learn how to build a strong CV, prepare for interviews, and choose the right career path — whether it's software engineering, data science, or higher studies.",
    day: "05",
    month: "Oct",
    year: "2025",
    time: "2:00 PM – 5:00 PM",
    place: "Main Auditorium",
    seats: [130, 200],
    fee: 0,
    deadline: "03 Oct 2025",
    schedule: [
      { time: "02:00 PM", item: "Welcome & Introduction" },
      { time: "02:30 PM", item: "Keynote: Building a Career in Tech" },
      { time: "03:30 PM", item: "Panel: Internships & First Jobs" },
      { time: "04:15 PM", item: "Interactive Q&A Session" },
      { time: "05:00 PM", item: "Closing & Networking" },
    ],
    speakers: [
      { name: "Farhana Rahman", role: "HR Lead, Brain Station 23" },
      { name: "Sajid Karim", role: "Software Engineer, Samsung R&D" },
    ],
    learn: [
      "Understand the current job market for CSE graduates",
      "Learn how to build a strong CV",
      "Prepare for technical and HR interviews",
      "Explore higher study options abroad",
    ],
  },
];

export const getEventById = (id) => events.find((e) => e.id === id);

export default events;