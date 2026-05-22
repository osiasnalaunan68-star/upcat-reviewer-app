// src/App.jsx – Full UPCAT/CET Reviewer with all features
import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────── BASE CATEGORIES (FilipiKnow + CET Mock) ───────────────────────────────
const BASE_CATEGORIES = {
  language: {
    label: "Language Proficiency", icon: "📝", color: "#3B82F6",
    items: [
      { id: "lang1", q: 'May I please request that each of the two groups take an ___ position in the issue now.', choices: ['alternating', 'alternative', 'alternate', 'all of the above'], ans: 2, exp: 'Alternate means taking turns or to do by turns.' },
      { id: "lang2", q: '___ mountains aplenty in the Philippines.', choices: ['There is', 'There are', 'There were', 'There was'], ans: 1, exp: '"Mountains" is plural, so "There are" is correct.' },
      { id: "lang3", q: 'The student badly needs her teacher\'s ___.', choices: ['advice', 'advise', 'advising', 'advisory'], ans: 0, exp: '"Advice" is a noun. "Advise" is a verb.' },
      { id: "lang4", q: 'Choose the correct and effective sentence.', choices: ['She only walked fifteen miles when her legs gave out.', 'She had only walked for about fifteen miles when her legs gave out.', 'She has walked only fifteen miles when her legs gave out.', 'She had walked only fifteen miles when her legs gave out.'], ans: 3, exp: 'Past perfect (had walked) is correct since the action was completed before another past event.' },
      { id: "lang5", q: 'A thousand pesos ___ not enough compensation and you ___ it.', choices: ['are – knows', 'are – know', 'is – know', 'is – knows'], ans: 2, exp: '"A thousand pesos" is treated as a singular sum, so "is" is correct. "You" takes "know".' },
      { id: "lang6", q: 'If we ___ harder we would have passed the UPCAT.', choices: ['study', 'had studied', 'studied', 'have studied'], ans: 1, exp: 'Third conditional: If + past perfect → would have + past participle.' },
      { id: "lang7", q: 'Amicable means the same as –', choices: ['friendly', 'anxious', 'jealous', 'patient'], ans: 0, exp: 'Amicable means characterized by friendliness and goodwill.' },
      { id: "lang8", q: '___ are you deserting me ___ you are also taking our supplies.', choices: ['neither—nor', 'not only—but', 'both—and', 'either—or'], ans: 1, exp: '"Not only...but" connects two related ideas.' },
      { id: "lang9", q: 'Lolita is going to Switzerland ___ May next year. She would be leaving ___ eight o\'clock ___ New Year\'s Day.', choices: ['in – on – on', 'at – on – at', 'in – at – in', 'in – at – on'], ans: 3, exp: '"In" for months, "at" for specific times, "on" for specific days/holidays.' },
      { id: "lang10", q: 'Choose the correct and effective sentence.', choices: ['Father jogs exuberantly to the park every morning before breakfast to exercise his heart.', 'Father exuberantly jogs every morning to the park to exercise his heart before breakfast.', 'Father, to exercise his heart, jogs exuberantly every morning before breakfast to the park.', 'Father jogs exuberantly every morning before breakfast to the park to exercise his heart.'], ans: 3, exp: 'Adverbs and phrases placed in logical order.' },
      { id: "lang11", q: 'She ___ finished the project before tomorrow.', choices: ['None of the above', 'would have', 'will have', 'should have'], ans: 2, exp: '"Will have finished" is future perfect.' },
      { id: "lang12", q: 'Veronica left the room, turned right, and, without any hesitation, walked outside.', choices: ['Leaving the room, turning right, Veronica walking outside without any hesitation.', 'Veronica left the room and she turned right and walked outside without any hesitation.', 'Veronica left the room turned right and walked outside without any hesitation.', 'Correct as is'], ans: 3, exp: 'Original uses correct parallel structure.' },
      { id: "lang13", q: 'There are extra chairs in that room that are not needed or necessary.', choices: ['There are extra chairs in that room.', 'There are extra and unnecessary chairs in that room.', 'The extra chairs in that room are not needed or necessary.', 'Correct as is'], ans: 0, exp: 'Redundancy removed.' },
      { id: "lang14", q: 'Some tortoises living up to 100 years are among the world\'s oldest animals.', choices: ['The world\'s oldest animals, some living up to 100 years are some tortoises.', 'Some tortoises, among the world\'s oldest animals, are living up to 100 years.', 'Living up to 100 years, some tortoises are among the world\'s oldest animals.', 'Correct as is'], ans: 2, exp: 'Participial phrase next to subject.' }
    ]
  },
  science: {
    label: "Science", icon: "🔬", color: "#10B981",
    items: [
      { id: "sci1", q: 'All of the following are solutions EXCEPT _____.', choices: ['Brass', 'Coffee', 'Seawater', 'Milk'], ans: 3, exp: 'Milk is a colloid.' },
      { id: "sci2", q: 'Why can\'t a person with type B blood donate to a person with type A blood?', choices: ['The recipient has antibodies against B blood (B antigens), resulting in clotting.', 'The recipient has B surface antigens recognized by donor antibodies, causing rejection.', 'Both A and B are true.', 'None of the above are true.'], ans: 0, exp: 'Type A has anti-B antibodies.' },
      { id: "sci3", q: 'How many moles of CO₂ does 88 grams of Carbon Dioxide contain?', choices: ['2', '3', '4', '5'], ans: 0, exp: '44 g/mol → 88/44 = 2.' },
      { id: "sci4", q: 'Rocks on the moon are not being weathered. Which of the following is the reason for this?', choices: ['There is no atmosphere on the moon.', 'There is no water on the moon.', 'There is no volcano on the moon.', 'The gravity on the moon is very small.'], ans: 0, exp: 'No atmosphere means no weathering.' }
    ]
  },
  math: {
    label: "Mathematics", icon: "🔢", color: "#F59E0B",
    items: [
      { id: "math1", q: 'A diver descends 80 ft, ascends 25 ft, descends 12 ft, then ascends 52 ft. Where is the diver\'s rest stop relative to sea level?', choices: ['-15 feet', '-5 feet', '+15 feet', '+5 feet'], ans: 0, exp: '-80+25-12+52 = -15' },
      { id: "math2", q: '35% of 15% of a number equals what percentage of the number?', choices: ['5.25%', '5.5%', '4.25%', '3.75%'], ans: 0, exp: '0.35×0.15 = 0.0525 = 5.25%' },
      { id: "math3", q: 'A rectangular field is 125m × 200m. What is its perimeter?', choices: ['325 m', '500 m', '650 m', '700 m'], ans: 2, exp: '2(125+200)=650' }
    ]
  },
  reading: {
    label: "Reading Comprehension", icon: "📖", color: "#8B5CF6",
    items: [
      { id: "read1", q: '(The Challenge) "This series of choreographed moves performed to music required a couple of qualities." How can the underlined words be better written?', choices: ['some abilities she had to develop', 'specific physical qualities', 'special moves', 'great strength and control'], ans: 3, exp: 'Specific detail.' }
    ]
  },
  cet_math: {
    label: "CET Math", icon: "🧮", color: "#F97316",
    items: [
      { id: "cet_m1", q: "15 + 6 ÷ 3", choices: ["7", "17", "21", "9"], ans: 1, exp: "6÷3=2 → 15+2=17" },
      { id: "cet_m2", q: "Solve: x + 5 = 12", choices: ["5", "6", "7", "8"], ans: 2, exp: "x=7" },
      { id: "cet_m3", q: "20% of 50", choices: ["5", "10", "15", "20"], ans: 1, exp: "0.2×50=10" },
      { id: "cet_m4", q: "Ratio 2:3 total 25", choices: ["10", "15", "20", "12"], ans: 1, exp: "3/5×25=15" },
      { id: "cet_m5", q: "3x = 27", choices: ["7", "8", "9", "10"], ans: 2, exp: "x=9" },
      { id: "cet_m6", q: "5²", choices: ["10", "20", "25", "30"], ans: 2, exp: "5×5=25" },
      { id: "cet_m7", q: "12 km in 3 hrs speed", choices: ["3 km/h", "4 km/h", "6 km/h", "9 km/h"], ans: 1, exp: "12/3=4 km/h" },
      { id: "cet_m8", q: "1/2 + 1/4", choices: ["1/6", "1/3", "3/4", "2/4"], ans: 2, exp: "2/4+1/4=3/4" },
      { id: "cet_m9", q: "100 - 45", choices: ["45", "55", "65", "75"], ans: 1, exp: "55" },
      { id: "cet_m10", q: "8 × 7", choices: ["48", "56", "64", "72"], ans: 1, exp: "56" },
      { id: "cet_m11", q: "Square root of 144", choices: ["10", "11", "12", "13"], ans: 2, exp: "12²=144" },
      { id: "cet_m12", q: "3x + 2 = 11", choices: ["2", "3", "4", "5"], ans: 1, exp: "3x=9 → x=3" },
      { id: "cet_m13", q: "Perimeter of square side 6", choices: ["24", "36", "12", "18"], ans: 0, exp: "4×6=24" },
      { id: "cet_m14", q: "Area of triangle (base 10, height 4)", choices: ["20", "40", "14", "24"], ans: 0, exp: "½×10×4=20" },
      { id: "cet_m15", q: "2/5 of 50", choices: ["10", "15", "20", "25"], ans: 2, exp: "50×2/5=20" },
      { id: "cet_m16", q: "9 + 9 ÷ 3", choices: ["6", "9", "12", "15"], ans: 2, exp: "9÷3=3 → 9+3=12" },
      { id: "cet_m17", q: "50% of 80", choices: ["30", "40", "50", "60"], ans: 1, exp: "80×0.5=40" },
      { id: "cet_m18", q: "7 × 6 - 10", choices: ["32", "42", "52", "27"], ans: 0, exp: "42-10=32" },
      { id: "cet_m19", q: "x - 4 = 9", choices: ["5", "9", "13", "17"], ans: 2, exp: "x=13" },
      { id: "cet_m20", q: "15 ÷ 5 + 2", choices: ["3", "5", "7", "9"], ans: 1, exp: "3+2=5" },
      { id: "cet_m21", q: "10²", choices: ["10", "20", "100", "200"], ans: 2, exp: "10×10=100" },
      { id: "cet_m22", q: "3/4 of 80", choices: ["40", "60", "80", "100"], ans: 1, exp: "80×3/4=60" },
      { id: "cet_m23", q: "25% of 200", choices: ["25", "50", "75", "100"], ans: 1, exp: "200×0.25=50" },
      { id: "cet_m24", q: "18 ÷ 3", choices: ["4", "5", "6", "7"], ans: 2, exp: "6" },
      { id: "cet_m25", q: "6 × 6", choices: ["30", "36", "42", "48"], ans: 1, exp: "36" }
    ]
  },
  cet_english: {
    label: "CET English", icon: "📚", color: "#3B82F6",
    items: [
      { id: "cet_e1", q: "She ___ going home.", choices: ["is", "are", "am", "be"], ans: 0, exp: "She is" },
      { id: "cet_e2", q: "Correct past tense of go", choices: ["goed", "went", "gone", "going"], ans: 1, exp: "went" },
      { id: "cet_e3", q: "Synonym of big", choices: ["small", "large", "tiny", "narrow"], ans: 1, exp: "large" },
      { id: "cet_e4", q: "Antonym of hot", choices: ["warm", "cold", "heat", "cool"], ans: 1, exp: "cold" },
      { id: "cet_e5", q: "He ___ a book.", choices: ["read", "reads", "reading", "have read"], ans: 1, exp: "reads" },
      { id: "cet_e6", q: "Plural of child", choices: ["childs", "childes", "children", "childeren"], ans: 2, exp: "children" },
      { id: "cet_e7", q: "Correct: 'I ___ a student'", choices: ["is", "am", "are", "be"], ans: 1, exp: "I am" },
      { id: "cet_e8", q: "Fast synonym", choices: ["quick", "slow", "rapid", "A and C"], ans: 3, exp: "quick/rapid" },
      { id: "cet_e9", q: "Eat past tense", choices: ["eated", "ate", "eaten", "eating"], ans: 1, exp: "ate" },
      { id: "cet_e10", q: "He ___ happy yesterday", choices: ["is", "am", "were", "was"], ans: 3, exp: "was" },
      { id: "cet_e11", q: "Correct spelling", choices: ["beautiful", "beautifull", "beutiful", "beautyful"], ans: 0, exp: "beautiful" },
      { id: "cet_e12", q: "Opposite of good", choices: ["nice", "bad", "great", "fine"], ans: 1, exp: "bad" },
      { id: "cet_e13", q: "She ___ running", choices: ["is", "am", "are", "be"], ans: 0, exp: "is" },
      { id: "cet_e14", q: "Many ___ students", choices: ["is", "am", "are", "be"], ans: 2, exp: "are" },
      { id: "cet_e15", q: "Correct article: ___ apple", choices: ["a", "an", "the", "none"], ans: 1, exp: "an apple" },
      { id: "cet_e16", q: "He ___ tired", choices: ["is", "am", "are", "be"], ans: 0, exp: "is" },
      { id: "cet_e17", q: "Synonym of smart", choices: ["dull", "intelligent", "slow", "ignorant"], ans: 1, exp: "intelligent" },
      { id: "cet_e18", q: "They ___ here", choices: ["is", "am", "are", "be"], ans: 2, exp: "are" },
      { id: "cet_e19", q: "Past of see", choices: ["seed", "saw", "seen", "sees"], ans: 1, exp: "saw" },
      { id: "cet_e20", q: "He ___ football", choices: ["play", "plays", "playing", "have play"], ans: 1, exp: "plays" },
      { id: "cet_e21", q: "Opposite of big", choices: ["large", "huge", "small", "tall"], ans: 2, exp: "small" },
      { id: "cet_e22", q: "Correct: I ___ a car", choices: ["has", "have", "is", "am"], ans: 1, exp: "have" },
      { id: "cet_e23", q: "She ___ teacher", choices: ["is", "am", "are", "be"], ans: 0, exp: "is" },
      { id: "cet_e24", q: "They ___ happy", choices: ["is", "am", "are", "be"], ans: 2, exp: "are" },
      { id: "cet_e25", q: "Opposite of fast", choices: ["quick", "rapid", "slow", "swift"], ans: 2, exp: "slow" }
    ]
  },
  cet_logic: {
    label: "CET Logic", icon: "🧠", color: "#A855F7",
    items: [
      { id: "cet_l1", q: "All dogs are animals. Some animals are pets. Dogs are pets?", choices: ["Yes", "No", "Cannot be certain", "None"], ans: 2, exp: "Dogs may not be pets." },
      { id: "cet_l2", q: "2,4,6,8 ___", choices: ["9", "10", "11", "12"], ans: 1, exp: "Add 2" },
      { id: "cet_l3", q: "3,6,12,24 ___", choices: ["36", "42", "48", "54"], ans: 2, exp: "Double each" },
      { id: "cet_l4", q: "Odd one: 2,3,5,9", choices: ["2", "3", "5", "9"], ans: 3, exp: "9 is not prime" },
      { id: "cet_l5", q: "Boy > Girl > Baby youngest", choices: ["Boy", "Girl", "Baby", "Cannot tell"], ans: 2, exp: "Baby is youngest" },
      { id: "cet_l6", q: "If A=B and B=C", choices: ["A=C", "A≠C", "B≠C", "none"], ans: 0, exp: "Transitive" },
      { id: "cet_l7", q: "North → right is", choices: ["East", "West", "South", "North"], ans: 0, exp: "Turn right from North = East" },
      { id: "cet_l8", q: "Alphabet: A,C,E ___", choices: ["F", "G", "H", "I"], ans: 1, exp: "Skip one letter" },
      { id: "cet_l9", q: "Cat : Kitten :: Dog :", choices: ["Puppy", "Cub", "Foal", "Calf"], ans: 0, exp: "Young dog = puppy" },
      { id: "cet_l10", q: "10,20,30 ___", choices: ["35", "40", "45", "50"], ans: 1, exp: "+10" },
      { id: "cet_l11", q: "5,10,20 ___", choices: ["25", "30", "35", "40"], ans: 3, exp: "Double" },
      { id: "cet_l12", q: "If rain → wet", choices: ["rain causes wet", "wet causes rain", "no relation", "opposite"], ans: 0, exp: "Rain leads to wet" },
      { id: "cet_l13", q: "1,4,9,16 ___", choices: ["20", "25", "30", "36"], ans: 1, exp: "Squares" },
      { id: "cet_l14", q: "Always true: all A are B", choices: ["A subset of B", "B subset of A", "A=B", "none"], ans: 0, exp: "A inside B" },
      { id: "cet_l15", q: "Some cats are black", choices: ["true", "false", "possible", "certain"], ans: 2, exp: "Possible but not certain" },
      { id: "cet_l16", q: "100 → 90 → 80 ___", choices: ["60", "70", "80", "90"], ans: 1, exp: "-10" },
      { id: "cet_l17", q: "Syllogism: all X are Y", choices: ["X inside Y", "Y inside X", "X=Y", "none"], ans: 0, exp: "X is subset of Y" },
      { id: "cet_l18", q: "7,14,21 ___", choices: ["24", "25", "28", "30"], ans: 2, exp: "+7" },
      { id: "cet_l19", q: "If all birds fly (assume true)", choices: ["then sparrows fly", "then penguins fly", "false", "unknown"], ans: 0, exp: "All includes sparrows" },
      { id: "cet_l20", q: "1,3,5,7 ___", choices: ["8", "9", "10", "11"], ans: 1, exp: "Odd numbers" },
      { id: "cet_l21", q: "Bigger than logic chain", choices: ["compare values", "always true", "always false", "depends"], ans: 0, exp: "Must compare" },
      { id: "cet_l22", q: "True/false reasoning", choices: ["depends on statement", "always true", "always false", "none"], ans: 0, exp: "Context matters" },
      { id: "cet_l23", q: "Pattern recognition", choices: ["rule-based", "random", "guess", "none"], ans: 0, exp: "Find rule" },
      { id: "cet_l24", q: "All squares are rectangles", choices: ["True", "False", "Maybe", "None"], ans: 0, exp: "Square is a rectangle" },
      { id: "cet_l25", q: "If today is Monday, tomorrow is", choices: ["Sunday", "Tuesday", "Wednesday", "Friday"], ans: 1, exp: "Tuesday" }
    ]
  },
  cet_abstract: {
    label: "CET Abstract", icon: "🔷", color: "#06B6D4",
    items: [
      { id: "cet_a1", q: "A, C, E ___", choices: ["F", "G", "H", "I"], ans: 1, exp: "Skip one letter" },
      { id: "cet_a2", q: "1,3,6,10 ___", choices: ["12", "13", "14", "15"], ans: 3, exp: "Add +2,+3,+4,+5" },
      { id: "cet_a3", q: "▲ ■ ▲ ■ ___", choices: ["▲", "■", "●", "★"], ans: 0, exp: "Alternate shape" },
      { id: "cet_a4", q: "Circle → Square → Circle → ___", choices: ["Circle", "Square", "Triangle", "Hexagon"], ans: 1, exp: "Alternate pattern" },
      { id: "cet_a5", q: "2,5,8,11 ___", choices: ["12", "13", "14", "15"], ans: 2, exp: "+3" },
      { id: "cet_a6", q: "▲▲▲ → ▲▲ ___", choices: ["▲", "▲▲", "▲▲▲", "none"], ans: 0, exp: "Decrease by one" },
      { id: "cet_a7", q: "4,8,16 ___", choices: ["20", "24", "32", "40"], ans: 2, exp: "Double" },
      { id: "cet_a8", q: "A,B,D,G ___", choices: ["H", "I", "J", "K"], ans: 3, exp: "+1,+2,+3,+4" },
      { id: "cet_a9", q: "Rotation 90° clockwise", choices: ["next orientation", "same", "flip", "none"], ans: 0, exp: "Rotated shape" },
      { id: "cet_a10", q: "Dot increase +1", choices: ["next step has +1 dot", "same", "decrease", "none"], ans: 0, exp: "Pattern growing" },
      { id: "cet_a11", q: "Shape mirror", choices: ["flipped image", "rotated", "enlarged", "same"], ans: 0, exp: "Mirror effect" },
      { id: "cet_a12", q: "Line symmetry", choices: ["mirrored shape", "original", "different", "none"], ans: 0, exp: "Reflection" },
      { id: "cet_a13", q: "3 sides → 4 → 5 ___", choices: ["triangle", "square", "pentagon", "hexagon"], ans: 3, exp: "Add one side" },
      { id: "cet_a14", q: "Shading pattern alternates", choices: ["alternate fill", "solid", "none", "random"], ans: 0, exp: "Switch each time" },
      { id: "cet_a15", q: "Growth pattern", choices: ["increasing complexity", "decreasing", "constant", "random"], ans: 0, exp: "Gets more complex" }
    ]
  },
  cet_gk: {
    label: "CET GK", icon: "🌍", color: "#EC4899",
    items: [
      { id: "cet_g1", q: "Capital of Philippines", choices: ["Cebu", "Davao", "Manila", "Quezon City"], ans: 2, exp: "Manila" },
      { id: "cet_g2", q: "Currency of PH", choices: ["Dollar", "Peso", "Yen", "Euro"], ans: 1, exp: "Philippine Peso" },
      { id: "cet_g3", q: "Current President (as of 2025)", choices: ["Duterte", "Marcos Jr.", "Aquino", "Arroyo"], ans: 1, exp: "Ferdinand Marcos Jr." },
      { id: "cet_g4", q: "US currency", choices: ["Peso", "Euro", "Dollar", "Yen"], ans: 2, exp: "US Dollar" },
      { id: "cet_g5", q: "1 USD approx", choices: ["₱50", "₱55", "₱60", "₱70"], ans: 1, exp: "About 55 PHP" },
      { id: "cet_g6", q: "BOC meaning", choices: ["Bank of China", "Bureau of Customs", "Board of Commerce", "Bureau of Communication"], ans: 1, exp: "Bureau of Customs" },
      { id: "cet_g7", q: "Import means", choices: ["bring into country", "send out country", "trade only", "none"], ans: 0, exp: "Bring in goods" },
      { id: "cet_g8", q: "Export means", choices: ["bring into country", "send out country", "domestic sale", "none"], ans: 1, exp: "Send out goods" },
      { id: "cet_g9", q: "Main airport PH", choices: ["Clark", "NAIA", "Cebu", "Davao"], ans: 1, exp: "Ninoy Aquino International Airport" },
      { id: "cet_g10", q: "Philippines is in", choices: ["South Asia", "Southeast Asia", "East Asia", "Pacific"], ans: 1, exp: "Southeast Asia" }
    ]
  }
};

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