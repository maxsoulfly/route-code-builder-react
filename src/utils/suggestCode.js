function getFirstChar(word) {
  return word[0] ? word[0].toUpperCase() : "";
}

function getLetters(str, count) {
  return str
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, count)
    .toUpperCase();
}

function isUnique(code, existingCodes) {
  return !existingCodes.includes(code);
}

function shouldSkipChar(char, first, last, seen) {
  if (!/[A-Z0-9]/i.test(char)) return true;
  char = char.toUpperCase();
  if (char === first || char === last) return true;
  if (seen.has(char)) return true;
}

function tryCandidates(words, existingCodes) {
  const first = getFirstChar(words[0]);
  const second = getFirstChar(words[1]);
  const last = getFirstChar(words[words.length - 1]);

  const seen = new Set();
  
  let candidate = "";
  if (words.length == 2) {
    candidate = first + last;
    if (isUnique(candidate, existingCodes)) return candidate;
  }

  candidate = first + second + last;
  if (isUnique(candidate, existingCodes)) return candidate;

  for (let i = 0; i < words.length - 1; i++) {
    for (let char of words[i]) {
      if (shouldSkipChar(char, first, last, seen)) continue;
      seen.add(char);

      const candidate = first + char.toUpperCase() + last;
      if (isUnique(candidate, existingCodes)) return candidate;
    }

    for (let char of words[words.length - 1].slice(1)) {
      if (shouldSkipChar(char, first, last, seen)) continue;
      seen.add(char);

      const candidate = first + last + char.toUpperCase(); // Step 4
      if (isUnique(candidate, existingCodes)) return candidate;
    }
  }
}

export default function suggestCode(name, existingCodes = []) {
  if (!name) return "";

  let base = "";
  const clean = name.trim();
  const numberMatch = clean.match(/\d+/);
  const words = clean.split(/\s+/);

  const first = getFirstChar(words[0]);
  const last = getFirstChar(words[words.length - 1]);

  if (numberMatch) {
    base = getFirstChar(clean) + numberMatch[0];
    if (isUnique(base, existingCodes)) return base;
  }

  if (words.length === 1) {
    base = getLetters(words[0]);
    if (isUnique(base, existingCodes)) return base;
  }

  if (words.length > 1) {
    const candidate = tryCandidates(words, existingCodes);
    if (isUnique(candidate, existingCodes)) return candidate;
  }

  const alphabet = "ZYXWVUTSRQPONMLKJIHGFEDCBA1234567890";
  base = first + last;

  for (let char of alphabet) {
    const candidate = base + char;
    if (isUnique(candidate, existingCodes)) return candidate;
  }

  return base;
}
