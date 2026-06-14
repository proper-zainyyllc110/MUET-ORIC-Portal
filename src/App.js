import { useState } from "react";

// ── Font injection ────────────────────────────────────────────────────────────
const injectFonts = () => {
  if (!document.getElementById("poppins-font")) {
    const l = document.createElement("link");
    l.id = "poppins-font";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(l);
  }
  if (!document.getElementById("tabler-icons")) {
    const l = document.createElement("link");
    l.id = "tabler-icons";
    l.rel = "stylesheet";
    l.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css";
    document.head.appendChild(l);
  }
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const generateSessionPassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// In-memory user store (replace with API/database calls as needed)
const userStore = {};

// ── Styles ────────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    padding: "2rem 1rem",
  },

  card: {
    position: "relative",
    width: "420px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.12)",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },

  glow: {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(108,99,255,0.35) 0%, transparent 70%)",
    pointerEvents: "none",
    borderRadius: "50%",
  },

  // Toggle tab bar
  toggleBar: {
    display: "flex",
    background: "rgba(255,255,255,0.08)",
    padding: "6px",
    margin: "24px 24px 0",
    borderRadius: "50px",
    position: "relative",
  },

  toggleSlider: (onSignup) => ({
    position: "absolute",
    top: "6px",
    left: "6px",
    width: "calc(50% - 6px)",
    height: "calc(100% - 12px)",
    background: "linear-gradient(135deg, #6c63ff, #a855f7)",
    borderRadius: "50px",
    zIndex: 0,
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: onSignup ? "translateX(100%)" : "translateX(0)",
  }),

  toggleBtn: (active) => ({
    flex: 1,
    padding: "10px",
    background: "none",
    border: "none",
    color: active ? "#fff" : "rgba(255,255,255,0.6)",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    borderRadius: "50px",
    position: "relative",
    zIndex: 1,
    transition: "color 0.3s",
  }),

  // Panels container
  panelsContainer: {
    position: "relative",
    overflow: "hidden",
    height: "400px",
  },

  panel: (visible, slideDirection) => ({
    position: "absolute",
    top: 0, left: 0, right: 0,
    padding: "28px 28px 24px",
    transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s",
    transform: visible ? "translateX(0)" : slideDirection === "left" ? "translateX(-100%)" : "translateX(100%)",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
  }),

  // Typography
  title: { fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "4px" },
  subtitle: { fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "20px" },

  // Input
  inputWrap: { position: "relative", marginBottom: "14px" },

  inputIcon: (focused) => ({
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "17px",
    zIndex: 1,
    pointerEvents: "none",
    color: focused ? "rgba(168,85,247,0.8)" : "rgba(255,255,255,0.35)",
  }),

  input: (focused) => ({
    width: "100%",
    boxSizing: "border-box",
    background: focused ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)",
    border: `1px solid ${focused ? "rgba(168,85,247,0.7)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "12px",
    padding: "13px 16px 13px 42px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    color: "#fff",
    outline: "none",
  }),

  copyBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(168,85,247,0.25)",
    border: "1px solid rgba(168,85,247,0.4)",
    borderRadius: "8px",
    color: "#d8b4fe",
    fontSize: "11px",
    fontWeight: 600,
    padding: "4px 10px",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  },

  // Forgot password
  forgotRow: { textAlign: "right", marginTop: "-6px", marginBottom: "16px" },
  forgotBtn: {
    fontSize: "12px",
    color: "rgba(168,85,247,0.9)",
    background: "none",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
  },

  // Submit
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #6c63ff, #a855f7)",
    border: "none",
    borderRadius: "12px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    letterSpacing: "0.3px",
    marginBottom: "0",
  },

  // Checkbox row
  checkRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" },
  checkLabel: { fontSize: "12px", color: "rgba(255,255,255,0.45)", cursor: "pointer" },
  checkLink: { color: "rgba(168,85,247,0.9)" },

  // One-time credentials box
  credBox: {
    background: "rgba(108,99,255,0.15)",
    border: "1px solid rgba(108,99,255,0.35)",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "14px",
  },
  credLabel: { fontSize: "11px", color: "rgba(168,85,247,0.9)", fontWeight: 600, marginBottom: "6px" },
  credRow:   { fontSize: "13px", color: "rgba(255,255,255,0.75)", marginBottom: "3px" },
  credValue: { color: "#d8b4fe", fontWeight: 600 },
  credNote:  { fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "6px" },

  // Toast notification
  toast: (show, isError) => ({
    position: "absolute",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    background: isError ? "rgba(220,38,38,0.9)" : "rgba(34,197,94,0.9)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 99,
    pointerEvents: "none",
    transition: "opacity 0.3s",
    opacity: show ? 1 : 0,
  }),
};

// ── Reusable InputField ───────────────────────────────────────────────────────
function InputField({ icon, type, placeholder, value, onChange, showCopy }) {
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={S.inputWrap}>
      <i className={`ti ti-${icon}`} style={S.inputIcon(focused)} aria-hidden="true" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...S.input(focused), paddingRight: showCopy ? "72px" : "16px" }}
      />
      {showCopy && (
        <button style={S.copyBtn} onClick={handleCopy}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LoginPage() {
  injectFonts();

  // New users land on Sign Up first
  const [mode, setMode] = useState("signup");
  const isSignup = mode === "signup";

  // Sign Up form state
  const [name,    setName]    = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPass,  setSuPass]  = useState("");
  const [agreed,  setAgreed]  = useState(false);

  // LogIN form state (auto-filled after signup)
  const [liEmail, setLiEmail] = useState("");
  const [liPass,  setLiPass]  = useState("");

  // One-time session credentials to display
  const [sessionCred, setSessionCred] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ msg: "", show: false, error: false });

  const showToast = (msg, error = false) => {
    setToast({ msg, show: true, error });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  };

  // ── Handle Sign Up ──────────────────────────────────────────────────────────
  const handleSignup = () => {
    if (!name.trim())                      return showToast("Please enter your name.", true);
    if (!suEmail.trim())                   return showToast("Please enter your email.", true);
    if (!/\S+@\S+\.\S+/.test(suEmail))    return showToast("Invalid email address.", true);
    if (suPass.length < 6)                 return showToast("Password must be at least 6 characters.", true);
    if (!agreed)                           return showToast("Please accept the Terms & Privacy Policy.", true);
    if (userStore[suEmail])                return showToast("Account already exists. Please log in.", true);

    const sessionPassword = generateSessionPassword();
    userStore[suEmail] = { name, password: suPass, sessionPassword };

    setSessionCred({ email: suEmail, password: sessionPassword });
    setLiEmail(suEmail);
    setLiPass(sessionPassword);

    showToast("Account created! Use your one-time password to log in.");
    setTimeout(() => setMode("login"), 1600);
  };

  // ── Handle LogIN ────────────────────────────────────────────────────────────
  const handleLogin = () => {
    if (!liEmail.trim()) return showToast("Enter your email.", true);
    if (!liPass.trim())  return showToast("Enter your password.", true);

    const user = userStore[liEmail];
    if (!user) return showToast("No account found. Please sign up first.", true);

    const isValid = liPass === user.password || liPass === user.sessionPassword;
    if (!isValid) return showToast("Incorrect email or password.", true);

    // Expire the one-time session password after use
    if (liPass === user.sessionPassword) user.sessionPassword = null;

    setSessionCred(null);
    showToast(`Welcome back, ${user.name}!`);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ ...S.page, flexDirection: "column", gap: "24px" }}>
      <h1 style={{
        fontSize: "28px",
        fontWeight: 700,
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "0.5px",
        margin: 0,
        textAlign: "center",
      }}>
        ORIC MUET Web-Portal
      </h1>
      <div style={S.card}>
        <div style={S.glow} />

        {/* Tab Toggle */}
        <div style={S.toggleBar}>
          <div style={S.toggleSlider(isSignup)} />
          <button style={S.toggleBtn(!isSignup)} onClick={() => setMode("login")}>Existing User</button>
          <button style={S.toggleBtn(isSignup)}  onClick={() => setMode("signup")}>New User</button>
        </div>

        <div style={S.panelsContainer}>

          {/* ── LogIN Panel ── */}
          <div style={S.panel(!isSignup, "left")}>
            <p style={S.title}>Welcome back</p>
            <p style={S.subtitle}>Log in to your account to continue</p>

            {/* One-time credentials box (shown after signup) */}
            {sessionCred && (
              <div style={S.credBox}>
                <p style={S.credLabel}>ONE-TIME SESSION CREDENTIALS</p>
                <p style={S.credRow}>Email: <span style={S.credValue}>{sessionCred.email}</span></p>
                <p style={S.credRow}>Password: <span style={S.credValue}>{sessionCred.password}</span></p>
                <p style={S.credNote}>Valid for this session only. Fields are pre-filled below.</p>
              </div>
            )}

            <InputField
              icon="mail" type="email" placeholder="Email address"
              value={liEmail} onChange={(e) => setLiEmail(e.target.value)}
            />
            <InputField
              icon="lock" type="text" placeholder="Password"
              value={liPass} onChange={(e) => setLiPass(e.target.value)}
              showCopy={!!liPass}
            />

            <div style={S.forgotRow}>
              <button style={S.forgotBtn} onClick={() => showToast("Reset link sent to your email.")}>
                Forgot password?
              </button>
            </div>

            <button style={S.submitBtn} onClick={handleLogin}>LogIN</button>
          </div>

          {/* ── Sign Up Panel ── */}
          <div style={S.panel(isSignup, "right")}>
            <p style={S.title}>Create account</p>


            <InputField
              icon="user" type="text" placeholder="Full name"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <InputField
              icon="mail" type="email" placeholder="Email address"
              value={suEmail} onChange={(e) => setSuEmail(e.target.value)}
            />
            <InputField
              icon="lock" type="password" placeholder="Create password"
              value={suPass} onChange={(e) => setSuPass(e.target.value)}
            />

            <div style={S.checkRow}>
              <input
                type="checkbox" id="terms"
                checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                style={{ accentColor: "#a855f7", cursor: "pointer" }}
              />
              <label htmlFor="terms" style={S.checkLabel}>
                I agree to the <span style={S.checkLink}>Terms & Privacy Policy</span>
              </label>
            </div>

            <button style={S.submitBtn} onClick={handleSignup}>Create Account</button>
          </div>

        </div>

        {/* Toast Notification */}
        <div style={S.toast(toast.show, toast.error)}>{toast.msg}</div>
      </div>
    </div>
  );
}
