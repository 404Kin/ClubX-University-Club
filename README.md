# ClubX — University Club Management System

A centralized web platform for managing university clubs, memberships, events, and attendance — built as a CSE department project.

##  Features

- Role-based access — Student, Club Executive, Administrator
- Browse clubs and apply for membership
- Register for events and track attendance (QR-based)
- Announcements and real-time notifications
- Centralized dashboards for club operations

##  Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** Firebase

##  Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/404Kin/ClubX.git
cd ClubX
npm install
npm run dev
```

The app will start at `http://localhost:5173`.

##  Project Structure

```
ClubX/
├── public/
│   └── icons.svg
├── src/
│   ├── assets/           
│   ├── components/       
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Mission.jsx
│   │   ├── Events.jsx
│   │   ├── Gallery.jsx
│   │   └── Login.jsx
│   ├── pages/            
│   │   └── IIUCPS.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

##  Screenshots
### Hero Section
<img width="1842" height="852" alt="image" src="https://github.com/user-attachments/assets/9c87b83d-d687-457f-aa63-18c88d20c7bb" />

### Mission Section
<img width="1839" height="810" alt="image" src="https://github.com/user-attachments/assets/81c91947-4961-4656-8083-18130404d9b6" />

### Events Section
<img width="1853" height="826" alt="image" src="https://github.com/user-attachments/assets/d378bec1-1a33-4923-b318-7cf0a7a99994" />

### Gallery Section
<img width="1760" height="826" alt="image" src="https://github.com/user-attachments/assets/6fafe60c-263d-41cb-badd-c3007b9a6d9a" />

##  Roadmap

- [x] Landing page with hero
- [x] Mission section with editorial layout
- [x] Events and Gallery sections
- [x] IIUCPS club detail page
- [ ] Student dashboard
- [ ] Club executive dashboard
- [ ] Admin panel
- [ ] QR-based attendance system
- [ ] Firebase authentication
- [ ] Real-time notifications

## 👥 Authors

- **Hosaina Jabara Razty** — C241462
- **Fabiya Anjum** — C241470

##  Supervisor

**Fathema Tuj Johora** — Lecturer, Dept. of CSE

##**Live Demo:** [https://404kin.github.io/ClubX-University-Club/](https://404kin.github.io/ClubX-University-Club/)

##  License

Academic project — not for commercial use.
