// src/components/Logo.jsx

export default function Logo({ className }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* The SVG Logo */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <rect width="32" height="32" rx="8" fill="#4F46E5" />
        <path
          d="M12.5 22V10H19.5C21.433 10 23 11.567 23 13.5C23 15.433 21.433 17 19.5 17H16"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17L19.5 22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* The Brand Name */}
      <span className="text-lg font-extrabold tracking-tight text-slate-900">
        Skill<span className="text-indigo-600">Grow</span>
      </span>
    </div>
  );
}
