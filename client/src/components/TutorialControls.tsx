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
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <Button variant="ghost" size="sm" onClick={toggleMute} className="h-8 w-8 p-0">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={isFirstStep}
              className="flex-1 sm:px-4 px-2 h-10"
            >
              <ArrowLeft className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={restart}
              className="w-10 p-0 flex-shrink-0 h-10"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="default"
              onClick={nextStep}
              disabled={isLastStep}
              className="flex-1 bg-primary hover:bg-primary/90 sm:px-4 px-2 h-10"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="sm:ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialControls;
