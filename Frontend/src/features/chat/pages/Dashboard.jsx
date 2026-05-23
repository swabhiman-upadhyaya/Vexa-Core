import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'


const AiMessage = ({ text }) => (
  <div
    className="self-start max-w-[85%] sm:max-w-[68%] rounded-[3px_16px_16px_16px] p-[12px_15px] text-sm leading-relaxed"
    style={{
      background: 'linear-gradient(145deg, #1a2a3d 0%, #0f1c2d 100%)',
      border: '1px solid rgba(70,130,169,0.32)',
      color: 'rgba(246,244,235,0.82)',
    }}
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="w-[5px] h-[5px] rounded-full bg-[#91C8E4] flex-shrink-0" />
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#749BC2]">
        Vexa-Core
      </span>
    </div>
    {text}
  </div>
)

const UserMessage = ({ text }) => (
  <div
    className="self-end max-w-[80%] sm:max-w-[62%] rounded-[16px_16px_3px_16px] px-4 py-[10px] text-sm font-bold text-[#0d1520]"
    style={{
      background: 'linear-gradient(180deg, #91C8E4 0%, #749BC2 100%)',
      boxShadow: '0 2px 16px rgba(145,200,228,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
    }}
  >
    {text}
  </div>
)

const Dashboard = () => {

  const chatActions = useChat()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)               // FIX 1: was used but never declared

  useEffect(() => {
    chatActions.initializeSocketConnection()
    chatActions.handleGetChats()                    // FIX 2: was missing, sidebar never populated
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, currentChatId])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    chatActions.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chatActions.handleOpenChat(chatId, chats)
    setSidebarOpen(false)
  }

  return (
    <main className="h-screen w-full flex overflow-hidden relative" style={{ background: '#0d1520' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed sm:relative z-30 sm:z-auto h-full
          flex flex-col gap-3 p-5 overflow-hidden flex-shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        `}
        style={{
          width: 230,
          background: 'linear-gradient(180deg, #1a2a3d 0%, #0f1c2d 100%)',
          borderRight: '1px solid rgba(70,130,169,0.25)',
        }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[#91C8E4] flex-shrink-0"
              style={{ boxShadow: '0 0 8px rgba(145,200,228,0.7)' }}
            />
            <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[#749BC2]">
              Vexa-Core
            </span>
          </div>
          <button
            className="sm:hidden text-[#749BC2] hover:text-[#91C8E4] transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-[9px] text-[11px] font-bold tracking-widest uppercase text-[#91C8E4] cursor-pointer transition-all hover:brightness-110"
          style={{
            background: 'rgba(70,130,169,0.1)',
            border: '1px solid rgba(70,130,169,0.35)',
          }}
        >
          <span className="text-base leading-none">+</span> New Chat
        </button>

        <div style={{ borderTop: '1px solid rgba(70,130,169,0.18)' }} />

        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#F6F4EB]/25 px-1">
          Recent
        </span>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1">
          {Object.values(chats).map((chatItem) => (
            <div
              key={chatItem.id}
              className="px-2.5 py-2 rounded-[8px] text-[11.5px] cursor-pointer transition-all truncate text-[#F6F4EB]/50 font-mono"
              style={{ border: '1px solid transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(70,130,169,0.1)'
                e.currentTarget.style.borderColor = 'rgba(70,130,169,0.3)'
                e.currentTarget.style.color = '#F6F4EB'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.color = 'rgba(246,244,235,0.5)'
              }}
              onClick={() => openChat(chatItem.id)}
            >
              {chatItem.title}
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN PANEL */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative"
        style={{ background: 'linear-gradient(140deg, #0f1c2d 0%, #0d1520 55%, #0d1a24 100%)' }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: -80, right: -80,
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(145,200,228,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Top Bar */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(70,130,169,0.14)' }}
        >
          <div className="flex items-center gap-3">
            <button
              className="sm:hidden flex flex-col gap-[5px] cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block h-[1.5px] rounded-full bg-[#749BC2]"
                  style={{ width: i === 1 ? 14 : 18 }}
                />
              ))}
            </button>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#749BC2]">
                Active Session
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#91C8E4] leading-none">
                Ask me anything
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-[#91C8E4]/25" />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(145,200,228,0.12)' }} />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4">
          {chats[currentChatId]?.messages.map((msg) =>
            msg.role === 'user'
              ? <UserMessage key={msg.id} text={msg.content} />
              : <AiMessage key={msg.id} text={msg.content} />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3 flex-shrink-0">
          <form
            onSubmit={handleSubmitMessage}
            className="flex items-center gap-2.5 px-3 sm:px-3.5 py-2.5 rounded-[13px]"
            style={{
              background: 'linear-gradient(145deg, #1a2a3d 0%, #0f1c2d 100%)',
              border: '1px solid rgba(70,130,169,0.35)',
              boxShadow: '0 0 0 1px rgba(145,200,228,0.04), inset 0 1px 0 rgba(145,200,228,0.07)',
            }}
          >
            <input
              type="text"
              placeholder="Ask anything…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) handleSubmitMessage(e)
              }}
              className="flex-1 bg-transparent border-none outline-none text-[#F6F4EB] text-sm font-mono placeholder-[#F6F4EB]/25 min-w-0"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center flex-shrink-0 cursor-pointer transition-all hover:brightness-110 active:scale-95 border-none disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(180deg, #91C8E4 0%, #749BC2 100%)',
                boxShadow: '0 2px 12px rgba(145,200,228,0.3)',
                color: '#0d1520',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l12-6-6 12-2-4-4-2z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      </div>

    </main>
  )
}

export default Dashboard