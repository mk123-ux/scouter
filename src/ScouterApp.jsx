import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronUp,
  Eye,
  Film,
  Heart,
  Info,
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
    gradient: "from-emerald-600 via-teal-700 to-slate-900",
    matchTitle: "Zugdidi U17 vs. Batumi Academy (Full 90' Uncut)",
    summary:
      "Clinical central forward with explosive acceleration in behind and verified physical test logs. 14 goals in 18 regional academy fixtures.",
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
    gradient: "from-blue-600 via-indigo-700 to-slate-900",
    matchTitle: "Torpedo Kutaisi U17 vs. Saburtalo (Full 90' Uncut)",
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
    gradient: "from-indigo-600 via-blue-800 to-slate-900",
    matchTitle: "Tbilisi U17 Cup Semi-Final (Full 90' Uncut)",
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
    gradient: "from-cyan-600 via-blue-800 to-slate-900",
    matchTitle: "Western Georgia U19 Showcase (Full 90' Uncut)",
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
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    matchTitle: "Regional Friendly Match (Full 90' Upload)",
    summary:
      "Self-uploaded prospect awaiting coach verification sign-off. Full uncut match recording available for remote review.",
  },
];

const CLUB_VIEWS_LOG = [
  { club: "Wisła Kraków", country: "Poland · I Liga", time: "2h ago", action: "Watched Full 90' Match" },
  { club: "FC Baník Ostrava", country: "Czechia · First League", time: "Yesterday", action: "Added to U17 Shortlist" },
  { club: "Dinamo Zagreb Academy", country: "Croatia · HNL Youth", time: "3d ago", action: "Checked 30m Sprint Log" },
];

const SWIPE_THRESHOLD = 85;

/* ------------------------------------------------------------------ */
/* MAIN MOBILE-FIRST APPLICATION                                      */
/* ------------------------------------------------------------------ */
export default function App() {
  const [activeTab, setActiveTab] = useState("discover"); // 'discover' | 'shortlist' | 'inbox' | 'studio'

  // Discover / Swipe Deck States
  const [posFilter, setPosFilter] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [history, setHistory] = useState([]); // [{ index, action }] for Rewind
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
          text: "Hello Coach Shengelia & Giorgi's guardian — we reviewed the Zugdidi U17 full 90' match tape.",
        },
        {
          id: 2,
          sender: "guardian",
          text: "Thank you! Giorgi's official 30m sprint (3.98s) and medical logs are updated on his profile.",
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

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const filteredDeck = useMemo(() => {
    return ATHLETES_DB.filter((a) => {
      if (posFilter !== "All" && a.position !== posFilter) return false;
      if (verifiedOnly && !a.verified) return false;
      return true;
    });
  }, [posFilter, verifiedOnly]);

  const activeAthlete = filteredDeck[deckIndex] || null;
  const isFinished = filteredDeck.length > 0 && deckIndex >= filteredDeck.length;

  const shortlistedAthletes = useMemo(
    () => ATHLETES_DB.filter((a) => shortlistIds.includes(a.id)),
    [shortlistIds]
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
      showToast(`✓ ${activeAthlete.name.split(" ")[0]} added to Club Shortlist`);
    }

    timerRef.current = setTimeout(() => {
      setHistory((prev) => [...prev, { index: deckIndex, action: direction, id: activeAthlete.id }]);
      setDeckIndex((prev) => prev + 1);
      setExitDir(null);
      setDragX(0);
    }, 260);
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
                text: `Trial Inquiry: We would like to invite ${athlete.name} (${athlete.club}) for an upcoming assessment.`,
              },
            ],
          },
    }));
    setActiveChatId(athlete.id);
    setActiveTab("inbox");
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatDraft.trim() || !activeChatId) return;
    setConversations((prev) => ({
      ...prev,
      [activeChatId]: {
        unread: 0,
        messages: [
          ...(prev[activeChatId]?.messages || []),
          { id: Date.now(), sender: "scout", text: chatDraft.trim() },
        ],
      },
    }));
    setChatDraft("");
  };

  const likeOpacity = Math.min(Math.max(dragX / SWIPE_THRESHOLD, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* ============================================================== */}
      {/* TOP APP BAR (Sticky, Clean, Full-Bleed Mobile-First)           */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center rotate-12 shadow-md shadow-emerald-500/20">
              <Activity size={18} className="text-slate-950 -rotate-12" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white leading-none block">
                Scouter<span className="text-emerald-500">.</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {activeTab === "studio" ? "Athlete Card Studio" : "Scout Terminal"}
              </span>
            </div>
          </div>

          <a
            href={SITE_URL}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} className="mr-1" /> Site
          </a>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-xl whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN SCROLLABLE CONTENT (pb-24 so Bottom Bar never overlaps)   */}
      {/* ============================================================== */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-28">
        {/* -------------------- TAB 1: DISCOVER (SWIPE) -------------------- */}
        {activeTab === "discover" && (
          <div className="space-y-4">
            {/* Horizontal Scrollable Position & Verification Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => {
                  setVerifiedOnly(!verifiedOnly);
                  setDeckIndex(0);
                  setHistory([]);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black border whitespace-nowrap flex items-center transition-all ${
                  verifiedOnly
                    ? "bg-emerald-500 text-slate-950 border-emerald-500"
                    : "bg-slate-900 text-slate-300 border-white/10"
                }`}
              >
                <BadgeCheck size={13} className="mr-1" /> Verified Only
              </button>

              {["All", "Striker", "Left Back", "Midfielder", "Goalkeeper"].map((pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    setPosFilter(pos);
                    setDeckIndex(0);
                    setHistory([]);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-all ${
                    posFilter === pos
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-slate-900 text-slate-400 border-white/10"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Swipe Card or Empty/Finished State */}
            {filteredDeck.length === 0 ? (
              <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 text-center space-y-3 mt-6">
                <p className="text-base font-bold text-white">No prospects match this filter</p>
                <button
                  onClick={() => {
                    setPosFilter("All");
                    setVerifiedOnly(false);
                    setDeckIndex(0);
                  }}
                  className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : isFinished ? (
              <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 text-center space-y-4 mt-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black text-white">Queue Reviewed!</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  You reviewed all {filteredDeck.length} verified prospects in this filter ({shortlistIds.length} in your club shortlist).
                </p>
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => setActiveTab("shortlist")}
                    className="w-full py-3.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs"
                  >
                    Open Shortlist ({shortlistIds.length})
                  </button>
                  <button
                    onClick={() => {
                      setDeckIndex(0);
                      setHistory([]);
                    }}
                    className="w-full py-3 rounded-full bg-slate-800 text-white font-bold text-xs"
                  >
                    Review Prospects Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Swipeable Telemetry Scouting Card */}
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
                    transition: dragging ? "none" : "transform 260ms ease, opacity 260ms ease",
                    touchAction: "pan-y",
                  }}
                  className="select-none cursor-grab active:cursor-grabbing bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl relative"
                >
                  {/* Swipe Feedback Stamps */}
                  <div
                    style={{ opacity: likeOpacity }}
                    className="pointer-events-none absolute top-14 left-5 z-20 px-3.5 py-1 border-4 border-emerald-400 text-emerald-400 font-black text-xl rounded-xl -rotate-12 tracking-widest bg-slate-950/70"
                  >
                    SHORTLIST
                  </div>
                  <div
                    style={{ opacity: passOpacity }}
                    className="pointer-events-none absolute top-14 right-5 z-20 px-3.5 py-1 border-4 border-rose-400 text-rose-400 font-black text-xl rounded-xl rotate-12 tracking-widest bg-slate-950/70"
                  >
                    PASS
                  </div>

                  {/* Card Top Visual Header */}
                  <div className={`bg-gradient-to-br ${activeAthlete.gradient} p-5 relative`}>
                    <div className="flex justify-between items-start">
                      <div className="bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15">
                        <span className="text-2xl font-black text-white leading-none">{activeAthlete.rating}</span>
                        <span className="block text-[10px] font-black text-emerald-400 uppercase mt-0.5">
                          {activeAthlete.position}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
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
                          className="w-8 h-8 rounded-full bg-slate-950/70 text-white flex items-center justify-center border border-white/15"
                          aria-label="Open Dossier"
                        >
                          <Info size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-black text-white tracking-tight">
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

                  {/* Card Telemetry & Match Log Body */}
                  <div className="p-5 space-y-4">
                    {/* 3 Core Hard Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 rounded-2xl p-3 border border-white/5">
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

                    {/* Top 3 Scouting Bars */}
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
                      className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-white/10 text-xs font-bold text-blue-300 flex items-center justify-center"
                    >
                      <Film size={14} className="mr-1.5" /> Open Full 90' Match & Dossier{" "}
                      <ChevronUp size={14} className="ml-1" />
                    </button>
                  </div>
                </div>

                {/* Tactile Swipe Controls (Rewind + Pass + Shortlist) */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={handleRewind}
                    disabled={history.length === 0}
                    aria-label="Rewind"
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                      history.length === 0
                        ? "bg-slate-900/50 border-white/5 text-slate-600 cursor-not-allowed"
                        : "bg-slate-900 border-amber-500/40 text-amber-400 active:scale-90"
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
              <h2 className="text-xl font-black text-white">Club Shortlist ({shortlistedAthletes.length})</h2>
              <span className="text-xs font-bold text-emerald-400">Wisła Kraków Workspace</span>
            </div>

            {shortlistedAthletes.length === 0 ? (
              <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 text-center space-y-3">
                <p className="text-sm text-slate-400">Swipe right on prospects in Discover to save them here.</p>
                <button
                  onClick={() => setActiveTab("discover")}
                  className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs"
                >
                  Back to Discover
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {shortlistedAthletes.map((a) => (
                  <div
                    key={a.id}
                    className="bg-slate-900 border border-white/10 rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center font-black text-white text-sm`}
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
                        className="text-xs text-slate-500 hover:text-rose-400 p-1"
                        aria-label="Remove"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 rounded-xl p-2 text-xs">
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
                        className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                      >
                        Dossier & Tape
                      </button>
                      <button
                        onClick={() => startTrialChat(a)}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs"
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
              <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setActiveChatId(null)}
                      className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {ATHLETES_DB.find((a) => a.id === activeChatId)?.name}
                      </h3>
                      <p className="text-[11px] text-emerald-400 flex items-center">
                        <ShieldCheck size={12} className="mr-1" /> Guardian & Academy Copied
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-3 min-h-[300px] max-h-[55vh] overflow-y-auto">
                  {(conversations[activeChatId]?.messages || []).map((m) => (
                    <div key={m.id} className={`flex ${m.sender === "scout" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          m.sender === "scout"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-slate-800 text-slate-200 rounded-bl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 flex gap-2 bg-slate-950">
                  <input
                    type="text"
                    value={chatDraft}
                    onChange={(e) => setChatDraft(e.target.value)}
                    placeholder="Send official trial details..."
                    className="flex-1 bg-slate-900 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-white">Trial Inbox</h2>
                <p className="text-xs text-slate-400">
                  Direct, U18-compliant messaging with verified academies and legal guardians.
                </p>

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
                            [a.id]: prev[a.id]
                              ? { ...prev[a.id], unread: 0 }
                              : { unread: 0, messages: [] },
                          }));
                          setActiveChatId(a.id);
                        }}
                        className="w-full text-left bg-slate-900 border border-white/10 hover:border-blue-500/50 rounded-2xl p-4 flex items-center justify-between transition-all"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center space-x-1.5">
                            <h3 className="text-sm font-bold text-white truncate">{a.name}</h3>
                            {a.verified && <BadgeCheck size={13} className="text-emerald-400 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-1">
                            {lastMsg ? lastMsg.text : `Tap to initiate trial invite with ${a.club}`}
                          </p>
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
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
                <Sparkles size={13} className="mr-1.5" /> Athlete Portal (B2C)
              </span>
              <h2 className="text-2xl font-black text-white mt-2">Your Verified Player Card</h2>
              <p className="text-xs text-slate-400 mt-1">
                Customize your stats and preview your shareable EA FC-style scouting card.
              </p>
            </div>

            {/* Live EA FC Card Preview (Centered for Mobile) */}
            <div className="flex justify-center py-2">
              <div className="relative w-72">
                <div
                  className={`absolute -inset-3 rounded-3xl blur-2xl ${
                    cardTier === "pro"
                      ? "bg-gradient-to-tr from-amber-400/30 via-emerald-500/25 to-blue-500/20"
                      : "bg-slate-600/20"
                  }`}
                />
                <div
                  className={`relative rounded-3xl p-6 border-2 shadow-2xl ${
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
                        {position} · U{Number(age) <= 15 ? "15" : Number(age) <= 17 ? "17" : "19"}
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
                      {verified ? "FEDERATION VERIFIED · SCOUTER.GE" : "BASIC PROFILE · SCOUTER.GE"}
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
              className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg"
            >
              {copied ? (
                <>
                  <Check size={16} className="mr-1.5" strokeWidth={3} /> Link Copied!
                </>
              ) : (
                <>
                  <Share2 size={15} className="mr-1.5" /> Share Card to Instagram / TikTok
                </>
              )}
            </button>

            {/* Interactive Controls Card */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCardTier("basic")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    cardTier === "basic"
                      ? "bg-slate-700 text-white border-slate-500"
                      : "bg-slate-950 text-slate-400 border-white/10"
                  }`}
                >
                  Basic Free
                </button>
                <button
                  onClick={() => setCardTier("pro")}
                  className={`flex-1 py-2 rounded-xl text-xs font-black ${
                    cardTier === "pro"
                      ? "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950"
                      : "bg-slate-950 text-slate-400 border border-white/10"
                  }`}
                >
                  ★ Pro Card
                </button>
                <button
                  onClick={() => setVerified(!verified)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center ${
                    verified
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-950 text-slate-400 border-white/10"
                  }`}
                >
                  <BadgeCheck size={14} className="mr-1" /> {verified ? "Verified" : "Unverified"}
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
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2 text-xs font-bold text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 6 Attribute Sliders */}
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

            {/* Scout Profile Views Log */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center">
                <Eye size={14} className="mr-1.5 text-blue-400" /> Recent European Club Views
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
      {/* FULL DOSSIER BOTTOM SHEET / MODAL (Tap Card to Expand)         */}
      {/* ============================================================== */}
      {dossierAthlete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="bg-slate-900 border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 space-y-5">
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
                className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simulated Uncut Match Player */}
            <div
              onClick={() => setVideoPlaying(!videoPlaying)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                videoPlaying ? "bg-slate-950 border-emerald-500" : "bg-slate-950 border-white/10"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold text-blue-400 flex items-center">
                  <Film size={14} className="mr-1.5" /> {dossierAthlete.matchTitle}
                </span>
                <span className="text-emerald-400 font-black">HD 1080p</span>
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
                    {videoPlaying ? "Playing uncut wide-angle match footage (21:14 / 90:00)" : "Tap to preview full match"}
                  </p>
                </div>
              </div>
            </div>

            {/* Full 6 Attributes */}
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
              className="w-full py-3.5 rounded-full bg-emerald-500 text-slate-950 font-black text-sm"
            >
              Invite to Trial / Message Academy
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FIXED BOTTOM NAVIGATION BAR (4 Mobile App Tabs)                */}
      {/* ============================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-lg mx-auto px-4 py-2.5 flex items-center justify-around">
          <button
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === "discover" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Search size={20} />
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Discover</span>
          </button>

          <button
            onClick={() => setActiveTab("shortlist")}
            className={`flex flex-col items-center py-1 px-3 rounded-xl relative transition-colors ${
              activeTab === "shortlist" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Heart size={20} />
            {shortlistIds.length > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {shortlistIds.length}
              </span>
            )}
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Shortlist</span>
          </button>

          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === "inbox" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <MessageCircle size={20} />
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Inbox</span>
          </button>

          <button
            onClick={() => setActiveTab("studio")}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === "studio" ? "text-amber-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Trophy size={20} />
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">Card Studio</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
