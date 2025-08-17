import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { getCurrentUser, logout } from "../lib/auth";
import Logo from "./Logo";

function Item({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
        (isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-700 hover:text-slate-900 hover:bg-slate-200/70")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setUser(getCurrentUser());
    window.addEventListener("authChanged", handler);
    return () => window.removeEventListener("authChanged", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="container-x h-16 flex items-center">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-8">
          <Item to="/" label="Home" />
          <Item to="/courses" label="Courses" />
          <Item to="/about" label="About" />
          <Item to="/contact" label="Contact" />
        </nav>

        <div className="ml-auto hidden sm:flex items-center gap-2">
          {user ? (
            <>
              <span className="font-medium text-sm">
                Hi, {user.name}
              </span>
              <Link to="/dashboard" className="btn-outline h-10">
                My Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-outline h-10">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline h-10">
                Login
              </Link>
              <Link to="/register" className="btn-primary h-10">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="ml-auto md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg transition-colors hover:bg-slate-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
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
           {user ? (
             <>
               <Item to="/dashboard" label="My Dashboard" onClick={() => setOpen(false)} />
               <button
                 onClick={() => {
                   handleLogout();
                   setOpen(false);
                 }}
                 className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200/70"
               >
                 Logout
               </button>
             </>
           ) : (
             <>
               <Item to="/login" label="Login" onClick={() => setOpen(false)} />
               <Item to="/register" label="Sign Up" onClick={() => setOpen(false)} />
             </>
           )}
         </div>
       </div>
      )}
    </header>
  );
}
