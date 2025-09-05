import { useState, useEffect } from "react";
import { db, auth, provider } from "./firebase";
import { ref as dbRef, push, onValue } from "firebase/database";
import { signInWithPopup } from "firebase/auth";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const messagesRef = dbRef(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = data ? Object.values(data) : [];
      setMessages(msgs);
    });
  }, []);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const sendMessage = () => {
    if (text.trim().length < 2 || !user) return;
    push(dbRef(db, "messages"), {
      name: user.displayName,
      text,
      timestamp: Date.now()
    });
    setText("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="title">💬 چت روم نهایی</h2>

        {!user ? (
          <button onClick={loginWithGoogle} className="button">ورود با گوگل</button>
        ) : (
          <div className="user-info">
            <img src={user.photoURL} alt="پروفایل" className="avatar" />
            <span>سلام {user.displayName} 👋</span>
          </div>
        )}

        <section className="section">
          <h3>پیام‌ها</h3>
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className="message">
                <div className="sender">{msg.name || "ناشناس"}</div>
                <div>{msg.text}</div>
                <div className="timestamp">{formatTime(msg.timestamp)}</div>
              </div>
            ))}
          </div>

          {user && (
            <div className="form">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="متن پیام"
                className="input"
              />
              <button onClick={sendMessage} className="button">ارسال</button>
            </div>
          )}
        </section>

        <footer className="about-me">
          <div className="about-box">
            <img src="/Screenshot 2025-08-08 210957.png" alt="Mehdi" />
            <h2>Mehdi</h2>
            <p>
           طراح وب با دیدگاه هنری و تمرکز بر خلق تجربه‌های دیجیتال زیباشناختی و احساسی.  
              تخصص من در طراحی رابط‌کاربری، انیمیشن‌های سینمایی، و ترکیب صدا با عملکرد دقیق است.
            </p>
            <p>
              هدف من خلق تجربه‌هایی‌ست که کاربر رو مسحور تعامل با سایت کنه — نه فقط طراحی معمول، بلکه طراحی‌ای که حس و هویت داشته باشه.
            </p>
            <a href="tel:+989934920508" className="contact-button">📞 تماس با من</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;