"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  FastForward,
  Layers,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { selectedProjects } from "@/lib/agency";

type Project = (typeof selectedProjects)[number];

export function ProductVideoPlayer({ project }: { project: Project }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);

  const demo = project.demoVideo;
  const totalSeconds = demo?.totalSeconds || 180;

  // Simulation timer
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
          // Determine active chapter
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
    description: project.description,
  };

  const progressPercent = Math.min(100, (currentSeconds / totalSeconds) * 100);

  return (
    <div className="agency-video-showcase my-12" ref={playerRef}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: isPlaying ? "var(--agency-lime)" : "var(--agency-muted)",
              boxShadow: isPlaying ? "0 0 10px var(--agency-lime)" : "none",
            }}
          />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--agency-lime)" }}>
            {demo?.badge || "Interactive Video Walkthrough"}
          </span>
          <span style={{ color: "var(--agency-muted)" }}>·</span>
          <span className="text-xs" style={{ color: "var(--agency-muted)" }}>
            1080p 60FPS · {demo?.duration || "3:00"}
          </span>
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
          style={{ color: "var(--agency-lime)" }}
        >
          {project.liveLinkLabel} <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Main Video Monitor */}
      <div
        className="rounded-2xl border overflow-hidden shadow-2xl relative"
        style={{
          borderColor: "var(--agency-card-border)",
          backgroundColor: "#060911",
        }}
      >
        {/* Browser / Device Window Chrome */}
        <div
          className="px-4 py-3 flex items-center justify-between text-xs font-mono select-none border-b"
          style={{
            backgroundColor: "#0b1120",
            borderColor: "rgba(255, 255, 255, 0.08)",
            color: "#94a3b8",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-medium text-[11px] text-slate-300">
              {project.name} — {currentChapter.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              HD READY
            </span>
            <span className="hidden sm:inline text-slate-500">northstar-stream://live</span>
          </div>
        </div>

        {/* Dynamic Video Stage Screen */}
        <div
          className="relative min-h-[340px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-8 cursor-pointer select-none group"
          onClick={togglePlay}
          style={{
            background:
              project.slug === "aetherdesk"
                ? "radial-gradient(ellipse at 50% 30%, #0f2338 0%, #060911 85%)"
                : project.slug === "productivity-tracker"
                ? "radial-gradient(ellipse at 50% 30%, #172a24 0%, #060911 85%)"
                : project.slug === "report-iq"
                ? "radial-gradient(ellipse at 50% 30%, #201736 0%, #060911 85%)"
                : "radial-gradient(ellipse at 50% 30%, #152238 0%, #060911 85%)",
          }}
        >
          {/* Subtle Grid Canvas Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#38bdf8 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Stage Indicators */}
          <div className="relative z-10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white border border-white/15 backdrop-blur-md">
                Chapter {activeChapterIndex + 1} of {demo?.chapters.length || 4}
              </span>
              <span className="text-emerald-400 font-mono text-[11px] hidden sm:inline">
                {currentChapter.time}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">
                {isPlaying ? "SIMULATING LIVE TELEMETRY" : "PAUSED"}
              </span>
            </div>
          </div>

          {/* Center Stage: Interactive Product Visual Simulation */}
          <div className="relative z-10 my-auto text-center max-w-xl mx-auto py-6">
            {/* Play Button Overlay (visible on pause or hover) */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center transition-all duration-300 shadow-2xl ${
                isPlaying
                  ? "opacity-0 group-hover:opacity-90 bg-slate-900/80 text-emerald-400 border border-emerald-500/40"
                  : "opacity-100 bg-emerald-500 text-slate-950 scale-105 hover:scale-110 shadow-emerald-500/40"
              }`}
            >
              {isPlaying ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
            </div>

            <div className="mt-6">
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {currentChapter.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                {currentChapter.description}
              </p>
            </div>

            {/* Dynamic Telemetry Simulation Widget based on Project */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              {project.slug === "aetherdesk" && (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <Activity size={14} className={isPlaying ? "animate-pulse" : ""} /> Tray Sync: 60s Interval
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Privacy Mask: Active
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    AES-256-GCM Encrypted
                  </span>
                </>
              )}

              {project.slug === "productivity-tracker" && (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <Cpu size={14} className={isPlaying ? "animate-spin" : ""} /> Focus Score: {isPlaying ? "88/100" : "84/100"}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Classification: Deep Work
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    FastAPI · 127.0.0.1:8000
                  </span>
                </>
              )}

              {project.slug === "report-iq" && (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                    <Sparkles size={14} /> AI Synthesis: Executive Summary
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    GA4 &amp; Hours Synchronized
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    Whitelabel PDF Engine
                  </span>
                </>
              )}

              {project.slug === "bug-tracker" && (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                    <Layers size={14} /> Sprint: Sprint 42 Active
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Tenant Isolation: Verified
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    297 Unit Tests Passing
                  </span>
                </>
              )}

              {project.slug === "ecommerce-storefront" && (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Storefront Catalog
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    Cart State &amp; Checkout Flow
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Bottom Bar Controls inside the player */}
          <div
            className="relative z-10 pt-4 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrubber / Progress Bar */}
            <div
              className="w-full h-2 rounded-full bg-slate-800 relative cursor-pointer group/bar overflow-hidden mb-3"
              onClick={handleProgressBarClick}
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
                  aria-label={isPlaying ? "Pause demo" : "Play demo"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  type="button"
                  onClick={() => seekTo(0, 0)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Restart walkthrough"
                  title="Restart"
                >
                  <RotateCcw size={14} />
                </button>

                <span className="font-mono text-[11px] text-slate-400">
                  <strong className="text-white">{formatTime(currentSeconds)}</strong> / {formatTime(totalSeconds)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Speed selector */}
                <button
                  type="button"
                  onClick={() => setSpeed(speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1)}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/15 text-[11px] font-mono text-white transition-colors"
                  title="Playback Speed"
                >
                  {speed}x
                </button>

                {/* Mute button */}
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

      {/* Chapter Navigation Milestones */}
      {demo?.chapters && demo.chapters.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--agency-muted)" }}>
              Video Highlights &amp; Chapters ({demo.chapters.length})
            </span>
            <span className="text-xs" style={{ color: "var(--agency-muted)" }}>
              Click any timestamp to jump
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {demo.chapters.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => seekTo(ch.seconds, idx)}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-emerald-500 shadow-md -translate-y-0.5"
                      : "hover:-translate-y-0.5 hover:border-emerald-500/50"
                  }`}
                  style={{
                    backgroundColor: isActive ? "rgba(16, 185, 129, 0.12)" : "var(--agency-card-bg)",
                    borderColor: isActive ? "var(--agency-lime)" : "var(--agency-card-border)",
                  }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className="font-mono font-bold text-[11px]"
                      style={{ color: isActive ? "var(--agency-lime)" : "var(--agency-muted)" }}
                    >
                      {ch.time}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--agency-lime)" }} />
                    )}
                  </div>
                  <strong className="block text-xs font-semibold leading-snug" style={{ color: "var(--agency-ink)" }}>
                    {ch.title}
                  </strong>
                  <p className="text-[11px] mt-1 line-clamp-2 leading-relaxed" style={{ color: "var(--agency-copy)" }}>
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
