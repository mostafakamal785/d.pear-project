import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import Logo from "./Logo";
function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
        <rect width="32" height="32" rx="8" fill="rgba(255, 255, 255, 0.2)" /> 
        <path d="M12.5 22V10H19.5C21.433 10 23 11.567 23 13.5C23 15.433 21.433 17 19.5 17H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17L19.5 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight text-white">
        Skill<span className="opacity-80">Grow</span>
      </span>
    </div>
  );
}


export default function Footer() {
  return (
    <footer className="mt-24 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container-x py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="space-y-4">
          <FooterLogo />
          <p className="text-white/80 max-w-sm leading-relaxed">
            Practical, project-based courses to help you learn faster and build real skills.
          </p>
        </div>

        {/* Pages + Contact */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-semibold mb-3">Pages</div>
            <ul className="space-y-2 text-white/80">
              {[
                { name: "Home", to: "/" },
                { name: "Courses", to: "/courses" },
                { name: "About", to: "/about" },
                { name: "Contact", to: "/contact" }
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white hover:underline transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Contact</div>
            <p className="text-white/80">mostafakamal78578@gmail.com</p>
            <p className="text-white/80">01096926586</p>
            <div className="mt-3 flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="justify-self-center lg:justify-self-end self-center text-white/80">
          <div className="text-sm font-medium">Payments accepted</div>
          <div className="mt-2 grid grid-cols-6 gap-2">
            <div className="h-6 w-10 rounded bg-white/10 flex items-center justify-center" title="Visa"><FaCcVisa /></div>
            <div className="h-6 w-10 rounded bg-white/10 flex items-center justify-center" title="Mastercard"><FaCcMastercard /></div>
            <div className="h-6 w-10 rounded bg-white/10 flex items-center justify-center" title="PayPal"><FaCcPaypal /></div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10">
        <div className="container-x py-6 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} SkillGrow — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
