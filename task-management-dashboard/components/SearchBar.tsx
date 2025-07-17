"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"


export default function SearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="px-4 py-2"
      />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
    </div>
  )
}