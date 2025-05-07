import React from 'react';
import { useChessTutorial } from '../lib/stores/useChessTutorial';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useAudio } from '../lib/stores/useAudio';
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const TutorialControls: React.FC = () => {
  const { 
    currentStepIndex, 
    nextStep, 
    previousStep, 
    restart, 
    getTotalSteps, 
    getProgress 
  } = useChessTutorial();
  
  const { isMuted, toggleMute } = useAudio();
  
  const totalSteps = getTotalSteps();
  const progress = getProgress();
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <Card className="shadow-sm">
      <CardContent className="p-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <Button variant="ghost" size="sm" onClick={toggleMute} className="h-6 w-6 p-0">
              {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
          </div>
          
          <Progress value={progress} className="h-1" />
          
          <div className="flex justify-between gap-1">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={isFirstStep}
              className="flex-1 px-1 h-8 text-xs"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={restart}
              className="w-8 p-0 flex-shrink-0 h-8"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            
            <Button
              variant="default"
              onClick={nextStep}
              disabled={isLastStep}
              className="flex-1 bg-primary hover:bg-primary/90 px-1 h-8 text-xs"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialControls;
