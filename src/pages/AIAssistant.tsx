import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, AlertCircle, Trash2, ArrowDown } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ExampleQueries } from "@/components/chat/ExampleQueries";

const exampleQueries = [
  "What pesticide should I use for rice crops?",
  "How to control aphids on tomato plants?",
  "Safe fungicides for grape cultivation",
  "Natural pest control for vegetables",
  "Best insecticide for cotton bollworm",
  "How to treat powdery mildew on wheat?"
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 0);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async (userMessage: string) => {
    setError(null);
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    try {
      const chatMessages = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: chatMessages }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let textBuffer = "";
      const assistantId = (Date.now() + 1).toString();

      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId ? { ...msg, content: assistantContent } : msg
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      console.error("AI Chat error:", err);
      setError(err instanceof Error ? err.message : "Failed to get AI response");
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === "assistant" && lastMessage.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleExampleClick = (example: string) => {
    handleSend(example);
  };

  return (
    <Layout>
      {/* Compact Header */}
      <section className="bg-hero-gradient text-primary-foreground py-10 md:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">AI-Powered</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Pesticide Assistant
            </h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              Get intelligent recommendations for your crops and pest problems
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden flex flex-col"
            style={{ height: "calc(100vh - 320px)", minHeight: "450px" }}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-leaf-500/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-leaf-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Agricultural AI</h3>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  Clear
                </Button>
              )}
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-600 flex items-center justify-center mb-4 shadow-lg">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    How can I help you today?
                  </h3>
                  <p className="text-muted-foreground text-sm text-center max-w-sm mb-6">
                    Ask me about pesticides, pest control, safety guidelines, or crop protection
                  </p>
                  <ExampleQueries queries={exampleQueries} onSelect={handleExampleClick} />
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                      isStreaming={isLoading && message.role === "assistant" && message === messages[messages.length - 1]}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Scroll to Bottom Button */}
            {showScrollButton && (
              <button
                onClick={() => scrollToBottom()}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            )}

            {/* Error Display */}
            {error && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="text-xs underline hover:no-underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-muted/20">
              <ChatInput onSend={handleSend} isLoading={isLoading} onStop={handleStop} />
            </div>
          </motion.div>

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl"
          >
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-400 text-xs">
              <strong>Note:</strong> AI provides general guidance. Always verify with local experts and follow product labels.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
