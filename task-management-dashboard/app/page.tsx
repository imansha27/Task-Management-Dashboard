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

  // Responsive sidebar: close by default on mobile
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
 
    function handleCloseSidebar() {
      setSidebarOpen(false);
    }
    window.addEventListener('closeSidebar', handleCloseSidebar);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('closeSidebar', handleCloseSidebar);
    };
  }, []);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Try to get data from localStorage
      const localTasks = localStorage.getItem('tasks');
      const localColumns = localStorage.getItem('columns');
      if (localTasks && localColumns) {
        setTasks(JSON.parse(localTasks));
        setColumns(JSON.parse(localColumns));
     
        return;
      }
 
      const res = await fetch("/tasks.json");
      const data = await res.json();
      setColumns(data.columns);
      setTasks(data.tasks);
    
      localStorage.setItem('tasks', JSON.stringify(data.tasks));
      localStorage.setItem('columns', JSON.stringify(data.columns));
  
    }
    fetchData();
  }, []);


  useEffect(() => {
    if (Array.isArray(tasks) && Array.isArray(columns)) {
      setLoading(false);
    }
  }, [tasks, columns]);
  if(loading)
  {
    return <Loading/>
  }

  return (
    <main className="min-h-screen flex bg-background">
      {/* Sidebar overlay on mobile, fixed on desktop */}
      <div className="z-40">
        <Sidebar open={sidebarOpen} onSelectProject={setSelectedProject} />
        {/* Backdrop for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar backdrop"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <div
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
          style={{ left: sidebarOpen && window.innerWidth >= 768 ? 256 : 0 }}
        >
          <Navbar search={search} setSearch={setSearch} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 flex flex-col pt-20 px-2 sm:px-4 md:px-8 max-w-full w-full mx-auto">
          <div className="w-full px-0 sm:px-4 md:px-8 max-w-full">
            <ProjectCard projectName={selectedProject} />
          </div>
          <section className="flex-1 overflow-x-auto pt-4 sm:pt-6 px-0 sm:px-4 md:px-8 max-w-full">
            <Board search={search} tasks={tasks} columns={columns} setTasks={setTasks} setColumns={setColumns} />
          </section>
        </div>
      </div>
    </main>
  )
}
