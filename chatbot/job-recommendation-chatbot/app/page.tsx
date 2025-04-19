import ChatInterface from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-800 py-6">
        <h1 className="text-3xl font-bold text-white">JobAssist AI</h1>
        <p className="text-white/80 mt-2">Your AI-powered job recommendation assistant</p>
      </div>
      <div className="flex-1 container mx-auto p-4 md:p-8 max-w-4xl">
        <ChatInterface />
      </div>
    </main>
  )
}
