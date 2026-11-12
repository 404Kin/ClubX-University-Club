import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import { Arrow, Check } from "../components/Icons";
import { apiUrl } from "../lib/api";
import "../styles/club.css";
import "../styles/join.css";

const EMPTY_FORM = {
  fullName: "",
  studentId: "",
  email: "",
  phone: "",
  department: "",
  semester: "",
  batch: "",
  paymentMethod: "",
  txnId: "",
};

function ClubJoin() {
  const { slug } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    let active = true;
    const fetchClub = async () => {
      try {
        const response = await fetch(apiUrl(`clubs/${slug}`));
        if (!response.ok) {
          throw new Error(response.status === 404 ? "Club not found." : "Could not load club details.");
        }
        const clubData = await response.json();
        if (active) setClub(clubData);
      } catch (fetchError) {
        if (active) setError(fetchError.message || "Could not load club details.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchClub();
    return () => { active = false; };
  }, [slug]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting || !club) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(apiUrl("memberships"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: form.fullName.trim(),
          studentId: form.studentId.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          department: form.department.trim(),
          semester: form.semester.trim(),
          batch: form.batch.trim(),
          paymentMethod: form.paymentMethod,
          clubId: club._id,
          clubName: club.name,
          txnId: form.txnId.trim() || undefined,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || result.error || "Failed to submit your application.");
      }
      setApplication(result);
    } catch (submitError) {
      console.error("Membership application failed:", submitError);
      setError(submitError.message || "Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const membershipFee = Number(club?.membership?.fee);
  const hasMembershipFee = Number.isFinite(membershipFee) && membershipFee > 0;
  const goToPayment = (event) => {
    event.preventDefault();
    if (!event.currentTarget.form.reportValidity()) return;
    setError("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <><Navbar /><main className="wrap cd-loading" role="status">Loading club details...</main><Footer /></>;
  }

  if (!club) {
    return (
      <div className="club-page">
        <Navbar />
        <main className="wrap cd-missing">
          <h1>{error || "Club not found."}</h1>
          <Link to="/" className="btn btn--ghost">Back to clubs</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="club-page">
      <Navbar />
      <header className="cd-hero jn-hero">
        <div className="wrap">
          <h1 className="jn-title">Become a Member</h1>
          <p className="cd-tagline">Join {club.name}</p>
        </div>
      </header>

      <main className="wrap cd-body jn-body">
        {application ? (
          <div className="jn-success">
            <Check size={40} />
            <h2>Application submitted</h2>
            <p>Your application for {club.name} is pending review.</p>
            <StatusBadge status={application.status} />
            <Link to={`/clubs/${slug}`} className="btn btn--ghost">Back to club page</Link>
          </div>
        ) : (
          <form className="jn-form" onSubmit={submit}>
            <p className="jn-lead">
              Step {step} of 2 · {step === 1 ? "Your information" : "Membership payment"}
            </p>

            {step === 1 ? <div className="jn-grid">
              <div className="field">
                <label htmlFor="join-full-name">Full name *</label>
                <input id="join-full-name" name="fullName" autoComplete="name" required value={form.fullName} onChange={onChange} placeholder="Your full name" />
              </div>
              <div className="field">
                <label htmlFor="join-student-id">Student ID *</label>
                <input id="join-student-id" name="studentId" required value={form.studentId} onChange={onChange} placeholder="C241462" />
              </div>
              <div className="field">
                <label htmlFor="join-email">Email *</label>
                <input id="join-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="join-phone">Phone *</label>
                <input id="join-phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={onChange} placeholder="01XXXXXXXXX" />
              </div>
              <div className="field">
                <label htmlFor="join-department">Department</label>
                <input id="join-department" name="department" value={form.department} onChange={onChange} placeholder="CSE" />
              </div>
              <div className="field">
                <label htmlFor="join-semester">Semester</label>
                <input id="join-semester" name="semester" value={form.semester} onChange={onChange} placeholder="6th" />
              </div>
              <div className="field">
                <label htmlFor="join-batch">Batch</label>
                <input id="join-batch" name="batch" value={form.batch} onChange={onChange} placeholder="2024" />
              </div>
            </div> : (
              <section className="jn-payment" aria-labelledby="join-payment-title">
                <h2 id="join-payment-title">Membership fee</h2>
                <p className="jn-fee">
                  {hasMembershipFee ? `৳${membershipFee.toLocaleString()}${club.membership.period ? ` / ${club.membership.period}` : ""}` : "Free"}
                </p>
                {hasMembershipFee ? (
                  <>
                    <p className="jn-note">Confirm the club’s payment account with its executive before sending money.</p>
                    <div className="jn-grid">
                      <div className="field">
                        <label htmlFor="join-payment-method">Payment method</label>
                        <select id="join-payment-method" name="paymentMethod" value={form.paymentMethod} onChange={onChange}>
                          <option value="">Select a method (optional)</option>
                          <option value="bkash">bKash</option>
                          <option value="nagad">Nagad</option>
                          <option value="bank">Bank transfer</option>
                          <option value="cash">Cash</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="join-txn-id">Transaction ID (optional)</label>
                        <input id="join-txn-id" name="txnId" value={form.txnId} onChange={onChange} placeholder="Enter after payment" />
                      </div>
                    </div>
                  </>
                ) : <p className="jn-note">No payment is needed to apply for this club.</p>}
              </section>
            )}

            {error && <p className="jn-error" role="alert">{error}</p>}

            <div className="jn-submit">
              {step === 2 && (
                <button type="button" className="btn btn--ghost btn--lg" onClick={() => setStep(1)}>
                  Back
                </button>
              )}
              {step === 1 ? (
                <button type="button" className="btn btn--primary btn--lg" onClick={goToPayment}>
                  Continue to Payment <Arrow />
                </button>
              ) : (
                <button type="submit" className="btn btn--primary btn--lg" disabled={submitting}>
                  {submitting ? "Submitting application..." : "Submit Application"}
                  {!submitting && <Arrow />}
                </button>
              )}
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ClubJoin;
