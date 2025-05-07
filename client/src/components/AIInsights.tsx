import React from 'react';
import { useChessTutorial } from '../lib/stores/useChessTutorial';
import { LightbulbIcon, SparklesIcon, BookOpenIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from './ui/button';

const AIInsights: React.FC = () => {
  const aiInsight = useChessTutorial(state => state.aiInsight);
  const isLoadingInsight = useChessTutorial(state => state.isLoadingInsight);
  const fetchAIInsight = useChessTutorial(state => state.fetchAIInsight);
  
  if (isLoadingInsight) {
    return (
      <div className="p-4 bg-card rounded-lg shadow-md border border-primary/20 animate-pulse">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary/30 rounded-full"></div>
            <div className="h-6 bg-primary/30 rounded w-28"></div>
          </div>
          <div className="w-8 h-8 bg-muted rounded-md"></div>
        </div>
        
        <div className="space-y-3 mt-3">
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-yellow-500/30 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="h-4 bg-muted/50 rounded w-16 mb-1"></div>
              <div className="space-y-1.5">
                <div className="h-3 bg-muted/50 rounded w-full"></div>
                <div className="h-3 bg-muted/50 rounded w-11/12"></div>
                <div className="h-3 bg-muted/50 rounded w-4/5"></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-primary/30 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="h-4 bg-muted/50 rounded w-12 mb-1"></div>
              <div className="space-y-1.5">
                <div className="h-3 bg-muted/50 rounded w-full"></div>
                <div className="h-3 bg-muted/50 rounded w-3/4"></div>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border mt-1">
            <div className="h-3 bg-muted/50 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!aiInsight) {
    return (
      <div className="p-4 bg-card rounded-lg shadow-md border border-border">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-primary flex items-center gap-2">
            <SparklesIcon size={18} />
            AI Chess Coach
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => fetchAIInsight()}
            title="Get AI insights"
            className={`h-8 w-8 p-0 ${isLoadingInsight ? 'animate-spin' : ''}`}
            disabled={isLoadingInsight}
          >
            <RefreshCwIcon size={16} />
            <span className="sr-only">Get Insights</span>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Click the refresh button to get AI-powered insights for this position.
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-card rounded-lg shadow-md border border-primary/20">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <SparklesIcon size={18} />
          AI Chess Coach
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => fetchAIInsight()}
          title="Refresh AI insights"
          className={`h-8 w-8 p-0 ${isLoadingInsight ? 'animate-spin' : ''}`}
          disabled={isLoadingInsight}
        >
          <RefreshCwIcon size={16} />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
      
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