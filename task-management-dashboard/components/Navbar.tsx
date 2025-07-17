"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Bell, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  search,
  setSearch,
  sidebarOpen,
  setSidebarOpen,
}: {
  search: string;
  setSearch: (v: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <nav className="w-full bg-[var(--sidebar)] border-b border-[var(--sidebar-border)] px-6 py-3 flex items-center justify-between">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-[var(--border)] shadow hover:bg-[var(--muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <AnimatePresence initial={false} mode="wait">
            {sidebarOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-[var(--foreground)]" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} className="text-[var(--foreground)]" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <span className="text-primary text-2xl">
          <svg width="24" height="24" fill="none">
            <rect width="24" height="24" rx="6" fill="#2563eb" />
            <rect x="6" y="6" width="12" height="12" rx="3" fill="#fff" />
          </svg>
        </span>
        <span className="font-semibold text-lg text-primary">
          <span>Task Board</span>
        </span>
      </div>
      {/* Center: Create Board Button and Search */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        <Button className="bg-primary hover:bg-[var(--primary-foreground)] text-[var(--primary-foreground)] font-semibold flex items-center gap-2 px-4 py-2 rounded">
          Create new board <Plus size={18} />
        </Button>
        <Input
          type="search"
          placeholder="Search tasks ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 bg-white border border-[var(--border)] rounded px-3 py-2"
        />
      </div>
      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <Filter
          className="text-muted-foreground hover:text-primary cursor-pointer"
          size={20}
        />
        <Bell
          className="text-muted-foreground hover:text-primary cursor-pointer"
          size={20}
        />
        <span className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center">
          <User className="text-muted-foreground" size={20} />
        </span>
      </div>
    </nav>
  );
}
