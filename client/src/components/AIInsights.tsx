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
      <div className="p-2 bg-card rounded-md shadow-sm border border-primary/10 animate-pulse">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary/30 rounded-full"></div>
            <div className="h-4 bg-primary/30 rounded w-20"></div>
          </div>
          <div className="w-5 h-5 bg-muted rounded-md"></div>
        </div>
        
        <div className="space-y-2 mt-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-yellow-500/30 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="h-3 bg-muted/50 rounded w-12 mb-1"></div>
              <div className="space-y-1">
                <div className="h-2 bg-muted/50 rounded w-full"></div>
                <div className="h-2 bg-muted/50 rounded w-11/12"></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-primary/30 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="h-3 bg-muted/50 rounded w-8 mb-1"></div>
              <div className="space-y-1">
                <div className="h-2 bg-muted/50 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!aiInsight) {
    return (
      <div className="p-2 bg-card rounded-md shadow-sm border border-border">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-xs text-primary flex items-center gap-1">
            <SparklesIcon size={12} />
            AI Chess Coach
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => fetchAIInsight()}
            title="Get AI insights"
            className={`h-5 w-5 p-0 ${isLoadingInsight ? 'animate-spin' : ''}`}
            disabled={isLoadingInsight}
          >
            <RefreshCwIcon size={12} />
            <span className="sr-only">Get Insights</span>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Click refresh for AI insights.
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-2 bg-card rounded-md shadow-sm border border-primary/10">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-xs text-primary flex items-center gap-1">
          <SparklesIcon size={12} />
          AI Chess Coach
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => fetchAIInsight()}
          title="Refresh AI insights"
          className={`h-5 w-5 p-0 ${isLoadingInsight ? 'animate-spin' : ''}`}
          disabled={isLoadingInsight}
        >
          <RefreshCwIcon size={12} />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
      
      <div className="space-y-2 text-xs">
        {aiInsight.error ? (
          <div className="rounded-md bg-yellow-50 p-2 border border-yellow-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <LightbulbIcon size={12} className="text-yellow-500" />
              </div>
              <div className="ml-2">
                <p className="text-yellow-800 text-xs">
                  Error generating insights. Try refreshing.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-1">
              <div className="flex-shrink-0 mt-0.5">
                <LightbulbIcon size={12} className="text-yellow-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-xs">Insight</p>
                <p className="text-muted-foreground text-xs">{aiInsight.insight}</p>
              </div>
            </div>
            
            <div className="flex gap-1">
              <div className="flex-shrink-0 mt-0.5">
                <BookOpenIcon size={12} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-xs">Tip</p>
                <p className="text-muted-foreground text-xs">{aiInsight.tip}</p>
              </div>
            </div>
            
            <div className="pt-1 text-xs border-t border-border">
              <span className="font-medium">Concept: </span>
              <span className="text-muted-foreground">{aiInsight.concept}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIInsights;