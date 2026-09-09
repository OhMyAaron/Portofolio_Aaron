/* Kumpulan ikon SVG inline — tidak perlu library ikon tambahan. */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowUp = (p) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const Download = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
  </svg>
)

export const Mail = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const Copy = (p) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </svg>
)

export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="m5 13 4 4L19 7" />
  </svg>
)

export const Github = (p) => (
  <svg {...base} {...p}>
    <path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.05-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.45 2.8 5.4 3.1 5.4 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)

export const Linkedin = (p) => (
  <svg {...base} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8Z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export const Instagram = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
)

export const Youtube = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="5" width="20" height="14" rx="4.5" />
    <path d="m10.4 9.2 4.8 2.8-4.8 2.8z" fill="currentColor" stroke="none" />
  </svg>
)

export const Whatsapp = (p) => (
  <svg {...base} {...p}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3.5 20.4l1.6-4.9a8.4 8.4 0 1 1 15.4-3.9Z" />
    <path d="M9 9.6c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.5 1.3c.1.2 0 .3-.1.5l-.3.4c-.1.1-.1.3 0 .4.5 1 1.3 1.7 2.3 2.2.2.1.3 0 .4-.1l.4-.5c.1-.2.3-.2.5-.1l1.2.6c.2.1.3.2.3.4 0 .5-.3 1-.9 1.2-.6.2-1.5 0-2.9-.8a7.7 7.7 0 0 1-2.9-3.1c-.6-1-.6-1.9-.4-2.4Z" />
  </svg>
)

export const Code = (p) => (
  <svg {...base} {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
  </svg>
)

export const Palette = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.3-9-7.3Z" />
    <circle cx="7.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="8.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const Users = (p) => (
  <svg {...base} {...p}>
    <path d="M15.5 20v-1.6a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.4V20" />
    <circle cx="9.2" cy="7.4" r="3.4" />
    <path d="M21 20v-1.6a3.6 3.6 0 0 0-2.7-3.5M15.8 4.2a3.6 3.6 0 0 1 0 6.9" />
  </svg>
)

export const Globe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
  </svg>
)

export const Layout = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M3 9h18M9 21V9" />
  </svg>
)

export const Server = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="7" rx="2" />
    <rect x="3" y="14" width="18" height="7" rx="2" />
    <path d="M7 6.5h.01M7 17.5h.01" />
  </svg>
)

export const Database = (p) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </svg>
)

export const Tool = (p) => (
  <svg {...base} {...p}>
    <path d="M14.7 6.3a4 4 0 0 1 5.3 5L21 12l-9 9-3-3 9-9-1.3-1.3a4 4 0 0 1-2-1.4Z" />
    <path d="M6 18h.01" />
  </svg>
)

export const Sparkle = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
  </svg>
)

