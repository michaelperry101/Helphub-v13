// app/settings/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Clean, mobile-style Settings screen.
 * - Safe localStorage usage (guards for SSR)
 * - Persistent toggles (theme, notifications, voice)
 * - Quick links to your pages (billing, privacy, etc.)
 * - Looks good even without extra CSS (uses inline styles)
 */

export default function SettingsPage() {
  const router = useRouter();

  // ---------- helpers ----------
  const canUseLS = typeof window !== "undefined" && !!window.localStorage;
  const readLS = (k, d) => {
    try {
      if (!canUseLS) return d;
      const v = localStorage.getItem(k);
      return v === null ? d : JSON.parse(v);
    } catch {
      return d;
    }
  };
  const writeLS = (k, v) => {
    try {
      if (canUseLS) localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  };

  // ---------- state ----------
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(readLS("hh_theme", "light")); // "light" | "dark"
  const [notifications, setNotifications] = useState(readLS("hh_notifications", true));
  const [voice, setVoice] = useState(readLS("hh_voice", true));
  const [haptics, setHaptics] = useState(readLS("hh_haptics", true));
  const [dataCollection, setDataCollection] = useState(readLS("hh_datacollection", false));

  // apply theme to <html data-theme="">
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    writeLS("hh_theme", theme);
  }, [theme]);

  // persist the rest
  useEffect(() => writeLS("hh_notifications", notifications), [notifications]);
  useEffect(() => writeLS("hh_voice", voice), [voice]);
  useEffect(() => writeLS("hh_haptics", haptics), [haptics]);
  useEffect(() => writeLS("hh_datacollection", dataCollection), [dataCollection]);

  // a fake user email placeholder; replace once you wire auth
  useEffect(() => {
    setEmail(readLS("hh_demo_email", "you@example.com"));
  }, []);

  // ---------- styles ----------
  const s = useMemo(
    () => ({
      page: {
        maxWidth: 720,
        margin: "0 auto",
        padding: "16px 14px 28px",
      },
      header: {
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 12,
      },
      tileList: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 8,
      },
      sectionTitle: {
        fontSize: 13,
        letterSpacing: ".04em",
        fontWeight: 700,
        color: "var(--muted, #667085)",
        textTransform: "uppercase",
        marginTop: 18,
        marginBottom: 8,
      },
      tile: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 14,
        background: "var(--card, #ffffff)",
        border: "1px solid var(--border, #e6e8ec)",
        boxShadow: "0 1px 0 rgba(16,24,40,.02)",
      },
      leftIcon: (bg) => ({
        width: 36,
        height: 36,
        minWidth: 36,
        borderRadius: 10,
        display: "grid",
        placeItems: "center",
        background: bg,
        color: "#0b1221",
        fontSize: 18,
        fontWeight: 700,
      }),
      labelWrap: { flex: 1, minWidth: 0 },
      label: { fontSize: 16, fontWeight: 600 },
      sub: { fontSize: 13, color: "var(--muted, #667085)", marginTop: 2 },
      chevron: { fontSize: 18, color: "#98a2b3" },
      row: { display: "flex", alignItems: "center", gap: 10 },
      switch: {
        appearance: "none",
        width: 46,
        height: 28,
        borderRadius: 999,
        background: "#e5e7eb",
        position: "relative",
        outline: "none",
        cursor: "pointer",
      },
      knob: (checked) => ({
        content: '""',
        position: "absolute",
        top: 3,
        left: checked ? 22 : 3,
        width: 22,
        height: 22,
        borderRadius: 999,
        background: checked ? "var(--brand, #00a3a3)" : "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,.15)",
        transition: "left .18s ease",
      }),
      danger: { color: "#d92d20", fontWeight: 600 },
      divider: { height: 8 },
      footer: { marginTop: 22, fontSize: 12, color: "var(--muted, #667085)", textAlign: "center" },
    }),
    []
  );

  // tiny icon “glyphs” (no libs needed)
  const Glyph = ({ children }) => <span aria-hidden>{children}</span>;

  // switch component
  function Switch({ checked, onChange }) {
    return (
      <span style={{ position: "relative", display: "inline-block" }} onClick={() => onChange(!checked)}>
        <input type="checkbox" checked={checked} onChange={() => {}} style={s.switch} />
        <span style={s.knob(checked)} />
      </span>
    );
  }

  // tile button
  function TileButton({ icon, iconBg, title, subtitle, onClick, right, danger }) {
    return (
      <button
        onClick={onClick}
        style={{
          ...s.tile,
          width: "100%",
          textAlign: "left",
          background: "var(--card, #fff)",
        }}
      >
        <div style={s.leftIcon(iconBg)}>{icon}</div>
        <div style={s.labelWrap}>
          <div style={{ ...s.label, ...(danger ? s.danger : null) }}>{title}</div>
          {subtitle ? <div style={s.sub}>{subtitle}</div> : null}
        </div>
        {right ?? <Glyph>›</Glyph>}
      </button>
    );
  }

  // ---------- actions ----------
  const to = (href) => router.push(href);

  const clearAll = () => {
    if (!confirm("This will clear local chat history and preferences. Continue?")) return;
    if (canUseLS) {
      const keep = ["hh_theme"]; // keep theme
      Object.keys(localStorage).forEach((k) => {
        if (!keep.includes(k)) localStorage.removeItem(k);
      });
    }
    alert("Local data cleared.");
  };

  const signOut = () => {
    // placeholder – wire to auth later
    alert("Signed out (demo).");
  };

  // ---------- render ----------
  return (
    <main style={s.page}>
      <h1 style={s.header}>Settings</h1>

      {/* Account */}
      <div style={s.sectionTitle}>Account</div>
      <div style={s.tileList}>
        <TileButton
          icon={<Glyph>✉️</Glyph>}
          iconBg="#E7F1FF"
          title="Email"
          subtitle={email}
          onClick={() => alert("Connect your auth system to edit email.")}
        />
        <TileButton
          icon={<Glyph>💳</Glyph>}
          iconBg="#EAF8F6"
          title="Manage Subscription"
          subtitle="Helphub247 Plus"
          onClick={() => to("/billing")}
        />
        <TileButton
          icon={<Glyph>⭐</Glyph>}
          iconBg="#FFF4E5"
          title="Upgrade to Pro"
          subtitle="Unlock more features"
          onClick={() => to("/subscribe")}
        />
      </div>

      {/* Experience */}
      <div style={s.sectionTitle}>Experience</div>
      <div style={s.tileList}>
        <TileButton
          icon={<Glyph>🎚️</Glyph>}
          iconBg="#F3F4F6"
          title="Appearance"
          subtitle={`Theme: ${theme === "dark" ? "Dark" : "Light"}`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          right={
            <div style={s.row}>
              <span style={{ fontSize: 13, color: "var(--muted,#667085)" }}>
                {theme === "dark" ? "Dark" : "Light"}
              </span>
              <Switch checked={theme === "dark"} onChange={(v) => setTheme(v ? "dark" : "light")} />
            </div>
          }
        />
        <TileButton
          icon={<Glyph>🔊</Glyph>}
          iconBg="#EAF1FF"
          title="Voice"
          subtitle={voice ? "On (British accent)" : "Off"}
          onClick={() => setVoice(!voice)}
          right={<Switch checked={voice} onChange={setVoice} />}
        />
        <TileButton
          icon={<Glyph>✨</Glyph>}
          iconBg="#F3EEFF"
          title="Haptics"
          subtitle={haptics ? "On" : "Off"}
          onClick={() => setHaptics(!haptics)}
          right={<Switch checked={haptics} onChange={setHaptics} />}
        />
        <TileButton
          icon={<Glyph>🔔</Glyph>}
          iconBg="#FFF1F1"
          title="Notifications"
          subtitle={notifications ? "On" : "Off"}
          onClick={() => setNotifications(!notifications)}
          right={<Switch checked={notifications} onChange={setNotifications} />}
        />
        <TileButton
          icon={<Glyph>🧩</Glyph>}
          iconBg="#E7F6FF"
          title="Connectors"
          subtitle="Drive, Docs, Email (soon)"
          onClick={() => alert("Connectors coming soon")}
        />
        <TileButton
          icon={<Glyph>👤</Glyph>}
          iconBg="#FFEFF7"
          title="Personalization"
          subtitle="Tone, writing style, preferences"
          onClick={() => to("/about")}
        />
      </div>

      {/* Privacy & Security */}
      <div style={s.sectionTitle}>Privacy & Security</div>
      <div style={s.tileList}>
        <TileButton
          icon={<Glyph>🗄️</Glyph>}
          iconBg="#EEF4FF"
          title="Data Controls"
          subtitle={dataCollection ? "Improve product with data: On" : "Improve product with data: Off"}
          onClick={() => setDataCollection(!dataCollection)}
          right={<Switch checked={dataCollection} onChange={setDataCollection} />}
        />
        <TileButton
          icon={<Glyph>🔐</Glyph>}
          iconBg="#EAF8F6"
          title="Security"
          subtitle="Sessions, devices (demo)"
          onClick={() => alert("Security dashboard coming soon")}
        />
        <TileButton
          icon={<Glyph>📜</Glyph>}
          iconBg="#FFF7E8"
          title="Privacy Policy"
          onClick={() => to("/privacy")}
        />
        <TileButton
          icon={<Glyph>⚖️</Glyph>}
          iconBg="#F5F5F5"
          title="Terms of Service"
          onClick={() => to("/terms")}
        />
      </div>

      {/* Danger */}
      <div style={s.sectionTitle}>Danger Zone</div>
      <div style={s.tileList}>
        <TileButton
          icon={<Glyph>🧹</Glyph>}
          iconBg="#FFEDEC"
          title="Clear Local Data"
          subtitle="Deletes local chat history & preferences"
          onClick={clearAll}
          right={<Glyph style={s.danger}>✖</Glyph>}
          danger
        />
        <TileButton
          icon={<Glyph>↩︎</Glyph>}
          iconBg="#F0F9FF"
          title="Sign out"
          onClick={signOut}
          danger
          right={null}
        />
      </div>

      <div style={s.footer}>© {new Date().getFullYear()} HelpHub247</div>
    </main>
  );
            }
