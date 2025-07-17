import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Task = {
  id: string
  title: string
  description?: string
  status: 'todo' | 'inprogress' | 'done'
}

type TaskStore = {
  tasks: Task[]
  loadTasks: () => void
  updateTaskStatus: (id: string, newStatus: Task['status']) => void
  searchTasks: (query: string) => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      // Load tasks from mock data or localStorage
      loadTasks: async () => {
        // Skip if already loaded
        if (get().tasks.length > 0) return

        try {
          const res = await fetch('/data/tasks.json')
          const data = await res.json()
          set({ tasks: data })
        } catch (err) {
          console.error('Failed to load tasks:', err)
        }
      },

      // Update task status (used for drag-and-drop)
      updateTaskStatus: (id, newStatus) => {
        const updated = get().tasks.map(task =>
          task.id === id ? { ...task, status: newStatus } : task
        )
        set({ tasks: updated })
      },

      // Filter tasks based on query (case insensitive)
      searchTasks: (query) => {
        if (!query) return get().tasks
        return get().tasks.filter(task =>
          task.title.toLowerCase().includes(query.toLowerCase())
        )
      },
    }),
    {
      name: 'task-storage', // localStorage key
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
)
