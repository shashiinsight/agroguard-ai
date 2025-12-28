import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface ExampleQueriesProps {
  queries: string[];
  onSelect: (query: string) => void;
}

export function ExampleQueries({ queries, onSelect }: ExampleQueriesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span className="text-xs font-medium">Try asking</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {queries.map((query, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(query)}
            className="group text-left p-3 rounded-xl border border-border/50 bg-card hover:bg-secondary hover:border-primary/30 transition-all duration-200"
          >
            <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {query}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
