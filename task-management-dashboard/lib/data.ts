export const mockColumns = [
  {
    title: "To Do",
    cards: [
      { id: 1, title: "Design login page", priority: "high", dueDate: "2024-07-20", reports: 2, image: "/img-1.webp", category: "UI/UX", categoryColor: "bg-blue-500" },
      { id: 2, title: "Set up database", priority: "medium", reports: 0, category: "Research", categoryColor: "bg-green-500", image: "/img-2.jpeg" },
    ],
  },
  {
    title: "In Progress",
    cards: [
      { id: 3, title: "Implement authentication", priority: "high", dueDate: "2024-07-22", reports: 0, image: "/img-2.jpeg", category: "Presentation", categoryColor: "bg-orange-400" },
    ],
  },
  {
    title: "Done",
    cards: [
      { id: 4, title: "Project setup", priority: "low", reports: 0, image: "/img-3.jpg", category: "UI/UX", categoryColor: "bg-blue-500" },
    ],
  },
];
