import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Sparkles,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Award,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { ChatMessage, IndianStandard } from '../types';
import { INDIAN_STANDARDS_DATABASE } from '../data/bisStandardsData';

interface ChatAssistantProps {
  language: 'en' | 'hi';
  onSelectStandard: (standard: IndianStandard) => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onNavigateTab?: (tab: string) => void;
}

// ----------------------------------------------------------------------
// Markdown renderer � converts AI response text to clean React elements.
// NEVER serialises icon JSX into text; all icons are rendered as JSX.
// ----------------------------------------------------------------------
const MarkdownContent: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const lines = (text || '').split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  const renderInline = (src: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(src)) !== null) {
      if (m.index > last) parts.push(src.slice(last, m.index));
      const token = m[0];
      if (token.startsWith('**')) {
        parts.push(<strong key={m.index} className="font-semibold text-slate-900">{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('*')) {
        parts.push(<em key={m.index} className="italic text-slate-700">{token.slice(1, -1)}</em>);
      } else {
        parts.push(<code key={m.index} className="bg-slate-100 text-slate-800 text-[13px] px-1.5 py-0.5 rounded font-mono">{token.slice(1, -1)}</code>);
      }
      last = m.index + token.length;
    }
    if (last < src.length) parts.push(src.slice(last));
    return parts;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { elements.push(<div key={`sp-${i}`} className="h-2" />); i++; continue; }

    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-[14px] font-bold text-slate-800 mt-4 mb-1.5 first:mt-0">{renderInline(trimmed.slice(4))}</h3>);
      i++; continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-[15px] font-bold text-slate-900 mt-4 mb-1.5 first:mt-0">{renderInline(trimmed.slice(3))}</h2>);
      i++; continue;
    }
    if (trimmed.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-[16px] font-bold text-slate-900 mt-4 mb-2 first:mt-0">{renderInline(trimmed.slice(2))}</h1>);
      i++; continue;
    }
    if (trimmed === '---' || trimmed === '***') {
      elements.push(<hr key={i} className="border-slate-200 my-3" />);
      i++; continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1.5 my-2 pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-700 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-[#123B66] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }
    if (/^[-*�]\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*�]\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*�]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-2 pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[14px] text-slate-700 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F6F8B] shrink-0 mt-2" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-[#1F6F8B] pl-3.5 py-1 my-2 text-[14px] text-slate-600 italic bg-slate-50/80 rounded-r-lg">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      i++; continue;
    }
    elements.push(<p key={i} className="text-[14px] sm:text-[15px] text-slate-800 leading-relaxed">{renderInline(trimmed)}</p>);
    i++;
  }

  return <div className={`space-y-1.5 ${className}`}>{elements}</div>;
};

// Evidence chip
const EvidenceChip: React.FC<{ evidence: any }> = ({ evidence }) => {
  if (!evidence?.standardCode) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F6F8B] bg-[#1F6F8B]/8 border border-[#1F6F8B]/20 px-3 py-1.5 rounded-full">
        <Award className="w-3.5 h-3.5 shrink-0" />
        {evidence.standardCode}
        {evidence.scheme && <span className="opacity-60">� {evidence.scheme}</span>}
      </span>
      {evidence.isMandatory && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full uppercase tracking-wide">
          <ShieldAlert className="w-3 h-3 shrink-0" />
          Mandatory QCO
        </span>
      )}
    </div>
  );
};

// Accordion
const AccordionSection: React.FC<{ section: any; isOpen: boolean; onToggle: () => void }> = ({ section, isOpen, onToggle }) => (
  <div className="border border-slate-200 rounded-xl overflow-hidden mt-2">
    <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors text-left">
      <div className="flex items-center gap-2 min-w-0">
        <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-[13px] font-semibold text-slate-600 truncate">{section.title}</span>
        {section.badge && <span className="shrink-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{section.badge}</span>}
      </div>
      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
    </button>
    {isOpen && (
      <div className="px-4 pb-4 pt-2 bg-slate-50/60 border-t border-slate-100">
        <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">{section.content}</p>
      </div>
    )}
  </div>
);

// Message content renderer
const MessageContent: React.FC<{
  message: ChatMessage;
  onSend: (text: string) => void;
  onRelatedOption: (opt: any) => void;
  accordionOpen: Record<string, boolean>;
  setAccordionOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isLoading: boolean;
  isHi: boolean;
}> = ({ message, onSend, onRelatedOption, accordionOpen, setAccordionOpen, isLoading, isHi }) => {
  const s = message.structured;

  if (!s) return <MarkdownContent text={message.content} />;

  if (s.type === 'clarification') {
    return (
      <div className="space-y-3">
        <p className="text-[14px] sm:text-[15px] text-slate-900 leading-relaxed font-medium">{s.question}</p>
        {s.contextHint && <p className="text-[13px] text-slate-500 italic">?? {s.contextHint}</p>}
        {s.quickReplies && s.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {s.quickReplies.map((reply: string, idx: number) => (
              <button key={idx} type="button" disabled={isLoading} onClick={() => onSend(reply)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-white hover:bg-[#123B66] text-[#123B66] hover:text-white border border-[#123B66]/30 hover:border-[#123B66] transition-all duration-150 active:scale-95 cursor-pointer shadow-sm disabled:opacity-50">
                {reply}
              </button>
            ))}
            {s.canSkip && (
              <button type="button" disabled={isLoading} onClick={() => onSend(isHi ? '??????? ?????????? ???' : 'Skip, give me general guidance')}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-slate-400 hover:text-slate-600 border border-dashed border-slate-300 hover:border-slate-400 transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-50">
                {isHi ? '?????? ?' : 'Skip for now ?'}
              </button>
            )}
          </div>
        )}
        <p className="text-[11px] text-slate-400">{isHi ? '?? ???? ???? ???? ????' : 'Or just type your answer below'}</p>
      </div>
    );
  }

  if (s.type === 'final_answer') {
    return (
      <div className="space-y-3">
        {s.shortAnswer && <p className="text-[14px] sm:text-[15px] text-slate-900 leading-relaxed font-medium">{s.shortAnswer}</p>}
        {s.why && <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">{s.why}</p>}
        {s.whatThisMeansForYou && (
          <div className="flex gap-2.5 items-start bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[13px] text-emerald-900 leading-relaxed">{s.whatThisMeansForYou}</p>
          </div>
        )}
        {s.whatNext && s.whatNext.length > 0 && (
          <div className="pt-1">
            <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">{isHi ? '???? ???? ????' : "What to do next"}</p>
            <ol className="space-y-2">
              {s.whatNext.map((step: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-[#123B66] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        <EvidenceChip evidence={s.evidence} />
        {s.detailsAccordion && s.detailsAccordion.length > 0 && (
          <div className="mt-1">
            {s.detailsAccordion.map((section: any, secIdx: number) => {
              const key = `${message.id}-${secIdx}`;
              return <AccordionSection key={key} section={section} isOpen={!!accordionOpen[key]} onToggle={() => setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }))} />;
            })}
          </div>
        )}
        {s.relatedOptions && s.relatedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 mt-1">
            {s.relatedOptions.map((opt: any, oIdx: number) => (
              <button key={oIdx} type="button" onClick={() => onRelatedOption(opt)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-white hover:bg-slate-50 text-slate-600 hover:text-[#123B66] border border-slate-200 hover:border-[#123B66]/30 transition-all duration-150 cursor-pointer active:scale-95">
                <span>{opt.label}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <MarkdownContent text={message.content} />;
};

// Welcome screen
const WelcomeScreen: React.FC<{ onSuggestion: (text: string) => void; isHi: boolean }> = ({ onSuggestion, isHi }) => {
  const suggestions = isHi
    ? ['???? ?????? ?? ??? ?? BIS ???? ???? ???? ???', 'BIS ??????? ???? ??????? ?????', 'HUID ???? verify ?????', 'BIS ??????? ??????? ??? ???? ???']
    : ['Which BIS standard applies to my product?', 'How do I get BIS certification?', 'Can I verify a HUID?', 'Find a BIS recognized laboratory'];
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center h-full">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#123B66] to-[#1F6F8B] flex items-center justify-center shadow-lg mb-5">
        <Sparkles className="w-8 h-8 text-[#F4A340]" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{isHi ? '???????? AI' : 'ManakSetu AI'}</h2>
      <p className="text-slate-500 text-sm sm:text-base max-w-sm mb-10 leading-relaxed">
        {isHi ? '?????? ??????, BIS ??????? ?? ?????? ?? ???? ??? ??? ?? ??????' : 'Ask anything about BIS standards, certification and BIS services.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
        {suggestions.map((s, i) => (
          <button key={i} type="button" onClick={() => onSuggestion(s)}
            className="text-left px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#1F6F8B]/40 hover:bg-blue-50/30 text-[13px] text-slate-700 hover:text-[#123B66] font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] shadow-sm">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------
export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  language, onSelectStandard, initialPrompt, onClearInitialPrompt, onNavigateTab,
}) => {
  const isHi = language === 'hi';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isSendingRef = useRef<boolean>(false);
  const lastSentRef = useRef<{ text: string; time: number }>({ text: '', time: 0 });
  const handledInitialPromptRef = useRef<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && handledInitialPromptRef.current !== initialPrompt.trim()) {
      handledInitialPromptRef.current = initialPrompt.trim();
      handleSend(initialPrompt.trim());
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = isHi ? 'hi-IN' : 'en-IN';
    recognition.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, [isHi]);

  const toggleSpeech = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { setIsListening(true); recognitionRef.current.start(); }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#`[\]()]/g, ''));
    utterance.lang = isHi ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = useCallback(async (queryText?: string) => {
    const textToSend = (queryText !== undefined ? queryText : input).trim();
    if (!textToSend) return;
    if (isSendingRef.current) return;
    const now = Date.now();
    if (lastSentRef.current.text.toLowerCase() === textToSend.toLowerCase() && now - lastSentRef.current.time < 1500) return;

    isSendingRef.current = true;
    lastSentRef.current = { text: textToSend, time: now };
    setInput('');
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: `${now}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messagesRef.current, userMessage];
    setMessages(updatedHistory);
    messagesRef.current = updatedHistory;

    try {
      const payloadMessages = updatedHistory.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get answer');
      
      const assistantMessage: ChatMessage = {
        id: `${Date.now() + 1}-${Math.random().toString(36).slice(2, 7)}`,
        role: 'assistant',
        content: data.content || (isHi ? 'माफ़ करें, उत्तर प्राप्त करने में समस्या हुई।' : 'Sorry, could not generate a response.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        referencedStandards: data.referencedStandards,
        structured: data.structured,
      };
      setMessages(prev => [...prev, assistantMessage]);
      messagesRef.current = [...messagesRef.current, assistantMessage];
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `${Date.now() + 1}-${Math.random().toString(36).slice(2, 7)}`,
        role: 'assistant',
        content: isHi
          ? 'माफ़ करें, इस समय AI सहायक उपलब्ध नहीं है। कृपया कुछ पलों बाद पुनः प्रयास करें।'
          : 'Sorry, the AI is temporarily unavailable. Please try again in a moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
      messagesRef.current = [...messagesRef.current, errorMessage];
    } finally {
      setIsLoading(false);
      setTimeout(() => { isSendingRef.current = false; }, 350);
    }
  }, [input, language, isHi]);

  const handleNewChat = () => {
    if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
    messagesRef.current = [];
    setMessages([]); setAccordionOpen({}); setInput('');
  };

  const handleRelatedOptionClick = (option: { label: string; action: string; target?: string }) => {
    if (option.action === 'view_standard') {
      const targetCode = option.target || '';
      const match = INDIAN_STANDARDS_DATABASE.find(s => s.code.toLowerCase().includes(targetCode.toLowerCase()) || targetCode.toLowerCase().includes(s.code.split(':')[0].toLowerCase()));
      if (match) onSelectStandard(match);
      if (onNavigateTab) onNavigateTab('standards');
    } else if (option.action === 'view_scheme') {
      if (onNavigateTab) onNavigateTab('schemes');
    } else if (option.action === 'find_lab') {
      if (onNavigateTab) onNavigateTab('labs');
    } else if (option.action === 'verify_huid' || option.action === 'verify_license') {
      if (onNavigateTab) onNavigateTab('verify');
    } else if (option.action === 'ask_query') {
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100dvh-175px)] min-h-[520px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#123B66] to-[#1F6F8B] flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-[#F4A340]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-[15px] text-slate-900 leading-tight">{isHi ? '???????? AI' : 'ManakSetu AI'}</h2>
            <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">Bureau of Indian Standards � IS Codes & QCOs</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs border border-blue-200 animate-pulse font-medium">
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stop</span>
            </button>
          )}
          <button onClick={handleNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition font-medium"
            title="New conversation">
            <Plus className="w-3.5 h-3.5" />
            <span>{isHi ? '?? ??????' : 'New chat'}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#F7F9FC]">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestion={handleSend} isHi={isHi} />
        ) : (
          <div className="py-6 px-4 sm:px-6 space-y-1">
            {messages.map((message) => {
              const isBot = message.role === 'assistant';
              return (
                <div key={message.id} className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'} mb-4`}>
                  {isBot ? (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#123B66] to-[#1F6F8B] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Sparkles className="w-4 h-4 text-[#F4A340]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-200" />
                    </div>
                  )}
                  <div className={`group relative ${isBot ? 'max-w-[85%] sm:max-w-[78%]' : 'max-w-[75%]'}`}>
                    {isBot ? (
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm border border-slate-200/80">
                        <MessageContent
                          message={message}
                          onSend={handleSend}
                          onRelatedOption={handleRelatedOptionClick}
                          accordionOpen={accordionOpen}
                          setAccordionOpen={setAccordionOpen}
                          isLoading={isLoading}
                          isHi={isHi}
                        />
                        {!message.structured && message.referencedStandards && message.referencedStandards.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                            {message.referencedStandards.map((std, idx) => {
                              const dbMatch = INDIAN_STANDARDS_DATABASE.find(item => item.code.includes(std.code) || std.code.includes(item.code.split(':')[0]));
                              return (
                                <button key={idx} type="button" onClick={() => { if (dbMatch) { onSelectStandard(dbMatch); if (onNavigateTab) onNavigateTab('standards'); } }}
                                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1F6F8B] bg-[#1F6F8B]/6 hover:bg-[#1F6F8B]/12 border border-[#1F6F8B]/20 px-2.5 py-1 rounded-full transition cursor-pointer">
                                  <BookOpen className="w-3 h-3" />
                                  {std.code}
                                  {std.mandatory && <span className="text-rose-600 font-bold text-[10px]">QCO</span>}
                                </button>
                              );
                            })}
                          </div>
                        )}
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleCopy(message.content, message.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition" title="Copy">
                            {copiedId === message.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => handleSpeak(message.content)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition" title="Read aloud">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] text-slate-300 ml-1 font-mono">{message.timestamp}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#123B66] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                        <p className="text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-[11px] text-white/40 mt-1.5 text-right font-mono">{message.timestamp}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#123B66] to-[#1F6F8B] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#F4A340]" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm border border-slate-200/80 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#1F6F8B] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#1F6F8B] rounded-full animate-bounce [animation-delay:0.15s]" />
                    <div className="w-2 h-2 bg-[#1F6F8B] rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <span className="text-[13px] text-slate-500">{isHi ? '?????? ?????? ?? ????????...' : 'Checking BIS standards...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input composer */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3.5 shrink-0">
        <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-slate-300 focus-within:border-[#1F6F8B] focus-within:ring-2 focus-within:ring-[#1F6F8B]/15 transition px-3 py-2.5 shadow-sm">
          <button type="button" onClick={toggleSpeech}
            className={`p-2 rounded-xl transition shrink-0 ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}>
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!isSendingRef.current && !isLoading) handleSend(); } }}
            placeholder={isListening ? (isHi ? '?????...' : 'Listening...') : isHi ? 'BIS ????, QCO, ??????? ?? ???? ??? ?????...' : 'Ask about BIS standards, QCOs, certification...'}
            rows={1}
            className="flex-1 bg-transparent text-[14px] sm:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none py-1 px-1 max-h-[200px] leading-relaxed"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button type="button" onClick={() => { if (!isSendingRef.current && !isLoading) handleSend(); }}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-[#123B66] hover:bg-[#1a4f88] disabled:bg-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 transition shrink-0"
            aria-label="Send message">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 text-center mt-2">
          {isHi ? 'Enter ????? � Shift+Enter ?? ?????? � BIS ??????? 2016 ?? ??????' : 'Enter to send � Shift+Enter for new line � Grounded in BIS Act 2016 & Gazette QCOs'}
        </p>
      </div>
    </div>
  );
};
