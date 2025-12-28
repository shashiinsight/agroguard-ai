import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  onStop?: () => void;
}

export function ChatInput({ onSend, isLoading, onStop }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 p-2 rounded-2xl border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about pesticides, pest control, or crop protection..."
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent border-0 outline-none text-sm px-3 py-2.5",
            "placeholder:text-muted-foreground/60"
          )}
          disabled={isLoading}
        />
        
        {isLoading ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onStop}
            className="h-9 w-9 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20"
          >
            <Square className="h-4 w-4 fill-current" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground/60 text-center mt-2">
        Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Shift + Enter</kbd> for new line
      </p>
    </form>
  );
}
