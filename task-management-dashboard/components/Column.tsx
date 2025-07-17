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

interface ColumnProps {
  title: string;
  color: string;
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

export default function Column({ title, color, cards }: ColumnProps) {
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

  return (
    <div className="w-64 p-2 shadow-lg rounded-[10px] bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${color}`}>{title}</h3>
        <div className="flex gap-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-7 h-7 p-0 rounded-full hover:bg-gray-100 cursor-pointer"  
                aria-label="Add column"
              >
                <Plus size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Column</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                  <Input
                    placeholder="Column name"
                    value={newColumnName}
                    onChange={e => setNewColumnName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleAddColumn();
                    }}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Details</label>
                  <Textarea
                    placeholder="Description or details..."
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddColumn} disabled={!newColumnName.trim()}>
                  Add
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
      <div className="space-y-2">
        {cards.map((card) => (
          <TaskCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}