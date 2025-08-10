export default function Section({ title, subtitle, children, className = "", center = false }) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="container-x">
        <div className={`mb-8 sm:mb-10 ${center ? "text-center" : ""}`}>
          {subtitle && (
            <p className="text-brand-600 font-medium mb-2 text-sm sm:text-base">
              {subtitle}
            </p>
          )}
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}
