import { NavLink } from "react-router-dom";
import logoBanner from "@/assets/logo_banner.png";

const navLinks = [{ to: "/buddies", label: "Coding Buddies" }];

export function Navbar() {
  return (
    <nav className="w-full h-16 bg-white border-b border-border flex items-center px-6 sticky top-0 z-50">
      <div className="w-full flex items-center gap-8">
        <a href="/" className="flex items-center shrink-0">
          <img src={logoBanner} alt="Blueprint Logo" className="h-8" />
        </a>
        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
