import React, { useState, useMemo, useRef, useEffect, useId } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronUp,
  Eye,
  Film,
  Heart,
  Info,
  Lock,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  RotateCcw,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

const SITE_URL = "https://scouter-site.vercel.app/";

/* ------------------------------------------------------------------ */
/* VERIFIED GEORGIAN TALENT DATABASE (Ages 14–25)                     */
/* ------------------------------------------------------------------ */
const ATHLETES_DB = [
  {
    id: 1,
    name: "Giorgi Kvaratskhelia",
    initials: "GK",
    age: 17,
    ageGroup: "U17",
    isMinor: true,
    position: "Striker",
    region: "Samegrelo",
    city: "Zugdidi",
    club: "Zugdidi Academy",
    height: "183 cm",
    weight: "74 kg",
    foot: "Right",
    verified: true,
    verifiedBy: "GFF Youth Registry & Combine Log",
    rating: 87,
    sprint30m: "3.98 s",
    passAccuracy: "81%",
    topSpeed: "33.4 km/h",
    fullMatches: 8,
    goalsAssists: "14G / 5A",
    stats: { PAC: 91, SHO: 88, PAS: 81, DRI: 86, DEF: 45, PHY: 83 },
    gradient: "from-emerald-600 via-teal-700 to-slate-900",
    matchTitle: "Zugdidi U17 vs. Batumi Academy (Full 90' Uncut)",
    summary:
      "Clinical central forward with explosive acceleration in behind and verified combine test logs. 14 goals in 18 regional academy fixtures.",
  },
  {
    id: 2,
    name: "Luka Mchedlishvili",
    initials: "LM",
    age: 16,
    ageGroup: "U17",
    isMinor: true,
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
    gradient: "from-blue-600 via-indigo-700 to-slate-900",
    matchTitle: "Torpedo Kutaisi U17 vs. Saburtalo (Full 90' Uncut)",
    summary:
      "Modern overlapping left-back with strong 1v1 recovery pace and high progressive pass completion from deep zones.",
  },
  {
    id: 3,
    name: "Dato Beridze",
    initials: "DB",
    age: 20,
    ageGroup: "U23 / Senior",
    isMinor: false,
    position: "Midfielder",
    region: "Tbilisi",
    city: "Tbilisi",
    club: "Saburtalo II",
    height: "178 cm",
    weight: "71 kg",
    foot: "Both",
    verified: true,
    verifiedBy: "Federation Liga 2/3 & GPS Telemetry",
    rating: 86,
    sprint30m: "4.11 s",
    passAccuracy: "91%",
    topSpeed: "32.1 km/h",
    fullMatches: 11,
    goalsAssists: "6G / 11A",
    stats: { PAC: 83, SHO: 79, PAS: 91, DRI: 86, DEF: 79, PHY: 84 },
    gradient: "from-indigo-600 via-blue-800 to-slate-900",
    matchTitle: "Liga 2 Central Fixture (Full 90' Uncut)",
    summary:
      "Press-resistant central midfielder dictating tempo with 91% pass accuracy and verified 11.8 km average match distance.",
  },
  {
    id: 4,
    name: "Saba Tkeshelashvili",
    initials: "ST",
    age: 18,
    ageGroup: "U19",
    isMinor: false,
    position: "Goalkeeper",
    region: "Imereti",
    city: "Zestaponi",
    club: "Imereti Regional XI",
    height: "191 cm",
    weight: "83 kg",
    foot: "Right",
    verified: true,
    verifiedBy: "Regional Federation & Combine Reflex Log",
    rating: 83,
    sprint30m: "4.35 s",
    passAccuracy: "84%",
    topSpeed: "29.5 km/h",
    fullMatches: 7,
    goalsAssists: "6 Clean Sheets",
    stats: { PAC: 74, SHO: 78, PAS: 84, DRI: 75, DEF: 85, PHY: 86 },
    gradient: "from-cyan-600 via-blue-800 to-slate-900",
    matchTitle: "Western Georgia U19 Showcase (Full 90' Uncut)",
    summary:
      "Commanding 191 cm goalkeeper comfortable building from the back under high press, backed by official reflex & reach test footage.",
  },
  {
    id: 5,
    name: "Tornike Gelashvili",
    initials: "TG",
    age: 22,
    ageGroup: "U23 / Senior",
    isMinor: false,
    position: "Left Back",
    region: "Tbilisi",
    city: "Tbilisi",
    club: "Independent / Regional",
    height: "181 cm",
    weight: "73 kg",
    foot: "Left",
    verified: false,
    verifiedBy: "Pending Federation / Coach Verification",
    rating: 78,
    sprint30m: "4.19 s",
    passAccuracy: "80%",
    topSpeed: "31.6 km/h",
    fullMatches: 2,
    goalsAssists: "2G / 4A",
    stats: { PAC: 84, SHO: 68, PAS: 80, DRI: 77, DEF: 76, PHY: 78 },
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    matchTitle: "Regional Cup Match (Full 90' Upload)",
    summary:
      "Self-uploaded senior prospect awaiting coach verification sign-off. Full uncut match recording available for remote review.",
  },
];

const CLUB_VIEWS_LOG = [
  { club: "Wisła Kraków", country: "Poland · I Liga", time: "2h ago", action: "Watched Full 90' Match" },
  { club: "FC Baník Ostrava", country: "Czechia · First League", time: "Yesterday", action: "Added to U17 Shortlist" },
  { club: "Dinamo Zagreb Academy", country: "Croatia · HNL Youth", time: "3d ago", action: "Checked 30m Sprint Log" },
];

const QUICK_REPLIES = [
  "Invite to 5-day trial",
  "Request latest GPS log",
  "Confirm passport & availability",
];

const SWIPE_THRESHOLD = 85;

/* ------------------------------------------------------------------ */
/* REFINED BRAND LOGO (Split Blue/Emerald S + Italic Scouter.)        */
/* ------------------------------------------------------------------ */
function AppLogo() {
  const uid = useId().replace(/:/g, "");
  const topGradId = `app-top-${uid}`;
  const botGradId = `app-bot-${uid}`;

  return (
    <div className="flex items-center space-x-2.5 select-none">
      <svg
        width="34"
        height="30"
        viewBox="0 0 110 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id={topGradId} x1="14" y1="46" x2="96" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id={botGradId} x1="12" y1="86" x2="96" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <path
          d="M44 10H98L83 25H47C43.5 25 40.5 26.8 38.8 29.8L30 45H12L25.5 21.5C29.3 14.8 36.3 10 44 10Z"
          fill={`url(#${topGradId})`}
        />
        <path
          d="M52 38H84L96 51L66 86H12L27 71H59C62.5 71 65.5 69.2 67.2 66.2L74 54H43L52 38Z"
          fill={`url(#${botGradId})`}
        />
      </svg>

      <div>
        <span className="text-lg font-black italic tracking-tight text-white leading-none block">
          Scouter
          <span className="inline-block w-1.5 h-1.5 bg-emerald-500 ml-0.5 align-baseline" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mt-0.5">
          Talent Intelligence
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN MOBILE-FIRST APPLICATION                                      */
/* ------------------------------------------------------------------ */
export default function App() {
  const [activeTab, setActiveTab] = useState("discover"); // 'discover' | 'shortlist' | 'inbox' | 'studio'

  // Discover / Swipe Deck States
  const [posFilter, setPosFilter] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [shortlistIds, setShortlistIds] = useState([1]);
  const [dossierAthlete, setDossierAthlete] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [toast, setToast] = useState(null);

  // Touch / Mouse Drag Swipe States
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exitDir, setExitDir] = useState(null);
  const startX = useRef(0);
  const moved = useRef(false);
  const timerRef = useRef(null);

  // Inbox / Chat States
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatDraft, setChatDraft] = useState("");
  const [conversations, setConversations] = useState({
    1: {
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "scout",
          time: "14:12",
          text: "Hello Coach Shengelia & Giorgi's guardian — we reviewed the Zugdidi U17 full 90' match tape.",
        },
        {
          id: 2,
          sender: "guardian",
          time: "14:18",
          text: "Thank you! Giorgi's official 30m sprint (3.98s) and combine logs are verified on his profile.",
        },
      ],
    },
  });

  // Athlete Card Studio States
  const [playerName, setPlayerName] = useState("Nika Maisuradze");
  const [age, setAge] = useState("16");
  const [city, setCity] = useState("Zugdidi");
  const [position, setPosition] = useState("ST");
  const [cardTier, setCardTier] = useState("pro");
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

  // Sync Browser Favicon with Split Blue/Emerald 'S' Brand Mark
  useEffect(() => {
    const svgFavicon = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 96">
        <rect width="110" height="96" rx="22" fill="#060B19"/>
        <defs>
          <linearGradient id="t" x1="14" y1="46" x2="96" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#2563EB"/>
            <stop offset="100%" stop-color="#06B6D4"/>
          </linearGradient>
          <linearGradient id="b" x1="12" y1="86" x2="96" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#10B981"/>
            <stop offset="100%" stop-color="#34D399"/>
          </linearGradient>
        </defs>
        <path d="M44 12H96L82 26H47C43.5 26 40.5 27.8 38.8 30.8L30 45H14L26.5 23C30.2 16.5 36.8 12 44 12Z" fill="url(#t)"/>
        <path d="M52 38H83L94 50L65 84H14L28 70H58C61.5 70 64.5 68.2 66.2 65.2L73 53H44L52 38Z" fill="url(#b)"/>
      </svg>
    `);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = `data:image/svg+xml,${svgFavicon}`;
    document.title = "Scouter. App — Scout Terminal & Card Studio";

    return () => clearTimeout(timerRef.current);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2300);
  };

  const filteredDeck = useMemo(() => {
    return ATHLETES_DB.filter((a) => {
      if (posFilter !== "All" && a.position !== posFilter) return false;
      if (verifiedOnly && !a.verified) return false;
      return true;
    });
  }, [posFilter, verifiedOnly]);

  const activeAthlete = filteredDeck[deckIndex] || null;
  const nextAthlete = filteredDeck[deckIndex + 1] || null;
  const isFinished = filteredDeck.length > 0 && deckIndex >= filteredDeck.length;

  const shortlistedAthletes = useMemo(
    () => ATHLETES_DB.filter((a) => shortlistIds.includes(a.id)),
    [shortlistIds]
  );

  const unreadCount = useMemo(
    () => Object.values(conversations).reduce((sum, c) => sum + (c.unread || 0), 0),
    [conversations]
  );

  const overallRating = useMemo(() => {
    const vals = Object.values(attrs);
    return Math.round(vals.reduce((sum, v) => sum + Number(v), 0) / vals.length);
  }, [attrs]);

  const studioInitials = useMemo(() => {
    const parts = playerName.trim().split(" ");
    if (!parts[0]) return "SC";
    return parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("");
  }, [playerName]);

  const commitSwipe = (direction) => {
    if (exitDir || !activeAthlete) return;
    setExitDir(direction);

    if (direction === "right") {
      setShortlistIds((prev) => (prev.includes(activeAthlete.id) ? prev : [...prev, activeAthlete.id]));
      showToast(`✓ ${activeAthlete.name.split(" ")[0]} saved to Shortlist`);
    }

    timerRef.current = setTimeout(() => {
      setHistory((prev) => [...prev, { index: deckIndex, action: direction, id: activeAthlete.id }]);
      setDeckIndex((prev) => prev + 1);
      setExitDir(null);
      setDragX(0);
    }, 240);
  };

  const handleRewind = () => {
    if (history.length === 0 || exitDir) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setDeckIndex(last.index);
    setDragX(0);
  };

  const onPointerDown = (e) => {
    if (exitDir) return;
    startX.current = e.clientX;
    moved.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDragX(dx);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX > SWIPE_THRESHOLD) commitSwipe("right");
    else if (dragX < -SWIPE_THRESHOLD) commitSwipe("left");
    else {
      setDragX(0);
      if (!moved.current && activeAthlete) {
        setVideoPlaying(false);
        setDossierAthlete(activeAthlete);
      }
    }
  };

  const startTrialChat = (athlete) => {
    setDossierAthlete(null);
    if (!shortlistIds.includes(athlete.id)) {
      setShortlistIds((prev) => [...prev, athlete.id]);
    }
    setConversations((prev) => ({
      ...prev,
      [athlete.id]: prev[athlete.id]
        ? { ...prev[athlete.id], unread: 0 }
        : {
            unread: 0,
            messages: [
              {
                id: Date.now(),
                sender: "scout",
                time: "Just now",
                text: `Trial Inquiry: We would like to invite ${athlete.name} (${athlete.club}) for an upcoming club evaluation.`,
              },
            ],
          },
    }));
    setActiveChatId(athlete.id);
    setActiveTab("inbox");
  };

  const sendChatMessage = (textToSend) => {
    const clean = textToSend.trim();
    if (!clean || !activeChatId) return;
    setConversations((prev) => ({
      ...prev,
      [activeChatId]: {
        unread: 0,
        messages: [
          ...(prev[activeChatId]?.messages || []),
          { id: Date.now(), sender: "scout", time: "Just now", text: clean },
        ],
      },
    }));
    setChatDraft("");
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    sendChatMessage(chatDraft);
  };

  const likeOpacity = Math.min(Math.max(dragX / SWIPE_THRESHOLD, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-200 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* ============================================================== */}
      {/* NATIVE-STYLE TOP APP BAR                                       */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo />

          <div className="flex items-center space-x-2">
            {/* Quick Role Pill Switcher */}
            <button
              onClick={() => setActiveTab(activeTab === "studio" ? "discover" : "studio")}
              className={`px-3 py-1.5 rounded-full text-[11px] font-black border transition-all active:scale-95 ${
                activeTab === "studio"
                  ? "bg-amber-400/15 text-amber-300 border-amber-400/30"
                  : "bg-blue-500/15 text-blue-300 border-blue-500/30"
              }`}
            >
              {activeTab === "studio" ? "Athlete Mode" : "Scout Mode"}
            </button>

            <a
              href={SITE_URL}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-[11px] font-bold text-slate-300 hover:text-white active:scale-95 transition-all"
            >
              <ArrowLeft size={12} className="mr-1" /> Info
            </a>
          </div>
        </div>
      </header>

      {/* Native Floating Toast Banner */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-2xl shadow-emerald-500/30 whitespace-nowrap animate-bounce">
          {toast}
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN APP VIEWPORT (Centered Mobile Frame on Desktop)           */}
      {/* ============================================================== */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-3.5 pb-28">
        {/* -------------------- TAB 1: DISCOVER (SWIPE STACK) -------------------- */}
        {activeTab === "discover" && (
          <div className="space-y-3.5">
            {/* Horizontal Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => {
                  setVerifiedOnly(!verifiedOnly);
                  setDeckIndex(0);
                  setHistory([]);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black border whitespace-nowrap flex items-center transition-all active:scale-95 ${
                  verifiedOnly
                    ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm shadow-emerald-500/30"
                    : "bg-slate-900 text-slate-300 border-white/10"
                }`}
              >
                <BadgeCheck size={13} className="mr-1" /> Verified
              </button>

              {["All", "Striker", "Left Back", "Midfielder", "Goalkeeper"].map((pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    setPosFilter(pos);
                    setDeckIndex(0);
                    setHistory([]);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-all active:scale-95 ${
                    posFilter === pos
                      ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                      : "bg-slate-900 text-slate-400 border-white/10"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Deck State: Empty / Finished / 2-Layer Card Stack */}
            {filteredDeck.length === 0 ? (
              <div className="bg-slate-900 border border-white/10 rounded-[28px] p-10 text-center space-y-3 mt-6">
                <p className="text-base font-bold text-white">No prospects match this filter</p>
                <button
                  onClick={() => {
                    setPosFilter("All");
                    setVerifiedOnly(false);
                    setDeckIndex(0);
                  }}
                  className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs active:scale-95"
                >
                  Reset Filters
                </button>
              </div>
            ) : isFinished ? (
              <div className="bg-slate-900 border border-white/10 rounded-[28px] p-8 text-center space-y-4 mt-4 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black text-white">All Prospects Reviewed</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  You triaged all {filteredDeck.length} verified profiles ({shortlistIds.length} saved to your club shortlist).
                </p>
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => setActiveTab("shortlist")}
                    className="w-full py-3.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs active:scale-95"
                  >
                    Open Club Shortlist ({shortlistIds.length})
                  </button>
                  <button
                    onClick={() => {
                      setDeckIndex(0);
                      setHistory([]);
                    }}
                    className="w-full py-3 rounded-full bg-slate-800 text-white font-bold text-xs active:scale-95"
                  >
                    Reset Queue
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* 2-Layer Card Stack Container */}
                <div className="relative pt-1">
                  {/* Background Next-Card Peek for Native Depth */}
                  {nextAthlete && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-3 top-3 bottom-0 rounded-[28px] bg-slate-900/70 border border-white/10 scale-[0.96] translate-y-2 opacity-65"
                    />
                  )}

                  {/* Top Active Swipeable Card */}
                  <div
                    key={activeAthlete.id}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    style={{
                      transform: exitDir
                        ? `translateX(${exitDir === "right" ? 130 : -130}%) rotate(${exitDir === "right" ? 14 : -14}deg)`
                        : `translateX(${dragX}px) rotate(${dragX / 22}deg)`,
                      opacity: exitDir ? 0 : 1,
                      transition: dragging ? "none" : "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease",
                      touchAction: "pan-y",
                    }}
                    className="select-none cursor-grab active:cursor-grabbing bg-slate-900 border border-white/15 rounded-[28px] overflow-hidden shadow-2xl relative"
                  >
                    {/* Swipe Stamps */}
                    <div
                      style={{ opacity: likeOpacity }}
                      className="pointer-events-none absolute top-14 left-5 z-20 px-3.5 py-1 border-4 border-emerald-400 text-emerald-400 font-black text-xl rounded-xl -rotate-12 tracking-widest bg-slate-950/75"
                    >
                      SHORTLIST
                    </div>
                    <div
                      style={{ opacity: passOpacity }}
                      className="pointer-events-none absolute top-14 right-5 z-20 px-3.5 py-1 border-4 border-rose-400 text-rose-400 font-black text-xl rounded-xl rotate-12 tracking-widest bg-slate-950/75"
                    >
                      PASS
                    </div>

                    {/* Card Visual Header */}
                    <div className={`bg-gradient-to-br ${activeAthlete.gradient} p-5 relative`}>
                      <div className="flex justify-between items-start gap-2">
                        <div className="bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15">
                          <span className="text-2xl font-black text-white leading-none">{activeAthlete.rating}</span>
                          <span className="block text-[10px] font-black text-emerald-400 uppercase mt-0.5">
                            {activeAthlete.position}
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center space-x-1.5">
                            {activeAthlete.verified ? (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30">
                                <BadgeCheck size={13} className="mr-1" /> Verified
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/60 text-slate-300">
                                Pending
                              </span>
                            )}
                            <button
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={() => {
                                setVideoPlaying(false);
                                setDossierAthlete(activeAthlete);
                              }}
                              className="w-8 h-8 rounded-full bg-slate-950/70 text-white flex items-center justify-center border border-white/15 active:scale-90"
                              aria-label="Open Dossier"
                            >
                              <Info size={16} />
                            </button>
                          </div>

                          {activeAthlete.isMinor && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/70 text-amber-300 border border-amber-400/30">
                              <Lock size={10} className="mr-1" /> U18 Guardian Protected
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="flex items-end justify-between">
                          <div>
                            <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                              {activeAthlete.name}, {activeAthlete.age}
                            </h2>
                            <p className="text-xs text-white/90 font-medium flex items-center mt-1">
                              <MapPin size={12} className="mr-1" /> {activeAthlete.club} · {activeAthlete.city}
                            </p>
                          </div>
                          <span className="text-[11px] font-mono font-bold bg-slate-950/60 px-2.5 py-1 rounded-lg text-white">
                            {deckIndex + 1}/{filteredDeck.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Telemetry Body */}
                    <div className="p-4 space-y-3.5">
                      <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 rounded-2xl p-2.5 border border-white/5">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">30m Sprint</p>
                          <p className="text-sm font-black text-white mt-0.5">{activeAthlete.sprint30m}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Pass %</p>
                          <p className="text-sm font-black text-white mt-0.5">{activeAthlete.passAccuracy}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Full Tape</p>
                          <p className="text-sm font-black text-emerald-400 mt-0.5">{activeAthlete.fullMatches} x 90'</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {Object.entries(activeAthlete.stats)
                          .slice(0, 3)
                          .map(([k, v]) => (
                            <div key={k}>
                              <div className="flex justify-between text-[11px] font-bold mb-1">
                                <span className="text-slate-400">{k}</span>
                                <span className="text-white">{v} / 99</span>
                              </div>
                              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                                  style={{ width: `${v}%` }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{activeAthlete.summary}</p>

                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          setVideoPlaying(false);
                          setDossierAthlete(activeAthlete);
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-white/10 text-xs font-bold text-blue-300 flex items-center justify-center active:scale-98"
                      >
                        <Film size={14} className="mr-1.5" /> Open Full 90' Match & Dossier{" "}
                        <ChevronUp size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tactile Bottom Action Dock (Rewind + Pass + Shortlist) */}
                <div className="flex items-center justify-center gap-5 pt-2">
                  <button
                    onClick={handleRewind}
                    disabled={history.length === 0}
                    aria-label="Rewind"
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                      history.length === 0
                        ? "bg-slate-900/50 border-white/5 text-slate-600 cursor-not-allowed"
                        : "bg-slate-900 border-amber-500/40 text-amber-400 active:scale-90 shadow-md"
                    }`}
                  >
                    <RotateCcw size={18} />
                  </button>

                  <button
                    onClick={() => commitSwipe("left")}
                    aria-label="Pass"
                    className="w-16 h-16 rounded-full bg-slate-900 border-2 border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center shadow-lg active:scale-90 transition-all"
                  >
                    <X size={28} strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => commitSwipe("right")}
                    aria-label="Shortlist"
                    className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 active:scale-90 transition-all"
                  >
                    <Heart size={28} strokeWidth={2.5} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* -------------------- TAB 2: CLUB SHORTLIST -------------------- */}
        {activeTab === "shortlist" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Club Shortlist ({shortlistedAthletes.length})</h2>
                <p className="text-[11px] text-slate-400">Wisła Kraków · Scouting Workspace</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-500/15 text-blue-300 border border-blue-500/30">
                CLUB STARTER
              </span>
            </div>

            {shortlistedAthletes.length === 0 ? (
              <div className="bg-slate-900 border border-white/10 rounded-[28px] p-8 text-center space-y-3">
                <p className="text-sm text-slate-400">Swipe right on prospects in Discover to save them here.</p>
                <button
                  onClick={() => setActiveTab("discover")}
                  className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs active:scale-95"
                >
                  Back to Discover
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {shortlistedAthletes.map((a) => (
                  <div
                    key={a.id}
                    className="bg-slate-900 border border-white/10 rounded-3xl p-4 space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center font-black text-white text-sm`}
                        >
                          {a.rating}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm flex items-center">
                            {a.name}
                            {a.verified && <BadgeCheck size={14} className="ml-1.5 text-emerald-400" />}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {a.position} · {a.ageGroup} · {a.club}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShortlistIds((prev) => prev.filter((id) => id !== a.id))}
                        className="text-xs text-slate-500 hover:text-rose-400 p-1.5"
                        aria-label="Remove"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 rounded-2xl p-2.5 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">30m Sprint</span>
                        <strong className="text-white">{a.sprint30m}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Pass %</span>
                        <strong className="text-white">{a.passAccuracy}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Matches</span>
                        <strong className="text-emerald-400">{a.fullMatches} Full</strong>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setVideoPlaying(false);
                          setDossierAthlete(a);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs active:scale-95"
                      >
                        Dossier & Tape
                      </button>
                      <button
                        onClick={() => startTrialChat(a)}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs active:scale-95"
                      >
                        Invite to Trial
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------- TAB 3: TRIAL INBOX -------------------- */}
        {activeTab === "inbox" && (
          <div className="space-y-4">
            {activeChatId ? (
              (() => {
                const chatPlayer = ATHLETES_DB.find((a) => a.id === activeChatId);
                return (
                  <div className="bg-slate-900 border border-white/10 rounded-[28px] overflow-hidden flex flex-col shadow-xl">
                    {/* Native Chat Top Bar */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/70">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setActiveChatId(null)}
                          className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white active:scale-90"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center">
                            {chatPlayer?.name}
                            {chatPlayer?.verified && <BadgeCheck size={14} className="ml-1 text-emerald-400" />}
                          </h3>
                          <p className="text-[11px] text-emerald-400 flex items-center">
                            <ShieldCheck size={12} className="mr-1" />
                            {chatPlayer?.isMinor ? "Guardian & Academy Copied (U18)" : `${chatPlayer?.club} Verified`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages Feed */}
                    <div className="p-4 space-y-3 min-h-[280px] max-h-[50vh] overflow-y-auto">
                      {(conversations[activeChatId]?.messages || []).map((m) => (
                        <div key={m.id} className={`flex flex-col ${m.sender === "scout" ? "items-end" : "items-start"}`}>
                          <div
                            className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                              m.sender === "scout"
                                ? "bg-blue-600 text-white rounded-br-sm"
                                : "bg-slate-800 text-slate-200 rounded-bl-sm"
                            }`}
                          >
                            {m.text}
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* One-Tap Quick Reply Chips */}
                    <div className="px-3 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar bg-slate-950/40">
                      {QUICK_REPLIES.map((qr) => (
                        <button
                          key={qr}
                          type="button"
                          onClick={() => sendChatMessage(qr)}
                          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 whitespace-nowrap border border-white/5 active:scale-95"
                        >
                          + {qr}
                        </button>
                      ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 flex gap-2 bg-slate-950">
                      <input
                        type="text"
                        value={chatDraft}
                        onChange={(e) => setChatDraft(e.target.value)}
                        placeholder="Send compliant trial message..."
                        className="flex-1 bg-slate-900 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0 active:scale-90"
                      >
                        <Send size={15} />
                      </button>
                    </form>
                  </div>
                );
              })()
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-black text-white">Trial Inbox</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Safeguarding-compliant outreach with verified guardians & academies.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {ATHLETES_DB.filter((a) => conversations[a.id] || shortlistIds.includes(a.id)).map((a) => {
                    const convo = conversations[a.id];
                    const lastMsg = convo?.messages[convo.messages.length - 1];
                    return (
                      <button
                        key={a.id}
                        onClick={() => {
                          setConversations((prev) => ({
                            ...prev,
                            [a.id]: prev[a.id] ? { ...prev[a.id], unread: 0 } : { unread: 0, messages: [] },
                          }));
                          setActiveChatId(a.id);
                        }}
                        className="w-full text-left bg-slate-900 border border-white/10 hover:border-blue-500/50 rounded-3xl p-4 flex items-center justify-between transition-all active:scale-98"
                      >
                        <div className="flex items-center space-x-3 min-w-0 pr-3">
                          <div
                            className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center font-black text-xs text-white flex-shrink-0`}
                          >
                            {a.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center space-x-1.5">
                              <h3 className="text-sm font-bold text-white truncate">{a.name}</h3>
                              {a.verified && <BadgeCheck size={13} className="text-emerald-400 flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-slate-400 truncate mt-0.5">
                              {lastMsg ? lastMsg.text : `Tap to initiate trial invite with ${a.club}`}
                            </p>
                          </div>
                        </div>
                        {convo?.unread > 0 && (
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black flex items-center justify-center flex-shrink-0">
                            {convo.unread}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* -------------------- TAB 4: ATHLETE CARD STUDIO -------------------- */}
        {activeTab === "studio" && (
          <div className="space-y-5">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
                <Sparkles size={13} className="mr-1.5" /> Athlete Portal (Ages 14–25)
              </span>
              <h2 className="text-2xl font-black text-white mt-2">Verified Player Card</h2>
              <p className="text-xs text-slate-400 mt-1">
                Customize your combine metrics and share your EA FC-style scouting card.
              </p>
            </div>

            {/* Live EA FC Card Preview */}
            <div className="flex justify-center py-1">
              <div className="relative w-72">
                <div
                  className={`absolute -inset-3 rounded-3xl blur-2xl ${
                    cardTier === "pro"
                      ? "bg-gradient-to-tr from-amber-400/30 via-emerald-500/25 to-blue-500/20"
                      : "bg-slate-600/20"
                  }`}
                />
                <div
                  className={`relative rounded-[28px] p-6 border-2 shadow-2xl ${
                    cardTier === "pro"
                      ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 border-amber-400/80 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className={`text-5xl font-black leading-none ${
                          cardTier === "pro" ? "text-amber-400" : "text-white"
                        }`}
                      >
                        {overallRating}
                      </span>
                      <span className="block text-xs font-black tracking-widest mt-1 text-emerald-400">
                        {position} · {Number(age) <= 15 ? "U15" : Number(age) <= 17 ? "U17" : Number(age) <= 19 ? "U19" : "U23"}
                      </span>
                      <span className="inline-block mt-2 text-[10px] font-black px-2 py-0.5 rounded bg-red-600 text-white">
                        GEO · {city.toUpperCase()}
                      </span>
                    </div>

                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl ${
                        cardTier === "pro"
                          ? "bg-gradient-to-br from-amber-400 via-emerald-500 to-blue-600 text-slate-950"
                          : "bg-slate-700 text-white"
                      }`}
                    >
                      {studioInitials}
                    </div>
                  </div>

                  <div className="mt-5 text-center border-b border-white/15 pb-3">
                    <div className="flex items-center justify-center space-x-1.5">
                      <h3 className="text-lg font-black uppercase truncate">{playerName || "Athlete"}</h3>
                      {verified && <BadgeCheck size={16} className="text-emerald-400 flex-shrink-0" />}
                    </div>
                    <p className="text-[10px] opacity-75 font-bold mt-0.5">
                      {verified ? "COMBINE VERIFIED · SCOUTER.GE" : "FREE BASIC · SCOUTER.GE"}
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
            </div>

            <button
              onClick={() => {
                setCopied(true);
                showToast("✓ Shareable Card Link Copied!");
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all"
            >
              {copied ? (
                <>
                  <Check size={16} className="mr-1.5" strokeWidth={3} /> Link Copied!
                </>
              ) : (
                <>
                  <Share2 size={15} className="mr-1.5" /> Share Verified Card Link
                </>
              )}
            </button>

            {/* Controls */}
            <div className="bg-slate-900 border border-white/10 rounded-[28px] p-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCardTier("basic")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    cardTier === "basic"
                      ? "bg-slate-700 text-white border-slate-500"
                      : "bg-slate-950 text-slate-400 border-white/10"
                  }`}
                >
                  Free Basic
                </button>
                <button
                  onClick={() => setCardTier("pro")}
                  className={`flex-1 py-2 rounded-xl text-xs font-black ${
                    cardTier === "pro"
                      ? "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950"
                      : "bg-slate-950 text-slate-400 border border-white/10"
                  }`}
                >
                  ★ Verified Pro
                </button>
                <button
                  onClick={() => setVerified(!verified)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center ${
                    verified
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-950 text-slate-400 border-white/10"
                  }`}
                >
                  <BadgeCheck size={14} className="mr-1" /> {verified ? "Verified" : "Pending"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Player Name</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Pos</label>
                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-xs font-bold text-white"
                    >
                      {["ST", "LW", "CAM", "CM", "LB", "CB", "GK"].map((p) => (
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
                      min="14"
                      max="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-xs font-bold text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-3 pt-2">
                {Object.entries(attrs).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-xs font-black mb-1">
                      <span className="text-slate-400">{k}</span>
                      <span className="text-white">{v}</span>
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

            {/* Scout Views Analytics */}
            <div className="bg-slate-900 border border-white/10 rounded-[28px] p-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center">
                <Eye size={14} className="mr-1.5 text-blue-400" /> European Club Scout Views
              </h3>
              {CLUB_VIEWS_LOG.map((log) => (
                <div
                  key={log.club}
                  className="bg-slate-950 border border-white/5 rounded-2xl p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{log.club}</p>
                    <p className="text-[11px] text-slate-500">{log.country}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-400 block">{log.action}</span>
                    <span className="text-[10px] text-slate-500">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* FULL DOSSIER BOTTOM SHEET (Native Slide-Up Sheet)              */}
      {/* ============================================================== */}
      {dossierAthlete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="bg-slate-900 border-t sm:border border-white/15 rounded-t-[32px] sm:rounded-[32px] w-full max-w-md max-h-[90dvh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            {/* Native Sheet Drag Handle */}
            <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto sm:hidden" />

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                    {dossierAthlete.position} · {dossierAthlete.ageGroup}
                  </span>
                  {dossierAthlete.verified && (
                    <span className="inline-flex items-center text-xs font-bold text-emerald-400">
                      <BadgeCheck size={14} className="mr-1" /> Verified
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-white mt-1.5">{dossierAthlete.name}</h3>
                <p className="text-xs text-slate-400">
                  {dossierAthlete.club} · {dossierAthlete.city}, {dossierAthlete.region} · {dossierAthlete.height} ({dossierAthlete.foot})
                </p>
              </div>
              <button
                onClick={() => setDossierAthlete(null)}
                className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            {dossierAthlete.isMinor && (
              <div className="rounded-2xl p-3 bg-amber-500/10 border border-amber-500/25 text-amber-200 text-[11px] flex items-start gap-2">
                <Lock size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>U18 Safeguarding Active: Messages route strictly through verified parents/guardians & academy staff.</span>
              </div>
            )}

            {/* Simulated Uncut 90' Match Player */}
            <div
              onClick={() => setVideoPlaying(!videoPlaying)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                videoPlaying ? "bg-slate-950 border-emerald-500" : "bg-slate-950 border-white/10"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold text-blue-400 flex items-center truncate pr-2">
                  <Film size={14} className="mr-1.5 flex-shrink-0" /> {dossierAthlete.matchTitle}
                </span>
                <span className="text-emerald-400 font-black flex-shrink-0">HD 1080p</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0">
                  {videoPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </div>
                <div className="flex-1">
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-emerald-400 transition-all ${videoPlaying ? "w-2/3" : "w-1/4"}`} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    {videoPlaying ? "Playing uncut wide-angle match footage (21:14 / 90:00)" : "Tap to preview full 90' match"}
                  </p>
                </div>
              </div>
            </div>

            {/* Full 6 Combine Attributes */}
            <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 p-3 rounded-2xl border border-white/5">
              {Object.entries(dossierAthlete.stats).map(([k, v]) => (
                <div key={k} className="p-1.5">
                  <span className="text-[10px] font-bold text-slate-500 block">{k}</span>
                  <span className="text-base font-black text-white">{v}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-400 flex items-center">
              <ShieldCheck size={15} className="mr-1.5 text-emerald-400 flex-shrink-0" />
              {dossierAthlete.verifiedBy}
            </div>

            <button
              onClick={() => startTrialChat(dossierAthlete)}
              className="w-full py-3.5 rounded-full bg-emerald-500 text-slate-950 font-black text-sm active:scale-95 transition-all"
            >
              Invite to Trial / Message Academy
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING NATIVE BOTTOM DOCK (4 Mobile App Tabs)                */}
      {/* ============================================================== */}
      <nav className="fixed bottom-3 left-3 right-3 z-40">
        <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-[26px] px-2 py-2 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center py-1.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "discover"
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Search size={19} />
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Discover</span>
          </button>

          <button
            onClick={() => setActiveTab("shortlist")}
            className={`flex flex-col items-center py-1.5 px-3.5 rounded-2xl relative transition-all ${
              activeTab === "shortlist"
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Heart size={19} />
            {shortlistIds.length > 0 && (
              <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {shortlistIds.length}
              </span>
            )}
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Shortlist</span>
          </button>

          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex flex-col items-center py-1.5 px-3.5 rounded-2xl relative transition-all ${
              activeTab === "inbox"
                ? "bg-blue-500/15 text-blue-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <MessageCircle size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Inbox</span>
          </button>

          <button
            onClick={() => setActiveTab("studio")}
            className={`flex flex-col items-center py-1.5 px-3.5 rounded-2xl transition-all ${
              activeTab === "studio"
                ? "bg-amber-400/15 text-amber-300"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Trophy size={19} />
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Card Studio</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
