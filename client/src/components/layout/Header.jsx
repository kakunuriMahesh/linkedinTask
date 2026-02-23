import { useState, useEffect } from "react";
import { Sun, Moon, Bell, Search, User } from "lucide-react";

export default function Header() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <header className="h-20 flex justify-between items-center px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-8">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-400 font-medium">Welcome back, Admin</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Search shortcut */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-lg text-gray-400 cursor-pointer hover:border-indigo-300 transition-colors">
          <Search size={14} />
          <span className="text-[11px] font-medium">Quick Search / Cmd + K</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 border-2 border-white dark:border-gray-800 rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleDark}
          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-100 dark:bg-gray-700" />

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 transition-colors">Mahesh K.</p>
            <p className="text-[10px] text-gray-400 font-medium">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-105">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
