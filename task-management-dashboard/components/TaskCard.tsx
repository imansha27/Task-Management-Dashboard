import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TaskCardProps = {
  title: string;
  priority: string;
  dueDate?: string;
  reports?: number;
  image?: string;
};

export default function TaskCard({ title, priority, dueDate, reports, image }: TaskCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            priority === "high" ? "bg-red-500 text-white" :
            priority === "medium" ? "bg-yellow-500 text-black" :
            "bg-green-500 text-white"
          }`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">...</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {image ? (
          <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-2" />
        ) : null}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div className="flex space-x-2">
            <span>💾 6</span>
            <span>💬 28</span>
          </div>
          <div className="flex space-x-2">
            <span>👤👤👤 +2</span>
            <span>⚡ {priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}