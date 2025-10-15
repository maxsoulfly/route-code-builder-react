// src/utils/cargo.js
const CUSTOMS_EVENT = "custom-cargo-sync";

export function notifyCustomCargosChanged() {
  window.dispatchEvent(new Event(CUSTOMS_EVENT));
}

export function onCustomCargosChanged(handler) {
  window.addEventListener(CUSTOMS_EVENT, handler);
  window.addEventListener("storage", handler); // cross-tab
  return () => {
    window.removeEventListener(CUSTOMS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
export function readCustomCargos(climate) {
  const key = `data.cargo.${climate}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map((x) => ({
      code: String(x?.code || "").trim(),
      label: String(x?.label || "").trim(),
    }));
  } catch {
    return [];
  }
}

// Normalize (trim, UPPERCASE codes) and de-dupe by code (keep the LAST occurrence)
export function normalizeCustomCargos(list) {
  if (!Array.isArray(list)) return [];

  // clean + normalize
  const cleaned = list
    .map((x) => ({
      code: String(x?.code || "").trim(),
      label: String(x?.label || "").trim(),
    }))
    .filter((x) => x.code && x.label);

  // Track last index per code (case-insensitive)
  const lastIndex = new Map();
  cleaned.forEach((x, i) => lastIndex.set(x.code.toUpperCase(), i));

  // Keep only the last occurrence of each code, normalized
  const out = [];
  cleaned.forEach((x, i) => {
    const codeUP = x.code.toUpperCase();
    if (i === lastIndex.get(codeUP)) {
      out.push({ code: codeUP, label: x.label });
    }
  });

  return out;
}

export function buildMergedCargos(defaultList, climate) {
  const customs = normalizeCustomCargos(readCustomCargos(climate));

  // start with defaults
  const merged = defaultList.map((d) => ({
    code: String(d?.code || "").toUpperCase(),
    label: String(d?.label || "").trim(),
    source: "default",
  }));

  // overlay customs: override label if same code, append if new
  customs.forEach((c) => {
    const index = merged.findIndex((d) => d.code === c.code);
    if (index >= 0) {
      merged[index] = { ...merged[index], label: c.label, source: "custom" };
    } else {
      merged.push({ code: c.code, label: c.label, source: "custom" });
    }
  });

  return merged;
}

export function upsertCustomCargo(climate, { code, label }) {
  const list = readCustomCargos(climate);
  const norm = normalizeCustomCargos([...list, { code, label }]); // keep last
  localStorage.setItem(`data.cargo.${climate}`, JSON.stringify(norm));

  // refresh listeners (same-tab + cross-tab)
  window.dispatchEvent(new Event("custom-cargo-sync")); // notify
}
