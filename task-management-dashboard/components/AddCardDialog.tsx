"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  ChevronDown,
  CalendarIcon,
  Image as ImageIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

// Professional priority and category options with color pill before text
const PRIORITIES = [
  {
    label: "High",
    value: "high",
    pillColor: "bg-red-600",
  },
  {
    label: "Medium",
    value: "medium",
    pillColor: "bg-yellow-400",
  },
  {
    label: "Low",
    value: "low",
    pillColor: "bg-green-500",
  },
];

const CATEGORIES = [
  {
    label: "UI/UX",
    value: "UI/UX",
    pillColor: "bg-blue-600",
  },
  {
    label: "Research",
    value: "Research",
    pillColor: "bg-violet-600",
  },
  {
    label: "Presentation",
    value: "Presentation",
    pillColor: "bg-pink-500",
  },
];

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

interface AddCardDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newColumnName: string;
  setNewColumnName: (name: string) => void;
  details: string;
  setDetails: (details: string) => void;
  handleAddCard: (card: any) => void;
}

const AddCardDialog: React.FC<AddCardDialogProps> = ({
  open,
  setOpen,
  newColumnName,
  setNewColumnName,
  details,
  setDetails,
  handleAddCard,
}) => {
  // New states for card fields
  const [priority, setPriority] = React.useState(PRIORITIES[0]);
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  const [dateInput, setDateInput] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [showPriority, setShowPriority] = React.useState(false);
  const [showCategory, setShowCategory] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Helper to create a new card object
  const createCard = () => {
    return {
      id: Date.now().toString(),
      title: newColumnName,
      description: details,
      priority: priority.value,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : undefined,
      image: image || undefined,
      category: category.value,
      categoryColor: category.pillColor,
      status: '', // Will be set by parent
    };
  };

  // Calendar logic
  React.useEffect(() => {
    if (dueDate) setDateInput(formatDate(dueDate));
  }, [dueDate]);

  return (
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
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Title
            </label>
            <Input
              placeholder="Card Title"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCard(createCard());
              }}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Details
            </label>
            <Textarea
              placeholder="Description or details..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
        
          </div>
             {/* Due Date Picker */}
             <div>
            <label
              htmlFor="date"
              className="block text-xs font-medium text-gray-500 mb-1 px-1"
            >
              Due Date
            </label>
            <div className="relative flex gap-2">
              <Input
                id="date"
                value={dateInput}
                placeholder="June 01, 2025"
                className="bg-background pr-10"
                onChange={(e) => {
                  const d = new Date(e.target.value);
                  setDateInput(e.target.value);
                  if (isValidDate(d)) {
                    setDueDate(d);
                    setMonth(d);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setMonth(dueDate || new Date());
                  }
                }}
              />
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                type="button"
                onClick={() =>
                  setMonth((m) => (m ? undefined : dueDate || new Date()))
                }
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
              {month !== undefined && (
                <div className="absolute z-10 top-10 right-0 w-auto bg-white border border-gray-200 rounded shadow p-2">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date: Date | undefined) => {
                      if (date) {
                        setDueDate(date);
                        setDateInput(formatDate(date));
                        setMonth(undefined);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
            {/* Priority Dropdown */}
            <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Priority
            </label>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setShowPriority((v) => !v)}
              >
                {" "}
                <span className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${priority.pillColor}`}
                  ></span>
                  {priority.label}
                </span>
                <ChevronDown size={16} />
              </Button>
              {showPriority && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.value}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-100 ${
                        p.value === priority.value ? "font-semibold" : ""
                      }`}
                      onClick={() => {
                        setPriority(p);
                        setShowPriority(false);
                      }}
                      type="button"
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${p.pillColor}`}
                      ></span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Category
            </label>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setShowCategory((v) => !v)}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${category.pillColor}`}
                  ></span>
                  {category.label}
                </span>
                <ChevronDown size={16} />
              </Button>
              {showCategory && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-100 ${
                        c.value === category.value ? "font-semibold" : ""
                      }`}
                      onClick={() => {
                        setCategory(c);
                        setShowCategory(false);
                      }}
                      type="button"
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${c.pillColor}`}
                      ></span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
       
          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-xs font-medium text-gray-500 mb-1 px-1"
            >
              Image
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <ImageIcon size={16} /> Upload
              </Button>
              <input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleAddCard(createCard())} disabled={!newColumnName.trim()}>
            Add
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardDialog;
