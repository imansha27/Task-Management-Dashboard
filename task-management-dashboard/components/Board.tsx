import { useState, useEffect } from "react";
import Column from "@/components/Column";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "@/components/TaskCard";

export default function Board({ search }: { search: string }) {
  const [columns, setColumns] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/tasks.json");
      const data = await res.json();
      setColumns(data.columns);
      setTasks(data.tasks);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Helper to get cards for a column
  function getCardsForColumn(column: any) {
    return column.taskIds
      .map((taskId: string) => tasks.find((t: any) => t.id === taskId))
      .filter(Boolean)
      .map((card: any) => ({
        ...card,
        // Provide fallback values for missing fields
        reports: card.reports ?? 0,
        image: card.image ?? undefined,
        category: card.category ?? "General",
        categoryColor: card.categoryColor ?? "bg-gray-400",
        id: card.id,
      }));
  }

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      setColumns([
        ...columns,
        {
          id: `column-${columns.length + 1}`,
          title: newColumnName,
          taskIds: [],
        },
      ]);
      setNewColumnName("");
      setOpen(false);
    }
  };

  // Filter cards in each column based on the search value
  const safeSearch = search || "";
  const filteredColumns = columns.map(col => ({
    ...col,
    cards: getCardsForColumn(col).filter((card: any) =>
      card.title.toLowerCase().includes(safeSearch.toLowerCase())
    ),
  }));

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceColIdx = columns.findIndex(col => col.title === source.droppableId);
    const destColIdx = columns.findIndex(col => col.title === destination.droppableId);
    const sourceCol = columns[sourceColIdx];
    const destCol = columns[destColIdx];
    const sourceCards = Array.from(sourceCol.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);
    if (sourceColIdx === destColIdx) {
      sourceCards.splice(destination.index, 0, movedCard);
      const newColumns = [...columns];
      newColumns[sourceColIdx] = { ...sourceCol, cards: sourceCards };
      setColumns(newColumns);
    } else {
      const destCards = Array.from(destCol.cards);
      destCards.splice(destination.index, 0, movedCard);
      const newColumns = [...columns];
      newColumns[sourceColIdx] = { ...sourceCol, cards: sourceCards };
      newColumns[destColIdx] = { ...destCol, cards: destCards };
      setColumns(newColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row gap-4 w-full overflow-x-auto p-4 whitespace-nowrap">
        {filteredColumns.map((col, colIdx) => (
          <div key={col.title} className="w-64 p-2 shadow-lg rounded-[10px] bg-white">
            {/* Column header and actions */}
            <Column title={col.title} cards={[]} />
            {/* Droppable area for cards only */}
            <Droppable droppableId={col.title} key={col.title}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2 min-h-[40px]"
                >
                  {col.cards.map((card: any, cardIdx: number) => (
                    <Draggable key={card.id} draggableId={String(card.id)} index={cardIdx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard {...card} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
        {/* Add Column Button with Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-64 p-2 shadow-lg rounded-[10px] bg-white flex flex-col items-center justify-center min-h-[120px] border-2 border-dashed border-gray-300 hover:bg-gray-50 transition"
              style={{ minWidth: 256 }}
            >
              <Plus className="text-gray-400 mb-1" size={28} />
              <span className="text-gray-500 font-medium">Add Column</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Column name"
              value={newColumnName}
              onChange={e => setNewColumnName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleAddColumn();
              }}
              autoFocus
            />
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
      </div>
    </DragDropContext>
  );
}