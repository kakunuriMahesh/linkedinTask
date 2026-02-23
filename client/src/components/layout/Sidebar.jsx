import { useState } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  ChevronLeft
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon: Icon, label, active = false }) => (
    <li>
      <a
        href="#"
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
          active 
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none" 
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
        }`}
      >
        <Icon size={20} className={`${active ? "text-white" : "group-hover:scale-110 transition-transform"}`} />
        {!collapsed && <span className="font-medium text-sm">{label}</span>}
      </a>
    </li>
  );

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col min-h-screen sticky top-0 z-20`}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-gray-50 dark:border-gray-700/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold italic">
              B
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Blackcoffer
            </h2>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 px-2 ${collapsed ? "text-center" : ""}`}>
          {collapsed ? "..." : "Navigation"}
        </p>
        <ul className="space-y-1.5">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={Settings} label="Settings" />
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="p-5 border-t border-gray-50 dark:border-gray-700/50">
        {!collapsed ? (
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-200">Online</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
             <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        )}
      </div>
    </aside>
  );
}
