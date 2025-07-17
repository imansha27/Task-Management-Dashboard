"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="search"
        placeholder="Search projects, tasks, or team members..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition duration-200 bg-[var(--card)] shadow-sm hover:shadow-md"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
    </div>
  )
}