import React from 'react';
import { useChessTutorial } from '../lib/stores/useChessTutorial';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import AIInsights from './AIInsights';

const TutorialInstructions: React.FC = () => {
  const { getCurrentTutorial, getCurrentStep, currentStepIndex } = useChessTutorial();
  
  const tutorial = getCurrentTutorial();
  const currentStep = getCurrentStep();
  
  if (!tutorial || !currentStep) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please wait while the tutorial loads...</p>
        </CardContent>
      </Card>
    );
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden bg-gradient-to-r from-[#12192d] to-[#121626] border-[#1a2742]">
      <CardHeader className="pb-1 pt-2 px-3 border-b border-[#1a2742]">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base text-[#00e6ff]" style={{ textShadow: '0 0 3px rgba(0, 230, 255, 0.3)' }}>
            {tutorial.title}
          </CardTitle>
          <Badge className={`text-xs bg-[#1a2742] text-[#00e6ff]`} style={{ boxShadow: '0 0 5px rgba(0, 230, 255, 0.2)' }}>
            {tutorial.difficulty}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{tutorial.description}</p>
      </CardHeader>
      <CardContent className="p-3 overflow-y-auto max-h-[30vh] md:max-h-[35vh] bg-gradient-to-b from-[#121626] to-[#0d111d]">
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-[#7df9ff]" style={{ textShadow: '0 0 2px rgba(0, 230, 255, 0.3)' }}>
                Step {currentStepIndex + 1}
              </h3>
              {currentStep.notation && (
                <Badge variant="outline" className="font-mono text-xs bg-[#101522] text-[#00e6ff] border-[#1a2742]">
                  {currentStep.notation}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{currentStep.explanation}</p>
          </div>
          
          <div className="rounded-md bg-[#101522] border border-[#1a2742] p-2 text-xs">
            <p className="italic text-[#7df9ff]">
              {currentStepIndex === 0 
                ? "Follow along with the tutorial by clicking 'Next' to proceed." 
                : "Look at the highlighted squares and arrows for guidance."}
            </p>
          </div>
          
          {/* AI Insights */}
          <div className="mt-2">
            <AIInsights />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialInstructions;
