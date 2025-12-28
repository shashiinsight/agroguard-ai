import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, User, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-leaf-100 text-leaf-600 dark:bg-leaf-900 dark:text-leaf-400"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "group relative max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-secondary text-secondary-foreground rounded-tl-sm"
        )}
      >
        {/* Role Label for Assistant */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/30">
            <span className="text-xs font-semibold text-leaf-600 dark:text-leaf-400">
              AI Assistant
            </span>
          </div>
        )}

        {/* Content */}
        <div className="text-sm leading-relaxed">
          {content ? (
            isUser ? (
              <p className="whitespace-pre-wrap">{content}</p>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-secondary-foreground prose-strong:text-foreground prose-li:text-secondary-foreground prose-a:text-primary">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h3 className="text-base font-bold mt-4 mb-2 first:mt-0">{children}</h3>
                    ),
                    h2: ({ children }) => (
                      <h4 className="text-sm font-bold mt-3 mb-2 first:mt-0">{children}</h4>
                    ),
                    h3: ({ children }) => (
                      <h5 className="text-sm font-semibold mt-3 mb-1 first:mt-0">{children}</h5>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    code: ({ children }) => (
                      <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="p-3 bg-muted rounded-lg overflow-x-auto text-xs my-2">
                        {children}
                      </pre>
                    ),
                    hr: () => <hr className="my-3 border-border/50" />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )
          ) : isStreaming ? (
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 bg-leaf-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 bg-leaf-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 bg-leaf-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : null}
        </div>

        {/* Copy Button for Assistant Messages */}
        {!isUser && content && !isStreaming && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-background border border-border shadow-sm hover:bg-muted"
            title="Copy message"
          >
            {copied ? (
              <Check className="h-3 w-3 text-leaf-600" />
            ) : (
              <Copy className="h-3 w-3 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
