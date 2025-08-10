import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="mt-24 text-white bg-gradient-to-br from-brand-900 via-brand-700 to-brand-900">
      <div className="container-x py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Logo + About */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/30"></div>
            <div className="text-2xl font-extrabold">SkillGrow</div>
          </div>
          <p className="text-white/90 max-w-sm leading-relaxed">
            Practical, project-based courses to help you learn faster and build real skills.
          </p>
        </div>

        {/* Pages + Contact */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-semibold mb-3">Pages</div>
            <ul className="space-y-2 text-white/90">
              {[
                { name: "Home", to: "/" },
                { name: "Courses", to: "/courses" },
                { name: "About", to: "/about" },
                { name: "Contact", to: "/contact" }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Contact</div>
            <p className="text-white/90">support@skillgrow.example</p>
            <div className="mt-3 flex gap-3">
              {["f", "▶", "◎"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="lg:justify-self-end self-center text-white/90">
          <div className="text-sm font-medium">Payments accepted</div>
          <div className="mt-2 grid grid-cols-6 gap-2 max-w-[220px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-6 w-10 rounded bg-white/25"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-10">
        <div className="container-x py-6 text-center text-white/80 text-sm">
          © {new Date().getFullYear()} SkillGrow — All rights reserved.
        </div>
      </div>
    </footer>
  )
}
