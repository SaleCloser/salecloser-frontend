import { useEffect, useState } from "react";

type DotSize = "sm" | "md" | "lg";

interface MessageDotProps {
  delay: number;
  x: number;
  y: number;
  size?: DotSize;
}

interface FloatingBubbleProps {
  delay: number;
  x: number;
  width: number;
}

const messages: string[] = [
  "Provjera autentifikacije...",
  "Učitavanje vaših poruka...",
  "Spajanje na inbox...",
  "Priprema AI asistenta...",
];

const MessageDot = ({ delay, x, y, size = "sm" }: MessageDotProps) => {
  const sizes: Record<DotSize, string> = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div
      className={`absolute rounded-full opacity-0 ${sizes[size]}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "oklch(71.4% .203 305.504)",
        animation: `float-dot 3s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

const FloatingBubble = ({ delay, x, width }: FloatingBubbleProps) => (
  <div
    className="absolute h-2 rounded-full bg-white opacity-0"
    style={{
      left: `${x}%`,
      top: `${20 + Math.random() * 60}%`,
      width: `${width}px`,
      animation: `bubble-float 4s ease-in-out ${delay}s infinite`,
    }}
  />
);

export default function PageLoader() {
  const [msgIndex, setMsgIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes float-dot {
          0%, 100% { opacity: 0; transform: translateY(0px) scale(0.8); }
          50% { opacity: 0.7; transform: translateY(-12px) scale(1); }
        }

        @keyframes bubble-float {
          0%, 100% { opacity: 0; transform: translateX(0px); }
          30% { opacity: 0.15; }
          50% { opacity: 0.08; transform: translateX(8px); }
          70% { opacity: 0.15; }
        }

        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-ring-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }

        @keyframes msg-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes msg-fade-out {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-6px); }
        }

        @keyframes bar-grow {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        @keyframes bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        :root {
          --c-light:  oklch(71.4% .203 305.504);
          --c-mid:    oklch(62.7% .265 303.9);
          --c-deep:   oklch(55.8% .288 302.321);
          --c-darker: oklch(30% .18 303);
          --c-bg1:    oklch(12% .06 305);
          --c-bg2:    oklch(16% .09 304);
        }

        @keyframes noise-flicker {
          0%, 100% { opacity: 0.025; }
          50% { opacity: 0.045; }
        }

        .loader-font-display { font-family: 'Syne', sans-serif; }
        .loader-font-body { font-family: 'DM Sans', sans-serif; }

        .ring-outer {
          animation: spin-ring 8s linear infinite;
        }
        .ring-inner {
          animation: spin-ring-reverse 5s linear infinite;
        }
        .core-pulse {
          animation: pulse-core 2.4s ease-in-out infinite;
        }
        .bg-animated {
          background: linear-gradient(-45deg, oklch(10% .06 305), oklch(15% .10 304), oklch(11% .07 306), oklch(8% .05 303));
          background-size: 400% 400%;
          animation: bg-shift 10s ease infinite;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: noise-flicker 3s ease-in-out infinite;
        }

        .progress-bar {
          animation: bar-grow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .shimmer-line::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-animated relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        {/* Noise texture overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-3 mix-blend-overlay" />

        {/* Background glow orbs */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(62.7% .265 303.9) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(71.4% .203 305.504) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Floating message bubbles (decorative) */}
        <FloatingBubble delay={0} x={8} width={60} />
        <FloatingBubble delay={1.2} x={12} width={90} />
        <FloatingBubble delay={0.6} x={75} width={70} />
        <FloatingBubble delay={1.8} x={80} width={50} />
        <FloatingBubble delay={2.4} x={70} width={110} />

        {/* Floating dots */}
        <MessageDot delay={0} x={20} y={25} />
        <MessageDot delay={0.8} x={75} y={20} size="md" />
        <MessageDot delay={1.6} x={85} y={70} />
        <MessageDot delay={0.4} x={15} y={72} size="md" />
        <MessageDot delay={1.2} x={50} y={15} size="lg" />
        <MessageDot delay={2.0} x={60} y={80} />

        {/* Main loader card */}
        <div className="relative z-10 flex flex-col items-center gap-10">
          {/* Spinner rings + core icon */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Outer ring */}
            <div
              className="ring-outer absolute inset-0 rounded-full border"
              style={{
                borderColor:
                  "color-mix(in oklch, oklch(62.7% .265 303.9) 30%, transparent)",
                borderTopColor: "oklch(71.4% .203 305.504)",
              }}
            />
            {/* Mid ring */}
            <div
              className="ring-inner absolute rounded-full border"
              style={{
                inset: "10px",
                borderColor:
                  "color-mix(in oklch, oklch(71.4% .203 305.504) 20%, transparent)",
                borderBottomColor: "oklch(71.4% .203 305.504)",
              }}
            />
            {/* Inner ring */}
            <div
              className="ring-outer absolute rounded-full border"
              style={{
                inset: "20px",
                animationDuration: "3s",
                borderColor:
                  "color-mix(in oklch, oklch(55.8% .288 302.321) 20%, transparent)",
                borderLeftColor: "oklch(62.7% .265 303.9)",
              }}
            />

            {/* Core */}
            <div
              className="core-pulse relative flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(55.8% .288 302.321) 0%, oklch(45% .26 303) 50%, oklch(38% .22 304) 100%)",
                boxShadow:
                  "0 0 30px color-mix(in oklch, oklch(62.7% .265 303.9) 50%, transparent), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Inbox icon (SVG) */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6l-10 7L2 6"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* AI spark indicator */}
              <div
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(71.4% .203 305.504), oklch(62.7% .265 303.9))",
                  fontSize: "9px",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  boxShadow:
                    "0 0 8px color-mix(in oklch, oklch(71.4% .203 305.504) 80%, transparent)",
                }}
              >
                AI
              </div>
            </div>
          </div>

          {/* Brand name */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="loader-font-display text-5xl font-extrabold tracking-tight text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Sale
              <span style={{ color: "oklch(71.4% .203 305.504)" }}>Closer</span>
            </span>
            <span
              className="loader-font-body text-md font-light uppercase tracking-widest"
              style={{
                color:
                  "color-mix(in oklch, oklch(71.4% .203 305.504) 60%, transparent)",
              }}
            >
              AI Inbox · 24/7
            </span>
          </div>

          {/* Rotating status message */}
          <div className="flex h-6 items-center justify-center">
            <span
              className="loader-font-body text-sm font-medium"
              style={{
                color:
                  "color-mix(in oklch, oklch(71.4% .203 305.504) 70%, white)",
                animation: visible
                  ? "msg-fade-in 0.4s ease forwards"
                  : "msg-fade-out 0.4s ease forwards",
              }}
            >
              {messages[msgIndex]}
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-px w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="shimmer-line progress-bar relative h-full rounded-full"
              style={{
                background:
                  "linear-gradient(to right, oklch(55.8% .288 302.321), oklch(71.4% .203 305.504), oklch(62.7% .265 303.9))",
              }}
            />
          </div>
        </div>

        {/* Bottom corner label */}
        <div
          className="loader-font-body absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-white/20"
          style={{ letterSpacing: "0.08em" }}
        >
          © {new Date().getFullYear()} SaleCloser · Živinice, BiH
        </div>
      </div>
    </>
  );
}
