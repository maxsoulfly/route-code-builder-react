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

function readLS(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function buildExportPayload() {
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
}

export function formatBackUpFilename(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `backup-${y}-${m}-${d}-${hh}-${mm}.json`;
}

export function downloadExport() {
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
}
