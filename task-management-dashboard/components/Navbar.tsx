"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Bell, User } from "lucide-react"

export default function Navbar({ search, setSearch }: { search: string, setSearch: (v: string) => void }) {
  return (
    <nav className="w-full bg-[var(--sidebar)] border-b border-[var(--sidebar-border)] px-6 py-3 flex items-center justify-between">
      {/* Left: Logo and App Name */}
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-2xl"><svg width="24" height="24" fill="none"><rect width="24" height="24" rx="6" fill="#2563eb"/><rect x="6" y="6" width="12" height="12" rx="3" fill="#fff"/></svg></span>
        <span className="font-semibold text-lg text-blue-700">Task Board</span>
      </div>

      {/* Center: Create Board Button and Search */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 px-4 py-2 rounded">
          Create new board <Plus size={18} />
        </Button>
        <Input
          type="search"
          placeholder="Search tasks ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64 bg-white border border-gray-200 rounded px-3 py-2"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <Filter className="text-gray-400 hover:text-blue-600 cursor-pointer" size={20} />
        <Bell className="text-gray-400 hover:text-blue-600 cursor-pointer" size={20} />
        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="text-gray-500" size={20} />
        </span>
      </div>
    </nav>
  )
}