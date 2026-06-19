import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  propertyContext?: string;
  onClose: () => void;
}

const STARTER_QUESTIONS = [
  'What are the best neighborhoods in Addis Ababa?',
  'How do I negotiate a property price?',
  'What documents do I need to buy a property?',
  'Tell me about this property',
];

export default function AIAssistant({ propertyContext, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hello! I'm HabeshaHomes AI Assistant 🏠\n\nI can help you with:\n• Property recommendations\n• Market insights & price analysis\n• Buying/renting guides\n• Ethiopian real estate regulations\n\n${propertyContext ? 'I have the context of the current property. Ask me anything about it!' : 'How can I help you today?'}`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate AI response (replace with actual Supabase Edge Function call)
    await new Promise(r => setTimeout(r, 1200));

    const responses: Record<string, string> = {
      neighborhood: `**Best Neighborhoods in Addis Ababa:**\n\n🏆 **Bole** – Most prestigious, expat-friendly, luxury homes\n🏙️ **Old Airport** – Large villas, quiet streets, embassies nearby\n🌿 **CMC** – Family-friendly, spacious homes, good schools\n🏢 **Kazanchis** – Central business district, commercial properties\n💼 **Sarbet** – Mid-range, good connectivity\n\nEach area has different price ranges. Would you like details on any specific neighborhood?`,
      negotiate: `**Property Negotiation Tips in Ethiopia:**\n\n1. **Research market prices** – Compare at least 5 similar properties\n2. **Start 10-15% below asking** – Leave room for counter-offers\n3. **Use cash advantage** – Cash buyers get 5-8% better deals\n4. **Inspect thoroughly** – Use defects as negotiation leverage\n5. **Be patient** – Ethiopian sellers often need time to decide\n\nWould you like a specific negotiation script?`,
      documents: `**Documents Required to Buy Property in Ethiopia:**\n\n📋 **For Buyer:**\n• National ID or Passport\n• Tax Identification Number (TIN)\n• Marriage certificate (if applicable)\n\n📁 **For the Property:**\n• Title deed (የቤት ማረጋገጫ)\n• Land registration certificate\n• Building permit\n• Recent tax clearance\n• Survey plan\n\n⚠️ Always verify documents at the Land Administration Office!`,
    };

    let aiResponse = '';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('neighborhood') || lowerText.includes('area') || lowerText.includes('location')) {
      aiResponse = responses.neighborhood;
    } else if (lowerText.includes('negotiate') || lowerText.includes('price') || lowerText.includes('discount')) {
      aiResponse = responses.negotiate;
    } else if (lowerText.includes('document') || lowerText.includes('buy') || lowerText.includes('purchase')) {
      aiResponse = responses.documents;
    } else if (propertyContext && (lowerText.includes('this property') || lowerText.includes('tell me') || lowerText.includes('analysis'))) {
      aiResponse = `**Property Analysis:**\n\n📊 Based on my analysis of: ${propertyContext}\n\n**Market Assessment:** This property is priced competitively within the current Addis Ababa luxury market.\n\n**Investment Score:** 8.5/10 ⭐\n\n**Key Strengths:**\n• Prime location with high appreciation potential\n• Premium amenities justify the price\n• Strong rental yield if not owner-occupied (~6-7% annual)\n\n**Recommendation:** This is a solid investment. Consider negotiating 3-5% below asking price.`;
    } else {
      aiResponse = `I understand you're asking about "${text}". \n\nAs your Ethiopian real estate AI assistant, I can provide insights on:\n\n• **Property recommendations** based on your budget and preferences\n• **Market trends** in any Ethiopian region\n• **Legal guidance** on buying, selling, or renting\n• **Investment analysis** for any listing\n\nCould you be more specific about what you need? I'm here to help! 🏠`;
    }

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
    }]);
    setLoading(false);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-foreground mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('• ')) {
        const parts = line.slice(2).split('**');
        return (
          <div key={i} className="flex gap-2 ml-2">
            <span className="text-gold mt-1 shrink-0">•</span>
            <p>
              {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
            </p>
          </div>
        );
      }
      if (line.startsWith('🏆') || line.startsWith('🏙️') || line.startsWith('🌿') || line.startsWith('🏢') || line.startsWith('💼')) {
        return <p key={i} className="ml-2">{line}</p>;
      }
      if (line.match(/^\d+\./)) {
        const parts = line.split('**');
        return (
          <p key={i} className="ml-2">
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          </p>
        );
      }
      return line ? <p key={i}>{line.replace(/\*\*/g, '')}</p> : <br key={i} />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm shadow-xl rounded-2xl overflow-hidden border border-border animate-fade-in-up">
      {/* Header */}
      <div className="gradient-hero p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center shadow-gold">
            <Bot className="w-5 h-5 text-gold-foreground" />
          </div>
          <div>
            <p className="font-semibold text-primary-foreground text-sm">HabeshaHomes AI</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <p className="text-[10px] text-primary-foreground/70">Online • Powered by AI</p>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setMessages([{ id: '0', role: 'assistant', content: 'Chat cleared. How can I help you?' }])}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-80 bg-background p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex gap-2', msg.role === 'user' && 'flex-row-reverse')}>
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1',
                msg.role === 'assistant' ? 'gradient-hero' : 'gradient-gold'
              )}>
                {msg.role === 'assistant'
                  ? <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  : <User className="w-3.5 h-3.5 text-gold-foreground" />
                }
              </div>
              <div className={cn(
                'max-w-[82%] rounded-xl px-3 py-2.5 text-sm leading-relaxed space-y-0.5',
                msg.role === 'assistant'
                  ? 'bg-muted text-foreground rounded-tl-none'
                  : 'gradient-hero text-primary-foreground rounded-tr-none'
              )}>
                {renderContent(msg.content)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-xl rounded-tl-none px-4 py-3">
                <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Starters */}
      {messages.length <= 1 && (
        <div className="bg-background border-t border-border px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {STARTER_QUESTIONS.map(q => (
              <button
                key={q}
                className="text-[10px] bg-muted hover:bg-accent text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-full transition-colors"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-background border-t border-border p-3 flex gap-2">
        <Input
          placeholder="Ask about properties..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          className="text-sm"
        />
        <Button
          size="icon"
          className="gradient-hero text-primary-foreground shrink-0"
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
