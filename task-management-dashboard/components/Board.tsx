import Column from "@/components/Column";

const mockColumns = [
  {
    title: "To Do",
    color: "text-blue-600",
    cards: [
      { id: 1, title: "Design login page", priority: "high", dueDate: "2024-07-20", reports: 2 },
      { id: 2, title: "Set up database", priority: "medium" },
    ],
  },
  {
    title: "In Progress",
    color: "text-yellow-600",
    cards: [
      { id: 3, title: "Implement authentication", priority: "high", dueDate: "2024-07-22" },
    ],
  },
  {
    title: "Done",
    color: "text-green-600",
    cards: [
      { id: 4, title: "Project setup", priority: "low" },
    ],
  },
];

export default function Board() {
  return (
    <div className="flex flex-row gap-4 w-full overflow-x-auto p-4">
      {mockColumns.map((col) => (
        <Column key={col.title} title={col.title} color={col.color} cards={col.cards} />
      ))}
    </div>
  );
}
