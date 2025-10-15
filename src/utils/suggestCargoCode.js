// src/utils/suggestCargoCode.js

function toWords(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function isUnique(code, existing) {
  const up = String(code).toUpperCase();
  const set = new Set(existing.map((c) => String(c).toUpperCase()));
  return !set.has(up);
}

export default function suggestCargoCode(name, existingCodes = []) {
  const words = toWords(name);
  if (words.length === 0) return "";

  const first = words[0][0].toUpperCase();
  const lastWord = words[words.length - 1];
  const last = lastWord[lastWord.length - 1].toUpperCase();

  // Preferred patterns (2 chars):
  // 1) two words: first of first + first of last
  if (words.length >= 2) {
    const cand = first + words[words.length - 1][0].toUpperCase();
    if (isUnique(cand, existingCodes)) return cand;
  }

  // 2) single word: first + last char
  if (words.length === 1) {
    const cand = first + last;
    if (isUnique(cand, existingCodes)) return cand;
  }

  // 3) multi-word: first of first + first of second
  if (words.length >= 2) {
    const cand = first + words[1][0].toUpperCase();
    if (isUnique(cand, existingCodes)) return cand;
  }

  // 4) scan inner letters to find a distinct second char
  const alphaNum = (s) => s.replace(/[^A-Za-z0-9]/g, "");
  for (const w of words) {
    const clean = alphaNum(w.toUpperCase());
    for (let i = 1; i < clean.length; i++) {
      const cand = first + clean[i];
      if (isUnique(cand, existingCodes)) return cand;
    }
  }

  // 5) fallback: first + cycle through alphabet/nums
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (const ch of pool) {
    const cand = first + ch;
    if (isUnique(cand, existingCodes)) return cand;
  }

  // last-resort (still 2 chars)
  return (first + "X").slice(0, 2).toUpperCase();
}
