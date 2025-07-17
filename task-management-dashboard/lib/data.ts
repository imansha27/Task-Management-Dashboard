export const mockColumns = [
  {
    title: "To Do",
    color: "text-blue-600",
    cards: [
      { id: 1, title: "Design login page", priority: "high", dueDate: "2024-07-20", reports: 2, image: "/img-1.webp" },
      { id: 2, title: "Set up database", priority: "medium" },
    ],
  },
  {
    title: "In Progress",
    color: "text-yellow-600",
    cards: [
      { id: 3, title: "Implement authentication", priority: "high", dueDate: "2024-07-22", image: "/img-2.jpeg" },
    ],
  },
  {
    title: "Done",
    color: "text-green-600",
    cards: [
      { id: 4, title: "Project setup", priority: "low", image: "/img-3.jpg" },
    ],
  },
];
