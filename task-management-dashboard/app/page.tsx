'use client'

import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar"
import ProjectCard from "@/components/ProjectCard"
import Board from "@/components/Board"
import Loading from "./loading"

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedProject, setSelectedProject] = useState('Project-1')
  const [tasks, setTasks] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Try to get data from localStorage
      const localTasks = localStorage.getItem('tasks');
      const localColumns = localStorage.getItem('columns');
      if (localTasks && localColumns) {
        setTasks(JSON.parse(localTasks));
        setColumns(JSON.parse(localColumns));
        // Don't set loading false here; wait for state update
        return;
      }
 
      const res = await fetch("/tasks.json");
      const data = await res.json();
      setColumns(data.columns);
      setTasks(data.tasks);
    
      localStorage.setItem('tasks', JSON.stringify(data.tasks));
      localStorage.setItem('columns', JSON.stringify(data.columns));
      // Don't set loading false here; wait for state update
    }
    fetchData();
  }, []);

  // Set loading to false only after both tasks and columns are loaded (even if empty)
  useEffect(() => {
    if (Array.isArray(tasks) && Array.isArray(columns)) {
      setLoading(false);
    }
  }, [tasks, columns]);

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
              <Board search={search} tasks={tasks} columns={columns} setTasks={setTasks} setColumns={setColumns} />
            </section>
        </div>
      </div>
    </main>
  )
}
