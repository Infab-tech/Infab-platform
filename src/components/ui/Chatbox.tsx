'use client';

import { useRef, useTransition, useEffect } from 'react';
import { sendQuoteMessage } from '@/app/actions/quotes';

export interface ChatMessage {
  id: string;
  senderRole: string;
  senderEmail: string;
  text: string;
  createdAt: Date;
}

interface ChatboxProps {
  quoteId: string;
  messages: ChatMessage[];
  currentRole: 'ADMIN' | 'CUSTOMER';
}

export default function Chatbox({ quoteId, messages, currentRole }: ChatboxProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (formData: FormData) => {
    const text = formData.get('message') as string;
    if (!text || !text.trim()) return;

    startTransition(async () => {
      // Clear input optimistically
      formRef.current?.reset();
      
      // Send message
      await sendQuoteMessage(quoteId, text);
    });
  };

  return (
    <div className="md:col-span-2 bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="p-4 border-b border-[var(--text-primary)]/10 bg-[var(--text-primary)]/5">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">
          {currentRole === 'ADMIN' ? 'Client Communication' : 'Messages'}
        </h3>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 min-h-[300px]">
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)] text-sm italic opacity-50">
            {currentRole === 'ADMIN' ? 'No messages in this thread.' : 'No messages yet. Say hello!'}
          </div>
        )}
        
        {messages.map((msg) => {
          const isMe = msg.senderRole === currentRole;
          
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="text-[10px] text-[var(--text-secondary)] mb-1 mx-1 flex gap-2">
                {currentRole === 'ADMIN' ? (
                  isMe ? (
                    <>
                      <span suppressHydrationWarning>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="text-[var(--accent-primary)] font-bold">You (Admin)</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold">{msg.senderEmail}</span>
                      <span suppressHydrationWarning>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </>
                  )
                ) : (
                  <>
                    <span>{isMe ? 'You' : 'InFAB Admin'}</span>
                    <span>•</span>
                    <span suppressHydrationWarning>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </>
                )}
              </div>
              <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                isMe 
                ? (currentRole === 'ADMIN' 
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-tr-none' 
                    : 'bg-[var(--accent-primary)] text-black rounded-tr-none')
                : 'bg-[var(--text-primary)]/10 text-[var(--text-primary)] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`p-4 border-t border-[var(--text-primary)]/10 ${currentRole === 'ADMIN' ? 'bg-[var(--text-primary)]/[0.02]' : ''}`}>
        <form ref={formRef} action={handleSubmit} className="flex gap-2">
          <input 
            type="text" 
            name="message"
            placeholder={currentRole === 'ADMIN' ? 'Type a message to the client...' : 'Type your message...'} 
            required
            disabled={isPending}
            className={`flex-1 px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${
              currentRole === 'ADMIN'
              ? 'bg-white border border-[var(--text-primary)]/20 rounded-lg text-black shadow-inner py-3'
              : 'bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg text-[var(--text-primary)]'
            } disabled:opacity-50`}
          />
          <button 
            type="submit" 
            disabled={isPending}
            className={`rounded-lg font-bold text-sm uppercase transition-colors disabled:opacity-50 flex items-center justify-center min-w-[80px] ${
              currentRole === 'ADMIN'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 hover:bg-[var(--accent-primary)] hover:text-black shadow-lg'
              : 'bg-[var(--accent-primary)] text-black px-6 py-2 hover:bg-white'
            }`}
          >
            {isPending ? <i className="ph ph-spinner animate-spin text-lg"></i> : (currentRole === 'ADMIN' ? 'Send Reply' : 'Send')}
          </button>
        </form>
      </div>
    </div>
  );
}
