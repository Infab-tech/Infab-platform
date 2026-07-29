'use client';

import { useState } from 'react';
import { replyToInquiry } from '@/app/actions/admin';

export default function ReplyInquiryDialog({ inquiryId, email, firstName }: { inquiryId: string, email: string, firstName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [subject, setSubject] = useState(`Re: Your Inquiry with INFAB`);
    const [message, setMessage] = useState(`Hi ${firstName},\n\n\n\nBest regards,\nINFAB Team`);

    const handleSend = async () => {
        if (!message.trim()) {
            alert('Please enter a message');
            return;
        }

        setIsSending(true);
        const result = await replyToInquiry(inquiryId, subject, message);

        if (result && !result.success) {
            alert(`Error: ${result.message || 'Failed to send email'}`);
            setIsSending(false);
        } else {
            alert('Reply sent successfully!');
            setIsOpen(false);
            setIsSending(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-colors rounded text-xs font-bold uppercase"
            >
                Reply
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl p-6 w-full max-w-lg shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Reply to {firstName}</h3>
                        
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">To</label>
                            <input 
                                type="text" 
                                value={email}
                                disabled
                                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-lg text-sm text-[var(--text-secondary)]"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Subject</label>
                            <input 
                                type="text" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Message</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={8}
                                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                disabled={isSending}
                                className="px-4 py-2 border border-[var(--text-primary)]/10 rounded-lg text-sm font-bold text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={isSending}
                                className="px-4 py-2 bg-[var(--accent-primary)] rounded-lg text-sm font-bold text-[var(--bg-primary)] hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isSending ? 'Sending...' : 'Send Reply'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
