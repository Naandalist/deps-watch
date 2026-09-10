import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const AGE_DAYS = {
  "needs-pr": 14,
  "pr-open": 10,
  "fixed-unreleased": 5,
  fixed: 2,
};

const QUOTA = {
  "needs-pr": 12,
  "pr-open": 8,
  resolved: 5,
};

const SEVERITY_RANK = {
  Critical: 3,
  High: 2,
  Medium: 1,
};

function toDayString(value) {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return "";
}

function parseDate(value) {
  const day = toDayString(value);
  if (!day) return null;
  const date = new Date(`${day}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysBetween(later, earlier) {
  return Math.floor((later.getTime() - earlier.getTime()) / 86_400_000);
}

function compareItems(a, b) {
  const severityDelta = (SEVERITY_RANK[b.severity] || 0) - (SEVERITY_RANK[a.severity] || 0);
  if (severityDelta !== 0) return severityDelta;

  const downloadsA = Number.isFinite(a.weekly_downloads) ? a.weekly_downloads : -1;
  const downloadsB = Number.isFinite(b.weekly_downloads) ? b.weekly_downloads : -1;
  if (downloadsB !== downloadsA) return downloadsB - downloadsA;

  return String(b.date || "").localeCompare(String(a.date || ""));
}

function takeQuota(items, limit) {
  return items.slice(0, limit);
}

export default function () {
  const site = JSON.parse(fs.readFileSync(path.join(__dirname, "site.json"), "utf8"));
  const raw = (yaml.load(fs.readFileSync(path.join(__dirname, "items.yaml"), "utf8")) || []).map((item) => ({
    ...item,
    date: toDayString(item.date),
  }));
  const updated = parseDate(site.updated) || new Date();
  const updatedDay = toDayString(site.updated);

  const visible = raw.filter((item) => {
    const itemDate = parseDate(item.date);
    if (!itemDate) return false;
    const maxAge = AGE_DAYS[item.status];
    if (maxAge === undefined) return false;
    return daysBetween(updated, itemDate) <= maxAge;
  });

  const today = visible.filter((item) => item.date === updatedDay).sort(compareItems);

  const ready = takeQuota(
    visible.filter((item) => item.status === "needs-pr").sort(compareItems),
    QUOTA["needs-pr"]
  );

  const progress = takeQuota(
    visible.filter((item) => item.status === "pr-open").sort(compareItems),
    QUOTA["pr-open"]
  );

  const resolved = takeQuota(
    visible
      .filter((item) => item.status === "fixed-unreleased" || item.status === "fixed")
      .sort(compareItems),
    QUOTA.resolved
  );

  return {
    today,
    ready,
    progress,
    resolved,
    counts: {
      today: today.length,
      ready: ready.length,
      progress: progress.length,
      resolved: resolved.length,
      source: raw.length,
    },
  };
}
