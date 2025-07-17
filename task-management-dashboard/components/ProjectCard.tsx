import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"


export default function ProjectCard({ projectName = "Sport Xi Project" }: { projectName?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{projectName}</h2>
            <Badge className="bg-yellow-400 text-black font-medium">In progress</Badge>
          </div>
          <p className="text-gray-400 text-sm mt-1">event production</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-gray-400 text-sm">assigned</span>
      
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
          <Users className="text-gray-500" size={22} />
        </div>
        <Button variant="outline" className="ml-2 px-3 py-1 text-xs">Manage</Button>
      </div>
      <hr className="my-2" />
      <div className="text-xs text-gray-400">Last updated on: 04 April, 2022</div>
    
    </div>
  )
}