import React, { useState, useMemo } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ExternalLink,
  Film,
  Heart,
  MapPin,
  Moon,
  Play,
  RotateCcw,
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
  Zap,
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
    matchTitle: "Zugdidi U17 vs. Batumi Academy (Full 90' Uncut)",
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
    gradient: "from-indigo-600 to-blue-500",
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
    gradient: "from-cyan-600 to-blue-600",
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
    gradient: "from-slate-700 to-slate-600",
    matchTitle: "Regional Friendly Match (Full 90' Upload)",
    summary:
      "Self-uploaded prospect awaiting coach verification sign-off. Full uncut match recording available for remote review.",
  },
];

/* ------------------------------------------------------------------ */
/* 1. SCOUT RAPID TRIAGE WORKSPACE (B2B)                              */
/* ------------------------------------------------------------------ */
function ScoutTriageWorkspace({ dark }) {
  const [posFilter, setPosFilter] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlisted, setShortlisted] = useState([]);
  const [passed, setPassed] = useState([]);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [inviteModalAthlete, setInviteModalAthlete] = useState(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [clubName, setClubName] = useState("");
  const [scoutEmail, setScoutEmail] = useState("");
  const [showShortlistDrawer, setShowShortlistDrawer] = useState(false);

  const deck = useMemo(() => {
    return ATHLETES_DB.filter((a) => {
      if (posFilter !== "All" && a.position !== posFilter) return false;
      if (verifiedOnly && !a.verified) return false;
      return true;
    });
  }, [posFilter, verifiedOnly]);

  const activeAthlete = deck[currentIndex] || null;
  const isFinished = deck.length > 0 && currentIndex >= deck.length;

  const handleFilterChange = (newPos, newVerified) => {
    setPosFilter(newPos);
    setVerifiedOnly(newVerified);
    setCurrentIndex(0);
    setVideoPlaying(false);
  };

  const handlePass = () => {
    if (!activeAthlete) return;
    setPassed((prev) => [...prev, activeAthlete.id]);
    setVideoPlaying(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleShortlist = () => {
    if (!activeAthlete) return;
    setShortlisted((prev) =>
      prev.some((item) => item.id === activeAthlete.id) ? prev : [...prev, activeAthlete]
    );
    setVideoPlaying(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleResetDeck = () => {
    setCurrentIndex(0);
    setPassed([]);
    setVideoPlaying(false);
  };

  const openInvite = (athlete) => {
    setInviteModalAthlete(athlete);
    setInviteSent(false);
  };

  const cardSurface = dark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const subSurface = dark ? "bg-slate-950 border-white/10" : "bg-slate-50 border-slate-200";
  const headingText = dark ? "text-white" : "text-slate-900";
  const bodyText = dark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Telemetry Filter Bar */}
      <div className={`border rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 ${cardSurface}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center">
            <SlidersHorizontal size={14} className="mr-1.5 text-emerald-500" /> Position:
          </span>
          {["All", "Striker", "Left Back", "Midfielder", "Goalkeeper"].map((pos) => (
            <button
              key={pos}
              onClick={() => handleFilterChange(pos, verifiedOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                posFilter === pos
                  ? "bg-emerald-500 text-slate-950"
                  : dark
                  ? "bg-slate-950 text-slate-400 hover:text-white border border-white/10"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleFilterChange(posFilter, !verifiedOnly)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center ${
              verifiedOnly
                ? "bg-blue-600 text-white border-blue-500"
                : dark
                ? "bg-slate-950 text-slate-400 border-white/10"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            <BadgeCheck size={14} className="mr-1.5" /> Verified Only
          </button>

          <button
            onClick={() => setShowShortlistDrawer(!showShortlistDrawer)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black border flex items-center transition-all ${
              dark
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            Shortlist ({shortlisted.length})
          </button>
        </div>
      </div>

      {/* Collapsible Shortlist Bar */}
      {showShortlistDrawer && (
        <div className={`border rounded-2xl p-4 mb-6 ${cardSurface}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-black uppercase tracking-wider ${headingText}`}>
              Shortlisted Candidates ({shortlisted.length})
            </h3>
            <button onClick={() => setShowShortlistDrawer(false)} className="text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
          {shortlisted.length === 0 ? (
            <p className={`text-xs ${bodyText}`}>
              No athletes shortlisted yet. Click "Shortlist & Invite" on a candidate dossier below.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shortlisted.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-xl p-3 flex items-center justify-between ${subSurface}`}
                >
                  <div>
                    <p className={`text-sm font-bold flex items-center ${headingText}`}>
                      {item.name}
                      {item.verified && <BadgeCheck size={14} className="ml-1 text-emerald-500" />}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.position} · {item.ageGroup} · {item.sprint30m}
                    </p>
                  </div>
                  <button
                    onClick={() => openInvite(item)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400"
                  >
                    Invite
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Rapid Triage Dossier Card */}
      {deck.length === 0 ? (
        <div className={`border rounded-3xl p-12 text-center ${cardSurface}`}>
          <p className={`text-lg font-bold ${headingText}`}>No athletes match the current filter.</p>
          <button
            onClick={() => handleFilterChange("All", false)}
            className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : isFinished ? (
        <div className={`border rounded-3xl p-12 text-center space-y-4 ${cardSurface}`}>
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
            <Check size={32} strokeWidth={3} />
          </div>
          <h2 className={`text-2xl font-black ${headingText}`}>Triage Queue Complete</h2>
          <p className={`text-sm max-w-md mx-auto ${bodyText}`}>
            You reviewed all {deck.length} prospects in this filter ({shortlisted.length} shortlisted, {passed.length}{" "}
            passed).
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleResetDeck}
              className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm"
            >
              <RotateCcw size={16} className="mr-2" /> Review Queue Again
            </button>
            {shortlisted.length > 0 && (
              <button
                onClick={() => setShowShortlistDrawer(true)}
                className={`px-6 py-3 rounded-full border font-bold text-sm ${
                  dark ? "border-white/15 text-white" : "border-slate-300 text-slate-900"
                }`}
              >
                View Shortlist ({shortlisted.length})
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={`border rounded-3xl overflow-hidden shadow-2xl ${cardSurface}`}>
          {/* Top Dossier Header Banner */}
          <div className={`bg-gradient-to-r ${activeAthlete.gradient} p-6 sm:p-7 text-white`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black leading-none">{activeAthlete.rating}</span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase mt-1">INDEX</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-950/70">
                      {activeAthlete.position} · {activeAthlete.ageGroup}
                    </span>
                    {activeAthlete.verified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-950/80 text-emerald-400 border border-emerald-400/30">
                        <BadgeCheck size={14} className="mr-1" /> Federation Verified
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-950/60 text-slate-200">
                        Pending Verification
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mt-1.5">{activeAthlete.name}</h2>
                  <p className="text-xs sm:text-sm text-white/90 flex items-center mt-0.5">
                    <MapPin size={14} className="mr-1" /> {activeAthlete.club} · {activeAthlete.city},{" "}
                    {activeAthlete.region}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-widest bg-slate-950/50 px-3 py-1.5 rounded-full">
                  Prospect {currentIndex + 1} of {deck.length}
                </span>
              </div>
            </div>
          </div>

          {/* Dossier Telemetry Body */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* Hard Telemetry Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["30m Sprint (Official)", activeAthlete.sprint30m],
                ["Pass Accuracy", activeAthlete.passAccuracy],
                ["Top Speed", activeAthlete.topSpeed],
                ["Physical / Foot", `${activeAthlete.height} · ${activeAthlete.foot}`],
              ].map(([label, val]) => (
                <div key={label} className={`border rounded-2xl p-3.5 ${subSurface}`}>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                  <p className={`text-lg font-black mt-1 ${headingText}`}>{val}</p>
                </div>
              ))}
            </div>

            {/* Attribute Bars + Full Match Footage Preview */}
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: 6 Scouting Attributes */}
              <div className={`lg:col-span-5 border rounded-2xl p-4 space-y-3 ${subSurface}`}>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Verified Scouting Metrics
                </p>
                {Object.entries(activeAthlete.stats).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={bodyText}>{key}</span>
                      <span className={headingText}>{val} / 99</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-slate-800" : "bg-slate-200"}`}>
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Uncut Match Video Archive & Verification Log */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className={`cursor-pointer border rounded-2xl p-5 flex-1 flex flex-col justify-between transition-all ${
                    videoPlaying
                      ? "border-emerald-500 bg-slate-950 text-white"
                      : `${subSurface} hover:border-blue-500/50`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-xs font-black uppercase tracking-wider text-blue-500">
                      <Film size={14} className="mr-1.5" /> Uncut Match Archive ({activeAthlete.fullMatches} Full Games)
                    </span>
                    <span className="text-xs font-bold text-emerald-500">{activeAthlete.goalsAssists}</span>
                  </div>

                  <div className="my-4 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Play size={22} />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${videoPlaying ? "text-white" : headingText}`}>
                        {activeAthlete.matchTitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {videoPlaying
                          ? "▶ Playing verified full-match feed (00:14:22 / 90:00) — Tactical Wide Angle"
                          : "Click to preview full 90-minute match recording"}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-current/10">
                    <span className="flex items-center">
                      <ShieldCheck size={14} className="mr-1 text-emerald-500" /> {activeAthlete.verifiedBy}
                    </span>
                    <span className="font-bold text-emerald-500">HD 1080p</span>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed ${bodyText}`}>{activeAthlete.summary}</p>
              </div>
            </div>

            {/* Rapid Triage Action Bar (Skip vs Shortlist & Invite) */}
            <div className={`pt-5 border-t flex flex-col sm:flex-row gap-3 ${dark ? "border-white/10" : "border-slate-200"}`}>
              <button
                onClick={handlePass}
                className={`flex-1 py-4 rounded-2xl border font-black text-sm flex items-center justify-center transition-all active:scale-95 ${
                  dark
                    ? "bg-slate-950 hover:bg-rose-500/15 border-white/10 hover:border-rose-500/50 text-slate-300 hover:text-rose-400"
                    : "bg-slate-100 hover:bg-rose-50 border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-600"
                }`}
              >
                <X size={18} className="mr-2" /> Pass / Skip
              </button>

              <button
                onClick={() => openInvite(activeAthlete)}
                className={`px-6 py-4 rounded-2xl border font-bold text-sm flex items-center justify-center transition-all ${
                  dark
                    ? "bg-blue-500/15 hover:bg-blue-500/25 border-blue-500/30 text-blue-300"
                    : "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                }`}
              >
                Invite to Trial
              </button>

              <button
                onClick={handleShortlist}
                className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                <Heart size={18} className="mr-2" /> Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite to Trial Modal */}
      {inviteModalAthlete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-md w-full p-6 relative ${cardSurface}`}>
            <button
              onClick={() => setInviteModalAthlete(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"
            >
              <X size={16} />
            </button>

            {inviteSent ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 className={`text-xl font-black ${headingText}`}>Trial Invitation Sent!</h3>
                <p className={`text-sm ${bodyText}`}>
                  Direct guardian-moderated notification sent for <strong>{inviteModalAthlete.name}</strong> (
                  {inviteModalAthlete.club}).
                </p>
                <button
                  onClick={() => setInviteModalAthlete(null)}
                  className="mt-4 px-7 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInviteSent(true);
                }}
                className="space-y-4"
              >
                <h3 className={`text-xl font-black ${headingText}`}>Invite {inviteModalAthlete.name}</h3>
                <p className={`text-xs ${bodyText}`}>
                  Zero intermediary fees. Messages for U18 athletes are routed through verified academy & guardian channels.
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Club / Academy Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Wisła Kraków Scouting Dept."
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500 ${subSurface} ${headingText}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Official Scout Email</label>
                  <input
                    required
                    type="email"
                    placeholder="scout@club.eu"
                    value={scoutEmail}
                    onChange={(e) => setScoutEmail(e.target.value)}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500 ${subSurface} ${headingText}`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center"
                >
                  <Send size={15} className="mr-2" /> Send Official Trial Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. ATHLETE CARD STUDIO (B2C Interactive EA FC Card Generator)      */
/* ------------------------------------------------------------------ */
function AthleteCardStudio({ dark }) {
  const [playerName, setPlayerName] = useState("Nika Maisuradze");
  const [age, setAge] = useState("16");
  const [city, setCity] = useState("Zugdidi");
  const [position, setPosition] = useState("ST");
  const [cardStyle, setCardStyle] = useState("pro"); // 'basic' | 'pro'
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

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isPro = cardStyle === "pro";
  const cardSurface = dark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const subSurface = dark ? "bg-slate-950 border-white/10" : "bg-slate-50 border-slate-200";
  const headingText = dark ? "text-white" : "text-slate-900";
  const bodyText = dark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Card Customizer Form */}
        <div className={`lg:col-span-7 border rounded-3xl p-6 sm:p-7 space-y-6 ${cardSurface}`}>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500">
              <Sparkles size={13} className="mr-1.5" /> B2C Athlete Studio
            </span>
            <h2 className={`text-2xl font-black mt-2 ${headingText}`}>Build Your Verified Player Card</h2>
            <p className={`text-xs sm:text-sm mt-1 ${bodyText}`}>
              Customize your scouting metrics and generate your shareable EA FC-style card for international scouts & social media.
            </p>
          </div>

          {/* Player Bio Inputs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className={`w-full border rounded-xl px-3.5 py-2.5 text-sm font-bold focus:outline-none focus:border-emerald-500 ${subSurface} ${headingText}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pos</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className={`w-full border rounded-xl px-2.5 py-2.5 text-sm font-bold focus:outline-none focus:border-emerald-500 ${subSurface} ${headingText}`}
                >
                  {["ST", "LW", "RW", "CAM", "CM", "LB", "CB", "GK"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label>
                <input
                  type="number"
                  min="13"
                  max="23"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={`w-full border rounded-xl px-2.5 py-2.5 text-sm font-bold focus:outline-none focus:border-emerald-500 ${subSurface} ${headingText}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full border rounded-xl px-2.5 py-2.5 text-sm font-bold focus:outline-none focus:border-emerald-500 ${subSurface} ${headingText}`}
                />
              </div>
            </div>
          </div>

          {/* Card Tier & Verification Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex gap-2">
              <button
                onClick={() => setCardStyle("basic")}
                className={`px-4 py-2 rounded-full text-xs font-black border ${
                  !isPro
                    ? "bg-slate-700 text-white border-slate-600"
                    : dark
                    ? "bg-slate-950 text-slate-400 border-white/10"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                Basic Free Tier
              </button>
              <button
                onClick={() => setCardStyle("pro")}
                className={`px-4 py-2 rounded-full text-xs font-black border ${
                  isPro
                    ? "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 border-transparent"
                    : dark
                    ? "bg-slate-950 text-slate-400 border-white/10"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                ★ Pro Gold/Emerald
              </button>
            </div>

            <button
              onClick={() => setVerified(!verified)}
              className={`px-4 py-2 rounded-full text-xs font-bold border flex items-center ${
                verified
                  ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                  : dark
                  ? "bg-slate-950 text-slate-400 border-white/10"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              <BadgeCheck size={14} className="mr-1.5" />
              {verified ? "Federation Verified ✓" : "Unverified"}
            </button>
          </div>

          {/* 6 Stat Sliders */}
          <div className={`border rounded-2xl p-4 grid sm:grid-cols-2 gap-x-6 gap-y-3 ${subSurface}`}>
            {Object.entries(attrs).map(([statKey, val]) => (
              <div key={statKey}>
                <div className="flex justify-between text-xs font-black mb-1">
                  <span className="text-slate-500">{statKey}</span>
                  <span className={headingText}>{val}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={val}
                  onChange={(e) => setAttrs({ ...attrs, [statKey]: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live EA FC Card Output + Scout Reach Insights */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-6">
          <div className="relative w-72 sm:w-80">
            <div
              className={`absolute -inset-4 rounded-3xl blur-2xl transition-all ${
                isPro
                  ? "bg-gradient-to-tr from-amber-400/35 via-emerald-500/30 to-blue-500/25"
                  : "bg-slate-500/20"
              }`}
            />

            <div
              className={`relative rounded-3xl p-6 border-2 shadow-2xl transition-all ${
                isPro
                  ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 border-amber-400/80 text-white"
                  : dark
                  ? "bg-slate-900 border-slate-700 text-slate-200"
                  : "bg-gradient-to-b from-slate-100 to-slate-200 border-slate-300 text-slate-900"
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-5xl font-black leading-none ${isPro ? "text-amber-400" : ""}`}>
                    {overallRating}
                  </span>
                  <span className={`block text-sm font-black tracking-widest mt-1 ${isPro ? "text-emerald-400" : "text-slate-500"}`}>
                    {position} · U{Number(age) <= 15 ? "15" : Number(age) <= 17 ? "17" : "19"}
                  </span>
                  <span className="inline-block mt-2 text-[10px] font-black px-2 py-0.5 rounded bg-red-600 text-white">
                    GEO · {city.toUpperCase()}
                  </span>
                </div>

                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ${
                    isPro
                      ? "bg-gradient-to-br from-amber-400 via-emerald-500 to-blue-600 text-slate-950"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {initials}
                </div>
              </div>

              {/* Player Name */}
              <div className="mt-5 text-center border-b border-current/15 pb-3">
                <div className="flex items-center justify-center space-x-1.5">
                  <h3 className="text-xl font-black uppercase tracking-tight truncate">{playerName || "Athlete Name"}</h3>
                  {verified && <BadgeCheck size={18} className="text-emerald-400 flex-shrink-0" />}
                </div>
                <p className="text-[11px] opacity-75 font-bold mt-0.5">
                  {verified ? "FEDERATION VERIFIED · SCOUTER.GE" : "SELF-REPORTED · SCOUTER.GE"}
                </p>
              </div>

              {/* 6-Stat Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm font-black px-2">
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
            onClick={handleShare}
            className="w-72 sm:w-80 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check size={17} className="mr-2" strokeWidth={3} /> Shareable Card Link Copied!
              </>
            ) : (
              <>
                <Share2 size={16} className="mr-2" /> Share Verified Card
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ROOT APPLICATION (Dual-Role Web App)                               */
/* ------------------------------------------------------------------ */
export default function App() {
  const [role, setRole] = useState("scout"); // 'scout' | 'athlete'
  const [theme, setTheme] = useState("dark");
  const dark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        dark ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Top App Workspace Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          dark ? "bg-slate-950/90 border-white/10" : "bg-white/90 border-slate-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand + Back to Main Website */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center rotate-12">
                <Activity size={20} className="text-slate-950 -rotate-12" />
              </div>
              <span className={`text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
                Scouter<span className="text-emerald-500">.</span>
              </span>
            </div>

            <a
              href={SITE_URL}
              className={`hidden sm:inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                dark
                  ? "border-white/10 text-slate-400 hover:text-white hover:bg-slate-900"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <ArrowLeft size={13} className="mr-1" /> Website
            </a>
          </div>

          {/* Crisp Role Switcher */}
          <div
            className={`border rounded-full p-1 flex ${
              dark ? "bg-slate-900 border-white/10" : "bg-slate-100 border-slate-200"
            }`}
          >
            <button
              onClick={() => setRole("scout")}
              className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center transition-all ${
                role === "scout"
                  ? "bg-blue-600 text-white shadow"
                  : dark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users size={14} className="mr-1.5" /> Scout Rapid Triage
            </button>
            <button
              onClick={() => setRole("athlete")}
              className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center transition-all ${
                role === "athlete"
                  ? "bg-emerald-500 text-slate-950 shadow"
                  : dark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Trophy size={14} className="mr-1.5" /> Athlete Card Studio
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            aria-label="Toggle Theme"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
              dark
                ? "bg-slate-900 border-white/10 text-amber-400 hover:bg-slate-800"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* Active Workspace */}
      <main className="flex-1">
        {role === "scout" ? (
          <ScoutTriageWorkspace dark={dark} />
        ) : (
          <AthleteCardStudio dark={dark} />
        )}
      </main>
    </div>
  );
}
