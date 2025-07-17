import TaskCard from "@/components/TaskCard";

interface ColumnProps {
  title: string;
  color: string;
  cards: { id: number; title: string; priority: string; dueDate?: string; reports?: number; image?: string }[];
}

export default function Column({ title, color, cards }: ColumnProps) {
  return (
    <div className="w-64 p-2 shadow-lg rounded-[10px] bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${color}`}>{title}</h3>
        <span className="text-xs text-gray-500">+ ...</span>
      </div>
      <div className="space-y-2">
        {cards.map((card) => (
          <TaskCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}