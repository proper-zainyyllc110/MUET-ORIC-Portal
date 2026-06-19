import { useState, useEffect, useRef } from "react";

const ORIC_LOGO = "data:image/jpeg;base64,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";

const VALID_DOMAINS = [
  "@students.muet.edu.pk",
  "@admin.muet.edu.pk",
  "@faculty.muet.edu.pk",
];


const db = {
  users: {},
  opportunities: [
    { id: 1, type: "Scholarship", title: "Higher Education Commission Need-Based Scholarship 2025", deadline: "2025-08-31", badge: "Scholarship", badgeColor: "#0369a1", desc: "Full-tuition scholarship for financially deserving undergraduate students enrolled at HEC-recognised universities." },
    { id: 2, type: "Internship", title: "NESCOM Summer Engineering Internship", deadline: "2025-07-15", badge: "Internship", badgeColor: "#0369a1", desc: "Eight-week paid internship programme in aerospace & defence engineering for final-year B.E. students." },
    { id: 3, type: "Research Grant", title: "ORIC Seed Research Grant – Batch 2025", deadline: "2025-09-01", badge: "Research Grant", badgeColor: "#b45309", desc: "PKR 5,00,000 seed funding for innovative research proposals submitted by MUET faculty members." },
    { id: 4, type: "Scholarship", title: "Sindh Endowment Fund Scholarship", deadline: "2025-10-01", badge: "Scholarship", badgeColor: "#0369a1", desc: "Province-level merit-cum-need scholarship covering tuition & hostel expenses for Sindh domicile holders." },
    { id: 5, type: "Internship", title: "PARCO Petroleum Refinery Internship", deadline: "2025-07-30", badge: "Internship", badgeColor: "#0369a1", desc: "Six-week industrial training at Pak-Arab Refinery for Chemical & Mechanical Engineering students." },
    { id: 6, type: "Research Grant", title: "Pakistan Science Foundation Young Researcher Award", deadline: "2025-11-15", badge: "Research Grant", badgeColor: "#b45309", desc: "Prestigious annual grant of PKR 10,00,000 recognising outstanding research contribution by scientists under 40." },
  ],
};


const NAV_CONTENT = {
  "Home": {
    title: "Welcome to ORIC MUET",
    body: "The Office of Research, Innovation, & Commercialization (ORIC) at Mehran University of Engineering and Technology (MUET), Jamshoro, is dedicated to fostering a culture of innovation, excellence, and strategic growth in research. As a central hub for research activities, ORIC plays a pivotal role in transforming ideas into impactful solutions, bridging the gap between academia and industry."
  },
  "About ORIC": {
    title: "About ORIC",
    body: "ORIC was established to integrate research, innovation, and commercialization services at MUET. It was created for the integration of all these services and their commercialization to make a way forward for university self-dependence. ORIC aims to support the university's strategic research directions and policies, increase and diversify external research funding, and promote entrepreneurship, technology-transfer and commercialization activities that energize and support the local and national economy."
  },
  "Research Opportunities": {
    title: "Research Opportunities",
    body: "ORIC facilitates faculty and students in exploring diverse research opportunities. This includes interdisciplinary research projects, research groups, conferences and seminars, and postgraduate research programs. MUET has over 200 Ph.D. scholars leading groundbreaking research across multiple disciplines in engineering, sciences, and technology."
  },
  "Funding & Grants": {
    title: "Funding & Grants",
    body: "ORIC provides guidelines to faculty, officials, and students for acquiring various grants. We help increase and diversify external research funding including HEC grants, PSF grants, and international funding opportunities. ORIC also manages ORIC Seed Research Grants for innovative proposals by MUET faculty, offering up to PKR 5,00,000 in seed funding per project."
  },
  "Innovation & Startups": {
    title: "Innovation & Startups",
    body: "MUET fosters innovation and entrepreneurship through its Innovation & Entrepreneurship Center (IEC). To date, five startup companies have been registered and 14 patents have been filed by faculty and students. ORIC promotes entrepreneurship and technology-transfer activities that energize and support the local and national economy."
  },
  "Intellectual Property": {
    title: "Intellectual Property",
    body: "ORIC facilitates the protection of intellectual property through patent development and commercialization. We assist faculty members in matters relating to contracts and agreements, Material & Data Transfer agreements, and the patenting process. ORIC coordinates with the legal office to ensure proper IP protection for all university innovations."
  },
  "Research Repository": {
    title: "Research Repository",
    body: "ORIC maintains comprehensive records of grants obtained, publications, and research outputs at MUET. The repository includes research journals, grant statistics, conference proceedings, and seminar records. Access our growing collection of research work produced by MUET faculty and students across all disciplines."
  },
  "Policies & Guidelines": {
    title: "Policies & Guidelines",
    body: "ORIC supports the strategic research directions of the university through development of research-related policies. We provide guidelines for research proposal submission, grant acquisition, ethical approval processes, and compliance with HEC requirements. All grant submissions to HEC must be routed through ORIC for institutional endorsement."
  },
  "Events": {
    title: "Events",
    body: "ORIC organizes Continuing Professional Development (CPD) programs, workshops, short courses, and seminars throughout the year. Recent highlights include language courses (Chinese HSK 1 & 2), engineering workshops, and the first-ever Summer Camp at MUET Jamshoro. Stay updated with our event calendar for upcoming activities."
  },
  "Industry Collaboration": {
    title: "Industry Collaboration",
    body: "ORIC bridges the gap between academia and industry by facilitating University-Industry Linkages and Technology Transfer (ULTT). We have established global partnerships with international universities and organizations. Through objective-oriented relationships with industry, ORIC enables demand-based continuing education courses and collaborative research projects."
  },
  "Resources": {
    title: "Resources",
    body: "ORIC provides comprehensive resources to support researchers at MUET including access to research databases, funding opportunity notifications, proposal development guidance, equipment sharing, and CPD training programs. We ensure effective use of infrastructure, equipment and human resources across the university."
  },
  "Contact Us": {
    title: "Contact Us",
    body: "Office of Research, Innovation & Commercialization (ORIC)\nMehran University of Engineering & Technology\nJamshoro, Sindh – 76062, Pakistan\n\nEmail: oric@admin.muet.edu.pk\nWebsite: https://oric.muet.edu.pk\n\nFor grant submissions, please contact the ORIC office directly to ensure proper routing of your proposals."
  }
};

const NAV_ITEMS = Object.keys(NAV_CONTENT);

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  return Array.from({ length: 10 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

function Input({ icon, ...props }) {
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      {icon && (
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.4)", fontSize: 16, pointerEvents: "none" }}>
          {icon}
        </span>
      )}
      <input
        {...props}
        style={{ width: "100%", boxSizing: "border-box", padding: icon ? "14px 14px 14px 42px" : "14px 16px", background: "rgba(255,255,255,.07)", border: "1.5px solid rgba(26,86,219,0.45)", borderRadius: 12, color: "#fff", fontSize: 15, outline: "none", transition: "border-color .2s", ...(props.style || {}) }}
        onFocus={(e) => { e.target.style.borderColor = "#1a56db"; props.onFocus && props.onFocus(e); }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(26,86,219,0.45)"; props.onBlur && props.onBlur(e); }}
      />
    </div>
  );
}


function GradBtn({ children, onClick, style, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ width: "100%", padding: "15px", background: disabled ? "rgba(26,86,219,0.3)" : "linear-gradient(135deg,#1e40af,#1a56db)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", letterSpacing: ".5px", transition: "opacity .2s, transform .15s", ...(style || {}) }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = ".88"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      {children}
    </button>
  );
}


function Toggle({ value, onChange }) {
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,.07)", borderRadius: 50, padding: 4, marginBottom: 28, border: "1.5px solid rgba(26,86,219,0.3)" }}>
      {["Existing User", "New User"].map((label) => (
        <button key={label} onClick={() => onChange(label)}
          style={{ flex: 1, padding: "10px 0", borderRadius: 50, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all .25s", background: value === label ? "linear-gradient(135deg,#1e40af,#1a56db)" : "transparent", color: value === label ? "#fff" : "rgba(255,255,255,.55)" }}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Msg({ type, text }) {
  if (!text) return null;
  const colors = {
    error: { bg: "rgba(220,38,38,.12)", border: "#dc2626", text: "#fca5a5" },
    success: { bg: "rgba(0,163,224,0.12)", border: "#0369a1", text: "#7dd3fc" },
    info: { bg: "rgba(26,86,219,0.18)", border: "#1a56db", text: "#7dd3fc" },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{ padding: "12px 14px", borderRadius: 10, background: c.bg, border: `1.5px solid ${c.border}`, color: c.text, fontSize: 13.5, marginBottom: 14, lineHeight: 1.5, wordBreak: "break-word" }}>
      {text}
    </div>
  );
}


function Card({ children, style }) {
  return (
    <div style={{ background: "rgba(6,16,40,0.88)", backdropFilter: "blur(18px)", border: "1.5px solid rgba(26,86,219,0.3)", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 440, boxShadow: "0 24px 60px rgba(0,0,0,.5)", ...(style || {}) }}>
      {children}
    </div>
  );
}


function Stars() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", width: Math.random() * 2.5 + 1, height: Math.random() * 2.5 + 1, borderRadius: "50%", background: `rgba(0,163,224,${Math.random() * 0.5 + 0.15})`, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`, animationDelay: `${Math.random() * 4}s` }} />
      ))}
    </div>
  );
}


function DropdownMenu({ onSelectPage }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "rgba(26,86,219,0.25)", border: "1.5px solid rgba(26,86,219,0.5)", borderRadius: 8, color: "#7dd3fc", fontSize: 13, padding: "7px 14px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
      >
        ☰ Menu {open ? "▲" : "▼"}
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "rgba(6,16,31,0.97)", border: "1.5px solid rgba(26,86,219,0.4)", borderRadius: 12, minWidth: 240, zIndex: 100, boxShadow: "0 16px 40px rgba(0,0,0,.6)", overflow: "hidden" }}>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => { onSelectPage(item); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 18px", background: "transparent", border: "none", borderBottom: i < NAV_ITEMS.length - 1 ? "1px solid rgba(26,86,219,0.15)" : "none", color: "rgba(255,255,255,.85)", fontSize: 13.5, cursor: "pointer", fontWeight: 500, transition: "background .15s, color .15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(26,86,219,0.35)"; e.currentTarget.style.color = "#7dd3fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,.85)"; }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


function InfoPage({ pageKey, onBack }) {
  const content = NAV_CONTENT[pageKey] || { title: pageKey, body: "" };
  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <div style={{ background: "rgba(6,16,31,0.92)", backdropFilter: "blur(16px)", borderBottom: "1.5px solid rgba(26,86,219,0.25)", padding: "0 24px", display: "flex", alignItems: "center", height: 64, position: "sticky", top: 0, zIndex: 10 }}>
        <img src={ORIC_LOGO} alt="ORIC" style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 8, marginRight: 10, filter: "drop-shadow(0 0 6px rgba(0,163,224,0.5))" }} />
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}><span style={{ color: "#00a3e0" }}>ORIC</span> MUET</span>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: "#00a3e0", fontSize: 14, cursor: "pointer", marginBottom: 24, padding: 0, fontWeight: 600 }}>
          ← Back to Dashboard
        </button>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 20, borderBottom: "2px solid rgba(26,86,219,0.4)", paddingBottom: 16 }}>{content.title}</h1>
        <div style={{ color: "rgba(255,255,255,.75)", fontSize: 15.5, lineHeight: 1.8, whiteSpace: "pre-line" }}>{content.body}</div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [tab, setTab] = useState("Existing User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [genPwd, setGenPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const validateEmail = (e) => VALID_DOMAINS.some((d) => e.toLowerCase().endsWith(d));

  const handleLogin = () => {
    setErr(""); setInfo("");
    if (!email) return setErr("Please enter your email address.");
    if (!validateEmail(email)) return setErr("Only official MUET emails are allowed (@students.muet.edu.pk, @faculty.muet.edu.pk, @admin.muet.edu.pk).");
    if (!password) return setErr("Please enter your password.");
    const user = db.users[email.toLowerCase()];
    if (!user) return setErr("No account found. Please create a new account.");
    if (user.password !== password) return setErr("Incorrect password. Please try again.");
    onLogin({ email: email.toLowerCase(), isFirstLogin: user.isFirstLogin });
  };

  const handleRegister = () => {
    setErr(""); setInfo(""); setGenPwd(""); setCopied(false);
    if (!fullName.trim()) return setErr("Please enter your full name.");
    if (!email) return setErr("Please enter your email address.");
    if (!validateEmail(email)) return setErr("Only official MUET emails are allowed (@students.muet.edu.pk, @faculty.muet.edu.pk, @admin.muet.edu.pk).");
    if (!agree) return setErr("Please agree to the Terms & Privacy Policy to continue.");
    const key = email.toLowerCase();
    if (db.users[key]) return setErr("An account with this email already exists. Please log in.");
    const pwd = generatePassword();
    db.users[key] = { password: pwd, isFirstLogin: true, fullName: fullName.trim() };
    setGenPwd(pwd);
    setInfo(`✅ Account created for ${fullName.trim()}! Copy the password below and use it to log in.`);
  };

  const handleCopyAndSwitch = () => {
    navigator.clipboard.writeText(genPwd).then(() => {
      setCopied(true);
      // Pre-fill login fields and switch tab after a short delay
      setEmail(email);
      setPassword(genPwd);
      setTimeout(() => {
        setTab("Existing User");
        setInfo("");
        setGenPwd("");
        setCopied(false);
      }, 700);
    }).catch(() => {
      // Fallback for environments without clipboard
      setCopied(true);
      setTimeout(() => {
        setTab("Existing User");
        setPassword(genPwd);
        setInfo("");
        setGenPwd("");
        setCopied(false);
      }, 700);
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28, zIndex: 1 }}>
        <img src={ORIC_LOGO} alt="ORIC MUET Logo" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 14, borderRadius: 16, filter: "drop-shadow(0 0 18px rgba(0,163,224,0.55)) brightness(1.1)" }} />
        <h1 style={{ color: "#fff", fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, letterSpacing: ".5px", textAlign: "center", textShadow: "0 0 30px rgba(0,163,224,0.4)" }}>
          ORIC MUET Web‑Portal
        </h1>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13, marginTop: 4 }}>
          Office of Research, Innovation &amp; Commercialization
        </p>
      </div>

      <Card style={{ zIndex: 1 }}>
        <Toggle value={tab} onChange={(t) => { setTab(t); setErr(""); setInfo(""); setGenPwd(""); setCopied(false); }} />

        {tab === "Existing User" ? (
          <>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Welcome back</h2>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, marginBottom: 22 }}>Log in to your account to continue</p>
            <Msg type="error" text={err} />
            <Input icon="✉" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input icon="🔒" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{ textAlign: "right", marginBottom: 20, marginTop: -6 }}>
              <span style={{ color: "#00a3e0", fontSize: 13, cursor: "pointer" }} onClick={() => setInfo("To reset your password, please contact the ORIC office at oric@admin.muet.edu.pk")}>
                Forgot password?
              </span>
            </div>
            <Msg type="info" text={info} />
            <GradBtn onClick={handleLogin}>Log In</GradBtn>
          </>
        ) : (
          <>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 22 }}>Create account</h2>
            <Msg type="error" text={err} />
            <Msg type="success" text={info} />
            {genPwd && (
              <div style={{ background: "rgba(26,86,219,0.22)", border: "1.5px solid #1a56db", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12, marginBottom: 8 }}>Your generated password</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, letterSpacing: 2, flex: 1, wordBreak: "break-all" }}>{genPwd}</div>
                  <button
                    onClick={handleCopyAndSwitch}
                    style={{ flexShrink: 0, background: copied ? "linear-gradient(135deg,#0369a1,#1d4ed8)" : "linear-gradient(135deg,#1e40af,#1a56db)", border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 14px", cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s" }}
                  >
                    {copied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            )}
            <Input icon="👤" type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input icon="✉" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3, accentColor: "#1a56db", width: 16, height: 16, cursor: "pointer" }} />
              <span style={{ color: "rgba(255,255,255,.65)", fontSize: 13 }}>
                I agree to the{" "}<span style={{ color: "#00a3e0", cursor: "pointer" }}>Terms & Privacy Policy</span>
              </span>
            </div>
            <GradBtn onClick={handleRegister}>Create Account</GradBtn>
          </>
        )}
      </Card>
    </div>
  );
}


function Dashboard({ user, onLogout, onChangePassword, onNavSelect }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = ["All", "Scholarship", "Internship", "Research Grant"];
  const filtered = db.opportunities.filter((o) => {
    const matchType = activeFilter === "All" || o.type === activeFilter;
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) || o.desc.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const getUserType = () => {
    if (user.email.endsWith("@students.muet.edu.pk")) return "Student";
    if (user.email.endsWith("@faculty.muet.edu.pk")) return "Faculty";
    return "Admin";
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      {/* Topbar */}
      <div style={{ background: "rgba(6,16,31,0.92)", backdropFilter: "blur(16px)", borderBottom: "1.5px solid rgba(26,86,219,0.25)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <DropdownMenu onSelectPage={onNavSelect} />
          <img src={ORIC_LOGO} alt="ORIC" style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 8, filter: "drop-shadow(0 0 6px rgba(0,163,224,0.5))" }} />
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: ".3px" }}>
            <span style={{ color: "#00a3e0" }}>ORIC</span> MUET
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: "rgba(26,86,219,0.25)", border: "1px solid rgba(26,86,219,0.4)", borderRadius: 50, padding: "5px 14px", color: "#7dd3fc", fontSize: 12, fontWeight: 600 }}>
            {getUserType()}
          </span>
          <button onClick={onChangePassword} style={{ background: "transparent", border: "1.5px solid rgba(26,86,219,0.4)", borderRadius: 8, color: "rgba(255,255,255,.7)", fontSize: 13, padding: "6px 14px", cursor: "pointer" }}>
            ⚙ Settings
          </button>
          <button onClick={onLogout} style={{ background: "linear-gradient(135deg,#1e40af,#1a56db)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, padding: "6px 14px", cursor: "pointer", fontWeight: 600 }}>
            Log out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        {user.isFirstLogin && (
          <div style={{ background: "linear-gradient(135deg,rgba(26,86,219,0.25),rgba(0,163,224,0.15))", border: "1.5px solid #1a56db", borderRadius: 14, padding: "18px 22px", marginBottom: 28, display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>You're using a system-generated password</div>
              <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
                For security, please change your password in{" "}
                <span style={{ color: "#00a3e0", cursor: "pointer" }} onClick={onChangePassword}>Settings</span>{" "}before you continue.
              </div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Opportunities</h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14 }}>Scholarships, internships, and research grants available to the MUET community</p>
        </div>

        <Input icon="🔍" type="text" placeholder="Search opportunities…" value={search} onChange={(e) => setSearch(e.target.value)} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: "7px 18px", borderRadius: 50, border: "1.5px solid", borderColor: activeFilter === f ? "#1a56db" : "rgba(26,86,219,0.3)", background: activeFilter === f ? "linear-gradient(135deg,#1e40af,#1a56db)" : "rgba(255,255,255,.05)", color: activeFilter === f ? "#fff" : "rgba(255,255,255,.6)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,.4)", padding: 60 }}>No opportunities match your search.</div>
        ) : (
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))" }}>
            {filtered.map((op) => (
              <div key={op.id}
                style={{ background: "rgba(6,16,31,0.8)", border: "1.5px solid rgba(26,86,219,0.25)", borderRadius: 16, padding: "20px 22px", backdropFilter: "blur(12px)", transition: "border-color .2s, transform .2s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1a56db"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.25)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ background: op.badgeColor + "22", border: `1px solid ${op.badgeColor}`, color: op.badgeColor, borderRadius: 50, padding: "3px 12px", fontSize: 11, fontWeight: 700, letterSpacing: ".4px", display: "inline-block", marginBottom: 12 }}>
                  {op.badge}
                </span>
                <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{op.title}</h3>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{op.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(255,255,255,.4)", fontSize: 12 }}>📅 Deadline: {op.deadline}</span>
                  <button style={{ background: "linear-gradient(135deg,#1e40af,#1a56db)", border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 14px", cursor: "pointer" }}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function SettingsPage({ user, onBack, onPasswordChanged }) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handle = () => {
    setErr(""); setSuccess("");
    const record = db.users[user.email];
    if (!record) return setErr("Account not found.");
    if (currentPwd !== record.password) return setErr("Current password is incorrect.");
    if (newPwd.length < 8) return setErr("New password must be at least 8 characters.");
    if (newPwd !== confirmPwd) return setErr("Passwords do not match.");
    db.users[user.email].password = newPwd;
    db.users[user.email].isFirstLogin = false;
    onPasswordChanged();
    setSuccess("✅ Password changed successfully!");
    setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Card style={{ zIndex: 1 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: "#00a3e0", fontSize: 14, cursor: "pointer", marginBottom: 20, padding: 0 }}>
          ← Back to Dashboard
        </button>
        <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Change Password</h2>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, marginBottom: 24 }}>Replace your system-generated password with a personal one.</p>
        <Msg type="error" text={err} />
        <Msg type="success" text={success} />
        <Input icon="🔒" type="password" placeholder="Current password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
        <Input icon="🔑" type="password" placeholder="New password (min 8 chars)" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
        <Input icon="✅" type="password" placeholder="Confirm new password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
        <GradBtn onClick={handle} style={{ marginTop: 6 }}>Update Password</GradBtn>
        <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(0,163,224,0.08)", border: "1px solid rgba(0,163,224,0.25)", borderRadius: 10, color: "rgba(255,255,255,.5)", fontSize: 12.5, lineHeight: 1.5 }}>
          Logged in as <span style={{ color: "#00a3e0" }}>{user.email}</span>
        </div>
      </Card>
    </div>
  );
}


export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [navPage, setNavPage] = useState(null);

  useEffect(() => {
    document.title = "ORIC MUET Web-Portal";
  }, []);

  const handleLogin = (u) => { setUser(u); setPage("dashboard"); };
  const handleLogout = () => { setUser(null); setPage("login"); setNavPage(null); };
  const handlePasswordChanged = () => { if (user) setUser({ ...user, isFirstLogin: false }); };
  const handleNavSelect = (key) => { setNavPage(key); setPage("info"); };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #06101f; font-family: 'Segoe UI', system-ui, sans-serif; color: #fff; }
        @keyframes twinkle {
          0%,100% { opacity:.15; transform:scale(1); }
          50% { opacity:.7; transform:scale(1.4); }
        }
        input::placeholder { color: rgba(255,255,255,.35); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06101f; }
        ::-webkit-scrollbar-thumb { background: #1a56db; border-radius: 3px; }
      `}</style>

      <Stars />
      <div style={{ position: "fixed", top: "10%", left: "15%", width: 350, height: 350, borderRadius: "50%", background: "rgba(26,86,219,0.1)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "rgba(0,163,224,0.08)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {page === "login" && <LoginPage onLogin={handleLogin} />}
        {page === "dashboard" && user && (
          <Dashboard user={user} onLogout={handleLogout} onChangePassword={() => setPage("settings")} onNavSelect={handleNavSelect} />
        )}
        {page === "settings" && user && (
          <SettingsPage user={user} onBack={() => setPage("dashboard")} onPasswordChanged={handlePasswordChanged} />
        )}
        {page === "info" && user && navPage && (
          <InfoPage pageKey={navPage} onBack={() => setPage("dashboard")} />
        )}
      </div>
    </>
  );
}
