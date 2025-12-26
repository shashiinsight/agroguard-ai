import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Leaf, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

const exampleQueries = [
  "What pesticide should I use for rice crops?",
  "How to control aphids on tomato plants?",
  "Safe fungicides for grape cultivation",
  "Natural pest control for vegetables"
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = query.trim();
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call when Cloud is enabled)
    setTimeout(() => {
      const response = generateMockResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("rice")) {
      return "For rice crops, I recommend considering **Imidacloprid** for sucking pest control or **Chlorpyrifos** for stem borers. Always follow the recommended dosage and observe the safety interval of 30 days before harvest. For fungal diseases like blast, consider using **Carbendazim**.\n\n⚠️ **Safety Note**: Wear protective equipment during application and avoid application near water bodies.";
    }
    
    if (lowerQuery.includes("tomato") || lowerQuery.includes("aphid")) {
      return "For aphid control on tomato plants, **Imidacloprid 17.8% SL** is highly effective. Apply at 0.3-0.5 ml per liter of water as a foliar spray. Alternatively, consider neem-based products for organic control.\n\n**Application Tips**:\n- Apply during early morning or evening\n- Ensure thorough coverage under leaves\n- Repeat after 10-14 days if needed";
    }
    
    if (lowerQuery.includes("grape") || lowerQuery.includes("fungicide")) {
      return "For grape cultivation, **Mancozeb 75% WP** is excellent for downy mildew prevention. Use at 2-2.5 g per liter of water. For powdery mildew, consider sulfur-based fungicides.\n\n**Important**: Maintain a 21-day safety interval before harvest.";
    }
    
    return "Based on your query, I recommend consulting our pesticide database for detailed information. You can search for specific pesticides by crop type, pest name, or disease.\n\n**General Tips**:\n- Always identify the pest/disease correctly before treatment\n- Follow Integrated Pest Management (IPM) practices\n- Read and follow label instructions carefully\n\nWould you like me to help with a more specific query?";
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pesticide Recommendation Assistant
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Get intelligent recommendations based on your crop, pest problems, 
              or disease symptoms. Our AI is trained on agricultural expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
          >
            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    How can I help you today?
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mb-6">
                    Ask me about pesticide recommendations, pest control methods, 
                    safety guidelines, or crop-specific solutions.
                  </p>
                  
                  {/* Example Queries */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {exampleQueries.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-secondary-foreground transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4" />
                            <span className="text-xs font-medium">AI Assistant</span>
                          </div>
                        )}
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-secondary rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-secondary-foreground" />
                          <div className="flex gap-1">
                            <span className="h-2 w-2 bg-secondary-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 bg-secondary-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 bg-secondary-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about pesticides, pest control, or crop protection..."
                  className="min-h-[50px] max-h-[120px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={!query.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                  {messages.length > 0 && (
                    <Button type="button" variant="ghost" size="icon" onClick={clearChat}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Notice */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 text-sm font-medium">AI Recommendations Notice</p>
              <p className="text-amber-700 text-sm mt-1">
                This AI provides general guidance based on agricultural knowledge. Always verify 
                recommendations with local agricultural experts and follow product label instructions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
