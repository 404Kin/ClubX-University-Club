import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import { Arrow, Check } from "../components/Icons";
import clubs from "../data/clubs";
import directory from "../data/directory";
import { addApplication } from "../data/memberships";
import "../styles/club.css";
import "../styles/join.css";

const METHODS = [
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "rocket", label: "Rocket" },
];

const EMPTY_FORM = {
  fullName: "",
  studentId: "",
  email: "",
  phone: "",
  department: "",
  semester: "",
  batch: "",
  address: "",
};

function RegistrationForm({ form, onChange, onNext }) {
  const required = ["fullName", "studentId", "email", "phone", "department", "semester", "batch"];
  const canContinue = required.every((k) => form[k].trim() !== "");

  return (
    <form
      className="jn-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) onNext();
      }}
    >
      <div className="jn-grid">
        <div className="field">
          <label htmlFor="fullName">Full name *</label>
          <input id="fullName" required value={form.fullName} onChange={onChange("fullName")} placeholder="Your full name" />
        </div>
        <div className="field">
          <label htmlFor="studentId">Student ID *</label>
          <input id="studentId" required value={form.studentId} onChange={onChange("studentId")} placeholder="e.g. C221xxx" />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" required value={form.email} onChange={onChange("email")} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number *</label>
          <input id="phone" required value={form.phone} onChange={onChange("phone")} placeholder="01XXXXXXXXX" />
        </div>
        <div className="field">
          <label htmlFor="department">Department *</label>
          <input id="department" required value={form.department} onChange={onChange("department")} placeholder="e.g. CSE" />
        </div>
        <div className="field">
          <label htmlFor="semester">Semester / Year *</label>
          <input id="semester" required value={form.semester} onChange={onChange("semester")} placeholder="e.g. 6th" />
        </div>
        <div className="field">
          <label htmlFor="batch">Batch *</label>
          <input id="batch" required value={form.batch} onChange={onChange("batch")} placeholder="e.g. 48" />
        </div>
        <div className="field jn-span-2">
          <label htmlFor="address">Address / other info (optional)</label>
          <input id="address" value={form.address} onChange={onChange("address")} placeholder="Optional" />
        </div>
      </div>
      <button type="submit" className="btn btn--primary btn--lg" disabled={!canContinue}>
        Continue to Payment <Arrow />
      </button>
    </form>
  );
}

function PaymentStep({ club, method, setMethod, txnId, setTxnId, onBack, onSubmit }) {
  const canSubmit = Boolean(method) && txnId.trim() !== "";

  return (
    <div className="jn-payment">
      <p className="cd-lead jn-lead">
        Membership fee: <strong>৳{club.membership.fee}</strong>
      </p>

      <div className="jn-methods" role="group" aria-label="Payment method">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`jn-method ${method === m.id ? "is-active" : ""}`}
            onClick={() => setMethod(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {method && (
        <div className="jn-instructions">
          <div className="cd-info">
            <div>
              <dt>Payment number</dt>
              <dd>{club.membership.paymentMethods[method]}</dd>
            </div>
            <div>
              <dt>Membership fee</dt>
              <dd>৳{club.membership.fee}</dd>
            </div>
          </div>
          <p className="jn-note">
            Send the exact membership fee to the {METHODS.find((m) => m.id === method)?.label} number above,
            then enter your Transaction ID below.
          </p>

          <div className="field">
            <label htmlFor="txnId">Transaction ID *</label>
            <input
              id="txnId"
              required
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              placeholder="e.g. TRX123456789"
            />
          </div>
          <p className="jn-disclaimer">
            Entering a Transaction ID does not automatically confirm payment. Your club administrator will
            manually verify it before your membership is approved.
          </p>
        </div>
      )}

      <div className="jn-actions">
        <button type="button" className="btn btn--ghost" onClick={onBack}>Back</button>
        <button type="button" className="btn btn--primary btn--lg" disabled={!canSubmit} onClick={onSubmit}>
          Submit Registration <Arrow />
        </button>
      </div>
    </div>
  );
}

function SuccessStep({ club, application }) {
  return (
    <div className="jn-success">
      <Check />
      <h2>Application submitted</h2>
      <p>
        Your membership application for {club.short} has been submitted. Your payment will be verified by the
        club administrator before your membership is approved.
      </p>
      <StatusBadge status={application.status} />
      <dl className="cd-info jn-summary">
        <div><dt>Reference</dt><dd>{application.id}</dd></div>
        <div><dt>Payment method</dt><dd>{METHODS.find((m) => m.id === application.paymentMethod)?.label}</dd></div>
        <div><dt>Transaction ID</dt><dd>{application.txnId}</dd></div>
      </dl>
      <Link to={`/clubs/${application.clubSlug}`} className="btn btn--ghost">Back to club page</Link>
    </div>
  );
}

function ClubJoin() {
  const { slug } = useParams();
  const club = clubs[slug];
  const entry = directory.find((c) => c.slug === slug);
  const [step, setStep] = useState("form");
  const [form, setForm] = useState(EMPTY_FORM);
  const [method, setMethod] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [application, setApplication] = useState(null);

  if (!club) {
    return (
      <div className="club-page">
        <Navbar />
        <main className="wrap cd-missing">
          <h1>Club not found</h1>
          <p>This club doesn't have a registration page yet.</p>
          <Link to="/" className="btn btn--ghost">← Back to home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    const record = addApplication({
      clubSlug: slug,
      clubName: club.short,
      ...form,
      paymentMethod: method,
      txnId: txnId.trim(),
    });
    setApplication(record);
    setStep("success");
  };

  return (
    <div className="club-page" style={{ "--hue": entry?.hue ?? 222 }}>
      <Navbar />
      <header className="cd-hero jn-hero">
        <div className="wrap">
          <nav className="cd-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/clubs/${slug}`}>{club.short}</Link>
            <span aria-hidden="true">/</span>
            <span>Join</span>
          </nav>
          <h1 className="jn-title">Become a Member</h1>
          <p className="cd-tagline">Join {club.name}</p>
        </div>
      </header>
      <main className="wrap cd-body jn-body">
        {step === "form" && <RegistrationForm form={form} onChange={onChange} onNext={() => setStep("payment")} />}
        {step === "payment" && (
          <PaymentStep
            club={club}
            method={method}
            setMethod={setMethod}
            txnId={txnId}
            setTxnId={setTxnId}
            onBack={() => setStep("form")}
            onSubmit={submit}
          />
        )}
        {step === "success" && <SuccessStep club={club} application={application} />}
      </main>
      <Footer />
    </div>
  );
}

export default ClubJoin;
