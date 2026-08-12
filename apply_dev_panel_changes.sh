#!/usr/bin/env bash
set -e
# Run this from the root of your upcat-app project (where src/ lives).

mkdir -p src/data

cat > src/App.jsx << 'APPJSX_EOF'
// src/App.jsx – Full UPCAT/CET Reviewer with all features
import { useState, useEffect, useRef, useCallback } from "react";
import seedCategories from "./data/questions.json";

// ─────────────────────────────── BASE CATEGORIES (FilipiKnow + CET Mock) ───────────────────────────────
const BASE_CATEGORIES = seedCategories;

// ─────────────────────────────── THEMES (fixed for Blossom) ───────────────────────────────
const THEMES = {
  dark: {
    name: "Night Mode", icon: "🌙",
    bg: "linear-gradient(135deg,#080C18 0%,#0C1828 55%,#080C18 100%)",
    surface: "rgba(255,255,255,0.045)", surfaceBorder: "rgba(255,255,255,0.09)", surfaceHover: "rgba(255,255,255,0.07)",
    text: "#E4EAF4", textSub: "#8FA3BE", textMuted: "#445568",
    accent: "#4F8EF7", accentGrad: "linear-gradient(135deg,#4F8EF7,#9B6FF5)", accentGrad2: "linear-gradient(135deg,#9B6FF5,#F06EBA)",
    success: "#12C383", successBg: "rgba(18,195,131,0.13)", successBorder: "rgba(18,195,131,0.32)", successText: "#6EE7C0",
    danger: "#F05060", dangerBg: "rgba(240,80,96,0.13)", dangerBorder: "rgba(240,80,96,0.32)", dangerText: "#FFA5AE",
    inputBg: "rgba(255,255,255,0.055)", inputBorder: "rgba(255,255,255,0.11)", modalBg: "#0C1828",
    progressBg: "rgba(255,255,255,0.09)", headFont: "'Space Grotesk',sans-serif", bodyFont: "'Inter',system-ui,sans-serif",
    gFonts: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap",
    t1: "#4F8EF7", t2: "#C4B5FD"
  },
  girl: {
    name: "Blossom", icon: "🌸",
    bg: "linear-gradient(135deg,#FEF0F5 0%,#FCE8F0 40%,#F3E8FF 100%)",
    surface: "rgba(255,255,255,0.82)", surfaceBorder: "rgba(236,72,153,0.13)", surfaceHover: "rgba(251,207,232,0.42)",
    text: "#4A1040", textSub: "#9D4080", textMuted: "#B85C8E",
    accent: "#E8187A", accentGrad: "linear-gradient(135deg,#F472B6,#A855F7)", accentGrad2: "linear-gradient(135deg,#FB7185,#F472B6)",
    success: "#047857", successBg: "rgba(4,120,87,0.1)", successBorder: "rgba(4,120,87,0.24)", successText: "#065F46",
    danger: "#BE123C", dangerBg: "rgba(190,18,60,0.08)", dangerBorder: "rgba(190,18,60,0.2)", dangerText: "#9F1239",
    inputBg: "rgba(255,255,255,0.95)", inputBorder: "rgba(236,72,153,0.22)", modalBg: "#FFF4F9",
    progressBg: "rgba(236,72,153,0.11)", headFont: "'Playfair Display',serif", bodyFont: "'Nunito',sans-serif",
    gFonts: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap",
    t1: "#E8187A", t2: "#A855F7"
  }
};

// ─────────────────────────────── HELPERS ───────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const randomizeChoicesPreserveAnswer = (question) => {
  const originalChoices = [...question.choices];
  const correctChoice = originalChoices[question.ans];
  const shuffled = shuffleArray(originalChoices);
  const newCorrectIndex = shuffled.findIndex(ch => ch === correctChoice);
  return { ...question, choices: shuffled, ans: newCorrectIndex };
};

// Visual pattern renderer – replaces shape symbols with styled boxes
const renderQuestionText = (text, themeTextColor) => {
  const shapeMap = {
    '▲': { label: '▲', bg: '#e74c3c', color: 'white' },
    '■': { label: '■', bg: '#3498db', color: 'white' },
    '●': { label: '●', bg: '#2ecc71', color: 'white' },
    '◆': { label: '◆', bg: '#9b59b6', color: 'white' },
    '★': { label: '★', bg: '#f1c40f', color: '#333' },
    '▪': { label: '▪', bg: '#95a5a6', color: 'white' },
    '▴': { label: '▴', bg: '#e67e22', color: 'white' },
    '▾': { label: '▾', bg: '#e67e22', color: 'white' },
    '◂': { label: '◂', bg: '#1abc9c', color: 'white' },
    '▸': { label: '▸', bg: '#1abc9c', color: 'white' }
  };
  let parts = [];
  let lastIndex = 0;
  const regex = /[▲■●◆★▪▴▾◂▸]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`txt-${lastIndex}`} style={{ color: themeTextColor }}>{text.slice(lastIndex, match.index)}</span>);
    }
    const shape = match[0];
    const style = shapeMap[shape] || { label: shape, bg: '#888', color: 'white' };
    parts.push(
      <span key={`shape-${match.index}`} style={{
        display: 'inline-block', width: '1.8em', height: '1.8em', lineHeight: '1.8em',
        textAlign: 'center', background: style.bg, color: style.color,
        borderRadius: '6px', fontWeight: 'bold', margin: '0 2px', fontSize: '1.2em'
      }}>{style.label}</span>
    );
    lastIndex = match.index + 1;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={`txt-end`} style={{ color: themeTextColor }}>{text.slice(lastIndex)}</span>);
  }
  return parts.length ? parts : text;
};

// LocalStorage keys
const STORAGE = {
  USER_NAME: "upcat_user_name",
  USER_HISTORY: "upcat_user_history",
  CUSTOM_CATS: "upcat_custom_categories",
  SETTINGS: "upcat_settings",
  QUIZ_PROGRESS: "upcat_quiz_progress"
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const T = THEMES[theme];

  // User data
  const [userName, setUserName] = useState(() => localStorage.getItem(STORAGE.USER_NAME) || "Reviewee");
  const [userHistory, setUserHistory] = useState(() => {
    const saved = localStorage.getItem(STORAGE.USER_HISTORY);
    return saved ? JSON.parse(saved) : [];
  });
  const [customCategories, setCustomCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE.CUSTOM_CATS);
    return saved ? JSON.parse(saved) : {};
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE.SETTINGS);
    return saved ? JSON.parse(saved) : { randomizeChoices: false, timerMode: "off", defaultTimerSeconds: 60, studyMode: false };
  });
  const [quizProgress, setQuizProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE.QUIZ_PROGRESS);
    return saved ? JSON.parse(saved) : null;
  });

  // UI state
  const [screen, setScreen] = useState("home");
  const [selectedCats, setSelectedCats] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizHistoryDetails, setQuizHistoryDetails] = useState([]);
  const [flaggedSet, setFlaggedSet] = useState(new Set());
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Timer state
  const [timerMode, setTimerMode] = useState(settings.timerMode);
  const [timerSeconds, setTimerSeconds] = useState(settings.defaultTimerSeconds);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerIntervalRef = useRef(null);
  const totalStartTimeRef = useRef(null);

  // Study mode
  const [studyMode, setStudyMode] = useState(settings.studyMode);

  // Category & Question modals
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catForm, setCatForm] = useState({ id: "", label: "", icon: "📌", color: "#4F8EF7" });
  const [selectedCatForQuestion, setSelectedCatForQuestion] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionForm, setQuestionForm] = useState({ q: "", choices: ["", "", "", ""], ans: 0, exp: "" });

  // Dev panel (JSON import/export)
  const [devJsonInput, setDevJsonInput] = useState("");

  const allCategories = { ...BASE_CATEGORIES, ...customCategories };

  // Persistence
  useEffect(() => { localStorage.setItem(STORAGE.USER_NAME, userName); }, [userName]);
  useEffect(() => { localStorage.setItem(STORAGE.USER_HISTORY, JSON.stringify(userHistory)); }, [userHistory]);
  useEffect(() => { localStorage.setItem(STORAGE.CUSTOM_CATS, JSON.stringify(customCategories)); }, [customCategories]);
  useEffect(() => { localStorage.setItem(STORAGE.SETTINGS, JSON.stringify(settings)); }, [settings]);
  useEffect(() => {
    if (quizProgress) localStorage.setItem(STORAGE.QUIZ_PROGRESS, JSON.stringify(quizProgress));
    else localStorage.removeItem(STORAGE.QUIZ_PROGRESS);
  }, [quizProgress]);

  const showToastMsg = (msg, type = "ok") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // Timer functions
  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  const startTimer = (seconds) => {
    stopTimer();
    setTimeLeft(seconds);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          if (screen === "quiz" && !isAnswered) {
            showToastMsg("Time's up!", "err");
            const currentQ = quizQuestions[currentIndex];
            let wrongIdx = currentQ.ans === 0 ? 1 : 0;
            handleAnswer(wrongIdx);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimerForQuestion = () => {
    if (timerMode === "perQuestion" && !isAnswered) {
      startTimer(timerSeconds);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (screen !== "quiz") return;
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        if (idx < quizQuestions[currentIndex]?.choices.length && !isAnswered) {
          handleAnswer(idx);
        }
      } else if (e.key === 'Enter' && isAnswered) {
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, isAnswered, currentIndex, quizQuestions]);

  // Start quiz
  const startQuiz = (cats = selectedCats, useTimer = true) => {
    if (!cats.length) { showToastMsg("Select at least one category!", "err"); return; }
    let questions = [];
    cats.forEach(catId => {
      if (allCategories[catId]) {
        questions.push(...allCategories[catId].items.map(q => ({ ...q, catId, catLabel: allCategories[catId].label, catIcon: allCategories[catId].icon })));
      }
    });
    if (questions.length === 0) { showToastMsg("No questions in selected categories", "err"); return; }
    if (settings.randomizeChoices) {
      questions = questions.map(q => randomizeChoicesPreserveAnswer(q));
    }
    const shuffledQs = shuffleArray(questions);
    setQuizQuestions(shuffledQs);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizHistoryDetails([]);
    setFlaggedSet(new Set());
    setShowFlaggedOnly(false);
    setQuizProgress(null);
    setScreen("quiz");
    if (useTimer && timerMode !== "off") {
      if (timerMode === "perQuestion") {
        startTimer(timerSeconds);
      } else if (timerMode === "total") {
        const totalSeconds = timerSeconds * shuffledQs.length;
        startTimer(totalSeconds);
        totalStartTimeRef.current = Date.now();
      }
    } else {
      stopTimer();
      setTimeLeft(null);
    }
  };

  const resumeQuiz = () => {
    if (!quizProgress) return;
    setQuizQuestions(quizProgress.questions);
    setCurrentIndex(quizProgress.currentIndex);
    setSelectedChoice(quizProgress.selectedChoice);
    setIsAnswered(quizProgress.isAnswered);
    setQuizScore(quizProgress.score);
    setQuizHistoryDetails(quizProgress.history);
    setFlaggedSet(new Set(quizProgress.flagged || []));
    setScreen("quiz");
    if (quizProgress.timerMode && quizProgress.timerMode !== "off") {
      setTimerMode(quizProgress.timerMode);
      setTimerSeconds(quizProgress.timerSeconds);
      if (quizProgress.timeLeft) startTimer(quizProgress.timeLeft);
    }
  };

  const saveProgress = () => {
    if (screen === "quiz" && quizQuestions.length) {
      setQuizProgress({
        questions: quizQuestions,
        currentIndex,
        selectedChoice,
        isAnswered,
        score: quizScore,
        history: quizHistoryDetails,
        flagged: Array.from(flaggedSet),
        timerMode,
        timerSeconds,
        timeLeft: timeLeft
      });
      showToastMsg("Progress saved!", "ok");
    }
  };

  const handleAnswer = (choiceIdx) => {
    if (isAnswered) return;
    const q = quizQuestions[currentIndex];
    const isCorrect = choiceIdx === q.ans;
    if (!studyMode) {
      setQuizScore(quizScore + (isCorrect ? 1 : 0));
    }
    setSelectedChoice(choiceIdx);
    setIsAnswered(true);
    setQuizHistoryDetails([...quizHistoryDetails, { q, selected: choiceIdx, correct: isCorrect }]);
    if (timerMode === "perQuestion") stopTimer();
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= quizQuestions.length) {
      const total = quizQuestions.length;
      const finalScore = studyMode ? 0 : (quizScore + (isAnswered && selectedChoice === quizQuestions[currentIndex].ans ? 1 : 0));
      const percent = studyMode ? 0 : Math.round(finalScore / total * 100);
      const newRecord = {
        id: uid(),
        date: new Date().toISOString(),
        categories: selectedCats,
        totalQs: total,
        score: finalScore,
        percent,
        details: [...quizHistoryDetails, { q: quizQuestions[currentIndex], selected: selectedChoice, correct: selectedChoice === quizQuestions[currentIndex].ans }]
      };
      if (!studyMode) setUserHistory(prev => [newRecord, ...prev]);
      setQuizProgress(null);
      stopTimer();
      setScreen("results");
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoice(null);
      setIsAnswered(false);
      if (timerMode === "perQuestion") resetTimerForQuestion();
    }
  };

  const toggleFlag = () => {
    const qid = quizQuestions[currentIndex].id;
    const newSet = new Set(flaggedSet);
    if (newSet.has(qid)) newSet.delete(qid);
    else newSet.add(qid);
    setFlaggedSet(newSet);
    showToastMsg(newSet.has(qid) ? "Question flagged" : "Flag removed", "ok");
  };

  const getCategoryStats = () => {
    const stats = {};
    userHistory.forEach(rec => {
      rec.details?.forEach(detail => {
        const catId = detail.q.catId;
        if (!stats[catId]) stats[catId] = { total: 0, correct: 0 };
        stats[catId].total++;
        if (detail.correct) stats[catId].correct++;
      });
    });
    return stats;
  };

  // Category CRUD
  const openAddCategory = () => {
    setEditingCatId(null);
    setCatForm({ id: "", label: "", icon: "📌", color: "#4F8EF7" });
    setShowCatModal(true);
  };
  const openEditCategory = (catId) => {
    const cat = customCategories[catId];
    if (!cat) return;
    setEditingCatId(catId);
    setCatForm({ id: catId, label: cat.label, icon: cat.icon, color: cat.color });
    setShowCatModal(true);
  };
  const saveCategory = () => {
    if (!catForm.id || !catForm.label) { showToastMsg("Category ID and Label required", "err"); return; }
    if (!editingCatId && (BASE_CATEGORIES[catForm.id] || customCategories[catForm.id])) {
      showToastMsg("Category ID already exists", "err");
      return;
    }
    const newCat = {
      label: catForm.label,
      icon: catForm.icon || "📌",
      color: catForm.color,
      items: editingCatId ? customCategories[editingCatId].items : []
    };
    setCustomCategories(prev => ({ ...prev, [catForm.id]: newCat }));
    if (editingCatId && editingCatId !== catForm.id) {
      const { [editingCatId]: _, ...rest } = customCategories;
      setCustomCategories({ ...rest, [catForm.id]: newCat });
    }
    setShowCatModal(false);
    showToastMsg(editingCatId ? "Category updated" : "Category added", "ok");
  };
  const deleteCategory = (catId) => {
    if (window.confirm(`Delete category "${customCategories[catId].label}" and all its questions?`)) {
      const { [catId]: _, ...rest } = customCategories;
      setCustomCategories(rest);
      showToastMsg("Category deleted", "ok");
    }
  };

  const openAddQuestion = (catId) => {
    setSelectedCatForQuestion(catId);
    setEditingQuestion(null);
    setQuestionForm({ q: "", choices: ["", "", "", ""], ans: 0, exp: "" });
    setShowQuestionModal(true);
  };
  const openEditQuestion = (catId, q) => {
    setSelectedCatForQuestion(catId);
    setEditingQuestion(q);
    setQuestionForm({
      q: q.q,
      choices: [...q.choices],
      ans: q.ans,
      exp: q.exp
    });
    setShowQuestionModal(true);
  };
  const saveQuestion = () => {
    if (!questionForm.q || questionForm.choices.some(c => !c)) {
      showToastMsg("Question and all 4 choices required", "err");
      return;
    }
    const newQuestion = {
      id: editingQuestion ? editingQuestion.id : uid(),
      q: questionForm.q,
      choices: questionForm.choices,
      ans: questionForm.ans,
      exp: questionForm.exp
    };
    setCustomCategories(prev => {
      const cat = prev[selectedCatForQuestion];
      let newItems;
      if (editingQuestion) {
        newItems = cat.items.map(item => item.id === editingQuestion.id ? newQuestion : item);
      } else {
        newItems = [...cat.items, newQuestion];
      }
      return { ...prev, [selectedCatForQuestion]: { ...cat, items: newItems } };
    });
    setShowQuestionModal(false);
    showToastMsg(editingQuestion ? "Question updated" : "Question added", "ok");
  };
  const deleteQuestion = (catId, qId) => {
    if (window.confirm("Delete this question?")) {
      setCustomCategories(prev => ({
        ...prev,
        [catId]: { ...prev[catId], items: prev[catId].items.filter(q => q.id !== qId) }
      }));
      showToastMsg("Question deleted", "ok");
    }
  };

  // ─────────── Dev Panel: JSON import / export ───────────
  // Expected shape for one subject:
  // { "id": "biology", "label": "Biology", "icon": "🧬", "color": "#22C55E",
  //   "items": [ { "q": "...", "choices": ["A","B","C","D"], "ans": 0, "exp": "..." } ] }
  // Also accepts an array of subject objects for a batch import.
  const importJsonData = () => {
    let parsed;
    try {
      parsed = JSON.parse(devJsonInput);
    } catch (err) {
      showToastMsg("Invalid JSON: " + err.message, "err");
      return;
    }
    const subjects = Array.isArray(parsed) ? parsed : [parsed];
    const next = { ...customCategories };
    let addedSubjects = 0, addedQuestions = 0, skipped = 0;

    subjects.forEach(subj => {
      if (!subj || !subj.id || !subj.label || !Array.isArray(subj.items)) { skipped++; return; }
      const incomingItems = subj.items
        .filter(it => it && it.q && Array.isArray(it.choices) && it.choices.length >= 2 && typeof it.ans === "number")
        .map(it => ({ id: it.id || uid(), q: it.q, choices: it.choices, ans: it.ans, exp: it.exp || "" }));
      const existing = allCategories[subj.id]; // check seed + custom, so re-imports never lose already-saved questions
      if (existing) {
        const existingIds = new Set(existing.items.map(i => i.id));
        const newOnes = incomingItems.filter(i => !existingIds.has(i.id));
        next[subj.id] = {
          label: subj.label || existing.label,
          icon: subj.icon || existing.icon,
          color: subj.color || existing.color,
          items: [...existing.items, ...newOnes]
        };
        addedQuestions += newOnes.length;
      } else {
        next[subj.id] = { label: subj.label, icon: subj.icon || "📌", color: subj.color || "#4F8EF7", items: incomingItems };
        addedSubjects++;
        addedQuestions += incomingItems.length;
      }
    });

    if (addedQuestions === 0 && addedSubjects === 0) {
      showToastMsg(skipped ? "No valid subjects found in JSON" : "Nothing new to import", "err");
      return;
    }
    setCustomCategories(next);
    setDevJsonInput("");
    showToastMsg(`Imported ${addedQuestions} question(s), ${addedSubjects} new subject(s)`, "ok");
  };

  const handleDevFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setDevJsonInput(ev.target.result);
    reader.onerror = () => showToastMsg("Could not read file", "err");
    reader.readAsText(file);
    e.target.value = "";
  };

  const exportJsonData = () => {
    const exportObj = { ...BASE_CATEGORIES, ...customCategories };
    if (Object.keys(exportObj).length === 0) {
      showToastMsg("Nothing to export yet — import some questions first", "err");
      return;
    }
    const dataStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "questions.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToastMsg("Downloaded questions.json — replace src/data/questions.json with it", "ok");
  };

  // Styles
  const styles = {
    page: { minHeight: "100vh", background: T.bg, fontFamily: T.bodyFont, color: T.text, padding: "0 0 52px" },
    wrap: { maxWidth: 900, margin: "0 auto", padding: "24px 16px" },
    card: { background: T.surface, borderRadius: 20, padding: 24, border: `1px solid ${T.surfaceBorder}`, backdropFilter: "blur(12px)", color: T.text },
    cardSm: { background: T.surface, borderRadius: 14, padding: "13px 16px", border: `1px solid ${T.surfaceBorder}`, color: T.text },
    btn: (bg, c = T.text) => ({ cursor: "pointer", border: "none", borderRadius: 12, padding: "11px 18px", background: bg, color: c, fontWeight: 700, fontFamily: T.bodyFont, fontSize: 14, transition: "all .15s", display: "inline-flex", alignItems: "center", gap: 6 })
  };

  const filteredCategories = Object.entries(customCategories).filter(([cid, cat]) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.items.some(q => q.q.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={styles.page}>
      <style>{`
        @import url('${T.gFonts}');
        *{box-sizing:border-box;margin:0;padding:0}
        button:hover:not(:disabled){opacity:.87;transform:translateY(-1px)}
        button:active:not(:disabled){transform:scale(.97)}
        .cBtn{width:100%;text-align:left;padding:13px 17px;border-radius:14px;border:1.5px solid ${T.surfaceBorder};background:${T.surface};color:${T.text};font-size:14px;font-family:${T.bodyFont};font-weight:600;cursor:pointer;transition:all .15s;margin-bottom:8px;display:flex;align-items:flex-start;gap:12px;line-height:1.5}
        .cBtn:not(:disabled):hover{border-color:${T.accent};background:${T.surfaceHover}}
        .cBtn.correct{border-color:${T.success}!important;background:${T.successBg}!important;color:${T.successText}!important}
        .cBtn.wrong{border-color:${T.danger}!important;background:${T.dangerBg}!important;color:${T.dangerText}!important}
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fu .28s ease}
        input, select, textarea { background: ${T.inputBg}; border: 1px solid ${T.inputBorder}; color: ${T.text}; padding: 8px 12px; border-radius: 8px; }
        .modal-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: ${T.modalBg}; border-radius: 24px; padding: 24px; max-width: 500px; width: 90%; max-height: 80vh; overflow: auto; border: 1px solid ${T.surfaceBorder}; color: ${T.text}; }
      `}</style>

      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", padding: "11px 22px", borderRadius: 12, background: toast.type === "err" ? T.dangerBg : T.successBg, color: toast.type === "err" ? T.dangerText : T.successText, border: `1px solid ${toast.type === "err" ? T.dangerBorder : T.successBorder}`, fontWeight: 700, zIndex: 999, whiteSpace: "nowrap" }}>{toast.msg}</div>}

      {/* Top Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", background: T.surface, borderBottom: `1px solid ${T.surfaceBorder}` }}>
        <div style={{ fontWeight: 800, fontSize: 18, cursor: "pointer", color: T.text }} onClick={() => setScreen("home")}>📘 UPCAT Reviewer</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={styles.btn(T.surface, T.textSub)} onClick={() => setScreen("profile")}>👤 {userName}</button>
          <button style={styles.btn(T.surface, T.textSub)} onClick={() => setScreen("manage")}>✏️ Manage</button>
          <button style={styles.btn(T.surface, T.textSub)} onClick={() => setScreen("settings")}>⚙️</button>
        </div>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={styles.wrap}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 style={{ fontFamily: T.headFont, fontSize: 28, color: T.text }}>🎯 Mock Exam Ready</h1>
            <p style={{ color: T.textSub }}>Select categories → Start quiz</p>
            {quizProgress && <button style={{ ...styles.btn(T.accentGrad, "#fff"), marginTop: 10 }} onClick={resumeQuiz}>▶️ Resume previous quiz</button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
            {Object.entries(allCategories).map(([cid, cat]) => (
              <div key={cid} style={{ ...styles.cardSm, textAlign: "center", border: `2px solid ${selectedCats.includes(cid) ? cat.color : T.surfaceBorder}`, cursor: "pointer" }} onClick={() => setSelectedCats(prev => prev.includes(cid) ? prev.filter(c => c !== cid) : [...prev, cid])}>
                <div style={{ fontSize: 28 }}>{cat.icon}</div>
                <div style={{ fontWeight: 800, color: cat.color }}>{cat.label}</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{cat.items.length} items</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ ...styles.btn(T.accentGrad, "#fff"), flex: 1, padding: 14, fontSize: 16 }} onClick={() => startQuiz(selectedCats, true)}>⏱️ Start with Timer</button>
            <button style={{ ...styles.btn(T.surface, T.text), flex: 1, padding: 14, fontSize: 16 }} onClick={() => startQuiz(selectedCats, false)}>🚀 Start No Timer</button>
          </div>
          <button style={{ ...styles.btn(T.surface, T.text), width: "100%", marginTop: 10 }} onClick={() => startQuiz(Object.keys(allCategories), true)}>📚 All Categories (Timer)</button>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && quizQuestions.length > 0 && (
        <div style={styles.wrap} className="fu">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <button style={styles.btn(T.surface)} onClick={() => { saveProgress(); setScreen("home"); }}>🏠 Exit & Save</button>
            <div>
              {timeLeft !== null && <span style={{ fontWeight: 800, color: T.dangerText, marginRight: 10 }}>⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2,'0')}</span>}
              <span style={{ fontWeight: 800, color: T.accent }}>{studyMode ? "Study Mode" : `${quizScore} / ${quizHistoryDetails.length + (isAnswered ? 1 : 0)}`}</span>
              <button style={{ ...styles.btn(T.surface), marginLeft: 8 }} onClick={toggleFlag}>🚩 {flaggedSet.has(quizQuestions[currentIndex].id) ? "Unflag" : "Flag"}</button>
            </div>
          </div>
          <div style={{ height: 6, background: T.progressBg, borderRadius: 3, marginBottom: 14 }}>
            <div style={{ height: "100%", width: `${(currentIndex + (isAnswered ? 1 : 0)) / quizQuestions.length * 100}%`, background: T.accentGrad, borderRadius: 3 }} />
          </div>
          <p style={{ textAlign: "center", marginBottom: 12, color: T.textSub }}>Q{currentIndex + 1} / {quizQuestions.length}</p>
          <div style={styles.card}>
            <p style={{ fontWeight: 800, fontSize: 16 }}>{renderQuestionText(quizQuestions[currentIndex].q, T.text)}</p>
          </div>
          {quizQuestions[currentIndex].choices.map((ch, idx) => {
            let cls = "cBtn";
            if (isAnswered) {
              if (idx === quizQuestions[currentIndex].ans) cls += " correct";
              else if (idx === selectedChoice) cls += " wrong";
            }
            return (
              <button key={idx} className={cls} disabled={isAnswered} onClick={() => handleAnswer(idx)}>
                <span>{String.fromCharCode(65 + idx)}. {ch}</span>
              </button>
            );
          })}
          {isAnswered && (
            <div className="fu" style={{ ...styles.card, background: selectedChoice === quizQuestions[currentIndex].ans ? T.successBg : T.dangerBg, marginTop: 12 }}>
              <p style={{ fontWeight: 800, color: selectedChoice === quizQuestions[currentIndex].ans ? T.successText : T.dangerText }}>{selectedChoice === quizQuestions[currentIndex].ans ? "✅ Correct!" : "❌ Wrong!"}</p>
              <p style={{ fontSize: 13, color: T.text }}>{quizQuestions[currentIndex].exp}</p>
            </div>
          )}
          {isAnswered && <button style={{ ...styles.btn(T.accentGrad, "#fff"), width: "100%", marginTop: 16 }} onClick={nextQuestion}>{currentIndex + 1 === quizQuestions.length ? "Finish" : "Next →"}</button>}
        </div>
      )}

      {/* RESULTS */}
      {screen === "results" && (
        <div style={styles.wrap} className="fu">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ color: T.text }}>🎉 Results</h2>
            {!studyMode && <div style={{ fontSize: 48, fontWeight: 800, color: T.accent }}>{Math.round((quizScore + (isAnswered && selectedChoice === quizQuestions[currentIndex]?.ans ? 1 : 0)) / quizQuestions.length * 100)}%</div>}
            <p style={{ color: T.textSub }}>{studyMode ? "Study mode completed" : `${quizScore + (isAnswered && selectedChoice === quizQuestions[currentIndex]?.ans ? 1 : 0)} / ${quizQuestions.length} correct`}</p>
            {flaggedSet.size > 0 && (
              <button style={{ ...styles.btn(T.accent, "#fff"), marginTop: 10 }} onClick={() => setShowFlaggedOnly(!showFlaggedOnly)}>
                {showFlaggedOnly ? "Show All" : `Review Flagged (${flaggedSet.size})`}
              </button>
            )}
          </div>
          {(showFlaggedOnly ? quizHistoryDetails.filter(d => flaggedSet.has(d.q.id)) : quizHistoryDetails).filter(d => !d.correct).map((detail, idx) => (
            <div key={idx} style={{ ...styles.cardSm, marginTop: 12 }}>
              <p><strong>{detail.q.q}</strong></p>
              <p style={{ color: T.dangerText }}>Your answer: {detail.q.choices[detail.selected]}</p>
              <p style={{ color: T.successText }}>Correct: {detail.q.choices[detail.q.ans]}</p>
              <p style={{ fontSize: 12 }}>{detail.q.exp}</p>
            </div>
          ))}
          <button style={{ ...styles.btn(T.accentGrad, "#fff"), width: "100%", marginTop: 20 }} onClick={() => setScreen("home")}>🏠 Back to Home</button>
        </div>
      )}

      {/* PROFILE / ANALYTICS */}
      {screen === "profile" && (
        <div style={styles.wrap}>
          <h2 style={{ marginBottom: 16, color: T.text }}>👤 Profile</h2>
          <input style={{ ...styles.cardSm, width: "100%", marginBottom: 20 }} value={userName} onChange={e => setUserName(e.target.value)} placeholder="Your Name" />
          <h3 style={{ color: T.text }}>📊 Performance Analytics</h3>
          {userHistory.length === 0 && <p style={{ color: T.textMuted }}>No quizzes taken yet.</p>}
          {userHistory.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p>Total quizzes: {userHistory.length}</p>
              <p>Best score: {Math.max(...userHistory.map(h => h.percent))}%</p>
              <p>Average score: {Math.round(userHistory.reduce((a,b)=>a+b.percent,0)/userHistory.length)}%</p>
              <div style={{ marginTop: 16 }}>
                <h4>Accuracy by category</h4>
                {Object.entries(getCategoryStats()).map(([catId, stat]) => {
                  const cat = allCategories[catId];
                  if (!cat) return null;
                  const pct = Math.round((stat.correct / stat.total) * 100);
                  return (
                    <div key={catId} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{cat.icon} {cat.label}</span>
                        <span>{pct}%</span>
                      </div>
                      <div style={{ height: 6, background: T.progressBg, borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: cat.color, borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <button style={{ ...styles.btn(T.surface), marginTop: 16 }} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* SETTINGS */}
      {screen === "settings" && (
        <div style={styles.wrap}>
          <h2 style={{ color: T.text }}>⚙️ Settings</h2>
          <div style={{ marginTop: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <input type="checkbox" checked={settings.randomizeChoices} onChange={e => setSettings({ ...settings, randomizeChoices: e.target.checked })} />
              Randomize answer order
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <input type="checkbox" checked={studyMode} onChange={e => { setStudyMode(e.target.checked); setSettings({ ...settings, studyMode: e.target.checked }); }} />
              Study Mode (no score, instant feedback)
            </label>
            <div style={{ marginBottom: 12 }}>
              <label>Timer Mode: </label>
              <select value={timerMode} onChange={e => { setTimerMode(e.target.value); setSettings({ ...settings, timerMode: e.target.value }); }}>
                <option value="off">No timer</option>
                <option value="perQuestion">Per question</option>
                <option value="total">Total exam</option>
              </select>
            </div>
            {timerMode !== "off" && (
              <div>
                <label>Seconds per question / total seconds per question: </label>
                <input type="number" min="5" value={timerSeconds} onChange={e => { setTimerSeconds(parseInt(e.target.value)); setSettings({ ...settings, defaultTimerSeconds: parseInt(e.target.value) }); }} style={{ width: 80 }} />
              </div>
            )}
          </div>
          <div style={{ marginTop: 24 }}>
            <p style={{ color: T.text }}>Themes:</p>
            {Object.entries(THEMES).map(([k, th]) => (
              <button key={k} style={{ ...styles.btn(theme === k ? T.accentGrad : T.surface), marginRight: 8 }} onClick={() => setTheme(k)}>{th.icon} {th.name}</button>
            ))}
          </div>

          {/* DEV PANEL */}
          <div style={{ ...styles.card, marginTop: 24, textAlign: "left" }}>
            <h3 style={{ color: T.text }}>🛠️ Developer Panel</h3>
            <p style={{ fontSize: 12, color: T.textSub, margin: "6px 0 14px" }}>
              Import questions by subject using JSON. Each subject needs an id, label, and items[]. After importing, use Export to download the file and drop it into <code>src/data/questions.json</code> so it's saved when you push to GitHub.
            </p>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: T.textSub }}>Upload a .json file</label><br />
              <input type="file" accept=".json,application/json" onChange={handleDevFileUpload} />
            </div>
            <textarea
              rows={8}
              style={{ width: "100%", fontFamily: "monospace", fontSize: 12 }}
              placeholder={'{\n  "id": "biology",\n  "label": "Biology",\n  "icon": "🧬",\n  "color": "#22C55E",\n  "items": [\n    { "q": "Question text", "choices": ["A","B","C","D"], "ans": 0, "exp": "Explanation" }\n  ]\n}'}
              value={devJsonInput}
              onChange={e => setDevJsonInput(e.target.value)}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              <button style={styles.btn(T.accentGrad, "#fff")} onClick={importJsonData}>📥 Import JSON</button>
              <button style={styles.btn(T.surface)} onClick={exportJsonData}>⬇️ Export All to File</button>
            </div>
          </div>

          <button style={{ ...styles.btn(T.surface), marginTop: 24 }} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* MANAGE */}
      {screen === "manage" && (
        <div style={styles.wrap}>
          <h2 style={{ color: T.text }}>✏️ Manage Custom Categories</h2>
          <input type="text" placeholder="Search categories or questions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ width: "100%", marginBottom: 16 }} />
          <button style={{ ...styles.btn(T.accentGrad, "#fff"), marginBottom: 16 }} onClick={openAddCategory}>+ Add New Category</button>
          {filteredCategories.map(([cid, cat]) => (
            <div key={cid} style={{ ...styles.card, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ color: cat.color }}>{cat.icon} {cat.label}</h3>
                <div>
                  <button style={{ ...styles.btn(T.surface), marginRight: 8 }} onClick={() => openEditCategory(cid)}>✏️ Edit</button>
                  <button style={{ ...styles.btn(T.dangerBg, T.dangerText) }} onClick={() => deleteCategory(cid)}>🗑️ Delete</button>
                </div>
              </div>
              <button style={{ ...styles.btn(T.surface, T.text), fontSize: 12, marginTop: 8 }} onClick={() => openAddQuestion(cid)}>+ Add Question</button>
              {cat.items.filter(q => q.q.toLowerCase().includes(searchTerm.toLowerCase())).map(q => (
                <div key={q.id} style={{ ...styles.cardSm, marginTop: 10, background: T.surfaceHover }}>
                  <p style={{ color: T.text }}><strong>{q.q}</strong></p>
                  <button style={{ fontSize: 12, marginRight: 8 }} onClick={() => openEditQuestion(cid, q)}>Edit</button>
                  <button style={{ fontSize: 12, color: T.dangerText }} onClick={() => deleteQuestion(cid, q.id)}>Delete</button>
                </div>
              ))}
            </div>
          ))}
          <button style={{ ...styles.btn(T.surface) }} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* MODALS */}
      {showCatModal && (
        <div className="modal-overlay" onClick={() => setShowCatModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingCatId ? "Edit Category" : "New Category"}</h3>
            <div style={{ marginBottom: 12 }}>
              <label>Category ID (unique, no spaces)</label>
              <input type="text" value={catForm.id} onChange={e => setCatForm({ ...catForm, id: e.target.value })} disabled={!!editingCatId} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Label</label>
              <input type="text" value={catForm.label} onChange={e => setCatForm({ ...catForm, label: e.target.value })} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Icon (emoji)</label>
              <input type="text" value={catForm.icon} onChange={e => setCatForm({ ...catForm, icon: e.target.value })} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Color</label>
              <input type="color" value={catForm.color} onChange={e => setCatForm({ ...catForm, color: e.target.value })} style={{ width: "100%" }} />
              <div style={{ background: catForm.color, height: 30, borderRadius: 8, marginTop: 8 }} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button style={styles.btn(T.surface)} onClick={() => setShowCatModal(false)}>Cancel</button>
              <button style={styles.btn(T.accentGrad, "#fff")} onClick={saveCategory}>Save</button>
            </div>
          </div>
        </div>
      )}
      {showQuestionModal && (
        <div className="modal-overlay" onClick={() => setShowQuestionModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <h3>{editingQuestion ? "Edit Question" : "New Question"}</h3>
            <div style={{ marginBottom: 12 }}>
              <label>Question</label>
              <textarea value={questionForm.q} onChange={e => setQuestionForm({ ...questionForm, q: e.target.value })} rows={2} style={{ width: "100%" }} />
            </div>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ marginBottom: 8 }}>
                <label>Choice {String.fromCharCode(65 + i)}</label>
                <input type="text" value={questionForm.choices[i]} onChange={e => {
                  const newChoices = [...questionForm.choices];
                  newChoices[i] = e.target.value;
                  setQuestionForm({ ...questionForm, choices: newChoices });
                }} style={{ width: "100%" }} />
              </div>
            ))}
            <div style={{ marginBottom: 12 }}>
              <label>Correct Answer Index (0-3)</label>
              <input type="number" min="0" max="3" value={questionForm.ans} onChange={e => setQuestionForm({ ...questionForm, ans: parseInt(e.target.value) })} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Explanation</label>
              <textarea value={questionForm.exp} onChange={e => setQuestionForm({ ...questionForm, exp: e.target.value })} rows={2} style={{ width: "100%" }} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button style={styles.btn(T.surface)} onClick={() => setShowQuestionModal(false)}>Cancel</button>
              <button style={styles.btn(T.accentGrad, "#fff")} onClick={saveQuestion}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
APPJSX_EOF

cat > src/data/questions.json << 'QUESTIONSJSON_EOF'
{}
QUESTIONSJSON_EOF

echo "Done. All old questions/subjects removed. src/data/questions.json is now the empty seed file. Dev Panel added under Settings > scroll down."
