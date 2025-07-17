import TaskCard from "@/components/TaskCard";

import { useState } from "react";
import {  MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddCardDialog from "@/components/AddCardDialog";
import { v4 as uuidv4 } from 'uuid';

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

  // Get columns and tasks from localStorage
  const columns = JSON.parse(localStorage.getItem('columns') || '[]');
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  const handleAddCard = () => {
    if (newColumnName.trim()) {
      // Find the column by title
      const colIdx = columns.findIndex((col: any) => col.title === title);
      if (colIdx === -1) return;
      // Create new card
      const newCard = {
        id: uuidv4(),
        title: newColumnName,
        description: details,
        priority: 'medium', // Default, can be extended
        dueDate: '',
        status: columns[colIdx].id,
      };
      // Add card to tasks
      const newTasks = [...tasks, newCard];
      // Add card id to column's taskIds
      const newColumns = [...columns];
      newColumns[colIdx] = {
        ...newColumns[colIdx],
        taskIds: [...newColumns[colIdx].taskIds, newCard.id],
      };
      // Persist
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      localStorage.setItem('columns', JSON.stringify(newColumns));
      setNewColumnName("");
      setDetails("");
      setOpen(false);
      // Optionally, trigger a state update in parent via callback/refresh
      window.location.reload(); // Simple way to refresh UI
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
            handleAddColumn={handleAddCard}
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