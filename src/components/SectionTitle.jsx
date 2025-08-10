export default function SectionTitle({ title, subtitle, align = "left", className = "" }) {
  return (
    <div className={`mb-8 sm:mb-10 ${align === "center" ? "text-center" : align === "right" ? "text-right" : ""} ${className}`}>
      {subtitle && (
        <p className="text-brand-600 font-medium mb-2 text-sm sm:text-base">
          {subtitle}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
    </div>
  )
}
