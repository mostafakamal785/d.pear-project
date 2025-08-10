import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Item({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        "px-3 py-2 rounded-pill text-sm font-medium transition-colors " +
        (isActive
          ? "bg-brand-600 text-white"
          : "text-slate-700 hover:text-slate-900 hover:bg-slate-200/70")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="container-x h-16 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-600" />
          <span className="text-lg font-extrabold tracking-tight">
            Skill<span className="text-brand-600">Grow</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 ml-8">
          <Item to="/" label="Home" />
          <Item to="/courses" label="Courses" />
          <Item to="/about" label="About" />
          <Item to="/contact" label="Contact" />
        </nav>

        {/* Desktop Buttons */}
        <div className="ml-auto hidden sm:flex items-center gap-2">
          <Link to="/courses" className="btn-outline h-10">
            Browse
          </Link>
          <a href="#cta" className="btn-primary h-10">
            Enroll
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="ml-auto md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg transition-colors hover:bg-slate-200"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <FiX size={24} className="text-brand-600" />
          ) : (
            <FiMenu size={24} className="text-brand-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="container-x py-3 grid gap-2">
            <Item to="/" label="Home" onClick={() => setOpen(false)} />
            <Item to="/courses" label="Courses" onClick={() => setOpen(false)} />
            <Item to="/about" label="About" onClick={() => setOpen(false)} />
            <Item to="/contact" label="Contact" onClick={() => setOpen(false)} />
            <div className="flex gap-2 pt-2">
              <Link to="/courses" className="btn-outline h-10 flex-1" onClick={() => setOpen(false)}>
                Browse
              </Link>
              <a href="#cta" className="btn-primary h-10 flex-1" onClick={() => setOpen(false)}>
                Enroll
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
