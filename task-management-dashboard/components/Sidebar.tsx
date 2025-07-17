import { Folder, LayoutGrid, MessageCircle, Calendar, Users, LogOut, ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  open?: boolean
  onSelectProject?: (name: string) => void
}

export default function Sidebar({ open = true, onSelectProject }: SidebarProps) {
  const [boardsOpen, setBoardsOpen] = useState(true)
  const boards = [
    { name: 'Board-1', active: false },
    { name: 'Board-2', active: false },
    { name: 'Board-3', active: true },
    { name: 'Board-4', active: false },
  ]
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.aside
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ width: { type: 'spring', stiffness: 200, damping: 30 }, opacity: { duration: 0.2 } }}
          className="fixed top-0 left-0 h-screen z-30 shadow border-r bg-white flex flex-col justify-between"
          style={{ minWidth: 0, overflow: 'hidden' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full justify-between"
          >
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
                <ul>
                  <li>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium">
                      <LayoutGrid size={18} /> Dashboard
                    </a>
                  </li>
                  <li>
                    <button
                      className="flex items-center gap-3 px-4 py-2 rounded text-blue-600 bg-blue-50 font-medium w-full focus:outline-none"
                      onClick={() => setBoardsOpen((v) => !v)}
                      aria-expanded={boardsOpen}
                    >
                      <Folder size={18} /> Boards
                      <motion.span
                        animate={{ rotate: boardsOpen ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                        className="ml-auto"
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {boardsOpen && (
                        <motion.ul
                          key="boards-list"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ height: { type: 'spring', stiffness: 200, damping: 30 }, opacity: { duration: 0.2 } }}
                          className="ml-8 mt-1 space-y-1 overflow-hidden"
                        >
                          {boards.map((board) => (
                            <li
                              key={board.name}
                              className={`text-sm py-1 cursor-pointer px-2 rounded ${board.active ? 'text-blue-600 font-semibold' : 'text-gray-400'} hover:bg-gray-100`}
                              onClick={() => onSelectProject && onSelectProject(board.name)}
                            >
                              {board.name}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
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
            <div>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium mb-2">
                Support
              </a>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded bg-gray-800 text-white font-medium">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}