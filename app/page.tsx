"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { LockedScreen } from "@/components/LockedScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { notifySession, subscribeSession } from "@/lib/sessionStore";

const RomanceExperience = dynamic(async () => {
  const mod = await import("@/components/RomanceExperience");
  return mod.RomanceExperience;
}, { ssr: false });

const ATTEMPTS_MAX = 5;
const COOLDOWN_MS = 30 * 1000;
const PASSWORD_HASH = "d9a5223b761c375d1263e6e57ebec42d3e0fe3f6f283488d2eb204fb6ff17ee5";

const ERROR_MESSAGES = [
  "That wasn't it... try again ❤️",
  "You know this one, I believe in you 🥺",
  "My heart is waiting...",
  "Almost there...",
  "Please don't give up on me ❤️"
];

async function sha256Hex(text: string) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hashBuffer);
  let hex = "";
  for (const b of bytes) hex += b.toString(16).padStart(2, "0");
  return hex;
}

function readSessionAuth() {
  return sessionStorage.getItem("journey_auth_ok") === "1";
}

function readSessionLockedUntil() {
  const lockedUntilStr = sessionStorage.getItem("journey_locked_until");
  const lockedUntilNum = lockedUntilStr ? Number(lockedUntilStr) : null;
  if (!lockedUntilNum || Number.isNaN(lockedUntilNum)) return null;
  return Date.now() < lockedUntilNum ? lockedUntilNum : null;
}

function readSessionAttempts() {
  const attemptsStr = sessionStorage.getItem("journey_attempts_left");
  const parsedAttempts = attemptsStr ? Number(attemptsStr) : ATTEMPTS_MAX;
  return Number.isNaN(parsedAttempts) ? ATTEMPTS_MAX : parsedAttempts;
}

export default function Home() {
  const sessionAuthed = useSyncExternalStore(subscribeSession, readSessionAuth, () => false);
  const sessionLockedUntil = useSyncExternalStore(subscribeSession, readSessionLockedUntil, () => null);
  const sessionAttempts = useSyncExternalStore(subscribeSession, readSessionAttempts, () => ATTEMPTS_MAX);
  const [lockOverride, setLockOverride] = useState<number | null | undefined>(undefined);
  const [attemptOverride, setAttemptOverride] = useState<number | undefined>(undefined);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingLock, setPendingLock] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const lockedUntil = lockOverride !== undefined ? lockOverride : sessionLockedUntil;
  const attemptsLeft = attemptOverride ?? sessionAttempts;

  const locked = useMemo(() => {
    if (!lockedUntil) return false;
    return now < lockedUntil;
  }, [lockedUntil, now]);

  const cooldownSecondsLeft = useMemo(() => {
    if (!lockedUntil) return 0;
    return Math.max(0, Math.ceil((lockedUntil - now) / 1000));
  }, [lockedUntil, now]);

  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const current = Date.now();
      setNow(current);
      if (current >= lockedUntil) {
        sessionStorage.removeItem("journey_locked_until");
        sessionStorage.setItem("journey_attempts_left", String(ATTEMPTS_MAX));
        setLockOverride(null);
        setAttemptOverride(undefined);
        notifySession();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const submitPassword = async (password: string) => {
    if (sessionAuthed || locked) return;
    if (errorOpen) return;
    if (password.length !== 4) return;

    const hash = await sha256Hex(password);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem("journey_auth_ok", "1");
      sessionStorage.setItem("journey_attempts_left", String(ATTEMPTS_MAX));
      sessionStorage.removeItem("journey_locked_until");
      setErrorOpen(false);
      setPendingLock(false);
      setAttemptOverride(undefined);
      setLockOverride(null);
      notifySession();
      return;
    }

    const nextAttempts = Math.max(0, attemptsLeft - 1);
    setAttemptOverride(nextAttempts);
    sessionStorage.setItem("journey_attempts_left", String(nextAttempts));
    notifySession();

    const msg = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
    setErrorMessage(msg);
    setErrorOpen(true);
    setPendingLock(nextAttempts <= 0);
  };

  const closeError = () => {
    setErrorOpen(false);
    if (!pendingLock) return;
    const until = Date.now() + COOLDOWN_MS;
    sessionStorage.setItem("journey_locked_until", String(until));
    setLockOverride(until);
    setPendingLock(false);
    notifySession();
  };

  if (locked) return <LockedScreen secondsLeft={cooldownSecondsLeft} />;
  if (sessionAuthed) return <RomanceExperience />;

  return (
    <LoginScreen
      attemptsLeft={attemptsLeft}
      errorOpen={errorOpen}
      errorMessage={errorMessage}
      disabled={locked || errorOpen}
      onSubmitPassword={submitPassword}
      onCloseError={closeError}
    />
  );
}
