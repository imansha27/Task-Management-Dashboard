import TaskCard from "@/components/TaskCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AddCardDialog from "@/components/AddCardDialog";

interface ColumnProps {
  title: string;
  
  cards: {
    id: number;
    title: string;
    priority: string;
    dueDate?: string;
    reports?: number;
    image?: string;
    category?: string;
    categoryColor?: string;
  }[];
}

// Map column titles to global color classes
const columnTitleColor: Record<string, string> = {
  'To Do': 'text-primary',
  'In Progress': 'text-yellow-600', // You may want to add a custom class or variable for this
  'Done': 'text-green-600', // You may want to add a custom class or variable for this
};

export default function Column({ title, cards }: ColumnProps) {
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [details, setDetails] = useState("");

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      // This would update columns in parent in a real app
      setNewColumnName("");
      setDetails("");
      setOpen(false);
    }
  };

  // Use mapped color or fallback
  const titleColorClass = columnTitleColor[title] || 'text-primary';

  return (
    <div className="w-60 p-2  bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${titleColorClass}`}>{title}</h3>
        <div className="flex gap-1">
          <AddCardDialog
            open={open}
            setOpen={setOpen}
            newColumnName={newColumnName}
            setNewColumnName={setNewColumnName}
            details={details}
            setDetails={setDetails}
            handleAddColumn={handleAddColumn}
          />
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 p-0 rounded-full hover:bg-gray-100"
            aria-label="Column options"
            type="button"
          >
            <MoreHorizontal size={16} />
          </Button>
        </div>
       
      </div>
      <hr className="my-2 border-gray-200" />
      <div className="space-y-2">
        {cards.map((card) => (
          <TaskCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}