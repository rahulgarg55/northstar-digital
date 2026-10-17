"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Film,
  Layers,
  Lock,
  Maximize2,
  MousePointer,
  Pause,
  Play,
  RotateCcw,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { selectedProjects } from "@/lib/agency";

type Project = (typeof selectedProjects)[number];

export function ProductVideoPlayer({
  project,
  autoStart = false,
  onOpenTheater,
}: {
  project: Project;
  autoStart?: boolean;
  onOpenTheater?: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [cursorClicked, setCursorClicked] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const demo = project.demoVideo;
  const totalSeconds = demo?.totalSeconds || 180;

  // Auto-play on mount if autoStart is true
  useEffect(() => {
    if (autoStart) setIsPlaying(true);
  }, [autoStart]);

  // Click ripple simulation on chapter change
  useEffect(() => {
    setCursorClicked(true);
    const timeout = setTimeout(() => setCursorClicked(false), 600);
    return () => clearTimeout(timeout);
  }, [activeChapterIndex]);

  // Simulation timer that advances chapters
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          if (demo?.chapters) {
            const nextIdx = demo.chapters.findIndex(
              (c, i) =>
                next >= c.seconds &&
                (i === demo.chapters.length - 1 || next < demo.chapters[i + 1].seconds)
            );
            if (nextIdx !== -1) setActiveChapterIndex(nextIdx);
          }
          return next;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds, speed, demo?.chapters]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const seekTo = (seconds: number, index: number) => {
    setCurrentSeconds(seconds);
    setActiveChapterIndex(index);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newSeconds = Math.floor(pos * totalSeconds);
    setCurrentSeconds(newSeconds);
    if (demo?.chapters) {
      const nextIdx = demo.chapters.findIndex(
        (c, i) =>
          newSeconds >= c.seconds &&
          (i === demo.chapters.length - 1 || newSeconds < demo.chapters[i + 1].seconds)
      );
      if (nextIdx !== -1) setActiveChapterIndex(nextIdx);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const currentChapter = demo?.chapters[activeChapterIndex] || {
    title: project.headline,
    pageName: "Overview",
    pageUrl: project.liveUrl,
    description: project.description,
    screenType: "landing",
  };

  const progressPercent = Math.min(100, (currentSeconds / totalSeconds) * 100);

  // Dynamic animated cursor coordinates based on chapter
  const cursorCoords = [
    { top: "68%", left: "50%" },
    { top: "42%", left: "38%" },
    { top: "54%", left: "58%" },
    { top: "36%", left: "74%" },
    { top: "72%", left: "44%" },
  ][activeChapterIndex % 5];

  return (
    <div className="agency-video-showcase my-8" ref={playerRef}>
      {/* Top Header Information & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: isPlaying ? "var(--agency-lime)" : "var(--agency-muted)",
              boxShadow: isPlaying ? "0 0 10px var(--agency-lime)" : "none",
            }}
          />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--agency-lime)" }}>
            {demo?.badge || "Full Website Walkthrough"}
          </span>
          <span style={{ color: "var(--agency-muted)" }}>·</span>
          <span className="text-xs font-mono" style={{ color: "var(--agency-muted)" }}>
            1080p 60FPS · {demo?.duration || "3:00"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenTheater && (
            <button
              type="button"
              onClick={onOpenTheater}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border text-white transition-all hover:bg-white/10 cursor-pointer"
              style={{
                borderColor: "rgba(255, 255, 255, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Maximize2 size={13} /> Theater Mode
            </button>
          )}

          <a
            href={currentChapter.pageUrl || project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border hover:underline transition-colors"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              borderColor: "rgba(16, 185, 129, 0.3)",
              color: "var(--agency-lime)",
            }}
          >
            Open Live in Browser <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Main Video Monitor Browser Chassis */}
      <div
        className="rounded-2xl border overflow-hidden shadow-2xl relative"
        style={{
          borderColor: "var(--agency-card-border)",
          backgroundColor: "#060911",
        }}
      >
        {/* Browser Top Bar & Address URL Input */}
        <div
          className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono select-none border-b"
          style={{
            backgroundColor: "#090d16",
            borderColor: "rgba(255, 255, 255, 0.08)",
            color: "#94a3b8",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-semibold text-[11px] text-slate-300">
              {project.name}
            </span>
          </div>

          {/* Interactive URL Bar */}
          <div className="flex-1 max-w-md mx-2 px-3 py-1 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 truncate">
              <Lock size={11} className="text-emerald-400 shrink-0" />
              <span className="truncate text-emerald-300 font-mono">
                {currentChapter.pageUrl}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 shrink-0 ml-2">
              HTTPS / TLS 1.3
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
              LIVE UI PREVIEW
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Website Viewport Screen */}
        <div
          className="relative min-h-[400px] sm:min-h-[480px] flex flex-col justify-between p-4 sm:p-6 cursor-pointer select-none group overflow-hidden"
          onClick={togglePlay}
          style={{
            background:
              project.slug === "aetherdesk"
                ? "radial-gradient(ellipse at 50% 20%, #0d1e33 0%, #060911 85%)"
                : project.slug === "productivity-tracker"
                ? "radial-gradient(ellipse at 50% 20%, #11281e 0%, #060911 85%)"
                : project.slug === "report-iq"
                ? "radial-gradient(ellipse at 50% 20%, #1d1430 0%, #060911 85%)"
                : "radial-gradient(ellipse at 50% 20%, #111e33 0%, #060911 85%)",
          }}
        >
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#38bdf8 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Simulated Animated Cursor with Click Ripple */}
          {isPlaying && (
            <div
              className="absolute z-30 pointer-events-none transition-all duration-700 ease-out flex items-center gap-1"
              style={{
                top: cursorCoords.top,
                left: cursorCoords.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <MousePointer
                  size={20}
                  className="text-white fill-emerald-500 drop-shadow-md"
                />
                {cursorClicked && (
                  <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
                )}
              </div>
              <span className="px-1.5 py-0.5 rounded bg-black/80 text-[9px] text-emerald-300 font-mono border border-white/10 shadow">
                Click
              </span>
            </div>
          )}

          {/* Top Stage Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white border border-white/15 backdrop-blur-md">
                Screen {activeChapterIndex + 1} of {demo?.chapters.length || 5}: {currentChapter.pageName}
              </span>
              <span className="text-emerald-400 font-mono text-[11px] hidden sm:inline">
                {currentChapter.time}
              </span>
            </div>

            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/10">
              {isPlaying ? "▶ PLAYING UI TOUR" : "⏸ PAUSED (CLICK TO PLAY)"}
            </span>
          </div>

          {/* Center Stage: Authentic Website Simulation UI */}
          <div className="relative z-10 my-auto w-full max-w-4xl mx-auto">
            {/* -------------------- 1. AETHERDESK TRACKER SCREENS -------------------- */}
            {project.slug === "aetherdesk" && (
              <div className="space-y-4">
                {currentChapter.screenType === "onboarding" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-6 max-w-lg mx-auto shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
                        AD
                      </span>
                      <div>
                        <strong className="block text-white text-base">AetherDesk Telemetry Agent</strong>
                        <span className="text-xs text-slate-400">Employee Consent &amp; Transparency Setup</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Under GDPR Article 6, AetherDesk operates transparently with system tray status indicators. Screen telemetry is masked and passwords are encrypted locally.
                    </p>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 text-xs mb-4">
                      <span className="text-slate-200 font-medium">Visible System Tray Indicator</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">ALWAYS ON</span>
                    </div>
                    <button className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                      <Download size={14} /> Download Desktop Agent (Electron v30)
                    </button>
                  </div>
                )}

                {currentChapter.screenType === "dashboard" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs text-emerald-400 font-mono">LIVE TELEMETRY FEED</span>
                        <h4 className="text-base font-bold text-white">Workforce Productivity Dashboard</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5">
                        <Activity size={13} className={isPlaying ? "animate-pulse" : ""} /> Real-Time Syncing
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Total Active Time</span>
                        <strong className="text-lg text-white font-mono">6h 42m</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Productivity Score</span>
                        <strong className="text-lg text-emerald-400 font-mono">89%</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Active Window</span>
                        <strong className="text-xs text-slate-200 truncate block mt-1">VS Code (4h 12m)</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Idle Time</span>
                        <strong className="text-lg text-amber-400 font-mono">32m</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Application Distribution</span>
                        <span className="text-emerald-400 font-mono">62% Deep Work</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-800 flex overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[62%]" title="VS Code 62%" />
                        <div className="bg-teal-500 h-full w-[18%]" title="Terminal 18%" />
                        <div className="bg-cyan-500 h-full w-[15%]" title="Chrome Research 15%" />
                        <div className="bg-amber-500 h-full w-[5%]" title="Slack 5%" />
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "screenshots" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-base font-bold text-white">Screenshot Telemetry &amp; Privacy Masking</h4>
                        <p className="text-xs text-slate-400">Automated Gaussian blur masks sensitive fields before transmission.</p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5">
                        <ShieldCheck size={13} /> Privacy Filter: Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-lg border border-white/10 overflow-hidden bg-black/50 p-3">
                        <div className="h-20 rounded bg-slate-800/80 mb-2 p-2 flex flex-col justify-between font-mono text-[10px] text-slate-400">
                          <span>VS Code — editor.ts</span>
                          <span className="text-emerald-400">Lines: 1-45 · Code</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>10:14 AM</span>
                          <span className="text-emerald-400 font-medium">Clear</span>
                        </div>
                      </div>

                      <div className="rounded-lg border border-cyan-500/40 overflow-hidden bg-black/50 p-3 relative">
                        <div className="h-20 rounded bg-slate-800/80 mb-2 p-2 relative flex flex-col justify-center items-center backdrop-blur-md">
                          <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-mono font-bold">
                            🔒 SENSITIVE FIELD BLURRED
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">10:19 AM</span>
                          <span className="text-cyan-400 font-medium">Privacy Masked</span>
                        </div>
                      </div>

                      <div className="rounded-lg border border-white/10 overflow-hidden bg-black/50 p-3">
                        <div className="h-20 rounded bg-slate-800/80 mb-2 p-2 flex flex-col justify-between font-mono text-[10px] text-slate-400">
                          <span>Terminal — npm test</span>
                          <span className="text-emerald-400">Passed: 61/61</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>10:24 AM</span>
                          <span className="text-emerald-400 font-medium">Clear</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "organizations" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs text-emerald-400 font-mono">TENANT ISOLATION</span>
                        <h4 className="text-base font-bold text-white">Organization: Northstar Digital Studio</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                        Enterprise Tier · 24/50 Seats
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">RG</span>
                          <span className="text-white font-medium">Rahul Garg</span>
                        </div>
                        <span className="text-emerald-400 font-mono">Owner / Architect</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">AM</span>
                          <span className="text-white font-medium">Alex Mercer</span>
                        </div>
                        <span className="text-slate-400 font-mono">Lead Engineer</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">SC</span>
                          <span className="text-white font-medium">Sarah Connor</span>
                        </div>
                        <span className="text-slate-400 font-mono">DevOps &amp; Security</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "compliance" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-white">Security &amp; GDPR Compliance Center</h4>
                        <p className="text-xs text-slate-400">Cryptographic audit trails and data retention boundaries.</p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                        GDPR &amp; CCPA VERIFIED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-slate-400 block mb-1">Data Retention Period</span>
                        <strong className="text-white text-sm">30-Day Automated Purge</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-slate-400 block mb-1">Local Encryption Standard</span>
                        <strong className="text-emerald-400 text-sm">AES-256-GCM at Rest</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs border border-white/15 flex items-center gap-1.5">
                        <Shield size={13} /> Verify Cryptographic Hash Signatures
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -------------------- 2. BUGTRACKER SCREENS -------------------- */}
            {project.slug === "bug-tracker" && (
              <div className="space-y-4">
                {currentChapter.screenType === "login" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-6 max-w-md mx-auto shadow-xl text-center">
                    <span className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 inline-flex items-center justify-center font-bold text-lg mb-3 border border-blue-500/30">
                      BT
                    </span>
                    <h4 className="text-lg font-bold text-white mb-1">Sign in to BugTracker</h4>
                    <p className="text-xs text-slate-400 mb-6">Multi-tenant workspace for high-velocity software teams.</p>
                    <div className="space-y-2 mb-4">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-slate-200 flex items-center justify-center gap-2 hover:bg-white/10 cursor-pointer">
                        <span className="font-bold text-red-400">G</span> Sign in with Google Workspace
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-slate-200 flex items-center justify-center gap-2 hover:bg-white/10 cursor-pointer">
                        <span className="font-bold text-white">🐙</span> Continue with GitHub SSO
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Theme sync: System / Dark / Light</span>
                  </div>
                )}

                {currentChapter.screenType === "workspace" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs text-blue-400 font-mono">ORGANIZATION WORKSPACES</span>
                        <h4 className="text-base font-bold text-white">Northstar Studio Engineering Workspace</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-mono">
                        Active Tenant
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Active Projects</span>
                        <strong className="text-lg text-white font-mono">8 Repositories</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Open Sprints</span>
                        <strong className="text-lg text-emerald-400 font-mono">Sprint 42</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Pending Issues</span>
                        <strong className="text-lg text-amber-400 font-mono">14 Tickets</strong>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "kanban" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h4 className="text-sm font-bold text-white">Sprint 42 Interactive Board</h4>
                      <span className="text-[11px] text-emerald-400 font-mono">Drag &amp; Drop Enabled</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-black/40 border border-white/10 space-y-2">
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">To Do (3)</span>
                        <div className="p-2 rounded bg-slate-800/80 border border-white/10">
                          <span className="font-mono text-[9px] text-blue-400">#BT-101</span>
                          <p className="text-slate-200 mt-1 line-clamp-2">Setup Redis sliding rate limiter</p>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-black/40 border border-blue-500/40 space-y-2">
                        <span className="font-bold text-blue-400 block text-[10px] uppercase">In Progress (2)</span>
                        <div className="p-2 rounded bg-slate-800/80 border border-blue-500/40">
                          <span className="font-mono text-[9px] text-blue-400">#BT-104</span>
                          <p className="text-slate-200 mt-1 line-clamp-2">Fix OAuth redirect URI mismatch</p>
                          <span className="text-[9px] text-emerald-400 font-mono">Rahul Garg</span>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-black/40 border border-white/10 space-y-2">
                        <span className="font-bold text-amber-400 block text-[10px] uppercase">Review (1)</span>
                        <div className="p-2 rounded bg-slate-800/80 border border-white/10">
                          <span className="font-mono text-[9px] text-blue-400">#BT-105</span>
                          <p className="text-slate-200 mt-1 line-clamp-2">Mongoose CastError validation fix</p>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-black/40 border border-white/10 space-y-2">
                        <span className="font-bold text-emerald-400 block text-[10px] uppercase">Done (8)</span>
                        <div className="p-2 rounded bg-slate-800/80 border border-white/10">
                          <span className="font-mono text-[9px] text-blue-400">#BT-99</span>
                          <p className="text-slate-200 mt-1 line-clamp-2">Next.js 16 Turbopack build</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "editor" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                      <span>Projects</span> / <span>Core API</span> / <span className="text-blue-400">#BT-104</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      [Bug] Google OAuth 400 redirect_uri_mismatch on port 3001
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono">
                        Critical
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-mono">
                        Security / Auth
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                        Assignee: Rahul Garg
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-emerald-400">
                      <code>+ redirect_uri: http://localhost:3001/api/auth/callback/google</code>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "releases" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs text-blue-400 font-mono">RELEASE PIPELINE</span>
                        <h4 className="text-base font-bold text-white">Release v2.4.0 — Production Ready</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                        297 Vitest Tests Passed
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-3">
                      Automated changelog generated from merged sprint PRs with zero security vulnerabilities.
                    </p>
                    <div className="p-2.5 rounded bg-black/40 border border-white/10 text-xs font-mono text-slate-400">
                      git tag v2.4.0 &amp;&amp; git push origin main ➔ Vercel Deployed
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -------------------- 3. REPORTIQ SCREENS -------------------- */}
            {project.slug === "report-iq" && (
              <div className="space-y-4">
                {currentChapter.screenType === "landing" && (
                  <div className="rounded-xl border border-purple-500/30 bg-slate-900/90 p-6 max-w-xl mx-auto shadow-xl text-center">
                    <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 inline-flex items-center justify-center font-bold text-lg mb-3 border border-purple-500/40">
                      RI
                    </span>
                    <h4 className="text-xl font-bold text-white mb-2">ReportIQ — AI-Assisted Agency Client Reporting</h4>
                    <p className="text-xs text-slate-300 mb-4 max-w-md mx-auto leading-relaxed">
                      Transform raw Google Analytics traffic and developer timesheets into client-ready executive reports in seconds.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-black/50 border border-purple-500/30 text-purple-300">
                      <Sparkles size={13} /> Generative Executive Narratives &amp; Whitelabel PDFs
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "integrations" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <h4 className="text-base font-bold text-white mb-1">Data Ingestion Hub</h4>
                    <p className="text-xs text-slate-400 mb-4">Multi-channel connectors aggregate raw metrics automatically.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/30">
                        <strong className="text-white block mb-1">Google Analytics 4</strong>
                        <span className="text-emerald-400 font-mono">+34.2% Organic Traffic</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-purple-500/30">
                        <strong className="text-white block mb-1">Developer Time Tracking</strong>
                        <span className="text-purple-300 font-mono">142.5 Billable Hours</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-blue-500/30">
                        <strong className="text-white block mb-1">Stripe Retainer</strong>
                        <span className="text-blue-300 font-mono">$24,500 Monthly MRR</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "ai-summary" && (
                  <div className="rounded-xl border border-purple-500/30 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center gap-2 text-xs text-purple-400 font-mono mb-2">
                      <Sparkles size={14} /> AI SYNTHESIS ENGINE
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">Executive Summary Narrative</h4>
                    <div className="p-3.5 rounded-lg bg-black/60 border border-purple-500/30 text-xs text-slate-200 leading-relaxed font-sans">
                      &quot;In October 2026, client campaigns achieved a 34.2% increase in organic search traffic, driven by technical Next.js SEO architecture and Core Web Vitals optimizations. Engineering deliverables hit 100% milestone acceptance with 142 billable hours executed on scope.&quot;
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "pdf" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h4 className="text-base font-bold text-white">Whitelabel Client PDF Export</h4>
                      <button className="px-2.5 py-1 rounded bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
                        <Download size={12} /> Download PDF
                      </button>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <strong className="text-white block text-sm">Northstar Monthly Performance — Oct 2026.pdf</strong>
                        <span className="text-xs text-slate-400">12 Pages · High-Resolution Vector Charts</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                        READY
                      </span>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "schedules" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <h4 className="text-base font-bold text-white mb-1">Automated Delivery Scheduler</h4>
                    <p className="text-xs text-slate-400 mb-4">Recurring cron dispatches reports directly to client stakeholders.</p>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium block">Client CFO Monthly Digest</span>
                        <span className="text-slate-400 text-[11px]">1st of every month at 09:00 UTC</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                        CRON ACTIVE
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -------------------- 4. PRODUCTIVITY TRACKER SCREENS -------------------- */}
            {project.slug === "productivity-tracker" && (
              <div className="space-y-4">
                {currentChapter.screenType === "dashboard" && (
                  <div className="rounded-xl border border-emerald-500/30 bg-slate-900/90 p-6 max-w-lg mx-auto shadow-xl text-center">
                    <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block mb-2">
                      Python / FastAPI Live Telemetry
                    </span>
                    <div className="w-24 h-24 rounded-full mx-auto border-4 border-emerald-500 flex flex-col items-center justify-center my-3 bg-emerald-500/10 shadow-lg shadow-emerald-500/20">
                      <strong className="text-3xl font-bold text-white font-mono">88</strong>
                      <span className="text-[10px] text-emerald-400 uppercase font-semibold">Focus Score</span>
                    </div>
                    <strong className="text-white block text-base mt-2">Active: Visual Studio Code</strong>
                    <span className="text-xs text-slate-400">Status: Deep Work (Session: 1h 44m)</span>
                  </div>
                )}

                {currentChapter.screenType === "breakdown" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <h4 className="text-base font-bold text-white mb-1">Application Usage Breakdown</h4>
                    <p className="text-xs text-slate-400 mb-4">Classifies background applications into productive and distracted.</p>
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Visual Studio Code</span>
                          <span className="text-emerald-400 font-mono">4h 12m (64%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[64%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Windows PowerShell &amp; Git</span>
                          <span className="text-teal-400 font-mono">1h 15m (18%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-teal-500 w-[18%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Chrome (Technical Docs)</span>
                          <span className="text-cyan-400 font-mono">1h 05m (15%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-cyan-500 w-[15%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "analytics" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <h4 className="text-base font-bold text-white mb-1">Daily Focus Score Curve</h4>
                    <p className="text-xs text-slate-400 mb-4">Mathematical weighted scoring of uninterrupted focus blocks.</p>
                    <div className="h-28 rounded-lg bg-black/50 border border-white/10 p-3 flex items-end justify-between gap-1">
                      {[75, 82, 89, 94, 91, 88, 85, 92, 96, 88].map((score, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t bg-emerald-500 transition-all duration-300 hover:bg-emerald-400"
                            style={{ height: `${score}%` }}
                            title={`Hour ${i + 9}:00 - Score: ${score}`}
                          />
                          <span className="text-[9px] text-slate-500 font-mono">{i + 9}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "api" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h4 className="text-sm font-bold text-white">FastAPI Interactive Swagger (/docs)</h4>
                      <span className="text-[11px] text-emerald-400 font-mono">127.0.0.1:8000/api/stats</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-emerald-400">
                      <pre>{`GET /api/stats -> HTTP 200 OK
{
  "focus_score": 88,
  "active_window": "Visual Studio Code",
  "category": "Deep Work",
  "total_active_seconds": 24120
}`}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -------------------- 5. E-COMMERCE STOREFRONT SCREENS -------------------- */}
            {project.slug === "ecommerce-storefront" && (
              <div className="space-y-4">
                {currentChapter.screenType === "catalog" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-900/50 to-slate-900 border border-emerald-500/30 mb-4">
                      <span className="text-xs text-emerald-400 font-bold uppercase">Autumn Collection</span>
                      <h4 className="text-lg font-bold text-white">Engineering Workspace Hardware</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {["Ergonomic Chair ($389)", "Mechanical Keyboard ($149)", "Ultra-wide Monitor ($649)", "USB-C Hub ($49)"].map((item, i) => (
                        <div key={i} className="p-2.5 rounded bg-black/40 border border-white/10 text-center">
                          <span className="block text-slate-200 font-medium truncate">{item.split(" (")[0]}</span>
                          <span className="text-emerald-400 font-mono text-[11px] font-bold">({item.split(" (")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "filter" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <h4 className="text-base font-bold text-white mb-3">Faceted Category &amp; Price Filtering</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded bg-black/40 border border-white/10">
                        <span className="text-slate-400 block mb-1">Price Filter</span>
                        <strong className="text-emerald-400 font-mono">$50 - $400 Range</strong>
                      </div>
                      <div className="p-3 rounded bg-black/40 border border-white/10">
                        <span className="text-slate-400 block mb-1">Customer Reviews</span>
                        <strong className="text-amber-400 font-mono">★★★★☆ &amp; Up</strong>
                      </div>
                      <div className="p-3 rounded bg-black/40 border border-white/10">
                        <span className="text-slate-400 block mb-1">Availability</span>
                        <strong className="text-white">In Stock (Next-Day Delivery)</strong>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.screenType === "detail" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <h4 className="text-base font-bold text-white mb-2">Ergonomic Developer Chair</h4>
                    <span className="text-emerald-400 font-mono text-lg font-bold block mb-3">$389.00</span>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      High-density lumbar support engineered for prolonged developer sessions with breathable mesh.
                    </p>
                    <button className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                      <ShoppingBag size={14} /> Add to Cart — Free Shipping
                    </button>
                  </div>
                )}

                {currentChapter.screenType === "cart" && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h4 className="text-base font-bold text-white">Shopping Cart &amp; Checkout Review</h4>
                      <span className="text-xs text-emerald-400 font-mono font-bold">Coupon NORTHSTAR (-15%) Applied</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded bg-black/40 border border-white/10 text-xs mb-3">
                      <span className="text-white">Subtotal (2 Items)</span>
                      <strong className="text-white font-mono">$538.00</strong>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs">
                      <span className="text-emerald-300">Final Order Total</span>
                      <strong className="text-emerald-400 font-mono text-sm">$457.30</strong>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Floating Live Voiceover Subtitle Banner */}
          <div className="relative z-20 my-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 backdrop-blur-md shadow-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-slate-300 leading-snug">
                <strong className="text-emerald-400">Step {activeChapterIndex + 1}:</strong> {currentChapter.description}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0 hidden sm:inline">
              {currentChapter.pageName}
            </span>
          </div>

          {/* Bottom Video Progress Scrubber & Controls */}
          <div
            className="relative z-10 pt-2 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrubber Bar */}
            <div
              className="w-full h-2 rounded-full bg-slate-800 relative cursor-pointer group/bar overflow-hidden mb-3"
              onClick={handleProgressBarClick}
              title="Click to seek"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                  aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  type="button"
                  onClick={() => seekTo(0, 0)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Restart walkthrough"
                  title="Restart from beginning"
                >
                  <RotateCcw size={14} />
                </button>

                <span className="font-mono text-[11px] text-slate-400">
                  <strong className="text-white">{formatTime(currentSeconds)}</strong> / {formatTime(totalSeconds)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSpeed(speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1)}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/15 text-[11px] font-mono text-white transition-colors"
                  title="Playback Speed"
                >
                  {speed}x
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Website Page Chapter Navigators */}
      {demo?.chapters && demo.chapters.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--agency-muted)" }}>
              Website Pages &amp; Product Screens Walkthrough ({demo.chapters.length})
            </span>
            <span className="text-xs" style={{ color: "var(--agency-muted)" }}>
              Click any page to jump
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {demo.chapters.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => seekTo(ch.seconds, idx)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-emerald-500 shadow-lg -translate-y-0.5"
                      : "hover:-translate-y-0.5 hover:border-emerald-500/50"
                  }`}
                  style={{
                    backgroundColor: isActive ? "rgba(16, 185, 129, 0.12)" : "var(--agency-card-bg)",
                    borderColor: isActive ? "var(--agency-lime)" : "var(--agency-card-border)",
                  }}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className="font-mono font-bold text-[10px]"
                      style={{ color: isActive ? "var(--agency-lime)" : "var(--agency-muted)" }}
                    >
                      {ch.time}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--agency-lime)" }} />
                    )}
                  </div>
                  <strong className="block text-xs font-semibold leading-snug line-clamp-1" style={{ color: "var(--agency-ink)" }}>
                    {ch.pageName}
                  </strong>
                  <p className="text-[10px] mt-1 line-clamp-2 leading-relaxed" style={{ color: "var(--agency-copy)" }}>
                    {ch.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
