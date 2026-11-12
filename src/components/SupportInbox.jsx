import { useEffect, useState } from "react";
import { apiUrl } from "../lib/api";
import "../styles/support.css";

function SupportInbox() {
  const [threads, setThreads] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const loadThreads = async () => {
    const response = await fetch(apiUrl("support"), {
      headers: { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Could not load support messages.");
    if (!Array.isArray(data)) throw new Error("Support API returned an invalid response.");
    setThreads(data);
    setSelectedId((current) => current || data[0]?._id || "");
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch(apiUrl("support"), {
      headers: { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` },
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load support messages.");
        if (!Array.isArray(data)) throw new Error("Support API returned an invalid response.");
        return data;
      })
      .then((data) => {
        setThreads(data);
        setSelectedId(data[0]?._id || "");
      })
      .catch((loadError) => {
        if (loadError.name !== "AbortError") setError(loadError.message);
      });
    return () => controller.abort();
  }, []);

  const selected = threads.find((thread) => thread._id === selectedId);

  const sendReply = async (event) => {
    event.preventDefault();
    const text = reply.trim();
    if (!text || !selected) return;
    setError("");
    setSending(true);
    try {
      const response = await fetch(apiUrl(`support/${selected._id}/messages`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send reply.");
      setThreads((current) => [data, ...current.filter((thread) => thread._id !== data._id)]);
      setReply("");
    } catch (sendError) {
      setError(sendError.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="support-inbox">
      <div className="ldg-section__head">
        <h2>Support inbox</h2>
        <button type="button" className="btn-mini" onClick={() => loadThreads().catch((e) => setError(e.message))}>
          Refresh
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      {!threads.length ? <p className="ldg-empty">No support conversations yet.</p> : (
        <div className="support-inbox__layout">
          <div className="support-inbox__list">
            {threads.map((thread) => (
              <button
                type="button"
                key={thread._id}
                className={thread._id === selectedId ? "is-selected" : ""}
                onClick={() => setSelectedId(thread._id)}
              >
                <strong>{thread.studentName}</strong>
                <small>{thread.recipient === "executive" ? thread.clubName : "Help center"} · {thread.subject}</small>
              </button>
            ))}
          </div>
          {selected && (
            <div className="support-inbox__conversation">
              <div className="support-inbox__messages">
                {selected.messages.map((message) => (
                  <article key={message._id || `${message.senderId}-${message.createdAt}`}>
                    <strong>{message.senderName} · {message.senderRole}</strong>
                    <p>{message.text}</p>
                  </article>
                ))}
              </div>
              <form onSubmit={sendReply}>
                <textarea value={reply} onChange={(event) => setReply(event.target.value)} maxLength={2000} required placeholder="Write a reply..." />
                <button className="btn-primary" type="submit" disabled={sending || !reply.trim()}>
                  {sending ? "Sending..." : "Send reply"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SupportInbox;
