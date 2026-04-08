import React, { useState } from 'react';
import { Download, CheckSquare, Square, MessageSquare, Copy, Check, Clock, FileText, Sparkles, MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const ArticleModule = ({ content, readTime }: { content: string, readTime: number }) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 flex items-center gap-3">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
          <Clock className="size-3.5 mr-1.5" /> Estimated Reading Time: {readTime} mins
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-xs text-muted-foreground border-border bg-card">Premium Masterclass</Badge>
      </div>
      
      <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
        {content.split('\n').map((line: string, i: number) => {
          if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-extrabold mt-12 mb-6 tracking-tight text-foreground">{line.replace('# ', '')}</h1>;
          if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-10 mb-5 text-foreground">{line.replace('## ', '')}</h2>;
          if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-primary">{line.replace('### ', '')}</h3>;
          if (line.startsWith('> ')) return (
            <blockquote key={i} className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-muted-foreground bg-primary/5 rounded-r-lg">
              {line.replace('> ', '')}
            </blockquote>
          );
          if (line.startsWith('**')) return <p key={i} className="text-muted-foreground leading-relaxed my-5" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />;
          if (line.startsWith('- ')) return (
            <li key={i} className="text-muted-foreground ml-4 my-2 flex items-start gap-3">
              <div className="size-2 rounded-full bg-primary shrink-0 mt-2.5" /> 
              <span dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
            </li>
          );
          if (line.trim() === '') return <div key={i} className="h-4" />;
          return <p key={i} className="text-muted-foreground leading-relaxed my-5 text-[17px]">{line}</p>;
        })}
      </div>
    </div>
  );
};

export const ToolkitModule = ({ resources }: { resources: { title: string, desc: string, type: string }[] }) => {
  return (
    <div className="py-8">
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Download className="size-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Interactive Toolkit Hub</h2>
        <p className="text-muted-foreground">Download the templates and tools below to implement what you've learned immediately. These are production-ready systems.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {resources.map((res: any, idx: number) => (
          <div key={idx} className="group relative p-6 rounded-2xl border bg-card/40 backdrop-blur-xl hover:bg-muted/30 transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="size-24" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <Badge variant="outline" className="w-max mb-4 bg-background uppercase text-[10px] tracking-wider">{res.type}</Badge>
              <h3 className="text-lg font-bold mb-2">{res.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{res.desc}</p>
              
              <Button 
                onClick={() => toast.success(`Downloaded ${res.title}`)}
                className="w-full gap-2 shadow-sm font-semibold"
              >
                <Download className="size-4" /> Download Template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChecklistModule = ({ tasks }: { tasks: { id: string, title: string, instruction: string }[] }) => {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  
  const toggleTask = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = tasks.length ? Math.round((completed.size / tasks.length) * 100) : 0;

  return (
    <div className="py-6 w-full max-w-5xl mx-auto">
      <div className="sticky top-14 md:top-0 z-10 bg-background/95 backdrop-blur-md pb-6 pt-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">Action Progress</h2>
            <p className="text-sm text-muted-foreground mt-1">Complete all steps to master this module.</p>
          </div>
          <div className="flex items-center gap-4 bg-muted/50 py-2 px-4 rounded-full border border-border/50">
            <span className="text-2xl font-black text-primary">{progress}%</span>
            <div className="w-48 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {tasks.map(task => {
          const isDone = completed.has(task.id);
          return (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex gap-5 ${
                isDone ? 'border-primary/40 bg-primary/5' : 'border-border/50 hover:border-primary/30 bg-card hover:bg-muted/20'
              }`}
            >
              <div className="mt-1 shrink-0">
                {isDone ? (
                  <div className="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 scale-110 transition-transform">
                    <Check className="size-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="size-6 rounded-md border-2 border-muted-foreground/40 text-transparent flex items-center justify-center transition-colors">
                    <Check className="size-4 stroke-[3]" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold transition-colors ${isDone ? 'text-foreground' : 'text-foreground/80'}`}>
                  {task.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">{task.instruction}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SimulatorModule = ({ scenarios }: { scenarios: any[] }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const scenario = scenarios[currentScenario];

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(c => c + 1);
      setSelectedAnswer(null);
    } else {
      toast.success("Simulation Complete!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b pb-4 flex items-center justify-between">
        <div>
          <Badge className="mb-3 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/20">Scenario Simulator</Badge>
          <h2 className="text-2xl font-bold">Interactive Negotiation & Communication</h2>
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          Scenario {currentScenario + 1} of {scenarios.length}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 relative">
          <MessageSquare className="absolute top-6 left-6 size-6 text-muted-foreground/40" />
          <div className="pl-10 space-y-4">
            <p className="text-lg font-medium leading-relaxed">{scenario.context}</p>
            <div className="inline-block bg-background border rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm">
              <p className="font-medium text-foreground">{scenario.prompt}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest pl-2">Select your response:</h4>
          {scenario.options.map((opt: any, idx: number) => {
            const isSelected = selectedAnswer === idx;
            const hasAnswered = selectedAnswer !== null;
            const isCorrect = idx === scenario.correct;
            
            let btnClass = "border-border/50 bg-card hover:bg-muted/50 hover:border-primary/30";
            if (hasAnswered) {
              if (isSelected && isCorrect) btnClass = "border-emerald-500/50 bg-emerald-500/10";
              else if (isSelected && !isCorrect) btnClass = "border-destructive/50 bg-destructive/10";
              else if (isCorrect) btnClass = "border-emerald-500/50 bg-emerald-500/5";
              else btnClass = "opacity-50 border-border bg-card";
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${btnClass}`}
              >
                <div className="flex gap-4">
                  <div className={`mt-0.5 shrink-0 size-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary' : 'border-muted-foreground/30'}`}>
                    {isSelected && <div className="size-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className="font-medium">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className={`mt-6 p-6 rounded-2xl border animate-in slide-in-from-bottom-4 ${selectedAnswer === scenario.correct ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-destructive/10 border-destructive/20'}`}>
            <h4 className={`text-lg font-bold mb-2 ${selectedAnswer === scenario.correct ? 'text-emerald-500' : 'text-destructive'}`}>
              {selectedAnswer === scenario.correct ? 'Masterful Response!' : 'Not Quite Right'}
            </h4>
            <p className="text-foreground leading-relaxed">{scenario.options[selectedAnswer].explanation}</p>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleNext}>
                {currentScenario < scenarios.length - 1 ? 'Next Scenario \u2192' : 'Finish Simulation'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PlaygroundModule = ({ instructions, prompts }: { instructions: string, prompts: any[] }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[700px]">
      <div className="lg:w-1/2 flex flex-col h-full bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b bg-muted/20 pb-4">
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 mb-3 block w-max"><Sparkles className="size-3 inline mr-1.5" /> Prompt Engineering</Badge>
          <h2 className="text-2xl font-bold">Theory & Methodology</h2>
        </div>
        <div className="p-6 overflow-y-auto prose dark:prose-invert">
          <p className="text-muted-foreground leading-relaxed">{instructions}</p>
        </div>
      </div>

      <div className="lg:w-1/2 flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-[#0d1117]">
        <div className="px-4 py-3 border-b border-zinc-800 bg-[#161b22] flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="size-3 rounded-full bg-zinc-700" />
            <div className="size-3 rounded-full bg-zinc-700" />
            <div className="size-3 rounded-full bg-zinc-700" />
          </div>
          <span className="text-xs font-mono text-zinc-400">workspace.prompt</span>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          {prompts.map((p: any, idx: number) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-zinc-300">{p.title}</h4>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(p.code)} className="h-8 px-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
                  <Copy className="size-3.5 mr-1.5" /> Copy
                </Button>
              </div>
              <div className="relative group">
                <pre className="p-4 rounded-xl bg-[#0d1117] border border-zinc-800 text-zinc-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  <code>{p.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
