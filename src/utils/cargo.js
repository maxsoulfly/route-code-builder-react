// src/utils/cargo.js
const CUSTOMS_EVENT = "custom-cargo-sync";

const notifyCustomCargosChanged = () => {
  window.dispatchEvent(new Event(CUSTOMS_EVENT));
};

export function onCustomCargosChanged(handler) {
  window.addEventListener(CUSTOMS_EVENT, handler);
  window.addEventListener("storage", handler); // cross-tab
  return () => {
    window.removeEventListener(CUSTOMS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
const readCustomCargos = (climate) => {
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
};

// Normalize (trim, UPPERCASE codes) and de-dupe by code (keep the LAST occurrence)
const normalizeCustomCargos = (list) => {
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
};

const buildMergedCargos = (defaultList, climate) => {
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
};

const upsertCustomCargo = (climate, { code, label }) => {
  const list = readCustomCargos(climate);
  const norm = normalizeCustomCargos([...list, { code, label }]); // keep last
  localStorage.setItem(`data.cargo.${climate}`, JSON.stringify(norm));

  // refresh listeners (same-tab + cross-tab)
  window.dispatchEvent(new Event("custom-cargo-sync")); // notify
};

const removeCustomCargo = (climate, code) => {
  const uppercase = String(code || "")
    .toUpperCase()
    .trim();
  if (!uppercase) return;
  const list = normalizeCustomCargos(readCustomCargos(climate));
  const next = list.filter((x) => x.code !== uppercase);
  localStorage.setItem(`data.cargo.${climate}`, JSON.stringify(next));
  notifyCustomCargosChanged();
};

export function resetCustomCargos(climate) {
  localStorage.removeItem(`data.cargo.${climate}`);
  notifyCustomCargosChanged();
}

export {
  notifyCustomCargosChanged,
  readCustomCargos,
  normalizeCustomCargos,
  buildMergedCargos,
  upsertCustomCargo,
  removeCustomCargo,
};
