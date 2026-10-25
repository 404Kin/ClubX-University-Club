# ClubX — University Club Management System

A centralized web platform for managing university clubs, memberships, events, and attendance — built as a CSE department project.

##  Features

- Role-based access — Student, Club Executive, Administrator
- Browse clubs and apply for membership
- Register for events and track attendance (QR-based)
- Announcements and real-time notifications
- Centralized dashboards for club operations

##  Tech Stack

- **Frontend:** React 19 (Vite), React Router
- **Icons:** react-icons
- **Deployment:** GitHub Pages (`gh-pages`)
- **Backend (planned):** Node.js, Express.js
- **Database (planned):** MongoDB
- **Auth (planned):** Firebase

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
├── public/                    # Static assets served as-is
├── src/
│   ├── assets/                 # Images used by components (gallery, event, mission photos)
│   ├── components/
│   │   ├── Navbar.jsx           # Top nav bar with search and menu, active-link highlighting
│   │   ├── Hero.jsx              # Landing hero section with drifting club tag decorations
│   │   ├── ClubDiscovery.jsx     # Home page club directory: search + category filters
│   │   ├── ClubPreview.jsx       # Compact club row used inside ClubDiscovery
│   │   ├── CampusPulse.jsx       # "What's happening" live activity feed section
│   │   ├── Events.jsx            # Events section wrapper, renders a list of EventCards
│   │   ├── EventCard.jsx         # Single event "poster" row with date, details, RSVP
│   │   ├── Announcements.jsx     # Announcements section, aggregates posts from all clubs
│   │   ├── AnnouncementRow.jsx   # Single announcement row with formatted date
│   │   ├── Mission.jsx           # Editorial "Connect / Discover / ..." mission steps section
│   │   ├── Gallery.jsx           # Scrollable photo gallery section
│   │   ├── Footer.jsx            # Site footer with links
│   │   ├── Login.jsx             # Login/signup toggle screen
│   │   ├── Register.jsx          # Registration form component
│   │   ├── JoinClub.jsx          # Frontend-only join-a-club flow (idle → sending → joined)
│   │   ├── IntroScreen.jsx       # One-time animated intro splash (+ IntroScreen.css)
│   │   ├── SectionHeader.jsx     # Reusable eyebrow/title/lead heading used across sections
│   │   └── Icons.jsx             # Shared inline SVG icon components
│   ├── pages/
│   │   ├── ClubDetails.jsx       # Generic club profile page, reads a club by slug via useParams
│   │   ├── ComputerClub.jsx      # Computer Club-specific page
│   │   ├── IEEE.jsx              # IEEE IIUC Student Branch page
│   │   └── IIUCPS.jsx            # IIUCPS club page
│   ├── data/
│   │   ├── clubs.js              # Club profile data keyed by slug (members, announcements, etc.)
│   │   ├── directory.js          # Club discovery directory + category list for the home page
│   │   ├── events.js             # Sample event data
│   │   └── pulse.js              # Sample "campus pulse" activity feed data
│   ├── hooks/
│   │   └── useReveal.js          # Scroll-triggered reveal animation hook ([data-reveal])
│   ├── styles/                   # Global/page-level CSS (e.g. home.css)
│   ├── App.jsx                   # Routes, layout composition, scroll restoration
│   ├── App.css                   # App-wide styles
│   └── main.jsx                  # React entry point
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
=======


> **Note:** `data/` files are sample/mock data (see in-file `NOTE`/`TODO` comments) standing in until the backend and database are built.

##  Screenshots
### Hero Section
<img width="1842" height="852" alt="image" src="<img width="1306" height="603" alt="image" src="https://github.com/user-attachments/assets/f584de04-881c-4525-8342-50777078fdd5" />
" />

### Find the Community
<img width="1839" height="810" alt="image" src="<img width="1306" height="603" alt="image" src="https://github.com/user-attachments/assets/852048ed-22a2-4e94-b7ed-5d791f81685b" />
" />

### Events Section
<img width="1853" height="826" alt="image" src="<img width="1306" height="603" alt="image" src="https://github.com/user-attachments/assets/529a9f80-99a3-4d6e-bf64-0c0efce98b06" />
" />

### Gallery Section
<img width="1760" height="826" alt="image" src="<img width="1349" height="612" alt="image" src="https://github.com/user-attachments/assets/08823190-3fc3-4969-8668-fdcbf0b1a57f" />
" />

##  Roadmap

- [x] Landing page with hero
- [x] Club discovery and campus pulse sections
- [x] Events section with cards
- [x] Announcements section
- [x] Mission section with editorial layout
- [x] Gallery section
- [x] Club detail pages (IIUCPS, IEEE, Computer Club)
- [x] Login / register / join club flows (UI)
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

##
**Live Demo:** [https://404kin.github.io/ClubX-University-Club/](https://404kin.github.io/ClubX-University-Club/)

##  License

Academic project — not for commercial use.
