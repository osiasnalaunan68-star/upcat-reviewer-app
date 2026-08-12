const fs = require("fs");
const filePath = "src/App.jsx";
const lines = fs.readFileSync(filePath, "utf8").split("\n");

function findIdx(marker) {
  const idx = lines.findIndex((l) => l.trim() === marker);
  if (idx === -1) throw new Error("Anchor not found (baka na-edit na dati): " + marker);
  return idx;
}
function replaceLine(marker, newContent) {
  const idx = findIdx(marker);
  const indent = lines[idx].match(/^\s*/)[0];
  lines[idx] = indent + newContent;
}
function insertBefore(marker, block) {
  const idx = findIdx(marker);
  const indent = lines[idx].match(/^\s*/)[0];
  const blockLines = block.split("\n").map((l) => (l ? indent + l : l));
  lines.splice(idx, 0, ...blockLines);
}

// 1) One-time wipe ng dating custom questions / history / in-progress quiz
insertBefore(
  "export default function App() {",
  [
    "// One-time reset ng dating custom questions/history kapag nag-deploy ng bagong bersyon",
    'const CLEAN_SLATE_VERSION = "2026-08-clean";',
    'if (typeof window !== "undefined" && localStorage.getItem("upcat_reset_version") !== CLEAN_SLATE_VERSION) {',
    "  localStorage.removeItem(STORAGE.CUSTOM_CATS);",
    "  localStorage.removeItem(STORAGE.USER_HISTORY);",
    "  localStorage.removeItem(STORAGE.QUIZ_PROGRESS);",
    '  localStorage.setItem("upcat_reset_version", CLEAN_SLATE_VERSION);',
    "}",
    "",
  ].join("\n")
);

// 2) Palitan yung "Reviewee" (username) button papuntang "Study"
replaceLine(
  '<button style={styles.btn(T.surface, T.textSub)} onClick={() => setScreen("profile")}>👤 {userName}</button>',
  '<button style={styles.btn(T.surface, T.textSub)} onClick={() => setScreen("study")}>📖 Study</button>'
);

// 3) Bagong Study screen (blangko muna — dito ilalagay ang subject lectures)
insertBefore(
  '{screen === "profile" && (',
  [
    '{screen === "study" && (',
    '  <div style={styles.wrap}>',
    '    <h2 style={{ marginBottom: 16, color: T.text }}>📖 Study</h2>',
    '    <p style={{ color: T.textMuted }}>',
    '      Dito ilalagay ang mga subject lecture. Wala pa itong laman — sabihin na lang kung anong',
    '      format ng lecture content ang gusto mo (text, links, images) para magawan ng tamang structure.',
    '    </p>',
    '    <button style={{ ...styles.btn(T.surface), marginTop: 16 }} onClick={() => setScreen("home")}>← Back</button>',
    '  </div>',
    ")}",
    "",
  ].join("\n")
);

// 4) Panatilihing puntahan pa rin ang Profile/Analytics — link sa loob ng Settings
insertBefore(
  "{/* DEV PANEL */}",
  [
    '<button style={{ ...styles.btn(T.surface), marginTop: 24 }} onClick={() => setScreen("profile")}>👤 View Profile & Analytics</button>',
    "",
  ].join("\n")
);

fs.writeFileSync(filePath, lines.join("\n"), "utf8");
console.log("✅ Tapos na — Study button, blangkong Study screen, at one-time clean-slate reset.");
