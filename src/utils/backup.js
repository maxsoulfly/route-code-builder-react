// src/utils/backup.js
const EXPORT_SCHEMA_VERSION = 1;

const KEY_LIST = [
  "climate",
  "stations",
  "gen.station1",
  "gen.station2",
  "gen.station3",
  "gen.cargo",
  "gen.tag",
  "ui.inputs.open",
  "ui.stationList.open",
  "ui.stationNameGen.open",
  "ui.addStation.open",
  "ui.reset.open",
  // future:
  "cities",
  "data.tags",
  "data.cargo.temperate",
  "data.cargo.sub-arctic",
  "data.cargo.sub-tropical",
  "data.cargo.toyland",
];

const readLS = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const buildExportPayload = () => {
  return {
    schemaVersion: EXPORT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      stations: readLS("stations", []),
      cities: readLS("cities", []), // may be undefined today
      cargo: {
        temperate: readLS("data.cargo.temperate", []),
        "sub-arctic": readLS("data.cargo.sub-arctic", []),
        "sub-tropical": readLS("data.cargo.sub-tropical", []),
        toyland: readLS("data.cargo.toyland", []),
      },
      tags: readLS("data.tags", []),
    },
    ui: {
      inputs: { open: !!readLS("ui.inputs.open", false) },
      stationList: { open: !!readLS("ui.stationList.open", false) },
      stationNameGen: { open: !!readLS("ui.stationNameGen.open", false) },
      addStation: { open: !!readLS("ui.addStation.open", false) },
      reset: { open: !!readLS("ui.reset.open", false) },
    },
    selections: {
      climate: readLS("climate", "temperate"),
      station1: readLS("gen.station1", { code: "", label: "" }),
      station2: readLS("gen.station2", { code: "", label: "" }),
      station3: readLS("gen.station3", { code: "", label: "" }),
      cargo: readLS("gen.cargo", []),
      tag: readLS("gen.tag", ""),
    },
  };
};

const formatBackUpFilename = (date = new Date()) => {
  const pad = (n) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `backup-${y}-${m}-${d}-${hh}-${mm}.json`;
};

const downloadExport = () => {
  const payload = buildExportPayload();
  const filename = formatBackUpFilename();
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

// --- import parsing ---
const parseBackup = (text) => {
  try {
    const json = JSON.parse(text);
    if (typeof json !== "object" || !json) {
      return { ok: false, error: "Invalid JSON structure" };
    }
    if (json.schemaVersion !== EXPORT_SCHEMA_VERSION) {
      return { ok: false, error: "Invalid schema version" };
    }
    if (!json.data || !json.ui || !json.selections) {
      return { ok: false, error: "Missing required fields" };
    }
    if (!json.data.stations || !json.data.cargo || !json.data.tags) {
      return { ok: false, error: "Invalid data structure" };
    }
    return { ok: true, payload: json };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

const applyBackup = (payload) => {
  if (!payload || payload.schemaVersion !== 1) {
    console.error("Invalid backup payload");
    return;
  }

  // 1. clear current
  localStorage.clear();

  // --- write data ---
  localStorage.setItem("stations", JSON.stringify(payload.data.stations || []));
  localStorage.setItem("cities", JSON.stringify(payload.data.cities || []));
  if (payload.data.cargo) {
    for (const [climate, list] of Object.entries(payload.data.cargo)) {
      localStorage.setItem(`data.cargo.${climate}`, JSON.stringify(list || []));
    }
  }
  localStorage.setItem("data.tags", JSON.stringify(payload.data.tags || []));

  // --- write ui ---
  const ui = payload.ui || {};
  for (const key of Object.keys(ui)) {
    const val = ui[key]?.open ?? false;
    localStorage.setItem(`ui.${key}.open`, JSON.stringify(val));
  }

  // --- write selections ---
  const sel = payload.selections || {};
  localStorage.setItem("climate", JSON.stringify(sel.climate || "temperate"));
  localStorage.setItem(
    "gen.station1",
    JSON.stringify(sel.station1 || { code: "", label: "" })
  );
  localStorage.setItem(
    "gen.station2",
    JSON.stringify(sel.station2 || { code: "", label: "" })
  );
  localStorage.setItem(
    "gen.station3",
    JSON.stringify(sel.station3 || { code: "", label: "" })
  );
  localStorage.setItem("gen.cargo", JSON.stringify(sel.cargo || []));
  localStorage.setItem("gen.tag", JSON.stringify(sel.tag || ""));

  // 3. reload app
  window.location.reload();
};

export {
  buildExportPayload,
  formatBackUpFilename,
  downloadExport,
  parseBackup,
  applyBackup,
};
