'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Delete,
} from 'lucide-react';

interface AdminLoginFormProps {
  accessKey?: string;
  redirectTo?: string;
}

const PIN_LENGTH = 6;
const DIGIT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// Pad layout rows
const PAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
];

export default function AdminLoginForm({ accessKey, redirectTo }: AdminLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [blockedFor, setBlockedFor] = useState<number | null>(null);
  const [blockedCountdown, setBlockedCountdown] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const submittedRef = useRef(false);

  const loadCsrfToken = useCallback(async () => {
    try {
      const response = await fetch('/api/rcpanel7x/csrf', { credentials: 'include' });
      const data = await response.json();
      setCsrfToken(data.csrfToken ?? '');
    } catch {
      setError('Failed to load session. Please refresh the page.');
    }
  }, []);

  // ── Fetch CSRF token on mount ──────────────────────────────
  useEffect(() => {
    loadCsrfToken();
  }, [loadCsrfToken]);

  // ── Blocked countdown timer ─────────────────────────────
  useEffect(() => {
    if (!blockedFor) return;
    setBlockedCountdown(blockedFor);

    const interval = setInterval(() => {
      setBlockedCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setBlockedFor(null);
          setError('');
          // Re-fetch CSRF token after block expires
          loadCsrfToken().catch(() => {});
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedFor, loadCsrfToken]);

  // ── Keyboard input ──────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || success || blockedFor) return;
      if (DIGIT_KEYS.includes(e.key) && pin.length < PIN_LENGTH) {
        setPin((prev) => [...prev, e.key]);
      } else if (e.key === 'Backspace') {
        setPin((prev) => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        setPin([]);
        setError('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, loading, success, blockedFor]);

  // ── Auto-submit when 6 digits entered ──────────────────
  useEffect(() => {
    if (pin.length === PIN_LENGTH && !submittedRef.current) {
      submittedRef.current = true;
      handleSubmit(pin.join(''));
    }
    if (pin.length < PIN_LENGTH) {
      submittedRef.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const handlePadPress = useCallback(
    (key: string) => {
      if (loading || success || blockedFor) return;
      if (key === '⌫') {
        setPin((prev) => prev.slice(0, -1));
        setError('');
      } else if (DIGIT_KEYS.includes(key) && pin.length < PIN_LENGTH) {
        setPin((prev) => [...prev, key]);
      }
    },
    [loading, success, blockedFor, pin.length]
  );

  const handleSubmit = useCallback(
    async (pinValue: string) => {
      if (!csrfToken) {
        setError('Invalid session. Please refresh the page.');
        setPin([]);
        submittedRef.current = false;
        return;
      }

      setError('');
      setLoading(true);

      try {
        const fallbackRedirect =
          redirectTo || searchParams.get('redirect') || '/rcpanel7x';

        const response = await fetch('/api/rcpanel7x/login', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pin: pinValue,
            csrfToken,
            accessKey: accessKey ?? '',
          }),
        });

        const data = await response.json().catch(() => ({})) as {
          ok?: boolean;
          error?: string;
          remainingAttempts?: number;
          blockedFor?: number;
        };

        if (!response.ok) {
          if (data.remainingAttempts !== undefined) {
            setRemainingAttempts(data.remainingAttempts);
          }
          if (data.blockedFor) {
            setBlockedFor(data.blockedFor);
          }
          if (response.status === 403 || data.error?.includes('CSRF')) {
            await loadCsrfToken();
          }
          throw new Error(data.error || 'Login failed');
        }

        setSuccess(true);
        await router.push(fallbackRedirect);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
        setPin([]);
        submittedRef.current = false;
      } finally {
        setLoading(false);
      }
    },
    [csrfToken, redirectTo, searchParams, accessKey, router, loadCsrfToken]
  );

  const formatCountdown = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_rgba(201,151,43,0.18),_transparent_65%),linear-gradient(145deg,_#09090b_0%,_#0f0f13_100%)] px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="relative rounded-2xl border border-gold/20 bg-zinc-900/80 p-8 shadow-[0_0_80px_rgba(201,151,43,0.07)] backdrop-blur-md">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gold/10" />

          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-500 ${
                success
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-gold/30 bg-gold/10 text-gold'
              }`}
            >
              {success ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : (
                <ShieldCheck className="h-8 w-8" />
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Private Access
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-parchment-100">
              Admin Panel
            </h1>
            <p className="mt-2 text-xs text-zinc-500">
              Enter the 6-digit PIN to continue
            </p>
          </div>

          {/* PIN Display */}
          <div className="mb-6 flex items-center justify-center gap-3">
            {Array.from({ length: PIN_LENGTH }).map((_, i) => {
              const filled = i < pin.length;
              const isCurrent = i === pin.length;
              return (
                <div
                  key={i}
                  className={`
                    h-3 w-3 rounded-full border-2 transition-all duration-200
                    ${filled
                      ? 'scale-110 border-gold bg-gold shadow-[0_0_8px_rgba(201,151,43,0.6)]'
                      : isCurrent && !loading
                      ? 'scale-105 border-gold/60 bg-transparent animate-pulse'
                      : 'border-zinc-600 bg-transparent'
                    }
                    ${success ? 'border-emerald-400 bg-emerald-400' : ''}
                    ${loading ? 'opacity-60' : ''}
                  `}
                />
              );
            })}
          </div>

          {/* Status Messages */}
          <div className="mb-5 min-h-[40px] flex items-center justify-center">
            {loading && (
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-gold" />
                Verifying...
              </div>
            )}
            {success && (
              <p className="text-sm font-medium text-emerald-400">✓ Access granted</p>
            )}
            {blockedFor && blockedCountdown !== null && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-400">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Locked — try again in {formatCountdown(blockedCountdown)}</span>
              </div>
            )}
            {error && !blockedFor && (
              <div className="flex items-center gap-2 text-sm text-rose-400">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {!loading && !error && !blockedFor && !success && remainingAttempts !== null && (
              <p className="text-xs text-amber-400">
                {remainingAttempts} attempts remaining
              </p>
            )}
          </div>

          {/* PIN Pad */}
          <div className="space-y-2">
            {PAD_ROWS.map((row, ri) => (
              <div key={ri} className="grid grid-cols-3 gap-2">
                {row.map((key, ki) => {
                  if (key === '') {
                    return <div key={ki} />;
                  }
                  const isBackspace = key === '⌫';
                  const disabled = loading || success || !!blockedFor;

                  return (
                    <button
                      key={ki}
                      type="button"
                      onClick={() => handlePadPress(key)}
                      disabled={disabled}
                      aria-label={isBackspace ? 'Delete digit' : `Digit ${key}`}
                      className={`
                        group relative flex h-14 items-center justify-center rounded-xl
                        border text-base font-medium
                        transition-all duration-150 select-none
                        ${disabled
                          ? 'cursor-not-allowed border-zinc-800 bg-zinc-900/40 text-zinc-700'
                          : isBackspace
                          ? 'border-zinc-700/50 bg-zinc-800/60 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-700/60 hover:text-zinc-200 active:scale-95'
                          : 'border-zinc-700/60 bg-zinc-800/70 text-parchment-100 hover:border-gold/30 hover:bg-zinc-800 hover:text-gold active:scale-95 active:border-gold/50 active:bg-zinc-700'
                        }
                      `}
                    >
                      {/* Subtle ripple overlay */}
                      <span
                        className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-75 bg-gold/5"
                        aria-hidden="true"
                      />
                      {isBackspace ? (
                        <Delete className="h-4 w-4" />
                      ) : (
                        key
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
            <KeyRound className="h-3 w-3" />
            <span>You can also type the PIN using your keyboard</span>
          </div>
        </div>

        {/* Bottom label */}
        <p className="mt-6 text-center text-[11px] text-zinc-700">
          Royyan Collectibles — Restricted Area
        </p>
      </div>
    </div>
  );
}
