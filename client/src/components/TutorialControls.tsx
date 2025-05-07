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
    <Card className="shadow-sm bg-gradient-to-r from-[#12192d] to-[#121626] border-[#1a2742]">
      <CardContent className="p-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7df9ff]" style={{ textShadow: '0 0 2px rgba(0, 230, 255, 0.3)' }}>
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <Button variant="ghost" size="sm" onClick={toggleMute} className="h-6 w-6 p-0 text-[#00e6ff] hover:text-[#7df9ff] hover:bg-[#101522]">
              {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
          </div>
          
          <div className="w-full bg-[#101522] h-1 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00e6ff] to-[#7df9ff]"
              style={{ width: `${progress}%`, boxShadow: '0 0 5px rgba(0, 230, 255, 0.7)' }}
            />
          </div>
          
          <div className="flex justify-between gap-1">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={isFirstStep}
              className="flex-1 px-1 h-8 text-xs border-[#1a2742] bg-[#12192d] text-[#00e6ff] hover:bg-[#101522] hover:text-[#7df9ff] disabled:text-[#1a2742]"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={restart}
              className="w-8 p-0 flex-shrink-0 h-8 border-[#1a2742] bg-[#12192d] text-[#00e6ff] hover:bg-[#101522] hover:text-[#7df9ff]"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            
            <Button
              variant="default"
              onClick={nextStep}
              disabled={isLastStep}
              className="flex-1 px-1 h-8 text-xs bg-[#00e6ff] hover:bg-[#7df9ff] text-[#0a101f] disabled:bg-[#1a2742] disabled:text-[#304165]"
              style={{ boxShadow: isLastStep ? 'none' : '0 0 5px rgba(0, 230, 255, 0.5)' }}
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
