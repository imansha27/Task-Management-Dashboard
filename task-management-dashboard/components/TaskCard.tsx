import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calendar as CalendarIcon, Image as ImageIcon, Zap } from "lucide-react";

// Add a color map for priorities
const priorityColor = {
  high: "bg-red-100 text-red-600 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function TaskCard({ title, priority, dueDate, reports, image, category = 'Presentation', categoryColor = 'bg-orange-400' }: {
  title: string;
  priority: string;
  dueDate?: string;
  reports?: number;
  image?: string;
  category?: string;
  categoryColor?: string;
}) {
  return (
    <Card className="w-full max-w-xs rounded-xl border border-gray-200 shadow-sm bg-gray-100 ">
      <div className="flex items-center gap-2 px-4 pt-4">
        <span className={`w-2 h-2 rounded-full ${categoryColor}`}></span>
        <span className="text-xs text-gray-400 font-medium">{category}</span>
      </div>
      <CardHeader className="pb-2 pt-1 px-4">
        <CardTitle className="text-lg font-bold text-black mb-1">{title}</CardTitle>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
            <ImageIcon className="text-white" size={16} />
          </span>
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityColor[priority as keyof typeof priorityColor] || priorityColor.low}`}>
            <Zap className="w-3 h-3" />
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-0 px-4">
        {image && (
          <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-2" />
        )}
        {/* Divider */}
        <hr className="my-2 border-gray-200" />
        <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
          <div className="flex items-center gap-1">
            <MessageCircle size={16} className="mr-1" />
            {reports ?? 4}
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon size={16} className="mr-1" />
            Due: {dueDate || "22 April, 2022"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}