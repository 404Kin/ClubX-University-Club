// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import { mockAdmin } from "../data/demoUsers";
// // import {
// //   FaUsers, FaUniversity, FaCalendarAlt, FaUserTie,
// //   FaSignOutAlt, FaPlus, FaBullhorn, FaCog, FaCrown,
// // } from "react-icons/fa";

// // function AdminDashboard() {
// //   const [user, setUser] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const stored = localStorage.getItem("clubx_user");
// //     if (!stored) { navigate("/login"); return; }
// //     const parsed = JSON.parse(stored);
// //     if (parsed.role !== "admin") { navigate("/login"); return; }
// //     setUser(parsed);
// //   }, [navigate]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("clubx_user");
// //     navigate("/login");
// //   };

// //   if (!user) return null;

// //   const a = {
// //     ...mockAdmin,
// //     name: user.name || mockAdmin.name,
// //   };

// //   const [lead, ...restAnnouncements] = a.announcements;

// //   return (
// //     <>
// //       <Navbar />
// //       <main className="ldg-page admin">
// //         <div className="ldg-wrap">

// //           {/* ============ IDENTITY RAIL ============ */}
// //           <aside className="ldg-rail">
// //             <div className="ldg-badge"><FaCrown /></div>
// //             <span className="ldg-eyebrow">Administrator</span>
// //             <h1>System control</h1>
// //             <p className="ldg-rail__sub">{a.name} · full system access</p>

// //             <div className="ldg-perf" aria-hidden="true" />

// //             <div className="ldg-hero">
// //               <span className="ldg-hero__num grad-text">{a.stats.users.toLocaleString()}</span>
// //               <span className="ldg-hero__label">Total users</span>
// //             </div>

// //             <ul className="ldg-stats">
// //               <li><FaUniversity /> <strong>{a.stats.clubs}</strong> total clubs</li>
// //               <li><FaCalendarAlt /> <strong>{a.stats.events}</strong> total events</li>
// //               <li><FaUserTie /> <strong>{a.stats.executives}</strong> executives</li>
// //             </ul>

// //             <div className="ldg-quick">
// //               <button type="button">
// //                 <span><FaPlus /> Create club</span>
// //               </button>
// //               <button type="button">
// //                 <span><FaBullhorn /> System announcement</span>
// //               </button>
// //               <button type="button">
// //                 <span><FaCog /> Settings</span>
// //               </button>
// //             </div>

// //             <button className="ldg-logout" onClick={handleLogout}>
// //               <FaSignOutAlt /> Log out
// //             </button>
// //           </aside>

// //           {/* ============ LEDGER ============ */}
// //           <div className="ldg-main">

// //             <section>
// //               <div className="ldg-section__head">
// //                 <h2>All clubs</h2>
// //               </div>
// //               <ul className="ldg-rows">
// //                 {a.clubs.map((c, i) => (
// //                   <li key={i}>
// //                     <span className="ldg-mark">{c.name.slice(0, 2).toUpperCase()}</span>
// //                     <div className="ldg-row-body">
// //                       <strong>{c.name}</strong>
// //                       <small>{c.members} members</small>
// //                     </div>
// //                     <span className="ldg-row-meta">{c.executive}</span>
// //                     <button className="btn-mini">Manage</button>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </section>

// //             <section>
// //               <div className="ldg-section__head">
// //                 <h2>User breakdown</h2>
// //               </div>
// //               <div className="ldg-userbars">
// //                 <div>
// //                   <div className="ldg-userbar__top">
// //                     <span>Students</span>
// //                     <strong>{a.userStats.students.toLocaleString()}</strong>
// //                   </div>
// //                   <div className="ldg-userbar__track">
// //                     <i style={{ width: `${(a.userStats.students / a.stats.users) * 100}%` }} />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="ldg-userbar__top">
// //                     <span>Executives</span>
// //                     <strong>{a.userStats.executives}</strong>
// //                   </div>
// //                   <div className="ldg-userbar__track mint">
// //                     <i style={{ width: `${(a.userStats.executives / a.stats.users) * 100}%` }} />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="ldg-userbar__top">
// //                     <span>Admins</span>
// //                     <strong>{a.userStats.admins}</strong>
// //                   </div>
// //                   <div className="ldg-userbar__track gold">
// //                     <i style={{ width: `${(a.userStats.admins / a.stats.users) * 100}%` }} />
// //                   </div>
// //                 </div>
// //               </div>
// //             </section>

// //             {lead && (
// //               <section className="ann ann--lead">
// //                 <div className="ann__top">
// //                   <span className="ann__club">System</span>
// //                   <span className="ann__badge">{lead.date}</span>
// //                 </div>
// //                 <h3>{lead.title}</h3>
// //               </section>
// //             )}

// //             {restAnnouncements.length > 0 && (
// //               <section>
// //                 <div className="ldg-section__head">
// //                   <h2>More announcements</h2>
// //                 </div>
// //                 <div className="ann-list">
// //                   {restAnnouncements.map((an, i) => (
// //                     <div className="ann" key={i}>
// //                       <div className="ann__top">
// //                         <span className="ann__club">System</span>
// //                       </div>
// //                       <h3>{an.title}</h3>
// //                       <small>{an.date}</small>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}

// //           </div>
// //         </div>
// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }

// // export default AdminDashboard;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { mockAdmin } from "../data/demoUsers";
// import {
//   FaUsers, FaUniversity, FaCalendarAlt, FaUserTie,
//   FaSignOutAlt, FaPlus, FaBullhorn, FaCog, FaCrown,
//   FaTimes, FaTrash, FaEdit, FaSave,
// } from "react-icons/fa";

// function AdminDashboard() {
//   const [user, setUser] = useState(null);
//   const [clubs, setClubs] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [editingClub, setEditingClub] = useState(null);
//   const [newClub, setNewClub] = useState({
//     name: "",
//     short: "",
//     category: "",
//     description: "",
//     executive: "",
//     members: 0,
//   });
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // Load user + clubs
//   useEffect(() => {
//     const stored = localStorage.getItem("clubx_user");
//     if (!stored) { navigate("/login"); return; }
//     const parsed = JSON.parse(stored);
//     if (parsed.role !== "admin") { navigate("/login"); return; }
//     setUser(parsed);

//     const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
//     const defaultClubs = mockAdmin.clubs.map((c, i) => ({
//       ...c,
//       id: `default-${i}`,
//     }));
//     setClubs([...custom, ...defaultClubs]);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("clubx_user");
//     navigate("/login");
//   };

//   const handleChange = (e) => {
//     setNewClub({ ...newClub, [e.target.name]: e.target.value });
//   };

//   // ============ CREATE ============
//   const handleCreateClub = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!newClub.name.trim()) {
//       setError("Club name is required.");
//       return;
//     }
//     if (!newClub.short.trim() || newClub.short.length > 3) {
//       setError("Short name (2-3 letters) is required.");
//       return;
//     }
//     if (!newClub.category.trim()) {
//       setError("Category is required.");
//       return;
//     }
//     if (
//       clubs.find(
//         (c) => c.name.toLowerCase() === newClub.name.trim().toLowerCase()
//       )
//     ) {
//       setError("A club with this name already exists.");
//       return;
//     }

//     const clubToAdd = {
//       id: `club-${Date.now()}`,
//       name: newClub.name.trim(),
//       short: newClub.short.trim().toUpperCase(),
//       category: newClub.category.trim(),
//       description: newClub.description.trim(),
//       executive: newClub.executive.trim() || "Unassigned",
//       members: Number(newClub.members) || 0,
//       createdAt: new Date().toISOString(),
//     };

//     const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
//     localStorage.setItem("clubx_clubs", JSON.stringify([clubToAdd, ...custom]));

//     setClubs([clubToAdd, ...clubs]);
//     setNewClub({
//       name: "", short: "", category: "",
//       description: "", executive: "", members: 0,
//     });
//     setShowCreateModal(false);
//   };

//   // ============ UPDATE ============
//   const handleUpdateClub = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!editingClub.name.trim()) {
//       setError("Club name is required.");
//       return;
//     }

//     const updated = { ...editingClub };

//     // Update in state
//     setClubs(clubs.map((c) => (c.id === updated.id ? updated : c)));

//     // If it's a custom club, update in localStorage
//     if (updated.id.startsWith("club-")) {
//       const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
//       const updatedCustom = custom.map((c) =>
//         c.id === updated.id ? updated : c
//       );
//       localStorage.setItem("clubx_clubs", JSON.stringify(updatedCustom));
//     }

//     setEditingClub(null);
//   };

//   // ============ DELETE ============
//   const handleDeleteClub = (club) => {
//     const isDefault = club.id.startsWith("default-");

//     const message = isDefault
//       ? `"${club.name}" is a default club. Deleting it will only hide it from the current session. Continue?`
//       : `Delete "${club.name}" permanently?`;

//     if (!window.confirm(message)) return;

//     if (!isDefault) {
//       const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
//       const updated = custom.filter((c) => c.id !== club.id);
//       localStorage.setItem("clubx_clubs", JSON.stringify(updated));
//     }

//     setClubs(clubs.filter((c) => c.id !== club.id));
//   };

//   if (!user) return null;

//   const a = {
//     ...mockAdmin,
//     name: user.name || mockAdmin.name,
//   };

//   const [lead, ...restAnnouncements] = a.announcements;

//   return (
//     <>
//       <Navbar />
//       <main className="ldg-page admin">
//         <div className="ldg-wrap">

//           {/* IDENTITY RAIL */}
//           <aside className="ldg-rail">
//             <div className="ldg-badge"><FaCrown /></div>
//             <span className="ldg-eyebrow">Administrator</span>
//             <h1>System control</h1>
//             <p className="ldg-rail__sub">{a.name} · full system access</p>

//             <div className="ldg-perf" aria-hidden="true" />

//             <div className="ldg-hero">
//               <span className="ldg-hero__num grad-text">
//                 {a.stats.users.toLocaleString()}
//               </span>
//               <span className="ldg-hero__label">Total users</span>
//             </div>

//             <ul className="ldg-stats">
//               <li><FaUniversity /> <strong>{clubs.length}</strong> total clubs</li>
//               <li><FaCalendarAlt /> <strong>{a.stats.events}</strong> total events</li>
//               <li><FaUserTie /> <strong>{a.stats.executives}</strong> executives</li>
//             </ul>

//             <div className="ldg-quick">
//               <button type="button" onClick={() => setShowCreateModal(true)}>
//                 <span><FaPlus /> Create club</span>
//               </button>
//               <button type="button">
//                 <span><FaBullhorn /> System announcement</span>
//               </button>
//               <button type="button">
//                 <span><FaCog /> Settings</span>
//               </button>
//             </div>

//             <button className="ldg-logout" onClick={handleLogout}>
//               <FaSignOutAlt /> Log out
//             </button>
//           </aside>

//           {/* LEDGER */}
//           <div className="ldg-main">

//             <section>
//               <div className="ldg-section__head">
//                 <h2>All clubs</h2>
//                 <button
//                   className="btn-mini create"
//                   onClick={() => setShowCreateModal(true)}
//                 >
//                   <FaPlus /> New club
//                 </button>
//               </div>
//               <ul className="ldg-rows">
//                 {clubs.map((c) => (
//                   <li key={c.id}>
//                     <span className="ldg-mark">
//                       {(c.short || c.name.slice(0, 2)).toUpperCase()}
//                     </span>
//                     <div className="ldg-row-body">
//                       <strong>{c.name}</strong>
//                       <small>
//                         {c.members} members
//                         {c.category && ` · ${c.category}`}
//                       </small>
//                     </div>
//                     <span className="ldg-row-meta">{c.executive}</span>
//                     <div className="ldg-row-actions">
//                       <button
//                         className="btn-mini"
//                         onClick={() => setEditingClub({ ...c })}
//                       >
//                         Manage
//                       </button>
//                       <button
//                         className="btn-icon danger"
//                         onClick={() => handleDeleteClub(c)}
//                         aria-label={`Delete ${c.name}`}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </section>

//             <section>
//               <div className="ldg-section__head">
//                 <h2>User breakdown</h2>
//               </div>
//               <div className="ldg-userbars">
//                 <div>
//                   <div className="ldg-userbar__top">
//                     <span>Students</span>
//                     <strong>{a.userStats.students.toLocaleString()}</strong>
//                   </div>
//                   <div className="ldg-userbar__track">
//                     <i style={{ width: `${(a.userStats.students / a.stats.users) * 100}%` }} />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="ldg-userbar__top">
//                     <span>Executives</span>
//                     <strong>{a.userStats.executives}</strong>
//                   </div>
//                   <div className="ldg-userbar__track mint">
//                     <i style={{ width: `${(a.userStats.executives / a.stats.users) * 100}%` }} />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="ldg-userbar__top">
//                     <span>Admins</span>
//                     <strong>{a.userStats.admins}</strong>
//                   </div>
//                   <div className="ldg-userbar__track gold">
//                     <i style={{ width: `${(a.userStats.admins / a.stats.users) * 100}%` }} />
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {lead && (
//               <section className="ann ann--lead">
//                 <div className="ann__top">
//                   <span className="ann__club">System</span>
//                   <span className="ann__badge">{lead.date}</span>
//                 </div>
//                 <h3>{lead.title}</h3>
//               </section>
//             )}

//             {restAnnouncements.length > 0 && (
//               <section>
//                 <div className="ldg-section__head">
//                   <h2>More announcements</h2>
//                 </div>
//                 <div className="ann-list">
//                   {restAnnouncements.map((an, i) => (
//                     <div className="ann" key={i}>
//                       <div className="ann__top">
//                         <span className="ann__club">System</span>
//                       </div>
//                       <h3>{an.title}</h3>
//                       <small>{an.date}</small>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* ============ CREATE CLUB MODAL ============ */}
//       {showCreateModal && (
//         <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal__head">
//               <div>
//                 <span className="modal__eyebrow">Admin</span>
//                 <h2>Create a new club</h2>
//               </div>
//               <button
//                 className="modal__close"
//                 onClick={() => setShowCreateModal(false)}
//                 aria-label="Close"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <form onSubmit={handleCreateClub} className="modal__body">
//               <div className="modal__field">
//                 <label htmlFor="name">Club name *</label>
//                 <input
//                   id="name"
//                   type="text"
//                   name="name"
//                   value={newClub.name}
//                   onChange={handleChange}
//                   placeholder="e.g., IIUC Robotics Club"
//                   autoFocus
//                 />
//               </div>

//               <div className="modal__row">
//                 <div className="modal__field">
//                   <label htmlFor="short">Short name * (2-3 letters)</label>
//                   <input
//                     id="short"
//                     type="text"
//                     name="short"
//                     value={newClub.short}
//                     onChange={handleChange}
//                     placeholder="e.g., IRC"
//                     maxLength={3}
//                   />
//                 </div>
//                 <div className="modal__field">
//                   <label htmlFor="category">Category *</label>
//                   <input
//                     id="category"
//                     type="text"
//                     name="category"
//                     value={newClub.category}
//                     onChange={handleChange}
//                     placeholder="e.g., Technology"
//                   />
//                 </div>
//               </div>

//               <div className="modal__field">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={newClub.description}
//                   onChange={handleChange}
//                   placeholder="Short description"
//                   rows={3}
//                 />
//               </div>

//               <div className="modal__row">
//                 <div className="modal__field">
//                   <label htmlFor="executive">Assign executive</label>
//                   <input
//                     id="executive"
//                     type="text"
//                     name="executive"
//                     value={newClub.executive}
//                     onChange={handleChange}
//                     placeholder="e.g., Rakib Hasan"
//                   />
//                 </div>
//                 <div className="modal__field">
//                   <label htmlFor="members">Initial members</label>
//                   <input
//                     id="members"
//                     type="number"
//                     name="members"
//                     value={newClub.members}
//                     onChange={handleChange}
//                     placeholder="0"
//                     min="0"
//                   />
//                 </div>
//               </div>

//               {error && <p className="modal__error">{error}</p>}

//               <div className="modal__actions">
//                 <button
//                   type="button"
//                   className="btn-ghost"
//                   onClick={() => {
//                     setShowCreateModal(false);
//                     setError("");
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   <FaPlus /> Create club
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ============ MANAGE / EDIT CLUB MODAL ============ */}
//       {editingClub && (
//         <div className="modal-overlay" onClick={() => setEditingClub(null)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal__head">
//               <div>
//                 <span className="modal__eyebrow">Admin</span>
//                 <h2>Manage club</h2>
//               </div>
//               <button
//                 className="modal__close"
//                 onClick={() => setEditingClub(null)}
//                 aria-label="Close"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <form onSubmit={handleUpdateClub} className="modal__body">
//               <div className="modal__field">
//                 <label>Club name</label>
//                 <input
//                   type="text"
//                   value={editingClub.name}
//                   onChange={(e) =>
//                     setEditingClub({ ...editingClub, name: e.target.value })
//                   }
//                   autoFocus
//                 />
//               </div>

//               <div className="modal__row">
//                 <div className="modal__field">
//                   <label>Short name</label>
//                   <input
//                     type="text"
//                     value={editingClub.short || ""}
//                     onChange={(e) =>
//                       setEditingClub({
//                         ...editingClub,
//                         short: e.target.value.toUpperCase(),
//                       })
//                     }
//                     maxLength={3}
//                   />
//                 </div>
//                 <div className="modal__field">
//                   <label>Category</label>
//                   <input
//                     type="text"
//                     value={editingClub.category || ""}
//                     onChange={(e) =>
//                       setEditingClub({
//                         ...editingClub,
//                         category: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="modal__field">
//                 <label>Description</label>
//                 <textarea
//                   value={editingClub.description || ""}
//                   onChange={(e) =>
//                     setEditingClub({
//                       ...editingClub,
//                       description: e.target.value,
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="modal__row">
//                 <div className="modal__field">
//                   <label>Assigned executive</label>
//                   <input
//                     type="text"
//                     value={editingClub.executive || ""}
//                     onChange={(e) =>
//                       setEditingClub({
//                         ...editingClub,
//                         executive: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="modal__field">
//                   <label>Members</label>
//                   <input
//                     type="number"
//                     value={editingClub.members || 0}
//                     onChange={(e) =>
//                       setEditingClub({
//                         ...editingClub,
//                         members: Number(e.target.value),
//                       })
//                     }
//                     min="0"
//                   />
//                 </div>
//               </div>

//               {error && <p className="modal__error">{error}</p>}

//               <div className="modal__actions">
//                 <button
//                   type="button"
//                   className="btn-ghost"
//                   onClick={() => setEditingClub(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary">
//                   <FaSave /> Save changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// }

// export default AdminDashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockAdmin } from "../data/demoUsers";
import {
  FaUsers, FaUniversity, FaCalendarAlt, FaUserTie,
  FaSignOutAlt, FaPlus, FaBullhorn, FaCog, FaCrown,
  FaTimes, FaTrash, FaEdit, FaSave, FaExclamationTriangle,
} from "react-icons/fa";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [clubs, setClubs] = useState([]);

  // Create/Edit Club modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [newClub, setNewClub] = useState({
    name: "", short: "", category: "",
    description: "", executive: "", members: 0,
  });

  // System Announcement modal
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnn, setNewAnn] = useState({
    title: "",
    body: "",
    priority: "normal",
    audience: "all",
  });

  // Settings modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState({
    platformName: "ClubX",
    tagline: "Discover. Connect. Participate.",
    registrationOpen: true,
    maintenanceMode: false,
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // ============ LOAD DATA ============
  useEffect(() => {
    const stored = localStorage.getItem("clubx_user");
    if (!stored) { navigate("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "admin") { navigate("/login"); return; }
    setUser(parsed);

    // Load clubs
    const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
    const defaultClubs = mockAdmin.clubs.map((c, i) => ({
      ...c, id: `default-${i}`,
    }));
    setClubs([...custom, ...defaultClubs]);

    // Load system announcements
    const storedAnns = JSON.parse(
      localStorage.getItem("clubx_system_announcements") || "[]"
    );
    setAnnouncements(storedAnns);

    // Load settings
    const storedSettings = JSON.parse(
      localStorage.getItem("clubx_system_settings") || "null"
    );
    if (storedSettings) setSettings(storedSettings);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    navigate("/login");
  };

  const flashSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ============================================
  // CLUB HANDLERS (existing)
  // ============================================
  const handleChange = (e) =>
    setNewClub({ ...newClub, [e.target.name]: e.target.value });

  const handleCreateClub = (e) => {
    e.preventDefault();
    setError("");
    if (!newClub.name.trim()) { setError("Club name is required."); return; }
    if (!newClub.short.trim()) { setError("Short name is required."); return; }
    if (!newClub.category.trim()) { setError("Category is required."); return; }
    if (clubs.find((c) => c.name.toLowerCase() === newClub.name.trim().toLowerCase())) {
      setError("A club with this name already exists."); return;
    }

    const clubToAdd = {
      id: `club-${Date.now()}`,
      name: newClub.name.trim(),
      short: newClub.short.trim().toUpperCase(),
      category: newClub.category.trim(),
      description: newClub.description.trim(),
      executive: newClub.executive.trim() || "Unassigned",
      members: Number(newClub.members) || 0,
      createdAt: new Date().toISOString(),
    };

    const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
    localStorage.setItem("clubx_clubs", JSON.stringify([clubToAdd, ...custom]));

    setClubs([clubToAdd, ...clubs]);
    setNewClub({ name: "", short: "", category: "", description: "", executive: "", members: 0 });
    setShowCreateModal(false);
    flashSuccess("Club created successfully!");
  };

  const handleUpdateClub = (e) => {
    e.preventDefault();
    setError("");
    if (!editingClub.name.trim()) { setError("Club name is required."); return; }

    const updated = { ...editingClub };
    setClubs(clubs.map((c) => (c.id === updated.id ? updated : c)));

    if (updated.id.startsWith("club-")) {
      const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
      localStorage.setItem(
        "clubx_clubs",
        JSON.stringify(custom.map((c) => (c.id === updated.id ? updated : c)))
      );
    }
    setEditingClub(null);
    flashSuccess("Club updated!");
  };

  const handleDeleteClub = (club) => {
    const isDefault = club.id.startsWith("default-");
    const message = isDefault
      ? `"${club.name}" is a default club. Hide for this session?`
      : `Delete "${club.name}" permanently?`;
    if (!window.confirm(message)) return;

    if (!isDefault) {
      const custom = JSON.parse(localStorage.getItem("clubx_clubs") || "[]");
      localStorage.setItem(
        "clubx_clubs",
        JSON.stringify(custom.filter((c) => c.id !== club.id))
      );
    }
    setClubs(clubs.filter((c) => c.id !== club.id));
    flashSuccess("Club deleted!");
  };

  // ============================================
  // SYSTEM ANNOUNCEMENT HANDLERS
  // ============================================
  const handleAnnChange = (e) =>
    setNewAnn({ ...newAnn, [e.target.name]: e.target.value });

  const handleCreateAnn = (e) => {
    e.preventDefault();
    setError("");

    if (!newAnn.title.trim()) { setError("Title is required."); return; }
    if (!newAnn.body.trim()) { setError("Message is required."); return; }

    const annToAdd = {
      id: `sysann-${Date.now()}`,
      title: newAnn.title.trim(),
      body: newAnn.body.trim(),
      priority: newAnn.priority,
      audience: newAnn.audience,
      date: "Just now",
      createdAt: new Date().toISOString(),
    };

    const updated = [annToAdd, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("clubx_system_announcements", JSON.stringify(updated));

    setNewAnn({ title: "", body: "", priority: "normal", audience: "all" });
    setShowAnnModal(false);
    flashSuccess("System announcement posted!");
  };

  const handleDeleteAnn = (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("clubx_system_announcements", JSON.stringify(updated));
    flashSuccess("Announcement deleted!");
  };

  // ============================================
  // SETTINGS HANDLERS
  // ============================================
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem("clubx_system_settings", JSON.stringify(settings));
    setShowSettingsModal(false);
    flashSuccess("Settings saved!");
  };

  const handleResetData = () => {
    if (!window.confirm(
      "⚠️ This will delete ALL custom clubs, announcements, events, and registrations. Continue?"
    )) return;

    const keys = [
      "clubx_clubs",
      "clubx_system_announcements",
      "clubx_custom_users",
    ];
    keys.forEach((k) => localStorage.removeItem(k));

    // Also clear per-user data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("clubx_events_") ||
          key.startsWith("clubx_announcements_") ||
          key.startsWith("clubx_attendance_")) {
        localStorage.removeItem(key);
      }
    });

    window.location.reload();
  };

  if (!user) return null;

  const a = { ...mockAdmin, name: user.name || mockAdmin.name };
  const [lead, ...restAnnouncements] = a.announcements;

  return (
    <>
      <Navbar />
      <main className="ldg-page admin">
        <div className="ldg-wrap">

          {/* IDENTITY RAIL */}
          <aside className="ldg-rail">
            <div className="ldg-badge"><FaCrown /></div>
            <span className="ldg-eyebrow">Administrator</span>
            <h1>System control</h1>
            <p className="ldg-rail__sub">{a.name} · full system access</p>

            <div className="ldg-perf" aria-hidden="true" />

            <div className="ldg-hero">
              <span className="ldg-hero__num grad-text">
                {a.stats.users.toLocaleString()}
              </span>
              <span className="ldg-hero__label">Total users</span>
            </div>

            <ul className="ldg-stats">
              <li><FaUniversity /> <strong>{clubs.length}</strong> total clubs</li>
              <li><FaCalendarAlt /> <strong>{a.stats.events}</strong> total events</li>
              <li><FaUserTie /> <strong>{a.stats.executives}</strong> executives</li>
            </ul>

            <div className="ldg-quick">
              <button type="button" onClick={() => setShowCreateModal(true)}>
                <span><FaPlus /> Create club</span>
              </button>
              <button type="button" onClick={() => setShowAnnModal(true)}>
                <span><FaBullhorn /> System announcement</span>
              </button>
              <button type="button" onClick={() => setShowSettingsModal(true)}>
                <span><FaCog /> Settings</span>
              </button>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          {/* LEDGER */}
          <div className="ldg-main">

            <section>
              <div className="ldg-section__head">
                <h2>All clubs</h2>
                <button className="btn-mini create" onClick={() => setShowCreateModal(true)}>
                  <FaPlus /> New club
                </button>
              </div>
              <ul className="ldg-rows">
                {clubs.map((c) => (
                  <li key={c.id}>
                    <span className="ldg-mark">
                      {(c.short || c.name.slice(0, 2)).toUpperCase()}
                    </span>
                    <div className="ldg-row-body">
                      <strong>{c.name}</strong>
                      <small>{c.members} members{c.category && ` · ${c.category}`}</small>
                    </div>
                    <span className="ldg-row-meta">{c.executive}</span>
                    <div className="ldg-row-actions">
                      <button className="btn-mini" onClick={() => setEditingClub({ ...c })}>
                        Manage
                      </button>
                      <button className="btn-icon danger" onClick={() => handleDeleteClub(c)}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* MY SYSTEM ANNOUNCEMENTS */}
            <section>
              <div className="ldg-section__head">
                <h2>System announcements</h2>
                <button className="btn-mini create" onClick={() => setShowAnnModal(true)}>
                  <FaPlus /> New announcement
                </button>
              </div>

              {announcements.length === 0 ? (
                <p className="ldg-empty">No system announcements yet.</p>
              ) : (
                <div className="ann-list">
                  {announcements.map((ann) => (
                    <article
                      className={`ann ${ann.priority === "high" ? "ann--high" : ""}`}
                      key={ann.id}
                    >
                      <div className="ann__top">
                        <span className="ann__club">System</span>
                        {ann.priority === "high" && (
                          <span className="ann__badge urgent">Urgent</span>
                        )}
                        <span className="ann__date">{ann.date}</span>
                        <div className="ann__actions">
                          <button
                            className="btn-icon danger"
                            onClick={() => handleDeleteAnn(ann.id)}
                            aria-label="Delete announcement"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <h3>{ann.title}</h3>
                      <p>{ann.body}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="ldg-section__head">
                <h2>User breakdown</h2>
              </div>
              <div className="ldg-userbars">
                <div>
                  <div className="ldg-userbar__top">
                    <span>Students</span>
                    <strong>{a.userStats.students.toLocaleString()}</strong>
                  </div>
                  <div className="ldg-userbar__track">
                    <i style={{ width: `${(a.userStats.students / a.stats.users) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="ldg-userbar__top">
                    <span>Executives</span>
                    <strong>{a.userStats.executives}</strong>
                  </div>
                  <div className="ldg-userbar__track mint">
                    <i style={{ width: `${(a.userStats.executives / a.stats.users) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="ldg-userbar__top">
                    <span>Admins</span>
                    <strong>{a.userStats.admins}</strong>
                  </div>
                  <div className="ldg-userbar__track gold">
                    <i style={{ width: `${(a.userStats.admins / a.stats.users) * 100}%` }} />
                  </div>
                </div>
              </div>
            </section>

            {lead && (
              <section className="ann ann--lead">
                <div className="ann__top">
                  <span className="ann__club">System</span>
                  <span className="ann__badge">{lead.date}</span>
                </div>
                <h3>{lead.title}</h3>
              </section>
            )}

            {restAnnouncements.length > 0 && (
              <section>
                <div className="ldg-section__head">
                  <h2>More announcements</h2>
                </div>
                <div className="ann-list">
                  {restAnnouncements.map((an, i) => (
                    <div className="ann" key={i}>
                      <div className="ann__top">
                        <span className="ann__club">System</span>
                      </div>
                      <h3>{an.title}</h3>
                      <small>{an.date}</small>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* ============ CREATE CLUB MODAL ============ */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Admin</span>
                <h2>Create a new club</h2>
              </div>
              <button className="modal__close" onClick={() => setShowCreateModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleCreateClub} className="modal__body">
              <div className="modal__field">
                <label>Club name *</label>
                <input
                  type="text" name="name" value={newClub.name}
                  onChange={handleChange} placeholder="e.g., IIUC Robotics Club" autoFocus
                />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Short name * (2-3 letters)</label>
                  <input
                    type="text" name="short" value={newClub.short}
                    onChange={handleChange} placeholder="e.g., IRC" maxLength={3}
                  />
                </div>
                <div className="modal__field">
                  <label>Category *</label>
                  <input
                    type="text" name="category" value={newClub.category}
                    onChange={handleChange} placeholder="e.g., Technology"
                  />
                </div>
              </div>
              <div className="modal__field">
                <label>Description</label>
                <textarea
                  name="description" value={newClub.description}
                  onChange={handleChange} rows={3}
                  placeholder="Short description"
                />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Assign executive</label>
                  <input
                    type="text" name="executive" value={newClub.executive}
                    onChange={handleChange} placeholder="e.g., Rakib Hasan"
                  />
                </div>
                <div className="modal__field">
                  <label>Initial members</label>
                  <input
                    type="number" name="members" value={newClub.members}
                    onChange={handleChange} min="0"
                  />
                </div>
              </div>
              {error && <p className="modal__error">{error}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost"
                  onClick={() => { setShowCreateModal(false); setError(""); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <FaPlus /> Create club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ EDIT CLUB MODAL ============ */}
      {editingClub && (
        <div className="modal-overlay" onClick={() => setEditingClub(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Admin</span>
                <h2>Manage club</h2>
              </div>
              <button className="modal__close" onClick={() => setEditingClub(null)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdateClub} className="modal__body">
              <div className="modal__field">
                <label>Club name</label>
                <input
                  type="text" value={editingClub.name}
                  onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Short name</label>
                  <input
                    type="text" value={editingClub.short || ""}
                    onChange={(e) => setEditingClub({ ...editingClub, short: e.target.value.toUpperCase() })}
                    maxLength={3}
                  />
                </div>
                <div className="modal__field">
                  <label>Category</label>
                  <input
                    type="text" value={editingClub.category || ""}
                    onChange={(e) => setEditingClub({ ...editingClub, category: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal__field">
                <label>Description</label>
                <textarea
                  value={editingClub.description || ""}
                  onChange={(e) => setEditingClub({ ...editingClub, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Assigned executive</label>
                  <input
                    type="text" value={editingClub.executive || ""}
                    onChange={(e) => setEditingClub({ ...editingClub, executive: e.target.value })}
                  />
                </div>
                <div className="modal__field">
                  <label>Members</label>
                  <input
                    type="number" value={editingClub.members || 0}
                    onChange={(e) => setEditingClub({ ...editingClub, members: Number(e.target.value) })}
                    min="0"
                  />
                </div>
              </div>
              {error && <p className="modal__error">{error}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setEditingClub(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <FaSave /> Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ SYSTEM ANNOUNCEMENT MODAL ============ */}
      {showAnnModal && (
        <div className="modal-overlay" onClick={() => setShowAnnModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Admin</span>
                <h2>Post system announcement</h2>
              </div>
              <button className="modal__close" onClick={() => setShowAnnModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleCreateAnn} className="modal__body">
              <div className="modal__field">
                <label>Title *</label>
                <input
                  type="text" name="title" value={newAnn.title}
                  onChange={handleAnnChange}
                  placeholder="e.g., System maintenance scheduled"
                  autoFocus
                />
              </div>
              <div className="modal__field">
                <label>Message *</label>
                <textarea
                  name="body" value={newAnn.body}
                  onChange={handleAnnChange}
                  placeholder="Write the announcement here..." rows={5}
                />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Priority</label>
                  <div className="priority-options">
                    {[
                      { value: "normal", label: "Normal" },
                      { value: "high", label: "Urgent" },
                    ].map((p) => (
                      <button
                        key={p.value} type="button"
                        className={`priority-option ${newAnn.priority === p.value ? "is-active" : ""} ${p.value === "high" ? "high" : ""}`}
                        onClick={() => setNewAnn({ ...newAnn, priority: p.value })}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="modal__field">
                  <label>Audience</label>
                  <select name="audience" value={newAnn.audience} onChange={handleAnnChange}>
                    <option value="all">All users</option>
                    <option value="students">Students only</option>
                    <option value="executives">Executives only</option>
                  </select>
                </div>
              </div>
              {error && <p className="modal__error">{error}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost"
                  onClick={() => { setShowAnnModal(false); setError(""); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <FaBullhorn /> Post announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ SETTINGS MODAL ============ */}
      {showSettingsModal && (
        <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Admin</span>
                <h2>System settings</h2>
              </div>
              <button className="modal__close" onClick={() => setShowSettingsModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveSettings} className="modal__body">

              {/* General */}
              <div className="settings-section">
                <h4>General</h4>
                <div className="modal__row">
                  <div className="modal__field">
                    <label>Platform name</label>
                    <input
                      type="text" name="platformName" value={settings.platformName}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div className="modal__field">
                    <label>Tagline</label>
                    <input
                      type="text" name="tagline" value={settings.tagline}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="settings-section">
                <h4>System toggles</h4>

                <label className="toggle-row">
                  <div>
                    <strong>Registration open</strong>
                    <small>Allow new students to sign up</small>
                  </div>
                  <input
                    type="checkbox"
                    name="registrationOpen"
                    checked={settings.registrationOpen}
                    onChange={handleSettingsChange}
                  />
                  <span className="toggle-switch" />
                </label>

                <label className="toggle-row">
                  <div>
                    <strong>Maintenance mode</strong>
                    <small>Show maintenance banner to all users</small>
                  </div>
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleSettingsChange}
                  />
                  <span className="toggle-switch" />
                </label>
              </div>

              {/* Danger zone */}
              <div className="settings-section settings-section--danger">
                <h4><FaExclamationTriangle /> Danger zone</h4>
                <p>
                  Resetting will delete all custom clubs, announcements, events,
                  and registrations. This cannot be undone.
                </p>
                <button type="button" className="btn-danger" onClick={handleResetData}>
                  <FaTrash /> Reset all custom data
                </button>
              </div>

              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setShowSettingsModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <FaSave /> Save settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success toast */}
      {successMsg && (
        <div className="admin-toast">
           {successMsg}
        </div>
      )}

      <Footer />
    </>
  );
}

export default AdminDashboard;