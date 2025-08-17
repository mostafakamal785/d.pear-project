// src/components/Logo.jsx
import { images } from "../images";

export default function Logo({ variant = "primary", className }) {
  const logoSrc = variant === "footer" ? images.logo.footer : images.logo.primary;
  const textColor = variant === "footer" ? "text-white" : "text-slate-900";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logoSrc} alt="SkillGrow Logo" className="h-10 w-auto" />
      <span className={`text-lg font-extrabold tracking-tight ${textColor}`}>
        Skill<span className="text-indigo-500">Grow</span>
      </span>
    </div>
  );
}
