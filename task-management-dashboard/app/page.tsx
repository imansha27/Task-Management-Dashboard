'use client'

import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar"
import ProjectCard from "@/components/ProjectCard"
import Board from "@/components/Board"
// import { useTaskStore } from '@/store/TaskCardStore'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedProject, setSelectedProject] = useState('Project-1')

  // useEffect(() => {
  //   useTaskStore.getState().loadTasks();
  // }, []);


  return (
    <main className="min-h-screen  flex">
      <Sidebar open={sidebarOpen} onSelectProject={setSelectedProject} />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-40" style={{ left: sidebarOpen ? 256 : 0 }}>
          <Navbar search={search} setSearch={setSearch} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 flex flex-col pt-20 px-0 max-w-full w-full mx-auto">
          <div className="w-full px-8 max-w-full">
            <ProjectCard projectName={selectedProject} />
          </div>
          <section className="flex-1 overflow-x-auto pt-6 px-8 max-w-full">
              <Board search={search} />
            </section>
        </div>
      </div>
    </main>
  )
}
