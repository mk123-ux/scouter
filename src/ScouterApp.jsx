import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Users,
  ChevronLeft,
  PlayCircle,
  Activity,
  MapPin,
  Share2,
  X,
  Heart,
  Eye,
  TrendingUp,
  Zap,
  MessageCircle,
  Send,
  Search,
  Info,
  ArrowLeft,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* MOCK DATA                                                          */
/* ------------------------------------------------------------------ */
const MOCK_ATHLETES = [
  {
    id: 1,
    name: "George Maisuradze",
    initials: "GM",
    sport: "Football",
    position: "Striker",
    age: 16,
    height: "178 cm",
    weight: "68 kg",
    location: "Tbilisi, GE",
    bgGradient: "from-blue-600 to-emerald-500",
    stats: { pace: 88, shooting: 82, passing: 75 },
  },
  {
    id: 2,
    name: "Luka Beridze",
    initials: "LB",
    sport: "Basketball",
    position: "Point Guard",
    age: 17,
    height: "192 cm",
    weight: "82 kg",
    location: "Batumi, GE",
    bgGradient: "from-orange-500 to-rose-500",
    stats: { agility: 90, shooting: 85, defense: 78 },
  },
  {
    id: 3,
    name: "Sandro Giorgadze",
    initials: "SG",
    sport: "Rugby",
    position: "Fly-half",
    age: 18,
    height: "185 cm",
    weight: "90 kg",
    location: "Kutaisi, GE",
    bgGradient: "from-slate-700 to-slate-500",
    stats: { strength: 85, kicking: 88, tackling: 80 },
  },
  {
    id: 4,
    name: "David Lomidze",
    initials: "DL",
    sport: "Football",
    position: "Midfielder",
    age: 15,
    height: "172 cm",
    weight: "62 kg",
    location: "Tbilisi, GE",
    bgGradient: "from-emerald-500 to-teal-700",
    stats: { pace: 80, passing: 89, dribbling: 84 },
  },
];

const INITIAL_CONVERSATIONS = {
  1: {
    time: "10:42 AM",
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: "scout", text: "Hi George, I reviewed your highlights. Impressive pace in the final third!" },
      { id: 2, sender: "athlete", text: "Thank you! I've been working hard on my sprints and explosiveness." },
      { id: 3, sender: "scout", text: "It shows. Are you available for a trial match next month in Tbilisi?" },
      { id: 4, sender: "athlete", text: "Absolutely, I'd love that opportunity." },
      { id: 5, sender: "athlete", text: "Thanks for the feedback, coach!" },
    ],
  },
  3: {
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "scout", text: "Sandro, could you send a full match video?" },
      { id: 2, sender: "athlete", text: "I'll send the full match video tomorrow." },
    ],
  },
};

const getAthlete = (id) => MOCK_ATHLETES.find((a) => a.id === id);

/* Illustrated placeholder portraits (inline SVG, no external files) */
const makeAvatar = ({ skin, hair, jersey }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
    <path d="M20 400 C20 305 85 268 150 268 C215 268 280 305 280 400 Z" fill="${jersey}"/>
    <path d="M118 270 L150 310 L182 270" fill="none" stroke="#ffffff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="122" y="212" width="56" height="70" rx="24" fill="${skin}"/>
    <rect x="122" y="248" width="56" height="30" fill="#000000" opacity="0.12"/>
    <circle cx="93" cy="172" r="12" fill="${skin}"/>
    <circle cx="207" cy="172" r="12" fill="${skin}"/>
    <ellipse cx="150" cy="165" rx="57" ry="68" fill="${skin}"/>
    <path d="M90 158 C84 98 118 78 152 78 C188 78 216 98 210 158 C198 126 178 116 150 116 C122 116 102 126 90 158 Z" fill="${hair}"/>
    <path d="M112 150 Q128 143 142 150" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
    <path d="M158 150 Q172 143 188 150" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="128" cy="170" rx="6" ry="7" fill="#1f2937"/>
    <ellipse cx="172" cy="170" rx="6" ry="7" fill="#1f2937"/>
    <circle cx="130" cy="167" r="2" fill="#ffffff"/>
    <circle cx="174" cy="167" r="2" fill="#ffffff"/>
    <path d="M150 176 Q145 192 152 195" fill="none" stroke="#000000" opacity="0.25" stroke-width="3" stroke-linecap="round"/>
    <path d="M130 207 Q150 224 170 207" fill="none" stroke="#7c2d12" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const DEFAULT_PHOTOS = {
  1: makeAvatar({ skin: "#e3b18a", hair: "#2b1d14", jersey: "#2563eb" }),
  2: makeAvatar({ skin: "#8d5a3b", hair: "#111827", jersey: "#f97316" }),
  3: makeAvatar({ skin: "#efc7a3", hair: "#6b3f1d", jersey: "#475569" }),
  4: makeAvatar({ skin: "#d9a577", hair: "#1f1a17", jersey: "#0d9488" }),
};

/* ------------------------------------------------------------------ */
/* SHARED: Scout bottom nav                                           */
/* ------------------------------------------------------------------ */
function ScoutBottomNav({ currentTab, onNavigate, unreadTotal }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-950/95 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-6 z-50">
      <button
        onClick={() => onNavigate("scout")}
        className={`flex flex-col items-center transition-colors ${
          currentTab === "scout" ? "text-emerald-500" : "text-slate-500 hover:text-slate-300"
        }`}
      >
        <Search size={24} />
        <span className="text-xs font-bold mt-1 tracking-wider">DISCOVER</span>
      </button>

      <button
        onClick={() => onNavigate("messages")}
        className={`flex flex-col items-center relative transition-colors ${
          currentTab === "messages" ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
        }`}
      >
        <MessageCircle size={24} />
        {unreadTotal > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
            {unreadTotal}
          </span>
        )}
        <span className="text-xs font-bold mt-1 tracking-wider">INBOX</span>
      </button>

      <button className="flex flex-col items-center transition-colors text-slate-500 hover:text-slate-300">
        <User size={24} />
        <span className="text-xs font-bold mt-1 tracking-wider">PROFILE</span>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. LANDING                                                         */
/* ------------------------------------------------------------------ */
function LandingView({ onNavigate }) {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar relative">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="min-h-full flex flex-col items-center justify-center p-6 text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg rotate-12 hover:rotate-0 transition-transform duration-500">
            <Activity size={48} className="text-slate-950 -rotate-12" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white mt-6">
            Scouter<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xs mx-auto font-medium">
            The fast track to pro sports.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-5 mt-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Select Your Role</p>

          <button
            onClick={() => onNavigate("athlete")}
            className="w-full flex items-center p-5 bg-slate-800/60 backdrop-blur-xl border border-white/5 hover:border-emerald-500/50 rounded-3xl transition-all duration-300 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-300">
              <User className="text-emerald-500 group-hover:text-slate-950 transition-colors" size={28} />
            </div>
            <div className="ml-5 text-left flex-1">
              <h3 className="text-lg font-bold text-white tracking-wide">I'm an Athlete</h3>
              <p className="text-sm text-slate-400 mt-0.5">Build your profile & get seen</p>
            </div>
            <ChevronLeft className="text-slate-600 rotate-180 group-hover:text-emerald-500 transition-colors" size={20} />
          </button>

          <button
            onClick={() => onNavigate("scout")}
            className="w-full flex items-center p-5 bg-slate-800/60 backdrop-blur-xl border border-white/5 hover:border-blue-500/50 rounded-3xl transition-all duration-300 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
              <Users className="text-blue-500 group-hover:text-slate-950 transition-colors" size={28} />
            </div>
            <div className="ml-5 text-left flex-1">
              <h3 className="text-lg font-bold text-white tracking-wide">I'm a Scout</h3>
              <p className="text-sm text-slate-400 mt-0.5">Discover raw talent</p>
            </div>
            <ChevronLeft className="text-slate-600 rotate-180 group-hover:text-blue-500 transition-colors" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. ATHLETE PROFILE (scrolls inside the phone frame)                */
/* ------------------------------------------------------------------ */
function AthleteView({ onNavigate, photo, onPhoto }) {
  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full overflow-y-auto hide-scrollbar bg-slate-950">
      <header className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("landing")}
          className="p-2 -ml-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-bold text-white tracking-wide">My Profile</span>
        <button className="p-2 -mr-2 bg-slate-900 rounded-full text-emerald-500 hover:text-emerald-400 transition-colors">
          <Share2 size={18} />
        </button>
      </header>

      <div className="px-5 py-6 space-y-8 pb-16">
        <div className="flex flex-col items-center text-center">
          <label className="relative mb-4 cursor-pointer block">
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-blue-500">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                {photo ? (
                  <img src={photo} alt="George Maisuradze" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-500">
                    <span className="text-4xl font-black">GM</span>
                    <span className="text-xs font-semibold mt-1">Tap to add photo</span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-emerald-500 w-8 h-8 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-lg">
              <Zap size={14} className="text-slate-950 fill-current" />
            </div>
          </label>

          <h2 className="text-3xl font-black text-white tracking-tight">George Maisuradze</h2>
          <div className="flex items-center justify-center space-x-2 text-slate-400 mt-2 font-medium">
            <MapPin size={16} className="text-emerald-500" />
            <span>Tbilisi, Georgia</span>
          </div>
          <div className="inline-flex mt-4 px-4 py-1.5 bg-slate-800/80 border border-white/5 text-slate-200 rounded-full text-sm font-semibold shadow-sm">
            <span className="text-emerald-400 mr-2">⚽</span> Football • Striker
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "AGE", value: "16" },
            { label: "HEIGHT", value: "178", unit: "cm" },
            { label: "WEIGHT", value: "68", unit: "kg" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-900 border border-white/5 p-4 rounded-3xl text-center shadow-sm">
              <div className="text-slate-500 text-xs font-bold tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-white">
                {stat.value}
                <span className="text-sm text-slate-500 font-medium ml-1">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center relative">
            <TrendingUp size={16} className="mr-2 text-blue-500" /> Insights
          </h3>
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <Eye size={24} className="text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">12</div>
                <div className="text-sm text-slate-400 font-medium">Profile Views</div>
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
              +3 this week
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center">
            <PlayCircle size={16} className="mr-2 text-emerald-500" /> Highlights
          </h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
            {[1, 2].map((video) => (
              <div
                key={video}
                style={{ width: 260, minWidth: 260, height: 160, flexShrink: 0 }}
                className="bg-slate-900 rounded-3xl border border-white/5 relative snap-center group overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                    <PlayCircle size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white text-sm font-bold tracking-wide">Dinamo Academy Match</p>
                  <p className="text-slate-400 text-xs mt-1">2 mins • Oct 15</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. SCOUT: SWIPE VIEW                                               */
/* Drag the card left/right, or use the X / heart buttons.            */
/* Index lives in the parent so it survives opening a profile.        */
/* ------------------------------------------------------------------ */
const SWIPE_THRESHOLD = 90;

function ScoutView({ photos = {}, index, setIndex, onNavigate, onOpenDetail, unreadTotal }) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exit, setExit] = useState(null); // 'left' | 'right' | null
  const startX = useRef(0);
  const moved = useRef(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const active = MOCK_ATHLETES[index];
  const isFinished = index >= MOCK_ATHLETES.length;

  const commitSwipe = (direction) => {
    if (exit) return;
    setExit(direction);
    timer.current = setTimeout(() => {
      setIndex((prev) => prev + 1);
      setExit(null);
      setDragX(0);
    }, 300);
  };

  const onPointerDown = (e) => {
    if (exit) return;
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
      if (!moved.current && active) onOpenDetail(active); // simple tap -> open profile
    }
  };

  const cardStyle = {
    maxHeight: "34rem",
    transform: exit
      ? `translateX(${exit === "right" ? 150 : -150}%) rotate(${exit === "right" ? 18 : -18}deg)`
      : `translateX(${dragX}px) rotate(${dragX / 18}deg)`,
    opacity: exit ? 0 : 1,
    transition: dragging ? "none" : "transform 300ms ease, opacity 300ms ease",
    touchAction: "pan-y",
    cursor: dragging ? "grabbing" : "grab",
    userSelect: "none",
  };

  const likeOpacity = Math.min(Math.max(dragX / SWIPE_THRESHOLD, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div className="h-full bg-slate-950 flex flex-col relative">
      <header className="px-5 py-5 flex items-center justify-between z-10 flex-shrink-0">
        <button
          onClick={() => onNavigate("landing")}
          className="w-10 h-10 bg-slate-900/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="font-bold text-white tracking-widest text-sm uppercase flex items-center">
          <Search size={16} className="mr-2 text-emerald-500" /> Discover
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-900/80 border border-white/5 flex items-center justify-center text-slate-400">
          <Users size={18} />
        </div>
      </header>

      {/* Card area */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-5 py-2 overflow-hidden">
        {isFinished ? (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-slate-900 rounded-full mx-auto flex items-center justify-center mb-6 border border-white/5">
              <Zap size={32} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">All caught up!</h3>
            <p className="text-slate-400 text-sm mx-auto" style={{ maxWidth: 250 }}>
              You've reviewed all available athletes in your area for now.
            </p>
            <button
              onClick={() => setIndex(0)}
              className="mt-8 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-full hover:bg-emerald-400 transition-colors"
            >
              Review Again
            </button>
          </div>
        ) : (
          <div
            key={active.id}
            style={cardStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="w-full max-w-sm h-full rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient} opacity-90`} />
            {photos[active.id] && (
              <img
                src={photos[active.id]}
                alt={active.name}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

            {/* swipe feedback stamps */}
            <div
              style={{ opacity: likeOpacity }}
              className="absolute top-16 left-6 px-4 py-1 border-4 border-emerald-400 text-emerald-400 font-black text-2xl rounded-xl -rotate-12 tracking-widest"
            >
              SHORTLIST
            </div>
            <div
              style={{ opacity: passOpacity }}
              className="absolute top-16 right-6 px-4 py-1 border-4 border-rose-400 text-rose-400 font-black text-2xl rounded-xl rotate-12 tracking-widest"
            >
              PASS
            </div>

            <div className="absolute top-5 left-5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wider">NEW</span>
            </div>

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(active);
              }}
              aria-label="View profile"
              className="absolute top-5 right-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors z-20 shadow-lg"
            >
              <Info size={20} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
              <div>
                <h2 className="text-3xl font-black text-white drop-shadow-md">
                  {active.name}, {active.age}
                </h2>
                <p className="text-slate-300 font-medium text-lg mt-1 flex items-center">
                  <MapPin size={16} className="mr-1 opacity-70" /> {active.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[active.sport, active.position, active.height].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-sm font-semibold text-white border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/20 flex justify-between">
                {Object.entries(active.stats).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-white/70 text-xs uppercase font-bold tracking-widest">{key}</div>
                    <div className="text-white font-black text-lg">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons (in the layout flow, never hidden) */}
      {!isFinished && (
        <div className="flex-shrink-0 flex justify-center items-center space-x-6 pt-4 pb-24 z-20">
          <button
            onClick={() => commitSwipe("left")}
            disabled={exit !== null}
            aria-label="Pass"
            className="w-16 h-16 bg-slate-900 border-2 border-rose-500/50 rounded-full flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <X size={32} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => onOpenDetail(active)}
            aria-label="View profile"
            className="w-12 h-12 bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-lg border border-white/10"
          >
            <Info size={20} />
          </button>

          <button
            onClick={() => commitSwipe("right")}
            disabled={exit !== null}
            aria-label="Shortlist"
            className="w-16 h-16 bg-slate-900 border-2 border-emerald-500/50 rounded-full flex items-center justify-center text-emerald-500 shadow-lg hover:bg-emerald-500 hover:text-slate-950 hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <Heart size={30} strokeWidth={2.5} className="fill-current" />
          </button>
        </div>
      )}

      <ScoutBottomNav currentTab="scout" onNavigate={onNavigate} unreadTotal={unreadTotal} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. SCOUT: ATHLETE DETAIL                                           */
/* ------------------------------------------------------------------ */
function ScoutDetailView({ athlete, photo, onNavigate, onMessage }) {
  if (!athlete) return null;
  return (
    <div className="h-full relative bg-slate-950">
      <div className="h-full overflow-y-auto hide-scrollbar pb-32">
        <div
          className={`h-80 w-full bg-gradient-to-br ${athlete.bgGradient} relative rounded-b-3xl shadow-2xl overflow-hidden`}
        >
          {photo && <img src={photo} alt={athlete.name} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <div className="absolute top-6 left-5 right-5 flex justify-between items-center z-10">
            <button
              onClick={() => onNavigate("scout")}
              className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:text-emerald-400 transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-md">{athlete.name}</h1>
            <p className="text-slate-200 font-medium text-lg mt-1 flex items-center drop-shadow-sm">
              <MapPin size={16} className="mr-1 text-emerald-400" /> {athlete.location}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {[athlete.sport, athlete.position].map((t) => (
                <span
                  key={t}
                  className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "AGE", value: athlete.age },
              { label: "HEIGHT", value: athlete.height.split(" ")[0], unit: "cm" },
              { label: "WEIGHT", value: athlete.weight.split(" ")[0], unit: "kg" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/80 border border-white/5 p-4 rounded-3xl text-center shadow-sm"
              >
                <div className="text-slate-500 text-xs font-bold tracking-widest mb-1">{stat.label}</div>
                <div className="text-2xl font-black text-white">
                  {stat.value}
                  <span className="text-sm text-slate-500 font-medium ml-1">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center mb-4">
              <Activity size={16} className="mr-2 text-blue-500" /> Key Attributes
            </h3>
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-5 space-y-4">
              {Object.entries(athlete.stats).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-300 uppercase tracking-wider">{key}</span>
                    <span className="text-emerald-400">{val}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-50 pb-8">
        <button
          onClick={() => onMessage(athlete.id)}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-full text-lg shadow-lg flex items-center justify-center transition-all active:scale-95"
        >
          <MessageCircle className="mr-2" size={24} /> Message Athlete
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. INBOX                                                           */
/* ------------------------------------------------------------------ */
function MessagesView({ conversations, onNavigate, onOpenChat, unreadTotal }) {
  const entries = Object.entries(conversations);
  return (
    <div className="h-full bg-slate-950 flex flex-col relative">
      <header className="px-6 py-6 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl z-20 flex-shrink-0">
        <h2 className="text-3xl font-black text-white tracking-tight">Messages</h2>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 pb-24 hide-scrollbar">
        {entries.length === 0 && (
          <p className="text-center text-slate-500 text-sm mt-16">No conversations yet.</p>
        )}
        {entries.map(([id, convo]) => {
          const athlete = getAthlete(Number(id));
          const last = convo.messages[convo.messages.length - 1];
          return (
            <div
              key={id}
              onClick={() => onOpenChat(Number(id))}
              className="flex items-center p-4 bg-slate-900/40 hover:bg-slate-800/60 border border-transparent hover:border-white/5 rounded-3xl cursor-pointer transition-all duration-200"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 p-0.5">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-black text-slate-300 text-lg">
                    {athlete.initials}
                  </div>
                </div>
                {convo.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                )}
              </div>

              <div className="ml-4 flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold truncate ${convo.unread > 0 ? "text-white" : "text-slate-300"}`}>
                    {athlete.name}
                  </h3>
                  <span
                    className={`text-xs whitespace-nowrap ml-2 ${
                      convo.unread > 0 ? "text-emerald-500 font-bold" : "text-slate-500"
                    }`}
                  >
                    {convo.time}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    convo.unread > 0 ? "text-slate-300 font-medium" : "text-slate-500"
                  }`}
                >
                  {last ? last.text : "Say hello 👋"}
                </p>
              </div>

              {convo.unread > 0 && (
                <div className="ml-3 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {convo.unread}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ScoutBottomNav currentTab="messages" onNavigate={onNavigate} unreadTotal={unreadTotal} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. CHAT                                                            */
/* ------------------------------------------------------------------ */
function ChatView({ athlete, convo, onBack, onSend }) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo?.messages.length]);

  if (!athlete || !convo) return null;

  const submit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSend(athlete.id, text);
    setDraft("");
  };

  return (
    <div className="h-full bg-slate-950 flex flex-col">
      <header className="px-4 py-4 border-b border-white/5 flex items-center bg-slate-900/90 backdrop-blur-xl z-20 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 mr-2 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 p-0.5 mr-3">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-slate-300 text-sm">
            {athlete.initials}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white leading-tight">{athlete.name}</h3>
          {convo.online && (
            <p className="text-xs text-emerald-400 font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" /> Online
            </p>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 hide-scrollbar">
        <div className="text-center text-xs text-slate-500 font-medium mb-4 uppercase tracking-widest">Today</div>
        {convo.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "scout" ? "justify-end" : "justify-start"}`}>
            <div
              style={{ maxWidth: "75%" }}
              className={`p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                msg.sender === "scout"
                  ? "bg-emerald-500 text-slate-950 rounded-tr-sm"
                  : "bg-slate-800 border border-white/5 text-slate-200 rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={submit} className="p-4 bg-slate-950 border-t border-white/5 pb-6 flex-shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message ${athlete.name.split(" ")[0]}...`}
            className="w-full bg-slate-900 border border-white/10 text-white rounded-full py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            aria-label="Send"
            className="absolute right-2 top-2 w-10 h-10 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center text-slate-950 shadow-md transition-transform active:scale-95"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ROOT                                                               */
/* ------------------------------------------------------------------ */
export default function ScouterApp() {
  const [currentView, setCurrentView] = useState("landing");
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS); // athleteId -> photo (data URL)

  const unreadTotal = Object.values(conversations).reduce((n, c) => n + c.unread, 0);

  const openDetail = (athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView("scout-detail");
  };

  const openChat = (athleteId) => {
    setConversations((prev) => ({
      ...prev,
      [athleteId]: prev[athleteId]
        ? { ...prev[athleteId], unread: 0 }
        : { time: "Now", unread: 0, online: true, messages: [] },
    }));
    setActiveChatId(athleteId);
    setCurrentView("chat");
  };

  const sendMessage = (athleteId, text) => {
    setConversations((prev) => {
      const convo = prev[athleteId];
      return {
        ...prev,
        [athleteId]: {
          ...convo,
          time: "Now",
          messages: [...convo.messages, { id: Date.now(), sender: "scout", text }],
        },
      };
    });
  };

  return (
    <div className="bg-black font-sans selection:bg-emerald-500/30" style={{ height: "100dvh" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />
      <div className="max-w-md mx-auto h-full bg-slate-950 shadow-2xl overflow-hidden relative border-x border-white/5">
        {currentView === "landing" && <LandingView onNavigate={setCurrentView} />}
        {currentView === "athlete" && (
          <AthleteView onNavigate={setCurrentView} photo={photos[1]} onPhoto={(url) => setPhotos({ ...photos, 1: url })} />
        )}
        {currentView === "scout" && (
          <ScoutView
            photos={photos}
            index={cardIndex}
            setIndex={setCardIndex}
            onNavigate={setCurrentView}
            onOpenDetail={openDetail}
            unreadTotal={unreadTotal}
          />
        )}
        {currentView === "scout-detail" && (
          <ScoutDetailView athlete={selectedAthlete} photo={selectedAthlete && photos[selectedAthlete.id]} onNavigate={setCurrentView} onMessage={openChat} />
        )}
        {currentView === "messages" && (
          <MessagesView
            conversations={conversations}
            onNavigate={setCurrentView}
            onOpenChat={openChat}
            unreadTotal={unreadTotal}
          />
        )}
        {currentView === "chat" && (
          <ChatView
            athlete={getAthlete(activeChatId)}
            convo={conversations[activeChatId]}
            onBack={() => setCurrentView("messages")}
            onSend={sendMessage}
          />
        )}
      </div>
    </div>
  );
}
