import React, { useState, useMemo } from "react";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  Check,
  Eye,
  Film,
  Heart,
  MapPin,
  MessageSquare,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Search,
  Send,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";

const SITE_URL = "https://scouter-site.vercel.app/";

/* ------------------------------------------------------------------ */
/* VERIFIED GEORGIAN FOOTBALL TALENT DATABASE                         */
/* ------------------------------------------------------------------ */
const ATHLETES_DB = [
  {
    id: 1,
    name: "Giorgi Kvaratskhelia",
    initials: "GK",
    age: 17,
    ageGroup: "U17",
    position: "Striker",
    region: "Samegrelo",
    city: "Zugdidi",
    club: "Zugdidi Academy",
    height: "183 cm",
    weight: "74 kg",
    foot: "Right",
    verified: true,
    verifiedBy: "GFF Youth Registry & Coach D. Shengelia",
    rating: 87,
    sprint30m: "3.98 s",
    passAccuracy: "81%",
    topSpeed: "33.4 km/h",
    fullMatches: 8,
    goalsAssists: "14G / 5A",
    stats: { PAC: 91, SHO: 88, PAS: 81, DRI: 86, DEF: 45, PHY: 83 },
    gradient: "from-emerald-600 to-teal-500",
    matchTitle: "Zugdidi U17 vs. Batumi Academy — Full 90' Tactical Feed",
    matchDuration: "90:00",
    summary:
      "Clinical central forward with explosive acceleration in behind and verified physical test recordings. 14 goals in 18 regional academy fixtures.",
  },
  {
    id: 2,
    name: "Luka Mchedlishvili",
    initials: "LM",
    age: 16,
    ageGroup: "U17",
    position: "Left Back",
    region: "Imereti",
    city: "Kutaisi",
    club: "FC Torpedo Youth",
    height: "179 cm",
    weight: "70 kg",
    foot: "Left",
    verified: true,
    verifiedBy: "GFF Youth Registry & Coach G. Daraselia",
    rating: 84,
    sprint30m: "4.08 s",
    passAccuracy: "87%",
    topSpeed: "32.8 km/h",
    fullMatches: 6,
    goalsAssists: "3G / 9A",
    stats: { PAC: 88, SHO: 72, PAS: 87, DRI: 83, DEF: 82, PHY: 80 },
    gradient: "from-blue-600 to-emerald-500",
    matchTitle: "Torpedo Kutaisi U17 vs. Saburtalo — Full 90' Tactical Feed",
    matchDuration: "90:00",
    summary:
      "Modern overlapping left-back with strong 1v1 recovery pace and high progressive pass completion from deep zones.",
  },
  {
    id: 3,
    name: "Dato Beridze",
    initials: "DB",
    age: 16,
    ageGroup: "U17",
    position: "Midfielder",
    region: "Tbilisi",
    city: "Tbilisi",
    club: "Saburtalo Youth",
    height: "176 cm",
    weight: "68 kg",
    foot: "Both",
    verified: true,
    verifiedBy: "GFF Youth Registry & Academy Telemetry",
    rating: 85,
    sprint30m: "4.15 s",
    passAccuracy: "91%",
    topSpeed: "31.9 km/h",
    fullMatches: 9,
    goalsAssists: "6G / 11A",
    stats: { PAC: 82, SHO: 79, PAS: 91, DRI: 86, DEF: 78, PHY: 79 },
    gradient: "from-indigo-600 to-blue-500",
    matchTitle: "Tbilisi U17 Cup Semi-Final — Full 90' Tactical Feed",
    matchDuration: "90:00",
    summary:
      "Press-resistant central midfielder dictating tempo with 91% pass accuracy and verified 11.8 km average match distance.",
  },
  {
    id: 4,
    name: "Saba Tkeshelashvili",
    initials: "ST",
    age: 18,
    ageGroup: "U19",
    position: "Goalkeeper",
    region: "Imereti",
    city: "Zestaponi",
    club: "Imereti Regional XI",
    height: "191 cm",
    weight: "83 kg",
    foot: "Right",
    verified: true,
    verifiedBy: "Regional Federation & GK Coach Log",
    rating: 83,
    sprint30m: "4.35 s",
    passAccuracy: "84%",
    topSpeed: "29.5 km/h",
    fullMatches: 7,
    goalsAssists: "6 Clean Sheets",
    stats: { PAC: 74, SHO: 78, PAS: 84, DRI: 75, DEF: 85, PHY: 86 },
    gradient: "from-cyan-600 to-blue-600",
    matchTitle: "Western Georgia U19 Showcase — Full 90' Tactical Feed",
    matchDuration: "90:00",
    summary:
      "Commanding 191 cm goalkeeper comfortable building from the back under high press, backed by official reflex & reach test footage.",
  },
  {
    id: 5,
    name: "Tornike Gelashvili",
    initials: "TG",
    age: 17,
    ageGroup: "U17",
    position: "Left Back",
    region: "Tbilisi",
    city: "Tbilisi",
    club: "Independent / Regional",
    height: "180 cm",
    weight: "72 kg",
    foot: "Left",
    verified: false,
    verifiedBy: "Pending Local Coach Confirmation",
    rating: 78,
    sprint30m: "4.20 s",
    passAccuracy: "80%",
    topSpeed: "31.6 km/h",
    fullMatches: 2,
    goalsAssists: "2G / 4A",
    stats: { PAC: 83, SHO: 68, PAS: 80, DRI: 77, DEF: 76, PHY: 78 },
    gradient: "from-slate-700 to-slate-600",
    matchTitle: "Regional Friendly Match — Full 90' Upload",
    matchDuration: "90:00",
    summary:
      "Self-uploaded prospect awaiting coach verification sign-off. Full uncut match recording available for remote review.",
  },
];

const CLUB_VIEWS_LOG = [
  { club: "Wisła Kraków", country: "Poland · Ekstraklasa / I Liga", time: "2 hours ago", action: "Watched Full 90' Match" },
  { club: "FC Baník Ostrava", country: "Czech Republic · First League", time: "Yesterday", action: "Added to U17 Watchlist" },
  { club: "Dinamo Zagreb Academy", country: "Croatia · HNL Youth", time: "3 days ago", action: "Viewed Physical Telemetry" },
];

/* ------------------------------------------------------------------ */
/* MAIN APP SHELL (Fixed Sidebar + Master-Detail SaaS Workspace)      */
/* ------------------------------------------------------------------ */
export default function App() {
  const [role, setRole] = useState("scout"); // 'scout' | 'athlete'
  const [scoutTab, setScoutTab] = useState("triage"); // 'triage' | 'shortlist' | 'messages'
  const [athleteTab, setAthleteTab] = useState("studio"); // 'studio' | 'analytics'
  const [theme, setTheme] = useState("dark");

  // Scout Workspace States
  const [posFilter, setPosFilter] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [shortlistIds, setShortlistIds] = useState([1]);
  const [passedIds, setPassedIds] = useState([]);
  const [scoutNotes, setScoutNotes] = useState({
    1: "Top target for summer U17 trial. Explosive 30m split (3.98s).",
  });
  const [noteDraft, setNoteDraft] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Scout Messaging / Invite States
  const [activeChatId, setActiveChatId] = useState(1);
  const [chatInput, setChatInput] = useState("");
  const [messagesByPlayer, setMessagesByPlayer] = useState({
    1: [
      { id: 1, sender: "scout", text: "Hello Coach Shengelia & Giorgi's guardian — we reviewed the Zugdidi U17 full match tape." },
      { id: 2, sender: "guardian", text: "Thank you for reaching out. Giorgi's official 30m sprint logs are updated on his profile." },
    ],
  });

  // Athlete Studio States
  const [playerName, setPlayerName] = useState("Nika Maisuradze");
  const [age, setAge] = useState("16");
  const [city, setCity] = useState("Zugdidi");
  const [position, setPosition] = useState("ST");
  const [cardStyle, setCardStyle] = useState("pro");
  const [verified, setVerified] = useState(true);
  const [copied, setCopied] = useState(false);
  const [attrs, setAttrs] = useState({
    PAC: 89,
    SHO: 85,
    PAS: 80,
    DRI: 86,
    DEF: 46,
    PHY: 82,
  });

  const dark = theme === "dark";

  const filteredAthletes = useMemo(() => {
    return ATHLETES_DB.filter((a) => {
      if (posFilter !== "All" && a.position !== posFilter) return false;
      if (verifiedOnly && !a.verified) return false;
      return true;
    });
  }, [posFilter, verifiedOnly]);

  const activeAthlete = useMemo(() => {
    return filteredAthletes.find((a) => a.id === selectedId) || filteredAthletes[0] || null;
  }, [filteredAthletes, selectedId]);

  const shortlistedAthletes = useMemo(() => {
    return ATHLETES_DB.filter((a) => shortlistIds.includes(a.id));
  }, [shortlistIds]);

  const overallRating = useMemo(() => {
    const vals = Object.values(attrs);
    return Math.round(vals.reduce((acc, v) => acc + Number(v), 0) / vals.length);
  }, [attrs]);

  const initials = useMemo(() => {
    const parts = playerName.trim().split(" ");
    if (!parts[0]) return "SC";
    return parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("");
  }, [playerName]);

  const advanceToNext = (currentId) => {
    const idx = filteredAthletes.findIndex((a) => a.id === currentId);
    if (idx !== -1 && idx + 1 < filteredAthletes.length) {
      setSelectedId(filteredAthletes[idx + 1].id);
      setIsPlaying(false);
    }
  };

  const handlePass = (id) => {
    setShortlistIds((prev) => prev.filter((item) => item !== id));
    setPassedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    advanceToNext(id);
  };

  const handleShortlist = (id) => {
    setPassedIds((prev) => prev.filter((item) => item !== id));
    setShortlistIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    advanceToNext(id);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!activeAthlete || !noteDraft.trim()) return;
    setScoutNotes((prev) => ({ ...prev, [activeAthlete.id]: noteDraft.trim() }));
    setNoteDraft("");
  };

  const handleInviteToTrial = (athlete) => {
    if (!shortlistIds.includes(athlete.id)) {
      setShortlistIds((prev) => [...prev, athlete.id]);
    }
    setActiveChatId(athlete.id);
    if (!messagesByPlayer[athlete.id]) {
      setMessagesByPlayer((prev) => ({
        ...prev,
        [athlete.id]: [
          {
            id: Date.now(),
            sender: "scout",
            text: `Official Trial Inquiry: Wisła Kraków Scouting Dept. would like to invite ${athlete.name} for an upcoming assessment.`,
          },
        ],
      }));
    }
    setScoutTab("messages");
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessagesByPlayer((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        { id: Date.now(), sender: "scout", text: chatInput.trim() },
      ],
    }));
    setChatInput("");
  };

  // Theme helper classes
  const shellBg = dark ? "bg-slate-950 text-slate-200" : "bg-slate-100 text-slate-800";
  const sidebarBg = dark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200";
  const panelBg = dark ? "bg-slate-900/70 border-white/10" : "bg-white border-slate-200";
  const subPanelBg = dark ? "bg-slate-950 border-white/10" : "bg-slate-50 border-slate-200";
  const headingText = dark ? "text-white" : "text-slate-900";
  const mutedText = dark ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col lg:flex-row font-sans ${shellBg}`}>
      {/* ============================================================== */}
      {/* LEFT APP SIDEBAR (Fixed Software Navigation)                   */}
      {/* ============================================================== */}
      <aside
        className={`w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r flex flex-col justify-between z-30 ${sidebarBg}`}
      >
        <div>
          {/* App Brand Header */}
          <div className={`px-4 py-3.5 border-b flex items-center justify-between ${dark ? "border-white/10" : "border-slate-200"}`}>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center rotate-12">
                <Activity size={17} className="text-slate-950 -rotate-12" />
              </div>
              <div>
                <span className={`text-base font-black tracking-tight block leading-none ${headingText}`}>
                  Scouter<span className="text-emerald-500">.</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">
                  WORKSPACE v2.4
                </span>
              </div>
            </div>

            <button
              onClick={() => setTheme(dark ? "light" : "dark")}
              aria-label="Toggle Theme"
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                dark ? "bg-slate-950 border-white/10 text-amber-400" : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Account Role Switcher Box */}
          <div className="p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 mb-1.5">
              Active Workspace
            </p>
            <div className={`grid grid-cols-2 gap-1 p-1 rounded-xl border ${subPanelBg}`}>
              <button
                onClick={() => setRole("scout")}
                className={`py-2 px-2 rounded-lg text-xs font-black flex items-center justify-center transition-all ${
                  role === "scout" ? "bg-blue-600 text-white shadow-sm" : mutedText
                }`}
              >
                <Users size={13} className="mr-1.5" /> Scout B2B
              </button>
              <button
                onClick={() => setRole("athlete")}
                className={`py-2 px-2 rounded-lg text-xs font-black flex items-center justify-center transition-all ${
                  role === "athlete" ? "bg-emerald-500 text-slate-950 shadow-sm" : mutedText
                }`}
              >
                <Trophy size={13} className="mr-1.5" /> Athlete B2C
              </button>
            </div>

            {/* Logged-in Account Badge */}
            <div className={`mt-3 p-2.5 rounded-xl border flex items-center space-x-2.5 ${subPanelBg}`}>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-white flex-shrink-0 ${
                  role === "scout" ? "bg-blue-600" : "bg-emerald-600"
                }`}
              >
                {role === "scout" ? "WK" : initials}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${headingText}`}>
                  {role === "scout" ? "Tomasz Kowalski" : playerName}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {role === "scout" ? "Wisła Kraków · Pro Club" : `U17 ${position} · Verified`}
                </p>
              </div>
            </div>
          </div>

          {/* Role-Specific Navigation Menu */}
          <nav className="px-3 pb-3 flex lg:flex-col gap-1 overflow-x-auto">
            {role === "scout" ? (
              <>
                <button
                  onClick={() => setScoutTab("triage")}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    scoutTab === "triage"
                      ? "bg-blue-600/15 text-blue-500 border border-blue-500/30"
                      : `${mutedText} hover:bg-slate-800/40`
                  }`}
                >
                  <span className="flex items-center">
                    <Search size={15} className="mr-2.5" /> Rapid Triage
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 ml-2">
                    {filteredAthletes.length}
                  </span>
                </button>

                <button
                  onClick={() => setScoutTab("shortlist")}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    scoutTab === "shortlist"
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      : `${mutedText} hover:bg-slate-800/40`
                  }`}
                >
                  <span className="flex items-center">
                    <Heart size={15} className="mr-2.5" /> Shortlist
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black ml-2">
                    {shortlistIds.length}
                  </span>
                </button>

                <button
                  onClick={() => setScoutTab("messages")}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    scoutTab === "messages"
                      ? "bg-blue-600/15 text-blue-500 border border-blue-500/30"
                      : `${mutedText} hover:bg-slate-800/40`
                  }`}
                >
                  <span className="flex items-center">
                    <MessageSquare size={15} className="mr-2.5" /> Trial Inbox
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 ml-2">
                    {Object.keys(messagesByPlayer).length}
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAthleteTab("studio")}
                  className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    athleteTab === "studio"
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      : `${mutedText} hover:bg-slate-800/40`
                  }`}
                >
                  <Sparkles size={15} className="mr-2.5" /> EA FC Card Studio
                </button>

                <button
                  onClick={() => setAthleteTab("analytics")}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    athleteTab === "analytics"
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      : `${mutedText} hover:bg-slate-800/40`
                  }`}
                >
                  <span className="flex items-center">
                    <Eye size={15} className="mr-2.5" /> Scout Views
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black ml-2">
                    14
                  </span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Bottom Exit to Marketing Website */}
        <div className={`hidden lg:block p-3 border-t ${dark ? "border-white/10" : "border-slate-200"}`}>
          <a
            href={SITE_URL}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center transition-colors ${
              dark
                ? "border-white/10 text-slate-400 hover:text-white hover:bg-slate-800"
                : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <ArrowLeft size={13} className="mr-1.5" /> Back to Scouter Site
          </a>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* MAIN WORKSPACE CONTENT AREA                                    */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top App Toolbar */}
        <header
          className={`h-12 px-4 border-b flex items-center justify-between flex-shrink-0 ${
            dark ? "bg-slate-950 border-white/10" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center space-x-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={headingText}>
              {role === "scout"
                ? scoutTab === "triage"
                  ? "Scouting Terminal / Rapid Triage Queue"
                  : scoutTab === "shortlist"
                  ? "Club Shortlist & Candidate Comparison"
                  : "Guardian-Moderated Trial Inbox"
                : athleteTab === "studio"
                ? "Athlete Studio / Verified Player Card Builder"
                : "Scout Reach & Match Archive Telemetry"}
            </span>
          </div>

          {role === "scout" && scoutTab === "triage" && (
            <div className="flex items-center gap-2">
              <select
                value={posFilter}
                onChange={(e) => setPosFilter(e.target.value)}
                className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${subPanelBg} ${headingText}`}
              >
                <option value="All">All Positions</option>
                <option value="Striker">Striker</option>
                <option value="Left Back">Left Back</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Goalkeeper">Goalkeeper</option>
              </select>

              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center ${
                  verifiedOnly
                    ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/40"
                    : `${subPanelBg} ${mutedText}`
                }`}
              >
                <BadgeCheck size={13} className="mr-1" /> Verified
              </button>
            </div>
          )}
        </header>

        {/* ============================================================ */}
        {/* SCOUT ROLE: 1. RAPID TRIAGE 3-PANE TERMINAL                  */}
        {/* ============================================================ */}
        {role === "scout" && scoutTab === "triage" && (
          <div className="flex-1 grid lg:grid-cols-12 min-h-0 overflow-hidden">
            {/* PANE 1: Prospect Queue List */}
            <div
              className={`lg:col-span-3 border-r overflow-y-auto p-3 space-y-2 ${
                dark ? "border-white/10 bg-slate-950/60" : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  Queue ({filteredAthletes.length})
                </span>
                {(passedIds.length > 0 || posFilter !== "All" || verifiedOnly) && (
                  <button
                    onClick={() => {
                      setPassedIds([]);
                      setPosFilter("All");
                      setVerifiedOnly(false);
                    }}
                    className="text-[11px] font-bold text-emerald-500 hover:underline flex items-center"
                  >
                    <RotateCcw size={11} className="mr-1" /> Reset
                  </button>
                )}
              </div>

              {filteredAthletes.map((athlete) => {
                const isSelected = activeAthlete?.id === athlete.id;
                const isShort = shortlistIds.includes(athlete.id);
                const isPass = passedIds.includes(athlete.id);

                return (
                  <button
                    key={athlete.id}
                    onClick={() => {
                      setSelectedId(athlete.id);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? dark
                          ? "bg-slate-900 border-blue-500 ring-1 ring-blue-500"
                          : "bg-white border-blue-500 ring-1 ring-blue-500 shadow-sm"
                        : `${panelBg} opacity-90 hover:opacity-100`
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-xs font-bold truncate ${headingText}`}>{athlete.name}</span>
                        {athlete.verified && <BadgeCheck size={13} className="text-emerald-500 flex-shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {athlete.position} · {athlete.ageGroup} · {athlete.sprint30m}
                      </p>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className={`text-sm font-black ${headingText}`}>{athlete.rating}</span>
                      {isShort && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                          Shortlist
                        </span>
                      )}
                      {isPass && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 mt-0.5">
                          Passed
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* PANE 2: Active Candidate Telemetry & Video Viewport */}
            <div className="lg:col-span-6 flex flex-col min-h-0 overflow-hidden">
              {activeAthlete ? (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {/* Player Identity Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeAthlete.gradient} flex flex-col items-center justify-center text-white font-black shadow-md`}
                        >
                          <span className="text-xl leading-none">{activeAthlete.rating}</span>
                          <span className="text-[9px] uppercase mt-0.5">OVR</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h2 className={`text-xl font-black ${headingText}`}>{activeAthlete.name}</h2>
                            {activeAthlete.verified && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                                <BadgeCheck size={12} className="mr-1" /> VERIFIED
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-0.5 flex items-center ${mutedText}`}>
                            <MapPin size={12} className="mr-1 text-emerald-500" /> {activeAthlete.club} ·{" "}
                            {activeAthlete.city}, {activeAthlete.region} · {activeAthlete.age} yrs
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        {activeAthlete.goalsAssists}
                      </span>
                    </div>

                    {/* Simulated Tactical Video Viewport */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900 relative">
                      <div
                        className={`h-44 sm:h-52 bg-gradient-to-br ${activeAthlete.gradient} relative flex flex-col justify-between p-4 text-white`}
                      >
                        <div className="absolute inset-0 bg-slate-950/55" />
                        <div className="relative z-10 flex items-center justify-between text-xs">
                          <span className="px-2.5 py-1 rounded-md bg-black/50 font-mono font-bold flex items-center">
                            <Film size={13} className="mr-1.5 text-emerald-400" /> {activeAthlete.matchTitle}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px]">
                            UNCUT 90'
                          </span>
                        </div>

                        <div className="relative z-10 flex justify-center">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-14 h-14 rounded-full bg-white/20 hover:bg-emerald-500 hover:text-slate-950 backdrop-blur-md flex items-center justify-center transition-all shadow-xl"
                          >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                          </button>
                        </div>

                        {/* Simulated Video Scrubber */}
                        <div className="relative z-10 space-y-1.5">
                          <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-emerald-400 transition-all duration-500 ${
                                isPlaying ? "w-2/3" : "w-1/4"
                              }`}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-slate-300">
                            <span>{isPlaying ? "24:18 · Tactical Wide Cam" : "00:00 · Ready"}</span>
                            <span>{activeAthlete.matchDuration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Telemetry Strip */}
                    <div className="grid grid-cols-4 gap-2.5">
                      {[
                        ["30m Sprint", activeAthlete.sprint30m],
                        ["Pass %", activeAthlete.passAccuracy],
                        ["Top Speed", activeAthlete.topSpeed],
                        ["Body / Foot", `${activeAthlete.height} · ${activeAthlete.foot}`],
                      ].map(([k, v]) => (
                        <div key={k} className={`border rounded-xl p-3 ${panelBg}`}>
                          <p className="text-[10px] font-bold uppercase text-slate-500">{k}</p>
                          <p className={`text-sm font-black mt-0.5 ${headingText}`}>{v}</p>
                        </div>
                      ))}
                    </div>

                    {/* Attribute Bars + Verification Log */}
                    <div className={`border rounded-2xl p-4 space-y-3 ${panelBg}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Attribute Telemetry
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-500 flex items-center">
                          <ShieldCheck size={13} className="mr-1" /> {activeAthlete.verifiedBy}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                        {Object.entries(activeAthlete.stats).map(([stat, val]) => (
                          <div key={stat}>
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className={mutedText}>{stat}</span>
                              <span className={headingText}>{val}</span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-slate-800" : "bg-slate-200"}`}>
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                                style={{ width: `${val}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className={`text-xs pt-2 border-t leading-relaxed ${dark ? "border-white/5 text-slate-300" : "border-slate-100 text-slate-600"}`}>
                        {activeAthlete.summary}
                      </p>
                    </div>
                  </div>

                  {/* Sticky Bottom Triage Action Bar */}
                  <div
                    className={`p-3.5 border-t flex items-center gap-2.5 flex-shrink-0 ${
                      dark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
                    }`}
                  >
                    <button
                      onClick={() => handlePass(activeAthlete.id)}
                      className={`flex-1 py-2.5 rounded-xl border font-black text-xs flex items-center justify-center transition-colors ${
                        dark
                          ? "bg-slate-950 hover:bg-rose-500/15 border-white/10 text-slate-300 hover:text-rose-400"
                          : "bg-slate-100 hover:bg-rose-50 border-slate-200 text-slate-700 hover:text-rose-600"
                      }`}
                    >
                      <X size={15} className="mr-1.5" /> Pass
                    </button>

                    <button
                      onClick={() => handleInviteToTrial(activeAthlete)}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center"
                    >
                      Invite to Trial
                    </button>

                    <button
                      onClick={() => handleShortlist(activeAthlete.id)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center"
                    >
                      <Heart size={15} className="mr-1.5" /> Shortlist
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-6 text-center">
                  <p className={mutedText}>No candidates match this filter.</p>
                </div>
              )}
            </div>

            {/* PANE 3: Live Shortlist & Private Scout Notes */}
            <div
              className={`hidden lg:flex lg:col-span-3 border-l flex-col p-4 overflow-y-auto space-y-5 ${
                dark ? "border-white/10 bg-slate-950/60" : "border-slate-200 bg-slate-50"
              }`}
            >
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                  Club Shortlist ({shortlistedAthletes.length})
                </h3>
                {shortlistedAthletes.length === 0 ? (
                  <p className="text-xs text-slate-500">Click "Shortlist" to save prospects here.</p>
                ) : (
                  <div className="space-y-2">
                    {shortlistedAthletes.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`cursor-pointer p-2.5 rounded-xl border flex items-center justify-between ${panelBg}`}
                      >
                        <div className="min-w-0">
                          <p className={`text-xs font-bold truncate ${headingText}`}>{item.name}</p>
                          <p className="text-[10px] text-slate-500">
                            {item.position} · OVR {item.rating}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInviteToTrial(item);
                          }}
                          className="text-[10px] font-black px-2 py-1 rounded bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950"
                        >
                          Message
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {activeAthlete && (
                <div className={`pt-4 border-t ${dark ? "border-white/10" : "border-slate-200"}`}>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                    Scout Notes · {activeAthlete.name.split(" ")[0]}
                  </h3>
                  {scoutNotes[activeAthlete.id] && (
                    <div className={`p-3 rounded-xl border text-xs mb-3 leading-relaxed ${panelBg}`}>
                      {scoutNotes[activeAthlete.id]}
                    </div>
                  )}
                  <form onSubmit={handleSaveNote} className="space-y-2">
                    <textarea
                      rows={3}
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Add private scouting evaluation..."
                      className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-emerald-500 ${panelBg} ${headingText}`}
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                    >
                      Save Note
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCOUT ROLE: 2. SHORTLIST & COMPARE TABLE                     */}
        {/* ============================================================ */}
        {role === "scout" && scoutTab === "shortlist" && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-xl font-black mb-4 ${headingText}`}>
                Shortlisted Candidates ({shortlistedAthletes.length})
              </h2>
              {shortlistedAthletes.length === 0 ? (
                <div className={`border rounded-2xl p-10 text-center ${panelBg}`}>
                  <p className={`text-sm ${mutedText}`}>Your shortlist is currently empty. Review prospects in Rapid Triage.</p>
                  <button
                    onClick={() => setScoutTab("triage")}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Go to Rapid Triage
                  </button>
                </div>
              ) : (
                <div className={`border rounded-2xl overflow-x-auto ${panelBg}`}>
                  <table className="w-full text-left text-xs">
                    <thead className={`border-b uppercase text-slate-500 ${dark ? "border-white/10" : "border-slate-200"}`}>
                      <tr>
                        <th className="p-4">Athlete</th>
                        <th className="p-4">Pos / Age</th>
                        <th className="p-4">30m Sprint</th>
                        <th className="p-4">Pass %</th>
                        <th className="p-4">Full Matches</th>
                        <th className="p-4">Index</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {shortlistedAthletes.map((a) => (
                        <tr key={a.id}>
                          <td className="p-4 font-bold">
                            <span className={`flex items-center ${headingText}`}>
                              {a.name}
                              {a.verified && <BadgeCheck size={14} className="ml-1.5 text-emerald-500" />}
                            </span>
                            <span className="text-[11px] text-slate-500">{a.club}</span>
                          </td>
                          <td className="p-4">
                            {a.position} ({a.ageGroup})
                          </td>
                          <td className="p-4 font-mono font-bold">{a.sprint30m}</td>
                          <td className="p-4 font-mono font-bold">{a.passAccuracy}</td>
                          <td className="p-4 text-emerald-500 font-bold">{a.fullMatches} x 90'</td>
                          <td className="p-4 font-black text-base">{a.rating}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleInviteToTrial(a)}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400"
                            >
                              Invite to Trial
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCOUT ROLE: 3. GUARDIAN-MODERATED TRIAL INBOX                */}
        {/* ============================================================ */}
        {role === "scout" && scoutTab === "messages" && (
          <div className="flex-1 grid md:grid-cols-12 min-h-0 overflow-hidden">
            <div className={`md:col-span-4 border-r overflow-y-auto p-3 space-y-2 ${dark ? "border-white/10" : "border-slate-200"}`}>
              {ATHLETES_DB.filter((a) => messagesByPlayer[a.id] || shortlistIds.includes(a.id)).map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActiveChatId(a.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    activeChatId === a.id
                      ? "bg-blue-600/15 border-blue-500"
                      : panelBg
                  }`}
                >
                  <p className={`text-xs font-bold ${headingText}`}>{a.name}</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {a.club} · Guardian Channel Active
                  </p>
                </button>
              ))}
            </div>

            <div className="md:col-span-8 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    U18 Safeguarding Active · Guardian & Academy Copied
                  </span>
                </div>
                {(messagesByPlayer[activeChatId] || []).map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "scout" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        m.sender === "scout"
                          ? "bg-blue-600 text-white"
                          : `${panelBg} border ${headingText}`
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendChat}
                className={`p-3 border-t flex gap-2 ${dark ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"}`}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Write message to academy & guardian..."
                  className={`flex-1 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-500 ${subPanelBg} ${headingText}`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center"
                >
                  <Send size={14} className="mr-1.5" /> Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ATHLETE ROLE: 1. EA FC CARD STUDIO                           */}
        {/* ============================================================ */}
        {role === "athlete" && athleteTab === "studio" && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Editor */}
              <div className={`lg:col-span-7 border rounded-2xl p-6 space-y-5 ${panelBg}`}>
                <div>
                  <h2 className={`text-lg font-black ${headingText}`}>EA FC / FIFA Verified Card Generator</h2>
                  <p className={`text-xs mt-1 ${mutedText}`}>
                    Customize your verified scouting card to share on Instagram, TikTok, or directly with European academies.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2 text-xs font-bold ${subPanelBg} ${headingText}`}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Pos</label>
                      <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className={`w-full border rounded-xl px-2 py-2 text-xs font-bold ${subPanelBg} ${headingText}`}
                      >
                        {["ST", "LW", "RW", "CAM", "CM", "LB", "CB", "GK"].map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={`w-full border rounded-xl px-2 py-2 text-xs font-bold ${subPanelBg} ${headingText}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`w-full border rounded-xl px-2 py-2 text-xs font-bold ${subPanelBg} ${headingText}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCardStyle("basic")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border ${
                      cardStyle === "basic" ? "bg-slate-700 text-white border-slate-600" : `${subPanelBg} ${mutedText}`
                    }`}
                  >
                    Basic Card
                  </button>
                  <button
                    onClick={() => setCardStyle("pro")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black ${
                      cardStyle === "pro"
                        ? "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950"
                        : `${subPanelBg} ${mutedText} border`
                    }`}
                  >
                    ★ Pro Gold/Emerald
                  </button>
                  <button
                    onClick={() => setVerified(!verified)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border flex items-center ${
                      verified ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" : `${subPanelBg} ${mutedText}`
                    }`}
                  >
                    <BadgeCheck size={13} className="mr-1" /> {verified ? "Verified ✓" : "Unverified"}
                  </button>
                </div>

                <div className={`border rounded-xl p-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 ${subPanelBg}`}>
                  {Object.entries(attrs).map(([k, v]) => (
                    <div key={k}>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-500">{k}</span>
                        <span className={headingText}>{v}</span>
                      </div>
                      <input
                        type="range"
                        min="45"
                        max="99"
                        value={v}
                        onChange={(e) => setAttrs({ ...attrs, [k]: Number(e.target.value) })}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Live Card Output */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-5">
                <div className="relative w-72">
                  <div
                    className={`absolute -inset-3 rounded-3xl blur-2xl ${
                      cardStyle === "pro"
                        ? "bg-gradient-to-tr from-amber-400/30 via-emerald-500/25 to-blue-500/20"
                        : "bg-slate-500/15"
                    }`}
                  />
                  <div
                    className={`relative rounded-3xl p-6 border-2 shadow-2xl ${
                      cardStyle === "pro"
                        ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 border-amber-400/80 text-white"
                        : dark
                        ? "bg-slate-900 border-slate-700 text-slate-200"
                        : "bg-gradient-to-b from-slate-100 to-slate-200 border-slate-300 text-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-5xl font-black leading-none ${cardStyle === "pro" ? "text-amber-400" : ""}`}>
                          {overallRating}
                        </span>
                        <span className="block text-xs font-black tracking-widest mt-1 text-emerald-400">
                          {position} · U{Number(age) <= 15 ? "15" : Number(age) <= 17 ? "17" : "19"}
                        </span>
                        <span className="inline-block mt-2 text-[10px] font-black px-2 py-0.5 rounded bg-red-600 text-white">
                          GEO · {city.toUpperCase()}
                        </span>
                      </div>
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl ${
                          cardStyle === "pro"
                            ? "bg-gradient-to-br from-amber-400 via-emerald-500 to-blue-600 text-slate-950"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {initials}
                      </div>
                    </div>

                    <div className="mt-5 text-center border-b border-current/15 pb-3">
                      <div className="flex items-center justify-center space-x-1.5">
                        <h3 className="text-lg font-black uppercase truncate">{playerName || "Athlete"}</h3>
                        {verified && <BadgeCheck size={16} className="text-emerald-400 flex-shrink-0" />}
                      </div>
                      <p className="text-[10px] opacity-75 font-bold mt-0.5">
                        {verified ? "FEDERATION VERIFIED · SCOUTER.GE" : "SELF-REPORTED · SCOUTER.GE"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 mt-4 text-xs font-black px-2">
                      {Object.entries(attrs).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="opacity-70">{k}</span>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="w-72 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="mr-1.5" strokeWidth={3} /> Card Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={15} className="mr-1.5" /> Export & Share Card
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ATHLETE ROLE: 2. SCOUT VIEWS & MATCH LOGS                    */}
        {/* ============================================================ */}
        {role === "athlete" && athleteTab === "analytics" && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  ["Club Profile Views (30d)", "14", "+5 this week"],
                  ["Full Match Tape Watch Time", "142 mins", "3 European scouts"],
                  ["Verification Status", "Active ✓", "GFF Registry Synced"],
                ].map(([label, val, sub]) => (
                  <div key={label} className={`border rounded-2xl p-5 ${panelBg}`}>
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className={`text-2xl font-black mt-1 ${headingText}`}>{val}</p>
                    <p className="text-xs font-bold text-emerald-500 mt-1">{sub}</p>
                  </div>
                ))}
              </div>

              <div className={`border rounded-2xl p-5 ${panelBg}`}>
                <h3 className={`text-sm font-black uppercase tracking-wider mb-4 ${headingText}`}>
                  Recent European Club Activity (Pro Athlete Analytics)
                </h3>
                <div className="space-y-3">
                  {CLUB_VIEWS_LOG.map((log) => (
                    <div
                      key={log.club}
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${subPanelBg}`}
                    >
                      <div>
                        <p className={`text-sm font-bold ${headingText}`}>{log.club}</p>
                        <p className="text-xs text-slate-500">{log.country}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-500 block">{log.action}</span>
                        <span className="text-[11px] text-slate-500">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
