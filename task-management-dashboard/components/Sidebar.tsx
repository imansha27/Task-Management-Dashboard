import { Folder, LayoutGrid, MessageCircle, Calendar, Users, LogOut, ChevronDown } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r flex flex-col justify-between z-30 shadow">
      <div>
        {/* Workspace Selector */}
        <div className="flex items-center gap-2 px-6 py-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Folder className="text-gray-500" size={22} />
          </div>
          <div>
            <div className="text-xs text-gray-400">workspace</div>
            <div className="font-semibold text-sm">Root folder</div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="mt-2">
          <ul className="space-y-1 px-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium">
                <LayoutGrid size={18} /> Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center gap-3 px-4 py-2 rounded text-blue-600 bg-blue-50 font-medium">
                <Folder size={18} /> Boards <ChevronDown size={16} className="ml-auto" />
              </div>
              <ul className="ml-8 mt-1 space-y-1">
                <li className="text-gray-400 text-sm py-1">Create routes</li>
                <li className="text-gray-400 text-sm py-1">Delepment React App</li>
                <li className="text-blue-600 text-sm py-1 font-semibold">Sport Xi Project</li>
                <li className="text-gray-400 text-sm py-1">Wordpress theme</li>
              </ul>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium relative">
                <MessageCircle size={18} /> Messages
                <span className="absolute right-4 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">3</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium">
                <Calendar size={18} /> Calendar
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium">
                <Users size={18} /> Team members
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mb-4 px-2">
        <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium mb-2">
          Support
        </a>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded bg-gray-800 text-white font-medium">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  )
}