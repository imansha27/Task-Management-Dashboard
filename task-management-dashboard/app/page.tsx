'use client'

import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/TaskCardStore'
import Board from '@/components/Board'
import Navbar from "@/components/Navbar"

export default function HomePage() {
  const [search, setSearch] = useState('')
  const { loadTasks } = useTaskStore()

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return (
    <main className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto">
          <Navbar search={search} setSearch={setSearch} />
          <div className="flex flex-row gap-4 mt-6">
            <section className="flex-1 overflow-x-auto">
              <Board />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
