const iconPaths = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.4" />
      <rect x="14" y="3" width="7" height="7" rx="1.4" />
      <rect x="3" y="14" width="7" height="7" rx="1.4" />
      <rect x="14" y="14" width="7" height="7" rx="1.4" />
    </>
  ),
  briefcase: (
    <>
      <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7" />
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M4 12h16" />
      <path d="M10 12v1.5h4V12" />
    </>
  ),
  workspace: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v5l-5 5" />
      <path d="M12 12l5 5" />
    </>
  ),
  file: (
    <>
      <path d="M7 3h6l4 4v14H7z" />
      <path d="M13 3v5h5" />
      <path d="M9.5 13h5" />
      <path d="M9.5 17h5" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9.5a6 6 0 1 0-12 0c0 6-2 6.5-2 7.5h16c0-1-2-1.5-2-7.5" />
      <path d="M9.5 20a2.7 2.7 0 0 0 5 0" />
    </>
  ),
  moon: (
    <path d="M20 15.6A8.5 8.5 0 0 1 8.4 4 7 7 0 1 0 20 15.6z" />
  ),
  logOut: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  logIn: (
    <>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 13V9h4l9-4v12l-9-4z" />
      <path d="M8 13l1 6h3" />
      <path d="M19 9.5a3 3 0 0 1 0 3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.2l2.1 2.1 4.9-5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 15V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M4 8l8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M7 4h10v16H7z M10 17h4" />
  ),
  mapPin: (
    <>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="M16 16l4 4" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="M8 14h3" />
      <path d="M13 14h3" />
      <path d="M8 17h3" />
    </>
  ),
  filter: (
    <>
      <path d="M4 5h16l-6 7v5l-4 2v-7z" />
    </>
  ),
  heart: (
    <path d="M20.5 8.5c0 5.2-8.5 10.5-8.5 10.5S3.5 13.7 3.5 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20c1.4-4 4-6 7.5-6s6.1 2 7.5 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 20c1-3.5 3-5.2 5.5-5.2s4.5 1.7 5.5 5.2" />
      <path d="M14.5 15.5c2.5.2 4.4 1.7 5.8 4.5" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M16 9h2a2 2 0 0 1 2 2v10" />
      <path d="M8 7h4" />
      <path d="M8 11h4" />
      <path d="M8 15h4" />
      <path d="M3 21h18" />
    </>
  ),
  journal: (
    <>
      <path d="M6 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M8 8h7" />
      <path d="M8 12h6" />
      <path d="M8 16h5" />
    </>
  ),
  qrCode: (
    <>
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h2v2h-2z" />
      <path d="M18 14h2v2h-2z" />
      <path d="M14 18h2v2h-2z" />
      <path d="M18 18h2v2h-2z" />
    </>
  ),
}

export function Icon({ name, size = 20, className = '', strokeWidth = 2 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name] || iconPaths.dashboard}
    </svg>
  )
}
