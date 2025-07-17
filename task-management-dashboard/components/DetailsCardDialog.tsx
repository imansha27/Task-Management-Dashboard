import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MessageCircle, Zap, Image as ImageIcon } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface DetailsCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
  reports?: number;
  image?: string;
  category?: string;
  categoryColor?: string;
}

const priorityColor = {
  high: "bg-red-100 text-red-600 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-[var(--muted)] text-muted-foreground border-[var(--border)]",
};

export default function DetailsCardDialog({
  open,
  onOpenChange,
  title,
  description,
  priority,
  dueDate,
  reports,
  image,
  category = "Presentation",
  categoryColor = "bg-orange-400"
}: DetailsCardDialogProps) {
  const [comment, setComment] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // For now, just clear the field and log the comment
    setTimeout(() => {
      setSubmitting(false);
      setComment("");
    }, 500);
    // You can replace this with actual comment logic
    if (comment.trim()) {
      // eslint-disable-next-line no-console
      console.log("Comment submitted:", comment);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${categoryColor}`}></span>
            {title}
            <Badge className="ml-2 px-2 py-0.5 text-xs font-medium capitalize">
              {category}
            </Badge>
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted-foreground">
            {description || "No description provided."}
          </DialogDescription>
        </DialogHeader>
        {image && (
          <div className="w-full flex justify-center my-4">
            <img src={image} alt={title} className="rounded-lg max-h-48 object-cover shadow" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold capitalize ${priorityColor[priority as keyof typeof priorityColor] || priorityColor.low}`}>
              {priority}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-xs">Due: {dueDate || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">Reports: {reports ?? 0}</span>
          </div>
          {image && (
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs">Image attached</span>
            </div>
          )}
        </div>
        {/* Comment Field */}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <label className="block text-xs font-medium text-gray-500 mb-1">Add a comment</label>
          <Textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            className="mb-2"
            disabled={submitting}
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={submitting || !comment.trim()}>
              {submitting ? "Adding..." : "Add Comment"}
            </Button>
          </div>
        </form>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
