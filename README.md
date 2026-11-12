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
- **Deployment:** GitHub Pages (`gh-pages`) for the frontend; deploy the API separately
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT and bcrypt

##  Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/404Kin/ClubX-University-Club.git
cd ClubX
npm install
```

Configure and start the backend in one terminal:

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, then set the Atlas URI and a private
`JWT_SECRET`. Start the API with `npm run dev`; it listens on port 5000 by default.
The health endpoint is `http://localhost:5000/api/health`.

In a second terminal, from the repository root, run `npm run dev`. The app opens at
`http://localhost:5173`. Set `VITE_API_URL` to the deployed API base URL (including
`/api`) when building for a hosted environment; its local default is
`http://localhost:5000/api`.

Student self-registration cannot create executive or administrator accounts.
Sign in as an administrator, create each club (adding its verified cover image
by URL or JPEG/PNG/WebP upload), then choose **Add club executive** in the admin
dashboard. A club can have multiple executive accounts with different
positions; share each account's login credentials with its executive.
Membership applications are associated with the club ID and appear in that
club's executive dashboard. Approved applications update the live member count
and are shown on the club page; students can view their application statuses in
their dashboard. Executives can post club announcements, create events, and
reply to club support conversations. Administrators can edit clubs, manage
executive accounts, and reply to system support conversations.

## Club data sources

Club records are served by ClubX's MongoDB API. The IIUC public website and its
published sitemap do not document a public club-directory API, and the guessed
`/clubs` page returns 404. Use club information confirmed by the university or
the club's official channels and enter it through the ClubX admin dashboard;
avoid treating third-party or scraped listings as authoritative.

## Project Structure

```
ClubX/
├── backend/
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # Express API routes
│   └── server.js               # API startup and database connection
├── src/
│   ├── assets/                 # Local presentation artwork
│   ├── components/             # Shared and home-page components
│   ├── hooks/useReveal.js      # Scroll reveals, including fetched content
│   ├── lib/api.js              # Configurable backend API URL
│   ├── pages/                  # Club, event, auth, and dashboard pages
│   └── styles/                 # Global and page-level styles
├── .gitignore
├── package.json
└── README.md
```

Club, event, and announcement facts are loaded from the backend. Local images and
editorial sections are presentation assets, not an authoritative source of club facts.

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
- [x] Student dashboard
- [x] Club executive dashboard
- [x] Admin panel
- [x] QR event tickets and verified attendance recording
- [x] JWT authentication
- [ ] Real-time notifications
- [ ] Password recovery and email notifications

## 👥 Authors

- **Hosaina Jabara Razty** — C241462
- **Fabiya Anjum** — C241470

##  Supervisor

**Fathema Tuj Johora** — Lecturer, Dept. of CSE

##
**Live Demo:** [https://404kin.github.io/ClubX-University-Club/](https://404kin.github.io/ClubX-University-Club/)

##  License

Academic project — not for commercial use.
