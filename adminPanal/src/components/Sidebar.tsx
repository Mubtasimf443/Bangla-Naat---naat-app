/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { NavLink } from "react-router-dom";
import { BookOpenText, PlusCircle, Users, LogOut } from "lucide-react";

const linkBase =
  "flex items-center gap-3 border-l-4 px-5 py-3 text-[15px] font-medium text-moss-100/80 transition-colors hover:bg-moss-800/60 hover:text-white border-transparent";
const linkActive = "!border-gold-500 bg-moss-800 !text-white";

const Sidebar = () => (
  <aside className="flex h-screen w-64 shrink-0 flex-col bg-moss-950 text-white">
    <div className="border-b border-white/10 px-5 py-6">
      <p className="font-display text-2xl font-bold leading-none">বাংলা নাত</p>
      <p className="mt-1.5 text-sm text-moss-100/70">Bangla Naat admin</p>
    </div>

    <nav className="flex-1 py-4">
      <NavLink
        to="/naats"
        end
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
      >
        <BookOpenText size={18} />
        Naats
      </NavLink>

      <NavLink
        to="/naats/create"
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
      >
        <PlusCircle size={18} />
        Create naat
      </NavLink>

      {/* Admin only: hide this link when the signed-in role is "moderator" */}
      <NavLink
        to="/users"
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
      >
        <Users size={18} />
        Users
      </NavLink>
    </nav>

    <div className="border-t border-white/10 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-semibold text-moss-950">
          A
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Admin Name</p>
          <p className="truncate text-xs text-moss-100/70">admin</p>
        </div>
      </div>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm text-moss-100 hover:bg-white/10"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  </aside>
);

export default Sidebar;
