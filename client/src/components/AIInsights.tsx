import React from 'react';
import { useChessTutorial } from '../lib/stores/useChessTutorial';
import { LightbulbIcon, SparklesIcon, BookOpenIcon } from 'lucide-react';

const AIInsights: React.FC = () => {
  const aiInsight = useChessTutorial(state => state.aiInsight);
  const isLoadingInsight = useChessTutorial(state => state.isLoadingInsight);
  
  if (isLoadingInsight) {
    return (
      <div className="p-4 bg-card rounded-lg shadow-md animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-primary/30 rounded-full"></div>
          <div className="h-5 bg-primary/30 rounded w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 rounded w-5/6"></div>
          <div className="h-4 bg-muted/50 rounded w-4/6"></div>
        </div>
      </div>
    );
  }
  
  if (!aiInsight) {
    return null;
  }
  
  return (
    <div className="p-4 bg-card rounded-lg shadow-md border border-primary/20">
      <h3 className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
        <SparklesIcon size={18} />
        AI Chess Coach
      </h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex gap-2">
          <div className="flex-shrink-0 mt-1">
            <LightbulbIcon size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="font-medium text-foreground">Insight</p>
            <p className="text-muted-foreground">{aiInsight.insight}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-shrink-0 mt-1">
            <BookOpenIcon size={16} className="text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Tip</p>
            <p className="text-muted-foreground">{aiInsight.tip}</p>
          </div>
        </div>
        
        <div className="pt-2 text-xs border-t border-border">
          <span className="font-medium">Chess Concept: </span>
          <span className="text-muted-foreground">{aiInsight.concept}</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;