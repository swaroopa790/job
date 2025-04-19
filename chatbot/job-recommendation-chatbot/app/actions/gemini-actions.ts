"use server"

import type { ChatMessage } from "@/types/chat"

export async function sendMessageToGemini(previousMessages: ChatMessage[], userInput: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error("Gemini API key is not configured")
    }

    // Format the conversation history for Gemini
    const formattedMessages = previousMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }))

    // Add the new user message
    formattedMessages.push({
      role: "user",
      parts: [
        {
          text: `You are a job recommendation AI assistant. Focus on providing helpful career advice, job search strategies, resume tips, and interview preparation guidance. The user asks: ${userInput}`,
        },
      ],
    })

    // Try with gemini-1.5-pro first
    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    // If first attempt fails, try with alternative model
    if (!response.ok) {
      console.log("First model attempt failed, trying alternative model...")
      response = await tryAlternativeModel(formattedMessages, apiKey)
    }

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Gemini API error:", errorData)
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    // Extract the response text
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again."

    return generatedText
  } catch (error) {
    console.error("Error in sendMessageToGemini:", error)
    return "I'm sorry, I encountered an error. Please try again later."
  }
}

async function tryAlternativeModel(messages: any[], apiKey: string) {
  // Try with gemini-pro model
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    },
  )

  return response
}
