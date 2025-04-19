import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/types/chat"

interface ChatMessageItemProps {
  message: ChatMessage
}

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start gap-3 max-w-[90%]", isUser ? "ml-auto" : "mr-auto")}>
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
          isUser ? "bg-blue-100 order-2" : "bg-gray-100",
        )}
      >
        {isUser ? <User className="h-5 w-5 text-blue-600" /> : <Bot className="h-5 w-5 text-gray-600" />}
      </div>
      <div
        className={cn(
          "rounded-lg px-4 py-2 text-sm",
          isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
