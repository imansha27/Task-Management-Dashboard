'use client'

import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/TaskCardStore'
import Navbar from "@/components/Navbar"
import ProjectCard from "@/components/ProjectCard"

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { loadTasks } = useTaskStore()

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return (
    <main className="min-h-screen bg-gray-100 flex">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-40" style={{ left: sidebarOpen ? 256 : 0 }}>
          <Navbar search={search} setSearch={setSearch} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 flex flex-col pt-20 px-8 max-w-7xl w-full mx-auto">
          <div className="flex flex-row gap-4">
            <ProjectCard />
          </div>
        </div>
      </div>
    </main>
  )
}
