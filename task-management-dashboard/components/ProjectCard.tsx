import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Board from "./Board"

export default function ProjectCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Sport Xi Project</h2>
            <Badge className="bg-yellow-400 text-black font-medium">In progress</Badge>
          </div>
          <p className="text-gray-400 text-sm mt-1">event production</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-gray-400 text-sm">assigned</span>
        {/* Avatars */}
        <div className="flex -space-x-2">
          <img src="/avatar1.png" alt="User 1" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src="/avatar2.png" alt="User 2" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src="/avatar3.png" alt="User 3" className="w-7 h-7 rounded-full border-2 border-white" />
          <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">+2</span>
        </div>
        <Button variant="outline" className="ml-2 px-3 py-1 text-xs">Manage</Button>
      </div>
      <hr className="my-2" />
      <div className="text-xs text-gray-400">Last updated on: 04 April, 2022</div>
      <section className="flex-1 overflow-x-auto">
              <Board search={""} />
            </section>
    </div>
  )
}