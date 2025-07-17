import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ColumnProps {
  title: string;
  color: string;
  cards: { id: number; title: string; priority: string; dueDate?: string; reports?: number }[];
}

export default function Column({ title, color, cards }: ColumnProps) {
  return (
    <div className="w-64 p-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${color}`}>{title}</h3>
        <span className="text-xs text-gray-500">+ ...</span>
      </div>
      <div className="space-y-2">
        {cards.map((card) => (
          <Card key={card.id} className="bg-white shadow-sm">
            <CardHeader className="p-2">
              <h4 className={`text-xs font-medium ${card.priority === 'high' ? 'text-red-500' : card.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                {card.title}
              </h4>
              {card.dueDate && <p className="text-xs text-gray-500">Due: {card.dueDate}</p>}
              {card.reports && <p className="text-xs text-red-500">{card.reports} Reports</p>}
            </CardHeader>
            <CardContent className="p-2">
              <div className="w-full h-24 bg-gray-800 flex items-center justify-center rounded-md">
                <span className="text-gray-400">📷</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>👥 {card.id}</span>
                <span>💬 {Math.floor(Math.random() * 100)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}