'use client'

import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import Swimlane from '@/components/Swimlane'
import SearchBar from '@/components/SearchBar'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const { loadTasks } = useTaskStore()

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return (
    <main className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Task Board</h1>
        <SearchBar value={search} onChange={setSearch} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Swimlane title="To Do" status="todo" search={search} />
          <Swimlane title="In Progress" status="inprogress" search={search} />
          <Swimlane title="Done" status="done" search={search} />
        </div>
      </div>
    </main>
  )
}
