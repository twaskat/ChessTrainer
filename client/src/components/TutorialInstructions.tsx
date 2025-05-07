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
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{tutorial.title}</CardTitle>
          <Badge className={getDifficultyColor(tutorial.difficulty)}>
            {tutorial.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100vh-320px)] md:max-h-none">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-1">Step {currentStepIndex + 1}</h3>
            <div className="flex items-center mb-2">
              {currentStep.notation && (
                <Badge variant="outline" className="mr-2 font-mono">
                  {currentStep.notation}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{currentStep.explanation}</p>
          </div>
          
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="italic text-muted-foreground">
              {currentStepIndex === 0 
                ? "Follow along with the tutorial by clicking 'Next' to proceed." 
                : "Look at the highlighted squares and arrows for guidance."}
            </p>
          </div>
          
          {/* AI Insights */}
          <div className="mt-4">
            <AIInsights />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialInstructions;
