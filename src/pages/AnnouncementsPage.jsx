import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CampusPulse from "../components/CampusPulse";

function AnnouncementsPage() {
  return (
    <>
      <Navbar />
      <main className="announcements-page">
        <CampusPulse />
      </main>
      <Footer />
    </>
  );
}

export default AnnouncementsPage;
