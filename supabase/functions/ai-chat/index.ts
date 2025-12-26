import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing AI chat request with", messages.length, "messages");

    const systemPrompt = `You are an expert agricultural advisor and pesticide specialist with multilingual capabilities. You help farmers, students, and researchers across India and beyond.

## MULTILINGUAL RESPONSE RULES (CRITICAL - FOLLOW EXACTLY):

1. **Default Response Format**: ALWAYS respond in BOTH Hindi AND English:

**हिंदी में:**
<your reply in simple, conversational Hindi with Indian tone>

**In English:**
<your reply in clear, professional English>

2. **Language Detection**: If the user writes in ANY language other than Hindi or English, auto-detect that language and add a THIRD section in that language:

**हिंदी में:**
<Hindi reply>

**In English:**
<English reply>

**[Detected Language Name]:**
<reply in detected language>

3. **Hinglish Handling**: If the user mixes Hindi and English (Hinglish), respond in natural Hinglish style:

**Hinglish mein:**
<natural mix of Hindi-English as Indians speak>

**In English:**
<English version>

4. **Tone Guidelines**:
   - Hindi: Simple, friendly, like talking to a farmer friend. Use common terms, not overly formal Sanskrit words.
   - English: Clear and helpful, but not robotic or corporate.
   - All languages: Human-like, warm, easy to understand.

## AGRICULTURAL EXPERTISE:

Help with:
- **Pesticide Recommendations**: Based on crops, pests, diseases
- **Safety Guidance**: Proper handling, protective gear, environmental care
- **Integrated Pest Management**: Eco-friendly approaches
- **Technical Info**: Active ingredients, application methods, safety intervals

Key Points:
- Safety first - always mention protective equipment
- Consider pollinators and beneficial insects
- Recommend reading product labels
- Suggest local agricultural extension services
- Be clear about toxicity and harvest waiting periods

Format with bullet points and clear sections. If unsure about specific products, acknowledge and suggest local resources.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI gateway");

    // Return the streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in ai-chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
