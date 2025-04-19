"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SendIcon, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ChatMessage } from "@/types/chat"
import { sendMessageToGemini } from "@/app/actions/gemini-actions"
import ChatMessageItem from "./chat-message-item"

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm JobAssist AI, your job recommendation assistant. I can help you with job searches, resume advice, interview tips, and career guidance. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Update the handleSubmit function to better handle errors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: ChatMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send message to Gemini API
      const response = await sendMessageToGemini(messages, input)

      // Add assistant response
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error processing your request. Please try again or check the API configuration.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm JobAssist AI, your job recommendation assistant. I can help you with job searches, resume advice, interview tips, and career guidance. How can I assist you today?",
      },
    ])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessageItem key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>JobAssist AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about job recommendations, resume tips, interview advice..."
            className="min-h-[80px] resize-none flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button type="submit" disabled={isLoading || !input.trim()} className="rounded-full h-10 w-10 p-0">
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
            <Button type="button" variant="outline" className="rounded-full h-10 w-10 p-0" onClick={resetChat}>
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Reset chat</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
