import { useState, useEffect, useRef, useCallback } from "react";

const DEITIES = [
  { id: "shiva", name: "Shiva", telugu: "శివుడు", icon: "🔱", color: "from-violet-900 to-indigo-900" },
  { id: "kala_bhairava", name: "Kala Bhairava", telugu: "కాల భైరవ", icon: "⚡", color: "from-red-950 to-rose-900" },
  { id: "lalitha", name: "Lalitha Devi", telugu: "లలిత దేవి", icon: "🌸", color: "from-pink-950 to-fuchsia-900" },
  { id: "hanuman", name: "Hanuman", telugu: "హనుమాన్", icon: "🌟", color: "from-orange-950 to-amber-900" },
  { id: "lakshmi", name: "Lakshmi", telugu: "లక్ష్మి", icon: "🪷", color: "from-yellow-950 to-amber-900" },
  { id: "ganesha", name: "Ganesha", telugu: "గణేశ", icon: "🐘", color: "from-emerald-950 to-teal-900" },
];

const MANTRAS = {
  shiva: [
    {
      id: "s1",
      title: "Panchakshara Mantra",
      telugu: "పంచాక్షర మంత్రం",
      lines: [
        { tel: "నమః శివాయ", eng: "Namaḥ Śivāya", meaning: "Salutations to Shiva" },
      ],
    },
    {
      id: "s2",
      title: "Shiva Maha Mantra",
      telugu: "శివ మహా మంత్రం",
      lines: [
        { tel: "ఓం నమః శివాయ", eng: "Om Namah Shivaya", meaning: "Om, salutations to Shiva" },
        { tel: "శంభో మహాదేవ", eng: "Shambho Mahadeva", meaning: "O auspicious great god" },
        { tel: "దేవేశ శివ శంకర", eng: "Devesha Shiva Shankara", meaning: "Lord of gods, Shiva the peaceful" },
        { tel: "భూతేశ్వర భవ", eng: "Bhuteshvara Bhava", meaning: "Lord of all beings" },
      ],
    },
    {
      id: "s3",
      title: "Maha Mrityunjaya Mantra",
      telugu: "మహా మృత్యుంజయ మంత్రం",
      lines: [
        { tel: "ఓం త్ర్యంబకం యజామహే", eng: "Om Tryambakam Yajamahe", meaning: "We worship the three-eyed Lord Shiva" },
        { tel: "సుగంధిం పుష్టివర్ధనం", eng: "Sugandhim Pushtivardhanam", meaning: "Who is fragrant and nourishes all beings" },
        { tel: "ఉర్వారుకమివ బంధనాత్", eng: "Urvarukamiva Bandhanat", meaning: "Like the ripe cucumber from its bondage" },
        { tel: "మృత్యోర్ముక్షీయ మామృతాత్", eng: "Mrityor Mukshiya Mamritat", meaning: "May He liberate us from death, for immortality" },
      ],
    },
  ],
  kala_bhairava: [
    {
      id: "kb1",
      title: "Kala Bhairava Ashtakam",
      telugu: "కాల భైరవాష్టకం",
      lines: [
        { tel: "దేవరాజ సేవ్యమాన", eng: "Devaraja Sevyamana", meaning: "Worshipped by the king of gods" },
        { tel: "పవనగిరి పంకజం", eng: "Pavanagiri Pankajam", meaning: "Lotus of the sacred hill" },
        { tel: "వ్యాలయజ్ఞ సూత్రమిందు", eng: "Vyalayajna Sutramidu", meaning: "The sacred thread of serpents" },
        { tel: "శేఖరం కృపాకరం", eng: "Shekharam Krupaakaram", meaning: "Crown-adorned bestower of grace" },
        { tel: "నారదాది యోగి బృంద", eng: "Naradaadi Yogi Brunda", meaning: "Adored by Narada and all yogis" },
        { tel: "వందితం దిగంబరం", eng: "Vanditam Digambaram", meaning: "The sky-clad one who is worshipped" },
        { tel: "కాశికా పురాధి నాధ", eng: "Kashika Puraddhi Naadha", meaning: "Lord of the city of Kashi" },
        { tel: "కాలభైరవం భజే", eng: "Kalabhairavam Bhaje", meaning: "I worship Kala Bhairava" },
      ],
    },
  ],
  lalitha: [
    {
      id: "l1",
      title: "Lalitha Ashtothram",
      telugu: "లలిత అష్టోత్తరం",
      lines: [
        { tel: "ఓం ఐం హ్రీం శ్రీం", eng: "Om Aim Hrim Shrim", meaning: "Sacred seed syllables of the goddess" },
        { tel: "శ్రీమాత్రే నమః", eng: "Shrimatre Namah", meaning: "Salutations to the auspicious mother" },
        { tel: "శ్రీమహారాజ్ఞ్యై నమః", eng: "Shrimaharajnyai Namah", meaning: "Salutations to the great queen" },
        { tel: "శ్రీమత్సింహాసనేశ్వర్యై నమః", eng: "Shrimatsimhasaneshvaryai Namah", meaning: "Salutations to the ruler of the lion throne" },
      ],
    },
    {
      id: "l2",
      title: "Lalitha Pancharatnam",
      telugu: "లలిత పంచరత్నం",
      lines: [
        { tel: "ప్రాతః స్మరామి లలితావదనారవిందం", eng: "Praatah Smaraami Lalitaa Vadana Aravindam", meaning: "At dawn I meditate upon Lalita's lotus face" },
        { tel: "బింబాధరం పృథుల మౌక్తిక శోభినాసం", eng: "Bimbadharam Pruthula Mauktika Shobhinaasam", meaning: "Her lips red as bimba fruit, nose adorned with pearls" },
        { tel: "ఆకర్ణదీర్ఘనయనం మణికుండలాఢ్యం", eng: "Aakarnadeerga Nayanam Manikumdaladhyam", meaning: "Eyes stretching to ears, adorned with gem earrings" },
        { tel: "మందస్మితం మృగమదోజ్జ్వల ఫాలదేశం", eng: "Mandasmitam Mrigamadojjvala Phalaadesham", meaning: "Gentle smile, forehead bright with musk" },
      ],
    },
  ],
  hanuman: [
    {
      id: "h1",
      title: "Hanuman Chalisa",
      telugu: "హనుమాన్ చాలీసా",
      lines: [
        { tel: "శ్రీ గురు చరణ సరోజ రజ", eng: "Shri Guru Charan Saroja Raja", meaning: "The dust of the lotus feet of the Guru" },
        { tel: "నిజ మన ముకు రసుధారి", eng: "Nija Mana Mukura Sudhaari", meaning: "After cleansing the mirror of my mind" },
        { tel: "వర్ణఉం రఘువర విమల యశు", eng: "Varnaum Raghuvar Vimala Yashu", meaning: "I sing the pure glory of Rama" },
        { tel: "జో దాయక ఫల చారి", eng: "Jo Daayak Phal Chaari", meaning: "The bestower of the four fruits of life" },
      ],
    },
    {
      id: "h2",
      title: "Hanuman Mantra",
      telugu: "హనుమాన్ మంత్రం",
      lines: [
        { tel: "ఓం హనుమతే నమః", eng: "Om Hanumate Namah", meaning: "Om, salutations to Hanuman" },
        { tel: "మనోజవం మారుత తుల్య వేగం", eng: "Manojavaam Maaruta Tulya Vegam", meaning: "Swift as thought, fast as the wind" },
        { tel: "జితేంద్రియం బుద్ధిమతాం వరిష్ఠం", eng: "Jitendriyam Buddhimataam Varishtham", meaning: "Master of senses, foremost among the wise" },
        { tel: "వాతాత్మజం వానర యూధ ముఖ్యం", eng: "Vaataatmajam Vaanara Yudha Mukhyam", meaning: "Son of wind, leader of the monkey army" },
      ],
    },
  ],
  lakshmi: [
    {
      id: "lk1",
      title: "Lakshmi Ashtakam",
      telugu: "లక్ష్మీ అష్టకం",
      lines: [
        { tel: "నమస్తే స్తు మహామాయే", eng: "Namaste Stu Mahaamaaye", meaning: "Salutations to thee, great illusionist" },
        { tel: "శ్రీపీఠే సురపూజితే", eng: "Shripeethe Surapoojite", meaning: "Worshipped by the gods at the sacred abode" },
        { tel: "శంఖచక్ర గదాహస్తే", eng: "Shankhachakra Gadaahaste", meaning: "Holding conch, discus and mace in hands" },
        { tel: "మహాలక్ష్మి నమోస్తుతే", eng: "Mahaalakshmi Namostute", meaning: "Salutations to thee, Mahalakshmi" },
      ],
    },
    {
      id: "lk2",
      title: "Shri Suktam",
      telugu: "శ్రీ సూక్తం",
      lines: [
        { tel: "హిరణ్యవర్ణాం హరిణీం", eng: "Hiranya Varnaam Harineem", meaning: "Golden complexioned, deer-eyed one" },
        { tel: "సువర్ణ రజత స్రజాం", eng: "Suvarna Rajata Srajaam", meaning: "Adorned with garlands of gold and silver" },
        { tel: "చంద్రాం హిరణ్మయీం లక్ష్మీం", eng: "Chandraam Hiranmayeem Lakshmeem", meaning: "Moon-like, golden Lakshmi" },
        { tel: "జాతవేదో మ ఆవహ", eng: "Jaatavedo Ma Aavaha", meaning: "O Agni, please invoke her for me" },
      ],
    },
  ],
  ganesha: [
    {
      id: "g1",
      title: "Ganesha Pancharatnam",
      telugu: "గణేశ పంచరత్నం",
      lines: [
        { tel: "ముదాకరాత్త మోదకం", eng: "Mudaakaraatta Modakam", meaning: "Holding modaka in his hands with joy" },
        { tel: "సదా విముక్తి సాధకం", eng: "Sadaa Vimukti Saadhakam", meaning: "Always aiding in liberation" },
        { tel: "కళాధరావతంసకం", eng: "Kalaadhaaraavataamsam", meaning: "Adorned with the crescent moon" },
        { tel: "విలాసిలోక రక్షకం", eng: "Vilaasi Loka Rakshakam", meaning: "Playfully protecting all worlds" },
        { tel: "అనాయకైక నాయకం", eng: "Anaayakaika Naayakam", meaning: "The sole leader of the leaderless" },
        { tel: "వినాయకం నమామ్యహం", eng: "Vinaayakam Namaamyaham", meaning: "I bow to Vinayaka, Ganesha" },
      ],
    },
  ],
};

function countSyllables(text) {
  const vowels = text.match(/[aeiouāīūṛṝḷ]/gi);
  return Math.max(2, vowels ? vowels.length : Math.ceil(text.length / 3));
}

function getPauseDuration(engText, mode) {
  if (mode === "beginner") return 4;
  if (mode === "practice") return 1.5;
  return 2.5;
  const syllables = countSyllables(engText);
  const multiplier = mode === "beginner" ? 2.4 : mode === "practice" ? 1.1 : 1.6;
  const base = mode === "beginner" ? 2.0 : mode === "practice" ? 0.8 : 1.2;
  return Math.round((syllables * base + 1.5) * multiplier * 10) / 10;
}

function getSpeakRate(mode) {
  return mode === "beginner" ? 0.62 : mode === "practice" ? 0.92 : 0.76;
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [query, setQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [selectedMantra, setSelectedMantra] = useState(null);
  const [mode, setMode] = useState("normal");
  const [loopLine, setLoopLine] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [pauseRemaining, setPauseRemaining] = useState(0);
  const [pauseTotal, setPauseTotal] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [streak] = useState(3);
  const [volume, setVolume] = useState(0.85);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [waveActive, setWaveActive] = useState(false);

  const playingRef = useRef(false);
  const pauseIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const vs = synth.getVoices();
      const eng = vs.filter((v) => v.lang.startsWith("en"));
      setVoices(eng);
      const calm =
        eng.find((v) => /samantha|karen|moira|tessa|zira|female|woman/i.test(v.name)) ||
        eng[0];
      if (calm) setSelectedVoice(calm);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  const stopAll = useCallback(() => {
    window.speechSynthesis.cancel();
    clearInterval(pauseIntervalRef.current);
    clearTimeout(timeoutRef.current);
    playingRef.current = false;
    setIsPlaying(false);
    setPhase("idle");
    setPauseRemaining(0);
    setWaveActive(false);
  }, []);

  const runChant = useCallback(
    (lineIndex) => {
      if (!playingRef.current || !selectedMantra) return;
      const lines = selectedMantra.lines;
      if (lineIndex >= lines.length) {
        if (loopLine) {
          runChant(0);
          return;
        }
        setPhase("complete");
        setIsPlaying(false);
        setWaveActive(false);
        playingRef.current = false;
        return;
      } 
      setCurrentLine(lineIndex);
      setPhase("speaking");
      setWaveActive(true);

      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(lines[lineIndex].tel);
      utt.rate = 0.82;
      utt.itch = 0.68;
      utt.volume = volume;
      if (selectedVoice) utt.voice = selectedVoice;

      utt.onend = () => {
        if (!playingRef.current) return;
        setPhase("pause");
        setWaveActive(false);
        const pauseSecs = getPauseDuration(lines[lineIndex].tel, mode);
        setPauseTotal(pauseSecs);
        let remaining = pauseSecs;
        setPauseRemaining(Math.ceil(remaining));
        pauseIntervalRef.current = setInterval(() => {
          remaining -= 0.25;
          setPauseRemaining(Math.max(0, parseFloat(remaining.toFixed(2))));
          if (remaining <= 0) {
            clearInterval(pauseIntervalRef.current);
            if (playingRef.current) {
              if (loopLine) runChant(lineIndex);
              else runChant(lineIndex + 1);
            }
          }
        }, 250);
      };

      utt.onerror = () => {
        if (playingRef.current) runChant(lineIndex + 1);
      };

      window.speechSynthesis.speak(utt);
    },
    [selectedMantra, mode, loopLine, volume, selectedVoice]
  );

  const handlePlay = useCallback(() => {
    if (isPlaying) return;
    playingRef.current = true;
    setIsPlaying(true);
    const startLine = phase === "complete" ? 0 : currentLine;
    if (phase === "complete") {
      setCurrentLine(0);
    }
    runChant(startLine);
  }, [isPlaying, phase, currentLine, runChant]);

  const handlePause = useCallback(() => {
    stopAll();
  }, [stopAll]);

  const handleReplay = useCallback(() => {
    stopAll();
    setTimeout(() => {
      playingRef.current = true;
      setIsPlaying(true);
      runChant(currentLine);
    }, 80);
  }, [currentLine, runChant, stopAll]);

  const handlePrevLine = useCallback(() => {
    stopAll();
    setCurrentLine((c) => Math.max(0, c - 1));
    setPhase("idle");
  }, [stopAll]);

  const handleNextLine = useCallback(() => {
    stopAll();
    setCurrentLine((c) => Math.min((selectedMantra?.lines.length || 1) - 1, c + 1));
    setPhase("idle");
  }, [stopAll, selectedMantra]);

  const selectDeity = (d) => {
    stopAll();
    setSelectedDeity(d);
    setScreen("mantras");
  };

  const selectMantra = (m) => {
    stopAll();
    setSelectedMantra(m);
    setCurrentLine(0);
    setPhase("idle");
    setScreen("chant");
  };

  const toggleFav = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  const filteredDeities = DEITIES.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.telugu.includes(query)
  );

  const lines = selectedMantra?.lines || [];
  const line = lines[currentLine];
  const progressPct =
    lines.length > 0
      ? phase === "complete"
        ? 100
        : Math.round((currentLine / lines.length) * 100)
      : 0;

  const pauseProgressPct =
    pauseTotal > 0 ? Math.round(((pauseTotal - pauseRemaining) / pauseTotal) * 100) : 0;

  return (
    <div
      className="min-h-screen text-purple-100 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #080412 0%, #120820 40%, #08101e 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(100,40,200,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-0 right-0 rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(200,60,120,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 max-w-2xl mx-auto px-4 pb-20"
        style={{ minHeight: "100vh" }}
      >
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <button
            onClick={() => {
              stopAll();
              setScreen("home");
            }}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                boxShadow: "0 4px 20px rgba(140,60,220,0.4)",
              }}
            >
              🔱
            </div>
            <div className="text-left">
              <div
                className="text-lg font-semibold tracking-widest text-purple-100"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.06em" }}
              >
                Mantra Mentor
              </div>
              <div className="text-xs text-purple-400 tracking-widest opacity-60">
                Sacred Chanting Guide
              </div>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.2)",
                color: "#fbbf24",
              }}
            >
              <span>🔥</span>
              <span style={{ fontFamily: "Georgia,serif" }}>{streak} days</span>
            </div>
          </div>
        </header>

        {/* ───────────────── HOME ───────────────── */}
        {screen === "home" && (
          <div>
            <div className="text-center py-8">
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: "rgba(180,150,220,0.45)" }}
              >
                Begin your practice
              </p> 
              <h1
                className="text-4xl font-semibold mb-3 leading-tight"
                style={{ color: "#f0e6ff", fontFamily: "Georgia,serif" }}
              >
                Which deity guides
                <br />
                your heart today?
              </h1>
              <p
                className="text-base italic"
                style={{ color: "rgba(87, 16, 194, 0.55)" }}
              >
                Search or choose below
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search Shiva, Lakshmi, Hanuman…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full outline-none text-lg px-6 py-4"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(180,140,255,0.2)",
                  color: "#e8dff5",
                  fontFamily: "Georgia,serif",
                }} 
              />
              <span
                className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40"
                style={{ fontSize: 18 }}
              >
                🔍
              </span>
            </div>

            {/* Deity grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {filteredDeities.map((d) => (
                <button
                  key={d.id}
                  onClick={() => selectDeity(d)}
                  className="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(180,140,255,0.13)",
                  }}
                >
                  <div className="text-4xl mb-3">{d.icon}</div>
                  <div
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#f0e6ff", fontFamily: "Georgia,serif" }}
                  >
                    {d.name}
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "rgba(200,180,230,0.5)",
                      fontFamily: "'Noto Sans Telugu', sans-serif",
                    }}
                  >
                    {d.telugu}
                  </div>
                </button>
              ))}
            </div>

            {/* Favorites */}
            {favorites.length > 0 && (
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: "rgba(180,150,220,0.45)" }}
                >
                  ♥ Favorites
                </p>
                <div className="flex flex-col gap-2">
                  {DEITIES.flatMap((d) =>
                    (MANTRAS[d.id] || [])
                      .filter((m) => favorites.includes(m.id))
                      .map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setSelectedDeity(d);
                            selectMantra(m);
                          }}
                          className="rounded-xl px-5 py-4 text-left transition-all duration-300 hover:translate-x-1"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(180,140,255,0.12)",
                          }}
                        >
                          <span className="mr-2">{d.icon}</span>
                          <span style={{ fontFamily: "Georgia,serif", color: "#e8dff5" }}>
                            {m.title}
                          </span>
                        </button>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ───────────────── MANTRAS LIST ───────────────── */}
        {screen === "mantras" && selectedDeity && (
          <div>
            <button
              onClick={() => setScreen("home")}
              className="mb-6 px-5 py-2 rounded-full text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#c4b3e0",
              }}
            >
              ← Back
            </button>

            <div className="flex items-center gap-5 mb-8">
              <div className="text-5xl">{selectedDeity.icon}</div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: "rgba(180,150,220,0.45)" }}
                >
                  Mantras for
                </p>
                <h2
                  className="text-3xl font-semibold mb-1"
                  style={{ color: "#f0e6ff", fontFamily: "Georgia,serif" }}
                >
                  {selectedDeity.name}
                </h2>
                <div style={{ color: "rgba(200,180,230,0.5)", fontSize: 17 }}>
                  {selectedDeity.telugu}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {(MANTRAS[selectedDeity.id] || []).map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectMantra(m)}
                  className="rounded-xl px-5 py-4 text-left flex items-center justify-between transition-all duration-300 hover:translate-x-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(180,140,255,0.12)",
                  }}
                >
                  <div>
                    <div
                      className="text-base font-semibold mb-1"
                      style={{ color: "#f0e6ff", fontFamily: "Georgia,serif" }}
                    >
                      {m.title}
                    </div>
                    <div
                      className="text-sm mb-1"
                      style={{ color: "rgba(200,180,230,0.5)" }}
                    >
                      {m.telugu}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgba(180,150,220,0.35)" }}
                    >
                      {m.lines.length} lines
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleFav(m.id, e)}
                      className="text-lg transition-transform hover:scale-110"
                      style={{ color: favorites.includes(m.id) ? "#f472b6" : "rgba(180,150,220,0.4)" }}
                    >
                      {favorites.includes(m.id) ? "♥" : "♡"}
                    </button>
                    <span style={{ color: "rgba(180,150,220,0.3)", fontSize: 20 }}>›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── CHANT SCREEN ───────────────── */}
        {screen === "chant" && selectedMantra && (
          <div>
            {/* Back + fav */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  stopAll();
                  setScreen("mantras");
                }}
                className="px-5 py-2 rounded-full text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#c4b3e0",
                }}
              >
                ← Back
              </button>
              <button
                onClick={(e) => toggleFav(selectedMantra.id, e)}
                className="text-2xl transition-transform hover:scale-110"
                style={{
                  color: favorites.includes(selectedMantra.id)
                    ? "#f472b6"
                    : "rgba(180,150,220,0.4)",
                }}
              >
                {favorites.includes(selectedMantra.id) ? "♥" : "♡"}
              </button>
            </div>

            {/* Title */}
            <div className="text-center mb-7">
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: "rgba(180,150,220,0.4)" }}
              >
                {selectedDeity?.icon} {selectedDeity?.name}
              </p>
              <h2
                className="text-2xl font-semibold mb-1"
                style={{ color: "#f0e6ff", fontFamily: "Georgia,serif" }}
              >
                {selectedMantra.title}
              </h2>
              <div style={{ color: "rgba(200,180,230,0.45)", fontSize: 15 }}>
                {selectedMantra.telugu}
              </div>
            </div>

            {/* Mode tabs */}
            <div className="flex gap-2 justify-center mb-6 flex-wrap">
              {[
                { key: "beginner", label: "🐣 Beginner" },
                { key: "normal", label: "🕉 Normal" },
                { key: "practice", label: "⚡ Practice" },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => {
                    setMode(m.key);
                    stopAll();
                  }}
                  className="px-4 py-2 rounded-full text-xs transition-all"
                  style={{
                    background:
                      mode === m.key
                        ? "rgba(124,58,237,0.35)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      mode === m.key
                        ? "1px solid rgba(167,139,250,0.5)"
                        : "1px solid rgba(255,255,255,0.08)",
                    color: mode === m.key ? "#c4b8ff" : "rgba(180,150,220,0.55)",
                    fontFamily: "Georgia,serif",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span
                  className="text-xs"
                  style={{ color: "rgba(180,150,220,0.4)" }}
                >
                  Progress
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(180,150,220,0.4)", fontFamily: "Georgia,serif" }}
                >
                  {phase === "complete"
                    ? "✓ Complete"
                    : `${currentLine + 1} / ${lines.length}`}
                </span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: "linear-gradient(90deg, #7c3aed, #db2777)",
                    width: `${progressPct}%`,
                  }}
                />
              </div>
            </div>

            {/* Phase indicator */}
            {isPlaying && (
              <div className="text-center mb-5 h-10 flex items-center justify-center">
                {phase === "speaking" && (
                  <div className="flex items-center gap-3">
                    {/* waveform bars */}
                    <div className="flex gap-1 items-end h-6">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full"
                          style={{
                            background: "linear-gradient(to top, #7c3aed, #e040fb)",
                            height: waveActive
                              ? `${[60, 100, 80, 100, 60][i]}%`
                              : "30%",
                            transition: "height 0.15s ease",
                            animation: waveActive
                              ? `wavebar 0.7s ease-in-out ${i * 0.12}s infinite alternate`
                              : "none",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-sm tracking-widest"
                      style={{ color: "#c49dff", fontFamily: "Georgia,serif" }}
                    >
                      Chanting…
                    </span>
                  </div>
                )}
                {phase === "pause" && (
                  <div className="flex items-center gap-3">
                    {/* circular countdown */}
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#9c6fff"
                        strokeWidth="2.5"
                        strokeDasharray="100.5"
                        strokeDashoffset={`${100.5 - (pauseProgressPct / 100) * 100.5}`}
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                        style={{ transition: "stroke-dashoffset 0.25s linear" }}
                      />
                      <text
                        x="20"
                        y="24"
                        textAnchor="middle"
                        fill="#c49dff"
                        fontSize="10"
                        fontFamily="Georgia,serif"
                      >
                        {Math.ceil(pauseRemaining)}
                      </text>
                    </svg>
                    <span
                      className="text-sm tracking-wide"
                      style={{ color: "#c49dff", fontFamily: "Georgia,serif" }}
                    >
                      Your turn — repeat now
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Complete banner */}
            {phase === "complete" && (
              <div
                className="text-center py-5 rounded-2xl mb-6"
                style={{
                  background: "rgba(60,200,100,0.07)",
                  border: "1px solid rgba(60,200,100,0.18)",
                }}
              >
                <div className="text-3xl mb-2">🙏</div>
                <div
                  className="text-base"
                  style={{ color: "#86efac", fontFamily: "Georgia,serif" }}
                >
                  Mantra complete. Well done.
                </div>
              </div>
            )}

            {/* Mantra lines */}
            <div className="flex flex-col gap-5 mb-7">
              {lines.map((ln, i) => {
                const isActive = i === currentLine && isPlaying;
                const isDone = i < currentLine || phase === "complete";
                return (
                  <div
                    key={i}
                    className="rounded-xl px-5 py-4 transition-all duration-400"
                    style={{
                      background: isActive
                        ? "rgba(124,58,237,0.18)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(167,139,250,0.35)"
                        : "1px solid transparent",
                      opacity: isDone ? 0.4 : 1,
                      animation: isActive ? "breathe 2.8s ease-in-out infinite" : "none",
                    }}
                  >
                    <div
                      className="leading-loose mb-3 transition-all duration-300"
                      style={{
                        fontSize: isActive ? 26 : 20,
                        color: isActive ? "#f5e6ff" : "rgba(220,200,240,0.72)",
                        fontFamily: "'Noto Serif Telugu', 'Noto Sans Telugu', Georgia, serif",
                      }}
                    >
                      {ln.tel}
                    </div>
                    <div
                      className="italic transition-all duration-300 mb-1"
                      style={{
                        fontSize: isActive ? 14 : 12,
                        color: isActive ? "#c4a0e8" : "rgba(180,150,200,0.5)",
                        fontFamily: "Georgia,serif",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {ln.eng}
                    </div>
                    {isActive && (
                      <div
                        className="text-xs mt-1"
                        style={{ color: "rgba(160,130,200,0.55)", fontFamily: "Georgia,serif" }}
                      >
                        {ln.meaning}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Player panel */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(180,140,255,0.14)",
                boxShadow: isPlaying
                  ? "0 0 40px rgba(150,80,255,0.2), 0 0 80px rgba(150,80,255,0.07)"
                  : "none",
                transition: "box-shadow 0.5s ease",
              }}
            >
              {/* Controls row */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={handlePrevLine}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    color: "#c4b3e0",
                  }}
                >
                  ⏮
                </button>
                <button
                  onClick={handleReplay}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    color: "#c4b3e0",
                  }}
                >
                  🔁
                </button>

                {/* Main play/pause */}
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #db2777)",
                    boxShadow: "0 6px 25px rgba(140,60,220,0.45)",
                    border: "none",
                  }}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  onClick={handleNextLine}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    color: "#c4b3e0",
                  }}
                >
                  ⏭
                </button>
                <button
                  onClick={() => {
                    setLoopLine((l) => !l);
                    stopAll();
                  }}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
                  style={{
                    background: loopLine
                      ? "rgba(124,58,237,0.3)"
                      : "rgba(255,255,255,0.07)",
                    border: loopLine
                      ? "1px solid rgba(167,139,250,0.5)"
                      : "1px solid rgba(255,255,255,0.13)",
                    color: loopLine ? "#c4b8ff" : "#c4b3e0",
                  }}
                  title="Loop current line"
                >
                  🔂
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 rounded-full outline-none cursor-pointer"
                  style={{ accentColor: "#9c6fff" }}
                />
                <span
                  className="text-xs min-w-8 text-right"
                  style={{ color: "rgba(180,150,220,0.55)", fontFamily: "Georgia,serif" }}
                >
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Voice picker */}
              {voices.length > 1 && (
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs"
                    style={{ color: "rgba(180,150,220,0.5)" }}
                  >
                    Voice:
                  </span>
                  <select
                    value={selectedVoice?.name || ""}
                    onChange={(e) =>
                      setSelectedVoice(voices.find((v) => v.name === e.target.value))
                    }
                    className="flex-1 text-xs rounded-lg px-3 py-2 outline-none"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(180,140,255,0.2)",
                      color: "#c4b3e0",
                      fontFamily: "Georgia,serif",
                    }}
                  >
                    {voices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Mode info */}
            <p
              className="text-center text-xs mt-4 italic"
              style={{ color: "rgba(180,150,220,0.35)" }}
            >
              {mode === "beginner"
                ? "🐣 Beginner: slow chanting with generous pauses"
                : mode === "practice"
                ? "⚡ Practice: flowing pace, shorter pauses"
                : "🕉 Normal: traditional guru-student pace"}
              {loopLine ? " · 🔂 Looping current line" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes breathe { 
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.015); }
        }
        @keyframes wavebar {
          0% { height: 25%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}