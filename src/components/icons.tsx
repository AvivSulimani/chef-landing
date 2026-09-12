import type { ServiceId } from "@/lib/content";

const ink = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<ServiceId, React.ReactNode> = {
  tasting: (
    <>
      <circle cx="48" cy="50" r="20" />
      <circle cx="48" cy="50" r="12.5" />
      <path d="M20 24v11M25 24v11M15 24v11M20 35c-5 0-5-3-5-3M20 35c5 0 5-3 5-3M20 35v37" />
      <path d="M76 24c-5 4-6 12-6 17 0 4 2 6 6 6" />
      <path d="M76 24v48" />
    </>
  ),
  sharing: (
    <>
      <circle cx="48" cy="50" r="27" />
      <circle cx="48" cy="50" r="9" />
      <circle cx="48" cy="30" r="4.2" />
      <circle cx="68" cy="50" r="4.2" />
      <circle cx="48" cy="70" r="4.2" />
      <circle cx="28" cy="50" r="4.2" />
    </>
  ),
  weddings: (
    <>
      <circle cx="39" cy="57" r="16" />
      <circle cx="58" cy="57" r="16" />
      <path d="M44 30l4.5-7 4.5 7" />
      <path d="M44 30h9" />
    </>
  ),
  consulting: (
    <>
      <path d="M33 46c-7-2-12-9-12-16 0-9 8-16 17-15 4-6 16-6 20 0 9-1 17 6 17 15 0 7-5 14-12 16" />
      <path d="M33 46v24h30V46" />
      <path d="M33 60h30" />
    </>
  ),
  events: (
    <>
      <path d="M30 30h36c0 15-8 23-18 23s-18-8-18-23z" />
      <path d="M48 53v19" />
      <path d="M37 72h22" />
      <circle cx="40" cy="22" r="2.2" />
      <circle cx="54" cy="17" r="1.6" />
      <circle cx="47" cy="12" r="1.2" />
    </>
  ),
};

export function ServiceIcon({
  id,
  className,
}: {
  id: ServiceId;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" {...ink}>
      {paths[id]}
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l2.9 6.2 6.6.9-4.8 4.7 1.2 6.6L12 17.3 6.1 20.4l1.2-6.6L2.5 9.1l6.6-.9z" />
    </svg>
  );
}

export function Chevron({
  direction,
  className,
}: {
  direction: "start" | "end";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "start" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
    </svg>
  );
}

export function Burger({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 14"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path d="M0 1h22M0 7h22M0 13h22" />
    </svg>
  );
}

export function Close({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path d="M2 2l18 18M20 2L2 20" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} fill="none" stroke="currentColor" strokeWidth={1.1}>
      <circle cx="17" cy="17" r="16" />
      <rect x="10" y="10" width="14" height="14" rx="4" />
      <circle cx="17" cy="17" r="3.6" />
      <circle cx="21.4" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} fill="none" stroke="currentColor" strokeWidth={1.1}>
      <circle cx="17" cy="17" r="16" />
      <path d="M20 11h-2.2c-1.6 0-2.6 1-2.6 2.6V16H13v2.6h2.2V25h2.8v-6.4h2.2l.4-2.6h-2.6v-2c0-.5.3-.8.8-.8H20z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} fill="none" stroke="currentColor" strokeWidth={1.1}>
      <circle cx="17" cy="17" r="16" />
      <path d="M24 16.6a7 7 0 0 1-10.4 6.1L10 24l1.4-3.4A7 7 0 1 1 24 16.6z" strokeLinejoin="round" />
    </svg>
  );
}
