import { useState } from "react";
import { mockColumns as initialColumns } from "@/lib/data";
import Column from "@/components/Column";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      setColumns([
        ...columns,
        {
          title: newColumnName,
          color: "text-gray-600",
          cards: [],
        },
      ]);
      setNewColumnName("");
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full overflow-x-auto p-4 whitespace-nowrap">
      {columns.map((col) => (
        <Column key={col.title} title={col.title} color={col.color} cards={col.cards} />
      ))}
      {/* Add Column Button with AlertDialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="w-64 p-2 shadow-lg rounded-[10px] bg-white flex flex-col items-center justify-center min-h-[120px] border-2 border-dashed border-gray-300 hover:bg-gray-50 transition"
            style={{ minWidth: 256 }}
          >
            <Plus className="text-gray-400 mb-1" size={28} />
            <span className="text-gray-500 font-medium">Add Column</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Column</AlertDialogTitle>
          </AlertDialogHeader>
          <Input
            placeholder="Column name"
            value={newColumnName}
            onChange={e => setNewColumnName(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleAddColumn();
            }}
            autoFocus
          />
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button onClick={handleAddColumn} disabled={!newColumnName.trim()}>
                Add
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}